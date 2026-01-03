/**
 * Attendance View Animations
 * 
 * Animation definitions for attendance management screens.
 * 
 * Requirements:
 * - 8.1: Page header animation (y:20, opacity:0 → y:0, opacity:1)
 * - 8.2: Filters animation (x:20, opacity:0 → x:0, opacity:1)
 * - 8.3: Status chips animation (opacity:0 → opacity:1)
 * - 8.4: Explicitly exclude table rows, cells, and numerical values from animation
 * 
 * IMPORTANT: Table rows, table cells, and numerical values are NOT animated
 * to ensure data is immediately readable without waiting for animations.
 */

import type { AnimationDefinition } from '../types';

/**
 * Page header scroll animation
 * Animates the page header when it enters the viewport
 */
export const attendancePageHeaderAnimation: AnimationDefinition = {
  id: 'attendance-page-header',
  type: 'scroll',
  target: '.attendance-page-header',
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  scrollTrigger: {
    trigger: '.attendance-page-header',
    start: 'top 80%',
  },
};

/**
 * Filters mount animation
 * Animates the filter controls when they appear
 */
export const attendanceFiltersAnimation: AnimationDefinition = {
  id: 'attendance-filters',
  type: 'mount',
  target: '.attendance-filters',
  from: { x: 20, opacity: 0 },
  to: { x: 0, opacity: 1 },
};

/**
 * Status chips mount animation
 * Animates status chips/badges when they appear
 */
export const attendanceStatusChipsAnimation: AnimationDefinition = {
  id: 'attendance-status-chips',
  type: 'mount',
  target: '.attendance-status-chips',
  from: { opacity: 0 },
  to: { opacity: 1 },
};

/**
 * Complete attendance screen animations configuration
 */
export const attendanceAnimations = {
  pageHeader: attendancePageHeaderAnimation,
  filters: attendanceFiltersAnimation,
  statusChips: attendanceStatusChipsAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const attendanceAnimationOptions = {
  pageHeader: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    start: 'top 80%',
  },
  filters: {
    from: { x: 20, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  statusChips: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

/**
 * Elements that should NOT be animated:
 * - Table rows (.attendance-table-row)
 * - Table cells (.attendance-table-cell)
 * - Numerical values (check-in times, check-out times, work hours)
 * - Employee names and department text
 * 
 * These elements should be immediately visible to ensure data readability.
 */

