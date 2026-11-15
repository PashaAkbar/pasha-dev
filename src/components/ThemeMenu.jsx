import React, { useEffect, useRef, useState } from 'react';
import './theme-menu.css';

const THEMES = [
  { id: 'planetary', label: 'Planetary', hint: '3D solar system', href: '#/' },
  { id: 'starwars', label: 'Star Wars', hint: 'Opening crawl', href: '#/starwars' },
  { id: 'neo', label: 'Neo Brutalism', hint: 'Loud & flat', href: '#/neo' },
];

export default function ThemeMenu({ current = 'planetary', variant = 'dark' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const active = THEMES.find((t) => t.id === current) || THEMES[0];

  return (
    <div className={`tm tm-${variant}`} ref={ref}>
      <button
        type="button"
        className="tm-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="tm-dot" aria-hidden="true" />
        {active.label}
        <span className="tm-caret" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="tm-menu" role="menu">
          <span className="tm-menu-title">Switch theme</span>
          {THEMES.map((t) => (
            <a
              key={t.id}
              role="menuitem"
              href={t.href}
              className={`tm-item${t.id === current ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="tm-item-label">{t.label}</span>
              <span className="tm-item-hint">{t.hint}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
