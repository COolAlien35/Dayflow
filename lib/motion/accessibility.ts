/**
 * Accessibility Utilities for Motion System
 * 
 * Provides static fallback rendering for users with reduced motion preferences.
 * 
 * Requirements:
 * - 4.2: When reduced motion is enabled, apply final animation state immediately using gsap.set()
 * - 4.6: Maintain full functionality when animations are disabled
 */

import { gsap } from './gsap-setup';

/**
 * Apply static animation state without animation
 * 
 * When reduced motion is enabled, this function applies the final animation state
 * immediately using gsap.set() instead of creating an animated timeline.
 * 
 * @param target - Element(s) to apply state to
 * @param finalState - The final state to apply (typically the 'to' properties)
 * 
 * Requirements:
 * - 4.2: Apply final state immediately using gsap.set()
 * - 4.6: Maintain functionality without animation
 */
export function applyStaticState(
  target: gsap.TweenTarget,
  finalState: gsap.TweenVars
): void {
  // Use gsap.set() to apply the final state immediately without animation
  gsap.set(target, finalState);
}

/**
 * Check if an element should use static rendering
 * 
 * @param reducedMotion - Whether reduced motion is enabled
 * @param enabled - Whether the motion system is globally enabled
 * @returns true if static rendering should be used
 */
export function shouldUseStaticRendering(
  reducedMotion: boolean,
  enabled: boolean
): boolean {
  return !enabled || reducedMotion;
}

/**
 * Apply animation or static state based on accessibility preferences
 * 
 * This is a helper function that animation hooks can use to either create
 * an animation or apply static state based on the motion system configuration.
 * 
 * @param target - Element(s) to animate or apply state to
 * @param from - Initial animation state (optional)
 * @param to - Final animation state
 * @param options - Animation options (duration, delay, etc.)
 * @param reducedMotion - Whether reduced motion is enabled
 * @param enabled - Whether the motion system is globally enabled
 * @returns GSAP timeline if animation is created, null if static state is applied
 * 
 * Requirements:
 * - 4.2: Skip timeline creation for all animation types when reduced motion is enabled
 * - 4.6: Maintain functionality with static rendering
 */
export function createAnimationOrStatic(
  target: gsap.TweenTarget,
  from: gsap.TweenVars | undefined,
  to: gsap.TweenVars,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    [key: string]: any;
  },
  reducedMotion: boolean,
  enabled: boolean
): gsap.core.Timeline | null {
  // If reduced motion is enabled or motion system is disabled, apply static state
  if (shouldUseStaticRendering(reducedMotion, enabled)) {
    applyStaticState(target, to);
    return null;
  }

  // Create animated timeline
  const timeline = gsap.timeline();

  if (from) {
    // Use fromTo if initial state is provided
    timeline.fromTo(target, from, {
      ...to,
      duration: options.duration ? options.duration / 1000 : undefined,
      delay: options.delay ? options.delay / 1000 : undefined,
      stagger: options.stagger ? options.stagger / 1000 : undefined,
      ease: options.ease,
      ...options,
    });
  } else {
    // Use to if only final state is provided
    timeline.to(target, {
      ...to,
      duration: options.duration ? options.duration / 1000 : undefined,
      delay: options.delay ? options.delay / 1000 : undefined,
      stagger: options.stagger ? options.stagger / 1000 : undefined,
      ease: options.ease,
      ...options,
    });
  }

  return timeline;
}
