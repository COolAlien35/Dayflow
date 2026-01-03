/**
 * Scroll Manager
 * 
 * Manages ScrollTrigger instances and scroll-based animation coordination.
 * 
 * Requirements:
 * - 16.1: Use GSAP ScrollTrigger library for scroll-based animations
 * - 16.4: Create separate ScrollTrigger instances for each major screen section
 * - 16.7: Clean up ScrollTrigger instances on component unmount
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollTriggerConfig } from './types';

/**
 * ScrollManager class
 * 
 * Manages the lifecycle of ScrollTrigger instances including:
 * - ScrollTrigger registration and tracking
 * - Cleanup and disposal
 * - Refresh on layout changes
 * - Error handling for missing DOM elements
 */
export class ScrollManager {
  private triggers: Map<string, ScrollTrigger>;

  /**
   * Creates a new ScrollManager instance
   */
  constructor() {
    this.triggers = new Map();
  }

  /**
   * Create a ScrollTrigger instance
   * 
   * Creates and registers a ScrollTrigger with error handling for missing DOM elements.
   * 
   * @param id - Unique identifier for the ScrollTrigger
   * @param element - Target element for the ScrollTrigger
   * @param options - ScrollTrigger configuration options
   * @returns The created ScrollTrigger instance, or null if creation failed
   * 
   * Requirements:
   * - 16.1: Use GSAP ScrollTrigger library
   * - 16.4: Create separate ScrollTrigger instances for each section
   * - Error handling for missing DOM elements
   */
  createTrigger(
    id: string,
    element: HTMLElement,
    options: ScrollTriggerConfig
  ): ScrollTrigger | null {
    try {
      // Validate element exists in DOM
      if (!element || !document.contains(element)) {
        console.warn(
          `[ScrollManager] Cannot create ScrollTrigger "${id}": element not found in DOM`
        );
        return null;
      }

      // Create ScrollTrigger instance
      const trigger = ScrollTrigger.create({
        ...options,
        trigger: element,
        // Add refresh callback to validate element is still in DOM
        onRefreshInit: () => {
          if (!document.contains(element)) {
            console.warn(
              `[ScrollManager] ScrollTrigger "${id}" element removed from DOM during refresh`
            );
            return false;
          }
        },
      });

      // Register the trigger
      this.triggers.set(id, trigger);

      return trigger;
    } catch (error) {
      console.error(
        `[ScrollManager] Failed to create ScrollTrigger "${id}":`,
        error
      );
      return null;
    }
  }

  /**
   * Remove a specific ScrollTrigger
   * 
   * Kills the ScrollTrigger and removes it from the registry.
   * 
   * @param id - Unique identifier of the ScrollTrigger to remove
   * 
   * Requirements:
   * - 16.7: Clean up ScrollTrigger instances on component unmount
   */
  removeTrigger(id: string): void {
    const trigger = this.triggers.get(id);

    if (trigger) {
      // Kill the ScrollTrigger to stop and cleanup
      trigger.kill();

      // Remove from registry
      this.triggers.delete(id);
    }
  }

  /**
   * Refresh all ScrollTrigger instances
   * 
   * Recalculates ScrollTrigger positions after layout changes.
   * Useful after window resize, content changes, or dynamic loading.
   * 
   * Requirements:
   * - 16.1: Proper ScrollTrigger management
   */
  refreshAll(): void {
    try {
      // Use ScrollTrigger's global refresh method
      ScrollTrigger.refresh();
    } catch (error) {
      console.error('[ScrollManager] Failed to refresh ScrollTriggers:', error);
    }
  }

  /**
   * Kill all ScrollTrigger instances
   * 
   * Stops and cleans up all ScrollTriggers in the registry.
   * Used for performance safeguards, accessibility, and navigation cleanup.
   * 
   * Requirements:
   * - 16.7: Clean up ScrollTrigger instances
   */
  killAll(): void {
    // Kill each ScrollTrigger
    this.triggers.forEach((trigger) => {
      trigger.kill();
    });

    // Clear the registry
    this.triggers.clear();
  }

  /**
   * Get the number of registered ScrollTriggers
   * 
   * @returns Number of active ScrollTriggers in the registry
   */
  getCount(): number {
    return this.triggers.size;
  }

  /**
   * Check if a ScrollTrigger is registered
   * 
   * @param id - Unique identifier of the ScrollTrigger
   * @returns true if the ScrollTrigger is registered, false otherwise
   */
  has(id: string): boolean {
    return this.triggers.has(id);
  }

  /**
   * Get a registered ScrollTrigger by ID
   * 
   * @param id - Unique identifier of the ScrollTrigger
   * @returns The ScrollTrigger if found, undefined otherwise
   */
  get(id: string): ScrollTrigger | undefined {
    return this.triggers.get(id);
  }

  /**
   * Get all registered ScrollTrigger IDs
   * 
   * @returns Array of all registered ScrollTrigger IDs
   */
  getIds(): string[] {
    return Array.from(this.triggers.keys());
  }
}
