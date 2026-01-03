#!/usr/bin/env node

/**
 * Build-time validation script for motion system dependencies
 * 
 * This script validates that no physics libraries are installed in the project.
 * It should be run as part of the build process or as a pre-commit hook.
 * 
 * Requirement 15.3: No physics simulations
 * 
 * Usage:
 *   node lib/motion/validate-dependencies.js
 * 
 * Exit codes:
 *   0 - All validations passed
 *   1 - Physics libraries detected
 */

const fs = require('fs');
const path = require('path');

// Forbidden physics libraries
const FORBIDDEN_LIBRARIES = [
  'matter-js',
  'cannon',
  'cannon-es',
  'ammo.js',
  'physijs',
  'planck-js',
  'box2d',
  'rapier',
  'oimo',
];

/**
 * Validates that no physics libraries are present in package.json
 */
function validateNoPhysicsLibraries() {
  console.log('[Motion System] Validating dependencies...');
  
  // Read package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('[Motion System] Error: package.json not found');
    process.exit(1);
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Combine all dependencies
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
    ...packageJson.optionalDependencies,
  };
  
  // Check for forbidden libraries
  const foundLibraries = [];
  
  for (const dep of Object.keys(allDependencies)) {
    const depLower = dep.toLowerCase();
    
    for (const forbidden of FORBIDDEN_LIBRARIES) {
      if (depLower.includes(forbidden.toLowerCase())) {
        foundLibraries.push(dep);
      }
    }
  }
  
  // Report results
  if (foundLibraries.length > 0) {
    console.error(
      '\n❌ [Motion System] Performance violation detected!\n' +
      '\nPhysics libraries found in dependencies:\n' +
      foundLibraries.map(lib => `  - ${lib}`).join('\n') +
      '\n\nThese libraries violate Requirement 15.3 (No physics simulations).\n' +
      'Remove these dependencies to maintain performance standards.\n'
    );
    process.exit(1);
  }
  
  console.log('✅ [Motion System] No physics libraries detected');
  console.log('✅ [Motion System] All dependency validations passed\n');
  process.exit(0);
}

// Run validation
validateNoPhysicsLibraries();
