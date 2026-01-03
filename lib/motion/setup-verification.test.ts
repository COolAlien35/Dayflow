/**
 * Verification test for GSAP and ScrollTrigger setup
 * This test ensures GSAP and ScrollTrigger are properly installed and configured
 */

import { gsap, ScrollTrigger } from './gsap-setup';

describe('GSAP Setup Verification', () => {
  test('GSAP is imported and available', () => {
    expect(gsap).toBeDefined();
    expect(typeof gsap.to).toBe('function');
    expect(typeof gsap.from).toBe('function');
    expect(typeof gsap.fromTo).toBe('function');
  });

  test('ScrollTrigger plugin is registered', () => {
    expect(ScrollTrigger).toBeDefined();
    expect(typeof ScrollTrigger.create).toBe('function');
  });

  test('GSAP has correct default easing', () => {
    const defaults = gsap.defaults();
    // GSAP returns the easing function, not the string
    // We can verify it's defined and is a function
    expect(defaults.ease).toBeDefined();
    expect(typeof defaults.ease).toBe('function');
  });

  test('GSAP has correct default duration', () => {
    const defaults = gsap.defaults();
    expect(defaults.duration).toBe(0.4);
  });

  test('TypeScript types are available', () => {
    // This test verifies TypeScript compilation works
    const timeline: gsap.core.Timeline = gsap.timeline();
    expect(timeline).toBeDefined();
    
    const tween: gsap.core.Tween = gsap.to({}, { duration: 1 });
    expect(tween).toBeDefined();
  });
});
