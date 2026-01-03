/**
 * Global Note Block Animations
 * 
 * Animation definitions for note and info blocks used across all pages.
 * These animations ensure consistency for informational elements throughout the application.
 * 
 * Requirements:
 * - 12.1: Note block animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
 * - 12.2: Note block animation consistency across all pages
 * - 12.3: Hover effect (increase box-shadow depth)
 * 
 * IMPORTANT: These animations should be applied consistently to all note blocks,
 * info panels, and alert boxes across the application to maintain visual coherence.
 */

import type { AnimationDefinition } from '../types';

/**
 * Note block scroll animation
 * Animates note blocks, info panels, and alert boxes when they enter the viewport
 * 
 * This animation is subtle to avoid distracting from the content while still
 * providing a polished entry effect.
 */
export const noteBlockAnimation: AnimationDefinition = {
  id: 'global-note-block',
  type: 'scroll',
  target: '.note-block',
  from: { scale: 0.98, opacity: 0.9 },
  to: { scale: 1, opacity: 1 },
  scrollTrigger: {
    trigger: '.note-block',
    start: 'top 80%',
  },
};

/**
 * Note block hover animation
 * Increases box-shadow depth on hover to provide interactive feedback
 * 
 * This hover effect is applied via CSS transitions rather than GSAP
 * for better performance with multiple elements.
 */
export const noteBlockHoverAnimation: AnimationDefinition = {
  id: 'global-note-block-hover',
  type: 'hover',
  target: '.note-block',
  to: {
    // Box-shadow is handled via CSS for performance
    // This definition is for documentation purposes
    scale: 1.0, // No scale change, just shadow
  },
  duration: 200,
};

/**
 * Complete global note block animations configuration
 */
export const globalNoteAnimations = {
  noteBlock: noteBlockAnimation,
  noteBlockHover: noteBlockHoverAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const globalNoteAnimationOptions = {
  noteBlock: {
    from: { scale: 0.98, opacity: 0.9 },
    to: { scale: 1, opacity: 1 },
    start: 'top 80%',
  },
  noteBlockHover: {
    to: { scale: 1.0 },
    duration: 200,
  },
};

/**
 * CSS classes for note blocks:
 * 
 * Base class: .note-block
 * - Should be applied to all note blocks, info panels, and alert boxes
 * - Enables consistent animation behavior
 * 
 * Hover effect (add to your CSS):
 * ```css
 * .note-block {
 *   transition: box-shadow 200ms ease-out;
 *   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 * }
 * 
 * .note-block:hover {
 *   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
 * }
 * ```
 */

