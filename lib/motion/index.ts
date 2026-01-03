/**
 * Motion System Exports
 * 
 * Central export point for the Dayflow HRMS Motion System
 * Built on GSAP with ScrollTrigger integration
 */

// Core providers and hooks
export { MotionSystemProvider, useMotionSystem } from './MotionSystemProvider';
export type { MotionSystemProviderProps } from './MotionSystemProvider';

// Animation hooks
export { useMountAnimation, useHoverAnimation, useScrollAnimation, useActionAnimation } from './hooks';

// Configuration
export { defaultMotionConfig } from './config';
export type { MotionConfig } from './config';

// Validation
export { validateAnimation } from './validation';
export type { AnimationOptions as ValidationAnimationOptions } from './validation';

// Performance constraints
export {
  validateNoCssShadows,
  validateNoPhysicsLibraries,
  validateTextureSize,
  validatePerformanceConstraints,
  defaultPerformanceConstraints,
} from './performance-constraints';
export type { PerformanceConstraints } from './performance-constraints';

// Texture validation
export {
  validateTextureBeforeLoad,
  validateTextureFile,
  TextureValidator,
} from './texture-validator';
export type { TextureValidationResult } from './texture-validator';

// Animation Controller
export { AnimationController } from './AnimationController';

// Scroll Manager
export { ScrollManager } from './ScrollManager';

// Device Adapter
export { DeviceAdapter } from './DeviceAdapter';
export type { AnimationOptions as DeviceAnimationOptions } from './DeviceAdapter';

// Performance Monitor
export { PerformanceMonitor } from './PerformanceMonitor';

// Accessibility utilities
export {
  applyStaticState,
  shouldUseStaticRendering,
  createAnimationOrStatic,
} from './accessibility';

// Type definitions
export type {
  DeviceType,
  AnimationType,
  UseMountAnimationOptions,
  UseScrollAnimationOptions,
  UseHoverAnimationOptions,
  UseActionAnimationOptions,
  ScrollTriggerConfig,
  AnimationDefinition,
  ScreenAnimations,
  ValidationResult,
} from './types';

// GSAP imports for consumers
export { gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';

// Animation configurations
export { authAnimations, authAnimationOptions } from './animations/authAnimations';
export { dashboardAnimations, dashboardAnimationOptions } from './animations/dashboardAnimations';
export { profileAnimations, profileAnimationOptions } from './animations/profileAnimations';
export { attendanceAnimations, attendanceAnimationOptions } from './animations/attendanceAnimations';
export { leaveApplicationAnimations, leaveApplicationAnimationOptions } from './animations/leaveApplicationAnimations';
export { leaveApprovalAnimations, leaveApprovalAnimationOptions } from './animations/leaveApprovalAnimations';
export { payrollAnimations, payrollAnimationOptions } from './animations/payrollAnimations';
export { globalNoteAnimations, globalNoteAnimationOptions } from './animations/globalNoteAnimations';
export { heroAnimations, heroAnimationOptions, heroConfig } from './animations/heroAnimations';
