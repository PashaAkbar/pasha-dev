import React, { useEffect } from 'react';
import ThemeMenu from '../components/ThemeMenu';
import { PERSONAL_INFO, PROJECTS, TOOLS, EXPERIENCES } from '../data/portfolioData';
import './neobrutalism.css';

const MARQUEE = 'REACT ✱ TYPESCRIPT ✱ NEXT.JS ✱ VUE ✱ TAILWIND ✱ REDUX ✱ REST ✱ GRAPHQL ✱ ';

// Hash links would be read as routes by HashRouter, so jump manually instead.
const jumpTo = (id) => (event) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function NeoBrutalPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Neo Brutalism · Anwaripasha Akbar';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="nb-page">
      <header className="nb-bar">
        <a className="nb-mark" href="#/">
          ANWARIPASHA<span className="nb-mark-dot">.</span>
        </a>
        <nav className="nb-bar-nav">
          <a href="#work" className="nb-bar-link" onClick={jumpTo('work')}>WORK</a>
          <a href="#stack" className="nb-bar-link" onClick={jumpTo('stack')}>STACK</a>
          <a href="#path" className="nb-bar-link" onClick={jumpTo('path')}>PATH</a>
          <ThemeMenu current="neo" variant="brutal" />
        </nav>
      </header>

      <section className="nb-hero">
        <div className="nb-hero-sticker">OPEN TO WORK</div>
        <p className="nb-kicker">SOFTWARE ENGINEER — JAKARTA, ID</p>
        <h1 className="nb-hero-title">
          I build
          <br />
          <span className="nb-underline">reliable</span>
          <br />
          digital stuff.
        </h1>
        <p className="nb-hero-copy">{PERSONAL_INFO.bio}</p>
        <div className="nb-hero-actions">
          <a className="nb-btn nb-btn-yellow" href={`mailto:${PERSONAL_INFO.email}`}>
            HIRE ME ↗
          </a>
          <a className="nb-btn" href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
            GITHUB ↗
          </a>
          <a className="nb-btn nb-btn-ghost" href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
            LINKEDIN ↗
          </a>
        </div>
        <div className="nb-hero-grid" aria-hidden="true">
          <span className="nb-square nb-cyan" />
          <span className="nb-square nb-pink" />
          <span className="nb-square nb-yellow" />
          <span className="nb-square nb-ink" />
        </div>
      </section>

      <div className="nb-marquee" aria-hidden="true">
        <div className="nb-marquee-track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      <section className="nb-section" id="work">
        <div className="nb-section-head">
          <h2 className="nb-h2">SELECTED WORK</h2>
          <span className="nb-count">{PROJECTS.length} PROJECTS</span>
        </div>

        <div className="nb-grid">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`nb-card nb-tone-${i % 3}`}>
              <div className="nb-card-top">
                <span className="nb-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="nb-client">{p.client}</span>
                {p.confidential && <span className="nb-tag nb-tag-ink">NDA</span>}
              </div>

              <h3 className="nb-card-title">{p.title}</h3>
              <p className="nb-card-copy">{p.description}</p>

              {p.image && (
                <div className="nb-card-media">
                  <img src={p.image} alt="" loading="lazy" />
                </div>
              )}

              <div className="nb-tags">
                {p.tags.map((t) => (
                  <span key={t} className="nb-tag">{t}</span>
                ))}
              </div>

              {p.link && (
                <a className="nb-card-link" href={p.link} target="_blank" rel="noopener noreferrer">
                  VISIT SITE ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="nb-section nb-section-dark" id="stack">
        <div className="nb-section-head">
          <h2 className="nb-h2">THE STACK</h2>
          <span className="nb-count">{TOOLS.length} TOOLS</span>
        </div>
        <div className="nb-chips">
          {TOOLS.map((t, i) => (
            <a
              key={t.name}
              className={`nb-chip nb-chip-${i % 4}`}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              title={t.detail}
            >
              {t.name}
            </a>
          ))}
        </div>
        <p className="nb-note">
          Production work across banking HRIS, fintech privacy, manufacturing SCM, consumer web and edtech.
        </p>
      </section>

      <section className="nb-section" id="path">
        <div className="nb-section-head">
          <h2 className="nb-h2">THE PATH</h2>
          <span className="nb-count">{EXPERIENCES.length} STOPS</span>
        </div>
        <div className="nb-timeline">
          {EXPERIENCES.map((e) => (
            <article key={e.time} className="nb-stop">
              <div className="nb-stop-when">
                <span>{e.time}</span>
                <span className="nb-tag">{e.type.toUpperCase()}</span>
              </div>
              <div className="nb-stop-body">
                <h3>{e.role}</h3>
                <p className="nb-stop-company">{e.company}</p>
                <ul>
                  {e.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nb-cta">
        <h2 className="nb-cta-title">LET&apos;S BUILD<br />SOMETHING LOUD.</h2>
        <a className="nb-btn nb-btn-big" href={`mailto:${PERSONAL_INFO.email}`}>
          {PERSONAL_INFO.email} ↗
        </a>
        <p className="nb-cta-note">{PERSONAL_INFO.location} · UTC+7</p>
      </section>

      <footer className="nb-footer">
        <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
        <a href="#/">← BACK TO THE PLANETARY PORTFOLIO</a>
      </footer>
    </div>
  );
}
