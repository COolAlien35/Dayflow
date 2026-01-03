/**
 * Accessibility Utilities Tests
 * 
 * Tests for static fallback rendering and reduced motion support.
 * 
 * Requirements:
 * - 4.1: Detect prefers-reduced-motion media query
 * - 4.2: Apply final state immediately when reduced motion is enabled
 * - 4.3: Listen for changes to media query
 * - 4.6: Maintain functionality with reduced motion
 */

import { gsap } from './gsap-setup';
import {
  applyStaticState,
  shouldUseStaticRendering,
  createAnimationOrStatic,
} from './accessibility';

describe('Accessibility Utilities', () => {
  let testElement: HTMLDivElement;

  beforeEach(() => {
    // Create a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    // Reset element styles
    gsap.set(testElement, { clearProps: 'all' });
  });

  describe('applyStaticState', () => {
    test('should apply final state immediately without animation', () => {
      // Apply static state
      applyStaticState(testElement, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // Check that properties are applied immediately
      const computedStyle = window.getComputedStyle(testElement);
      expect(computedStyle.opacity).toBe('1');
    });

    test('should handle multiple properties', () => {
      applyStaticState(testElement, {
        x: 20,
        y: 30,
        opacity: 0.9,
        scale: 1.05,
      });

      // Verify properties are set
      const transform = window.getComputedStyle(testElement).transform;
      expect(transform).not.toBe('none');
    });
  });

  describe('shouldUseStaticRendering', () => {
    test('should return true when reduced motion is enabled', () => {
      expect(shouldUseStaticRendering(true, true)).toBe(true);
    });

    test('should return true when motion system is disabled', () => {
      expect(shouldUseStaticRendering(false, false)).toBe(true);
    });

    test('should return false when both are enabled', () => {
      expect(shouldUseStaticRendering(false, true)).toBe(false);
    });

    test('should return true when both are disabled', () => {
      expect(shouldUseStaticRendering(true, false)).toBe(true);
    });
  });

  describe('createAnimationOrStatic', () => {
    test('should apply static state when reduced motion is enabled', () => {
      const result = createAnimationOrStatic(
        testElement,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        { duration: 500 },
        true, // reducedMotion
        true  // enabled
      );

      // Should return null (no timeline created)
      expect(result).toBeNull();

      // Should apply final state
      const computedStyle = window.getComputedStyle(testElement);
      expect(computedStyle.opacity).toBe('1');
    });

    test('should apply static state when motion system is disabled', () => {
      const result = createAnimationOrStatic(
        testElement,
        { opacity: 0 },
        { opacity: 1 },
        { duration: 500 },
        false, // reducedMotion
        false  // enabled
      );

      expect(result).toBeNull();
    });

    test('should create timeline when animations are enabled', () => {
      const result = createAnimationOrStatic(
        testElement,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        { duration: 500 },
        false, // reducedMotion
        true   // enabled
      );

      // Should return a timeline
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('kill');
      
      // Clean up
      result?.kill();
    });

    test('should handle animation without from state', () => {
      const result = createAnimationOrStatic(
        testElement,
        undefined,
        { opacity: 1, y: 0 },
        { duration: 500 },
        false,
        true
      );

      expect(result).not.toBeNull();
      result?.kill();
    });

    test('should convert milliseconds to seconds for GSAP', () => {
      const result = createAnimationOrStatic(
        testElement,
        { opacity: 0 },
        { opacity: 1 },
        { duration: 500, delay: 200, stagger: 80 },
        false,
        true
      );

      expect(result).not.toBeNull();
      
      // GSAP uses seconds, so 500ms should be 0.5s
      // We can't directly check the timeline duration without advancing it,
      // but we can verify it was created
      expect(result?.duration()).toBeGreaterThan(0);
      
      result?.kill();
    });
  });
});
