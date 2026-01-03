# Animation Configuration Guide

This guide explains how to configure animations in the Dayflow HRMS Motion System.

## Overview

The motion system uses a declarative configuration format for defining animations. All animations must respect timing, transform, and easing constraints defined in the global configuration.

## Global Configuration

### Motion Config Structure

```typescript
interface MotionConfig {
  // Global settings
  enabled: boolean;
  reducedMotion: boolean;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  
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
```

### Default Configuration

```typescript
export const defaultMotionConfig: MotionConfig = {
  enabled: true,
  reducedMotion: false,
  deviceType: 'desktop',
  timing: {
    maxDuration: 600,
    minDuration: 150,
    staggerStep: 80,
  },
  transforms: {
    maxTranslateX: 40,
    maxTranslateY: 40,
    maxScale: 1.05,
    minOpacity: 0.85,
  },
  easing: {
    primary: 'power2.out',
    secondary: 'power1.out',
  },
  performance: {
    fpsThreshold: 50,
    monitoringEnabled: true,
  },
};
```

## Animation Types

### 1. Mount Animations

Animations that play when a component mounts.

```typescript
interface UseMountAnimationOptions {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
}
```

**Example:**

```typescript
import { useMountAnimation } from '@/lib/motion';

const cardRef = useRef<HTMLDivElement>(null);

useMountAnimation(cardRef, {
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 500
});
```

### 2. Scroll Animations

Animations triggered by scroll position.

```typescript
interface UseScrollAnimationOptions {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinDuration?: string;
}
```

**Example:**

```typescript
import { useScrollAnimation } from '@/lib/motion';

const headerRef = useRef<HTMLDivElement>(null);

useScrollAnimation(headerRef, {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  start: 'top 80%',
  end: 'top 50%'
});
```

### 3. Hover Animations

Animations triggered by mouse hover.

```typescript
interface UseHoverAnimationOptions {
  to: gsap.TweenVars;
  duration?: number;
}
```

**Example:**

```typescript
import { useHoverAnimation } from '@/lib/motion';

const buttonRef = useRef<HTMLButtonElement>(null);

useHoverAnimation(buttonRef, {
  to: { scale: 1.04 },
  duration: 200
});
```

### 4. Action Animations

Animations triggered by user actions (clicks, form submissions, etc.).

```typescript
interface UseActionAnimationOptions {
  to: gsap.TweenVars;
  duration?: number;
  yoyo?: boolean;
  repeat?: number;
}
```

**Example:**

```typescript
import { useActionAnimation } from '@/lib/motion';

const rowRef = useRef<HTMLDivElement>(null);

const flashAnimation = useActionAnimation(rowRef, {
  to: { backgroundColor: '#f0f0f0' },
  duration: 300,
  yoyo: true,
  repeat: 1
});

// Trigger on action
const handleApprove = () => {
  flashAnimation.play();
};
```

## Animation Configuration Files

### File Structure

```
lib/motion/animations/
├── authAnimations.ts
├── dashboardAnimations.ts
├── profileAnimations.ts
├── attendanceAnimations.ts
├── leaveApplicationAnimations.ts
├── leaveApprovalAnimations.ts
├── payrollAnimations.ts
├── globalNoteAnimations.ts
└── heroAnimations.ts
```

### Configuration Format

Each animation file exports:
1. **Animation definitions**: Raw GSAP tween vars
2. **Animation options**: Formatted for hooks
3. **Screen metadata**: Description and requirements

**Example: authAnimations.ts**

```typescript
/**
 * Authentication Screen Animations
 * 
 * Requirements:
 * - 5.1: Card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
 * - 5.2: Input stagger (80ms delay)
 * - 5.3: CTA animation (scale:0.96 → scale:1, 200ms delay)
 * - 5.4: Switch link hover (underline width, 200ms)
 */

export const authAnimations = {
  card: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 500
  },
  inputs: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80
  },
  cta: {
    from: { scale: 0.96, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 200
  },
  switchLinkHover: {
    to: { width: '100%' },
    duration: 200
  }
};

export const authAnimationOptions = {
  card: {
    from: authAnimations.card.from,
    to: authAnimations.card.to,
    duration: authAnimations.card.duration
  },
  inputs: {
    from: authAnimations.inputs.from,
    to: authAnimations.inputs.to,
    stagger: authAnimations.inputs.stagger
  },
  cta: {
    from: authAnimations.cta.from,
    to: authAnimations.cta.to,
    delay: authAnimations.cta.delay
  },
  switchLinkHover: {
    to: authAnimations.switchLinkHover.to,
    duration: authAnimations.switchLinkHover.duration
  }
};
```

## Constraints and Validation

### Timing Constraints

All animations must respect timing constraints:

```typescript
// Valid
duration: 150  // Minimum
duration: 600  // Maximum

// Invalid
duration: 100  // Below minimum
duration: 800  // Above maximum
```

### Transform Limits

All transforms must stay within limits:

