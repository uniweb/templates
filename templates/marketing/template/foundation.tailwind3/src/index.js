/**
 * Marketing Foundation
 *
 * This is the manual entry point for development.
 * During build, _entry.generated.js is created automatically.
 */

import Hero from './sections/Hero/index.jsx'
import Features from './sections/Features/index.jsx'
import Pricing from './sections/Pricing/index.jsx'
import Testimonials from './sections/Testimonials/index.jsx'
import CTA from './sections/CTA/index.jsx'
import Stats from './sections/Stats/index.jsx'
import Gallery from './sections/Gallery/index.jsx'
import Video from './sections/Video/index.jsx'
import FAQ from './sections/FAQ/index.jsx'
import Team from './sections/Team/index.jsx'
import LogoCloud from './sections/LogoCloud/index.jsx'

const components = {
  Hero,
  Features,
  Pricing,
  Testimonials,
  CTA,
  Stats,
  Gallery,
  Video,
  FAQ,
  Team,
  LogoCloud,
}

export function getComponent(name) {
  return components[name]
}

export function listComponents() {
  return Object.keys(components)
}

export function getSchema(name) {
  return components[name]?.schema
}

export function getAllSchemas() {
  const schemas = {}
  for (const [name, component] of Object.entries(components)) {
    if (component.schema) schemas[name] = component.schema
  }
  return schemas
}

export { Hero, Features, Pricing, Testimonials, CTA, Stats, Gallery, Video, FAQ, Team, LogoCloud }
export default { getComponent, listComponents, getSchema, getAllSchemas, components }
