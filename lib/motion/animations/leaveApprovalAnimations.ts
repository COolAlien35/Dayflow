/**
 * Leave Approval Screen Animations
 * 
 * Animation definitions for the leave approval admin screen.
 * 
 * Requirements:
 * - 10.1: Approval table animation (opacity:0 → opacity:1)
 * - 10.2: Button hover (scale:1.04)
 * - 10.3: Row action animations (background flash)
 * - 10.4: Status cell animation (scale:1.08 with color transition)
 * - 10.5: Toast enter animation (y:-20, opacity:0 → visible)
 * - 10.6: Toast exit animation (y:-20, opacity:0)
 * - 10.7: Toast auto-dismiss (2000ms)
 */

import type { AnimationDefinition } from '../types';

/**
 * Approval table scroll animation
 * Animates the approval table when it enters the viewport
 */
export const leaveApprovalTableAnimation: AnimationDefinition = {
  id: 'leave-approval-table',
  type: 'scroll',
  target: '.leave-approval-table',
  from: { opacity: 0 },
  to: { opacity: 1 },
  scrollTrigger: {
    trigger: '.leave-approval-table',
    start: 'top 80%',
  },
};

/**
 * Approve button hover animation
 * Animates the approve button on hover
 */
export const leaveApprovalApproveButtonHover: AnimationDefinition = {
  id: 'leave-approval-approve-button-hover',
  type: 'hover',
  target: '.leave-approval-approve-button',
  to: { scale: 1.04 },
  duration: 200,
};

/**
 * Reject button hover animation
 * Animates the reject button on hover
 */
export const leaveApprovalRejectButtonHover: AnimationDefinition = {
  id: 'leave-approval-reject-button-hover',
  type: 'hover',
  target: '.leave-approval-reject-button',
  to: { scale: 1.04 },
  duration: 200,
};

/**
 * Row action background flash animation
 * Flashes the row background when an approval/rejection action occurs
 * Note: This is an action-triggered animation, not mount/scroll/hover
 */
export const leaveApprovalRowFlashAnimation: AnimationDefinition = {
  id: 'leave-approval-row-flash',
  type: 'action',
  target: '.leave-approval-row',
  to: { 
    backgroundColor: '#f0f0f0',
  },
  duration: 300,
  // Note: yoyo and repeat are handled in the implementation
};

/**
 * Status cell scale animation
 * Scales the status cell when status changes
 * Note: This is an action-triggered animation
 */
export const leaveApprovalStatusCellAnimation: AnimationDefinition = {
  id: 'leave-approval-status-cell',
  type: 'action',
  target: '.leave-approval-status-cell',
  to: { scale: 1.08 },
  duration: 200,
};

/**
 * Toast enter animation
 * Animates toast notification entry
 */
export const leaveApprovalToastEnterAnimation: AnimationDefinition = {
  id: 'leave-approval-toast-enter',
  type: 'action',
  target: '.leave-approval-toast',
  from: { y: -20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 300,
};

/**
 * Toast exit animation
 * Animates toast notification exit
 */
export const leaveApprovalToastExitAnimation: AnimationDefinition = {
  id: 'leave-approval-toast-exit',
  type: 'action',
  target: '.leave-approval-toast',
  to: { y: -20, opacity: 0 },
  duration: 300,
};

/**
 * Complete leave approval screen animations configuration
 */
export const leaveApprovalAnimations = {
  table: leaveApprovalTableAnimation,
  approveButtonHover: leaveApprovalApproveButtonHover,
  rejectButtonHover: leaveApprovalRejectButtonHover,
  rowFlash: leaveApprovalRowFlashAnimation,
  statusCell: leaveApprovalStatusCellAnimation,
  toastEnter: leaveApprovalToastEnterAnimation,
  toastExit: leaveApprovalToastExitAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const leaveApprovalAnimationOptions = {
  table: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    scrollTrigger: {
      start: 'top 80%',
    },
  },
  approveButtonHover: {
    to: { scale: 1.04 },
    duration: 200,
  },
  rejectButtonHover: {
    to: { scale: 1.04 },
    duration: 200,
  },
  rowFlash: {
    to: { backgroundColor: '#f0f0f0' },
    duration: 300,
    yoyo: true,
    repeat: 1,
  },
  statusCell: {
    to: { scale: 1.08 },
    duration: 200,
  },
  toast: {
    enter: {
      from: { y: -20, opacity: 0 },
      to: { y: 0, opacity: 1 },
      duration: 300,
    },
    exit: {
      to: { y: -20, opacity: 0 },
      duration: 300,
    },
    autoDismiss: 2000, // milliseconds
  },
};
