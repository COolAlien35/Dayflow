# Accessibility and Performance Features

This guide documents the accessibility and performance features of the Dayflow HRMS Motion System.

## Overview

The motion system is designed with accessibility and performance as core principles:
- **Accessibility**: Full support for reduced motion preferences
- **Performance**: FPS monitoring with automatic kill switch
- **Device Awareness**: Adaptive animations based on device capabilities
- **Graceful Degradation**: Static fallbacks when animations are disabled

## Accessibility Features

### 1. Reduced Motion Support

#### Automatic Detection

The system automatically detects the `prefers-reduced-motion` media query:

```typescript
// Detected on mount
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Updates when preference changes
mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    // User enabled reduced motion
    killAllAnimations();
    setReducedMotion(true);
  }
});
```

#### Static Rendering

When reduced motion is enabled, animations are replaced with static final states:

```typescript
// With animations
from: { y: 40, opacity: 0 }
to: { y: 0, opacity: 1 }

// With reduced motion (static)
// Element immediately has: y: 0, opacity: 1
```

#### Implementation

```typescript
function useMountAnimation(ref, options) {
  const { isAnimationEnabled } = useMotionSystem();
  
  useEffect(() => {
    if (!isAnimationEnabled()) {
      // Apply final state immediately
      gsap.set(ref.current, options.to);
      return;
    }
    
    // Create animation
    const timeline = gsap.timeline();
    timeline.fromTo(ref.current, options.from, options.to);
    
    return () => timeline.kill();
  }, []);
}
```

### 2. Keyboard Navigation

All interactive elements remain fully keyboard accessible:

```typescript
// Animations never block keyboard navigation
// Focus states are preserved
// Tab order is maintained
```

### 3. Screen Reader Compatibility

Animations don't interfere with screen readers:

```typescript
// Content is accessible immediately
// No ARIA live regions needed for animations
// Semantic HTML is preserved
```

### 4. Testing Reduced Motion

#### Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Rendering tab
3. Enable "Emulate CSS media feature prefers-reduced-motion: reduce"
4. Verify static rendering

#### System Settings

**macOS:**
```
System Preferences → Accessibility → Display → Reduce motion
```

**Windows:**
```
Settings → Ease of Access → Display → Show animations
```

**Linux:**
```
Settings → Universal Access → Reduce animation
```

### 5. Accessibility Requirements

**Requirement 4.1**: Detect prefers-reduced-motion media query on initialization
- ✅ Implemented in MotionSystemProvider
- ✅ Listens for changes
- ✅ Updates context when preference changes

**Requirement 4.2**: Render static UI without animation when reduced motion is enabled
- ✅ Implemented in animation hooks
- ✅ Uses gsap.set() for immediate state
- ✅ Skips timeline creation

**Requirement 4.3**: Respect system-level accessibility preferences
- ✅ Uses native media query API
- ✅ No custom detection logic
- ✅ Updates in real-time

**Requirement 4.6**: Maintain full functionality when animations are disabled
- ✅ All features work without animations
- ✅ No functionality depends on animation completion
- ✅ Static states are visually equivalent

## Performance Features

### 1. FPS Monitoring

#### Real-Time Tracking

The system tracks frame rate in real-time:

```typescript
class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fpsHistory: number[] = [];
  
  start() {
    const measure = () => {
      const currentTime = performance.now();
      const delta = currentTime - this.lastTime;
      
      if (delta >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / delta);
        this.fpsHistory.push(fps);
        
        // Keep last 60 measurements
        if (this.fpsHistory.length > 60) {
          this.fpsHistory.shift();
        }
        
        this.frameCount = 0;
        this.lastTime = currentTime;
      }
      
      this.frameCount++;
      this.rafId = requestAnimationFrame(measure);
    };
    
    this.rafId = requestAnimationFrame(measure);
  }
}
```

#### Average FPS Calculation

```typescript
getAverageFPS(frames: number): number {
  const recent = this.fpsHistory.slice(-frames);
  return recent.reduce((a, b) => a + b, 0) / recent.length;
}
```

### 2. Kill Switch

#### Automatic Activation

The kill switch activates when FPS drops below threshold:

