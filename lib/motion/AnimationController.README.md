# AnimationController

The AnimationController is a core component of the Dayflow HRMS Motion System that manages the lifecycle of GSAP animations.

## Overview

The AnimationController provides centralized management for all GSAP timelines in the application, ensuring proper initialization, validation, and cleanup of animations.

## Features

- **Timeline Registry**: Maintains a registry of all active animations using a Map
- **Validation Integration**: Validates animation options before registration
- **Lifecycle Management**: Handles registration, unregistration, and bulk cleanup
- **Type Safety**: Fully typed with TypeScript for better developer experience

## Usage

### Basic Usage

```typescript
import { AnimationController } from '@/lib/motion';
import { gsap } from 'gsap';
import { defaultMotionConfig } from '@/lib/motion/config';

// Create a controller instance
const controller = new AnimationController(defaultMotionConfig);

// Create a GSAP timeline
const timeline = gsap.timeline();
timeline.to(element, { opacity: 1, y: 0, duration: 0.4 });

// Register the animation
const success = controller.register('fade-in', timeline);

// Later, cleanup when component unmounts
controller.unregister('fade-in');
```

### With Validation

```typescript
// Register with validation options
const timeline = gsap.timeline();
timeline.to(element, { opacity: 1, y: 20, duration: 0.4 });

const success = controller.register('slide-up', timeline, {
  duration: 400,
  to: { opacity: 1, y: 20 }
});

if (!success) {
  console.log('Animation failed validation');
}
```

### Bulk Operations

```typescript
// Register multiple animations
controller.register('animation-1', timeline1);
controller.register('animation-2', timeline2);
controller.register('animation-3', timeline3);

// Check count
console.log(controller.getCount()); // 3

// Kill all animations at once
controller.killAll();
```

## API Reference

### Constructor

```typescript
constructor(config: MotionConfig)
```

Creates a new AnimationController instance with the specified configuration.

### Methods

#### register()

```typescript
register(
  id: string,
  timeline: gsap.core.Timeline,
  options?: AnimationOptions
): boolean
```

Registers an animation timeline with optional validation.

**Parameters:**
- `id`: Unique identifier for the animation
- `timeline`: GSAP timeline to register
- `options`: Optional animation options to validate

**Returns:** `true` if registration succeeded, `false` if validation failed

#### unregister()

```typescript
unregister(id: string): void
```

Unregisters and kills a specific animation.

**Parameters:**
- `id`: Unique identifier of the animation to unregister

#### killAll()

```typescript
killAll(): void
```

Kills all registered animations and clears the registry.

#### getCount()

```typescript
getCount(): number
```

Returns the number of registered animations.

#### has()

```typescript
has(id: string): boolean
```

Checks if an animation is registered.

**Parameters:**
- `id`: Unique identifier of the animation

**Returns:** `true` if the animation is registered, `false` otherwise

#### get()

```typescript
get(id: string): gsap.core.Timeline | undefined
```

Retrieves a registered timeline by ID.

**Parameters:**
- `id`: Unique identifier of the animation

**Returns:** The timeline if found, `undefined` otherwise

#### updateConfig()

```typescript
updateConfig(config: MotionConfig): void
```

Updates the configuration used for validation.

**Parameters:**
- `config`: New motion system configuration

## Validation

When registering an animation with options, the controller validates:

- **Duration**: Must be between 150ms and 600ms
- **TranslateX/Y**: Must be within ±40px
- **Scale**: Must not exceed 1.05
- **Opacity**: Must not be below 0.85
- **Easing**: Must not use elastic, bounce, or back easing functions

If validation fails, the animation is not registered and a warning is logged.

## Integration

The AnimationController integrates with:

- **MotionSystemProvider**: For global animation management
- **Animation Hooks**: Future hooks will use this controller
- **Performance Monitor**: Can trigger `killAll()` on performance issues
- **Accessibility**: Can trigger `killAll()` when reduced motion is enabled

## Requirements

Satisfies the following requirements:

- **17.1**: Initialize animations on component mount
- **17.2**: Clean up all GSAP timelines on component unmount

## Example: React Hook Integration

```typescript
function useMountAnimation(ref: RefObject<HTMLElement>, options: AnimationOptions) {
  const controller = useAnimationController();
  
  useEffect(() => {
    if (!ref.current) return;
    
    const timeline = gsap.timeline();
    timeline.fromTo(ref.current, options.from, options.to);
    
    const id = `mount-${Math.random()}`;
    controller.register(id, timeline, options);
    
    return () => {
      controller.unregister(id);
    };
  }, []);
}
```

## Testing

Comprehensive test suite available in `AnimationController.test.ts` covering:

- Registration with and without validation
- Validation failure scenarios
- Unregistration and cleanup
- Bulk operations
- Helper methods
- Integration with GSAP

## See Also

- [Motion System Documentation](./README.md)
- [Validation Documentation](./validation.ts)
- [Configuration Documentation](./config.ts)
