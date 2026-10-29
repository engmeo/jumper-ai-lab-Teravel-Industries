import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { const value = localStorage.getItem('teravel-theme'); return ['light','dark','system'].includes(value) ? value : 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.dataset.theme = resolved;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#141824' : '#fafafd');
    };
    apply();
    try { localStorage.setItem('teravel-theme', theme); } catch { /* Storage is optional. */ }
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
export function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  return <label className="theme-switch"><Icon size={17} aria-hidden="true"/><span className="sr-only">Giao diện</span><select aria-label="Giao diện" value={theme} onChange={e=>setTheme(e.target.value)}><option value="light">Sáng</option><option value="dark">Tối</option><option value="system">Hệ thống</option></select></label>;
}
export function Brand({ compact=false }) {
  return <a className="brand" href="#/" aria-label="Teravel Industries — Trang chủ"><span className="logo-mark" aria-hidden="true">T</span><span><b>Teravel{!compact && ' Industries'}</b><small>{compact ? 'INDUSTRIES' : 'JUMPER AI LAB'}</small></span></a>;
}
