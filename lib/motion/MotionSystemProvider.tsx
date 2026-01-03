'use client';

/**
 * Motion System Provider
 * 
 * React Context provider for the motion system that manages configuration,
 * accessibility detection, and animation lifecycle.
 * 
 * Requirements:
 * - 1.1: Animations never block interaction
 * - 1.2: Scroll-based animations are reversible
 * - 1.3: No infinite loops or autonomous animations
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { MotionConfig, defaultMotionConfig } from './config';
import { DeviceAdapter } from './DeviceAdapter';
import { PerformanceMonitor } from './PerformanceMonitor';

// Type for GSAP timeline (will be properly typed when GSAP is installed)
type GSAPTimeline = any;

interface MotionSystemContextValue {
  config: MotionConfig;
  deviceAdapter: DeviceAdapter;
  isAnimationEnabled: () => boolean;
  registerAnimation: (id: string, timeline: GSAPTimeline) => void;
  unregisterAnimation: (id: string) => void;
  killAllAnimations: () => void;
}

const MotionSystemContext = createContext<MotionSystemContextValue | undefined>(undefined);

export interface MotionSystemProviderProps {
  children: React.ReactNode;
  config?: Partial<MotionConfig>;
}

export function MotionSystemProvider({ children, config: userConfig }: MotionSystemProviderProps) {
  // Initialize DeviceAdapter
  const [deviceAdapter] = useState<DeviceAdapter>(() => new DeviceAdapter());

  // Merge user config with defaults and device detection
  const [config, setConfig] = useState<MotionConfig>(() => ({
    ...defaultMotionConfig,
    ...userConfig,
    deviceType: deviceAdapter.getDeviceType(),
    timing: { ...defaultMotionConfig.timing, ...userConfig?.timing },
    transforms: { ...defaultMotionConfig.transforms, ...userConfig?.transforms },
    easing: { ...defaultMotionConfig.easing, ...userConfig?.easing },
    performance: { ...defaultMotionConfig.performance, ...userConfig?.performance },
  }));

  // Animation registry for lifecycle management
  const [animationRegistry] = useState<Map<string, GSAPTimeline>>(new Map());

  // Performance monitor reference
  const performanceMonitorRef = useRef<PerformanceMonitor | null>(null);

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial state
    setConfig(prev => ({
      ...prev,
      reducedMotion: mediaQuery.matches,
    }));

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        reducedMotion: e.matches,
      }));
      
      // Kill all animations if reduced motion is enabled
      if (e.matches) {
        killAllAnimations();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Handle window resize to update device type
  useEffect(() => {
    const handleResize = () => {
      deviceAdapter.updateDeviceType();
      const newDeviceType = deviceAdapter.getDeviceType();
      
      setConfig(prev => {
        if (prev.deviceType !== newDeviceType) {
          return {
            ...prev,
            deviceType: newDeviceType,
          };
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [deviceAdapter]);

  /**
   * Check if animations should be enabled
   * Animations are disabled if:
   * - Global enabled flag is false
   * - User has reduced motion preference
   * - Device type is mobile (for scroll animations)
   */
  const isAnimationEnabled = useCallback((): boolean => {
    return config.enabled && !config.reducedMotion;
  }, [config.enabled, config.reducedMotion]);

  /**
   * Register an animation timeline for lifecycle management
   */
  const registerAnimation = useCallback((id: string, timeline: GSAPTimeline) => {
    animationRegistry.set(id, timeline);
  }, [animationRegistry]);

  /**
   * Unregister and cleanup a specific animation
   */
  const unregisterAnimation = useCallback((id: string) => {
    const timeline = animationRegistry.get(id);
    if (timeline) {
      // Kill the timeline if it has a kill method (GSAP timeline)
      if (typeof timeline.kill === 'function') {
        timeline.kill();
      }
      animationRegistry.delete(id);
    }
  }, [animationRegistry]);

  /**
   * Kill all registered animations
   * Used for performance safeguards and accessibility
   */
  const killAllAnimations = useCallback(() => {
    animationRegistry.forEach((timeline) => {
      if (timeline && typeof timeline.kill === 'function') {
        timeline.kill();
      }
    });
    animationRegistry.clear();
  }, [animationRegistry]);

  // Cleanup all animations on unmount
  useEffect(() => {
    return () => {
      killAllAnimations();
    };
  }, [killAllAnimations]);

  // Initialize and manage performance monitoring
  useEffect(() => {
    // Only start monitoring if enabled in config
    if (!config.performance.monitoringEnabled || !config.enabled) {
      return;
    }

    // Create performance monitor with threshold breach callback
    const monitor = new PerformanceMonitor(
      config.performance.fpsThreshold,
      () => {
        console.warn(
          `Performance threshold breached (FPS < ${config.performance.fpsThreshold}). Disabling motion system.`
        );
        
        // Kill all animations
        killAllAnimations();
        
        // Disable motion system
        setConfig(prev => ({
          ...prev,
          enabled: false,
        }));
      }
    );

    performanceMonitorRef.current = monitor;
    monitor.start();

    // Cleanup on unmount or when monitoring is disabled
    return () => {
      if (performanceMonitorRef.current) {
        performanceMonitorRef.current.stop();
        performanceMonitorRef.current = null;
      }
    };
  }, [config.performance.monitoringEnabled, config.performance.fpsThreshold, config.enabled, killAllAnimations]);

  const contextValue = useMemo<MotionSystemContextValue>(() => ({
    config,
    deviceAdapter,
    isAnimationEnabled,
    registerAnimation,
    unregisterAnimation,
    killAllAnimations,
  }), [config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation, killAllAnimations]);

  return (
    <MotionSystemContext.Provider value={contextValue}>
      {children}
    </MotionSystemContext.Provider>
  );
}

/**
 * Hook to access the motion system context
 */
export function useMotionSystem(): MotionSystemContextValue {
  const context = useContext(MotionSystemContext);
  
  if (context === undefined) {
    throw new Error('useMotionSystem must be used within a MotionSystemProvider');
  }
  
  return context;
}
