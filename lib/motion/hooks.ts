"use client"

/**
 * Animation Hooks
 * 
 * React hooks for declarative animations using GSAP.
 * 
 * Requirements:
 * - 5.1, 5.2, 5.3: Authentication screen animations
 * - 5.4: Hover animations
 * - 6.1, 6.2, 6.3, 6.4: Dashboard scroll animations
 * - 7.5: Profile edit button hover
 * - 10.2: Leave approval button hover
 * - 16.1, 16.2, 16.3: ScrollTrigger integration
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up timelines on component unmount
 */

import { useEffect, useRef, RefObject, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionSystem } from './MotionSystemProvider';
import { AnimationController } from './AnimationController';
import { ScrollManager } from './ScrollManager';
import { applyStaticState } from './accessibility';
import { AnimationOptions } from './validation';
import type { UseMountAnimationOptions, UseHoverAnimationOptions, UseScrollAnimationOptions, UseActionAnimationOptions } from './types';

/**
 * Hook for mount animations
 * 
 * Creates animations that play when a component mounts.
 * Supports stagger animations for multiple elements.
 * 
 * @param ref - React ref to the element(s) to animate
 * @param options - Animation configuration
 * 
 * Requirements:
 * - 5.1: Auth card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
 * - 5.2: Input stagger animation (80ms delay)
 * - 5.3: CTA button animation (scale:0.96 → scale:1, 200ms delay)
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up timelines on component unmount
 * 
 * @example
 * ```tsx
 * const cardRef = useRef<HTMLDivElement>(null);
 * useMountAnimation(cardRef, {
 *   from: { y: 40, opacity: 0 },
 *   to: { y: 0, opacity: 1 },
 *   duration: 500
 * });
 * ```
 */
export function useMountAnimation(
  ref: RefObject<HTMLElement>,
  options: UseMountAnimationOptions
): void {
  const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = useMotionSystem();
  const animationIdRef = useRef<string>(`mount-${Math.random().toString(36).substr(2, 9)}`);
  const controllerRef = useRef<AnimationController | null>(null);

  useEffect(() => {
    // Initialize controller if not already created
    if (!controllerRef.current) {
      controllerRef.current = new AnimationController(config);
    }

    const element = ref.current;
    if (!element) return;

    const animationId = animationIdRef.current;

    // Check if animations are enabled
    if (!isAnimationEnabled()) {
      // Apply final state immediately without animation
      applyStaticState(element, options.to);
      return;
    }

    // Adapt animation based on device type
    const adaptedOptions = deviceAdapter.adaptAnimation({
      from: options.from,
      to: options.to,
      duration: options.duration,
      delay: options.delay,
      stagger: options.stagger,
    });

    // If motion is disabled (mobile), apply final state
    if (adaptedOptions.duration === 0) {
      applyStaticState(element, options.to);
      return;
    }

    // Create GSAP timeline
    const timeline = gsap.timeline({
      delay: (adaptedOptions.delay || 0) / 1000, // Convert ms to seconds
    });

    // Use fromTo for mount animations
    if (adaptedOptions.stagger) {
      // Stagger animation for multiple elements
      timeline.fromTo(
        element.children,
        adaptedOptions.from || {},
        {
          ...adaptedOptions.to,
          duration: (adaptedOptions.duration || config.timing.minDuration) / 1000,
          stagger: (adaptedOptions.stagger || config.timing.staggerStep) / 1000,
          ease: config.easing.primary,
        }
      );
    } else {
      // Single element animation
      timeline.fromTo(
        element,
        adaptedOptions.from || {},
        {
          ...adaptedOptions.to,
          duration: (adaptedOptions.duration || config.timing.minDuration) / 1000,
          ease: config.easing.primary,
        }
      );
    }

    // Register timeline with AnimationController
    const animationOptions: AnimationOptions = {
      duration: adaptedOptions.duration,
      from: adaptedOptions.from,
      to: adaptedOptions.to,
    };
    
    const registered = controllerRef.current.register(
      animationId,
      timeline,
      animationOptions
    );

    if (registered) {
      // Also register with context for global management
      registerAnimation(animationId, timeline);
    }

    // Cleanup function
    return () => {
      if (controllerRef.current) {
        controllerRef.current.unregister(animationId);
      }
      unregisterAnimation(animationId);
    };
  }, [ref, options, config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation]);
}

