'use client';

/**
 * 3D Hero Section Component
 * 
 * Implements an optional 3D hero section for the landing page using CSS 3D transforms.
 * Synchronized with scroll progress using GSAP ScrollTrigger.
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

import React, { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '@/lib/motion/animations/heroAnimations';
import { useMotionSystem } from '@/lib/motion/MotionSystemProvider';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Hero3DProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * 3D Hero Section Component
 * 
 * Creates a 3D scene using CSS 3D transforms with scroll-driven animations.
 * Only renders on the landing page (/).
 */
export function Hero3D({ className = '', children }: Hero3DProps) {
  const pathname = usePathname();
  const { isAnimationEnabled, registerAnimation, unregisterAnimation, deviceAdapter } = useMotionSystem();
  
  const sceneRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<HTMLDivElement[]>([]);
  
  // Only enable on landing page
  const isEnabled = heroConfig.enabledPages.includes(pathname || '/');
  
  useEffect(() => {
    if (!isEnabled || !isAnimationEnabled() || !cameraRef.current) {
      return;
    }
    
    // Check if ScrollTrigger should be enabled on this device
    if (!deviceAdapter.shouldEnableScrollTrigger()) {
      return;
    }
    
    const camera = cameraRef.current;
    const objects = objectsRef.current.filter(Boolean);
    
    const animationIds: string[] = [];
    
    // Camera animation: Z and Y position
    const cameraTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    
    cameraTimeline.fromTo(
      camera,
      {
        z: heroConfig.camera.initialZ,
        y: heroConfig.camera.initialY,
      },
      {
        z: heroConfig.camera.finalZ,
        y: heroConfig.camera.finalY,
        ease: 'none', // Linear for scroll-linked animation
      }
    );
    
    // Register camera animation
    const cameraId = 'hero-camera-animation';
    registerAnimation(cameraId, cameraTimeline);
    animationIds.push(cameraId);
    
    // Object animations: separation and rotation
    objects.forEach((obj, index) => {
      if (!obj) return;
      
      // Calculate separation direction (alternate left/right)
      const direction = index % 2 === 0 ? -1 : 1;
      const separationAmount = direction * heroConfig.objects.separationMultiplier * 100;
      
      const objectTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      objectTimeline.fromTo(
        obj,
        {
          x: 0,
          rotationY: 0,
        },
        {
          x: separationAmount,
          rotationY: heroConfig.objects.rotationY,
          ease: 'none',
        }
      );
      
      // Register object animation
      const objectId = `hero-object-${index}-animation`;
      registerAnimation(objectId, objectTimeline);
      animationIds.push(objectId);
    });
    
    // Cleanup
    return () => {
      // Unregister all animations
      animationIds.forEach(id => unregisterAnimation(id));
      
      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === '.hero-section') {
          trigger.kill();
        }
      });
    };
  }, [isEnabled, isAnimationEnabled, registerAnimation, unregisterAnimation, deviceAdapter]);
  
  // Don't render if not on landing page
  if (!isEnabled) {
    return null;
  }
  
  return (
    <div 
      ref={sceneRef}
      className={`hero-section relative w-full h-screen overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Camera container */}
      <div
        ref={cameraRef}
        className="hero-camera absolute inset-0 w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(${heroConfig.camera.initialZ}px) translateY(${heroConfig.camera.initialY}px)`,
        }}
      >
        {/* 3D Objects */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Object 1 - Left */}
          <div
            ref={(el) => {
              if (el) objectsRef.current[0] = el;
            }}
            className="hero-object absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateX(-100px) translateZ(50px)',
            }}
          />
          
          {/* Object 2 - Right */}
          <div
            ref={(el) => {
              if (el) objectsRef.current[1] = el;
            }}
            className="hero-object absolute w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateX(100px) translateZ(50px)',
            }}
          />
          
          {/* Object 3 - Center */}
          <div
            ref={(el) => {
              if (el) objectsRef.current[2] = el;
            }}
            className="hero-object absolute w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)',
            }}
          />
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Hero3DContent Component
 * 
 * Content wrapper for hero section that sits above the 3D scene
 */
export function Hero3DContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`relative z-10 text-center ${className}`}>
      {children}
    </div>
  );
}
