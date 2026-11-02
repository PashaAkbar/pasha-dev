import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Radio, Mail, Copy, Check, Send, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';

export default function NeptuneBeaconModal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Radio size={13} color="#38bdf8" />
          BEACON // TRANSMISSIONS & CONTACT
        </span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>TRANSMITTER ONLINE</span>
      </div>

      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '0 0 6px 0' }}>
          Have a project in mind?
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>
          I&apos;m available for frontend engineering roles, product development, freelance systems, and thoughtful engineering collaborations.
        </p>
      </div>

      {/* Primary Email Card */}
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          background: 'rgba(56, 189, 248, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mail size={18} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '0.05em' }}>DIRECT INBOX</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{PERSONAL_INFO.email}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={handleCopy}
            title="Copy email to clipboard"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
            }}
          >
            {copied ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#38bdf8',
              border: 'none',
              color: '#040509',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
            }}
          >
            <span>SEND</span>
            <Send size={11} />
          </a>
        </div>
      </div>

      {/* Verified Profiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '14px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          }}
        >
          <GithubIcon size={18} color="#ffffff" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#f8fafc' }}>GitHub</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>@PashaAkbar</div>
          </div>
        </a>

        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '14px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#38bdf8';
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          }}
        >
          <LinkedinIcon size={18} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#f8fafc' }}>LinkedIn</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>anwaripasha-akbar</div>
          </div>
        </a>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
        <span>LOCATION: JAKARTA, ID</span>
        <span>&copy; {new Date().getFullYear()} ANWARIPASHA AKBAR</span>
      </div>
    </div>
  );
}
