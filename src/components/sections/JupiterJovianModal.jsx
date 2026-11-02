import React from 'react';
import { TOOLS } from '../../data/portfolioData';
import { Cpu, ExternalLink } from 'lucide-react';

export default function JupiterJovianModal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#f97316',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Cpu size={13} color="#f97316" />
          JOVIAN // WORKING TOOLKIT
        </span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>PRODUCTION STACK & ARCHITECTURE</span>
      </div>

      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
        A focused set of technologies I use to move from idea to dependable, enterprise-ready digital products.
      </p>

      {/* Grid of Tools */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          maxHeight: '440px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {TOOLS.map((tool, idx) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
              e.currentTarget.style.background = 'rgba(249, 115, 22, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#f97316', fontWeight: 700 }}>0{idx + 1}</span>
              <ExternalLink size={11} color="#64748b" />
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                {tool.name}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
                {tool.detail}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: '#64748b' }}>{tool.category}</span>
              <span
                style={{
                  fontSize: '9px',
                  color: '#fb923c',
                  background: 'rgba(249, 115, 22, 0.1)',
                  padding: '2px 5px',
                  borderRadius: '3px',
                }}
              >
                {tool.level}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
