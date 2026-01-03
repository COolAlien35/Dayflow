"""Seed admin user script."""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.database import SessionLocal
from api.models import User, Profile
from api.auth import hash_password


def seed_admin():
    """Create admin user with admin@company.com and password 'Admin123'."""
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == "admin@company.com").first()
        
        if existing_admin:
            print("Admin user already exists!")
            return
        
        # Create admin user (password: Admin123 - meets 8+ chars, uppercase, lowercase, digit)
        password_hash = hash_password("Admin123")
        
        admin_user = User(
            email="admin@company.com",
            password_hash=password_hash,
            role="Admin"
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        # Create admin profile
        admin_profile = Profile(
            user_id=admin_user.id,
            first_name="Admin",
            last_name="User",
            department="Administration",
            position="System Administrator"
        )
        
        db.add(admin_profile)
        db.commit()
        
        print("Admin user created successfully!")
        print("Email: admin@company.com")
        print("Password: Admin123")
        
    except Exception as e:
        db.rollback()
        print(f"Error creating admin user: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
