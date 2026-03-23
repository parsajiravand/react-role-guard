import { useState } from 'react';
import { RoleGuardProvider } from 'advanced-react-role-guard';
import { PlaygroundDashboard } from './demos/PlaygroundDashboard';
import { PRESETS, type PresetKey } from './demos/presets';

export function App() {
  const [preset, setPreset] = useState<PresetKey>('admin');
  const { user, config, label } = PRESETS[preset];

  return (
    <div className="layout">
      <header className="top">
        <div>
          <h1>advanced-react-role-guard</h1>
          <p className="muted">
            Interactive playground — uses the published package{' '}
            <code>advanced-react-role-guard</code> from npm.
          </p>
          <nav className="nav-links" aria-label="External links">
            <a
              href="https://advanced-react-role-guard-doc.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <span className="nav-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="https://github.com/parsajiravand/react-role-guard"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="nav-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="https://www.npmjs.com/package/advanced-react-role-guard"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </nav>
        </div>
        <label className="preset">
          Preset
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value as PresetKey)}
          >
            {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
              <option key={key} value={key}>
                {PRESETS[key].label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <p className="hint">{label}</p>

      <RoleGuardProvider user={user} config={config}>
        <PlaygroundDashboard />
      </RoleGuardProvider>
    </div>
  );
}
