/**
 * 3D Hero Section Animations (Landing Page Only)
 * 
 * Animation definitions for the optional 3D hero section on the landing page.
 * This section uses scroll-driven camera and object animations to create
 * an engaging 3D effect synchronized with scroll progress.
 * 
 * Requirements:
 * - 13.1: Enable 3D effects only on landing page
 * - 13.2: Camera Z animation (6 → 3.5)
 * - 13.3: Camera Y animation (0 → -0.4)
 * - 13.4: Object separation on X axis
 * - 13.5: Object rotation (15 degrees on Y axis)
 * - 13.6: Synchronize 3D camera motion with scroll progress
 * - 13.7: Use single canvas element maximum
 */

import type { AnimationDefinition } from '../types';

/**
 * Camera position animation
 * Animates the 3D camera position as user scrolls through hero section
 * Z-axis: moves camera closer (6 → 3.5)
 * Y-axis: moves camera down slightly (0 → -0.4)
 */
export const heroCameraAnimation: AnimationDefinition = {
  id: 'hero-camera',
  type: 'scroll',
  target: '.hero-camera',
  from: { 
    z: 6, 
    y: 0 
  },
  to: { 
    z: 3.5, 
    y: -0.4 
  },
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true, // Smooth scroll-linked animation
  },
};

/**
 * Object separation animation
 * Animates abstract plane objects to separate along X axis during scroll
 * Creates a parallax-like depth effect
 */
export const heroObjectSeparationAnimation: AnimationDefinition = {
  id: 'hero-object-separation',
  type: 'scroll',
  target: '.hero-object',
  from: {
    x: 0,
  },
  to: {
    // Separation will be applied differently to each object
    // Left objects: negative X, right objects: positive X
    // This will be handled in the component implementation
    x: 0, // Placeholder, actual values set per object
  },
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
};

/**
 * Object rotation animation
 * Rotates objects 15 degrees on Y axis for 3D effect
 */
export const heroObjectRotationAnimation: AnimationDefinition = {
  id: 'hero-object-rotation',
  type: 'scroll',
  target: '.hero-object',
  from: {
    rotationY: 0,
  },
  to: {
    rotationY: 15,
  },
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
};

/**
 * Complete hero section animations configuration
 */
export const heroAnimations = {
  camera: heroCameraAnimation,
  objectSeparation: heroObjectSeparationAnimation,
  objectRotation: heroObjectRotationAnimation,
};

/**
 * Animation options for easy consumption by components
 * These options are specifically designed for the landing page hero section
 */
export const heroAnimationOptions = {
  camera: {
    from: { z: 6, y: 0 },
    to: { z: 3.5, y: -0.4 },
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  },
  objectSeparation: {
    from: { x: 0 },
    to: { x: 0 }, // Set per object in implementation
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  },
  objectRotation: {
    from: { rotationY: 0 },
    to: { rotationY: 15 },
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  },
};

/**
 * Configuration constants for 3D hero
 */
export const heroConfig = {
  // Restrict to landing page only
  enabledPages: ['/'],
  
  // Camera settings
  camera: {
    initialZ: 6,
    finalZ: 3.5,
    initialY: 0,
    finalY: -0.4,
  },
  
  // Object settings
  objects: {
    rotationY: 15,
    separationMultiplier: 1.5, // Multiplier for X separation
  },
  
  // Canvas settings
  canvas: {
    maxCount: 1, // Single canvas element maximum
  },
};