```typescript
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

#### Threshold Configuration

```typescript
<MotionSystemProvider
  config={{
    performance: {
      fpsThreshold: 50,
      monitoringEnabled: true
    }
  }}
>
  {children}
</MotionSystemProvider>
```

### 3. Performance Constraints

#### No CSS Shadows

CSS shadows are prohibited in animated elements:

```typescript
// ❌ Wrong
<div className="shadow-lg animate-fade-in">
  Content
</div>

// ✅ Correct
<div className="animate-fade-in">
  Content
</div>
```

#### No Physics Libraries

Physics simulations are prohibited:

```typescript
// ❌ Wrong
import Matter from 'matter-js';

// ✅ Correct
// Use GSAP for all animations
```

#### Single Canvas Constraint

Maximum one canvas element for 3D effects:

```typescript
// ❌ Wrong
<canvas id="hero-3d" />
<canvas id="background-3d" />

// ✅ Correct
<canvas id="hero-3d" />
```

#### Texture Size Limits

Textures must be below size threshold:

```typescript
import { validateTextureSize } from '@/lib/motion/performance-constraints';

const isValid = validateTextureSize(textureWidth, textureHeight);
```

### 4. Device-Specific Optimization

#### Motion Scaling

Animations are automatically scaled based on device:

```typescript
class DeviceAdapter {
  getMotionScale(): number {
    switch (this.deviceType) {
      case 'desktop': return 1.0;  // Full animations
      case 'tablet': return 0.7;   // Reduced animations
      case 'mobile': return 0.0;   // Disabled
    }
  }
}
```

#### ScrollTrigger Behavior

ScrollTrigger is disabled on mobile:

```typescript
shouldEnableScrollTrigger(): boolean {
  return this.deviceType !== 'mobile';
}
```

#### Device Detection

```typescript
detectDevice(): 'desktop' | 'tablet' | 'mobile' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
```

### 5. Performance Requirements

**Requirement 15.1**: Use maximum one canvas element for 3D effects
- ✅ Enforced in hero component
- ✅ Validated in performance tests

**Requirement 15.2**: No CSS shadows in animated elements
- ✅ Documented in guidelines
- ✅ Validated in performance tests

**Requirement 15.3**: No physics simulations
- ✅ No physics libraries imported
- ✅ Validated in performance tests

**Requirement 15.4**: No large textures
- ✅ Texture validator implemented
- ✅ Size limits enforced

**Requirement 15.5**: Monitor frame rate and maintain minimum 50 FPS threshold
- ✅ PerformanceMonitor implemented
- ✅ Real-time FPS tracking
- ✅ Rolling average calculation

**Requirement 15.6**: Disable motion system when FPS drops below threshold
- ✅ Kill switch implemented
- ✅ Automatic activation
- ✅ All animations killed

## Device Awareness

### 1. Device Detection

#### Breakpoints

```typescript
// Mobile: < 768px
// Tablet: 768px - 1023px
// Desktop: >= 1024px
```

#### Responsive Behavior

```typescript
// Desktop
- Full animations (1.0 scale)
- ScrollTrigger enabled
- All features available

// Tablet
- Reduced animations (0.7 scale)
- ScrollTrigger enabled
- All features available

// Mobile
- Animations disabled (0.0 scale)
- ScrollTrigger disabled
- Static rendering
```

### 2. Adaptive Animations

#### Transform Scaling

```typescript
// Desktop
{ y: 40 } → { y: 40 }

// Tablet
{ y: 40 } → { y: 28 }  // 0.7 scale

// Mobile
{ y: 40 } → { y: 0 }   // 0.0 scale (disabled)
```

#### Duration Scaling

```typescript
// Desktop
duration: 500 → 500ms

// Tablet
duration: 500 → 350ms  // 0.7 scale

