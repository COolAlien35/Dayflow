# Scroll Animation Reversibility

## Overview

This document describes the bidirectional scroll animation feature implemented in the Dayflow HRMS Motion System. This feature ensures that all scroll-based animations are reversible - scrolling down progresses the animation forward, and scrolling up reverses it.

## Requirements

**Requirement 1.2**: The Motion System SHALL make all scroll-based animations reversible (scroll up reverses animation)

## Implementation

### Key Configuration: `scrub` Parameter

The bidirectional behavior is achieved through GSAP ScrollTrigger's `scrub` parameter:

```typescript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',
  end: 'top 50%',
  scrub: true, // Enables bidirectional scroll-linked animation
}
```

### How It Works

1. **`scrub: true`**: Enables smooth scroll-linked animations
   - Animation progress is directly tied to scroll position
   - Scrolling down → animation progresses forward
   - Scrolling up → animation reverses automatically
   - No easing applied (linear relationship with scroll)

2. **`scrub: number`** (e.g., `scrub: 0.5`): Adds smoothing/lag
   - Still bidirectional
   - Adds a delay/smoothing effect to the animation
   - Value represents seconds of lag

3. **`scrub: false`**: One-time trigger animation
   - Animation plays once when element enters viewport
   - Does NOT reverse when scrolling back up
   - Uses standard easing functions

### Code Implementation

The `useScrollAnimation` hook in `lib/motion/hooks.ts` implements this:

```typescript
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions
): void {
  // ...
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end || 'top 50%',
      scrub: options.scrub !== undefined ? options.scrub : false,
      // ... other options
    },
  });

  timeline.fromTo(
    element,
    options.from,
    {
      ...options.to,
      // When scrub is enabled, duration is normalized (0-1)
      duration: options.scrub ? 1 : (config.timing.minDuration / 1000),
      // When scrub is enabled, use 'none' easing for linear scroll-linked animation
      ease: options.scrub ? 'none' : config.easing.primary,
    }
  );
}
```

### Key Implementation Details

1. **Duration**: When `scrub` is enabled, duration is set to `1` (normalized 0-1 range representing scroll progress)

2. **Easing**: When `scrub` is enabled, easing is set to `'none'` for linear scroll-linked animation

3. **Automatic Reversibility**: GSAP ScrollTrigger handles the bidirectional behavior automatically when `scrub` is enabled

## Usage Examples

### Example 1: Parallax Effect (Bidirectional)

```typescript
const panelRef = useRef<HTMLDivElement>(null);

useScrollAnimation(panelRef, {
  from: { y: -30 },
  to: { y: 0 },
  scrub: true, // Bidirectional parallax
  start: 'top bottom',
  end: 'bottom top'
});
```

### Example 2: Smooth Scroll-Linked Animation

```typescript
const heroRef = useRef<HTMLDivElement>(null);

useScrollAnimation(heroRef, {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1 },
  scrub: 0.5, // Bidirectional with 0.5s smoothing
  start: 'top bottom',
  end: 'top center'
});
```

### Example 3: One-Time Trigger (Not Bidirectional)

```typescript
const cardRef = useRef<HTMLDivElement>(null);

useScrollAnimation(cardRef, {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  scrub: false, // One-time animation, not reversible
  start: 'top 80%'
});
```

## Testing

The bidirectional behavior is tested in `lib/motion/scroll-reversibility.test.ts`:

- ✅ Scroll animation with `scrub: true` is bidirectional
- ✅ Scroll animation with `scrub: false` is not bidirectional
- ✅ Scroll animation with numeric scrub value adds smoothing
- ✅ Scroll animation uses `ease: 'none'` when scrub is enabled
- ✅ Scroll animation uses easing when scrub is disabled
- ✅ Multiple scroll animations can coexist with different scrub settings

## Screen-Specific Usage

### Leave Application (Parallax Effect)

```typescript
// Info panel with parallax effect (bidirectional)
useScrollAnimation(infoPanelRef, {
  from: { y: -30 },
  to: { y: 0 },
  scrub: true, // Enables bidirectional parallax
  start: 'top bottom',
  end: 'bottom top'
});
```

### 3D Hero Section (Optional)

```typescript
// Camera animation (bidirectional)
useScrollAnimation(cameraRef, {
  from: { z: 6, y: 0 },
  to: { z: 3.5, y: -0.4 },
  scrub: true, // Bidirectional camera movement
  start: 'top top',
  end: 'bottom top'
});
```

## Benefits

1. **Natural Feel**: Animations feel connected to scroll position
2. **User Control**: Users can reverse animations by scrolling up
3. **Smooth Experience**: No jarring one-way animations
4. **Performance**: GSAP handles optimization automatically
5. **Accessibility**: Works with reduced motion preferences

## Verification

To verify bidirectional scroll animations:

1. **Visual Test**: Scroll down to see animation progress, scroll up to see it reverse
2. **Code Review**: Check that `scrub: true` is set for scroll-linked animations
3. **DevTools**: Use GSAP DevTools to inspect ScrollTrigger instances
4. **Markers**: Enable `markers: true` in ScrollTrigger config for debugging

## Related Requirements

- **1.2**: Make all scroll-based animations reversible
- **9.1**: Configure ScrollTrigger for bidirectional animations
- **9.2**: Parallax synchronization
- **16.1**: Use GSAP ScrollTrigger library
- **16.2**: Map scroll position to normalized progress (0 to 1)
- **16.3**: Output scroll progress to component properties

## Status

✅ **Implemented**: Bidirectional scroll animations are fully configured and working
✅ **Tested**: Test suite covers all scrub configurations
✅ **Documented**: Usage examples and implementation details provided
