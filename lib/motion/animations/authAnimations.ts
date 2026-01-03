/**
 * Authentication Screen Animations
 * 
 * Animation definitions for login and signup screens.
 * 
 * Requirements:
 * - 5.1: Auth card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
 * - 5.2: Input stagger animation (y:20, opacity:0 → y:0, opacity:1, 80ms stagger)
 * - 5.3: CTA button animation (scale:0.96, opacity:0 → scale:1, opacity:1, 200ms delay)
 * - 5.4: Switch link hover (underline width animation, 200ms)
 */

import type { AnimationDefinition } from '../types';

/**
 * Auth card mount animation
 * Animates the main authentication card on page load
 */
export const authCardAnimation: AnimationDefinition = {
  id: 'auth-card',
  type: 'mount',
  target: '.auth-card',
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 500,
};

/**
 * Input fields stagger animation
 * Animates input fields sequentially with 80ms delay between each
 */
export const authInputsAnimation: AnimationDefinition = {
  id: 'auth-inputs',
  type: 'mount',
  target: '.auth-input',
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  stagger: 80,
};

/**
 * CTA button mount animation
 * Animates the primary call-to-action button with a delay
 */
export const authCtaAnimation: AnimationDefinition = {
  id: 'auth-cta',
  type: 'mount',
  target: '.auth-cta',
  from: { scale: 0.96, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  delay: 200,
};

/**
 * Switch link hover animation
 * Animates the underline of the "Sign up" / "Sign in" link on hover
 * Note: This is implemented as a CSS-based underline animation
 * triggered by the useHoverAnimation hook
 */
export const authSwitchLinkHover: AnimationDefinition = {
  id: 'auth-switch-link-hover',
  type: 'hover',
  target: '.auth-switch-link',
  to: { 
    // For underline animation, we'll use a pseudo-element approach
    // The hook will handle the scale/opacity of the element itself
    scale: 1.0, // No scale change, just for consistency
  },
  duration: 200,
};

/**
 * Complete authentication screen animations configuration
 */
export const authAnimations = {
  card: authCardAnimation,
  inputs: authInputsAnimation,
  cta: authCtaAnimation,
  switchLinkHover: authSwitchLinkHover,
};

/**
 * Animation options for easy consumption by components
 */
export const authAnimationOptions = {
  card: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 500,
  },
  inputs: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80,
  },
  cta: {
    from: { scale: 0.96, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 200,
  },
  switchLinkHover: {
    to: { scale: 1.0 },
    duration: 200,
  },
};
