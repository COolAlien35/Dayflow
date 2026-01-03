"""WebSocket handler for real-time updates.

This module provides WebSocket connection management and real-time push
notifications for system events. Connections are authenticated with JWT
and maintained in a per-user registry.

Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.7
"""
import logging
import json
from typing import Dict, List, Optional
from fastapi import WebSocket, WebSocketDisconnect, status
from datetime import datetime

from api.auth import decode_access_token

# Configure logging
logger = logging.getLogger(__name__)

# WebSocket connection registry: maps user_id to list of active WebSocket connections
_active_connections: Dict[int, List[WebSocket]] = {}


async def handle_websocket_connection(websocket: WebSocket) -> None:
    """
    Handle WebSocket connection lifecycle.
    
    Accepts the connection, authenticates with JWT token from initial message,
    registers the connection in the user's connection list, and listens for
    disconnect events to clean up.
    
    Args:
        websocket: The WebSocket connection to handle
        
    Requirements: 25.4, 25.7
    
    Example:
        @app.websocket("/api/v2/ws")
        async def websocket_endpoint(websocket: WebSocket):
            await handle_websocket_connection(websocket)
    """
    await websocket.accept()
    logger.info("WebSocket connection accepted, awaiting authentication")
    
    user_id = None
    
    try:
        # Wait for authentication message
        auth_message = await websocket.receive_text()
        auth_data = json.loads(auth_message)
        
        if auth_data.get("type") != "auth":
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": "First message must be authentication"
            }))
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            logger.warning("WebSocket closed: first message was not authentication")
            return
        
        token = auth_data.get("token")
        if not token:
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": "Token is required"
            }))
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            logger.warning("WebSocket closed: no token provided")
            return
        
        # Decode and validate JWT token
        try:
            payload = decode_access_token(token)
            user_id = payload.get("user_id")
            
            if not user_id:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "message": "Invalid token"
                }))
                await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                logger.warning("WebSocket closed: invalid token")
                return
        except Exception as e:
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": "Authentication failed"
            }))
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            logger.warning(f"WebSocket authentication failed: {str(e)}")
            return
        
        # Register connection
        if user_id not in _active_connections:
            _active_connections[user_id] = []
        
        _active_connections[user_id].append(websocket)
        logger.info(f"WebSocket authenticated and registered for user {user_id}")
        
        # Send authentication success message
        await websocket.send_text(json.dumps({
            "type": "auth_success",
            "user_id": user_id
        }))
        
        # Keep connection alive and listen for disconnect
        while True:
            # Wait for messages (we don't expect any, but this keeps the connection alive)
            try:
                message = await websocket.receive_text()
                # Log any messages received (for debugging)
                logger.debug(f"Received message from user {user_id}: {message}")
            except WebSocketDisconnect:
                logger.info(f"WebSocket disconnected for user {user_id}")
                break
            except Exception as e:
                logger.error(f"Error receiving WebSocket message: {str(e)}")
                break
    
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected during authentication")
    except Exception as e:
        logger.error(f"Unexpected error in WebSocket handler: {str(e)}", exc_info=True)
    finally:
        # Clean up connection on disconnect
        if user_id and user_id in _active_connections:
            try:
                _active_connections[user_id].remove(websocket)
                if not _active_connections[user_id]:
                    del _active_connections[user_id]
                logger.info(f"Cleaned up WebSocket connection for user {user_id}")
            except ValueError:
                # Connection was already removed
                pass


def get_active_connections(user_id: int) -> List[WebSocket]:
    """
    Get all active WebSocket connections for a user.
    
    Args:
        user_id: The user ID to query
        
    Returns:
        List of active WebSocket connections for the user
        
    Requirements: 25.7
    
    Example:
        connections = get_active_connections(123)
        print(f"User 123 has {len(connections)} active connections")
    """
    return _active_connections.get(user_id, []).copy()


async def push_update(
    user_id: int,
    update_type: str,
    payload: dict
) -> bool:
    """
    Push update to all active WebSocket connections for a user.
    
    Sends a JSON message to all active connections for the specified user.
    If the user has no active connections, returns False (caller should
    fall back to database storage).
    
    Args:
        user_id: The user ID to push to
        update_type: Type of update (e.g., "leave_approved", "attendance_updated")
        payload: Dictionary containing update data
        
    Returns:
        True if message was pushed to at least one connection, False otherwise
        
    Requirements: 25.1, 25.2, 25.3, 25.5
    
    Example:
        success = await push_update(
            user_id=123,
            update_type="leave_approved",
            payload={
                "request_id": 456,
                "message": "Your leave request has been approved"
            }
        )
        
        if not success:
            # Fall back to database storage
            create_notification(db, user_id, "leave_approved", "...")
    """
    connections = _active_connections.get(user_id, [])
    
    if not connections:
        logger.debug(f"No active WebSocket connections for user {user_id}")
        return False
    
    # Build message
    message = json.dumps({
        "type": update_type,
        "payload": payload,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # Send to all connections
    sent_count = 0
    failed_connections = []
    
    for connection in connections:
        try:
            await connection.send_text(message)
            sent_count += 1
        except Exception as e:
            logger.error(f"Failed to send WebSocket message to user {user_id}: {str(e)}")
            failed_connections.append(connection)
    
    # Clean up failed connections
    if failed_connections:
        for connection in failed_connections:
            try:
                _active_connections[user_id].remove(connection)
            except ValueError:
                pass
        
        if not _active_connections[user_id]:
            del _active_connections[user_id]
    
    logger.info(f"Pushed update '{update_type}' to {sent_count} connections for user {user_id}")
    
    return sent_count > 0


def clear_connections() -> None:
    """
    Clear all active WebSocket connections.
    
    This is primarily useful for testing to ensure a clean state
    between test runs.
    """
    global _active_connections
    _active_connections = {}
    logger.info("Cleared all WebSocket connections")


def get_connection_count(user_id: Optional[int] = None) -> int:
    """
    Get the count of active WebSocket connections.
    
    Args:
        user_id: Optional user ID to get count for specific user.
                 If None, returns total count across all users.
        
    Returns:
        Number of active connections
    """
    if user_id is not None:
        return len(_active_connections.get(user_id, []))
    
    return sum(len(connections) for connections in _active_connections.values())
