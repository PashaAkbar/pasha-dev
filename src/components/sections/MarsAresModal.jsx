import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Layers, ExternalLink, Lock, Eye } from 'lucide-react';

export default function MarsAresModal() {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  const categories = ['all', 'Enterprise Fintech', 'Banking / Privacy', 'Operations / Manufacturing', 'Consumer Web', 'EdTech / Corporate'];

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Layers size={13} color="#ef4444" />
          ARES // SELECTED PORTFOLIO ({PROJECTS.length})
        </span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>HRIS · FINTECH · SCM · WEB</span>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}
      >
        {['all', 'Enterprise', 'Operations', 'Consumer'].map((catKey) => {
          const isSelected =
            (catKey === 'all' && filter === 'all') ||
            (catKey === 'Enterprise' && (filter.includes('Fintech') || filter.includes('Banking'))) ||
            (catKey === 'Operations' && filter.includes('Operations')) ||
            (catKey === 'Consumer' && (filter.includes('Consumer') || filter.includes('EdTech')));

          return (
            <button
              key={catKey}
              onClick={() => {
                if (catKey === 'all') setFilter('all');
                else if (catKey === 'Enterprise') setFilter('Enterprise Fintech');
                else if (catKey === 'Operations') setFilter('Operations / Manufacturing');
                else if (catKey === 'Consumer') setFilter('Consumer Web');
              }}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: isSelected ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.08)',
                background: isSelected ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontSize: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {catKey.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Project Selector List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: '440px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {filteredProjects.map((project, idx) => {
          const isSelected = activeProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: isSelected ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: isSelected ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {/* Title & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700, letterSpacing: '0.05em' }}>
                    0{idx + 1} // {project.client.toUpperCase()}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', margin: '2px 0 0 0' }}>
                    {project.title}
                  </h3>
                </div>
                {project.confidential ? (
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#fbbf24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <Lock size={9} />
                    CONFIDENTIAL
                  </span>
                ) : project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '10px',
                      color: '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>LIVE</span>
                    <ExternalLink size={10} />
                  </a>
                ) : null}
              </div>

              {/* Description */}
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5', margin: '6px 0 10px 0' }}>
                {project.description}
              </p>

              {/* Media Preview if available */}
              {project.image && isSelected && (
                <div style={{ margin: '8px 0 12px 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
