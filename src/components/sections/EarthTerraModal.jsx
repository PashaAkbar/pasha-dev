import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Globe, MapPin, Radio, Activity, ExternalLink, Cpu } from 'lucide-react';

export default function EarthTerraModal() {
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
          <Globe size={13} color="#38bdf8" />
          TERRA // OPERATIONAL BASE
        </span>
        <span
          style={{
            fontSize: '10px',
            color: '#4ade80',
            padding: '2px 8px',
            background: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Activity size={10} />
          ONLINE · JAKARTA HUB
        </span>
      </div>

      {/* Profile Overview Card */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          alignItems: 'center',
        }}
      >
        <img
          src={PERSONAL_INFO.avatar}
          alt={PERSONAL_INFO.name}
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '12px',
            objectFit: 'cover',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.25)',
          }}
        />
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: '0 0 2px 0' }}>
            {PERSONAL_INFO.name}
          </h2>
          <div style={{ fontSize: '12px', color: '#38bdf8', marginBottom: '6px', fontWeight: 500 }}>
            {PERSONAL_INFO.role} · Jakarta, Indonesia
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={11} color="#38bdf8" />
            <span>6.2088° S, 106.8456° E</span>
          </div>
        </div>
      </div>

      {/* Geographic & Engineering Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>CORE PLATFORMS</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9' }}>Banking HRIS & Fintech</div>
        </div>
        <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>DATA PRIVACY</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9' }}>UUPDP Compliance Expert</div>
        </div>
        <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>ORBIT ARCS</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9' }}>Tokyo · London · NYC · SG</div>
        </div>
        <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>GLOBAL STATUS</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#4ade80' }}>Open for Collaboration</div>
        </div>
      </div>

      {/* Engineering Philosophy */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
          ENGINEERING PHILOSOPHY
        </div>
        <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
          I focus on building resilient software architectures that scale seamlessly. From complex banking workflows at CIMB Niaga and BNI to real-time supply chain operational dashboards, I bridge design systems with enterprise data integrity.
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '12px',
          fontSize: '11px',
          color: '#64748b',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>GLOBE: MONOCHROME 48K POINT CLOUD</span>
        <span style={{ color: '#38bdf8' }}>JAKARTA BEACON ACTIVE</span>
      </div>
    </div>
  );
}
