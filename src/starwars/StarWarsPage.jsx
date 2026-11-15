import React, { useEffect, useRef } from 'react';
import OpenCrawl from './OpenCrawl';
import ThemeMenu from '../components/ThemeMenu';
import './starwars.css';

// Reveal children when the section scrolls into view
function SagaSection({ chapter, title, children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`sw-section ${className}`}>
      <p className="sw-chapter">{chapter}</p>
      <h2 className="sw-title">{title}</h2>
      {children}
    </section>
  );
}

import ParticlePortrait from './ParticlePortrait';
import { GROGU_ART, MANDO_ART } from './starwarsArt';

export default function StarWarsPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Star Wars · Anwaripasha Akbar';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="sw-page">
      <div className="sw-theme">
        <ThemeMenu current="starwars" variant="yellow" />
      </div>

      {/* ─── Act I: Three.js opening crawl ─── */}
      <OpenCrawl />

      {/* ─── Act II: The Jedi ─── */}
      <SagaSection chapter="CHAPTER I" title="THE JEDI WAY" className="sw-jedi">
        <div className="sw-saber-duel">
          <div className="sw-saber saber-blue">
            <div className="sw-blade" />
            <div className="sw-hilt" />
          </div>
          <div className="sw-clash" aria-hidden="true">
            <span className="sw-spark" style={{ '--dx': '-80px', '--dy': '-30px', '--d': '0s' }} />
            <span className="sw-spark" style={{ '--dx': '75px', '--dy': '-45px', '--d': '0.15s' }} />
            <span className="sw-spark" style={{ '--dx': '-55px', '--dy': '35px', '--d': '0.3s' }} />
            <span className="sw-spark" style={{ '--dx': '65px', '--dy': '30px', '--d': '0.45s' }} />
            <span className="sw-spark" style={{ '--dx': '-30px', '--dy': '-60px', '--d': '0.6s' }} />
            <span className="sw-spark" style={{ '--dx': '35px', '--dy': '-65px', '--d': '0.75s' }} />
            <span className="sw-spark" style={{ '--dx': '-90px', '--dy': '10px', '--d': '0.9s' }} />
            <span className="sw-spark" style={{ '--dx': '90px', '--dy': '5px', '--d': '1.05s' }} />
          </div>
          <div className="sw-saber saber-red">
            <div className="sw-blade" />
            <div className="sw-hilt" />
          </div>
        </div>
        <p className="sw-copy">
          A Jedi uses the Force for knowledge and defense — never for spaghetti code. Here, blue
          sabers stand for reusable components, red ones for the legacy monolith they were built to
          defeat. May the refactor be with you.
        </p>
      </SagaSection>

      {/* ─── Act III: Grogu ─── */}
      <SagaSection chapter="CHAPTER II" title="THE CHILD" className="sw-grogu-act">
        <ParticlePortrait art={GROGU_ART} className="sw-grogu" label="Grogu waving, drawn in particle dot art" />
        <p className="sw-copy">
          Small component. Massive impact. Like Grogu, the best UI pieces are tiny, charming, and
          quietly more powerful than they look — snacking on state and waving at users across the
          galaxy.
        </p>
      </SagaSection>

      {/* ─── Act IV: The Bounty ─── */}
      <SagaSection chapter="CHAPTER III" title="THE BOUNTY" className="sw-mando-act">
        <ParticlePortrait art={MANDO_ART} className="sw-mando" label="The Mandalorian cradling Grogu, drawn in particle dot art" />
        <p className="sw-copy">
          This is the Way. Beskar-strong engineering: components hardened like armor, wrapped in
          secure systems, hunting down bugs across the galaxy — helmet never removed, deadlines
          never missed.
        </p>
      </SagaSection>

      {/* ─── Act IV: The Fleet ─── */}
      <SagaSection chapter="CHAPTER IV" title="THE FLEET" className="sw-fleet">
        <div className="sw-space">
          <div className="sw-xwing">
            <div className="sw-engine-trail" />
            <svg viewBox="0 0 120 60" width="150" aria-hidden="true">
              <path d="M10 30 L70 26 L104 30 L70 34 Z" fill="#cfd3d8" />
              <path d="M40 27 L18 6 L30 24 Z" fill="#b6bac0" />
              <path d="M40 33 L18 54 L30 36 Z" fill="#b6bac0" />
              <circle cx="98" cy="30" r="5" fill="#7ec8ff" />
              <circle cx="104" cy="30" r="2.5" fill="#fff" />
            </svg>
          </div>
          <div className="sw-tie">
            <svg viewBox="0 0 120 70" width="140" aria-hidden="true">
              <circle cx="60" cy="35" r="14" fill="#4a4d52" />
              <circle cx="60" cy="35" r="9" fill="#22242a" />
              <rect x="6" y="4" width="10" height="62" rx="3" fill="#3a3d42" />
              <rect x="104" y="4" width="10" height="62" rx="3" fill="#3a3d42" />
              <path d="M16 30 L48 32 M16 40 L48 38 M104 30 L72 32 M104 40 L72 38" stroke="#3a3d42" strokeWidth="5" />
            </svg>
          </div>
        </div>
        <p className="sw-copy">
          X-wings for the rebels, TIE fighters for the empire — every great product ships with a
          fleet. Six deployments across banking HRIS, fintech privacy, and EdTech have flown their
          sorties through this portfolio.
        </p>
      </SagaSection>

      {/* ─── Act V: Death Star ─── */}
      <SagaSection chapter="CHAPTER V" title="THE BATTLE STATION" className="sw-deathstar-act">
        <div className="sw-deathstar">
          <div className="sw-trench" />
          <div className="sw-dish" />
          <div className="sw-superlaser" />
        </div>
        <p className="sw-copy">
          That's no moon. Precision engineering at planetary scale: strict data protection, enforced
          compliance, and dashboards that monitor every system before the rebels — sorry, bugs —
          even get close.
        </p>
      </SagaSection>

      {/* ─── Finale ─── */}
      <footer className="sw-footer">
        <p className="sw-may">MAY THE FORCE BE WITH YOU</p>
        <a className="sw-back" href="#/">← RETURN TO THE PLANETARY PORTFOLIO</a>
        <p className="sw-fineprint">Fan-made tribute · Star Wars is a trademark of Lucasfilm Ltd.</p>
      </footer>
    </div>
  );
}
