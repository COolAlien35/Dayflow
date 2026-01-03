# Adding New Screen Animations

This guide explains how to add animations to new screens in the Dayflow HRMS application.

## Overview

Adding animations to a new screen involves:
1. Creating an animation configuration file
2. Applying animations in the component
3. Testing and validating
4. Documenting the animations

## Step-by-Step Guide

### Step 1: Create Animation Configuration File

Create a new file in `lib/motion/animations/` for your screen:

```typescript
// lib/motion/animations/myScreenAnimations.ts

/**
 * My Screen Animations
 * 
 * Requirements:
 * - X.Y: Description of animation requirement
 */

import type { UseMountAnimationOptions, UseScrollAnimationOptions, UseHoverAnimationOptions } from '../types';

// Raw animation definitions
export const myScreenAnimations = {
  // Mount animations
  header: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 400
  },
  
  // Scroll animations
  content: {
    from: { y: 30, opacity: 0.9 },
    to: { y: 0, opacity: 1 },
    start: 'top 80%',
    end: 'top 50%'
  },
  
  // Hover animations
  buttonHover: {
    to: { scale: 1.04 },
    duration: 200
  }
};

// Formatted options for hooks
export const myScreenAnimationOptions = {
  header: {
    from: myScreenAnimations.header.from,
    to: myScreenAnimations.header.to,
    duration: myScreenAnimations.header.duration
  } as UseMountAnimationOptions,
  
  content: {
    from: myScreenAnimations.content.from,
    to: myScreenAnimations.content.to,
    start: myScreenAnimations.content.start,
    end: myScreenAnimations.content.end
  } as UseScrollAnimationOptions,
  
  buttonHover: {
    to: myScreenAnimations.buttonHover.to,
    duration: myScreenAnimations.buttonHover.duration
  } as UseHoverAnimationOptions
};
```

### Step 2: Export from Index

Add your animations to `lib/motion/index.ts`:

```typescript
// Animation configurations
export { myScreenAnimations, myScreenAnimationOptions } from './animations/myScreenAnimations';
```

### Step 3: Apply Animations in Component

Use the animation hooks in your component:

```typescript
'use client';

import { useRef } from 'react';
import { useMountAnimation, useScrollAnimation, useHoverAnimation } from '@/lib/motion';
import { myScreenAnimationOptions } from '@/lib/motion/animations/myScreenAnimations';

export default function MyScreenPage() {
  // Create refs for animated elements
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Apply animations
  useMountAnimation(headerRef, myScreenAnimationOptions.header);
  useScrollAnimation(contentRef, myScreenAnimationOptions.content);
  useHoverAnimation(buttonRef, myScreenAnimationOptions.buttonHover);

  return (
    <div>
      <div ref={headerRef}>
        <h1>My Screen</h1>
      </div>
      
      <div ref={contentRef}>
        <p>Content that animates on scroll</p>
      </div>
      
      <button ref={buttonRef}>
        Hover me
      </button>
    </div>
  );
}
```

## Animation Patterns

### Pattern 1: Page Header Animation

Animate page headers on scroll entry:

```typescript
export const pageHeaderAnimation = {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  start: 'top 80%'
};

// In component
const headerRef = useRef<HTMLDivElement>(null);
useScrollAnimation(headerRef, pageHeaderAnimation);
```

### Pattern 2: Card Grid Stagger

Stagger animate multiple cards:

```typescript
export const cardGridAnimation = {
  from: { y: 30, opacity: 0.9 },
  to: { y: 0, opacity: 1 },
  stagger: 120
};

// In component
const gridRef = useRef<HTMLDivElement>(null);
useMountAnimation(gridRef, cardGridAnimation);
```

### Pattern 3: Button Hover

Add hover effect to buttons:

```typescript
export const buttonHoverAnimation = {
  to: { scale: 1.04 },
  duration: 200
};

// In component
const buttonRef = useRef<HTMLButtonElement>(null);
useHoverAnimation(buttonRef, buttonHoverAnimation);
```

### Pattern 4: Parallax Effect

Create parallax scrolling effect:

```typescript
export const parallaxAnimation = {
  from: { y: -30 },
  to: { y: 0 },
  scrub: true
};

// In component
const panelRef = useRef<HTMLDivElement>(null);
useScrollAnimation(panelRef, parallaxAnimation);
```

### Pattern 5: Action-Triggered Animation

Animate on user action:

```typescript
export const flashAnimation = {
  to: { backgroundColor: '#f0f0f0' },
  duration: 300,
  yoyo: true,
  repeat: 1
};

// In component
const rowRef = useRef<HTMLDivElement>(null);
const flash = useActionAnimation(rowRef, flashAnimation);

const handleClick = () => {
  flash.play();
};
```

## Common Animation Scenarios

### Scenario 1: Data Table Page

For pages with data tables:

```typescript
export const dataTableAnimations = {
  // Animate page header
  pageHeader: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  
  // Animate filters
  filters: {
    from: { x: 20, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  
  // DO NOT animate table rows or cells
  // Data should be immediately visible
};
```

### Scenario 2: Form Page

For pages with forms:

```typescript
export const formAnimations = {
  // Animate form container
  form: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  
  // Stagger animate form fields
  fields: {
    from: { y: 10, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80
  },
  
  // Animate submit button
  submitButton: {
    from: { scale: 0.96, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 200
  }
};
```

### Scenario 3: Dashboard Page

For dashboard pages with multiple sections:

