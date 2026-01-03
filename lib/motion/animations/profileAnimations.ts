/**
 * Profile Page Animations
 * 
 * Animation definitions for user profile screens.
 * 
 * Requirements:
 * - 7.1: Profile avatar animation (scale:0.9, opacity:0 → scale:1, opacity:1)
 * - 7.2: Avatar pin during scroll (15% of scroll duration)
 * - 7.3: Profile info rows stagger (y:20, opacity:0 → y:0, opacity:1, 80ms stagger)
 * - 7.4: Edit button mount animation (scale:0.95 → scale:1)
 * - 7.5: Edit button hover animation (scale:1.04)
 * - 7.6: Note box animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
 */

import type { AnimationDefinition } from '../types';

/**
 * Profile avatar scroll animation with pin
 * Animates the avatar when it enters viewport and pins it during scroll
 */
export const profileAvatarAnimation: AnimationDefinition = {
  id: 'profile-avatar',
  type: 'scroll',
  target: '.profile-avatar',
  from: { scale: 0.9, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  scrollTrigger: {
    trigger: '.profile-avatar',
    start: 'top 80%',
    pin: true,
    pinSpacing: false,
    // Pin duration is 15% of scroll range
    end: '+=15%',
  },
};

/**
 * Profile info rows stagger animation
 * Animates profile information rows sequentially with 80ms delay between each
 */
export const profileInfoRowsAnimation: AnimationDefinition = {
  id: 'profile-info-rows',
  type: 'mount',
  target: '.profile-info-row',
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  stagger: 80,
};

/**
 * Edit button mount animation
 * Animates the edit button when it appears
 */
export const profileEditButtonAnimation: AnimationDefinition = {
  id: 'profile-edit-button',
  type: 'mount',
  target: '.profile-edit-button',
  from: { scale: 0.95 },
  to: { scale: 1 },
};

/**
 * Edit button hover animation
 * Animates the edit button on hover
 */
export const profileEditButtonHover: AnimationDefinition = {
  id: 'profile-edit-button-hover',
  type: 'hover',
  target: '.profile-edit-button',
  to: { scale: 1.04 },
  duration: 200,
};

/**
 * Note box scroll animation
 * Animates note boxes when they enter the viewport
 */
export const profileNoteBoxAnimation: AnimationDefinition = {
  id: 'profile-note-box',
  type: 'scroll',
  target: '.profile-note-box',
  from: { scale: 0.98, opacity: 0.9 },
  to: { scale: 1, opacity: 1 },
  scrollTrigger: {
    trigger: '.profile-note-box',
    start: 'top 80%',
  },
};

/**
 * Complete profile screen animations configuration
 */
export const profileAnimations = {
  avatar: profileAvatarAnimation,
  infoRows: profileInfoRowsAnimation,
  editButton: profileEditButtonAnimation,
  editButtonHover: profileEditButtonHover,
  noteBox: profileNoteBoxAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const profileAnimationOptions = {
  avatar: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    scrollTrigger: {
      start: 'top 80%',
      pin: true,
      pinSpacing: false,
      end: '+=15%',
    },
  },
  infoRows: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80,
  },
  editButton: {
    from: { scale: 0.95 },
    to: { scale: 1 },
  },
  editButtonHover: {
    to: { scale: 1.04 },
    duration: 200,
  },
  noteBox: {
    from: { scale: 0.98, opacity: 0.9 },
    to: { scale: 1, opacity: 1 },
    scrollTrigger: {
      start: 'top 80%',
    },
  },
};
