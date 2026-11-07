import React, { useEffect, useRef } from 'react';
import OpenCrawl from './OpenCrawl';
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

// ─── GROGU: hand-drawn dot-art SVG with a waving arm ───
function Grogu() {
  return (
    <svg className="sw-grogu sw-dots" viewBox="0 0 240 260" aria-label="Grogu waving, dot art">
      {/* ears */}
      <path d="M62 92 Q18 96 10 150 Q40 140 66 118 Z" />
      <path d="M178 92 Q222 96 230 150 Q200 140 174 118 Z" />
      {/* head */}
      <ellipse cx="120" cy="95" rx="58" ry="52" />
      {/* robe / body */}
      <path d="M78 132 Q60 200 66 244 L174 244 Q180 200 162 132 Q120 150 78 132 Z" />
      <path d="M118 138 L122 244" />
      {/* waving arm (left side, pivots at the shoulder) */}
      <g className="sw-grogu-arm">
        <path d="M84 150 Q52 138 34 108" />
        <circle cx="32" cy="102" r="13" />
        <circle className="sw-dots-solid" cx="27" cy="92" r="4" />
        <circle className="sw-dots-solid" cx="38" cy="90" r="4" />
      </g>
      {/* resting arm */}
      <path d="M158 152 Q182 168 186 196" />
      {/* eyes: dotted rings + solid pupils */}
      <circle cx="100" cy="92" r="10" />
      <circle cx="140" cy="92" r="10" />
      <circle className="sw-dots-solid" cx="100" cy="92" r="4" />
      <circle className="sw-dots-solid" cx="140" cy="92" r="4" />
      {/* nose + mouth */}
      <rect className="sw-dots-solid" x="116" y="106" width="9" height="6" rx="3" />
      <path d="M112 122 Q120 128 128 122" />
    </svg>
  );
}

// ─── MANDALORIAN: dot-art bust cradling Grogu, after the reference art ───
function Mandalorian() {
  return (
    <svg className="sw-mando sw-dots" viewBox="0 0 320 400" aria-label="Mandalorian holding Grogu, dot art">
      {/* cape flowing behind */}
      <path d="M52 224 Q16 300 24 380" />
      <path d="M208 224 Q254 300 246 380" />
      <path d="M24 380 Q135 398 246 382" />

      {/* helmet: wide squat dome */}
      <path d="M64 116 Q60 64 96 46 Q130 34 164 46 Q200 64 196 116 Q198 142 182 154 Q130 170 78 154 Q62 142 64 116 Z" />
      {/* top ridge */}
      <path d="M124 40 Q130 30 136 40" />
      {/* T-visor: eye band on top, stem down to the chin */}
      <path
        className="sw-visor"
        d="M74 90 Q135 80 196 90 L192 108 Q160 114 142 114 L142 148 Q130 152 118 148 L118 114 Q100 114 78 108 Z"
      />
      {/* neck seal */}
      <path d="M108 166 L108 178 Q130 188 152 178 L152 166" />

      {/* pauldrons */}
      <path d="M104 190 Q64 192 48 222 Q70 242 108 234 Z" />
      <path d="M156 190 Q196 192 212 222 Q190 242 152 234 Z" />

      {/* chest + abdomen plates */}
      <path d="M108 190 L152 190 L158 258 Q130 270 102 258 Z" />
      <path d="M130 190 L130 264" />
      <path d="M104 262 L156 262 L152 290 Q130 298 108 290 Z" />

      {/* Grogu in the crook of the arm */}
      <ellipse cx="186" cy="202" rx="40" ry="32" />
      <path d="M148 192 Q112 182 100 206 Q126 206 150 216 Z" />
      <path d="M224 192 Q260 182 272 206 Q246 206 222 216 Z" />
      <circle className="sw-dots-solid" cx="172" cy="200" r="5" />
      <circle className="sw-dots-solid" cx="198" cy="200" r="5" />
      <path d="M180 218 Q186 222 192 218" />
      {/* swaddle wrap */}
      <path d="M148 228 Q138 254 148 276 L224 276 Q234 250 222 228 Q186 242 148 228 Z" />
      <circle cx="212" cy="244" r="6" />

      {/* arms cradling the child */}
      <path d="M62 222 Q88 262 130 280" />
      <path d="M92 230 Q106 254 126 266" />
      <path d="M114 272 Q130 282 146 280" />
      <path d="M208 222 Q204 272 152 288" />
      <path d="M186 230 Q180 258 156 274" />
      <path d="M168 278 Q152 286 138 284" />
    </svg>
  );
}

export default function StarWarsPage() {
  return (
    <div className="sw-page">
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
        <Grogu />
        <p className="sw-copy">
          Small component. Massive impact. Like Grogu, the best UI pieces are tiny, charming, and
          quietly more powerful than they look — snacking on state and waving at users across the
          galaxy.
        </p>
      </SagaSection>

      {/* ─── Act III: The Bounty ─── */}
      <SagaSection chapter="CHAPTER III" title="THE BOUNTY" className="sw-mando-act">
        <Mandalorian />
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
            <svg viewBox="0 0 120 60" width="150">
              <path d="M10 30 L70 26 L104 30 L70 34 Z" fill="#cfd3d8" />
              <path d="M40 27 L18 6 L30 24 Z" fill="#b6bac0" />
              <path d="M40 33 L18 54 L30 36 Z" fill="#b6bac0" />
              <circle cx="98" cy="30" r="5" fill="#7ec8ff" />
              <circle cx="104" cy="30" r="2.5" fill="#fff" />
            </svg>
            <div className="sw-engine-trail" />
          </div>
          <div className="sw-tie">
            <svg viewBox="0 0 120 70" width="140">
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