```typescript
export const dashboardAnimations = {
  // Animate page title
  pageTitle: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    start: 'top 80%'
  },
  
  // Stagger animate stat cards
  statCards: {
    from: { y: 30, opacity: 0.9 },
    to: { y: 0, opacity: 1 },
    stagger: 120
  },
  
  // Animate sidebar
  sidebar: {
    from: { x: -20, opacity: 0 },
    to: { x: 0, opacity: 1 }
  }
};
```

## Animation Guidelines

### What to Animate

✅ **DO animate:**
- Page headers and titles
- Navigation elements (sidebar, topbar)
- Cards and panels
- Buttons and interactive elements
- Info blocks and notes
- Modals and dialogs

❌ **DO NOT animate:**
- Data tables (rows, cells)
- Numerical values
- Form inputs during typing
- Error messages during typing
- Background elements

### Animation Timing

- **Fast**: 150-200ms (hover effects, small UI changes)
- **Medium**: 300-400ms (page transitions, card animations)
- **Slow**: 500-600ms (large elements, hero sections)

### Animation Intensity

- **Subtle**: Small transforms (10-20px, scale 1.02-1.04)
- **Moderate**: Medium transforms (20-40px, scale 1.04-1.05)
- **Prominent**: Large transforms (30-40px, full opacity fade)

## Testing Your Animations

### 1. Visual Testing

Test animations in the browser:

```bash
npm run dev
```

Navigate to your screen and verify:
- Animations play smoothly
- Timing feels right
- Transforms are subtle
- No janky motion

### 2. Accessibility Testing

Test with reduced motion:

1. Open Chrome DevTools
2. Go to Rendering tab
3. Enable "Emulate CSS media feature prefers-reduced-motion: reduce"
4. Verify static rendering works

### 3. Performance Testing

Test on low-powered devices:

1. Enable CPU throttling in DevTools
2. Navigate to your screen
3. Verify animations remain smooth
4. Check FPS in Performance tab

### 4. Device Testing

Test on different devices:

- **Desktop**: Full animations
- **Tablet**: Reduced animations (0.7 scale)
- **Mobile**: Minimal animations (0.0 scale)

## Validation Checklist

Before submitting your animations:

- [ ] Animation configuration file created
- [ ] Animations exported from index.ts
- [ ] Animations applied in component
- [ ] Timing within 150-600ms range
- [ ] Transforms within limits (±40px, scale ≤1.05, opacity ≥0.85)
- [ ] Easing uses allowed functions (power2.out, power1.out)
- [ ] Data tables NOT animated
- [ ] Reduced motion tested
- [ ] Performance tested
- [ ] Device-specific behavior verified
- [ ] Documentation updated

## Common Mistakes

### Mistake 1: Animating Data Tables

```typescript
// ❌ Wrong
useScrollAnimation(tableRef, {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 }
});

// ✅ Correct
// Don't animate tables - data should be immediately visible
```

### Mistake 2: Exceeding Transform Limits

```typescript
// ❌ Wrong
useMountAnimation(ref, {
  from: { y: 60, opacity: 0 },  // Exceeds 40px limit
  to: { y: 0, opacity: 1 }
});

// ✅ Correct
useMountAnimation(ref, {
  from: { y: 40, opacity: 0 },  // Within limit
  to: { y: 0, opacity: 1 }
});
```

### Mistake 3: Using Forbidden Easing

```typescript
// ❌ Wrong
useMountAnimation(ref, {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  easing: 'elastic.out'  // Forbidden
});

// ✅ Correct
useMountAnimation(ref, {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  easing: 'power2.out'  // Allowed
});
```

### Mistake 4: Inline Configuration

```typescript
// ❌ Wrong
useMountAnimation(ref, {
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 500
});

// ✅ Correct
import { myScreenAnimationOptions } from '@/lib/motion/animations/myScreenAnimations';
useMountAnimation(ref, myScreenAnimationOptions.header);
```

## Advanced Techniques

### Technique 1: Conditional Animations

Apply animations conditionally:

```typescript
const shouldAnimate = someCondition;

if (shouldAnimate) {
  useMountAnimation(ref, animationOptions);
}
```

### Technique 2: Sequential Animations

Chain animations with delays:

```typescript
useMountAnimation(ref1, { ...options, delay: 0 });
useMountAnimation(ref2, { ...options, delay: 200 });
useMountAnimation(ref3, { ...options, delay: 400 });
```

### Technique 3: Scroll-Linked Animations

Create smooth scroll-linked animations:

```typescript
useScrollAnimation(ref, {
  from: { y: -30 },
  to: { y: 0 },
  scrub: true  // Smooth scroll-linked animation
});
```

### Technique 4: Pin During Scroll

Pin element during scroll:

```typescript
useScrollAnimation(ref, {
  from: { scale: 0.9, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  pin: true,
  pinDuration: '15%'
});
```

## Resources

- [Animation Configuration Guide](./ANIMATION_CONFIGURATION.md)
- [Motion System README](./README.md)
- [Performance Testing Guide](./PERFORMANCE_TESTING.md)
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)

## Getting Help

If you encounter issues:

1. Check browser console for validation warnings
2. Review animation configuration format
3. Test with reduced motion disabled
4. Check DevTools Performance tab
5. Consult existing animation files for examples

## Examples

See these files for complete examples:

- `lib/motion/animations/authAnimations.ts` - Simple mount animations
- `lib/motion/animations/dashboardAnimations.ts` - Scroll animations
- `lib/motion/animations/profileAnimations.ts` - Pin and stagger animations
- `lib/motion/animations/leaveApprovalAnimations.ts` - Action animations
- `lib/motion/animations/heroAnimations.ts` - 3D animations
