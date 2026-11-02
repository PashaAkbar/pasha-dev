import React from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import { Milestone, Calendar, Briefcase } from 'lucide-react';

export default function SaturnChronosModal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#eab308',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Milestone size={13} color="#eab308" />
          CHRONOS // CAREER TRAJECTORY
        </span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>ENTERPRISE & PUBLIC SECTOR</span>
      </div>

      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
        Building useful systems with engineering teams that care about performance, privacy, and the details.
      </p>

      {/* Timeline List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: '440px',
          overflowY: 'auto',
          paddingRight: '6px',
          position: 'relative',
        }}
      >
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              position: 'relative',
            }}
          >
            {/* Time & Type Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#eab308', fontWeight: 600 }}>
                <Calendar size={11} />
                <span>{exp.time}</span>
              </div>
              <span
                style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(234, 179, 8, 0.1)',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                  color: '#fde047',
                }}
              >
                {exp.type.toUpperCase()}
              </span>
            </div>

            {/* Role & Company */}
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', margin: '0 0 2px 0' }}>
              {exp.role}
            </h3>
            <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 500, marginBottom: '10px' }}>
              {exp.company}
            </div>

            {/* Task list */}
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#94a3b8', lineHeight: '1.6' }}>
              {exp.tasks.map((task, tIdx) => (
                <li key={tIdx} style={{ marginBottom: '4px' }}>
                  {task}
                </li>
              ))}
            </ul>

            {/* Domain Highlight */}
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '10px', color: '#64748b' }}>
              FOCUS: <span style={{ color: '#eab308' }}>{exp.highlightTag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
