/**
 * Performance Constraints Tests
 * 
 * Tests for performance safeguards in the motion system:
 * - No CSS shadows in animated elements (Requirement 15.2)
 * - No physics libraries imported (Requirement 15.3)
 * - Texture sizes below threshold (Requirement 15.4)
 */

import {
  validateNoCssShadows,
  validateNoPhysicsLibraries,
  validateTextureSize,
  validatePerformanceConstraints,
  defaultPerformanceConstraints,
} from './performance-constraints';

describe('Performance Constraints', () => {
  describe('validateNoCssShadows', () => {
    it('should pass when no shadow properties are animated', () => {
      const options = {
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1 },
      };
      
      expect(validateNoCssShadows(options)).toBe(true);
    });
    
    it('should fail when boxShadow is in "to" properties', () => {
      const options = {
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
      };
      
      expect(validateNoCssShadows(options)).toBe(false);
    });
    
    it('should fail when box-shadow is in "from" properties', () => {
      const options = {
        from: { y: 20, opacity: 0, 'box-shadow': '0 1px 3px rgba(0,0,0,0.1)' },
        to: { y: 0, opacity: 1 },
      };
      
      expect(validateNoCssShadows(options)).toBe(false);
    });
    
    it('should fail when textShadow is animated', () => {
      const options = {
        from: { opacity: 0 },
        to: { opacity: 1, textShadow: '0 2px 4px rgba(0,0,0,0.2)' },
      };
      
      expect(validateNoCssShadows(options)).toBe(false);
    });
    
    it('should fail when filter is animated', () => {
      const options = {
        from: { opacity: 0 },
        to: { opacity: 1, filter: 'blur(5px)' },
      };
      
      expect(validateNoCssShadows(options)).toBe(false);
    });
    
    it('should fail when backdrop-filter is animated', () => {
      const options = {
        from: { opacity: 0 },
        to: { opacity: 1, 'backdrop-filter': 'blur(10px)' },
      };
      
      expect(validateNoCssShadows(options)).toBe(false);
    });
  });
  
  describe('validateNoPhysicsLibraries', () => {
    it('should pass when no physics libraries are present', () => {
      const dependencies = {
        'react': '^19.0.0',
        'gsap': '^3.14.2',
        'next': '^16.0.0',
      };
      
      expect(validateNoPhysicsLibraries(dependencies)).toBe(true);
    });
    
    it('should fail when matter-js is present', () => {
      const dependencies = {
        'react': '^19.0.0',
        'matter-js': '^0.19.0',
      };
      
      expect(validateNoPhysicsLibraries(dependencies)).toBe(false);
    });
    
    it('should fail when cannon-es is present', () => {
      const dependencies = {
        'react': '^19.0.0',
        'cannon-es': '^0.20.0',
      };
      
      expect(validateNoPhysicsLibraries(dependencies)).toBe(false);
    });
    
    it('should fail when multiple physics libraries are present', () => {
      const dependencies = {
        'react': '^19.0.0',
        'matter-js': '^0.19.0',
        'cannon': '^0.6.2',
      };
      
      expect(validateNoPhysicsLibraries(dependencies)).toBe(false);
    });
    
    it('should be case-insensitive', () => {
      const dependencies = {
        'react': '^19.0.0',
        'Matter-JS': '^0.19.0',
      };
      
      expect(validateNoPhysicsLibraries(dependencies)).toBe(false);
    });
  });
  
  describe('validateTextureSize', () => {
    it('should pass when texture is below threshold', () => {
      const size = 500 * 1024; // 500KB
      expect(validateTextureSize(size, 'test.jpg')).toBe(true);
    });
    
    it('should pass when texture is exactly at threshold', () => {
      const size = defaultPerformanceConstraints.maxTextureSize;
      expect(validateTextureSize(size, 'test.jpg')).toBe(true);
    });
    
    it('should fail when texture exceeds threshold', () => {
      const size = 2 * 1024 * 1024; // 2MB
      expect(validateTextureSize(size, 'test.jpg')).toBe(false);
    });
    
    it('should fail when texture is significantly over threshold', () => {
      const size = 10 * 1024 * 1024; // 10MB
      expect(validateTextureSize(size, 'large-texture.png')).toBe(false);
    });
    
    it('should accept custom threshold', () => {
      const size = 2 * 1024 * 1024; // 2MB
      const customConstraints = {
        ...defaultPerformanceConstraints,
        maxTextureSize: 3 * 1024 * 1024, // 3MB
      };
      
      expect(validateTextureSize(size, 'test.jpg', customConstraints)).toBe(true);
    });
  });
  
  describe('validatePerformanceConstraints', () => {
    it('should pass when all constraints are met', () => {
      const options = {
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1 },
        duration: 400,
      };
      
      expect(validatePerformanceConstraints(options)).toBe(true);
    });
    
    it('should fail when CSS shadows are animated', () => {
      const options = {
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
      };
      
      expect(validatePerformanceConstraints(options)).toBe(false);
    });
    
    it('should validate complex animations', () => {
      const options = {
        from: { x: -20, y: 20, scale: 0.95, opacity: 0 },
        to: { x: 0, y: 0, scale: 1, opacity: 1 },
        duration: 500,
        easing: 'power2.out',
      };
      
      expect(validatePerformanceConstraints(options)).toBe(true);
    });
  });
  
  describe('defaultPerformanceConstraints', () => {
    it('should have correct max texture size', () => {
      expect(defaultPerformanceConstraints.maxTextureSize).toBe(1024 * 1024); // 1MB
    });
    
    it('should include all forbidden animated properties', () => {
      const forbidden = defaultPerformanceConstraints.forbiddenAnimatedProperties;
      expect(forbidden).toContain('boxShadow');
      expect(forbidden).toContain('box-shadow');
      expect(forbidden).toContain('textShadow');
      expect(forbidden).toContain('text-shadow');
      expect(forbidden).toContain('filter');
      expect(forbidden).toContain('backdrop-filter');
    });
    
    it('should include all forbidden physics libraries', () => {
      const forbidden = defaultPerformanceConstraints.forbiddenLibraries;
      expect(forbidden).toContain('matter-js');
      expect(forbidden).toContain('cannon');
      expect(forbidden).toContain('cannon-es');
      expect(forbidden).toContain('ammo.js');
      expect(forbidden).toContain('physijs');
    });
  });
});
