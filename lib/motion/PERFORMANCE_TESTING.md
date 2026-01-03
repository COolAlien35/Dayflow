# Performance Testing Guide

This guide explains how to test and verify the motion system's performance safeguards.

## Overview

The motion system includes several performance safeguards:
- **FPS Monitoring**: Tracks frame rate and maintains minimum 50 FPS threshold
- **Kill Switch**: Automatically disables animations when performance degrades
- **Performance Constraints**: Enforces rules like no CSS shadows, no physics libraries, single canvas

## Requirements

- **15.5**: Monitor frame rate and maintain minimum 50 FPS threshold
- **15.6**: Disable motion system when FPS drops below threshold or demo lag occurs

## Running Performance Tests

### 1. Manual FPS Testing

You can manually test FPS tracking in the browser console:

```javascript
import { testFPSTracking } from '@/lib/motion/performance-test';

// Test FPS tracking for 2 seconds
const result = await testFPSTracking();
console.log(`Average FPS: ${result.averageFPS.toFixed(2)}`);
```

### 2. Kill Switch Testing

To test the kill switch activation (WARNING: This will cause performance issues):

```javascript
import { testKillSwitch } from '@/lib/motion/performance-test';

// Simulate heavy load and test kill switch
const result = await testKillSwitch();
console.log(`Kill switch triggered: ${result.triggered}`);
console.log(`Time to trigger: ${result.timeToTrigger}ms`);
```

### 3. Performance Constraints Verification

Verify that performance constraints are enforced:

```javascript
import { verifyPerformanceConstraints } from '@/lib/motion/performance-test';

const constraints = verifyPerformanceConstraints();
console.log('No CSS shadows:', constraints.noCssShadows);
console.log('No physics libraries:', constraints.noPhysicsLibraries);
console.log('Single canvas:', constraints.singleCanvas);
```

### 4. Comprehensive Test Suite

Run all performance tests:

```javascript
import { runPerformanceTests } from '@/lib/motion/performance-test';

const results = await runPerformanceTests();
console.log('Performance test results:', results);
```

## Lighthouse CI Testing

### Installation

```bash
npm install -g @lhci/cli
```

### Running Lighthouse CI

```bash
# Build the application
npm run build

# Run Lighthouse CI
lhci autorun
```

### Configuration

The `lighthouserc.json` file configures Lighthouse CI to:
- Test multiple pages (auth, dashboard, profile, etc.)
- Run 3 times per page for consistency
- Assert performance score >= 80%
- Assert accessibility score >= 90%
- Check key metrics (FCP, TTI, TBT, CLS)

### Key Metrics

- **First Contentful Paint (FCP)**: < 2000ms
- **Time to Interactive (TTI)**: < 3500ms
- **Speed Index**: < 3000ms
- **Total Blocking Time (TBT)**: < 300ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Max Potential FID**: < 130ms

## Testing on Low-Powered Devices

### Chrome DevTools CPU Throttling

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click the gear icon
4. Enable "CPU: 4x slowdown" or "6x slowdown"
5. Navigate through the application
6. Verify animations remain smooth or kill switch activates

### Real Device Testing

Test on actual low-powered devices:
- **Mobile**: iPhone SE, Android mid-range devices
- **Tablet**: iPad (older models), Android tablets
- **Desktop**: Older laptops with integrated graphics

### Expected Behavior

On low-powered devices:
- **Desktop**: Full animations at 1.0 scale
- **Tablet**: Reduced animations at 0.7 scale
- **Mobile**: Animations disabled (0.0 scale)
- **Kill Switch**: Activates if FPS drops below 50

## Verifying Kill Switch Activation

### Manual Testing

1. Open the application in Chrome
2. Open DevTools Performance tab
3. Start recording
4. Enable CPU throttling (6x slowdown)
5. Navigate to a page with heavy animations
6. Observe FPS in the recording
7. Verify kill switch activates when FPS < 50

### Automated Testing

The kill switch can be tested programmatically:

```javascript
// In browser console
import { testKillSwitch } from '@/lib/motion/performance-test';

const result = await testKillSwitch();
if (result.triggered) {
  console.log(`✓ Kill switch activated after ${result.timeToTrigger}ms`);
} else {
  console.log('✗ Kill switch did not activate');
}
```

## Performance Monitoring in Production

The motion system includes built-in performance monitoring:

```typescript
// In MotionSystemProvider
const monitor = new PerformanceMonitor(
  50, // FPS threshold
  () => {
    // Kill switch callback
    console.warn('Performance threshold breached, disabling motion system');
    killAllAnimations();
    setConfig(prev => ({ ...prev, enabled: false }));
  }
);
```

### Monitoring Dashboard

You can create a performance monitoring dashboard:

```typescript
import { PerformanceMonitor } from '@/lib/motion/PerformanceMonitor';

const monitor = new PerformanceMonitor(50, () => {});
monitor.start();

// Get current FPS
const currentFPS = monitor.getCurrentFPS();

// Get average FPS over last 60 frames
const averageFPS = monitor.getAverageFPS(60);

// Check if performance is acceptable
const isAcceptable = monitor.isPerformanceAcceptable();
```

## Performance Optimization Tips

### 1. Reduce Animation Complexity

- Use simple transforms (translate, scale, opacity)
- Avoid animating expensive properties (box-shadow, filter)
- Limit number of simultaneous animations

### 2. Optimize Scroll Animations

- Use `scrub: true` for smooth scroll-linked animations
- Limit ScrollTrigger instances per page
- Use `start` and `end` to control trigger zones

### 3. Device-Specific Optimization

- Desktop: Full animations (1.0 scale)
- Tablet: Reduced animations (0.7 scale)
- Mobile: Minimal or no animations (0.0 scale)

### 4. Accessibility

- Always respect `prefers-reduced-motion`
- Provide static fallbacks
- Ensure functionality without animations

## Troubleshooting

### Low FPS

If FPS is consistently low:
1. Check for CSS shadows in animated elements
2. Verify no physics libraries are loaded
3. Reduce animation complexity
4. Enable device-specific scaling

### Kill Switch Not Activating

If kill switch doesn't activate when expected:
1. Verify performance monitoring is enabled
2. Check FPS threshold (default: 50)
3. Ensure callback is properly configured
4. Test with CPU throttling

### Animations Not Smooth

If animations are janky:
1. Use Chrome DevTools Performance tab
2. Look for long tasks (> 50ms)
3. Check for layout thrashing
4. Verify GPU acceleration is enabled

## Continuous Integration

Add performance testing to your CI pipeline:

```yaml
# .github/workflows/performance.yml
name: Performance Tests

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

## Reporting

Generate performance reports:

```javascript
import { generatePerformanceReport } from '@/lib/motion/performance-test';

const report = generatePerformanceReport();
console.log('Performance Report:', report);
```

Report includes:
- Timestamp
- FPS threshold
- Monitoring status
- Performance constraints verification

## Best Practices

1. **Test Early**: Run performance tests during development
2. **Test Often**: Include in CI/CD pipeline
3. **Test Real Devices**: Don't rely only on emulation
4. **Monitor Production**: Track FPS in production
5. **Respect Accessibility**: Always honor user preferences
6. **Optimize Progressively**: Start with simple animations
7. **Document Changes**: Track performance impact of changes

## Resources

- [GSAP Performance Tips](https://greensock.com/docs/v3/GSAP/gsap.ticker)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
