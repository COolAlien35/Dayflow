"use client"

/**
 * NoteBlock Component
 * 
 * A reusable component for displaying note blocks, info panels, and alert boxes
 * with consistent animations across the application.
 * 
 * Requirements:
 * - 12.1: Note block animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
 * - 12.2: Note block animation consistency across all pages
 * - 12.3: Hover effect (increase box-shadow depth)
 * 
 * Usage:
 * ```tsx
 * <NoteBlock variant="info" icon={<InfoIcon />}>
 *   <NoteBlockTitle>Important Information</NoteBlockTitle>
 *   <NoteBlockDescription>
 *     This is some important information that users should know.
 *   </NoteBlockDescription>
 * </NoteBlock>
 * ```
 */

import { useRef, forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/motion/hooks';
import { globalNoteAnimationOptions } from '@/lib/motion/animations/globalNoteAnimations';

const noteBlockVariants = cva(
  'note-block flex items-start gap-3 rounded-xl border p-4 transition-shadow duration-200',
  {
    variants: {
      variant: {
        default: 'border-border/50 bg-muted/30',
        info: 'border-sky-200/50 bg-gradient-to-r from-sky-50 to-sky-50/50',
        warning: 'border-amber-200/50 bg-gradient-to-r from-amber-50 to-amber-50/50',
        success: 'border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-emerald-50/50',
        error: 'border-rose-200/50 bg-gradient-to-r from-rose-50 to-rose-50/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const noteBlockIconVariants = cva(
  'rounded-lg p-2',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        info: 'bg-sky-100',
        warning: 'bg-amber-100',
        success: 'bg-emerald-100',
        error: 'bg-rose-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NoteBlockProps extends VariantProps<typeof noteBlockVariants> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  disableAnimation?: boolean;
}

/**
 * Main NoteBlock component
 * 
 * Displays a note block with optional icon and consistent animations.
 * The component automatically applies scroll-triggered animations and hover effects.
 */
export const NoteBlock = forwardRef<HTMLDivElement, NoteBlockProps>(
  ({ children, icon, variant, className, iconClassName, disableAnimation = false }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

    // Apply scroll animation unless disabled
    if (!disableAnimation) {
      useScrollAnimation(ref, globalNoteAnimationOptions.noteBlock);
    }

    return (
      <div
        ref={ref}
        className={cn(
          noteBlockVariants({ variant }),
          // Hover effect: increase box-shadow depth
          'hover:shadow-md',
          className
        )}
      >
        {icon && (
          <div className={cn(noteBlockIconVariants({ variant }), iconClassName)}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

NoteBlock.displayName = 'NoteBlock';

/**
 * NoteBlockTitle component
 * 
 * Displays the title/heading of a note block.
 */
export interface NoteBlockTitleProps {
  children: ReactNode;
  className?: string;
}

export function NoteBlockTitle({ children, className }: NoteBlockTitleProps) {
  return (
    <p className={cn('text-sm font-medium', className)}>
      {children}
    </p>
  );
}

/**
 * NoteBlockDescription component
 * 
 * Displays the description/body text of a note block.
 */
export interface NoteBlockDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function NoteBlockDescription({ children, className }: NoteBlockDescriptionProps) {
  return (
    <p className={cn('text-sm', className)}>
      {children}
    </p>
  );
}

/**
 * Variant-specific text color classes for titles and descriptions
 * 
 * Usage:
 * ```tsx
 * <NoteBlock variant="warning">
 *   <NoteBlockTitle className={noteBlockTextColors.warning.title}>
 *     Warning Title
 *   </NoteBlockTitle>
 *   <NoteBlockDescription className={noteBlockTextColors.warning.description}>
 *     Warning description text
 *   </NoteBlockDescription>
 * </NoteBlock>
 * ```
 */
export const noteBlockTextColors = {
  default: {
    title: 'text-foreground',
    description: 'text-muted-foreground',
  },
  info: {
    title: 'text-sky-800',
    description: 'text-sky-700/80',
  },
  warning: {
    title: 'text-amber-800',
    description: 'text-amber-700/80',
  },
  success: {
    title: 'text-emerald-800',
    description: 'text-emerald-700/80',
  },
  error: {
    title: 'text-rose-800',
    description: 'text-rose-700/80',
  },
};

