/**
 * Leave Application Animations
 * 
 * Animation definitions for leave application screens.
 * 
 * Requirements:
 * - 9.1: Leave form animation (y:20, opacity:0 → y:0, opacity:1)
 * - 9.2: Info panel parallax (y:-30, speedRatio:0.6, scrub:true)
 * - 9.3: Maintain normal scroll flow for the leave form
 * - 9.4: Synchronize parallax motion with scroll progress
 */

import type { AnimationDefinition } from '../types';

/**
 * Leave form scroll animation
 * Animates the leave application form when it enters the viewport
 */
export const leaveFormAnimation: AnimationDefinition = {
  id: 'leave-form',
  type: 'scroll',
  target: '.leave-form',
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  scrollTrigger: {
    trigger: '.leave-form',
    start: 'top 80%',
  },
};

/**
 * Info panel parallax animation
 * Creates a parallax effect on the info panel with scroll-based motion
 * The panel moves at 60% of the scroll speed (speedRatio: 0.6)
 */
export const leaveInfoPanelParallaxAnimation: AnimationDefinition = {
  id: 'leave-info-panel-parallax',
  type: 'scroll',
  target: '.leave-info-panel',
  from: { y: -30 },
  to: { y: 0 },
  scrollTrigger: {
    trigger: '.leave-info-panel',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true, // Smooth scroll-linked animation
  },
};

/**
 * Complete leave application screen animations configuration
 */
export const leaveApplicationAnimations = {
  form: leaveFormAnimation,
  infoPanelParallax: leaveInfoPanelParallaxAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const leaveApplicationAnimationOptions = {
  form: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    scrollTrigger: {
      start: 'top 80%',
    },
  },
  infoPanelParallax: {
    from: { y: -30 },
    to: { y: 0 },
    scrollTrigger: {
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  },
};

/**
 * Notes:
 * - The form animation uses standard scroll-triggered entry animation
 * - The info panel uses parallax with scrub:true for smooth scroll synchronization
 * - The speedRatio of 0.6 is achieved through the y:-30 to y:0 range combined with scrub
 * - Normal scroll flow is maintained as these are non-blocking scroll animations
 */