/**
 * Hook for hover animations
 * 
 * Creates reversible animations triggered by mouse enter/leave events.
 * 
 * @param ref - React ref to the element to animate
 * @param options - Animation configuration
 * 
 * Requirements:
 * - 5.4: Switch link hover (underline width animation, 200ms)
 * - 7.5: Edit button hover (scale: 1.04)
 * - 10.2: Approve/reject button hover (scale: 1.04)
 * 
 * @example
 * ```tsx
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useHoverAnimation(buttonRef, {
 *   to: { scale: 1.04 },
 *   duration: 200
 * });
 * ```
 */
export function useHoverAnimation(
  ref: RefObject<HTMLElement>,
  options: UseHoverAnimationOptions
): void {
  const { config, deviceAdapter, isAnimationEnabled } = useMotionSystem();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if animations are enabled
    if (!isAnimationEnabled()) {
      // No hover animation when animations are disabled
      return;
    }

    // Adapt animation based on device type
    const adaptedOptions = deviceAdapter.adaptAnimation({
      to: options.to,
      duration: options.duration,
    });

    // If motion is disabled (mobile), no hover animation
    if (adaptedOptions.duration === 0) {
      return;
    }

    const duration = (adaptedOptions.duration || 200) / 1000; // Convert ms to seconds

    // Mouse enter handler
    const handleMouseEnter = () => {
      gsap.to(element, {
        ...adaptedOptions.to,
        duration,
        ease: config.easing.secondary,
        overwrite: 'auto', // Allow interruption
      });
    };

    // Mouse leave handler - reverse the animation
    const handleMouseLeave = () => {
      gsap.to(element, {
        // Reverse to original state
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        // Preserve any other properties that might have been set
        duration,
        ease: config.easing.secondary,
        overwrite: 'auto',
      });
    };

    // Attach event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      // Kill any ongoing animations on this element
      gsap.killTweensOf(element);
    };
  }, [ref, options, config, deviceAdapter, isAnimationEnabled]);
}

