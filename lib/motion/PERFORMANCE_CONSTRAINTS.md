# Performance Constraints

This document describes the performance safeguards implemented in the Dayflow HRMS Motion System to ensure optimal performance across all devices.

## Overview

The motion system enforces three critical performance constraints:

1. **No CSS Shadows in Animated Elements** (Requirement 15.2)
2. **No Physics Libraries** (Requirement 15.3)
3. **Texture Size Limits** (Requirement 15.4)

These constraints ensure the motion system remains performant and doesn't degrade user experience on lower-powered devices.

## 1. No CSS Shadows in Animated Elements

### Rationale

Animating CSS shadows (box-shadow, text-shadow, filter, backdrop-filter) is extremely expensive because:
- Shadows require complex rendering calculations
- They trigger paint operations on every frame
- They can cause significant FPS drops, especially on mobile devices

### Implementation

The `validateNoCssShadows()` function checks animation options for forbidden properties:

```typescript
import { validateNoCssShadows } from '@/lib/motion';

const options = {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' } // ❌ Invalid
};

const isValid = validateNoCssShadows(options); // Returns false
```

### Best Practice

Use CSS transitions for shadows instead of GSAP animations:

```css
.note-block {
  transition: box-shadow 200ms ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.note-block:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

### Forbidden Properties

- `boxShadow` / `box-shadow`
- `textShadow` / `text-shadow`
- `filter`
- `backdrop-filter`

## 2. No Physics Libraries

### Rationale

Physics simulation libraries add significant overhead:
- Large bundle sizes (often 100KB+)
- Complex calculations on every frame
- Unnecessary for the subtle, intentional animations in this system
- Can cause performance degradation on lower-powered devices

### Implementation

The `validateNoPhysicsLibraries()` function checks package.json dependencies:

```typescript
import { validateNoPhysicsLibraries } from '@/lib/motion';

const packageJson = require('./package.json');
const isValid = validateNoPhysicsLibraries({
  ...packageJson.dependencies,
  ...packageJson.devDependencies
});
```

### Build-Time Validation

Run the validation script as part of your build process:

```bash
node lib/motion/validate-dependencies.js
```

Add to package.json scripts:

```json
{
  "scripts": {
    "validate:motion": "node lib/motion/validate-dependencies.js",
    "prebuild": "npm run validate:motion"
  }
}
```

### Forbidden Libraries

- matter-js
- cannon / cannon-es
- ammo.js
- physijs
- planck-js
- box2d
- rapier
- oimo

## 3. Texture Size Limits

### Rationale

Large textures can significantly impact performance:
- Increased memory usage
- Longer load times
- GPU memory constraints on mobile devices
- Potential for out-of-memory errors

### Implementation

The `validateTextureSize()` function checks texture file sizes:

```typescript
import { validateTextureSize } from '@/lib/motion';

// Validate a texture size
const size = 2 * 1024 * 1024; // 2MB
const isValid = validateTextureSize(size, 'hero-texture.jpg'); // Returns false (exceeds 1MB limit)
```

### Async Validation

For remote textures, use the async validator:

```typescript
import { validateTextureBeforeLoad } from '@/lib/motion';

// Validate before loading
const isValid = await validateTextureBeforeLoad('/textures/hero-bg.jpg');

if (isValid) {
  // Load the texture
  const texture = await loadTexture('/textures/hero-bg.jpg');
}
```

### Batch Validation

For multiple textures:

```typescript
import { TextureValidator } from '@/lib/motion';

const validator = new TextureValidator();
const results = await validator.validateMultiple([
  '/textures/hero-bg.jpg',
  '/textures/hero-overlay.png'
]);

// Or throw on validation failure
await validator.validateOrThrow([
  '/textures/hero-bg.jpg',
  '/textures/hero-overlay.png'
]);
```

### Size Limit

- **Maximum texture size**: 1MB (1,048,576 bytes)
- Applies to all image formats (JPG, PNG, WebP, etc.)
- Applies to 3D hero section and any other visual assets

### Optimization Tips

1. **Use WebP format**: Better compression than JPG/PNG
2. **Compress images**: Use tools like ImageOptim, TinyPNG
3. **Use appropriate dimensions**: Don't load 4K textures for small elements
4. **Consider lazy loading**: Load textures only when needed

## Integration with Validation System

All performance constraints are automatically checked by the main `validateAnimation()` function:

```typescript
import { validateAnimation } from '@/lib/motion';
import { defaultMotionConfig } from '@/lib/motion';

const options = {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 400
};

// Validates timing, transforms, easing, AND performance constraints
const isValid = validateAnimation(options, defaultMotionConfig);
```

## Enforcement

### Development

- Validation warnings logged to console
- TypeScript types prevent common mistakes
- ESLint rules can be added for additional enforcement

### Build Time

- Dependency validation script runs before build
- Fails build if physics libraries detected
- Can be integrated into CI/CD pipeline

### Runtime

- Animation validation runs before creating GSAP timelines
- Invalid animations are rejected with console warnings
- Texture validation runs before loading assets

## Testing

Performance constraints are tested in the test suite:

```bash
npm test -- lib/motion/performance-constraints.test.ts
```

## Summary

| Constraint | Requirement | Validation | Enforcement |
|------------|-------------|------------|-------------|
| No CSS Shadows | 15.2 | Runtime | `validateNoCssShadows()` |
| No Physics Libraries | 15.3 | Build-time | `validate-dependencies.js` |
| Texture Size Limits | 15.4 | Runtime | `validateTextureSize()` |

These constraints ensure the motion system remains performant, accessible, and production-ready across all devices and use cases.
