/**
 * GSAP Setup and Configuration
 * 
 * This file initializes GSAP and registers plugins.
 * Import this file early in your application to ensure GSAP is properly configured.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Set global GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.4,
});

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  markers: false, // Set to true for debugging
});

/**
 * Initialize GSAP with motion system defaults
 */
export function initializeGSAP() {
  // Additional initialization if needed
  console.log('GSAP Motion System initialized');
}

export { gsap, ScrollTrigger };
