/**
 * Payroll View Animations
 * 
 * Animation definitions for payroll management screens.
 * 
 * Requirements:
 * - 11.1: Page header animation (opacity:0 → opacity:1)
 * - 11.2: Note box animation (scale:0.97, opacity:0.9 → scale:1, opacity:1)
 * - 11.3: Explicitly exclude payroll table from animation
 * 
 * IMPORTANT: Payroll tables are NOT animated to ensure financial data
 * is immediately visible without waiting for animations. This prioritizes
 * data visibility over animation effects.
 */

import type { AnimationDefinition } from '../types';

/**
 * Page header scroll animation
 * Animates the page header with a simple fade-in when it enters the viewport
 */
export const payrollPageHeaderAnimation: AnimationDefinition = {
  id: 'payroll-page-header',
  type: 'scroll',
  target: '.payroll-page-header',
  from: { opacity: 0 },
  to: { opacity: 1 },
  scrollTrigger: {
    trigger: '.payroll-page-header',
    start: 'top 80%',
  },
};

/**
 * Note box scroll animation
 * Animates confidential notice boxes and info panels
 */
export const payrollNoteBoxAnimation: AnimationDefinition = {
  id: 'payroll-note-box',
  type: 'scroll',
  target: '.payroll-note-box',
  from: { scale: 0.97, opacity: 0.9 },
  to: { scale: 1, opacity: 1 },
  scrollTrigger: {
    trigger: '.payroll-note-box',
    start: 'top 80%',
  },
};

/**
 * Complete payroll screen animations configuration
 */
export const payrollAnimations = {
  pageHeader: payrollPageHeaderAnimation,
  noteBox: payrollNoteBoxAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const payrollAnimationOptions = {
  pageHeader: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    start: 'top 80%',
  },
  noteBox: {
    from: { scale: 0.97, opacity: 0.9 },
    to: { scale: 1, opacity: 1 },
    start: 'top 80%',
  },
};

/**
 * Elements that should NOT be animated:
 * - Payroll table (.payroll-table)
 * - Table rows and cells
 * - Salary amounts and numerical values
 * - Employee names and department information
 * - Status badges within the table
 * 
 * These elements should be immediately visible to ensure financial data
 * readability and to prioritize data visibility over animation effects.
 */
