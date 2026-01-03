# NoteBlock Component

A reusable component for displaying note blocks, info panels, and alert boxes with consistent animations across the Dayflow HRMS application.

## Features

- **Consistent Animations**: Automatically applies scroll-triggered animations (scale: 0.98 → 1, opacity: 0.9 → 1)
- **Hover Effects**: Increases box-shadow depth on hover for interactive feedback
- **Multiple Variants**: Supports default, info, warning, success, and error styles
- **Flexible Content**: Supports icons, titles, and descriptions
- **Accessibility**: Respects reduced motion preferences through the motion system

## Requirements

Validates:
- **Requirement 12.1**: Note block animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
- **Requirement 12.2**: Note block animation consistency across all pages
- **Requirement 12.3**: Hover effect (increase box-shadow depth)

## Basic Usage

```tsx
import { NoteBlock, NoteBlockTitle, NoteBlockDescription, noteBlockTextColors } from '@/components/layout/note-block';
import { Shield } from 'lucide-react';

<NoteBlock variant="warning" icon={<Shield className="h-5 w-5 text-amber-600" />}>
  <NoteBlockTitle className={noteBlockTextColors.warning.title}>
    Important Notice
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.warning.description}>
    This is an important message that users should be aware of.
  </NoteBlockDescription>
</NoteBlock>
```

## Variants

### Default
```tsx
<NoteBlock variant="default">
  <NoteBlockTitle>Default Note</NoteBlockTitle>
  <NoteBlockDescription>Standard note block with neutral styling.</NoteBlockDescription>
</NoteBlock>
```

### Info (Blue)
```tsx
<NoteBlock variant="info" icon={<Info className="h-5 w-5 text-sky-600" />}>
  <NoteBlockTitle className={noteBlockTextColors.info.title}>
    Information
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.info.description}>
    Helpful information for users.
  </NoteBlockDescription>
</NoteBlock>
```

### Warning (Amber)
```tsx
<NoteBlock variant="warning" icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}>
  <NoteBlockTitle className={noteBlockTextColors.warning.title}>
    Warning
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.warning.description}>
    Important warning that requires attention.
  </NoteBlockDescription>
</NoteBlock>
```

### Success (Green)
```tsx
<NoteBlock variant="success" icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}>
  <NoteBlockTitle className={noteBlockTextColors.success.title}>
    Success
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.success.description}>
    Operation completed successfully.
  </NoteBlockDescription>
</NoteBlock>
```

### Error (Red)
```tsx
<NoteBlock variant="error" icon={<XCircle className="h-5 w-5 text-rose-600" />}>
  <NoteBlockTitle className={noteBlockTextColors.error.title}>
    Error
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.error.description}>
    An error occurred that needs to be addressed.
  </NoteBlockDescription>
</NoteBlock>
```

## Without Icon

```tsx
<NoteBlock variant="info">
  <NoteBlockTitle className={noteBlockTextColors.info.title}>
    Simple Note
  </NoteBlockTitle>
  <NoteBlockDescription className={noteBlockTextColors.info.description}>
    Note blocks work great without icons too.
  </NoteBlockDescription>
</NoteBlock>
```

## Disabling Animation

For cases where you want to control animation manually (e.g., using Framer Motion):

```tsx
<motion.div
  initial={{ opacity: 0, x: -16 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.1 }}
>
  <NoteBlock variant="warning" disableAnimation={true}>
    <NoteBlockTitle>Custom Animation</NoteBlockTitle>
    <NoteBlockDescription>
      This note block has its own animation controlled by Framer Motion.
    </NoteBlockDescription>
  </NoteBlock>
</motion.div>
```

## Custom Styling

You can add custom classes to override or extend the default styling:

```tsx
<NoteBlock 
  variant="info" 
  className="my-custom-class"
  iconClassName="custom-icon-wrapper"
>
  <NoteBlockTitle>Custom Styled Note</NoteBlockTitle>
  <NoteBlockDescription>
    With additional custom styling applied.
  </NoteBlockDescription>
</NoteBlock>
```

## Text Color Helpers

The `noteBlockTextColors` object provides consistent text colors for each variant:

```tsx
import { noteBlockTextColors } from '@/components/layout/note-block';

// Available colors:
noteBlockTextColors.default.title      // text-foreground
noteBlockTextColors.default.description // text-muted-foreground
noteBlockTextColors.info.title         // text-sky-800
noteBlockTextColors.info.description   // text-sky-700/80
noteBlockTextColors.warning.title      // text-amber-800
noteBlockTextColors.warning.description // text-amber-700/80
noteBlockTextColors.success.title      // text-emerald-800
noteBlockTextColors.success.description // text-emerald-700/80
noteBlockTextColors.error.title        // text-rose-800
noteBlockTextColors.error.description  // text-rose-700/80
```

## Integration with Motion System

The NoteBlock component automatically integrates with the Dayflow HRMS Motion System:

- **Scroll Animation**: Animates when entering viewport (scale: 0.98 → 1, opacity: 0.9 → 1)
- **Hover Effect**: Increases box-shadow depth on hover (shadow-sm → shadow-md)
- **Reduced Motion**: Respects user's `prefers-reduced-motion` setting
- **Device Adaptation**: Scales animations based on device type (desktop/tablet/mobile)

## Examples in the Codebase

See these files for real-world usage examples:

- `app/employee/payroll/page.tsx` - Confidential information notice
- `app/admin/payroll/page.tsx` - Audit logging notice
- `app/admin/dashboard/page.tsx` - System alerts

## Props Reference

### NoteBlock

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'warning' \| 'success' \| 'error'` | `'default'` | Visual style variant |
| `icon` | `ReactNode` | `undefined` | Optional icon to display |
| `className` | `string` | `undefined` | Additional CSS classes |
| `iconClassName` | `string` | `undefined` | Additional CSS classes for icon wrapper |
| `disableAnimation` | `boolean` | `false` | Disable automatic scroll animation |
| `children` | `ReactNode` | Required | Content to display |

### NoteBlockTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | Required | Title text |

### NoteBlockDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | Required | Description text |

