/**
 * Documentation Foundation
 *
 * This is the manual entry point for development.
 * During build, _entry.generated.js is created automatically.
 */

import Header from './components/Header/index.jsx'
import LeftPanel from './components/LeftPanel/index.jsx'
import DocSection from './components/DocSection/index.jsx'
import CodeBlock from './components/CodeBlock/index.jsx'
import Footer from './components/Footer/index.jsx'

const components = {
  Header,
  LeftPanel,
  DocSection,
  CodeBlock,
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

export { Header, LeftPanel, DocSection, CodeBlock, Footer }
export default { getComponent, listComponents, getSchema, getAllSchemas, components }
