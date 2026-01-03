/**
 * Animation Controller
 * 
 * Manages animation lifecycle, timeline registry, and validation.
 * 
 * Requirements:
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up all GSAP timelines on component unmount
 */

import { gsap } from 'gsap';
import { validateAnimation, AnimationOptions } from './validation';
import { MotionConfig } from './config';

/**
 * AnimationController class
 * 
 * Manages the lifecycle of GSAP animations including:
 * - Timeline registration and tracking
 * - Validation before registration
 * - Cleanup and disposal
 */
export class AnimationController {
  private timelines: Map<string, gsap.core.Timeline>;
  private config: MotionConfig;

  /**
   * Creates a new AnimationController instance
   * 
   * @param config - Motion system configuration for validation
   */
  constructor(config: MotionConfig) {
    this.timelines = new Map();
    this.config = config;
  }

  /**
   * Register an animation timeline for lifecycle management
   * 
   * Validates the animation options before registration.
   * If validation fails, the timeline is not registered.
   * 
   * @param id - Unique identifier for the animation
   * @param timeline - GSAP timeline to register
   * @param options - Animation options to validate (optional)
   * @returns true if registration succeeded, false if validation failed
   * 
   * Requirements:
   * - 17.1: Initialize animations on component mount
   * - Integrates validateAnimation() before registration
   */
  register(
    id: string,
    timeline: gsap.core.Timeline,
    options?: AnimationOptions
  ): boolean {
    // Validate animation options if provided
    if (options) {
      const isValid = validateAnimation(options, this.config);
      
      if (!isValid) {
        console.warn(
          `[AnimationController] Animation "${id}" failed validation and will not be registered`
        );
        return false;
      }
    }

    // Register the timeline
    this.timelines.set(id, timeline);
    
    return true;
  }

  /**
   * Unregister and cleanup a specific animation
   * 
   * Kills the timeline and removes it from the registry.
   * 
   * @param id - Unique identifier of the animation to unregister
   * 
   * Requirements:
   * - 17.2: Clean up GSAP timelines on component unmount
   */
  unregister(id: string): void {
    const timeline = this.timelines.get(id);
    
    if (timeline) {
      // Kill the timeline to stop and cleanup the animation
      timeline.kill();
      
      // Remove from registry
      this.timelines.delete(id);
    }
  }

  /**
   * Kill all registered animations
   * 
   * Stops and cleans up all timelines in the registry.
   * Used for performance safeguards and accessibility.
   * 
   * Requirements:
   * - 17.2: Clean up all GSAP timelines
   */
  killAll(): void {
    // Kill each timeline
    this.timelines.forEach((timeline) => {
      timeline.kill();
    });
    
    // Clear the registry
    this.timelines.clear();
  }

  /**
   * Get the number of registered animations
   * 
   * @returns Number of active animations in the registry
   */
  getCount(): number {
    return this.timelines.size;
  }

  /**
   * Check if an animation is registered
   * 
   * @param id - Unique identifier of the animation
   * @returns true if the animation is registered, false otherwise
   */
  has(id: string): boolean {
    return this.timelines.has(id);
  }

  /**
   * Get a registered timeline by ID
   * 
   * @param id - Unique identifier of the animation
   * @returns The timeline if found, undefined otherwise
   */
  get(id: string): gsap.core.Timeline | undefined {
    return this.timelines.get(id);
  }

  /**
   * Update the configuration used for validation
   * 
   * @param config - New motion system configuration
   */
  updateConfig(config: MotionConfig): void {
    this.config = config;
  }
}
