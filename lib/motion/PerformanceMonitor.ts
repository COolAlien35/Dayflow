/**
 * Performance Monitor
 * 
 * Tracks FPS (frames per second) using requestAnimationFrame and triggers
 * a callback when performance drops below a specified threshold.
 * 
 * Requirements:
 * - 15.5: Monitor frame rate and maintain minimum 50 FPS threshold
 * - 15.6: Disable motion system when FPS drops below threshold
 */

export class PerformanceMonitor {
  private frameCount: number = 0;
  private lastTime: number = 0;
  private fpsHistory: number[] = [];
  private rafId: number | null = null;
  private threshold: number;
  private onThresholdBreached: () => void;
  private isRunning: boolean = false;

  /**
   * Create a new PerformanceMonitor
   * 
   * @param threshold - Minimum FPS threshold (default: 50)
   * @param onThresholdBreached - Callback to invoke when FPS drops below threshold
   */
  constructor(threshold: number = 50, onThresholdBreached: () => void) {
    this.threshold = threshold;
    this.onThresholdBreached = onThresholdBreached;
  }

  /**
   * Start monitoring FPS
   * 
   * Uses requestAnimationFrame to track frame rate and maintains
   * a rolling average of the last 60 FPS measurements.
   */
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.fpsHistory = [];

    const measure = () => {
      if (!this.isRunning) {
        return;
      }

      const currentTime = performance.now();
      const delta = currentTime - this.lastTime;

      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / delta);
        this.fpsHistory.push(fps);

        // Keep only last 60 measurements (rolling window)
        if (this.fpsHistory.length > 60) {
          this.fpsHistory.shift();
        }

        // Check if average FPS over last 10 frames is below threshold
        if (this.fpsHistory.length >= 10) {
          const avgFps = this.getAverageFPS(10);
          if (avgFps < this.threshold) {
            this.onThresholdBreached();
          }
        }

        // Reset counters
        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      this.frameCount++;
      this.rafId = requestAnimationFrame(measure);
    };

    this.rafId = requestAnimationFrame(measure);
  }

  /**
   * Stop monitoring FPS
   */
  stop(): void {
    this.isRunning = false;
    
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Get current FPS (most recent measurement)
   * 
   * @returns Current FPS or 0 if no measurements yet
   */
  getCurrentFPS(): number {
    return this.fpsHistory.length > 0 
      ? this.fpsHistory[this.fpsHistory.length - 1] 
      : 0;
  }

  /**
   * Calculate average FPS over the last N frames
   * 
   * @param frames - Number of recent frames to average (default: 10)
   * @returns Average FPS over the specified number of frames
   */
  getAverageFPS(frames: number = 10): number {
    if (this.fpsHistory.length === 0) {
      return 0;
    }

    const recentFrames = this.fpsHistory.slice(-frames);
    const sum = recentFrames.reduce((acc, fps) => acc + fps, 0);
    return sum / recentFrames.length;
  }

  /**
   * Check if performance is acceptable based on threshold
   * 
   * @returns True if average FPS is above threshold
   */
  isPerformanceAcceptable(): boolean {
    if (this.fpsHistory.length < 10) {
      // Not enough data yet, assume acceptable
      return true;
    }

    return this.getAverageFPS(10) >= this.threshold;
  }

  /**
   * Get the full FPS history
   * 
   * @returns Array of FPS measurements
   */
  getFPSHistory(): number[] {
    return [...this.fpsHistory];
  }

  /**
   * Clear FPS history
   */
  clearHistory(): void {
    this.fpsHistory = [];
  }
}
