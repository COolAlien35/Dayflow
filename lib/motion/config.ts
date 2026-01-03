/**
 * Motion System Configuration
 * 
 * Defines timing constraints, transform limits, easing functions, and performance settings
 * for the Dayflow HRMS Motion System using GSAP.
 */

export interface MotionConfig {
  // Global settings
  enabled: boolean;
  reducedMotion: boolean;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  
  // Timing constraints
  timing: {
    maxDuration: number;      // Maximum animation duration in milliseconds
    minDuration: number;      // Minimum animation duration in milliseconds
    staggerStep: number;      // Delay between staggered animations in milliseconds
  };
  
  // Transform limits
  transforms: {
    maxTranslateX: number;    // Maximum horizontal translation in pixels
    maxTranslateY: number;    // Maximum vertical translation in pixels
    maxScale: number;         // Maximum scale factor
    minOpacity: number;       // Minimum opacity value
  };
  
  // Easing functions
  easing: {
    primary: string;          // Primary easing function
    secondary: string;        // Secondary easing function
  };
  
  // Performance settings
  performance: {
    fpsThreshold: number;     // Minimum FPS threshold before disabling animations
    monitoringEnabled: boolean;
  };
}

/**
 * Default motion configuration
 * 
 * Requirements:
 * - 1.5: Primary easing "power2.out"
 * - 1.6: Secondary easing "power1.out"
 * - 2.1: Maximum duration 600ms
 * - 2.2: Minimum duration 150ms
 * - 2.3: Stagger step 80ms
 * - 3.1: Maximum translateY 40px
 * - 3.2: Maximum translateX 40px
 * - 3.3: Maximum scale 1.05
 * - 3.4: Minimum opacity 0.85
 * - 15.5: FPS threshold 50
 */
export const defaultMotionConfig: MotionConfig = {
  enabled: true,
  reducedMotion: false,
  deviceType: 'desktop',
  
  timing: {
    maxDuration: 600,        // 600ms max duration
    minDuration: 150,        // 150ms min duration
    staggerStep: 80,         // 80ms stagger delay
  },
  
  transforms: {
    maxTranslateX: 40,       // 40px max horizontal translation
    maxTranslateY: 40,       // 40px max vertical translation
    maxScale: 1.05,          // 1.05 max scale
    minOpacity: 0.85,        // 0.85 min opacity
  },
  
  easing: {
    primary: 'power2.out',   // Primary easing function
    secondary: 'power1.out', // Secondary easing function
  },
  
  performance: {
    fpsThreshold: 50,        // 50 FPS minimum threshold
    monitoringEnabled: true,
  },
};
