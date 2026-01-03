# Dayflow HRMS Motion System

The Dayflow HRMS Motion System provides a comprehensive animation framework built on GSAP (GreenSock Animation Platform) with ScrollTrigger integration for React.

## Overview

This motion system is designed to be:
- **Accessible**: Full support for prefers-reduced-motion with graceful degradation
- **Performant**: Frame rate monitoring with automatic kill switch at 50 FPS threshold
- **Consistent**: Unified timing, easing, and transform constraints across all animations
- **Responsive**: Device-aware motion scaling (desktop, tablet, mobile)
- **Maintainable**: Declarative animation definitions with centralized configuration

## Directory Structure

```
lib/motion/
├── index.ts                    # Main export file
├── types.ts                    # TypeScript type definitions
├── config.ts                   # Motion configuration
├── validation.ts               # Animation validation
├── MotionSystemProvider.tsx    # React Context provider
├── AnimationController.ts      # Animation lifecycle management
├── ScrollManager.ts            # ScrollTrigger management
├── DeviceAdapter.ts            # Device detection and scaling
├── PerformanceMonitor.ts       # FPS monitoring and kill switch
├── accessibility.ts            # Accessibility utilities
├── performance-constraints.ts  # Performance validation
├── texture-validator.ts        # Texture size validation
├── performance-test.ts         # Performance testing utilities
├── README.md                   # Overview and quick start
├── ANIMATION_CONFIGURATION.md  # Animation configuration guide
├── ADDING_ANIMATIONS.md        # Guide for adding new animations
├── ACCESSIBILITY_AND_PERFORMANCE.md  # Accessibility and performance features
├── PERFORMANCE_TESTING.md      # Performance testing guide
├── HOOKS_README.md             # Animation hooks API reference
├── AnimationController.README.md  # Animation controller documentation
└── animations/                 # Screen-specific animation definitions
    ├── authAnimations.ts       # Authentication screen animations
    ├── dashboardAnimations.ts  # Dashboard animations
    ├── profileAnimations.ts    # Profile page animations
    ├── attendanceAnimations.ts # Attendance view animations
    ├── leaveApplicationAnimations.ts  # Leave application animations
    ├── leaveApprovalAnimations.ts     # Leave approval animations
    ├── payrollAnimations.ts    # Payroll view animations
    ├── globalNoteAnimations.ts # Global note block animations
    └── heroAnimations.ts       # 3D hero section animations
```

## Documentation

Comprehensive guides for using and extending the motion system:

- **[README.md](./README.md)** - Overview and quick start guide
- **[ANIMATION_CONFIGURATION.md](./ANIMATION_CONFIGURATION.md)** - Complete animation configuration reference
- **[ADDING_ANIMATIONS.md](./ADDING_ANIMATIONS.md)** - Step-by-step guide for adding animations to new screens
- **[ACCESSIBILITY_AND_PERFORMANCE.md](./ACCESSIBILITY_AND_PERFORMANCE.md)** - Accessibility features and performance safeguards
- **[PERFORMANCE_TESTING.md](./PERFORMANCE_TESTING.md)** - Performance testing and optimization guide
- **[HOOKS_README.md](./HOOKS_README.md)** - Animation hooks API reference
- **[AnimationController.README.md](./AnimationController.README.md)** - Animation lifecycle management

## Quick Links

- [Animation Configuration](./ANIMATION_CONFIGURATION.md)
- [Adding New Animations](./ADDING_ANIMATIONS.md)
- [Accessibility Features](./ACCESSIBILITY_AND_PERFORMANCE.md#accessibility-features)
- [Performance Features](./ACCESSIBILITY_AND_PERFORMANCE.md#performance-features)
- [Performance Testing](./PERFORMANCE_TESTING.md)

## Installation

GSAP and ScrollTrigger are installed as dependencies:

```bash
npm install gsap
```

GSAP v3+ includes TypeScript types by default, so no additional @types packages are needed.

## Components

### Configuration (`config.ts`)

Defines the motion system configuration including:
- Timing constraints (min/max duration, stagger step)
- Transform limits (translateX/Y, scale, opacity)
- Easing functions
- Performance settings

### Validation (`validation.ts`)

The `validateAnimation` function validates animation configurations against motion system constraints.

#### Usage

```typescript
import { validateAnimation, AnimationOptions } from './validation';
import { defaultMotionConfig } from './config';

const animationOptions: AnimationOptions = {
  duration: 400,
  easing: 'power2.out',
  from: { y: 20, opacity: 0.9 },
  to: { y: 0, opacity: 1 }
};

const isValid = validateAnimation(animationOptions, defaultMotionConfig);

if (isValid) {
  // Create animation
} else {
  // Handle validation errors (warnings are logged to console)
}
```

#### Validation Rules

The function validates:

1. **Duration Constraints**
   - Minimum: 150ms
   - Maximum: 600ms

2. **Transform Limits**
   - translateX: ±40px
   - translateY: ±40px
   - scale: max 1.05
   - opacity: min 0.85

3. **Forbidden Easing Functions**
   - elastic
   - bounce
   - back

#### Return Value

- Returns `true` if all validations pass
- Returns `false` if any validation fails
- Logs warnings to console for each violation

### Motion System Provider (`MotionSystemProvider.tsx`)

React Context provider that manages:
- Global motion configuration
- Accessibility detection (prefers-reduced-motion)
- Animation lifecycle management
- Animation registry for cleanup

#### Usage

```typescript
import { MotionSystemProvider } from './motion';

function App() {
  return (
    <MotionSystemProvider>
      {/* Your app components */}
    </MotionSystemProvider>
  );
}
```

#### Context Hook

```typescript
import { useMotionSystem } from './motion';

function MyComponent() {
  const { 
    config, 
    isAnimationEnabled, 
    registerAnimation, 
    unregisterAnimation,
    killAllAnimations 
  } = useMotionSystem();
  
  // Use motion system methods
}
```

## Requirements Coverage

The validation system implements the following requirements:

- **1.7**: Prohibit elastic, bounce, and back easing functions
- **2.1**: Maximum duration 600ms
- **2.2**: Minimum duration 150ms
- **2.4**: Validate durations before execution
- **3.1**: Maximum translateY 40px
- **3.2**: Maximum translateX 40px
- **3.3**: Maximum scale 1.05
- **3.4**: Minimum opacity 0.85
- **3.6**: Validate transforms before execution

## Next Steps

Future components will include:
- Animation hooks (useMountAnimation, useScrollAnimation, useHoverAnimation)
- Animation Controller for lifecycle management
- Scroll Manager for ScrollTrigger coordination
- Device Adapter for responsive motion behavior
- Performance Monitor for FPS tracking
