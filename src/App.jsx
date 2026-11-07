import React, { useState } from 'react';
import PlanetarySystem from './components/PlanetarySystem';
import { PLANETS, PERSONAL_INFO, PROJECTS, TOOLS, EXPERIENCES } from './data/portfolioData';
import { GithubIcon, LinkedinIcon } from './components/SocialIcons';

function SectionContent({ id, onNav }) {
  if (id === 'sun') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 6px 0' }}>
            SOFTWARE ENGINEER · JAKARTA, ID
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#f1f1f1', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            {PERSONAL_INFO.name}
          </h1>
          <p style={{ fontSize: 14, color: '#aaa', margin: '0 0 14px 0', fontWeight: 500 }}>
            {PERSONAL_INFO.tagline}
          </p>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {PERSONAL_INFO.pillars.map((p) => (
            <div key={p.number} style={{ padding: 14, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{p.number}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#ddd', marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4 }}>{p.description}</div>
            </div>
          ))}
        </div>

        {/* Quick Planetary Jump */}
        <div>
          <div style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', marginBottom: 10 }}>EXPLORE PLANETARY SECTIONS</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PLANETS.slice(1).map((p) => (
              <button
                key={p.id}
                onClick={() => onNav(p.id)}
                style={{
                  padding: '8px 14px',
                  background: 'transparent',
                  border: '1px solid #2a2a2a',
                  borderRadius: 6,
                  color: '#ccc',
                  fontSize: 11,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#666'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#ccc'; }}
              >
                <span>{p.label}</span>
                <span style={{ color: '#555' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === 'earth') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Profile Header (Clean Typography, No Image) */}
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 8px 0' }}>
            TERRA // BASE OF OPERATIONS & ABOUT ME
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f1f1f1', margin: 0, letterSpacing: '-0.02em' }}>
              {PERSONAL_INFO.name}
            </h2>
            <span
              style={{
                fontSize: 9,
                color: '#aaa',
                border: '1px solid #333',
                background: '#0d0d0d',
                padding: '2px 8px',
                borderRadius: 999,
                letterSpacing: '0.04em',
              }}
            >
              ● ACTIVE FOR ROLES
            </span>
          </div>
          <div style={{ fontSize: 14, color: '#aaa', marginBottom: 4, fontWeight: 500 }}>
            {PERSONAL_INFO.role} · Jakarta, Indonesia (UTC+7)
          </div>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 10 }}>
            COORDINATES: 6.2088° S, 106.8456° E
          </div>
          <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>
            {PERSONAL_INFO.tagline}
          </div>
        </div>

        {/* Comprehensive Bio */}
        <div style={{ padding: 18, background: '#0a0a0a', border: '1px solid #1c1c1c', borderRadius: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#777', letterSpacing: '0.08em', marginBottom: 8 }}>
            BIOGRAPHY & PHILOSOPHY
          </div>
          <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.65, margin: '0 0 10px 0' }}>
            I am a frontend software engineer based in Jakarta who turns complex operational workflows into clear, dependable, and high-performance web products. Over the past several years, I have engineered mission-critical applications across enterprise banking, corporate operations, and the public sector.
          </p>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.65, margin: 0 }}>
            From building large-scale internal HRIS platforms at PT Bank CIMB Niaga Tbk and data-privacy architectures (UUPDP compliance) at PT Bank Negara Indonesia (BNI), to real-time supply chain monitoring dashboards and client platforms at PT Metrodata Electronics Tbk, my focus is always on engineering clean systems that users and businesses can depend on every single day.
          </p>
        </div>

        {/* 4 Core Specializations */}
        <div>
          <div style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', marginBottom: 10 }}>
            CORE SPECIALIZATIONS & DOMAINS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            <div style={{ padding: 14, background: '#090909', border: '1px solid #1a1a1a', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>01 // BANKING & HRIS</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ddd', marginBottom: 4 }}>Enterprise HR Platforms</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.45 }}>
                Component libraries, employee lifecycle modules, role-based workflows, and integration with secure banking REST endpoints.
              </div>
            </div>

            <div style={{ padding: 14, background: '#090909', border: '1px solid #1a1a1a', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>02 // DATA PRIVACY</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ddd', marginBottom: 4 }}>UUPDP Regulatory Compliance</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.45 }}>
                Enforcing strict data protection policies across mobile & web sales apps, masking PII, and rigorous UAT feedback resolution.
              </div>
            </div>

            <div style={{ padding: 14, background: '#090909', border: '1px solid #1a1a1a', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>03 // SCM & OPERATIONS</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ddd', marginBottom: 4 }}>Operations & Analytics Dashboards</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.45 }}>
                Real-time tracking of procurement, inventory flow, logistics deliveries, and administrative management portals.
              </div>
            </div>

            <div style={{ padding: 14, background: '#090909', border: '1px solid #1a1a1a', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>04 // FRONTEND ARCHITECTURE</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ddd', marginBottom: 4 }}>Type-Safe Component Systems</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.45 }}>
                Translating Figma designs into pixel-perfect React/Next.js/Vue code with Redux state orchestration and Tailwind CSS.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Working Principles */}
        <div>
          <div style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', marginBottom: 10 }}>
            WHAT I BRING TO TEAMS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {PERSONAL_INFO.pillars.map((pillar) => (
              <div key={pillar.number} style={{ padding: 14, background: '#080808', border: '1px solid #181818', borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 4 }}>{pillar.number}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#eee', marginBottom: 2 }}>{pillar.title}</div>
                <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4 }}>{pillar.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav CTAs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', borderTop: '1px solid #161616', paddingTop: 16 }}>
          <button
            onClick={() => onNav('mars')}
            style={{
              padding: '8px 16px',
              background: '#121212',
              border: '1px solid #2a2a2a',
              borderRadius: 6,
              color: '#ddd',
              fontSize: 11,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Selected Portfolio (Ares) →
          </button>
          <button
            onClick={() => onNav('saturn')}
            style={{
              padding: '8px 16px',
              background: '#121212',
              border: '1px solid #2a2a2a',
              borderRadius: 6,
              color: '#ddd',
              fontSize: 11,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Experience Timeline (Chronos) →
          </button>
          <button
            onClick={() => onNav('neptune')}
            style={{
              padding: '8px 16px',
              background: '#121212',
              border: '1px solid #2a2a2a',
              borderRadius: 6,
              color: '#ddd',
              fontSize: 11,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Contact & Transmission (Beacon) →
          </button>
        </div>
      </div>
    );
  }

  if (id === 'mars') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 4px 0' }}>
            ARES // SELECTED PORTFOLIO ({PROJECTS.length})
          </p>
          <div style={{ fontSize: 12, color: '#888' }}>
            Products and platforms built across HRIS, fintech, operations, and the web.
          </div>
        </div>

        {/* Responsive Project Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              style={{
                padding: 16,
                border: '1px solid #1c1c1c',
                borderRadius: 10,
                background: '#090909',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: '#666', letterSpacing: '0.05em' }}>0{i + 1} · {p.client}</span>
                  {p.confidential && (
                    <span style={{ fontSize: 9, color: '#888', border: '1px solid #333', padding: '1px 6px', borderRadius: 4 }}>
                      CONFIDENTIAL
                    </span>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 10, color: '#aaa', textDecoration: 'none', border: '1px solid #333', padding: '1px 6px', borderRadius: 4 }}
                    >
                      LIVE ↗
                    </a>
                  )}
                </div>

                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#eee', margin: '0 0 6px 0' }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: '#888', lineHeight: 1.5, margin: '0 0 10px 0' }}>{p.description}</p>
              </div>

              {p.image && (
                <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #1a1a1a', margin: '2px 0 6px' }}>
                  <img
                    src={p.image}
                    alt=""
                    style={{ width: '100%', maxHeight: 150, objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontSize: 10, color: '#777', background: '#121212', border: '1px solid #222', padding: '2px 6px', borderRadius: 4 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'jupiter') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 4px 0' }}>
            JOVIAN // WORKING TOOLKIT ({TOOLS.length})
          </p>
          <div style={{ fontSize: 12, color: '#888' }}>
            A focused set of technologies I use to move from idea to dependable, production-ready systems.
          </div>
        </div>

        {/* Multi-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {TOOLS.map((t, i) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 14,
                border: '1px solid #1c1c1c',
                borderRadius: 8,
                background: '#090909',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 6,
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1c1c1c'; }}
            >
              <div>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 2 }}>0{i + 1} // {t.category}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#eee', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4 }}>{t.detail}</div>
              </div>
              <div style={{ fontSize: 10, color: '#555', marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>DOCS ↗</span>
                <span style={{ color: '#888' }}>{t.level}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'saturn') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 4px 0' }}>
            CHRONOS // PROFESSIONAL TIMELINE
          </p>
          <div style={{ fontSize: 12, color: '#888' }}>
            Building reliable systems with engineering teams that care about performance and details.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {EXPERIENCES.map((e, i) => (
            <div key={i} style={{ padding: 16, border: '1px solid #1c1c1c', borderRadius: 10, background: '#090909' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>{e.time}</span>
                <span style={{ fontSize: 9, color: '#777', border: '1px solid #222', padding: '2px 6px', borderRadius: 4 }}>
                  {e.type.toUpperCase()}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#eee', margin: '0 0 2px 0' }}>{e.role}</h3>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>{e.company}</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#777', lineHeight: 1.6 }}>
                {e.tasks.map((task, j) => (
                  <li key={j} style={{ marginBottom: 4 }}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'neptune') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <p style={{ fontSize: 11, color: '#666', letterSpacing: '0.12em', margin: '0 0 6px 0' }}>
            BEACON // TRANSMISSIONS & CONTACT
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#eee', margin: '0 0 6px 0' }}>Let's work together.</h2>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5, margin: 0, maxWidth: 540 }}>
            I'm available for frontend engineering roles, product development, internal tools, and thoughtful collaborations.
          </p>
        </div>

        <div style={{ padding: 16, border: '1px solid #2a2a2a', borderRadius: 10, background: '#090909', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.08em', marginBottom: 2 }}>DIRECT INBOX</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#eee' }}>{PERSONAL_INFO.email}</div>
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              padding: '8px 16px',
              border: '1px solid #444',
              borderRadius: 6,
              background: '#fff',
              color: '#000',
              fontWeight: 700,
              fontSize: 12,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            START CONVERSATION ↗
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              border: '1px solid #1c1c1c',
              borderRadius: 8,
              background: '#090909',
              textDecoration: 'none',
              color: '#ccc',
              transition: 'border-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1c1c1c'; }}
          >
            <GithubIcon size={20} color="#ccc" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#eee' }}>GitHub</div>
              <div style={{ fontSize: 10, color: '#666' }}>@PashaAkbar</div>
            </div>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              border: '1px solid #1c1c1c',
              borderRadius: 8,
              background: '#090909',
              textDecoration: 'none',
              color: '#ccc',
              transition: 'border-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1c1c1c'; }}
          >
            <LinkedinIcon size={20} color="#ccc" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#eee' }}>LinkedIn</div>
              <div style={{ fontSize: 10, color: '#666' }}>anwaripasha-akbar</div>
            </div>
          </a>
        </div>

        <div style={{ fontSize: 11, color: '#444', borderTop: '1px solid #141414', paddingTop: 14 }}>
          © {new Date().getFullYear()} {PERSONAL_INFO.name} · All rights reserved.
        </div>
      </div>
    );
  }

  return null;
}

export default function App() {
  const [active, setActive] = useState('earth'); // Default to earth
  const [panelOpen, setPanelOpen] = useState(true);
  const planet = PLANETS.find((p) => p.id === active) || PLANETS[1];

  const isDetail = active !== 'sun';

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', fontFamily: 'ui-monospace, monospace', color: '#ccc' }}>
      {/* 3D Planetary Canvas: Frames planet in left 50% when detail is open */}
      <PlanetarySystem
        activePlanetId={active}
        isDetailOpen={panelOpen && isDetail}
        onSelectPlanet={(id) => {
          setActive(id);
          setPanelOpen(true);
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <div style={{ pointerEvents: 'auto', cursor: 'pointer' }} onClick={() => setActive('sun')}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: '#eee' }}>
            ANWARIPASHA AKBAR
          </div>
          <div style={{ fontSize: 10, color: '#666' }}>
            SOFTWARE ENGINEER · PLANETARY PORTFOLIO
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a
            href="#/starwars"
            style={{
              pointerEvents: 'auto',
              padding: '6px 14px',
              background: 'rgba(10, 10, 10, 0.85)',
              border: '1px solid #222',
              borderRadius: 6,
              color: '#FFE81F',
              fontSize: 10,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            ★ STAR WARS
          </a>
          <button
            onClick={() => setActive('sun')}
            style={{
              pointerEvents: 'auto',
              padding: '6px 14px',
              background: 'rgba(10, 10, 10, 0.85)',
              border: active === 'sun' ? '1px solid #666' : '1px solid #222',
              borderRadius: 6,
              color: active === 'sun' ? '#fff' : '#888',
              fontSize: 10,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            ORBIT OVERVIEW
          </button>
        </div>
      </div>

      {/* Side Information Panel: Exact 50% screen split (calc(50vw - 28px)), leaving 50% for planet */}
      {panelOpen && (
        <aside
          style={{
            position: 'absolute',
            top: '64px',
            bottom: '72px',
            right: '20px',
            width: isDetail ? 'calc(50vw - 28px)' : '480px',
            maxWidth: isDetail ? 'none' : '480px',
            minWidth: '320px',
            overflowY: 'auto',
            padding: '24px 28px',
            background: 'rgba(5, 5, 5, 0.88)',
            border: '1px solid #1c1c1c',
            borderRadius: 14,
            zIndex: 20,
            backdropFilter: 'blur(16px)',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #161616', paddingBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#aaa', letterSpacing: '0.08em' }}>
              {planet.name}
            </span>
            <button
              onClick={() => setPanelOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: 18,
                padding: '2px 8px',
                borderRadius: 4,
              }}
              title="Close panel"
            >
              ×
            </button>
          </div>

          <SectionContent id={active} onNav={(id) => setActive(id)} />
        </aside>
      )}

      {/* Re-open panel pill when closed */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '20px',
            padding: '8px 16px',
            background: 'rgba(10, 10, 10, 0.9)',
            border: '1px solid #333',
            borderRadius: 8,
            color: '#ccc',
            fontSize: 11,
            cursor: 'pointer',
            zIndex: 20,
          }}
        >
          VIEW INFORMATION PANEL
        </button>
      )}

      {/* Bottom Planet Dock */}
      <nav
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
          padding: '6px 10px',
          background: 'rgba(5, 5, 5, 0.88)',
          border: '1px solid #1a1a1a',
          borderRadius: 12,
          zIndex: 20,
          backdropFilter: 'blur(12px)',
          maxWidth: 'calc(100vw - 32px)',
          overflowX: 'auto',
        }}
      >
        {PLANETS.map((p) => {
          const isSelected = active === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActive(p.id);
                setPanelOpen(true);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: isSelected ? '1px solid #555' : '1px solid transparent',
                background: isSelected ? '#161616' : 'transparent',
                color: isSelected ? '#eee' : '#666',
                fontSize: 11,
                cursor: 'pointer',
                fontWeight: isSelected ? 700 : 400,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {p.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
