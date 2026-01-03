/**
 * Example usage of validateAnimation function
 * 
 * This file demonstrates how the validateAnimation function works.
 * It is not a test file, just an example for documentation purposes.
 */

import { validateAnimation } from './validation';
import { defaultMotionConfig } from './config';

// Example 1: Valid animation
const validAnimation = {
  duration: 400,
  easing: 'power2.out',
  from: { y: 20, opacity: 0.9 },
  to: { y: 0, opacity: 1 }
};

console.log('Valid animation:', validateAnimation(validAnimation, defaultMotionConfig));
// Expected: true

// Example 2: Duration too short
const tooShortDuration = {
  duration: 100, // Below 150ms minimum
  to: { y: 0 }
};

console.log('Too short duration:', validateAnimation(tooShortDuration, defaultMotionConfig));
// Expected: false, with warning

// Example 3: Duration too long
const tooLongDuration = {
  duration: 800, // Above 600ms maximum
  to: { y: 0 }
};

console.log('Too long duration:', validateAnimation(tooLongDuration, defaultMotionConfig));
// Expected: false, with warning

// Example 4: Forbidden easing
const forbiddenEasing = {
  duration: 400,
  easing: 'elastic.out',
  to: { y: 0 }
};

console.log('Forbidden easing:', validateAnimation(forbiddenEasing, defaultMotionConfig));
// Expected: false, with warning

// Example 5: TranslateY exceeds limit
const excessiveTranslateY = {
  duration: 400,
  from: { y: 50 }, // Exceeds 40px limit
  to: { y: 0 }
};

console.log('Excessive translateY:', validateAnimation(excessiveTranslateY, defaultMotionConfig));
// Expected: false, with warning

// Example 6: TranslateX exceeds limit
const excessiveTranslateX = {
  duration: 400,
  from: { x: -45 }, // Exceeds 40px limit
  to: { x: 0 }
};

console.log('Excessive translateX:', validateAnimation(excessiveTranslateX, defaultMotionConfig));
// Expected: false, with warning

// Example 7: Scale exceeds limit
const excessiveScale = {
  duration: 400,
  to: { scale: 1.1 } // Exceeds 1.05 limit
};

console.log('Excessive scale:', validateAnimation(excessiveScale, defaultMotionConfig));
// Expected: false, with warning

// Example 8: Opacity below minimum
const lowOpacity = {
  duration: 400,
  from: { opacity: 0.5 } // Below 0.85 minimum
};

console.log('Low opacity:', validateAnimation(lowOpacity, defaultMotionConfig));
// Expected: false, with warning

// Example 9: Multiple violations
const multipleViolations = {
  duration: 50, // Too short
  easing: 'bounce.out', // Forbidden
  from: { y: 60, opacity: 0.3 }, // Both exceed limits
  to: { scale: 1.2 } // Exceeds limit
};

console.log('Multiple violations:', validateAnimation(multipleViolations, defaultMotionConfig));
// Expected: false, with multiple warnings
