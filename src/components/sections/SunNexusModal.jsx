import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Sparkles, ArrowRight, Mail, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';

export default function SunNexusModal({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles size={12} color="#f59e0b" />
          SOL // CORE NEXUS
        </span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>SOFTWARE ENGINEER · JAKARTA</span>
      </div>

      {/* Main Title & Role */}
      <div>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 6px 0',
          }}
        >
          {PERSONAL_INFO.name}
        </h1>
        <p style={{ fontSize: '15px', color: '#f59e0b', fontWeight: 600, margin: 0 }}>
          {PERSONAL_INFO.tagline}
        </p>
      </div>

      {/* Bio */}
      <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#cbd5e1', margin: 0 }}>
        {PERSONAL_INFO.bio}
      </p>

      {/* Pillars / What I Bring */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          padding: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
        }}
      >
        {PERSONAL_INFO.pillars.map((pillar) => (
          <div key={pillar.number}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>
              {pillar.number}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
              {pillar.title}
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
              {pillar.description}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Planetary Navigation Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={() => onNavigate('earth')}
          style={{
            flex: '1 1 140px',
            padding: '10px 14px',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            color: '#38bdf8',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Terra // About Base</span>
          <ArrowRight size={12} />
        </button>

        <button
          onClick={() => onNavigate('mars')}
          style={{
            flex: '1 1 140px',
            padding: '10px 14px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Ares // Projects</span>
          <ArrowRight size={12} />
        </button>

        <button
          onClick={() => onNavigate('saturn')}
          style={{
            flex: '1 1 140px',
            padding: '10px 14px',
            background: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '8px',
            color: '#eab308',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Chronos // Experience</span>
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Social Links Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '11px', color: '#64748b' }}>TRANSMISSION CHANNELS</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
            title="GitHub"
          >
            <GithubIcon size={16} color="#94a3b8" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
            title="LinkedIn"
          >
            <LinkedinIcon size={16} color="#94a3b8" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{ color: '#94a3b8', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
