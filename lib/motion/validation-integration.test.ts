/**
 * Validation Integration Tests
 * 
 * Tests that validateAnimation correctly integrates all validation checks,
 * including performance constraints.
 */

import { validateAnimation } from './validation';
import { defaultMotionConfig } from './config';

describe('validateAnimation - Performance Constraints Integration', () => {
  it('should pass valid animations without performance violations', () => {
    const options = {
      duration: 400,
      easing: 'power2.out',
      from: { y: 20, opacity: 0.9 },
      to: { y: 0, opacity: 1 },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(true);
  });
  
  it('should fail when boxShadow is animated', () => {
    const options = {
      duration: 400,
      from: { y: 20, opacity: 0 },
      to: { y: 0, opacity: 1, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(false);
  });
  
  it('should fail when filter is animated', () => {
    const options = {
      duration: 400,
      from: { opacity: 0 },
      to: { opacity: 1, filter: 'blur(5px)' },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(false);
  });
  
  it('should fail for multiple violations including performance', () => {
    const options = {
      duration: 50, // Too short
      easing: 'bounce.out', // Forbidden
      from: { y: 60, opacity: 0.3 }, // Both exceed limits
      to: { scale: 1.2, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }, // Scale exceeds limit + shadow
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(false);
  });
  
  it('should pass complex animations without performance violations', () => {
    const options = {
      duration: 500,
      easing: 'power2.out',
      from: { x: -20, y: 20, scale: 0.95, opacity: 0.9 },
      to: { x: 0, y: 0, scale: 1, opacity: 1 },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(true);
  });
  
  it('should validate scroll animations correctly', () => {
    const options = {
      duration: 600,
      from: { y: 30, opacity: 0.85 },
      to: { y: 0, opacity: 1 },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(true);
  });
  
  it('should validate hover animations correctly', () => {
    const options = {
      duration: 200,
      to: { scale: 1.04 },
    };
    
    expect(validateAnimation(options, defaultMotionConfig)).toBe(true);
  });
});
