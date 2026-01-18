/**
 * Academic Foundation
 *
 * Components designed for academic and research websites.
 * Each component has purpose-driven parameters rather than generic styling options.
 */

import ProfileHero from './components/ProfileHero/index.jsx'
import PublicationList from './components/PublicationList/index.jsx'
import ResearchAreas from './components/ResearchAreas/index.jsx'
import TeamGrid from './components/TeamGrid/index.jsx'
import Timeline from './components/Timeline/index.jsx'
import ContactCard from './components/ContactCard/index.jsx'
import Text from './components/Text/index.jsx'
import Section from './components/Section/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import Footer from './components/Footer/index.jsx'

const components = {
  ProfileHero,
  PublicationList,
  ResearchAreas,
  TeamGrid,
  Timeline,
  ContactCard,
  Text,
  Section,
  Navbar,
  Footer,
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

export {
  ProfileHero,
  PublicationList,
  ResearchAreas,
  TeamGrid,
  Timeline,
  ContactCard,
  Text,
  Section,
  Navbar,
  Footer,
}

export default { getComponent, listComponents, getSchema, getAllSchemas, components }
