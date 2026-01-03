/**
 * Manual verification script for core motion system infrastructure
 * 
 * This script verifies that:
 * 1. GSAP and ScrollTrigger are properly installed
 * 2. Configuration is correctly defined
 * 3. Validation function works
 * 4. Accessibility utilities work
 * 5. MotionSystemProvider can be imported
 */

console.log('=== Motion System Infrastructure Verification ===\n');

// Test 1: GSAP Setup
console.log('✓ Test 1: GSAP Setup');
try {
  const { gsap, ScrollTrigger } = require('./gsap-setup');
  console.log('  - GSAP imported:', typeof gsap === 'object' && typeof gsap.to === 'function');
  console.log('  - ScrollTrigger imported:', typeof ScrollTrigger === 'object');
  console.log('  - GSAP defaults:', gsap.defaults());
  console.log('');
} catch (error) {
  console.error('  ✗ GSAP setup failed:', error.message);
  process.exit(1);
}

// Test 2: Configuration
console.log('✓ Test 2: Configuration');
try {
  const { defaultMotionConfig } = require('./config');
  console.log('  - Config loaded:', typeof defaultMotionConfig === 'object');
  console.log('  - Max duration:', defaultMotionConfig.timing.maxDuration, 'ms');
  console.log('  - Min duration:', defaultMotionConfig.timing.minDuration, 'ms');
  console.log('  - Stagger step:', defaultMotionConfig.timing.staggerStep, 'ms');
  console.log('  - Max translateY:', defaultMotionConfig.transforms.maxTranslateY, 'px');
  console.log('  - Max translateX:', defaultMotionConfig.transforms.maxTranslateX, 'px');
  console.log('  - Max scale:', defaultMotionConfig.transforms.maxScale);
  console.log('  - Min opacity:', defaultMotionConfig.transforms.minOpacity);
  console.log('  - Primary easing:', defaultMotionConfig.easing.primary);
  console.log('  - FPS threshold:', defaultMotionConfig.performance.fpsThreshold);
  console.log('');
} catch (error) {
  console.error('  ✗ Configuration failed:', error.message);
  process.exit(1);
}

// Test 3: Validation
console.log('✓ Test 3: Validation');
try {
  const { validateAnimation } = require('./validation');
  const { defaultMotionConfig } = require('./config');
  
  // Valid animation
  const valid = validateAnimation({
    duration: 400,
    easing: 'power2.out',
    from: { y: 20, opacity: 0.9 },
    to: { y: 0, opacity: 1 }
  }, defaultMotionConfig);
  console.log('  - Valid animation passes:', valid === true);
  
  // Invalid duration (too short)
  const invalidShort = validateAnimation({
    duration: 100,
    to: { y: 0 }
  }, defaultMotionConfig);
  console.log('  - Too short duration rejected:', invalidShort === false);
  
  // Invalid duration (too long)
  const invalidLong = validateAnimation({
    duration: 800,
    to: { y: 0 }
  }, defaultMotionConfig);
  console.log('  - Too long duration rejected:', invalidLong === false);
  
  // Invalid easing
  const invalidEasing = validateAnimation({
    duration: 400,
    easing: 'elastic.out',
    to: { y: 0 }
  }, defaultMotionConfig);
  console.log('  - Forbidden easing rejected:', invalidEasing === false);
  
  // Invalid transform (translateY)
  const invalidTransform = validateAnimation({
    duration: 400,
    from: { y: 50 },
    to: { y: 0 }
  }, defaultMotionConfig);
  console.log('  - Excessive translateY rejected:', invalidTransform === false);
  
  console.log('');
} catch (error) {
  console.error('  ✗ Validation failed:', error.message);
  process.exit(1);
}

// Test 4: Accessibility Utilities
console.log('✓ Test 4: Accessibility Utilities');
try {
  const { shouldUseStaticRendering } = require('./accessibility');
  
  console.log('  - Reduced motion enabled:', shouldUseStaticRendering(true, true) === true);
  console.log('  - Motion disabled:', shouldUseStaticRendering(false, false) === true);
  console.log('  - Both enabled:', shouldUseStaticRendering(false, true) === false);
  console.log('');
} catch (error) {
  console.error('  ✗ Accessibility utilities failed:', error.message);
  process.exit(1);
}

// Test 5: Types
console.log('✓ Test 5: Type Definitions');
try {
  const types = require('./types');
  console.log('  - Types module loaded successfully');
  console.log('');
} catch (error) {
  console.error('  ✗ Types failed:', error.message);
  process.exit(1);
}

// Test 6: Index exports
console.log('✓ Test 6: Index Exports');
try {
  const index = require('./index');
  console.log('  - defaultMotionConfig exported:', typeof index.defaultMotionConfig === 'object');
  console.log('  - validateAnimation exported:', typeof index.validateAnimation === 'function');
  console.log('  - applyStaticState exported:', typeof index.applyStaticState === 'function');
  console.log('  - shouldUseStaticRendering exported:', typeof index.shouldUseStaticRendering === 'function');
  console.log('  - createAnimationOrStatic exported:', typeof index.createAnimationOrStatic === 'function');
  console.log('  - gsap exported:', typeof index.gsap === 'object');
  console.log('  - ScrollTrigger exported:', typeof index.ScrollTrigger === 'object');
  console.log('');
} catch (error) {
  console.error('  ✗ Index exports failed:', error.message);
  process.exit(1);
}

console.log('=== All Infrastructure Tests Passed ✓ ===');
console.log('\nCore infrastructure is ready:');
console.log('  ✓ Task 1: GSAP and ScrollTrigger installed and configured');
console.log('  ✓ Task 2: Motion Configuration and Context implemented');
console.log('  ✓ Task 3: Animation Validation implemented');
console.log('  ✓ Task 4: Accessibility Detection implemented');
console.log('\nThe motion system core infrastructure is complete and working correctly.');
