/**
 * Animation Validation
 * 
 * Validates animation configurations against motion system constraints.
 * 
 * Requirements:
 * - 1.7: Prohibit elastic, bounce, and back easing functions
 * - 2.1: Maximum duration 600ms
 * - 2.2: Minimum duration 150ms
 * - 2.4: Validate durations before execution
 * - 3.1: Maximum translateY 40px
 * - 3.2: Maximum translateX 40px
 * - 3.3: Maximum scale 1.05
 * - 3.4: Minimum opacity 0.85
 * - 3.6: Validate transforms before execution
 * - 15.2: No CSS shadows in animated elements
 */

import { MotionConfig } from './config';
import { validatePerformanceConstraints } from './performance-constraints';

/**
 * Animation options interface for validation
 */
export interface AnimationOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  easing?: string;
  from?: {
    x?: number;
    y?: number;
    scale?: number;
    opacity?: number;
    [key: string]: any;
  };
  to?: {
    x?: number;
    y?: number;
    scale?: number;
    opacity?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Validates animation configuration against motion system constraints
 * 
 * @param options - Animation options to validate
 * @param config - Motion system configuration
 * @returns true if animation is valid, false otherwise
 * 
 * Validates:
 * - Duration constraints (min/max)
 * - Transform limits (translateX, translateY, scale, opacity)
 * - Forbidden easing functions (elastic, bounce, back)
 * - Performance constraints (no CSS shadows in animations)
 * 
 * Logs warnings for violations to help developers identify issues.
 */
export function validateAnimation(
  options: AnimationOptions,
  config: MotionConfig
): boolean {
  let isValid = true;

  // Check duration constraints (Requirements 2.1, 2.2, 2.4)
  if (options.duration !== undefined) {
    if (options.duration < config.timing.minDuration) {
      console.warn(
        `[Motion System] Duration ${options.duration}ms is below minimum ${config.timing.minDuration}ms`
      );
      isValid = false;
    }
    
    if (options.duration > config.timing.maxDuration) {
      console.warn(
        `[Motion System] Duration ${options.duration}ms exceeds maximum ${config.timing.maxDuration}ms`
      );
      isValid = false;
    }
  }

  // Check forbidden easing functions (Requirement 1.7)
  const forbiddenEasings = ['elastic', 'bounce', 'back'];
  if (options.easing) {
    const hasForbidenEasing = forbiddenEasings.some(forbidden => 
      options.easing!.toLowerCase().includes(forbidden)
    );
    
    if (hasForbidenEasing) {
      console.warn(
        `[Motion System] Easing "${options.easing}" is forbidden. Use "power2.out" or "power1.out" instead.`
      );
      isValid = false;
    }
  }

  // Helper function to validate transforms in an object
  const validateTransforms = (transforms: any, label: string): void => {
    if (!transforms) return;

    // Check translateY limit (Requirement 3.1)
    if (transforms.y !== undefined) {
      const absY = Math.abs(transforms.y);
      if (absY > config.transforms.maxTranslateY) {
        console.warn(
          `[Motion System] ${label} translateY ${transforms.y}px exceeds limit of ±${config.transforms.maxTranslateY}px`
        );
        isValid = false;
      }
    }

    // Check translateX limit (Requirement 3.2)
    if (transforms.x !== undefined) {
      const absX = Math.abs(transforms.x);
      if (absX > config.transforms.maxTranslateX) {
        console.warn(
          `[Motion System] ${label} translateX ${transforms.x}px exceeds limit of ±${config.transforms.maxTranslateX}px`
        );
        isValid = false;
      }
    }

    // Check scale limit (Requirement 3.3)
    if (transforms.scale !== undefined) {
      if (transforms.scale > config.transforms.maxScale) {
        console.warn(
          `[Motion System] ${label} scale ${transforms.scale} exceeds maximum ${config.transforms.maxScale}`
        );
        isValid = false;
      }
    }

    // Check opacity minimum (Requirement 3.4)
    if (transforms.opacity !== undefined) {
      if (transforms.opacity < config.transforms.minOpacity) {
        console.warn(
          `[Motion System] ${label} opacity ${transforms.opacity} is below minimum ${config.transforms.minOpacity}`
        );
        isValid = false;
      }
    }
  };

  // Validate 'from' transforms (Requirement 3.6)
  validateTransforms(options.from, 'from');

  // Validate 'to' transforms (Requirement 3.6)
  validateTransforms(options.to, 'to');

  // Validate performance constraints (Requirement 15.2)
  const performanceValid = validatePerformanceConstraints(options);
  if (!performanceValid) {
    isValid = false;
  }

  return isValid;
}
