/**
 * Animation Controller Tests
 * 
 * Tests for animation lifecycle management, timeline registry, and validation integration.
 * 
 * Requirements:
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up all GSAP timelines on component unmount
 */

import { gsap } from './gsap-setup';
import { AnimationController } from './AnimationController';
import { defaultMotionConfig } from './config';
import { AnimationOptions } from './validation';

describe('AnimationController', () => {
  let controller: AnimationController;
  let testElement: HTMLDivElement;

  beforeEach(() => {
    // Create a new controller with default config
    controller = new AnimationController(defaultMotionConfig);
    
    // Create a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    // Reset element styles
    gsap.set(testElement, { clearProps: 'all' });
  });

  afterEach(() => {
    // Clean up all animations
    controller.killAll();
    
    // Remove test element
    if (testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
  });

  describe('register', () => {
    test('should register a timeline without validation options', () => {
      const timeline = gsap.timeline();
      const result = controller.register('test-animation', timeline);
      
      expect(result).toBe(true);
      expect(controller.has('test-animation')).toBe(true);
      expect(controller.getCount()).toBe(1);
    });

    test('should register a timeline with valid animation options', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 400,
        to: { y: 20, opacity: 1 },
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(true);
      expect(controller.has('test-animation')).toBe(true);
    });

    test('should reject registration with invalid duration (too short)', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 100, // Below minimum of 150ms
        to: { opacity: 1 },
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(false);
      expect(controller.has('test-animation')).toBe(false);
      expect(controller.getCount()).toBe(0);
    });

    test('should reject registration with invalid duration (too long)', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 700, // Above maximum of 600ms
        to: { opacity: 1 },
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(false);
      expect(controller.has('test-animation')).toBe(false);
    });

    test('should reject registration with forbidden easing', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 400,
        easing: 'elastic.out',
        to: { opacity: 1 },
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(false);
      expect(controller.has('test-animation')).toBe(false);
    });

    test('should reject registration with invalid transform (translateY too large)', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 400,
        to: { y: 50 }, // Above maximum of 40px
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(false);
      expect(controller.has('test-animation')).toBe(false);
    });

    test('should reject registration with invalid transform (scale too large)', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 400,
        to: { scale: 1.1 }, // Above maximum of 1.05
      };
      
      const result = controller.register('test-animation', timeline, options);
      
      expect(result).toBe(false);
      expect(controller.has('test-animation')).toBe(false);
    });

    test('should allow multiple animations to be registered', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      const timeline3 = gsap.timeline();
      
      controller.register('animation-1', timeline1);
      controller.register('animation-2', timeline2);
      controller.register('animation-3', timeline3);
      
      expect(controller.getCount()).toBe(3);
      expect(controller.has('animation-1')).toBe(true);
      expect(controller.has('animation-2')).toBe(true);
      expect(controller.has('animation-3')).toBe(true);
    });

    test('should overwrite existing animation with same ID', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      
      controller.register('test-animation', timeline1);
      expect(controller.getCount()).toBe(1);
      
      controller.register('test-animation', timeline2);
      expect(controller.getCount()).toBe(1);
      
      // Should have the second timeline
      expect(controller.get('test-animation')).toBe(timeline2);
    });
  });

  describe('unregister', () => {
    test('should unregister and kill a specific animation', () => {
      const timeline = gsap.timeline();
      timeline.to(testElement, { opacity: 0, duration: 1 });
      
      controller.register('test-animation', timeline);
      expect(controller.has('test-animation')).toBe(true);
      
      controller.unregister('test-animation');
      
      expect(controller.has('test-animation')).toBe(false);
      expect(controller.getCount()).toBe(0);
    });

    test('should handle unregistering non-existent animation gracefully', () => {
      expect(() => {
        controller.unregister('non-existent');
      }).not.toThrow();
      
      expect(controller.getCount()).toBe(0);
    });

    test('should kill the timeline when unregistering', () => {
      const timeline = gsap.timeline();
      const killSpy = jest.spyOn(timeline, 'kill');
      
      controller.register('test-animation', timeline);
      controller.unregister('test-animation');
      
      expect(killSpy).toHaveBeenCalled();
    });

    test('should allow re-registration after unregistering', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      
      controller.register('test-animation', timeline1);
      controller.unregister('test-animation');
      
      const result = controller.register('test-animation', timeline2);
      
      expect(result).toBe(true);
      expect(controller.has('test-animation')).toBe(true);
      expect(controller.get('test-animation')).toBe(timeline2);
    });
  });

  describe('killAll', () => {
    test('should kill all registered animations', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      const timeline3 = gsap.timeline();
      
      controller.register('animation-1', timeline1);
      controller.register('animation-2', timeline2);
      controller.register('animation-3', timeline3);
      
      expect(controller.getCount()).toBe(3);
      
      controller.killAll();
      
      expect(controller.getCount()).toBe(0);
      expect(controller.has('animation-1')).toBe(false);
      expect(controller.has('animation-2')).toBe(false);
      expect(controller.has('animation-3')).toBe(false);
    });

    test('should call kill on each timeline', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      
      const killSpy1 = jest.spyOn(timeline1, 'kill');
      const killSpy2 = jest.spyOn(timeline2, 'kill');
      
      controller.register('animation-1', timeline1);
      controller.register('animation-2', timeline2);
      
      controller.killAll();
      
      expect(killSpy1).toHaveBeenCalled();
      expect(killSpy2).toHaveBeenCalled();
    });

    test('should handle empty registry gracefully', () => {
      expect(() => {
        controller.killAll();
      }).not.toThrow();
      
      expect(controller.getCount()).toBe(0);
    });

    test('should allow new registrations after killAll', () => {
      const timeline1 = gsap.timeline();
      const timeline2 = gsap.timeline();
      
      controller.register('animation-1', timeline1);
      controller.killAll();
      
      const result = controller.register('animation-2', timeline2);
      
      expect(result).toBe(true);
      expect(controller.getCount()).toBe(1);
      expect(controller.has('animation-2')).toBe(true);
    });
  });

  describe('getCount', () => {
    test('should return 0 for empty registry', () => {
      expect(controller.getCount()).toBe(0);
    });

    test('should return correct count after registrations', () => {
      controller.register('animation-1', gsap.timeline());
      expect(controller.getCount()).toBe(1);
      
      controller.register('animation-2', gsap.timeline());
      expect(controller.getCount()).toBe(2);
      
      controller.register('animation-3', gsap.timeline());
      expect(controller.getCount()).toBe(3);
    });

    test('should return correct count after unregistrations', () => {
      controller.register('animation-1', gsap.timeline());
      controller.register('animation-2', gsap.timeline());
      controller.register('animation-3', gsap.timeline());
      
      controller.unregister('animation-2');
      expect(controller.getCount()).toBe(2);
      
      controller.unregister('animation-1');
      expect(controller.getCount()).toBe(1);
    });
  });

  describe('has', () => {
    test('should return false for non-existent animation', () => {
      expect(controller.has('non-existent')).toBe(false);
    });

    test('should return true for registered animation', () => {
      controller.register('test-animation', gsap.timeline());
      expect(controller.has('test-animation')).toBe(true);
    });

    test('should return false after unregistering', () => {
      controller.register('test-animation', gsap.timeline());
      controller.unregister('test-animation');
      expect(controller.has('test-animation')).toBe(false);
    });
  });

  describe('get', () => {
    test('should return undefined for non-existent animation', () => {
      expect(controller.get('non-existent')).toBeUndefined();
    });

    test('should return the registered timeline', () => {
      const timeline = gsap.timeline();
      controller.register('test-animation', timeline);
      
      expect(controller.get('test-animation')).toBe(timeline);
    });

    test('should return undefined after unregistering', () => {
      controller.register('test-animation', gsap.timeline());
      controller.unregister('test-animation');
      
      expect(controller.get('test-animation')).toBeUndefined();
    });
  });

  describe('updateConfig', () => {
    test('should update the configuration used for validation', () => {
      const timeline = gsap.timeline();
      const options: AnimationOptions = {
        duration: 500,
        to: { opacity: 1 },
      };
      
      // Should succeed with default config
      const result1 = controller.register('test-1', timeline, options);
      expect(result1).toBe(true);
      
      // Update config to have stricter duration limits
      const strictConfig = {
        ...defaultMotionConfig,
        timing: {
          ...defaultMotionConfig.timing,
          maxDuration: 400, // Lower than 500ms
        },
      };
      
      controller.updateConfig(strictConfig);
      
      // Should now fail with the same options
      const timeline2 = gsap.timeline();
      const result2 = controller.register('test-2', timeline2, options);
      expect(result2).toBe(false);
    });
  });

  describe('integration with GSAP timelines', () => {
    test('should work with actual GSAP animations', () => {
      const timeline = gsap.timeline();
      timeline.to(testElement, { opacity: 0, duration: 0.4 });
      
      controller.register('fade-out', timeline);
      
      expect(controller.has('fade-out')).toBe(true);
      // Timeline may or may not be active immediately in test environment
      // The important thing is that it's registered
      
      controller.unregister('fade-out');
      
      // Timeline should be killed
      expect(timeline.isActive()).toBe(false);
    });

    test('should handle complex timeline with multiple tweens', () => {
      const timeline = gsap.timeline();
      timeline
        .to(testElement, { opacity: 0, duration: 0.2 })
        .to(testElement, { y: 20, duration: 0.2 })
        .to(testElement, { scale: 1.05, duration: 0.2 });
      
      controller.register('complex-animation', timeline);
      
      expect(controller.has('complex-animation')).toBe(true);
      
      controller.killAll();
      
      expect(timeline.isActive()).toBe(false);
    });
  });
});