// Mobile
duration: 500 → 0ms    // Disabled
```

### 3. Device Requirements

**Requirement 14.1**: Enable full motion capabilities on desktop
- ✅ Motion scale: 1.0
- ✅ All animations enabled
- ✅ ScrollTrigger enabled

**Requirement 14.2**: Reduce motion intensity by 0.7 on tablet
- ✅ Motion scale: 0.7
- ✅ Transforms scaled
- ✅ Duration scaled

**Requirement 14.3**: Disable ScrollTrigger animations on mobile
- ✅ Motion scale: 0.0
- ✅ ScrollTrigger disabled
- ✅ Static rendering

**Requirement 14.5**: Detect device type on initialization
- ✅ DeviceAdapter implemented
- ✅ Window resize listener
- ✅ Real-time updates

## Graceful Degradation

### 1. Fallback Strategy

When animations are disabled:

```typescript
// 1. Reduced motion enabled
// 2. FPS drops below threshold
// 3. Device is mobile
// 4. JavaScript disabled

// → Apply static final state
// → Maintain full functionality
// → No visual glitches
```

### 2. Progressive Enhancement

The system is built with progressive enhancement:

```typescript
// Base: Static, functional UI
// Enhanced: Smooth animations
// Degraded: Falls back to base
```

### 3. Error Handling

Animations fail gracefully:

```typescript
try {
  // Create animation
  const timeline = gsap.timeline();
  timeline.fromTo(element, from, to);
} catch (error) {
  // Fallback to static state
  gsap.set(element, to);
  console.error('Animation failed:', error);
}
```

## Testing

### 1. Accessibility Testing

```bash
# Test with reduced motion
# 1. Enable in browser DevTools
# 2. Navigate through application
# 3. Verify static rendering
# 4. Check functionality
```

### 2. Performance Testing

```bash
# Test FPS monitoring
npm run dev
# Open browser console
# Run: import { testFPSTracking } from '@/lib/motion/performance-test'
# Run: await testFPSTracking()
```

### 3. Device Testing

```bash
# Test on different devices
# 1. Desktop: Full animations
# 2. Tablet: Reduced animations
# 3. Mobile: Static rendering
```

### 4. Kill Switch Testing

```bash
# Test kill switch activation
# 1. Enable CPU throttling (6x)
# 2. Navigate to animated page
# 3. Verify kill switch activates
# 4. Check FPS in Performance tab
```

## Best Practices

### 1. Always Test Accessibility

- Test with reduced motion enabled
- Verify keyboard navigation
- Check screen reader compatibility
- Test on different devices

### 2. Monitor Performance

- Use Chrome DevTools Performance tab
- Check FPS during development
- Test on low-powered devices
- Verify kill switch works

### 3. Respect User Preferences

- Honor reduced motion preference
- Don't override accessibility settings
- Provide static fallbacks
- Maintain functionality

### 4. Optimize for Devices

- Use device-specific scaling
- Disable heavy animations on mobile
- Test on real devices
- Consider battery life

## Troubleshooting

### Issue: Animations Not Respecting Reduced Motion

**Solution:**
1. Check MotionSystemProvider is at app root
2. Verify isAnimationEnabled() is called
3. Test media query detection
4. Check browser console for errors

### Issue: Kill Switch Not Activating

**Solution:**
1. Verify performance monitoring is enabled
2. Check FPS threshold (default: 50)
3. Test with CPU throttling
4. Check callback is configured

### Issue: Animations Too Slow on Tablet

**Solution:**
1. Verify device detection is working
2. Check motion scale (should be 0.7)
3. Test transform and duration scaling
4. Verify DeviceAdapter is initialized

### Issue: Mobile Animations Not Disabled

**Solution:**
1. Check device detection breakpoint (< 768px)
2. Verify motion scale is 0.0
3. Test ScrollTrigger is disabled
4. Check static rendering is applied

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Reduced Motion Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Web Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Motion System README](./README.md)
- [Performance Testing Guide](./PERFORMANCE_TESTING.md)

## Summary

The motion system provides comprehensive accessibility and performance features:

✅ **Accessibility**
- Automatic reduced motion detection
- Static fallbacks
- Full functionality without animations
- Keyboard and screen reader compatible

✅ **Performance**
- Real-time FPS monitoring
- Automatic kill switch
- Performance constraints enforced
- Device-specific optimization

✅ **Device Awareness**
- Adaptive animations
- Mobile-first approach
- Responsive behavior
- Battery-conscious

✅ **Graceful Degradation**
- Progressive enhancement
- Error handling
- Fallback strategies
- No functionality loss
