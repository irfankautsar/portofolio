/* ============================================================
   FOLIO v2 — sections
   ============================================================ */
const Icon = window.Icon2;

const NAV = [
  { id: 'about',          label: 'About' },
  { id: 'experience',     label: 'Experience' },
  { id: 'work',           label: 'Work' },
  { id: 'certifications', label: 'Certificate' },
  { id: 'skills',         label: 'Skills' },
  { id: 'education',      label: 'Education' },
  { id: 'contact',        label: 'Contact' },
];

/* ---------- Helpers ---------- */
function Split({ text, className = '', tag: Tag = 'span' }) {
  // Split into characters with stagger var
  const chars = [...text];
  let i = 0;
  return (
    <Tag className={`split ${className}`}>
      {chars.map((c, idx) => {
        if (c === ' ') return <span key={idx} className="ch sp"> </span>;
        const el = <span key={idx} className="ch" style={{ '--i': i }}>{c}</span>;
        i += 1;
        return el;
      })}
    </Tag>
  );
}

function Counter({ to, suffix = '', duration = 1400 }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        setV(Math.round(to * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function useTilt(max = 8) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.transform = `perspective(1100px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [max]);
  return ref;
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const [active, setActive] = React.useState('about');
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      let cur = 'about';
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav-brand">
          <span className="nav-mark">M<span className="acc">.</span></span>
          <span style={{ fontSize: 13 }}>Irfan Kautsar</span>
        </a>
        <div className="nav-links">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className={`nav-link ${active === n.id ? 'active' : ''}`}>{n.label}</a>
          ))}
        </div>
        <button className="theme-toggle" onClick={(e) => window.toggleTheme(e)} aria-label="Toggle theme" title="Toggle theme">
          <span className="tt-pill">
            <span className="tt-icon tt-sun" aria-hidden="true"><Icon name="sun" size={12} stroke={2.2}/></span>
            <span className="tt-icon tt-moon" aria-hidden="true"><Icon name="moon" size={12} stroke={2.2}/></span>
            <span className="tt-thumb" aria-hidden="true"/>
          </span>
        </button>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <Icon name={open ? 'close' : 'menu'} size={20}/>
        </button>
      </nav>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          {NAV.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>)}
        </div>
      )}
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [now, setNow] = React.useState('');
  React.useEffect(() => {
    const onMove = (e) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 22, y: (e.clientY / window.innerHeight - 0.5) * 22 });
    window.addEventListener('mousemove', onMove);
    const updateTime = () => {
      const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      setNow(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const i = setInterval(updateTime, 1000);
    return () => { window.removeEventListener('mousemove', onMove); clearInterval(i); };
  }, []);

  return (
    <section id="top" style={{ paddingTop: 130, paddingBottom: 40, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="wrap">
        <div className="hero-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'end' }}>

          {/* Headline column */}
          <div>
            <div className="rev" style={{ marginBottom: 28 }}>
              <span className="eyebrow"><span className="dot"/>Open to corporate · marketing · operations</span>
            </div>

            <h1 className="hero-h1">
              <span className="split-line"><Split text="Muhammad" /></span><br/>
              <span className="split-line">
                <Split text="Irfan" />
                <span> </span>
                <span className="split-line"><span className="serif hl"><Split text="Kautsar" /><span style={{ color: 'var(--accent)' }}>.</span></span></span>
              </span>
            </h1>

            <div className="hero-meta rev" data-delay="2">
              <div className="rule"/>
              <div className="hero-meta-grid">
                <div>
                  <div className="mono">Role</div>
                  <div className="hero-meta-val">Management Graduate</div>
                </div>
                <div>
                  <div className="mono">Based in</div>
                  <div className="hero-meta-val">Cilegon, Banten — ID</div>
                </div>
                <div>
                  <div className="mono">Local Time</div>
                  <div className="hero-meta-val mono" style={{ color: 'var(--ink)', fontSize: 16, letterSpacing: '0.06em' }}>{now} WIB</div>
                </div>
                <div>
                  <div className="mono">Currently</div>
                  <div className="hero-meta-val">Open to opportunities</div>
                </div>
              </div>
            </div>

            <p className="rev" data-delay="3" style={{ fontSize: 18, maxWidth: 560, marginTop: 36, lineHeight: 1.6 }}>
              Management graduate with hands-on experience in <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>CSR & General Affairs at PT Merak Chemicals Indonesia</strong> — coordinated community programs across literacy, nutrition and UMKM, built the team's first Instagram analytics dashboard in Power BI, and earned BNSP Marketing certification. Open to opportunities where strong execution, clear communication, and people-first thinking make an impact.
            </p>

            <div className="rev" data-delay="4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
              <a href="assets/Muhammad-Irfan-Kautsar-Resume.pdf" download className="btn primary mag" data-cursor="Get CV">
                <Icon name="download" size={16}/> Download CV
              </a>
              <a href="#contact" className="btn mag">
                <Icon name="mail" size={16}/> Get in touch
              </a>
            </div>
          </div>

          {/* Portrait column — magazine-style frame */}
          <div className="hero-photo">
            <div className="photo-frame"
              style={{ transform: `perspective(1400px) rotateY(${mouse.x * 0.35}deg) rotateX(${-mouse.y * 0.35}deg)` }}>
              <div className="photo-tape t1"/>
              <div className="photo-tape t2"/>
              <img src="assets/portrait.jpeg" alt="Muhammad Irfan Kautsar"/>
              <div className="photo-meta">
                <span className="mono">Jakarta · 2025</span>
              </div>
            </div>

            {/* Floating stamp — rotates with scroll */}
            <div className="stamp" data-rot="0.06">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <defs>
                  <path id="circ" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"/>
                </defs>
                <text fontFamily="JetBrains Mono" fontSize="9.5" letterSpacing="2.6" fill="currentColor">
                  <textPath href="#circ" startOffset="0">PORTFOLIO · 2026 · IRFAN KAUTSAR · </textPath>
                </text>
                <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                <text x="60" y="64" textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="18" fill="currentColor">m.</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Big stats row */}
        <div className="stats-row rev" data-delay="3">
          {[
            { k: 10, suf: '+', l: 'Programs documented' },
            { k: 16, suf: '',  l: 'Certifications earned' },
            { k: 8,  suf: '',  l: 'Core competencies' },
          ].map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-num">
                <Counter to={s.k} suffix={s.suf}/>
              </div>
              <div className="mono">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="rev scroll-hint" data-delay="4">
          <span className="mono">Scroll</span>
          <span className="scroll-arrow"><Icon name="arrow-down" size={14}/></span>
        </div>
      </div>

      <style>{`
        .hero-h1 { font-size: clamp(58px, 11vw, 168px); line-height: 0.88; margin-bottom: 32px; font-weight: 400; }
        .hero-meta {  margin-top: 12px; }
        .hero-meta .rule { height: 1px; background: var(--rule); margin-bottom: 22px; }
        .hero-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
        .hero-meta-val { font-size: 14px; color: var(--ink); font-weight: 500; margin-top: 4px; }

        .hero-photo { position: relative; padding: 0 20px; transform-style: preserve-3d; }
        .photo-frame {
          position: relative; aspect-ratio: 4/5;
          background: var(--paper-3); padding: 16px 16px 56px;
          box-shadow: var(--shadow-2);
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
          border-radius: 4px;
        }
        .photo-frame img { width: 100%; height: 100%; object-fit: cover; object-position: 55% 30%; display: block; filter: saturate(0.95) contrast(1.02); }
        .photo-meta { position: absolute; bottom: 16px; left: 0; right: 0; text-align: center; color: var(--ink-3); }
        .photo-tape {
          position: absolute; width: 84px; height: 22px;
          background: rgba(236,195,79,0.6);
          backdrop-filter: blur(2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .photo-tape.t1 { top: -10px; left: 30%; transform: rotate(-6deg); }
        .photo-tape.t2 { top: -10px; right: 22%; transform: rotate(8deg); }
        [data-theme="dark"] .photo-tape { background: rgba(232,121,74,0.4); }

        .stamp { position: absolute; right: -10px; bottom: 90px;
          width: 120px; height: 120px; color: var(--accent);
          opacity: 0.85; pointer-events: none;
        }

        .stats-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
          margin-top: 80px; padding-top: 28px;
          border-top: 1px solid var(--rule);
        }
        .stat { padding-right: 24px; border-right: 1px solid var(--rule); }
        .stat:last-child { border-right: none; }
        .stat-num {
          font-family: 'Fraunces', serif; font-weight: 400;
          font-size: clamp(40px, 5vw, 64px); line-height: 1; color: var(--ink);
          letter-spacing: -0.03em;
        }
        .stat .mono { margin-top: 10px; display: block; }

        .scroll-hint { display: flex; align-items: center; gap: 12px; margin-top: 56px; color: var(--ink-3); }
        .scroll-arrow {
          display: inline-grid; place-items: center;
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid var(--rule-2);
          animation: bob 2.4s ease-in-out infinite;
        }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        @media (max-width: 900px) {
          .hero-row { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-photo { max-width: 360px; margin-top: 40px; }
          .hero-meta-grid { grid-template-columns: 1fr 1fr; }
          .stats-row { grid-template-columns: 1fr 1fr; gap: 22px; padding-top: 22px; }
          .stat:nth-child(2n) { border-right: none; }
          .stat:nth-child(-n+1) { padding-bottom: 22px; border-bottom: 1px solid var(--rule); }
          .stat:nth-child(2) { padding-bottom: 22px; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function MarqueeStrip({ items = [] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">
            <Icon name="sparkles" size={18} stroke={1.6} style={{ color: 'var(--accent)' }}/>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const traits = [
    { icon: 'users',     title: 'Community Engagement', body: 'Connects authentically with communities around industrial operations and turns trust into long-term programs.' },
    { icon: 'shield',    title: 'CSR Involvement',       body: 'Supports corporate responsibility programs end-to-end — from planning through documentation and stakeholder reporting.' },
    { icon: 'briefcase', title: 'Operational Support',   body: 'Comfortable with the essential work of General Affairs: logistics, vendors, facility coordination, paperwork done right.' },
    { icon: 'message',   title: 'Communication',         body: 'Clear, calm, professional. At ease with village leaders, vendors, and corporate management alike.' },
    { icon: 'sparkles',  title: 'Adaptability',          body: 'Moves between strategic thinking and ground-level execution depending on what the moment needs.' },
    { icon: 'star',      title: 'Team Collaboration',    body: 'A steady supporting role — the person teams want around when timelines are tight and details matter.' },
  ];
  return (
    <section id="about">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">01</span><span className="mono numhead-label">About</span><span className="numhead-rule"/></div>

        <div className="about-head">
          <h2 className="rev">
            A behind-the-scenes operator with a <span className="serif hl">people-first instinct.</span>
          </h2>
          <div className="about-aside rev" data-delay="2">
            <div className="mono">Note</div>
            <p style={{ marginTop: 10, fontSize: 15 }}>
              I learned business by studying it — and learned operations by doing it. My internship at a chemicals plant taught me that General Affairs and CSR aren't side functions; they're how a company shows up in the world.
            </p>
          </div>
        </div>

        <div className="about-grid" style={{ marginTop: 64 }}>
          {traits.map((t, i) => {
            const ref = useTilt(4);
            return (
              <div ref={ref} key={i} className="about-card card tilt rev" data-delay={(i % 3) + 1}>
                <div className="about-card-num mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="about-card-ico"><Icon name={t.icon} size={22} stroke={1.5}/></div>
                <h4>{t.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-2)' }}>{t.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-head { display: grid; grid-template-columns: 2fr 1fr; gap: 56px; align-items: flex-end; }
        .about-aside { padding-left: 22px; border-left: 1px solid var(--rule); }
        .about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .about-card { padding: 28px; display: flex; flex-direction: column; gap: 12px; position: relative; }
        .about-card-num { position: absolute; top: 18px; right: 22px; }
        .about-card-ico {
          width: 48px; height: 48px; border-radius: 14px;
          background: var(--paper-3); border: 1px solid var(--rule-2);
          display: grid; place-items: center; color: var(--accent);
        }
        @media (max-width: 900px) {
          .about-head { grid-template-columns: 1fr; gap: 28px; }
          .about-aside { padding-left: 0; border-left: none; padding-top: 16px; border-top: 1px solid var(--rule); }
          .about-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const items = [
    {
      role: 'General Affairs',
      company: 'PT Merak Chemicals Indonesia',
      where: 'Cilegon, Banten',
      period: '2025 — 2026',
      type: 'GA Division',
      icon: 'briefcase',
      bullets: [
        'Supported daily operations — logistics handling, inventory monitoring, and workspace organization.',
        'Provided proactive support to ensure smooth day-to-day execution across the office.',
        'Maintained cleanliness, safety, and efficiency in the working environment.',
      ],
    },
    {
      role: 'Corporate Social Responsibility',
      company: 'PT Merak Chemicals Indonesia',
      where: 'Cilegon, Banten',
      period: '2025 — 2026',
      type: 'CSR Programs',
      icon: 'users',
      bullets: [
        'Organized and supported social programs involving local communities, families, and children.',
        'Engaged directly with community members and ensured program effectiveness.',
        'Conducted documentation and reporting of activities, including participant tracking and outcomes.',
        'Built the team\'s first Instagram analytics dashboard in Power BI to track social KPIs.',
      ],
    },
  ];
  return (
    <section id="experience">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">02</span><span className="mono numhead-label">Experience</span><span className="numhead-rule"/></div>

        <h2 className="rev" style={{ marginBottom: 56 }}>
          Where the <span className="serif hl">work</span> happened.
        </h2>

        <div className="exp-stack">
          {items.map((it, i) => {
            const ref = useTilt(2);
            return (
              <article ref={ref} key={i} className="exp-card card tilt rev" data-delay={(i % 2) + 1}>
                <div className="exp-row">
                  <div className="exp-icon"><Icon name={it.icon} size={22} stroke={1.5}/></div>
                  <div className="exp-head">
                    <span className="mono" style={{ color: 'var(--accent)' }}>{it.type}</span>
                    <h3>{it.role}</h3>
                    <div className="exp-sub">
                      <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{it.company}</span>
                      <span className="exp-bullet-sep">·</span>
                      <span><Icon name="pin" size={12}/> {it.where}</span>
                    </div>
                  </div>
                  <span className="exp-period">
                    <Icon name="calendar" size={12}/> {it.period}
                  </span>
                </div>

                <ul className="exp-bullets">
                  {it.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="bullet-mark">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .exp-stack { display: flex; flex-direction: column; gap: 18px; }
        .exp-card { padding: 36px; }
        .exp-row { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 22px; }
        .exp-icon {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: var(--paper-3); border: 1px solid var(--rule-2);
          display: grid; place-items: center; color: var(--accent);
        }
        .exp-head { flex: 1; min-width: 220px; }
        .exp-head h3 { margin-top: 6px; margin-bottom: 6px; }
        .exp-sub { color: var(--ink-2); font-size: 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .exp-sub span { display: inline-flex; align-items: center; gap: 6px; }
        .exp-bullet-sep { color: var(--ink-3); }
        .exp-period {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 999px;
          background: var(--paper-3); border: 1px solid var(--rule);
          font-size: 12px; color: var(--ink-2);
        }
        .exp-bullets { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; padding-top: 22px; border-top: 1px solid var(--rule); }
        .exp-bullets li { display: flex; gap: 14px; font-size: 14.5px; color: var(--ink-2); line-height: 1.6; }
        .bullet-mark { color: var(--accent); flex-shrink: 0; margin-top: 6px; font-size: 8px; }
      `}</style>
    </section>
  );
}

/* ---------- AFTER MOVIE PLAYER ---------- */
function AfterMovie() {
  const aRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  const [cur, setCur] = React.useState(0);
  const [dur, setDur] = React.useState(0);
  const fmt = s => isFinite(s) ? `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}` : '0:00';
  const toggle = () => { const a = aRef.current; if (!a) return; a.paused ? a.play() : a.pause(); };
  const seek = (e) => { const a = aRef.current; if (!a || !dur) return; const r = e.currentTarget.getBoundingClientRect(); a.currentTime = ((e.clientX - r.left) / r.width) * dur; };
  React.useEffect(() => {
    const a = aRef.current; if (!a) return;
    const onPlay = () => setPlay(true);
    const onPause = () => setPlay(false);
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration);
    a.addEventListener('play', onPlay); a.addEventListener('pause', onPause);
    a.addEventListener('timeupdate', onTime); a.addEventListener('loadedmetadata', onMeta);
    return () => { a.removeEventListener('play', onPlay); a.removeEventListener('pause', onPause); a.removeEventListener('timeupdate', onTime); a.removeEventListener('loadedmetadata', onMeta); };
  }, []);
  const pct = dur ? (cur/dur)*100 : 0;
  return (
    <div className="rev am-card card">
      <div className="am-cover" onClick={toggle} role="button" aria-label={play ? 'Pause' : 'Play'} data-cursor={play ? 'Pause' : 'Play'}>
        <img src="assets/after-movie-cover.jpg" alt="After Movie"/>
        <div className="am-shade"/>
        <div className="am-tag">After Movie · 2026</div>
        <a href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing"
           target="_blank" rel="noopener noreferrer" className="am-ext"
           onClick={(e) => e.stopPropagation()}>
          <Icon name="arrow-up-right" size={13}/> Full film
        </a>
        <div className={`am-play ${play ? 'on' : ''}`}>
          {play ? <Icon name="pause" size={26}/> : <Icon name="play" size={26}/>}
        </div>
        {play && (
          <div className="am-eq" aria-hidden>
            {[0,1,2,3,4].map(i => <span key={i} style={{ animationDelay: `${i*0.12}s` }}/>)}
          </div>
        )}
        <div className="am-ctrl" onClick={(e) => e.stopPropagation()}>
          <span className="mono am-t">{fmt(cur)}</span>
          <div className="am-bar" onClick={seek}>
            <div className="am-fill" style={{ width: pct+'%' }}/>
            <div className="am-thumb" style={{ left: pct+'%' }}/>
          </div>
          <span className="mono am-t">{dur ? fmt(dur) : '—:—'}</span>
        </div>
        <audio ref={aRef} src="assets/after-movie.mp3" preload="metadata"/>
      </div>

      <div className="am-info">
        <span className="mono" style={{ color: 'var(--accent)' }}>Film · Documentary</span>
        <h3 style={{ marginTop: 10, marginBottom: 14 }}>MCCI Trainee Program — <span className="serif">After Movie</span></h3>
        <p style={{ fontSize: 14.5 }}>
          A short documentary made by the MCCI trainee team to close out the program — capturing the people, the work, and the small moments that made the year meaningful. Shot on-site at PT Merak Chemicals Indonesia and edited entirely in-house.
        </p>
        <div className="am-credits">
          {[
            { r: 'Director', n: 'MCCI Trainee Team', s: 'Concept · Creative direction' },
            { r: 'Editor', n: 'MCCI Trainee Team', s: 'Post-production · Color · Sound' },
            { r: 'Cinematography', n: 'MCCI Trainee Team', s: 'Camera · On-set capture' },
          ].map((c, i) => (
            <div key={i}>
              <div className="mono">{c.r}</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>{c.n}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.s}</div>
            </div>
          ))}
        </div>
        <div className="am-ctas">
          <a href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn accent mag" data-cursor="Watch">
            <Icon name="play" size={14}/> Watch full film
          </a>
          <a href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn mag">
            <Icon name="arrow-up-right" size={14}/> Open on Drive
          </a>
        </div>
      </div>

      <style>{`
        .am-card { display: grid; grid-template-columns: 1.15fr 1fr; padding: 0; overflow: hidden; margin-bottom: 18px; }
        .am-cover { position: relative; min-height: 420px; overflow: hidden; cursor: pointer; border-right: 1px solid var(--rule); }
        .am-cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.78); transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .am-cover:hover img { transform: scale(1.04); }
        .am-shade { position: absolute; inset: 0; background:
          radial-gradient(ellipse at 30% 40%, rgba(200,85,42,0.25), transparent 55%),
          linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.75) 100%); pointer-events: none; }
        .am-tag, .am-ext {
          position: absolute; top: 18px; padding: 7px 14px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          background: rgba(255,255,255,0.92); color: #1a1410; backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.06);
          display: inline-flex; align-items: center; gap: 6px;
        }
        .am-tag { left: 18px; }
        .am-ext { right: 18px; text-decoration: none; transition: all 0.25s ease; }
        .am-ext:hover { background: var(--accent); color: #fff; }
        .am-play {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 88px; height: 88px; border-radius: 50%;
          background: rgba(255,255,255,0.94); color: #1a1410;
          display: grid; place-items: center;
          box-shadow: 0 20px 60px -10px rgba(0,0,0,0.5);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .am-cover:hover .am-play { transform: translate(-50%,-50%) scale(1.08); }
        .am-play.on { background: var(--accent); color: var(--on-accent); box-shadow: 0 20px 60px -10px rgba(0,0,0,0.5), 0 0 0 10px rgba(200,85,42,0.18); }
        .am-eq { position: absolute; bottom: 84px; left: 50%; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 4px; height: 26px; pointer-events: none; }
        .am-eq span { display: block; width: 3px; height: 100%; background: var(--accent); border-radius: 2px; box-shadow: 0 0 10px var(--accent-glow); transform-origin: bottom; animation: eq 0.9s ease-in-out infinite alternate; }
        @keyframes eq { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }
        .am-ctrl { position: absolute; left: 24px; right: 24px; bottom: 22px; display: flex; align-items: center; gap: 14px; color: #fff; }
        .am-t { color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,0.5); min-width: 36px; }
        .am-bar { flex: 1; height: 4px; border-radius: 99px; background: rgba(255,255,255,0.3); position: relative; cursor: pointer; }
        .am-fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--accent); border-radius: 99px; box-shadow: 0 0 10px var(--accent-glow); }
        .am-thumb { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; background: #fff; transform: translate(-50%,-50%); opacity: 0; transition: opacity 0.2s ease; }
        .am-bar:hover .am-thumb { opacity: 1; }

        .am-info { padding: clamp(28px, 4vw, 44px); display: flex; flex-direction: column; gap: 16px; justify-content: center; }
        .am-credits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px; border: 1px solid var(--rule); border-radius: 14px; background: var(--paper-3); }
        .am-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
        @media (max-width: 900px) {
          .am-card { grid-template-columns: 1fr; }
          .am-cover { border-right: none; border-bottom: 1px solid var(--rule); min-height: 320px; }
          .am-credits { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

/* ---------- POWER BI FEATURE ---------- */
function PowerBI() {
  return (
    <div className="rev pbi-card card">
      <div className="pbi-img">
        <img src="assets/powerbi-dashboard.png" alt="Power BI Dashboard"/>
        <div className="pbi-tag">Featured Project</div>
      </div>
      <div className="pbi-body">
        <span className="mono" style={{ color: 'var(--accent)' }}>Power BI · Analytics</span>
        <h3 style={{ marginTop: 10, marginBottom: 12 }}>Instagram Performance Dashboard</h3>
        <p style={{ fontSize: 14.5 }}>
          Built for PT Merak Chemicals Indonesia to track social media health at a glance — surfacing follower and likes growth, engagement rate, and month-over-month trends.
        </p>
        <div className="pbi-kpi">
          {[{ k: 391, l: 'Followers' }, { k: 635, l: 'Likes' }, { k: 87, l: 'Comments' }, { k: 10, l: 'Posts' }].map((s, i) => (
            <div key={i}>
              <div className="pbi-num"><Counter to={s.k}/></div>
              <div className="mono">{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {['Power BI', 'DAX', 'Data Modeling', 'Social KPIs', 'Reporting'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="pbi-meta">
          <span><Icon name="calendar" size={12}/> Oct 2025 — Mar 2026</span>
          <span><Icon name="briefcase" size={12}/> PT Merak Chemicals Indonesia</span>
        </div>
      </div>
      <style>{`
        .pbi-card { display: grid; grid-template-columns: 1.05fr 1fr; padding: 0; overflow: hidden; margin-bottom: 18px; }
        .pbi-img { position: relative; background: var(--paper-3); display: grid; place-items: center; padding: 28px; min-height: 360px; border-right: 1px solid var(--rule); }
        .pbi-img img { width: 100%; height: auto; border-radius: 8px; box-shadow: var(--shadow-2); }
        .pbi-tag { position: absolute; top: 18px; left: 18px; padding: 6px 12px; border-radius: 999px;
          background: rgba(255,255,255,0.92); color: var(--accent); border: 1px solid var(--rule);
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; }
        .pbi-body { padding: clamp(28px, 4vw, 44px); display: flex; flex-direction: column; gap: 14px; justify-content: center; }
        .pbi-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 16px; border: 1px solid var(--rule); border-radius: 14px; background: var(--paper-3); margin-top: 4px; }
        .pbi-num { font-family: 'Fraunces', serif; font-weight: 400; font-size: 26px; letter-spacing: -0.02em; color: var(--ink); line-height: 1; }
        .chip { padding: 5px 12px; border-radius: 999px; font-size: 11px; color: var(--ink-2); background: var(--paper-3); border: 1px solid var(--rule); }
        .pbi-meta { display: flex; gap: 18px; flex-wrap: wrap; font-size: 12px; color: var(--ink-3); margin-top: 8px; }
        .pbi-meta span { display: inline-flex; align-items: center; gap: 6px; }
        @media (max-width: 900px) {
          .pbi-card { grid-template-columns: 1fr; }
          .pbi-img { border-right: none; border-bottom: 1px solid var(--rule); min-height: 280px; }
          .pbi-kpi { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}

/* ---------- ACTIVITIES BENTO + LIGHTBOX ---------- */
const ACTIVITIES = [
  { src: 'assets/activities/forum-csr-cilegon.jpg', tag: 'CSR Forum', title: 'Cilegon City CSR Forum', year: '2026', location: 'Cilegon · Banten', partners: ['Pemkot Cilegon', 'TNI/POLRI', 'Forum CSR Banten'], desc: 'Inter-corporate gathering convened by the city government to coordinate CSR programs across local industry. Representatives from MCCI, TNI/POLRI, and other Banten companies aligning priorities for the year ahead.', role: 'Attended on behalf of MCCI Corporate Affairs — networking with fellow CSR practitioners and capturing key talking points.', span: 'wide' },
  { src: 'assets/activities/team-corporate-affairs.jpg', tag: 'Team', title: 'Corporate Affairs Trainees', year: '2026', location: 'MCCI HQ Lobby', partners: ['Corporate Affairs Team'], desc: 'The MCCI Corporate Affairs trainee cohort in front of the lobby wall — "Harmonize for Sustainable Growth". Four trainees, one mission: support every CSR program the division puts out.', role: 'Day-to-day teammate alongside three other trainees, splitting fieldwork and documentation.' },
  { src: 'assets/activities/kacang-umpet.jpg', tag: 'UMKM · Branding', title: 'Kacang Umpet — Product Poster', year: '2025', location: 'Gemara, Cilegon Banten', partners: ['UMKM Gemara', 'MCCI', 'BPOM Halal'], desc: 'Promotional poster for "Kacang Umpet", a 150g traditional snack from an MCCI-mentored UMKM. The label carries the MCCI sponsorship mark and Indonesian Halal certification.', role: 'Helped coordinate visual direction, sponsor placement, and Halal-mark compliance.', span: 'tall' },
  { src: 'assets/activities/saung-aksara.jpg', tag: 'CSR · Literacy', title: 'Saung Aksara — Reading Room', year: '2025', location: 'Village near Cilegon', partners: ['Local volunteers', 'MCCI CSR'], desc: 'A village reading room funded by MCCI\'s Saung Aksara program — children with hands raised and shelves stacked with donated books. The closest thing to a library for many of the kids here.', role: 'Logistics support during the launch and follow-up documentation for the CSR report.' },
  { src: 'assets/activities/ayam-petelur.jpg', tag: 'CSR · Livelihood', title: 'Ayam Petelur — Layer Hen Farm', year: '2026', location: 'Community farm, Banten', partners: ['Local farmer co-op', 'MCCI CSR'], desc: 'Inside the community-run layer hen barn supported by MCCI — neat rows of cages and a small whiteboard tracking production. A sustainable-livelihood program designed for ongoing income.', role: 'Field visit to verify progress, photograph the operation, and write the monthly progress note.' },
  { src: 'assets/activities/umkm-kegiatan.jpg', tag: 'UMKM · Training', title: 'Rumah Siap Kerja — Culinary Workshop', year: '2025', location: 'Klinik UMKM Diskop Cilegon', partners: ['Diskop Kota Cilegon', 'MCCI'], desc: 'Hands-on culinary workshop under the city\'s "Rumah Siap Kerja" program — kuliner, kerajinan, and marketing modules rolled into one.', role: 'On-site documentation; wrote the recap shared with Diskop Cilegon and MCCI management.' },
  { src: 'assets/activities/umkm-produk.jpg', tag: 'UMKM · Graduation', title: 'UMKM Closing Ceremony', year: '2025', location: 'Klinik UMKM Diskop Cilegon', partners: ['Diskop Kota Cilegon', 'MCCI'], desc: 'Graduation day for the UMKM cohort — participants holding the finished yellow-packaged snack they produced and branded over the program.', role: 'Coordinated the closing event and captured the cohort portrait for the program report.' },
  { src: 'assets/activities/kebun-gizi.jpg', tag: 'CSR · UMKM', title: 'UMKM Producer — Kebun Gizi', year: '2025', location: 'Village UMKM site, Banten', partners: ['Village producer', 'MCCI'], desc: 'A UMKM producer holding the finished "Kacang Umpet" retail pack at her village home, the Kebun Gizi nutrition garden plots visible behind her.', role: 'Field visit and producer interview; photo used in the social-media and report rollout.' },
  { src: 'assets/activities/nelayan.jpg', tag: 'CSR · Fisheries', title: 'CSR MCCI × KKP — Fisheries Support', year: '2025', location: 'Coastal community, Banten', partners: ['KKP', 'MCCI'], desc: 'An officer from KKP and an MCCI representative present the "CSR MCCI Support Fisheries with KKP" sign — water-storage drums ready for handover to the local fishing community.', role: 'Coordinated logistics with the KKP focal point and documented the handover.' },
  { src: 'assets/activities/nelayan-kkp.jpg', tag: 'CSR · Ramadhan', title: 'Donasi Ramadhan & Idul Fitri 1447H', year: '2026', location: 'Fishing community, Banten', partners: ['Local fisherman community', 'MCCI'], desc: 'Handover photo with members of a coastal community — MCCI placard, packed white sembako bags lined up at their feet, ready for distribution.', role: 'Part of the on-site MCCI team — handover, distribution flow, and documentation.' },
  { src: 'assets/activities/mudik-walikota.jpg', tag: 'Community Event', title: 'Mudik Gratis 2026 — Opening Ceremony', year: '2026', location: 'Cilegon City Square', partners: ['Walikota Cilegon', 'TNI/POLRI', 'Bank BJB', 'MCCI'], desc: 'Stage line-up at the official opening — the Mayor of Cilegon center-stage flanked by TNI, POLRI, Garnisun, and Dishub officers with corporate partners including MCCI behind.', role: 'On-site as MCCI Corporate Affairs documentation lead for the ceremony.', span: 'wide' },
  { src: 'assets/activities/mudik-bus.jpg', tag: 'Documentation', title: 'Mudik Gratis — Cilegon → Semarang, Bus #27', year: '2026', location: 'Cilegon departure point', partners: ['Pemkot Cilegon', 'MCCI'], desc: 'Bus 27 of the Mudik Gratis fleet — sponsored by MCCI. Captured at departure before the run-down call with passengers.', role: 'Captured per-bus departure documentation used across MCCI socials and the Pemkot report.' },
  { src: 'assets/activities/idul-adha.jpg', tag: 'CSR · Idul Adha', title: 'Qurban Prep — Villa Ternak', year: '2025', location: 'Villa Ternak / Villa Qurban', partners: ['Villa Qurban', 'MCCI'], desc: 'Sheep and goats lined up at the partner farm during Qurban procurement for MCCI\'s Idul Adha program. Livestock dispatched to surrounding mosques for meat distribution.', role: 'Site visit for livestock verification (count, condition, certification) before the program ran.' },
  { src: 'assets/activities/sembako-ramadhan.jpg', tag: 'CSR · Ramadhan', title: 'Beras Donasi Idul Fitri 2026', year: '2026', location: 'Cilegon distribution point', partners: ['Local community partners', 'MCCI'], desc: 'Pickup truck stacked with bags of donated rice — each stamped "Beras Donasi Hari Raya Idul Fitri Tahun 2026 · MCCI · Harmonize for Sustainable Growth".', role: 'Helped coordinate packing, loading, and distribution logistics across multiple drop points.' },
  { src: 'assets/activities/industry-tour-its.jpg', tag: 'Industry · Hosting', title: 'ITS K63 Study Excursion', year: '2026', location: 'MCCI Administration Building', partners: ['Teknik Kimia ITS Surabaya', 'MCCI'], desc: 'Sixty-plus Chemical Engineering students from ITS Surabaya on their 21–24 April 2026 Study Excursion — hosted at MCCI for a plant tour and Corporate Affairs Q&A.', role: 'Front-of-house coordination for guest reception, welcome materials, and group portrait.' },
  { src: 'assets/activities/powerbi-presentation.jpg', tag: 'Reporting · Internal', title: 'Power BI Presentation — "My Task"', year: '2026', location: 'MCCI Meeting Room', partners: ['Corporate Affairs Team'], desc: 'Walking the team through the scope of what trainees support: proposal review, program prep, stakeholder communication, content scheduling, and Instagram analytics through Power BI.', role: 'Owned the Instagram analytics & content-calendar workstream; presented findings to the team.' },
];

function Activities() {
  const [idx, setIdx] = React.useState(null);
  const open = idx !== null ? ACTIVITIES[idx] : null;

  React.useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % ACTIVITIES.length);
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + ACTIVITIES.length) % ACTIVITIES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [idx]);

  return (
    <>
      <div className="rev gallery-head">
        <div>
          <span className="mono">// activity log · {ACTIVITIES.length} entries</span>
          <h3 style={{ marginTop: 6 }}>Activity Gallery</h3>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 320 }}>
          Click any photo to open full notes, role, and partners. <span className="dimmer">← → to navigate · Esc to close</span>
        </p>
      </div>
      <div className="bento">
        {ACTIVITIES.map((a, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`bento-cell rev ${a.span || ''}`} data-cursor="Open" aria-label={`Open ${a.title}`}>
            <img src={a.src} alt={a.title} loading="lazy"/>
            <div className="bento-grad"/>
            <div className="bento-tag">{a.tag}</div>
            <div className="bento-info">
              <h4>{a.title}</h4>
              <div className="mono">{a.year} · {a.location}</div>
            </div>
            <div className="bento-zoom" aria-hidden><Icon name="plus" size={14}/></div>
          </button>
        ))}
      </div>

      {open && (
        <div className="lb" onClick={(e) => { if (e.target.classList.contains('lb')) setIdx(null); }} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={() => setIdx(null)} aria-label="Close"><Icon name="close" size={18}/></button>
          <button className="lb-prev" onClick={() => setIdx((idx - 1 + ACTIVITIES.length) % ACTIVITIES.length)} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="lb-next" onClick={() => setIdx((idx + 1) % ACTIVITIES.length)} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="lb-card">
            <div className="lb-img"><img src={open.src} alt={open.title}/></div>
            <div className="lb-body">
              <div className="lb-tag"><span className="dot"/>{open.tag}</div>
              <h3 style={{ fontSize: 'clamp(24px, 2.4vw, 34px)' }}>{open.title}</h3>
              <div className="lb-meta">
                <span><Icon name="calendar" size={12}/> {open.year}</span>
                <span><Icon name="pin" size={12}/> {open.location}</span>
                <span><Icon name="briefcase" size={12}/> PT Merak Chemicals Indonesia</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>{open.desc}</p>
              <div className="lb-section">
                <div className="mono">My role</div>
                <p className="lb-role">{open.role}</p>
              </div>
              {open.partners?.length > 0 && (
                <div className="lb-section">
                  <div className="mono">Partners</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {open.partners.map((p, j) => <span key={j} className="chip">{p}</span>)}
                  </div>
                </div>
              )}
              <div className="lb-foot">
                <span className="mono" style={{ color: 'var(--accent)' }}>{String(idx + 1).padStart(2, '0')} / {String(ACTIVITIES.length).padStart(2, '0')}</span>
                <span className="mono dimmer">← → keys · Esc to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-top: 36px; margin-bottom: 18px; }
        .bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; gap: 12px; grid-auto-flow: dense; }
        .bento-cell.wide { grid-column: span 2; }
        .bento-cell.tall { grid-row: span 2; }
        .bento-cell {
          position: relative; overflow: hidden; border-radius: 16px;
          border: 1px solid var(--rule); background: var(--paper-3);
          cursor: pointer; padding: 0; font-family: inherit; color: inherit; text-align: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.4s ease;
        }
        .bento-cell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(0.95) brightness(0.92); transition: transform 0.65s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease; }
        .bento-cell:hover { transform: translateY(-3px); border-color: var(--rule-2); box-shadow: var(--shadow-2); }
        .bento-cell:hover img { transform: scale(1.06); filter: saturate(1.05) brightness(1); }
        .bento-cell:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .bento-grad { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 45%, rgba(0,0,0,0.78) 100%); pointer-events: none; }
        .bento-tag { position: absolute; top: 12px; left: 12px; padding: 5px 10px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          background: rgba(255,255,255,0.92); color: var(--accent-2); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.06); }
        .bento-info { position: absolute; left: 14px; right: 14px; bottom: 12px; color: #fff; }
        .bento-info h4 { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; margin: 0 0 4px; letter-spacing: -0.01em; color: #fff; }
        .bento-info .mono { color: rgba(255,255,255,0.7); }
        .bento-zoom { position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.92); color: #1a1410; display: grid; place-items: center;
          opacity: 0; transform: scale(0.85); transition: all 0.35s cubic-bezier(0.16,1,0.3,1); border: 1px solid rgba(0,0,0,0.06); }
        .bento-cell:hover .bento-zoom { opacity: 1; transform: scale(1); background: var(--accent); color: var(--on-accent); }

        .lb { position: fixed; inset: 0; z-index: 9999; background: rgba(20,16,12,0.65); backdrop-filter: blur(22px); display: grid; place-items: center; padding: 32px; animation: lbFade 0.3s ease; }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
        .lb-card { width: 100%; max-width: 1180px; max-height: calc(100vh - 64px); background: var(--paper-2); border: 1px solid var(--rule-2); border-radius: 22px; overflow: hidden;
          display: grid; grid-template-columns: 1.2fr 1fr; box-shadow: 0 60px 120px -40px rgba(0,0,0,0.5);
          animation: lbPop 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes lbPop { 0% { opacity: 0; transform: scale(0.96) translateY(12px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        .lb-card img, .lb-body { transition: opacity 0.25s ease; }
        .lb-img { position: relative; background: var(--paper-3); display: grid; place-items: center; min-height: 320px; }
        .lb-img img { width: 100%; height: 100%; object-fit: contain; max-height: calc(100vh - 64px); }
        .lb-body { padding: 40px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }
        .lb-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          background: var(--accent-soft); color: var(--accent); border: 1px solid var(--accent); align-self: flex-start; }
        .lb-tag .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
        .lb-meta { display: flex; flex-wrap: wrap; gap: 14px; padding-bottom: 16px; border-bottom: 1px solid var(--rule); color: var(--ink-3); font-size: 12px; }
        .lb-meta span { display: inline-flex; align-items: center; gap: 6px; }
        .lb-section .mono { margin-bottom: 6px; }
        .lb-role { font-size: 14px; color: var(--ink-2); padding-left: 14px; border-left: 2px solid var(--accent); margin: 0; }
        .lb-foot { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; gap: 12px; }

        .lb-close, .lb-prev, .lb-next { position: fixed; z-index: 10000; width: 44px; height: 44px; border-radius: 50%;
          background: var(--paper-2); border: 1px solid var(--rule-2); color: var(--ink); display: grid; place-items: center; cursor: pointer; transition: all 0.25s ease; }
        .lb-close { top: 24px; right: 24px; }
        .lb-prev { top: 50%; left: 24px; transform: translateY(-50%); }
        .lb-next { top: 50%; right: 24px; transform: translateY(-50%); }
        .lb-close:hover, .lb-prev:hover, .lb-next:hover { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }

        @media (max-width: 1100px) { .bento { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; } }
        @media (max-width: 900px) {
          .lb-card { grid-template-columns: 1fr; }
          .lb-body { padding: 28px; }
          .lb-img { min-height: 260px; max-height: 40vh; }
        }
        @media (max-width: 720px) {
          /* Uniform 2-col grid — dense wide/tall spans leave holes on phones */
          .bento { grid-template-columns: 1fr 1fr; grid-auto-rows: 150px; }
          .bento-cell.wide, .bento-cell.tall { grid-column: auto; grid-row: auto; }
          .bento-zoom { opacity: 1; transform: scale(1); }
          .lb { padding: 0; }
          .lb-card {
            display: block; border-radius: 0; max-width: 100%; width: 100%;
            height: 100dvh; max-height: 100dvh; overflow-y: auto; -webkit-overflow-scrolling: touch;
          }
          .lb-img { min-height: 0; height: 42dvh; max-height: 42dvh; }
          .lb-img img { max-height: 42dvh; }
          .lb-body { padding: 24px; }
        }
      `}</style>
    </>
  );
}

/* ---------- WORK ---------- */
function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">03</span><span className="mono numhead-label">Selected Work</span><span className="numhead-rule"/></div>
        <h2 className="rev" style={{ marginBottom: 24 }}>
          Real <span className="serif hl">work,</span> real impact.
        </h2>
        <p className="rev" data-delay="1" style={{ fontSize: 16, maxWidth: 680, marginBottom: 48 }}>
          A featured short film & analytics project alongside a documented portfolio of CSR, community, and corporate-affairs activities from PT Merak Chemicals Indonesia.
        </p>

        <AfterMovie/>
        <PowerBI/>
        <Activities/>
      </div>
    </section>
  );
}

/* ---------- CERTIFICATIONS ---------- */
function Certifications() {
  const featured = [
    { tier: 'BNSP · National Competence', title: 'Marketing', sub: 'Sertifikasi Kompetensi', issuer: 'Badan Nasional Sertifikasi Profesi', issuerSub: 'Government-recognized competence · Republic of Indonesia', score: 'KOMPETEN', scoreLabel: 'Status', date: '2026', ref: 'BNSP · Marketing', pdf: 'assets/certs/Sertifikat-BNSP-Marketing.pdf', icon: 'megaphone', accent: 'gold' },
    { tier: 'Kemnaker RI · MCCI', title: 'Internship', sub: 'Higher-Education Internship', issuer: 'Kementerian Ketenagakerjaan RI', issuerSub: '6-month program · Administrasi · PT MCCI', score: 'Sangat Baik', scoreLabel: 'Predikat', date: 'May 2026', ref: 'MN.036.012371.02.2025', pdf: 'assets/Sertifikat-Magang.pdf', icon: 'shield', accent: 'ink' },
  ];
  const skills = [
    { title: 'Design Thinking',     score: '100', date: '02 Jan 2026', pdf: 'assets/certs/Sertifikat-Design-Thinking.pdf', icon: 'sparkles' },
    { title: 'Self Efficacy',       score: '100', date: '11 Feb 2026', pdf: 'assets/certs/Sertifikat-Self-Efficacy.pdf', icon: 'target' },
    { title: 'Emotional Intelligence', score: '80', date: '25 Feb 2026', pdf: 'assets/certs/Sertifikat-Emotional-Intelligence.pdf', icon: 'message' },
  ];
  const training = [
    { title: 'Effective Business Communication', sub: 'Komunikasi Bisnis yang Efektif', date: '21 Feb – 04 Mar 2022', year: '2022', ref: 'NO. 096573', pdf: 'assets/certs/Sertifikat-Effective-Business-Communication.pdf', icon: 'message' },
    { title: 'Marketing Environment Analysis', sub: 'Analisis Lingkungan Pemasaran', date: '20 – 25 Jun 2022', year: '2022', ref: 'NO. 218305', pdf: 'assets/certs/Sertifikat-Marketing-Environment-Analysis.pdf', icon: 'eye' },
    { title: 'Brevet Pajak Online', sub: 'Tax Brevet · Income, VAT, PBB, BPHTB', date: '21 – 25 Nov 2022', year: '2022', ref: 'NO. 706738', pdf: 'assets/certs/Sertifikat-Brevet-Pajak.pdf', icon: 'doc' },
    { title: 'Corporate Income Taxes', sub: 'Pajak Penghasilan Perusahaan', date: '20 Jan 2023', year: '2023', ref: 'NO. 731710', pdf: 'assets/certs/Sertifikat-Corporate-Income-Taxes.pdf', icon: 'briefcase' },
    { title: 'Marketing Research Planning', sub: 'Perencanaan Riset Pemasaran', date: '27 Feb – 04 Mar 2023', year: '2023', ref: 'NO. 584874', pdf: 'assets/certs/Sertifikat-Marketing-Research-Planning.pdf', icon: 'target' },
    { title: 'Development of Brand Promotion Strategy', sub: 'Pengembangan Strategi Promosi Merek', date: '19 – 24 Jun 2023', year: '2023', ref: 'NO. 891489', pdf: 'assets/certs/Sertifikat-Brand-Promotion-Strategy.pdf', icon: 'megaphone' },
    { title: 'E-Marketing Strategies Planner', sub: 'Perencana Strategi Pemasaran Elektronik', date: '19 Feb – 02 Mar 2024', year: '2024', ref: 'NO. 745548', pdf: 'assets/certs/Sertifikat-E-Marketing-Strategies.pdf', icon: 'lightning' },
    { title: 'Development & Implementation of Business Strategy', sub: 'Pengembangan dan Penerapan Strategi Bisnis', date: '24 – 29 Jun 2024', year: '2024', ref: 'NO. 127481', pdf: 'assets/certs/Sertifikat-Business-Strategy.pdf', icon: 'lightning' },
    { title: 'Service Design, Reputation & Sales Strategy', sub: 'Desain Layanan · Reputasi · Ekspansi Global', date: '23 – 28 Sep 2024', year: '2024', ref: 'NO. 260809', pdf: 'assets/certs/Sertifikat-Service-Design-Sales-Strategy.pdf', icon: 'star' },
    { title: 'Aptitude Test', sub: 'Fakultas Psikologi · Universitas Gunadarma', date: '08 Mar 2025', year: '2025', ref: 'NO. 637554/AT/FPSI/2025', pdf: 'assets/certs/Sertifikat-Aptitude-Test.pdf', icon: 'check' },
    { title: 'Team Leadership & Credit Customer Management', sub: 'Kepemimpinan Tim & Pengelolaan Nasabah Kredit', date: '27 May – 14 Jun 2025', year: '2025', ref: 'NO. 817069', pdf: 'assets/certs/Sertifikat-Team-Leadership-Credit.pdf', icon: 'users' },
  ];

  return (
    <section id="certifications">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">04</span><span className="mono numhead-label">Certifications</span><span className="numhead-rule"/></div>
        <h2 className="rev" style={{ marginBottom: 18 }}>
          Officially <span className="serif hl">certified.</span>
        </h2>
        <p className="rev" data-delay="1" style={{ fontSize: 16, maxWidth: 680, marginBottom: 48 }}>
          Government credentials from BNSP & Kemnaker RI, essential-skills certifications from GNIK, and professional training from Universitas Gunadarma. Click any card to open the original PDF.
        </p>

        {/* Featured */}
        <div className="cert-feat rev">
          {featured.map((c, i) => (
            <a key={i} href={c.pdf} target="_blank" rel="noopener noreferrer" className={`cert-feat-card ${c.accent}`} data-cursor="Open">
              <div className="cert-shine" aria-hidden/>
              <div className="cert-tier">
                <span className="cert-tier-dot"/>
                <span>{c.tier}</span>
              </div>
              <div className="cert-meta-row">
                <div className="cert-feat-ico"><Icon name={c.icon} size={22}/></div>
                <div className="cert-feat-arrow"><Icon name="arrow-up-right" size={16}/></div>
              </div>
              <div className="cert-feat-title-wrap">
                <div className="cert-feat-sub serif">{c.sub}</div>
                <h3 className="cert-feat-title">{c.title}</h3>
              </div>
              <div className="cert-feat-issuer">
                <div style={{ fontWeight: 500 }}>{c.issuer}</div>
                <div style={{ color: 'var(--ink-3)', fontSize: 12, marginTop: 4 }}>{c.issuerSub}</div>
              </div>
              <div className="cert-feat-score">
                <div className="mono dimmer">{c.scoreLabel}</div>
                <div className="cert-feat-score-val serif">{c.score}</div>
                <div className="cert-feat-foot">
                  <span className="mono">Issued · {c.date}</span>
                  <span className="mono dimmer">{c.ref}</span>
                </div>
              </div>
              <div className="cert-feat-cta">Open PDF <Icon name="arrow-up-right" size={12}/></div>
            </a>
          ))}
        </div>

        {/* Skills */}
        <div className="rev cert-divider"><span className="line"/><span className="mono">Essential Skills · GNIK × Kemnaker RI</span><span className="line"/></div>
        <div className="cert-skills rev">
          {skills.map((s, i) => (
            <a key={i} href={s.pdf} target="_blank" rel="noopener noreferrer" className="cert-skill" data-cursor="Open">
              <div className="cert-skill-ico"><Icon name={s.icon} size={16}/></div>
              <div className="cert-skill-info">
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{s.title}</div>
                <div className="mono" style={{ marginTop: 4 }}>{s.date}</div>
              </div>
              <div className="cert-skill-score">
                <span className="serif" style={{ fontSize: 28, color: 'var(--accent)' }}>{s.score}</span>
                <span className="mono dimmer">/100</span>
              </div>
              <div className="cert-skill-link" aria-hidden><Icon name="arrow-up-right" size={12}/></div>
            </a>
          ))}
        </div>

        {/* Training */}
        <div className="rev cert-divider" style={{ marginTop: 48 }}><span className="line"/><span className="mono">Professional Training · Universitas Gunadarma</span><span className="line"/></div>
        <div className="cert-training rev">
          {training.map((t, i) => (
            <a key={i} href={t.pdf} target="_blank" rel="noopener noreferrer" className="cert-train" data-cursor="PDF">
              <div className="cert-train-top">
                <div className="cert-train-ico"><Icon name={t.icon} size={14}/></div>
                <span className="mono">{t.year}</span>
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', marginTop: 4, lineHeight: 1.4 }}>{t.sub}</div>
              </div>
              <div className="cert-train-foot">
                <span className="mono" style={{ color: 'var(--ink-2)' }}>{t.date}</span>
                <span className="mono dimmer">{t.ref}</span>
              </div>
              <div className="cert-train-arrow"><Icon name="arrow-up-right" size={12}/></div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .cert-feat { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 48px; }
        .cert-feat-card {
          position: relative; padding: 32px 28px 72px; min-height: 460px;
          border-radius: 22px; text-decoration: none; color: var(--ink);
          display: flex; flex-direction: column; gap: 22px;
          border: 1px solid var(--rule-2); overflow: hidden; isolation: isolate;
          background: var(--paper-2);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease;
          box-shadow: var(--shadow-1);
        }
        .cert-feat-card.gold {
          background: linear-gradient(160deg, #faf2d9 0%, #f4e6b5 100%);
          color: #2a1d05;
        }
        [data-theme="dark"] .cert-feat-card.gold {
          background: linear-gradient(160deg, #2e2410 0%, #1c1709 100%);
          color: #f4ecd9;
          border-color: rgba(236,195,79,0.3);
        }
        .cert-feat-card.ink { background: var(--paper-2); }
        .cert-feat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-2); border-color: var(--accent); }
        .cert-shine {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.6;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
          background-size: 250% 100%; background-position: 200% 0;
          transition: background-position 1s cubic-bezier(0.16,1,0.3,1);
        }
        .cert-feat-card:hover .cert-shine { background-position: -100% 0; }
        .cert-feat-card > *:not(.cert-shine):not(.cert-feat-cta) { position: relative; z-index: 1; }
        .cert-tier {
          display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          border-radius: 999px; background: rgba(31,26,20,0.06); border: 1px solid rgba(31,26,20,0.1);
          align-self: flex-start; color: inherit;
        }
        [data-theme="dark"] .cert-tier { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); }
        .cert-feat-card.gold .cert-tier { background: rgba(180,130,10,0.12); border-color: rgba(180,130,10,0.25); }
        .cert-tier-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 4px currentColor; }
        .cert-meta-row { display: flex; justify-content: space-between; align-items: center; }
        .cert-feat-ico {
          width: 54px; height: 54px; border-radius: 16px;
          background: rgba(200,85,42,0.12); border: 1px solid rgba(200,85,42,0.25);
          display: grid; place-items: center; color: var(--accent);
        }
        .cert-feat-card.gold .cert-feat-ico { background: rgba(180,130,10,0.15); border-color: rgba(180,130,10,0.3); color: #8a6500; }
        [data-theme="dark"] .cert-feat-card.gold .cert-feat-ico { color: #ecc34f; background: rgba(236,195,79,0.12); border-color: rgba(236,195,79,0.3); }
        .cert-feat-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(31,26,20,0.06); border: 1px solid rgba(31,26,20,0.1); display: grid; place-items: center;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, color 0.3s ease;
        }
        [data-theme="dark"] .cert-feat-arrow { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }
        .cert-feat-card:hover .cert-feat-arrow { transform: rotate(-30deg); background: var(--ink); color: var(--paper); }
        .cert-feat-card.gold:hover .cert-feat-arrow { background: #2a1d05; color: #faf2d9; }
        [data-theme="dark"] .cert-feat-card.gold:hover .cert-feat-arrow { background: #ecc34f; color: #1c1709; }
        .cert-feat-title-wrap { display: flex; flex-direction: column; gap: 6px; }
        .cert-feat-sub { font-size: 13px; color: var(--ink-3); }
        .cert-feat-title { font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(32px, 4vw, 50px); line-height: 0.95; letter-spacing: -0.035em; }
        .cert-feat-issuer { padding-top: 14px; border-top: 1px solid rgba(31,26,20,0.1); font-size: 14px; }
        [data-theme="dark"] .cert-feat-issuer { border-top-color: rgba(255,255,255,0.1); }
        .cert-feat-card.gold .cert-feat-issuer { border-top-color: rgba(120,80,0,0.2); }
        .cert-feat-score { margin-top: auto; padding-top: 18px; border-top: 1px solid rgba(31,26,20,0.1); display: flex; flex-direction: column; gap: 6px; }
        [data-theme="dark"] .cert-feat-score { border-top-color: rgba(255,255,255,0.1); }
        .cert-feat-card.gold .cert-feat-score { border-top-color: rgba(120,80,0,0.2); }
        .cert-feat-score-val { font-size: clamp(34px, 4vw, 46px); line-height: 1; letter-spacing: -0.01em; color: var(--accent); }
        .cert-feat-card.gold .cert-feat-score-val { color: #b88800; }
        [data-theme="dark"] .cert-feat-card.gold .cert-feat-score-val { color: #ecc34f; }
        .cert-feat-foot { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 8px; color: var(--ink-3); }
        .cert-feat-cta {
          position: absolute; bottom: 18px; right: 18px;
          padding: 8px 14px; border-radius: 999px;
          background: var(--accent); color: var(--on-accent);
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 600;
          display: inline-flex; align-items: center; gap: 6px;
          opacity: 0; transform: translateY(10px); z-index: 2;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cert-feat-card:hover .cert-feat-cta { opacity: 1; transform: translateY(0); }

        .cert-divider { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .cert-divider .mono { flex-shrink: 0; color: var(--ink-3); }
        .cert-divider .line { flex: 1; }

        .cert-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cert-skill {
          display: flex; align-items: center; gap: 14px; padding: 18px 20px;
          border-radius: 14px; background: var(--paper-2); border: 1px solid var(--rule);
          text-decoration: none; color: var(--ink);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .cert-skill:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: var(--shadow-1); }
        .cert-skill-ico { width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); flex-shrink: 0; }
        .cert-skill-info { flex: 1; min-width: 0; }
        .cert-skill-score { display: flex; align-items: baseline; gap: 4px; flex-shrink: 0; }
        .cert-skill-link { width: 28px; height: 28px; border-radius: 50%; background: var(--paper-3); border: 1px solid var(--rule); display: grid; place-items: center; color: var(--ink-2); transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease; flex-shrink: 0; }
        .cert-skill:hover .cert-skill-link { background: var(--accent); color: var(--on-accent); border-color: var(--accent); transform: rotate(-30deg); }

        .cert-training { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cert-train {
          position: relative; padding: 18px 20px 16px; display: flex; flex-direction: column; gap: 12px;
          border-radius: 14px; background: var(--paper-2); border: 1px solid var(--rule);
          text-decoration: none; color: var(--ink); min-height: 168px;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .cert-train:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: var(--shadow-1); }
        .cert-train-top { display: flex; justify-content: space-between; align-items: center; }
        .cert-train-ico { width: 30px; height: 30px; border-radius: 8px; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); }
        .cert-train-foot { display: flex; flex-direction: column; gap: 3px; padding-top: 10px; border-top: 1px dashed var(--rule); }
        .cert-train-arrow { position: absolute; top: 16px; right: 16px; color: var(--ink-3); opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; }
        .cert-train:hover .cert-train-arrow { opacity: 1; color: var(--accent); transform: translate(2px, -2px); }

        @media (max-width: 900px) {
          .cert-feat { grid-template-columns: 1fr; }
          .cert-skills { grid-template-columns: 1fr; }
          .cert-training { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .cert-feat-card { padding: 26px 22px 68px; min-height: 400px; }
          .cert-training { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ---------- SKILLS ---------- */
function Skills() {
  const skills = [
    { name: 'Community Engagement', icon: 'users',     level: 92 },
    { name: 'Communication',        icon: 'message',   level: 90 },
    { name: 'Event Coordination',   icon: 'calendar',  level: 85 },
    { name: 'Content Creation',     icon: 'camera',    level: 78 },
    { name: 'Social Monitoring',    icon: 'eye',       level: 82 },
    { name: 'Reporting',            icon: 'doc',       level: 88 },
    { name: 'Team Collaboration',   icon: 'star',      level: 90 },
    { name: 'Time Management',      icon: 'clock',     level: 85 },
  ];
  return (
    <section id="skills">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">05</span><span className="mono numhead-label">Skills</span><span className="numhead-rule"/></div>
        <h2 className="rev" style={{ marginBottom: 18 }}>
          Core <span className="serif hl">competencies.</span>
        </h2>
        <p className="rev" data-delay="1" style={{ fontSize: 16, maxWidth: 680, marginBottom: 48 }}>
          Practical, people-centric capabilities sharpened in a real corporate environment — not a list of buzzwords.
        </p>

        <div className="skill-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-card rev" data-delay={(i % 4)}>
              <div className="skill-head">
                <div className="skill-ico"><Icon name={s.icon} size={16}/></div>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{s.name}</div>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: s.level + '%' }}/>
              </div>
              <div className="skill-foot">
                <span className="mono">proficiency</span>
                <span className="mono" style={{ color: 'var(--accent)' }}><Counter to={s.level} suffix="%"/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skill-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .skill-card {
          padding: 20px; border-radius: 16px; background: var(--paper-2); border: 1px solid var(--rule);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: var(--shadow-1); }
        .skill-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .skill-ico { width: 36px; height: 36px; border-radius: 10px; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); flex-shrink: 0; }
        .skill-bar { height: 4px; border-radius: 99px; background: var(--rule); overflow: hidden; }
        .skill-fill { height: 100%; background: var(--accent); border-radius: 99px; box-shadow: 0 0 12px var(--accent-glow); transition: width 1.4s cubic-bezier(0.16,1,0.3,1); transform-origin: left; }
        .rev:not(.in) .skill-fill { width: 0 !important; }
        .skill-foot { display: flex; justify-content: space-between; margin-top: 10px; }
        @media (max-width: 1000px) { .skill-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .skill-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- EDUCATION ---------- */
function Education() {
  const courses = ['Operations Management', 'Business Communication', 'Human Resource Management', 'Basic Marketing'];
  const strengths = [
    { icon: 'shield',  t: 'Highly reliable and disciplined', b: 'Shows up consistently, follows through, and meets deadlines without supervision.' },
    { icon: 'target',  t: 'Strong attention to detail',       b: 'Catches the small inconsistencies in reports, schedules and documentation before they become problems.' },
    { icon: 'sparkles', t: 'Positive attitude & willingness to learn', b: 'Calm and approachable under pressure — treats every project as an opportunity to grow.' },
  ];
  return (
    <section id="education">
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">06</span><span className="mono numhead-label">Education</span><span className="numhead-rule"/></div>
        <h2 className="rev" style={{ marginBottom: 56 }}>
          Academic <span className="serif hl">foundation.</span>
        </h2>

        <div className="edu-grid">
          <div className="rev card edu-main" style={{ padding: 36 }}>
            <div className="edu-head">
              <div className="edu-ico"><Icon name="graduation" size={26} stroke={1.4}/></div>
              <div>
                <div className="mono" style={{ color: 'var(--accent)', marginBottom: 6 }}>Bachelor's Degree</div>
                <h3 style={{ fontSize: 26, marginBottom: 4 }}>Management (S.E.)</h3>
                <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>Universitas Gunadarma · Faculty of Economics</div>
              </div>
            </div>
            <div className="edu-meta">
              <div><div className="mono">Institution</div><div className="edu-val">Universitas Gunadarma</div></div>
              <div><div className="mono">Location</div><div className="edu-val">Indonesia</div></div>
              <div><div className="mono">Concentration</div><div className="edu-val">Management</div></div>
            </div>
            <div className="edu-courses">
              <div className="mono" style={{ marginBottom: 14 }}>Relevant Coursework</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {courses.map((c, i) => <span key={i} className="chip">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="rev edu-side" data-delay="1">
            <div className="mono" style={{ paddingLeft: 4, marginBottom: 4 }}>Personal Strengths</div>
            {strengths.map((s, i) => {
              const ref = useTilt(3);
              return (
                <div ref={ref} key={i} className="card tilt str-card">
                  <div className="str-ico"><Icon name={s.icon} size={16}/></div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 4 }}>{s.t}</div>
                    <p style={{ fontSize: 13 }}>{s.b}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .edu-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; }
        .edu-main { display: flex; flex-direction: column; gap: 24px; }
        .edu-head { display: flex; gap: 18px; align-items: flex-start; }
        .edu-ico { width: 54px; height: 54px; border-radius: 14px; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); flex-shrink: 0; }
        .edu-meta { display: flex; flex-wrap: wrap; gap: 24px; padding: 24px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .edu-val { font-size: 14.5px; color: var(--ink); margin-top: 4px; }
        .edu-side { display: flex; flex-direction: column; gap: 12px; }
        .str-card { padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start; }
        .str-ico { width: 36px; height: 36px; flex-shrink: 0; border-radius: 10px; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); }
        @media (max-width: 900px) { .edu-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const channels = [
    { icon: 'mail',     label: 'Email',    value: 'irfankautsar99@gmail.com',          href: 'https://mail.google.com/mail/?view=cm&fs=1&to=irfankautsar99@gmail.com' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/muhammadirfankautsar', href: 'https://www.linkedin.com/in/muhammadirfankautsar' },
    { icon: 'whatsapp', label: 'WhatsApp', value: '+62 877-9697-6572',                  href: 'https://wa.me/6287796976572' },
    { icon: 'pin',      label: 'Location', value: 'Cilegon, Banten · Indonesia',        href: 'https://www.google.com/maps/search/?api=1&query=Cilegon+Banten+Indonesia' },
  ];
  return (
    <section id="contact" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div className="numhead rev"><span className="numhead-num">07</span><span className="mono numhead-label">Contact</span><span className="numhead-rule"/></div>

        <div className="rev contact-block">
          <span className="eyebrow"><span className="dot"/>Let's connect</span>
          <h2 style={{ marginTop: 24, marginBottom: 20, fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1 }}>
            Open to the<br/><span className="serif hl">right opportunity.</span>
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580 }}>
            Currently exploring Management Trainee, CSR, and General Affairs roles across Indonesia.
            The fastest way to reach me is by email or WhatsApp.
          </p>

          <div className="contact-grid">
            {channels.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-card mag" data-cursor="Open">
                <div className="contact-ico"><Icon name={c.icon} size={18}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono">{c.label}</div>
                  <div className="contact-val">{c.value}</div>
                </div>
                <Icon name="arrow-up-right" size={16}/>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=irfankautsar99@gmail.com" target="_blank" rel="noopener noreferrer" className="btn accent mag" data-cursor="Send">
              <Icon name="mail" size={16}/> Send a message
            </a>
            <a href="assets/Muhammad-Irfan-Kautsar-Resume.pdf" download className="btn mag">
              <Icon name="download" size={16}/> Download CV
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .contact-block { padding: clamp(40px, 6vw, 72px); border-radius: 28px; background: var(--paper-2); border: 1px solid var(--rule-2); box-shadow: var(--shadow-2); position: relative; overflow: hidden; }
        .contact-block::before {
          content: ''; position: absolute; top: -40%; right: -10%;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, var(--accent-soft), transparent 60%);
          pointer-events: none;
        }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 40px; max-width: 720px; }
        .contact-card { display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: 16px;
          background: var(--paper); border: 1px solid var(--rule); text-decoration: none; color: var(--ink);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover { border-color: var(--accent); box-shadow: var(--shadow-1); }
        .contact-ico { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; background: var(--accent-soft); border: 1px solid var(--accent); display: grid; place-items: center; color: var(--accent); }
        .contact-val { font-size: 14px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-val { white-space: normal; word-break: break-word; }
        }
      `}</style>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer style={{ padding: '32px 0 48px', borderTop: '1px solid var(--rule)', position: 'relative', zIndex: 2 }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="nav-mark" style={{ width: 24, height: 24, fontSize: 14 }}>M<span className="acc">.</span></span>
          <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>© 2026 Muhammad Irfan Kautsar.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Hero, About, Experience, Work, Certifications, Skills, Education, Contact, Footer, MarqueeStrip });
