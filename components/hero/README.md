# 3D Hero Section

This directory contains the optional 3D hero section component for the Dayflow HRMS landing page.

## Overview

The 3D hero section creates an engaging visual experience using CSS 3D transforms synchronized with scroll progress via GSAP ScrollTrigger. The implementation follows all motion system constraints and is restricted to the landing page only.

## Requirements Satisfied

- **13.1**: Enable 3D effects only on landing page (/)
- **13.2**: Camera Z animation (6 → 3.5)
- **13.3**: Camera Y animation (0 → -0.4)
- **13.4**: Object separation on X axis
- **13.5**: Object rotation (15 degrees on Y axis)
- **13.6**: Synchronize 3D camera motion with scroll progress
- **13.7**: Use single canvas element maximum

## Components

### `Hero3D`

Main 3D hero section component that creates the 3D scene and manages animations.

**Props:**
- `className?: string` - Additional CSS classes
- `children?: React.ReactNode` - Content to display over the 3D scene

**Features:**
- Only renders on landing page (/)
- Respects motion system settings (reduced motion, device type)
- Automatically registers/unregisters animations with motion system
- Disables on mobile devices (per device adapter)
- Uses CSS 3D transforms (no Three.js required)

### `Hero3DContent`

Content wrapper component for hero section content that sits above the 3D scene.

**Props:**
- `className?: string` - Additional CSS classes
- `children: React.ReactNode` - Content to display

## Implementation Details

### CSS 3D Transforms

The implementation uses CSS 3D transforms instead of Three.js for several reasons:
1. **Performance**: No additional library overhead
2. **Simplicity**: Easier to maintain and debug
3. **Compliance**: Aligns with motion system's "no physics libraries" constraint
4. **Accessibility**: Easier to disable for reduced motion

### Animation Structure

1. **Camera Animation**: 
   - Animates the camera container's Z and Y position
   - Synchronized with scroll progress using `scrub: true`
   - Creates zoom-in effect as user scrolls

2. **Object Animations**:
   - Three abstract plane objects with gradient backgrounds
   - Alternate left/right separation on X axis
   - 15-degree rotation on Y axis
   - All synchronized with scroll progress

### Scroll Synchronization

All animations use `scrub: true` in ScrollTrigger configuration, which:
- Links animation progress directly to scroll position
- Makes animations bidirectional (scroll up reverses)
- Uses linear easing (`ease: 'none'`) for smooth scroll-linked motion

## Usage

### Basic Usage

```tsx
import { Hero3D, Hero3DContent } from '@/components/hero/hero-3d';

export default function LandingPage() {
  return (
    <Hero3D>
      <Hero3DContent>
        <h1>Welcome to Dayflow HRMS</h1>
        <p>Modern HR management</p>
      </Hero3DContent>
    </Hero3D>
  );
}
```

### With Custom Styling

```tsx
<Hero3D className="bg-gradient-to-b from-blue-50 to-white">
  <Hero3DContent className="max-w-4xl">
    {/* Your content */}
  </Hero3DContent>
</Hero3D>
```

## Configuration

The 3D hero configuration is defined in `lib/motion/animations/heroAnimations.ts`:

```typescript
export const heroConfig = {
  // Restrict to landing page only
  enabledPages: ['/'],
  
  // Camera settings
  camera: {
    initialZ: 6,
    finalZ: 3.5,
    initialY: 0,
    finalY: -0.4,
  },
  
  // Object settings
  objects: {
    rotationY: 15,
    separationMultiplier: 1.5,
  },
  
  // Canvas settings
  canvas: {
    maxCount: 1, // Single canvas element maximum
  },
};
```

## Accessibility

The 3D hero section fully respects accessibility preferences:

- **Reduced Motion**: When `prefers-reduced-motion` is enabled, the 3D hero doesn't render
- **Device Adaptation**: Automatically disabled on mobile devices
- **Performance**: Respects FPS threshold and disables if performance degrades

## Performance Considerations

1. **No Canvas Element**: Uses CSS 3D transforms instead of canvas/WebGL
2. **Minimal DOM**: Only 3 animated objects
3. **GPU Acceleration**: CSS transforms are GPU-accelerated
4. **Scroll-Linked**: No requestAnimationFrame loops, driven by scroll events
5. **Conditional Rendering**: Only renders on landing page

## Browser Support

The 3D hero section requires:
- CSS 3D transforms support
- GSAP ScrollTrigger support
- Modern browser with GPU acceleration

Gracefully degrades on unsupported browsers by not rendering the 3D effects.

## Example

See `app/landing-example/page.tsx` for a complete example implementation.

## Notes

- The 3D hero is **optional** and can be omitted if not needed
- Only one instance should exist per page (enforced by landing page restriction)
- All animations respect global motion system constraints
- Performance monitoring will disable the hero if FPS drops below threshold
