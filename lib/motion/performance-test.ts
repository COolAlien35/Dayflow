/**
 * Performance Testing Utilities
 * 
 * Tools for testing and verifying the motion system's performance safeguards.
 * 
 * Requirements:
 * - 15.5: Monitor frame rate and maintain minimum 50 FPS threshold
 * - 15.6: Disable motion system when FPS drops below threshold
 */

import { PerformanceMonitor } from './PerformanceMonitor';

/**
 * Test the performance monitor's FPS tracking
 */
export function testFPSTracking(): Promise<{ averageFPS: number; samples: number }> {
  return new Promise((resolve) => {
    const monitor = new PerformanceMonitor(50, () => {});
    monitor.start();

    // Collect samples for 2 seconds
    setTimeout(() => {
      const averageFPS = monitor.getAverageFPS(60);
      monitor.stop();
      
      resolve({
        averageFPS,
        samples: 60
      });
    }, 2000);
  });
}

/**
 * Test the kill switch activation
 * Simulates performance degradation by creating heavy animations
 */
export function testKillSwitch(): Promise<{ triggered: boolean; timeToTrigger: number }> {
  return new Promise((resolve) => {
    let triggered = false;
    const startTime = Date.now();

    const monitor = new PerformanceMonitor(50, () => {
      triggered = true;
      const timeToTrigger = Date.now() - startTime;
      monitor.stop();
      resolve({ triggered, timeToTrigger });
    });

    monitor.start();

    // Simulate heavy load by blocking the main thread
    const simulateHeavyLoad = () => {
      const start = Date.now();
      // Block for 100ms to simulate dropped frames
      while (Date.now() - start < 100) {
        // Busy wait
      }
      
      if (!triggered) {
        requestAnimationFrame(simulateHeavyLoad);
      }
    };

    requestAnimationFrame(simulateHeavyLoad);

    // Timeout after 10 seconds if kill switch doesn't trigger
    setTimeout(() => {
      if (!triggered) {
        monitor.stop();
        resolve({ triggered: false, timeToTrigger: -1 });
      }
    }, 10000);
  });
}

/**
 * Verify performance constraints are enforced
 */
export function verifyPerformanceConstraints(): {
  noCssShadows: boolean;
  noPhysicsLibraries: boolean;
  singleCanvas: boolean;
} {
  // Check for CSS shadows in animated elements
  const animatedElements = document.querySelectorAll('[data-gsap]');
  let hasCssShadows = false;
  
  animatedElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    if (styles.boxShadow && styles.boxShadow !== 'none') {
      hasCssShadows = true;
    }
  });

  // Check for physics libraries (matter.js, cannon.js, etc.)
  const hasPhysicsLibraries = !!(
    (window as any).Matter ||
    (window as any).CANNON ||
    (window as any).Ammo
  );

  // Check for single canvas constraint
  const canvasElements = document.querySelectorAll('canvas');
  const singleCanvas = canvasElements.length <= 1;

  return {
    noCssShadows: !hasCssShadows,
    noPhysicsLibraries: !hasPhysicsLibraries,
    singleCanvas
  };
}

/**
 * Run comprehensive performance test suite
 */
export async function runPerformanceTests(): Promise<{
  fpsTest: { averageFPS: number; samples: number };
  killSwitchTest: { triggered: boolean; timeToTrigger: number };
  constraints: {
    noCssShadows: boolean;
    noPhysicsLibraries: boolean;
    singleCanvas: boolean;
  };
}> {
  console.log('Running performance tests...');

  // Test FPS tracking
  console.log('Testing FPS tracking...');
  const fpsTest = await testFPSTracking();
  console.log(`Average FPS: ${fpsTest.averageFPS.toFixed(2)}`);

  // Test kill switch (optional - can cause performance issues)
  // Uncomment to test kill switch activation
  // console.log('Testing kill switch...');
  // const killSwitchTest = await testKillSwitch();
  // console.log(`Kill switch triggered: ${killSwitchTest.triggered}`);
  
  const killSwitchTest = { triggered: false, timeToTrigger: -1 };

  // Verify constraints
  console.log('Verifying performance constraints...');
  const constraints = verifyPerformanceConstraints();
  console.log('Constraints:', constraints);

  return {
    fpsTest,
    killSwitchTest,
    constraints
  };
}

/**
 * Generate performance report for Lighthouse CI
 */
export function generatePerformanceReport(): {
  timestamp: string;
  fpsThreshold: number;
  monitoringEnabled: boolean;
  constraints: {
    noCssShadows: boolean;
    noPhysicsLibraries: boolean;
    singleCanvas: boolean;
  };
} {
  const constraints = verifyPerformanceConstraints();

  return {
    timestamp: new Date().toISOString(),
    fpsThreshold: 50,
    monitoringEnabled: true,
    constraints
  };
}
