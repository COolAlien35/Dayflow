/**
 * Dashboard Screen Animations
 * 
 * Animation definitions for admin and employee dashboard screens.
 * 
 * Requirements:
 * - 6.1: Page title scroll animation (y:20, opacity:0 → y:0, opacity:1)
 * - 6.2: Feature card stagger (y:30, opacity:0.9 → y:0, opacity:1, 120ms stagger)
 * - 6.3: Sidebar animation (x:-20, opacity:0 → x:0, opacity:1)
 */

import type { AnimationDefinition } from '../types';

/**
 * Page title scroll animation
 * Animates the page title when it enters the viewport
 */
export const dashboardPageTitleAnimation: AnimationDefinition = {
  id: 'dashboard-page-title',
  type: 'scroll',
  target: '.dashboard-page-title',
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  scrollTrigger: {
    trigger: '.dashboard-page-title',
    start: 'top 80%',
  },
};

/**
 * Feature cards stagger animation
 * Animates feature cards sequentially when they enter the viewport
 */
export const dashboardFeatureCardsAnimation: AnimationDefinition = {
  id: 'dashboard-feature-cards',
  type: 'scroll',
  target: '.dashboard-feature-card',
  from: { y: 30, opacity: 0.9 },
  to: { y: 0, opacity: 1 },
  stagger: 120,
  scrollTrigger: {
    trigger: '.dashboard-feature-card-grid',
    start: 'top 80%',
  },
};

/**
 * Sidebar mount animation
 * Animates the sidebar when the dashboard mounts
 */
export const dashboardSidebarAnimation: AnimationDefinition = {
  id: 'dashboard-sidebar',
  type: 'mount',
  target: '.dashboard-sidebar',
  from: { x: -20, opacity: 0 },
  to: { x: 0, opacity: 1 },
};

/**
 * Complete dashboard screen animations configuration
 */
export const dashboardAnimations = {
  pageTitle: dashboardPageTitleAnimation,
  featureCards: dashboardFeatureCardsAnimation,
  sidebar: dashboardSidebarAnimation,
};

/**
 * Animation options for easy consumption by components
 */
export const dashboardAnimationOptions = {
  pageTitle: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    start: 'top 80%',
  },
  featureCards: {
    from: { y: 30, opacity: 0.9 },
    to: { y: 0, opacity: 1 },
    stagger: 120,
    start: 'top 80%',
  },
  sidebar: {
    from: { x: -20, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
};
