# Accessibility Features

## Overview

The Motion System includes comprehensive accessibility support to ensure users with motion sensitivity can use the application comfortably. This document explains how the accessibility features work and how to use them.

## Features

### 1. Prefers-Reduced-Motion Detection

The `MotionSystemProvider` automatically detects the user's `prefers-reduced-motion` preference:

- **On Mount**: Checks the media query `(prefers-reduced-motion: reduce)`
- **Dynamic Updates**: Listens for changes to the preference
- **Automatic Cleanup**: Kills all animations when reduced motion is enabled

```typescript
// Automatically handled by MotionSystemProvider
<MotionSystemProvider>
  <App />
</MotionSystemProvider>
```

### 2. Static Fallback Rendering

When reduced motion is enabled, animations are replaced with static state changes:

```typescript
import { applyStaticState } from '@/lib/motion';

// Instead of animating, apply final state immediately
applyStaticState(element, {
  opacity: 1,
  y: 0,
  scale: 1
});
```

### 3. Animation Hooks with Accessibility Support

Future animation hooks (to be implemented in Task 7) will automatically use the accessibility utilities:

```typescript
// Example of how hooks will work (not yet implemented)
function useMountAnimation(ref, options) {
  const { config } = useMotionSystem();
  
  useEffect(() => {
    const timeline = createAnimationOrStatic(
      ref.current,
      options.from,
      options.to,
      options,
      config.reducedMotion,
      config.enabled
    );
    
    return () => timeline?.kill();
  }, []);
}
```

## Utility Functions

### `applyStaticState(target, finalState)`

Applies the final animation state immediately without animation using `gsap.set()`.

**Parameters:**
- `target`: Element(s) to apply state to
- `finalState`: The final state to apply (typically the 'to' properties)

**Example:**
```typescript
applyStaticState('.card', {
  opacity: 1,
  y: 0,
  scale: 1
});
```

### `shouldUseStaticRendering(reducedMotion, enabled)`

Determines if static rendering should be used instead of animations.

**Parameters:**
- `reducedMotion`: Whether reduced motion is enabled
- `enabled`: Whether the motion system is globally enabled

**Returns:** `true` if static rendering should be used

**Example:**
```typescript
if (shouldUseStaticRendering(config.reducedMotion, config.enabled)) {
  // Use static rendering
  applyStaticState(element, finalState);
} else {
  // Create animation
  gsap.fromTo(element, from, to);
}
```

### `createAnimationOrStatic(target, from, to, options, reducedMotion, enabled)`

Creates an animation timeline or applies static state based on accessibility preferences.

**Parameters:**
- `target`: Element(s) to animate or apply state to
- `from`: Initial animation state (optional)
- `to`: Final animation state
- `options`: Animation options (duration, delay, stagger, ease)
- `reducedMotion`: Whether reduced motion is enabled
- `enabled`: Whether the motion system is globally enabled

**Returns:** GSAP timeline if animation is created, `null` if static state is applied

**Example:**
```typescript
const timeline = createAnimationOrStatic(
  '.card',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0 },
  { duration: 500, ease: 'power2.out' },
  config.reducedMotion,
  config.enabled
);

// Clean up when done
timeline?.kill();
```

## Requirements Satisfied

- **4.1**: Detect prefers-reduced-motion media query on initialization
- **4.2**: Apply final animation state immediately using gsap.set() when reduced motion is enabled
- **4.3**: Listen for changes to media query and update context
- **4.6**: Maintain full functionality when animations are disabled

## Testing

Tests are provided in `accessibility.test.ts` to verify:
- Static state application works correctly
- Static rendering decision logic is correct
- Timeline creation vs static state is handled properly
- Milliseconds are converted to seconds for GSAP

## Next Steps

When implementing animation hooks (Task 7), use the `createAnimationOrStatic` utility to ensure accessibility support is built-in from the start.
