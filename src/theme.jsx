import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
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
  const [open,setOpen] = useState(false);
  const root=useRef(null), trigger=useRef(null), panelId=useId();
  const modes=[['light','Sáng',Sun],['dark','Tối',Moon],['system','Theo hệ thống',Monitor]];
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const label=`Giao diện: ${modes.find(([value])=>value===theme)[1]}. Đổi giao diện`;
  useEffect(()=>{
    if(!open)return;
    const close=e=>{if(!root.current?.contains(e.target))setOpen(false);};
    document.addEventListener('pointerdown',close);
    return()=>document.removeEventListener('pointerdown',close);
  },[open]);
  return <div className="theme-picker" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus();}}}>
    <button ref={trigger} className="icon-button icon-hint theme-toggle" aria-label={label} data-tooltip={label} aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(!open)}><Icon size={20} aria-hidden="true"/></button>
    {open&&<div id={panelId} className="theme-options" role="group" aria-label="Chọn giao diện">{modes.map(([value,name,ModeIcon])=><button key={value} type="button" className="icon-button icon-hint" aria-label={name} data-tooltip={name} aria-pressed={theme===value} onClick={()=>{setTheme(value);setOpen(false);trigger.current?.focus();}}><ModeIcon size={20} aria-hidden="true"/></button>)}</div>}
  </div>;
}
export function Brand({ compact=false }) {
  return <a className="brand" href="#/" aria-label="Teravel Industries — Trang chủ"><span className="logo-mark" aria-hidden="true">T</span><span><b>Teravel{!compact && ' Industries'}</b><small>{compact ? 'INDUSTRIES' : 'JUMPER AI LAB'}</small></span></a>;
}
