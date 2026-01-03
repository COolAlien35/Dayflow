/**
 * Type definitions for the Dayflow HRMS Motion System
 * Built on GSAP with ScrollTrigger integration
 */

import type gsap from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP TweenVars type (animation properties)
type TweenVars = gsap.TweenVars;

// ScrollTrigger configuration type
type ScrollTriggerVars = ScrollTrigger.Vars;

/**
 * Device types for responsive motion behavior
 */
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

/**
 * Animation types supported by the motion system
 */
export type AnimationType = 'mount' | 'scroll' | 'hover' | 'action';

/**
 * Global motion configuration
 */
export interface MotionConfig {
  // Global settings
  enabled: boolean;
  reducedMotion: boolean;
  deviceType: DeviceType;
  
  // Timing constraints
  timing: {
    maxDuration: number;      // 600ms
    minDuration: number;      // 150ms
    staggerStep: number;      // 80ms
  };
  
  // Transform limits
  transforms: {
    maxTranslateX: number;    // 40px
    maxTranslateY: number;    // 40px
    maxScale: number;         // 1.05
    minOpacity: number;       // 0.85
  };
  
  // Easing functions
  easing: {
    primary: string;          // "power2.out"
    secondary: string;        // "power1.out"
  };
  
  // Performance
  performance: {
    fpsThreshold: number;     // 50
    monitoringEnabled: boolean;
  };
}

/**
 * Animation options for mount animations
 */
export interface UseMountAnimationOptions {
  from: TweenVars;
  to: TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
}

/**
 * Animation options for scroll-triggered animations
 */
export interface UseScrollAnimationOptions {
  from: TweenVars;
  to: TweenVars;
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinDuration?: string;
}

/**
 * Animation options for hover animations
 */
export interface UseHoverAnimationOptions {
  to: TweenVars;
  duration?: number;
}

/**
 * Animation options for action-triggered animations
 */
export interface UseActionAnimationOptions {
  from?: TweenVars;
  to: TweenVars;
  duration?: number;
  yoyo?: boolean;
  repeat?: number;
}

/**
 * ScrollTrigger configuration
 */
export interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Animation definition for screen-specific animations
 */
export interface AnimationDefinition {
  id: string;
  type: AnimationType;
  target: string | HTMLElement;
  from?: TweenVars;
  to: TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
  easing?: string;
  scrollTrigger?: ScrollTriggerConfig;
}

/**
 * Screen animation registry
 */
export interface ScreenAnimations {
  screenId: string;
  animations: AnimationDefinition[];
}

/**
 * Animation validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
