import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme, setTheme } from '../../utils/theme';
export default function Switcher() {
  const dark = useTheme();
  return <div className="theme-switch">
    <button type="button" className="theme-icon" aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} onClick={() => setTheme(!dark)}>
      <DarkModeSwitch checked={dark} onChange={setTheme} size="100%" aria-hidden="true" style={{pointerEvents:'none'}} />
    </button>
    <p className="theme-heading">Go<br />{dark ? 'Light' : 'Dark'}!</p>
  </div>;
}
