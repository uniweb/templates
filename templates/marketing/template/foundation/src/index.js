/**
 * Marketing Foundation
 *
 * This is the manual entry point for development.
 * During build, _entry.generated.js is created automatically.
 */

import Hero from './components/Hero/index.jsx'
import Features from './components/Features/index.jsx'
import Pricing from './components/Pricing/index.jsx'
import Testimonials from './components/Testimonials/index.jsx'
import CTA from './components/CTA/index.jsx'
import Stats from './components/Stats/index.jsx'
import Gallery from './components/Gallery/index.jsx'
import Video from './components/Video/index.jsx'
import FAQ from './components/FAQ/index.jsx'
import Team from './components/Team/index.jsx'
import LogoCloud from './components/LogoCloud/index.jsx'

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
