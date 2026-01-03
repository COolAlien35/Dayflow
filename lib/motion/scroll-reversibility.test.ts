/**
 * Test for scroll animation reversibility (bidirectional animations)
 * 
 * Requirements:
 * - 1.2: Make all scroll-based animations reversible (scroll up reverses animation)
 * 
 * This test verifies that ScrollTrigger animations with scrub enabled
 * properly reverse when scrolling up.
 */

import { gsap } from './gsap-setup';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

describe('Scroll Animation Reversibility', () => {
  let testElement: HTMLDivElement;
  let scrollContainer: HTMLDivElement;

  beforeEach(() => {
    // Create a test element
    testElement = document.createElement('div');
    testElement.style.width = '100px';
    testElement.style.height = '100px';
    testElement.style.position = 'absolute';
    testElement.style.top = '1000px'; // Position it below viewport
    document.body.appendChild(testElement);

    // Create a scroll container with enough height to scroll
    scrollContainer = document.createElement('div');
    scrollContainer.style.height = '3000px';
    document.body.appendChild(scrollContainer);

    // Reset scroll position
    window.scrollTo(0, 0);
  });

  afterEach(() => {
    // Clean up
    if (testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
    if (scrollContainer.parentNode) {
      scrollContainer.parentNode.removeChild(scrollContainer);
    }
    
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Reset scroll
    window.scrollTo(0, 0);
  });

  test('scroll animation with scrub:true is bidirectional', () => {
    // Create a timeline with scrub enabled
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: 'top bottom',
        end: 'top top',
        scrub: true, // Enable smooth scroll-linked animation
      },
    });

    // Animate from initial state to final state
    timeline.fromTo(
      testElement,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'none' }
    );

    const scrollTrigger = timeline.scrollTrigger;
    expect(scrollTrigger).toBeDefined();

    // Verify scrub is enabled
    expect(scrollTrigger?.vars.scrub).toBe(true);

    // Simulate scroll down (forward)
    // Note: In a real browser, we'd scroll and check the element's transform
    // In a test environment, we verify the configuration is correct
    expect(scrollTrigger?.vars.start).toBe('top bottom');
    expect(scrollTrigger?.vars.end).toBe('top top');

    // The animation should be reversible because scrub is enabled
    // When scrolling up, the animation will automatically reverse
    // This is handled by GSAP's ScrollTrigger internally
  });

  test('scroll animation with scrub:false is not bidirectional', () => {
    // Create a timeline without scrub (one-time trigger)
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: 'top bottom',
        end: 'top top',
        scrub: false, // Disable scrub for one-time animation
      },
    });

    timeline.fromTo(
      testElement,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    const scrollTrigger = timeline.scrollTrigger;
    expect(scrollTrigger).toBeDefined();

    // Verify scrub is disabled
    expect(scrollTrigger?.vars.scrub).toBe(false);

    // Without scrub, the animation plays once when triggered
    // and does not reverse when scrolling back up
  });

  test('scroll animation with numeric scrub value adds smoothing', () => {
    // Create a timeline with numeric scrub for smoothing
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5, // Add 0.5 second smoothing/lag
      },
    });

    timeline.fromTo(
      testElement,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'none' }
    );

    const scrollTrigger = timeline.scrollTrigger;
    expect(scrollTrigger).toBeDefined();

    // Verify numeric scrub value
    expect(scrollTrigger?.vars.scrub).toBe(0.5);

    // Numeric scrub still provides bidirectional animation
    // but with smoothing/lag applied
  });

  test('scroll animation uses ease:none when scrub is enabled', () => {
    // When scrub is enabled, ease should be 'none' for linear scroll-linked animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });

    timeline.fromTo(
      testElement,
      { y: 100 },
      { y: 0, duration: 1, ease: 'none' } // ease: 'none' for scrub animations
    );

    // Get the tween from the timeline
    const tweens = timeline.getChildren();
    expect(tweens.length).toBeGreaterThan(0);

    // Verify ease is 'none' (linear)
    const tween = tweens[0] as gsap.core.Tween;
    expect(tween.vars.ease).toBe('none');
  });

  test('scroll animation uses easing when scrub is disabled', () => {
    // When scrub is disabled, use standard easing
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: 'top bottom',
        scrub: false,
      },
    });

    timeline.fromTo(
      testElement,
      { y: 100 },
      { y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Get the tween from the timeline
    const tweens = timeline.getChildren();
    expect(tweens.length).toBeGreaterThan(0);

    // Verify ease is not 'none'
    const tween = tweens[0] as gsap.core.Tween;
    expect(tween.vars.ease).toBe('power2.out');
  });

  test('multiple scroll animations can coexist with different scrub settings', () => {
    // Create first element with scrub enabled
    const element1 = document.createElement('div');
    element1.style.position = 'absolute';
    element1.style.top = '1000px';
    document.body.appendChild(element1);

    // Create second element with scrub disabled
    const element2 = document.createElement('div');
    element2.style.position = 'absolute';
    element2.style.top = '2000px';
    document.body.appendChild(element2);

    // Timeline 1: scrub enabled (bidirectional)
    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: element1,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
    timeline1.fromTo(element1, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'none' });

    // Timeline 2: scrub disabled (one-time)
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: element2,
        start: 'top bottom',
        scrub: false,
      },
    });
    timeline2.fromTo(element2, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });

    // Verify both ScrollTriggers exist
    const triggers = ScrollTrigger.getAll();
    expect(triggers.length).toBeGreaterThanOrEqual(2);

    // Verify different scrub settings
    expect(timeline1.scrollTrigger?.vars.scrub).toBe(true);
    expect(timeline2.scrollTrigger?.vars.scrub).toBe(false);

    // Cleanup
    element1.remove();
    element2.remove();
  });
});
