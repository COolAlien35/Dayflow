/**
 * Device Adapter
 * 
 * Detects device type and adapts animation behavior for responsive motion.
 * 
 * Requirements:
 * - 14.1: Desktop enables full motion capabilities
 * - 14.2: Tablet reduces motion intensity by factor of 0.7
 * - 14.3: Mobile disables ScrollTrigger animations
 * - 14.5: Apply motion scaling to transforms and duration
 */

import type { DeviceType } from './types';
import type gsap from 'gsap';

export interface AnimationOptions {
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
  easing?: string;
}

export class DeviceAdapter {
  private deviceType: DeviceType;
  private motionScale: number;

  constructor() {
    this.deviceType = this.detectDevice();
    this.motionScale = this.getMotionScale();
  }

  /**
   * Detect device type based on window width
   * 
   * Requirements:
   * - 14.1: Desktop >= 1024px
   * - 14.2: Tablet >= 768px and < 1024px
   * - 14.3: Mobile < 768px
   */
  detectDevice(): DeviceType {
    if (typeof window === 'undefined') {
      return 'desktop'; // Default for SSR
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      return 'mobile';
    } else if (width < 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  /**
   * Get motion scale factor based on device type
   * 
   * Requirements:
   * - 14.1: Desktop = 1.0 (full motion)
   * - 14.2: Tablet = 0.7 (reduced motion)
   * - 14.3: Mobile = 0.0 (no motion)
   */
  getMotionScale(): number {
    switch (this.deviceType) {
      case 'desktop':
        return 1.0;
      case 'tablet':
        return 0.7;
      case 'mobile':
        return 0.0;
      default:
        return 1.0;
    }
  }

  /**
   * Check if ScrollTrigger should be enabled
   * 
   * Requirements:
   * - 14.3: Disable ScrollTrigger on mobile
   */
  shouldEnableScrollTrigger(): boolean {
    return this.deviceType !== 'mobile';
  }

  /**
   * Adapt animation options based on device type
   * Scales transforms and duration according to motion scale
   * 
   * Requirements:
   * - 14.5: Scale transforms and duration based on device
   */
  adaptAnimation(options: AnimationOptions): AnimationOptions {
    const scale = this.motionScale;

    // If motion is disabled (mobile), return no-op animation
    if (scale === 0) {
      return {
        ...options,
        duration: 0,
      };
    }

    // Scale duration
    const adaptedDuration = options.duration ? options.duration * scale : undefined;

    // Scale transforms in from and to
    const adaptedFrom = options.from ? this.scaleTransforms(options.from, scale) : undefined;
    const adaptedTo = this.scaleTransforms(options.to, scale);

    return {
      ...options,
      from: adaptedFrom,
      to: adaptedTo,
      duration: adaptedDuration,
    };
  }

  /**
   * Scale transform values (x, y) while preserving opacity and scale
   * 
   * @param vars - GSAP tween variables
   * @param scale - Motion scale factor
   * @returns Scaled tween variables
   */
  private scaleTransforms(vars: gsap.TweenVars, scale: number): gsap.TweenVars {
    const scaled = { ...vars };

    // Scale translateX and translateY
    if (typeof scaled.x === 'number') {
      scaled.x = scaled.x * scale;
    }
    if (typeof scaled.y === 'number') {
      scaled.y = scaled.y * scale;
    }

    // Opacity and scale remain unchanged
    // (they are already subtle and don't need device-based scaling)

    return scaled;
  }

  /**
   * Get current device type
   */
  getDeviceType(): DeviceType {
    return this.deviceType;
  }

  /**
   * Update device type (useful for resize events)
   */
  updateDeviceType(): void {
    this.deviceType = this.detectDevice();
    this.motionScale = this.getMotionScale();
  }
}
