export default function Diagram() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background grid dots */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid)" />

      {/* Central hub */}
      <circle cx="200" cy="150" r="40" fill="var(--primary)" opacity="0.15" />
      <circle cx="200" cy="150" r="28" fill="var(--primary)" opacity="0.25" />
      <circle cx="200" cy="150" r="16" fill="var(--primary)" />

      {/* Connector lines */}
      <line x1="200" y1="150" x2="90" y2="80" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="150" x2="310" y2="80" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="150" x2="90" y2="220" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="150" x2="310" y2="220" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />

      {/* Node: top-left */}
      <rect x="50" y="50" width="80" height="60" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="62" y="64" width="24" height="4" rx="2" fill="var(--primary)" />
      <rect x="62" y="74" width="56" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="62" y="82" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="62" y="90" width="48" height="3" rx="1.5" fill="currentColor" opacity="0.1" />

      {/* Node: top-right */}
      <rect x="270" y="50" width="80" height="60" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <circle cx="294" cy="68" r="6" fill="var(--primary)" opacity="0.3" />
      <rect x="306" y="64" width="32" height="4" rx="2" fill="var(--primary)" />
      <rect x="282" y="78" width="56" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="282" y="86" width="44" height="3" rx="1.5" fill="currentColor" opacity="0.15" />

      {/* Node: bottom-left */}
      <rect x="50" y="190" width="80" height="60" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="62" y="204" width="16" height="16" rx="4" fill="var(--primary)" opacity="0.2" />
      <rect x="84" y="204" width="34" height="4" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="84" y="212" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="62" y="228" width="56" height="3" rx="1.5" fill="currentColor" opacity="0.1" />

      {/* Node: bottom-right */}
      <rect x="270" y="190" width="80" height="60" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="282" y="204" width="56" height="8" rx="4" fill="var(--primary)" opacity="0.15" />
      <rect x="282" y="204" width="32" height="8" rx="4" fill="var(--primary)" opacity="0.3" />
      <rect x="282" y="218" width="56" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="282" y="226" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.15" />

      {/* Pulse dots on connectors */}
      <circle cx="145" cy="115" r="4" fill="var(--primary)" opacity="0.6" />
      <circle cx="255" cy="115" r="4" fill="var(--primary)" opacity="0.6" />
      <circle cx="145" cy="185" r="4" fill="var(--primary)" opacity="0.6" />
      <circle cx="255" cy="185" r="4" fill="var(--primary)" opacity="0.6" />
    </svg>
  )
}
