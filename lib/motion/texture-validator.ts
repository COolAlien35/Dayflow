/**
 * Texture Size Validation Utility
 * 
 * Provides utilities for validating texture file sizes before loading them
 * into the 3D hero section or other visual elements.
 * 
 * Requirement 15.4: No large textures
 * 
 * Usage:
 * ```typescript
 * import { validateTextureBeforeLoad, TextureValidator } from './texture-validator';
 * 
 * // Validate a texture file
 * const isValid = await validateTextureBeforeLoad('/path/to/texture.jpg');
 * 
 * // Or use the class for batch validation
 * const validator = new TextureValidator();
 * const results = await validator.validateMultiple([
 *   '/path/to/texture1.jpg',
 *   '/path/to/texture2.png'
 * ]);
 * ```
 */

import { validateTextureSize, defaultPerformanceConstraints } from './performance-constraints';

/**
 * Texture validation result
 */
export interface TextureValidationResult {
  path: string;
  size: number;
  valid: boolean;
  error?: string;
}

/**
 * Validates a texture file size before loading
 * 
 * @param texturePath - Path or URL to the texture file
 * @returns Promise resolving to true if valid, false otherwise
 */
export async function validateTextureBeforeLoad(texturePath: string): Promise<boolean> {
  try {
    // Fetch the texture to get its size
    const response = await fetch(texturePath, { method: 'HEAD' });
    
    if (!response.ok) {
      console.error(`[Motion System] Failed to fetch texture: ${texturePath}`);
      return false;
    }
    
    const contentLength = response.headers.get('content-length');
    
    if (!contentLength) {
      console.warn(
        `[Motion System] Could not determine size of texture: ${texturePath}. ` +
        `Proceeding with caution.`
      );
      return true; // Allow if we can't determine size
    }
    
    const size = parseInt(contentLength, 10);
    const fileName = texturePath.split('/').pop() || texturePath;
    
    return validateTextureSize(size, fileName);
  } catch (error) {
    console.error(`[Motion System] Error validating texture: ${texturePath}`, error);
    return false;
  }
}

/**
 * Texture validator class for batch validation
 */
export class TextureValidator {
  private maxSize: number;
  
  constructor(maxSize?: number) {
    this.maxSize = maxSize || defaultPerformanceConstraints.maxTextureSize;
  }
  
  /**
   * Validates a single texture
   */
  async validate(texturePath: string): Promise<TextureValidationResult> {
    try {
      const response = await fetch(texturePath, { method: 'HEAD' });
      
      if (!response.ok) {
        return {
          path: texturePath,
          size: 0,
          valid: false,
          error: `Failed to fetch texture (HTTP ${response.status})`,
        };
      }
      
      const contentLength = response.headers.get('content-length');
      
      if (!contentLength) {
        return {
          path: texturePath,
          size: 0,
          valid: true, // Allow if we can't determine size
          error: 'Could not determine texture size',
        };
      }
      
      const size = parseInt(contentLength, 10);
      const fileName = texturePath.split('/').pop() || texturePath;
      const valid = validateTextureSize(size, fileName, {
        ...defaultPerformanceConstraints,
        maxTextureSize: this.maxSize,
      });
      
      return {
        path: texturePath,
        size,
        valid,
        error: valid ? undefined : `Texture exceeds maximum size of ${this.maxSize} bytes`,
      };
    } catch (error) {
      return {
        path: texturePath,
        size: 0,
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Validates multiple textures
   */
  async validateMultiple(texturePaths: string[]): Promise<TextureValidationResult[]> {
    const results = await Promise.all(
      texturePaths.map(path => this.validate(path))
    );
    
    // Log summary
    const invalid = results.filter(r => !r.valid);
    
    if (invalid.length > 0) {
      console.error(
        `[Motion System] ${invalid.length} texture(s) failed validation:\n` +
        invalid.map(r => `  - ${r.path}: ${r.error}`).join('\n')
      );
    } else {
      console.log(`[Motion System] All ${results.length} texture(s) validated successfully`);
    }
    
    return results;
  }
  
  /**
   * Validates textures and throws if any are invalid
   */
  async validateOrThrow(texturePaths: string[]): Promise<void> {
    const results = await this.validateMultiple(texturePaths);
    const invalid = results.filter(r => !r.valid);
    
    if (invalid.length > 0) {
      throw new Error(
        `Texture validation failed for ${invalid.length} file(s): ` +
        invalid.map(r => r.path).join(', ')
      );
    }
  }
}

/**
 * Helper function to get file size from a File object
 * Useful for validating user-uploaded textures
 */
export function validateTextureFile(file: File): boolean {
  return validateTextureSize(file.size, file.name);
}
