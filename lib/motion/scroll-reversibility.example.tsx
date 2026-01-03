/**
 * Example demonstrating bidirectional scroll animations
 * 
 * This example shows how to use the useScrollAnimation hook
 * with scrub enabled for reversible scroll-linked animations.
 * 
 * Requirements:
 * - 1.2: Make all scroll-based animations reversible
 * - 9.1: Configure ScrollTrigger for bidirectional animations
 */

import React, { useRef } from 'react';
import { useScrollAnimation } from './hooks';

/**
 * Example 1: Parallax Effect (Bidirectional)
 * 
 * The info panel moves at a different speed than the scroll,
 * creating a parallax effect. Scrolling up reverses the animation.
 */
export function ParallaxExample() {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(panelRef, {
    from: { y: -30 },
    to: { y: 0 },
    scrub: true, // ✅ Bidirectional: scroll up reverses the animation
    start: 'top bottom',
    end: 'bottom top',
  });

  return (
    <div style={{ height: '200vh', padding: '50px' }}>
      <div
        ref={panelRef}
        style={{
          padding: '20px',
          background: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <h2>Parallax Panel</h2>
        <p>This panel moves at a different speed than the scroll.</p>
        <p>Scroll down to see it move, scroll up to see it reverse.</p>
      </div>
    </div>
  );
}

/**
 * Example 2: Smooth Scroll-Linked Fade (Bidirectional with Smoothing)
 * 
 * The element fades in as you scroll down, with a 0.5s smoothing effect.
 * Scrolling up reverses the fade with the same smoothing.
 */
export function SmoothFadeExample() {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(contentRef, {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
    scrub: 0.5, // ✅ Bidirectional with 0.5s smoothing/lag
    start: 'top 80%',
    end: 'top 30%',
  });

  return (
    <div style={{ height: '150vh', padding: '50px' }}>
      <div style={{ height: '50vh' }} /> {/* Spacer */}
      <div
        ref={contentRef}
        style={{
          padding: '40px',
          background: '#e0e0e0',
          borderRadius: '8px',
        }}
      >
        <h2>Smooth Fade Content</h2>
        <p>This content fades in smoothly as you scroll.</p>
        <p>The 0.5s smoothing creates a lag effect.</p>
        <p>Scroll up to see it fade out with the same smoothing.</p>
      </div>
    </div>
  );
}

/**
 * Example 3: One-Time Trigger (NOT Bidirectional)
 * 
 * This animation plays once when the element enters the viewport.
 * Scrolling back up does NOT reverse the animation.
 */
export function OneTimeTriggerExample() {
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(cardRef, {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    scrub: false, // ❌ NOT bidirectional: one-time trigger
    start: 'top 80%',
  });

  return (
    <div style={{ height: '150vh', padding: '50px' }}>
      <div style={{ height: '50vh' }} /> {/* Spacer */}
      <div
        ref={cardRef}
        style={{
          padding: '40px',
          background: '#d0d0d0',
          borderRadius: '8px',
        }}
      >
        <h2>One-Time Trigger Card</h2>
        <p>This card animates once when it enters the viewport.</p>
        <p>Scrolling back up does NOT reverse the animation.</p>
      </div>
    </div>
  );
}

/**
 * Example 4: 3D Camera Movement (Bidirectional)
 * 
 * Simulates a 3D camera moving through space as you scroll.
 * The camera position is directly linked to scroll progress.
 */
export function CameraMovementExample() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(sceneRef, {
    from: { 
      // Simulate camera Z position with scale
      scale: 1.5, 
      opacity: 0.8 
    },
    to: { 
      scale: 1, 
      opacity: 1 
    },
    scrub: true, // ✅ Bidirectional camera movement
    start: 'top top',
    end: 'bottom top',
  });

  return (
    <div style={{ height: '200vh', padding: '50px' }}>
      <div
        ref={sceneRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          color: 'white',
          position: 'sticky',
          top: 0,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1>3D Camera Scene</h1>
          <p>Scroll to move the camera</p>
          <p>Scroll up to reverse the camera movement</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 5: Multiple Elements with Different Scrub Settings
 * 
 * Demonstrates that multiple scroll animations can coexist
 * with different scrub configurations.
 */
export function MultipleAnimationsExample() {
  const element1Ref = useRef<HTMLDivElement>(null);
  const element2Ref = useRef<HTMLDivElement>(null);
  const element3Ref = useRef<HTMLDivElement>(null);

  // Element 1: Bidirectional with scrub: true
  useScrollAnimation(element1Ref, {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    scrub: true,
    start: 'top 80%',
    end: 'top 30%',
  });

  // Element 2: Bidirectional with scrub: 1 (1s smoothing)
  useScrollAnimation(element2Ref, {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    scrub: 1,
    start: 'top 80%',
    end: 'top 30%',
  });

  // Element 3: One-time trigger (not bidirectional)
  useScrollAnimation(element3Ref, {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    scrub: false,
    start: 'top 80%',
  });

  return (
    <div style={{ height: '200vh', padding: '50px' }}>
      <div style={{ height: '50vh' }} /> {/* Spacer */}
      
      <div
        ref={element1Ref}
        style={{
          padding: '20px',
          marginBottom: '20px',
          background: '#ffcccb',
          borderRadius: '8px',
        }}
      >
        <h3>Element 1: scrub: true</h3>
        <p>Slides in from left, fully bidirectional</p>
      </div>

      <div
        ref={element2Ref}
        style={{
          padding: '20px',
          marginBottom: '20px',
          background: '#add8e6',
          borderRadius: '8px',
        }}
      >
        <h3>Element 2: scrub: 1</h3>
        <p>Slides in from right, bidirectional with 1s smoothing</p>
      </div>

      <div
        ref={element3Ref}
        style={{
          padding: '20px',
          background: '#90ee90',
          borderRadius: '8px',
        }}
      >
        <h3>Element 3: scrub: false</h3>
        <p>Fades in once, not bidirectional</p>
      </div>
    </div>
  );
}

/**
 * Complete Demo Page
 * 
 * Combines all examples to demonstrate bidirectional scroll animations.
 */
export function ScrollReversibilityDemo() {
  return (
    <div>
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Scroll Animation Reversibility Demo</h1>
        <p>Scroll down to see animations, scroll up to see them reverse</p>
      </div>

      <ParallaxExample />
      <SmoothFadeExample />
      <OneTimeTriggerExample />
      <CameraMovementExample />
      <MultipleAnimationsExample />

      <div style={{ padding: '50px', textAlign: 'center' }}>
        <p>End of demo - scroll back up to see reversibility in action!</p>
      </div>
    </div>
  );
}
