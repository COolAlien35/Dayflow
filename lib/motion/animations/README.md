# Animation Definitions

This directory contains screen-specific animation configurations for the Dayflow HRMS Motion System.

## Authentication Animations

The `authAnimations.ts` file defines animations for login and signup screens:

### Card Animation
- **From**: `{ y: 40, opacity: 0 }`
- **To**: `{ y: 0, opacity: 1 }`
- **Duration**: 500ms
- **Validates**: Requirements 5.1

### Input Stagger Animation
- **From**: `{ y: 20, opacity: 0 }`
- **To**: `{ y: 0, opacity: 1 }`
- **Stagger**: 80ms between each input field
- **Validates**: Requirements 5.2

### CTA Button Animation
- **From**: `{ scale: 0.96, opacity: 0 }`
- **To**: `{ scale: 1, opacity: 1 }`
- **Delay**: 200ms
- **Validates**: Requirements 5.3

### Switch Link Hover
- **Duration**: 200ms
- **Validates**: Requirements 5.4

## Usage

```typescript
import { authAnimationOptions } from '@/lib/motion/animations/authAnimations';
import { useMountAnimation, useHoverAnimation } from '@/lib/motion';

// In your component
const cardRef = useRef<HTMLDivElement>(null);
useMountAnimation(cardRef, authAnimationOptions.card);
```

## Implementation Notes

- All animations respect the global motion configuration (timing constraints, transform limits, easing functions)
- Animations are automatically disabled when `prefers-reduced-motion` is enabled
- Device-specific scaling is applied automatically (desktop: 1.0, tablet: 0.7, mobile: 0.0)
- Background elements and error messages are NOT animated per requirements 5.5 and 5.6
