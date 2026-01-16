/**
 * @uniweb/templates - Template processing engine and official templates
 *
 * Provides utilities for applying file-based templates with Handlebars
 * variable substitution and variant support.
 */

import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { copyTemplateDirectory, clearCache, registerVersions, getMissingVersions, clearMissingVersions } from './processor.js'
import {
  validateTemplate,
  listTemplates,
  satisfiesVersion,
  ValidationError,
  ErrorCodes
} from './validator.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.join(__dirname, '../templates')

/**
 * Get the path to the built-in templates directory
 */
export function getTemplatesDirectory() {
  return TEMPLATES_DIR
}

/**
 * Get a specific template by name from the built-in templates
 *
 * @param {string} name - Template name (e.g., 'marketing', 'docs')
 * @returns {string|null} Path to template directory, or null if not found
 */
export function getTemplatePath(name) {
  const templatePath = path.join(TEMPLATES_DIR, name)
  return templatePath
}

/**
 * List all available built-in templates
 *
 * @returns {Promise<Array<Object>>} List of template metadata
 */
export async function listBuiltinTemplates() {
  return listTemplates(TEMPLATES_DIR)
}

/**
 * Check if a built-in template exists
 *
 * @param {string} name - Template name
 * @returns {boolean}
 */
export function hasTemplate(name) {
  const templatePath = path.join(TEMPLATES_DIR, name)
  return existsSync(path.join(templatePath, 'template.json'))
}

/**
 * Apply a template to a target directory
 *
 * @param {string} templatePath - Path to the template root (contains template.json)
 * @param {string} targetPath - Destination directory for the scaffolded project
 * @param {Object} data - Template variables
 * @param {Object} options - Apply options
 * @param {string} options.variant - Template variant to use
 * @param {string} options.uniwebVersion - Current Uniweb version for compatibility check
 * @param {Function} options.onWarning - Warning callback
 * @param {Function} options.onProgress - Progress callback
 * @returns {Promise<Object>} Template metadata
 */
export async function applyTemplate(templatePath, targetPath, data = {}, options = {}) {
  const { uniwebVersion, variant, onWarning, onProgress } = options

  // Validate the template
  const metadata = await validateTemplate(templatePath, { uniwebVersion })

  // Register versions for the {{version}} helper
  if (data.versions) {
    registerVersions(data.versions)
  }

  // Apply default variables
  const templateData = {
    year: new Date().getFullYear(),
    ...data
  }

  // Copy template files
  await copyTemplateDirectory(
    metadata.templateDir,
    targetPath,
    templateData,
    { variant, onWarning, onProgress }
  )

  // Check for missing versions and warn
  const missingVersions = getMissingVersions()
  if (missingVersions.length > 0 && onWarning) {
    onWarning(`Missing version data for packages: ${missingVersions.join(', ')}. Using fallback version.`)
  }
  clearMissingVersions()

  return metadata
}

/**
 * Apply a built-in template by name
 *
 * @param {string} name - Template name (e.g., 'marketing')
 * @param {string} targetPath - Destination directory
 * @param {Object} data - Template variables
 * @param {Object} options - Apply options
 * @returns {Promise<Object>} Template metadata
 */
export async function applyBuiltinTemplate(name, targetPath, data = {}, options = {}) {
  const templatePath = getTemplatePath(name)
  return applyTemplate(templatePath, targetPath, data, options)
}

// Re-export utilities
export {
  copyTemplateDirectory,
  clearCache,
  registerVersions,
  getMissingVersions,
  clearMissingVersions,
  validateTemplate,
  listTemplates,
  satisfiesVersion,
  ValidationError,
  ErrorCodes
}
