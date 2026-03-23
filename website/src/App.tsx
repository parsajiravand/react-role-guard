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
            Interactive playground — imports the library from <code>../src</code> via Vite alias.
          </p>
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
