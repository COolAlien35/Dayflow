# Animation Hooks Documentation

This document describes the animation hooks provided by the Dayflow HRMS Motion System.

## Overview

The motion system provides two primary hooks for creating animations in React components:

1. **`useMountAnimation`** - For animations that play when a component mounts
2. **`useHoverAnimation`** - For animations triggered by mouse hover events

Both hooks integrate seamlessly with the motion system's accessibility features, performance monitoring, and validation constraints.

## useMountAnimation

Creates animations that play when a component mounts. Supports both single element and stagger animations.

### Signature

```typescript
function useMountAnimation(
  ref: RefObject<HTMLElement>,
  options: UseMountAnimationOptions
): void
```

### Options

```typescript
interface UseMountAnimationOptions {
  from: gsap.TweenVars;    // Starting animation state
  to: gsap.TweenVars;      // Ending animation state
  duration?: number;        // Duration in milliseconds (default: 150ms)
  delay?: number;           // Delay before animation starts in milliseconds
  stagger?: number;         // Delay between child elements in milliseconds
}
```

### Features

- ✅ Automatically checks if animations are enabled (accessibility)
- ✅ Falls back to static rendering when `prefers-reduced-motion` is enabled
- ✅ Validates animation parameters against motion system constraints
- ✅ Registers with AnimationController for lifecycle management
- ✅ Automatically cleans up on component unmount
- ✅ Supports stagger animations for multiple child elements

### Examples

#### Basic Mount Animation

```tsx
import { useRef } from 'react';
import { useMountAnimation } from '@/lib/motion';

function AuthCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useMountAnimation(cardRef, {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 500,
  });

  return <div ref={cardRef}>Card Content</div>;
}
```

#### Stagger Animation

```tsx
function InputFields() {
  const containerRef = useRef<HTMLDivElement>(null);

  useMountAnimation(containerRef, {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80, // 80ms delay between each child
  });

  return (
    <div ref={containerRef}>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <input placeholder="Confirm Password" />
    </div>
  );
}
```

#### Animation with Delay

```tsx
function CTAButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useMountAnimation(buttonRef, {
    from: { scale: 0.96, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 200, // Wait 200ms before starting
  });

  return <button ref={buttonRef}>Get Started</button>;
}
```

### Requirements Validated

- **5.1**: Auth card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
- **5.2**: Input stagger animation (80ms delay)
- **5.3**: CTA button animation (scale:0.96 → scale:1, 200ms delay)
- **17.1**: Initialize animations on component mount
- **17.2**: Clean up timelines on component unmount

## useHoverAnimation

Creates reversible animations triggered by mouse enter/leave events.

### Signature

```typescript
function useHoverAnimation(
  ref: RefObject<HTMLElement>,
  options: UseHoverAnimationOptions
): void
```

### Options

```typescript
interface UseHoverAnimationOptions {
  to: gsap.TweenVars;      // Hover state (automatically reverses on mouse leave)
  duration?: number;        // Duration in milliseconds (default: 200ms)
}
```

### Features

- ✅ Automatically checks if animations are enabled (accessibility)
- ✅ Creates reversible animations (hover in/out)
- ✅ Handles rapid hover events gracefully (overwrite: 'auto')
- ✅ Automatically cleans up event listeners on unmount
- ✅ Kills ongoing animations on cleanup

### Examples

#### Button Hover Scale

```tsx
import { useRef } from 'react';
import { useHoverAnimation } from '@/lib/motion';

function EditButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHoverAnimation(buttonRef, {
    to: { scale: 1.04 },
    duration: 200,
  });

  return <button ref={buttonRef}>Edit</button>;
}
```

#### Link Hover Effect

```tsx
function SwitchLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useHoverAnimation(linkRef, {
    to: { scale: 1.02, opacity: 0.9 },
    duration: 200,
  });

  return <a ref={linkRef} href="#">Switch to Sign Up</a>;
}
```

#### Combining Mount and Hover Animations

```tsx
function ActionButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mount animation
  useMountAnimation(buttonRef, {
    from: { scale: 0.95 },
    to: { scale: 1 },
  });

  // Hover animation
  useHoverAnimation(buttonRef, {
    to: { scale: 1.04 },
    duration: 200,
  });

  return <button ref={buttonRef}>Approve</button>;
}
```

### Requirements Validated

- **5.4**: Switch link hover (underline width animation, 200ms)
- **7.5**: Edit button hover (scale: 1.04)
- **10.2**: Approve/reject button hover (scale: 1.04)

## Accessibility

Both hooks automatically respect the user's motion preferences:

- When `prefers-reduced-motion` is enabled, mount animations apply the final state immediately
- Hover animations are disabled when motion is reduced
- All functionality remains intact without animations

## Performance

- Animations are validated against motion system constraints before execution
- Invalid animations are rejected and logged as warnings
- Timelines are properly registered and cleaned up to prevent memory leaks
- GSAP's `overwrite: 'auto'` prevents animation conflicts

## Constraints

All animations must respect these limits (enforced by validation):

### Timing
- **Min Duration**: 150ms
- **Max Duration**: 600ms
- **Stagger Step**: 80ms (default)

### Transforms
- **Max TranslateX/Y**: 40px
- **Max Scale**: 1.05
- **Min Opacity**: 0.85

### Easing
- **Allowed**: power2.out (primary), power1.out (secondary)
- **Forbidden**: elastic, bounce, back

## Best Practices

1. **Always use refs**: Both hooks require a React ref to the target element
2. **Keep animations subtle**: Follow the motion system constraints for professional UX
3. **Test with reduced motion**: Ensure your UI works without animations
4. **Combine thoughtfully**: Mount + hover animations work well together
5. **Use stagger for lists**: Stagger animations create visual hierarchy
6. **Avoid over-animation**: Not every element needs animation

## Troubleshooting

### Animation doesn't play

- Check if `MotionSystemProvider` wraps your component tree
- Verify the ref is attached to a valid DOM element
- Check browser console for validation warnings
- Ensure animations aren't disabled by `prefers-reduced-motion`

### Animation is choppy

- Reduce the number of simultaneous animations
- Check if performance monitoring has disabled animations
- Avoid animating expensive properties (use transforms and opacity)

### Stagger not working

- Ensure the ref is on the parent container, not individual children
- Verify children are direct descendants of the ref element
- Check that `stagger` option is provided in milliseconds

## Related Documentation

- [Motion System Overview](./README.md)
- [Configuration](./config.ts)
- [Accessibility](./ACCESSIBILITY.md)
- [Animation Controller](./AnimationController.README.md)