```typescript
// Valid
{ y: 40 }      // Within limit
{ x: -40 }     // Within limit
{ scale: 1.05 } // Within limit
{ opacity: 0.85 } // Within limit

// Invalid
{ y: 50 }      // Exceeds limit
{ x: -60 }     // Exceeds limit
{ scale: 1.2 } // Exceeds limit
{ opacity: 0.5 } // Below minimum
```

### Forbidden Easing Functions

These easing functions are prohibited:

```typescript
// Forbidden
'elastic.out'
'bounce.out'
'back.out'

// Allowed
'power2.out'  // Primary
'power1.out'  // Secondary
'linear'
'sine.out'
```

### Validation

Animations are automatically validated before execution:

```typescript
import { validateAnimation } from '@/lib/motion';

const isValid = validateAnimation({
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 500
});

if (!isValid) {
  console.warn('Animation violates constraints');
}
```

## Device-Specific Configuration

### Motion Scaling

Animations are automatically scaled based on device type:

```typescript
// Desktop: 1.0 scale (full animations)
{ y: 40 } → { y: 40 }

// Tablet: 0.7 scale (reduced animations)
{ y: 40 } → { y: 28 }

// Mobile: 0.0 scale (animations disabled)
{ y: 40 } → { y: 0 }
```

### ScrollTrigger Behavior

ScrollTrigger is automatically disabled on mobile:

```typescript
// Desktop & Tablet: ScrollTrigger enabled
useScrollAnimation(ref, options);

// Mobile: Static rendering
// Animation is applied immediately without scroll trigger
```

## Accessibility Configuration

### Reduced Motion

The system automatically detects and respects `prefers-reduced-motion`:

```typescript
// User has reduced motion enabled
// All animations are disabled
// Static final state is applied immediately

// User has normal motion preference
// Animations play as configured
```

### Static Fallbacks

When animations are disabled, the final state is applied immediately:

```typescript
// With animations
from: { y: 40, opacity: 0 }
to: { y: 0, opacity: 1 }

// Without animations (reduced motion)
// Element immediately has: y: 0, opacity: 1
```

## Performance Configuration

### FPS Monitoring

Configure FPS monitoring in the provider:

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

### Kill Switch

The kill switch automatically activates when FPS drops below threshold:

```typescript
// FPS drops below 50
// → Kill all animations
// → Disable motion system
// → Apply static final states
```

## Best Practices

### 1. Use Declarative Configuration

Define animations in configuration files, not inline:

```typescript
// Good
import { authAnimationOptions } from '@/lib/motion/animations/authAnimations';
useMountAnimation(ref, authAnimationOptions.card);

// Avoid
useMountAnimation(ref, {
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 500
});
```

### 2. Respect Constraints

Always stay within timing and transform limits:

```typescript
// Good
duration: 500  // Within 150-600ms range
{ y: 30 }      // Within ±40px limit

// Bad
duration: 800  // Exceeds maximum
{ y: 60 }      // Exceeds limit
```

### 3. Use Appropriate Easing

Use primary easing for most animations:

```typescript
// Good
easing: 'power2.out'  // Primary
easing: 'power1.out'  // Secondary

// Avoid
easing: 'elastic.out' // Forbidden
```

### 4. Consider Accessibility

Always test with reduced motion enabled:

```typescript
// Test in browser DevTools
// Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
```

### 5. Optimize for Performance

- Limit simultaneous animations
- Use simple transforms
- Avoid animating expensive properties
- Test on low-powered devices

## Examples

### Complete Component Example

```typescript
'use client';

import { useRef } from 'react';
import { useMountAnimation, useScrollAnimation, useHoverAnimation } from '@/lib/motion';
import { dashboardAnimationOptions } from '@/lib/motion/animations/dashboardAnimations';

export default function DashboardPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mount animation for title
  useMountAnimation(titleRef, dashboardAnimationOptions.pageTitle);

  // Scroll animation for cards
  useScrollAnimation(cardsRef, {
    from: dashboardAnimationOptions.featureCards.from,
    to: dashboardAnimationOptions.featureCards.to,
    start: 'top 80%'
  });

  // Hover animation for button
  useHoverAnimation(buttonRef, {
    to: { scale: 1.04 },
    duration: 200
  });

  return (
    <div>
      <div ref={titleRef}>
        <h1>Dashboard</h1>
      </div>
      <div ref={cardsRef}>
        {/* Cards */}
      </div>
      <button ref={buttonRef}>
        Click me
      </button>
    </div>
  );
}
```

## Troubleshooting

### Animation Not Playing

1. Check if motion system is enabled
2. Verify ref is attached to element
3. Check browser console for validation warnings
4. Test with reduced motion disabled

### Animation Too Fast/Slow

1. Check duration is within 150-600ms range
2. Verify device scaling is appropriate
3. Test on different devices

### Animation Janky

1. Use Chrome DevTools Performance tab
2. Check for layout thrashing
3. Simplify animation (fewer properties)
4. Verify GPU acceleration is enabled

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Motion System README](./README.md)
- [Performance Testing Guide](./PERFORMANCE_TESTING.md)