/**
 * Hook for scroll-triggered animations
 * 
 * Creates animations that are triggered by scroll position using ScrollTrigger.
 * Supports scrub (scroll-linked), pin, and viewport entry animations.
 * 
 * @param ref - React ref to the element to animate
 * @param options - Animation configuration with ScrollTrigger options
 * 
 * Requirements:
 * - 6.1: Dashboard page title scroll animation
 * - 6.2: Dashboard feature cards scroll animation
 * - 6.3: Dashboard sidebar scroll animation
 * - 6.4: Trigger animations when elements enter viewport
 * - 16.1: Use GSAP ScrollTrigger library
 * - 16.2: Map scroll position to normalized progress (0 to 1)
 * - 16.3: Output scroll progress to component properties
 * 
 * @example
 * ```tsx
 * const titleRef = useRef<HTMLHeadingElement>(null);
 * useScrollAnimation(titleRef, {
 *   from: { y: 20, opacity: 0 },
 *   to: { y: 0, opacity: 1 },
 *   start: 'top 80%',
 *   end: 'top 50%'
 * });
 * ```
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions
): void {
  const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = useMotionSystem();
  const animationIdRef = useRef<string>(`scroll-${Math.random().toString(36).substr(2, 9)}`);
  const scrollManagerRef = useRef<ScrollManager | null>(null);

  useEffect(() => {
    // Initialize ScrollManager if not already created
    if (!scrollManagerRef.current) {
      scrollManagerRef.current = new ScrollManager();
    }

    const element = ref.current;
    if (!element) return;

    const animationId = animationIdRef.current;

    // Check if animations are enabled
    if (!isAnimationEnabled()) {
      // Apply final state immediately without animation
      applyStaticState(element, options.to);
      return;
    }

    // Check if ScrollTrigger should be disabled on mobile
    if (!deviceAdapter.shouldEnableScrollTrigger()) {
      // Apply final state on mobile (no scroll animations)
      applyStaticState(element, options.to);
      return;
    }

    // Adapt animation based on device type
    const adaptedOptions = deviceAdapter.adaptAnimation({
      from: options.from,
      to: options.to,
    });

    // Create GSAP timeline for the animation
    // When scrub is enabled, animations are bidirectional (scroll up reverses)
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || 'top 80%',
        end: options.end || 'top 50%',
        // scrub: true enables smooth scroll-linked animations
        // scrub: number (e.g., 0.5) adds smoothing/lag to the animation
        scrub: options.scrub !== undefined ? options.scrub : false,
        pin: options.pin || false,
        pinSpacing: options.pin ? true : false,
        markers: false, // Set to true for debugging
        // Callbacks for lifecycle events
        onEnter: () => {
          // Animation enters viewport (scrolling down)
        },
        onLeave: () => {
          // Animation leaves viewport (scrolling down)
        },
        onEnterBack: () => {
          // Animation re-enters viewport (scrolling up)
        },
        onLeaveBack: () => {
          // Animation leaves viewport (scrolling up)
        },
      },
    });

    // Add animation to timeline
    timeline.fromTo(
      element,
      adaptedOptions.from || {},
      {
        ...adaptedOptions.to,
        // When scrub is enabled, duration is normalized (0-1 represents scroll progress)
        // When scrub is disabled, use configured duration
        duration: options.scrub ? 1 : (config.timing.minDuration / 1000),
        // When scrub is enabled, use 'none' easing for linear scroll-linked animation
        // When scrub is disabled, use configured easing for time-based animation
        ease: options.scrub ? 'none' : config.easing.primary,
      }
    );

    // Get the ScrollTrigger instance from the timeline
    const scrollTrigger = timeline.scrollTrigger;

    if (scrollTrigger) {
      // Note: We don't need to create a separate ScrollTrigger in ScrollManager
      // because the timeline already has one. We just track it for cleanup.
      // The ScrollTrigger is automatically bidirectional when scrub is enabled.
      
      // Register timeline with context for global management
      registerAnimation(animationId, timeline);
    }

    // Cleanup function
    return () => {
      // Unregister from context
      unregisterAnimation(animationId);
      
      // Kill the timeline (which also kills its associated ScrollTrigger)
      timeline.kill();
    };
  }, [ref, options, config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation]);
}

/**
 * Hook for action-triggered animations
 * 
 * Returns a function that can be called to trigger an animation.
 * Useful for animations triggered by user actions like button clicks.
 * 
 * @param ref - React ref to the element to animate
 * @param options - Animation configuration
 * @returns Function to trigger the animation
 * 
 * Requirements:
 * - 10.3: Row action animations (background flash)
 * - 10.4: Status cell animation (scale:1.08)
 * - 10.5, 10.6: Toast animations (enter/exit)
 * 
 * @example
 * ```tsx
 * const rowRef = useRef<HTMLTableRowElement>(null);
 * const flashRow = useActionAnimation(rowRef, {
 *   to: { backgroundColor: '#f0f0f0' },
 *   duration: 300,
 *   yoyo: true,
 *   repeat: 1
 * });
 * 
 * // Trigger animation on button click
 * <button onClick={flashRow}>Approve</button>
 * ```
 */
export function useActionAnimation(
  ref: RefObject<HTMLElement>,
  options: UseActionAnimationOptions
): () => void {
  const { config, deviceAdapter, isAnimationEnabled } = useMotionSystem();

  const triggerAnimation = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    // Check if animations are enabled
    if (!isAnimationEnabled()) {
      // If animations are disabled, just apply final state
      if (options.to) {
        applyStaticState(element, options.to);
      }
      return;
    }

    // Adapt animation based on device type
    const adaptedOptions = deviceAdapter.adaptAnimation({
      from: options.from,
      to: options.to,
      duration: options.duration,
    });

    // If motion is disabled (mobile), apply final state
    if (adaptedOptions.duration === 0) {
      if (options.to) {
        applyStaticState(element, options.to);
      }
      return;
    }

    const duration = (adaptedOptions.duration || 200) / 1000; // Convert ms to seconds

    // Create animation based on whether we have a 'from' state
    if (adaptedOptions.from) {
      // Use fromTo for animations with explicit start state
      gsap.fromTo(
        element,
        adaptedOptions.from,
        {
          ...adaptedOptions.to,
          duration,
          ease: config.easing.primary,
          yoyo: options.yoyo || false,
          repeat: options.repeat || 0,
          overwrite: 'auto',
        }
      );
    } else {
      // Use to for animations from current state
      gsap.to(element, {
        ...adaptedOptions.to,
        duration,
        ease: config.easing.primary,
        yoyo: options.yoyo || false,
        repeat: options.repeat || 0,
        overwrite: 'auto',
      });
    }
  }, [ref, options, config, deviceAdapter, isAnimationEnabled]);

  return triggerAnimation;
}
