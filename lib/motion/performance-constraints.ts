/**
 * Performance Constraints Validation
 * 
 * Validates that the motion system adheres to performance best practices:
 * - No CSS shadows in animated elements (Requirement 15.2)
 * - No physics libraries imported (Requirement 15.3)
 * - Texture sizes below threshold (Requirement 15.4)
 * 
 * These constraints ensure the motion system remains performant and doesn't
 * degrade user experience on lower-powered devices.
 */

import { AnimationOptions } from './validation';

/**
 * Performance constraint configuration
 */
export interface PerformanceConstraints {
  // Maximum texture size in bytes (for 3D hero section)
  maxTextureSize: number;
  
  // List of forbidden CSS properties in animations
  forbiddenAnimatedProperties: string[];
  
  // List of forbidden physics libraries
  forbiddenLibraries: string[];
}

/**
 * Default performance constraints
 */
export const defaultPerformanceConstraints: PerformanceConstraints = {
  // 1MB max texture size for 3D assets
  maxTextureSize: 1024 * 1024,
  
  // CSS properties that should not be animated for performance
  forbiddenAnimatedProperties: [
    'boxShadow',
    'box-shadow',
    'textShadow',
    'text-shadow',
    'filter',
    'backdrop-filter',
  ],
  
  // Physics libraries that should not be imported
  forbiddenLibraries: [
    'matter-js',
    'cannon',
    'cannon-es',
    'ammo.js',
    'physijs',
    'planck-js',
    'box2d',
    'rapier',
    'oimo',
  ],
};

/**
 * Validates that no CSS shadows are present in animation properties
 * 
 * Requirement 15.2: No CSS shadows in animated elements
 * 
 * @param options - Animation options to validate
 * @param constraints - Performance constraints configuration
 * @returns true if no forbidden properties are animated, false otherwise
 */
export function validateNoCssShadows(
  options: AnimationOptions,
  constraints: PerformanceConstraints = defaultPerformanceConstraints
): boolean {
  let isValid = true;
  
  // Check 'from' properties
  if (options.from) {
    for (const prop of constraints.forbiddenAnimatedProperties) {
      if (prop in options.from) {
        console.warn(
          `[Motion System] Performance violation: "${prop}" should not be animated. Use CSS transitions for shadows instead.`
        );
        isValid = false;
      }
    }
  }
  
  // Check 'to' properties
  if (options.to) {
    for (const prop of constraints.forbiddenAnimatedProperties) {
      if (prop in options.to) {
        console.warn(
          `[Motion System] Performance violation: "${prop}" should not be animated. Use CSS transitions for shadows instead.`
        );
        isValid = false;
      }
    }
  }
  
  return isValid;
}

/**
 * Validates that no physics libraries are imported in the project
 * 
 * Requirement 15.3: No physics simulations
 * 
 * This function checks the package.json dependencies to ensure no physics
 * libraries are installed. It should be run during build/lint time.
 * 
 * @param dependencies - Object containing package dependencies
 * @param constraints - Performance constraints configuration
 * @returns true if no physics libraries are found, false otherwise
 */
export function validateNoPhysicsLibraries(
  dependencies: Record<string, string>,
  constraints: PerformanceConstraints = defaultPerformanceConstraints
): boolean {
  let isValid = true;
  const foundLibraries: string[] = [];
  
  // Check all dependencies
  for (const dep of Object.keys(dependencies)) {
    const depLower = dep.toLowerCase();
    
    for (const forbidden of constraints.forbiddenLibraries) {
      if (depLower.includes(forbidden.toLowerCase())) {
        foundLibraries.push(dep);
        isValid = false;
      }
    }
  }
  
  if (!isValid) {
    console.error(
      `[Motion System] Performance violation: Physics libraries detected: ${foundLibraries.join(', ')}. ` +
      `Remove these dependencies to maintain performance standards.`
    );
  }
  
  return isValid;
}

/**
 * Validates that texture file sizes are below the threshold
 * 
 * Requirement 15.4: No large textures
 * 
 * This function checks texture file sizes to ensure they don't exceed
 * the maximum allowed size. Large textures can significantly impact
 * performance, especially on mobile devices.
 * 
 * @param textureSize - Size of the texture in bytes
 * @param textureName - Name of the texture file (for logging)
 * @param constraints - Performance constraints configuration
 * @returns true if texture size is within limits, false otherwise
 */
export function validateTextureSize(
  textureSize: number,
  textureName: string,
  constraints: PerformanceConstraints = defaultPerformanceConstraints
): boolean {
  if (textureSize > constraints.maxTextureSize) {
    const sizeMB = (textureSize / (1024 * 1024)).toFixed(2);
    const maxMB = (constraints.maxTextureSize / (1024 * 1024)).toFixed(2);
    
    console.error(
      `[Motion System] Performance violation: Texture "${textureName}" is ${sizeMB}MB, ` +
      `which exceeds the maximum allowed size of ${maxMB}MB. ` +
      `Compress or resize the texture to improve performance.`
    );
    
    return false;
  }
  
  return true;
}

/**
 * Comprehensive performance validation
 * 
 * Runs all performance constraint checks on animation options
 * 
 * @param options - Animation options to validate
 * @param constraints - Performance constraints configuration
 * @returns true if all performance constraints are met, false otherwise
 */
export function validatePerformanceConstraints(
  options: AnimationOptions,
  constraints: PerformanceConstraints = defaultPerformanceConstraints
): boolean {
  const noCssShadows = validateNoCssShadows(options, constraints);
  
  // Note: Physics library validation should be run separately during build time
  // Texture validation should be run when loading 3D assets
  
  return noCssShadows;
}
