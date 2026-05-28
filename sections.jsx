/* ====================================================================
   Sections: Navbar, Hero, About, Experience, Skills, Projects,
             Education, Strengths, Contact, Footer
==================================================================== */

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certificate' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Activities' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* ------------------------------ NAVBAR ------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('about');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      let current = 'about';
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
    zIndex: 90, display: 'flex', alignItems: 'center', gap: 24,
    padding: scrolled ? '10px 14px 10px 22px' : '14px 18px 14px 24px',
    borderRadius: 999,
    background: scrolled ? 'color-mix(in oklch, var(--c-surface-3) 70%, transparent)' : 'color-mix(in oklch, var(--c-surface-3) 40%, transparent)',
    border: '1px solid var(--hairline-strong)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    boxShadow: scrolled ? '0 20px 60px -24px var(--c-shadow-10)' : 'none',
    transition: 'all 0.35s ease',
    maxWidth: 'calc(100vw - 32px)',
  };

  return (
    <>
      <nav style={navStyle}>
        <a href="#top" style={{ display:'flex', alignItems:'center', gap: 10, textDecoration: 'none', color: 'var(--text)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em' }}>
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--c-on-accent)', fontWeight: 800, fontSize: 12,
            boxShadow: '0 0 16px var(--accent-glow)',
          }}>M</span>
          <span style={{ display: 'none' }} className="brand-name">Irfan Kautsar</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: 4 }}>
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} style={{
              padding: '8px 14px', fontSize: 13, color: active === n.id ? 'var(--text)' : 'var(--text-2)',
              textDecoration: 'none', borderRadius: 999, position: 'relative',
              background: active === n.id ? 'var(--c-line-06)' : 'transparent',
              transition: 'all 0.25s ease', fontWeight: active === n.id ? 500 : 400,
            }}>
              {active === n.id && (
                <span style={{
                  position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent-glow)',
                }} />
              )}
              {n.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta" style={{
          padding: '8px 16px', fontSize: 13, fontWeight: 500,
          background: 'var(--text)', color: 'var(--bg)', borderRadius: 999, textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Let's talk <Icon name="arrow-right" size={14} />
        </a>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: 'none', background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer',
        }}>
          <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 80, background: 'color-mix(in oklch, var(--c-panel) 96%, transparent)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
        }} onClick={() => setMobileOpen(false)}>
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMobileOpen(false)}
              style={{ fontSize: 28, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
              {n.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="top" style={{ paddingTop: 160, paddingBottom: 120, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center',
        }}>
          <div>
            <div className="reveal" style={{ marginBottom: 28 }}>
              <span className="eyebrow"><span className="dot"/>Open to corporate, marketing & operations roles</span>
            </div>

            <h1 className="reveal" style={{ marginBottom: 24 }}>
              Muhammad
              <br/>
              Irfan <span className="serif hl">Kautsar.</span>
            </h1>

            <div className="reveal" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 32, color: 'var(--text-2)', fontSize: 15 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Icon name="briefcase" size={14}/> Management Graduate
              </span>
              <span style={{ width: 4, height: 4, borderRadius:'50%', background:'var(--text-3)' }}/>
              <span>Open to Opportunities</span>
            </div>

            <p className="reveal" style={{ fontSize: 18, maxWidth: 560, marginBottom: 40, lineHeight: 1.55 }}>
              Management graduate with hands-on experience in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>CSR & General Affairs at PT Merak Chemicals Indonesia</strong> — coordinated community programs across literacy, nutrition and UMKM, built the team's first Instagram analytics dashboard in Power BI, and earned BNSP Marketing certification. Open to opportunities where strong execution, clear communication, and people-first thinking make an impact.
            </p>

            <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
              <a href="assets/Muhammad-Irfan-Kautsar-Resume.pdf" download className="btn primary"><Icon name="download" size={16}/> Download CV</a>
              <a href="#contact" className="btn"><Icon name="mail" size={16}/> Contact me</a>
            </div>

            <div className="reveal" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { k: '10+', v: 'Programs documented' },
                { k: '16', v: 'Certifications earned' },
                { k: '8', v: 'Core competencies' },
              ].map((s, i) => (
                <div key={i} className="hero-stat">
                  <div className="hero-stat-num">{s.k}</div>
                  <div className="mono" style={{ marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="reveal hero-portrait" style={{ position: 'relative', perspective: 1400 }}>
            <div style={{
              position: 'relative', aspectRatio: '4/5', borderRadius: 24, overflow: 'hidden',
              transform: `rotateY(${mouse.x * 0.6}deg) rotateX(${-mouse.y * 0.6}deg) translateZ(0)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
              border: '1px solid var(--hairline-strong)',
              boxShadow: '0 8px 24px -4px var(--c-shadow-09), 0 30px 60px -12px var(--c-shadow-10), 0 60px 120px -20px var(--c-shadow-12), 0 0 80px -30px var(--accent-glow)',
            }}>
              <img src="assets/portrait.jpeg" alt="Muhammad Irfan Kautsar" style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: '55% 30%',
                filter: 'saturate(0.95) contrast(1.02)',
              }}/>
              {/* Subtle dark gradient for legibility */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, color-mix(in oklch, var(--c-panel) 15%, transparent) 0%, transparent 30%, transparent 55%, color-mix(in oklch, var(--c-panel) 85%, transparent) 100%)',
              }}/>
              {/* Accent tint */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, color-mix(in oklch, var(--c-accent) 6%, transparent), transparent 60%)',
                mixBlendMode: 'overlay',
              }}/>
              <div style={{
                position: 'absolute', top: 16, left: 16, right: 16,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <div className="mono" style={{ background: 'var(--c-shadow-09)', padding: '6px 10px', borderRadius: 6, backdropFilter: 'blur(8px)', color: 'var(--text-2)' }}>// graduation · 2025</div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)' }}/>
              </div>
              <div style={{
                position: 'absolute', bottom: 24, left: 24, right: 24,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              }}>
                <div>
                  <div className="mono" style={{ marginBottom: 6 }}>// Cilegon, Banten · ID</div>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }} className="serif">"Quietly reliable."</div>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="float-chip" style={{
              position: 'absolute', top: -24, left: -36,
              padding: '14px 18px', borderRadius: 16,
              transform: `translateZ(80px) translate(${mouse.x * 1.2}px, ${mouse.y * 1.2}px)`,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(180deg, color-mix(in oklch, var(--c-surface-7) 85%, transparent), color-mix(in oklch, var(--c-surface-3) 75%, transparent))',
              border: '1px solid var(--hairline-strong)',
              backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: 10,
              boxShadow:
                '0 1px 0 var(--c-line-07) inset,' +
                '0 4px 8px var(--c-shadow-07),' +
                '0 16px 32px -8px var(--c-shadow-09),' +
                '0 32px 64px -16px var(--c-shadow-10)',
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in oklch, var(--c-accent) 15%, transparent)', display: 'flex', alignItems:'center', justifyContent:'center', color: 'var(--accent)' }}>
                <Icon name="users" size={16}/>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }} className="mono">FOCUS</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Operations & People</div>
              </div>
            </div>
            <div className="float-chip" style={{
              position: 'absolute', bottom: 28, right: -44,
              padding: '14px 18px', borderRadius: 16,
              transform: `translateZ(100px) translate(${-mouse.x * 1.4}px, ${-mouse.y * 1.4}px)`,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(180deg, color-mix(in oklch, var(--c-surface-7) 85%, transparent), color-mix(in oklch, var(--c-surface-3) 75%, transparent))',
              border: '1px solid var(--hairline-strong)',
              backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: 10,
              boxShadow:
                '0 1px 0 var(--c-line-07) inset,' +
                '0 4px 8px var(--c-shadow-07),' +
                '0 16px 32px -8px var(--c-shadow-09),' +
                '0 32px 64px -16px var(--c-shadow-10)',
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in oklch, var(--c-accent2) 15%, transparent)', display: 'flex', alignItems:'center', justifyContent:'center', color: 'var(--accent-2)' }}>
                <Icon name="graduation" size={16}/>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }} className="mono">DEGREE</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>S.E., Gunadarma</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="reveal" style={{ marginTop: 80, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-3)' }}>
          <div style={{ width: 24, height: 1, background: 'var(--text-3)' }}/>
          <span className="mono">Scroll to explore</span>
        </div>
      </div>

      <style>{`
        .hero-stat-num {
          font-size: 36px; font-weight: 700; letter-spacing: -0.03em;
          background: linear-gradient(180deg, var(--c-line-12), var(--c-text-mid));
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          filter: drop-shadow(0 4px 12px var(--c-shadow-07));
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-portrait { max-width: 360px; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
function About() {
  const traits = [
    { icon: 'users', title: 'Community Engagement', body: 'Connects authentically with communities surrounding industrial operations and translates trust into long-term programs.' },
    { icon: 'shield', title: 'CSR Involvement', body: 'Supported corporate social responsibility initiatives end-to-end — from planning through documentation and stakeholder reporting.' },
    { icon: 'briefcase', title: 'Operational Support', body: 'Comfortable with the unglamorous, essential work of General Affairs: logistics, vendors, facility coordination, paperwork done right.' },
    { icon: 'message', title: 'Communication', body: 'Clear, calm, professional. Equally at ease with village leaders, vendors, and corporate management.' },
    { icon: 'sparkles', title: 'Adaptability', body: 'Trained to move between strategic thinking and ground-level execution depending on what the moment needs.' },
    { icon: 'star', title: 'Team Collaboration', body: 'Plays a steady supporting role — the person teams want around when timelines are tight and details matter.' },
  ];
  return (
    <section id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">01 — About</span>
          <h2>A behind-the-scenes operator with a <span className="serif hl">people-first instinct.</span></h2>
          <p style={{ fontSize: 17, maxWidth: 680 }}>
            I learned business by studying it — and learned operations by doing it. My internship at a chemicals
            plant taught me that General Affairs and CSR aren't side functions; they're how a company shows up
            in the world. I want to keep building that craft.
          </p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {traits.map((t, i) => (
            <div key={i} className="reveal trait-card tilt-3d glass" data-tilt-max="6" style={{
              padding: 28, display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1), transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
              transitionDelay: `${i * 40}ms`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, color-mix(in oklch, var(--c-accent) 15%, transparent), color-mix(in oklch, var(--c-accent2) 10%, transparent))',
                border: '1px solid color-mix(in oklch, var(--c-accent) 20%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <Icon name={t.icon} size={20}/>
              </div>
              <h3>{t.title}</h3>
              <p style={{ fontSize: 14 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .trait-card:hover { transform: translateY(-4px); border-color: color-mix(in oklch, var(--c-accent) 30%, transparent); box-shadow: 0 24px 60px -28px var(--accent-glow); }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ----------------------- EXPERIENCE TIMELINE ----------------------- */
function Experience() {
  const items = [
    {
      role: 'General Affairs',
      company: 'Merak Chemicals Indonesia',
      where: 'Indonesia',
      period: 'Recent',
      type: 'General Affairs Division',
      icon: 'briefcase',
      bullets: [
        'Supported daily operational activities, including logistics handling, inventory monitoring, and workspace organization.',
        'Provided proactive support to team members to ensure smooth daily operations.',
        'Maintained cleanliness, safety, and efficiency in the working environment.',
      ],
    },
    {
      role: 'Corporate Social Responsibility (CSR)',
      company: 'Merak Chemicals Indonesia',
      where: 'Indonesia',
      period: 'Recent',
      type: 'CSR Programs',
      icon: 'users',
      bullets: [
        'Organized and supported social programs involving communities, families, and children.',
        'Engaged directly with community members, building positive relationships and ensuring program effectiveness.',
        'Conducted documentation and simple reporting of activities, including participant tracking and outcomes.',
        'Worked closely with team members to ensure efficient workflow and timely delivery.',
        'Collaborated with team members to ensure timely and efficient program implementation.',
      ],
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">02 — Experience</span>
          <h2>Where the <span className="serif hl">work</span> happened.</h2>
          <p style={{ fontSize: 17, maxWidth: 680 }}>
            A focused, real-world introduction to corporate operations and community work — close enough to the
            ground to learn how things actually get done.
          </p>
        </div>

        <div style={{ position: 'relative', paddingLeft: 'clamp(40px, 8vw, 80px)' }}>
          {/* Timeline rail */}
          <div style={{
            position: 'absolute', left: 'clamp(14px, 3vw, 28px)', top: 8, bottom: 8, width: 1,
            background: 'linear-gradient(180deg, transparent, var(--hairline-strong) 8%, var(--hairline-strong) 92%, transparent)',
          }}/>
          <div style={{
            position: 'absolute', left: 'calc(clamp(14px, 3vw, 28px) - 4px)', top: 8, width: 9, height: 9,
            borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow)',
          }}/>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {items.map((it, i) => (
              <div key={i} className="reveal" style={{ position: 'relative' }}>
                {/* Node */}
                <div style={{
                  position: 'absolute', left: 'calc(clamp(14px, 3vw, 28px) - clamp(40px, 8vw, 80px) - 6px)', top: 28,
                  width: 13, height: 13, borderRadius: '50%',
                  background: 'var(--bg)',
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 0 4px var(--c-panel), 0 0 20px var(--accent-glow)',
                }}/>
                <div className="glass exp-card tilt-3d" data-tilt-max="4" style={{
                  padding: 32,
                  transition: 'all 0.6s cubic-bezier(0.2,0.8,0.2,1)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: 'linear-gradient(135deg, color-mix(in oklch, var(--c-accent) 18%, transparent), color-mix(in oklch, var(--c-accent2) 10%, transparent))',
                        border: '1px solid color-mix(in oklch, var(--c-accent) 22%, transparent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                      }}>
                        <Icon name={it.icon} size={20}/>
                      </div>
                      <div>
                        <div className="mono" style={{ color: 'var(--accent)', marginBottom: 4 }}>{it.type}</div>
                        <h3 style={{ fontSize: 22, marginBottom: 6 }}>{it.role}</h3>
                        <div style={{ color: 'var(--text-2)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 500, color: 'var(--text)' }}>{it.company}</span>
                          <span style={{ display: 'inline-flex', alignItems:'center', gap: 6 }}><Icon name="pin" size={12}/> {it.where}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 999,
                      background: 'var(--c-line-04)', border: '1px solid var(--hairline)',
                      fontSize: 12, color: 'var(--text-2)',
                    }}>
                      <Icon name="calendar" size={12}/> {it.period}
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {it.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>
                        <span style={{ flexShrink: 0, marginTop: 7, width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }}/>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .exp-card:hover { border-color: color-mix(in oklch, var(--c-accent) 30%, transparent); transform: translateY(-2px); }
      `}</style>
    </section>
  );
}

/* ------------------------------ SKILLS ------------------------------ */
function Skills() {
  const skills = [
    { name: 'Community Engagement & Relationship Building', icon: 'users', level: 92 },
    { name: 'Communication & Interpersonal Skills', icon: 'message', level: 90 },
    { name: 'Event & Activity Coordination', icon: 'calendar', level: 85 },
    { name: 'Basic Content Creation (Photo & Video)', icon: 'camera', level: 78 },
    { name: 'Social Media Monitoring', icon: 'eye', level: 82 },
    { name: 'Reporting & Documentation', icon: 'doc', level: 88 },
    { name: 'Teamwork & Collaboration', icon: 'star', level: 90 },
    { name: 'Time Management & Multitasking', icon: 'clock', level: 85 },
  ];

  return (
    <section id="skills">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">04 — Skills</span>
          <h2>Core <span className="serif hl">competencies.</span></h2>
          <p style={{ fontSize: 17, maxWidth: 680 }}>
            Practical, people-centric capabilities sharpened in a real corporate environment — not a list of buzzwords.
          </p>
        </div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {skills.map((s, i) => (
            <div key={i} className="reveal skill-card tilt-3d" data-tilt-max="10" style={{
              position: 'relative', padding: 24, borderRadius: 16, overflow: 'hidden',
              background: 'color-mix(in oklch, var(--c-surface-4) 50%, transparent)', border: '1px solid var(--hairline)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
            }}>
              {/* Gradient border on hover */}
              <div className="skill-border" style={{
                position: 'absolute', inset: -1, borderRadius: 16, padding: 1, opacity: 0,
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor', maskComposite: 'exclude',
                transition: 'opacity 0.4s ease', pointerEvents: 'none',
              }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'color-mix(in oklch, var(--c-accent) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--c-accent) 18%, transparent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  <Icon name={s.icon} size={16}/>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{s.name}</div>
              </div>
              <div style={{ height: 4, background: 'var(--c-line-06)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: s.level + '%',
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
                  borderRadius: 99, boxShadow: '0 0 12px var(--accent-glow)',
                  transition: 'width 1.2s cubic-bezier(0.2,0.8,0.2,1)',
                }}/>
              </div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 11 }} className="mono">
                <span>proficiency</span>
                <span style={{ color: 'var(--accent)' }}>{s.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skill-card:hover { transform: translateY(-3px); }
        .skill-card:hover .skill-border { opacity: 1; }
        @media (max-width: 900px) { .skills-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ---------------------------- PROJECTS ---------------------------- */
function FeaturedAfterMovie() {
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const fmt = (s) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const toggle = () => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) a.play(); else a.pause();
  };
  const seek = (e) => {
    const a = audioRef.current; if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
  };

  React.useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => { setDuration(a.duration); setReady(true); };
    const onEnd = () => setPlaying(false);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
    };
  }, []);

  const pct = duration ? (current / duration) * 100 : 0;

  const credits = [
    { role: 'Director', name: 'MCCI Trainee Team', sub: 'Concept · Creative direction' },
    { role: 'Editor', name: 'MCCI Trainee Team', sub: 'Post-production · Color · Sound' },
    { role: 'Cinematography', name: 'MCCI Trainee Team', sub: 'Camera · On-set capture' },
  ];

  return (
    <div className="reveal featured-project after-movie glass" style={{
      padding: 0, overflow: 'hidden', marginBottom: 24,
      display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0,
    }}>
      {/* PLAYER */}
      <div className="am-player" onClick={toggle}>
        <img src="assets/after-movie-cover.jpg" alt="After Movie — MCCI Trainees"/>
        <div className="am-overlay"/>

        {/* Top-left tag */}
        <div className="am-badge">
          <span className="am-badge-dot"/> After Movie · 2026
        </div>

        {/* Top-right: external link to Drive */}
        <a
          href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="am-drive"
          onClick={(e) => e.stopPropagation()}
          title="Watch full film on Google Drive"
        >
          <Icon name="arrow-up-right" size={13}/> Full film
        </a>

        {/* Center play button */}
        <div className={`am-play ${playing ? 'is-playing' : ''}`}>
          {playing ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </div>

        {/* Equalizer animation when playing */}
        {playing && (
          <div className="am-eq" aria-hidden="true">
            {[0,1,2,3,4].map(i => <span key={i} style={{ animationDelay: `${i * 0.12}s` }}/>)}
          </div>
        )}

        {/* Progress bar */}
        <div className="am-controls" onClick={(e) => e.stopPropagation()}>
          <div className="am-time">{fmt(current)}</div>
          <div className="am-progress" onClick={seek}>
            <div className="am-progress-fill" style={{ width: pct + '%' }}/>
            <div className="am-progress-thumb" style={{ left: pct + '%' }}/>
          </div>
          <div className="am-time">{ready ? fmt(duration) : '—:—'}</div>
        </div>

        <audio ref={audioRef} src="assets/after-movie.mp3" preload="metadata"/>
      </div>

      {/* INFO */}
      <div style={{ padding: 'clamp(28px, 4vw, 44px)', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'color-mix(in oklch, var(--c-accent) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--c-accent) 20%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
          }}>
            <Icon name="camera" size={18}/>
          </div>
          <div className="mono" style={{ color: 'var(--accent)' }}>Film · Documentary</div>
        </div>
        <h3 style={{ fontSize: 'clamp(28px, 3vw, 36px)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
          MCCI Trainee Program — <span className="serif hl">After Movie</span>
        </h3>
        <p style={{ fontSize: 15, margin: 0 }}>
          A short documentary film made by the MCCI trainee team to close out the program — capturing the people, the work, and the small moments that made the year meaningful. Shot on-site at PT Merak Chemicals Indonesia and edited entirely in-house by the interns.
        </p>

        {/* Credits */}
        <div className="am-credits">
          {credits.map((c, i) => (
            <div key={i} className="am-credit">
              <div className="mono">{c.role}</div>
              <div className="am-credit-name">{c.name}</div>
              <div className="am-credit-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          <a
            href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
            style={{ padding: '12px 20px', fontSize: 13 }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Watch full film
          </a>
          <a
            href="https://drive.google.com/file/d/1J5MDde7BwWB0mqWOgC7nFZXj3PbryCAT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ padding: '12px 18px', fontSize: 13 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="arrow-up-right" size={14}/> Open on Drive
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-3)', fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="calendar" size={12}/> 2026</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="pin" size={12}/> PT Merak Chemicals Indonesia</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={12}/> Audio preview · Full film on Drive</span>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  // Real activities from internship at PT Merak Chemicals Indonesia
  const activities = [
    {
      src: 'assets/activities/forum-csr-cilegon.jpg',
      tag: 'CSR Forum',
      title: 'Cilegon City CSR Forum',
      year: '2026',
      location: 'Cilegon · Banten',
      partners: ['Pemkot Cilegon', 'TNI/POLRI', 'Forum CSR Banten'],
      desc: 'Group portrait at the Cilegon City CSR Forum — an inter-corporate gathering convened by the city government to coordinate CSR programs across local industry. Representatives from PT Merak Chemicals Indonesia, TNI/POLRI, and other Banten companies in one room to align priorities for the year ahead.',
      role: 'Attended on behalf of MCCI Corporate Affairs — networking with fellow CSR practitioners and capturing key talking points for the team back at the office.',
      span: 'wide',
      fit: 'cover',
    },
    {
      src: 'assets/activities/team-corporate-affairs.jpg',
      tag: 'Team',
      title: 'Corporate Affairs Trainees',
      year: '2026',
      location: 'MCCI HQ Lobby',
      partners: ['Corporate Affairs Team'],
      desc: 'The MCCI Corporate Affairs trainee cohort in front of the company lobby wall — "PT Merak Chemicals Indonesia · Harmonize for Sustainable Growth". Four trainees, one mission: support every CSR program, event, and report the division puts out.',
      role: 'Day-to-day teammate alongside three other trainees, splitting fieldwork, documentation, and content production.',
    },
    {
      src: 'assets/activities/kacang-umpet.jpg',
      tag: 'UMKM · Branding',
      title: 'Kacang Umpet — Product Poster',
      year: '2025',
      location: 'Gemara, Cilegon Banten',
      partners: ['UMKM Gemara', 'MCCI', 'BPOM Halal'],
      desc: 'Promotional poster for "Kacang Umpet", a 150g traditional fried snack produced by an MCCI-mentored UMKM in Gemara, Cilegon. The label carries the MCCI sponsorship mark and Indonesian Halal certification — a small artifact that represents months of mentoring, packaging revisions, and certification paperwork.',
      role: 'Helped coordinate visual direction, sponsor placement, and Halal-mark compliance with the producer.',
      span: 'tall',
      fit: 'cover',
    },
    {
      src: 'assets/activities/saung-aksara.jpg',
      tag: 'CSR · Literacy',
      title: 'Saung Aksara — Reading Room',
      year: '2025',
      location: 'Village near Cilegon',
      partners: ['Local volunteers', 'MCCI CSR'],
      desc: 'A village reading room funded by MCCI\'s Saung Aksara program — children with hands raised, a volunteer teacher at the whiteboard, and shelves stacked with donated books in the background. A modest space, but for many of the kids here, the closest thing to a library.',
      role: 'Logistics support during the program launch and follow-up documentation for the CSR report.',
    },
    {
      src: 'assets/activities/ayam-petelur.jpg',
      tag: 'CSR · Livelihood',
      title: 'Ayam Petelur — Layer Hen Farm',
      year: '2026',
      location: 'Community farm, Banten',
      partners: ['Local farmer co-op', 'MCCI CSR'],
      desc: 'Inside the community-run layer hen barn supported by MCCI — neat rows of cages, daily egg trays stacked at the entrance, and a small whiteboard tracking production. A sustainable-livelihood program designed so families neighbouring the plant earn ongoing income, not just one-off aid.',
      role: 'Field visit to verify progress, photograph the operation, and write the monthly progress note.',
    },
    {
      src: 'assets/activities/umkm-kegiatan.jpg',
      tag: 'UMKM · Training',
      title: 'Rumah Siap Kerja — Culinary Workshop',
      year: '2025',
      location: 'Klinik UMKM Diskop Cilegon',
      partners: ['Diskop Kota Cilegon', 'MCCI'],
      desc: 'Hands-on culinary workshop under the city\'s "Rumah Siap Kerja" program for UMKM (small enterprises) — kuliner, kerajinan, and marketing modules rolled into one. Participants working through a recipe with a pasta machine and dough, mentored by the program lead.',
      role: 'On-site documentation; later wrote the recap shared with both Diskop Cilegon and MCCI management.',
    },
    {
      src: 'assets/activities/umkm-produk.jpg',
      tag: 'UMKM · Graduation',
      title: 'UMKM Closing Ceremony',
      year: '2025',
      location: 'Klinik UMKM Diskop Cilegon',
      partners: ['Diskop Kota Cilegon', 'MCCI'],
      desc: 'Graduation day for the UMKM cohort — participants holding the finished yellow-packaged snack they produced and branded over the course of the program. A small product, but it represents real income and real confidence for these entrepreneurs.',
      role: 'Coordinated the closing event and captured the cohort portrait for the program report.',
    },
    {
      src: 'assets/activities/kebun-gizi.jpg',
      tag: 'CSR · UMKM',
      title: 'UMKM Producer — Kebun Gizi',
      year: '2025',
      location: 'Village UMKM site, Banten',
      partners: ['Village producer', 'MCCI'],
      desc: 'A UMKM producer holds the finished "Kacang Umpet" retail pack at her village home, the Kebun Gizi (nutrition garden) plots visible behind her. The product on the left, the source on the right — exactly the chain MCCI\'s UMKM and nutrition-garden programs are designed to build.',
      role: 'Field visit and producer interview; photo used in the social-media and report rollout.',
    },
    {
      src: 'assets/activities/nelayan.jpg',
      tag: 'CSR · Fisheries',
      title: 'CSR MCCI × KKP — Fisheries Support',
      year: '2025',
      location: 'Coastal community, Banten',
      partners: ['KKP (Ministry of Marine Affairs)', 'MCCI'],
      desc: 'An officer from KKP (Kementerian Kelautan dan Perikanan) and an MCCI representative present the "CSR MCCI Support Fisheries with KKP" sign — blue water-storage drums stacked behind them, ready for handover to the local fishing community.',
      role: 'Coordinated logistics with the KKP focal point and documented the handover for the CSR report.',
    },
    {
      src: 'assets/activities/nelayan-kkp.jpg',
      tag: 'CSR · Ramadhan',
      title: 'Donasi Ramadhan & Idul Fitri 1447H',
      year: '2026',
      location: 'Fishing community, Banten',
      partners: ['Local fisherman community', 'MCCI'],
      desc: 'Handover photo with members of a coastal community — holding the MCCI "Corporate Social Responsibility · Donasi Ramadhan dan Idul Fitri 1447H" placard, with packed white sembako bags lined up at their feet, ready for distribution to each household.',
      role: 'Part of the on-site MCCI team — handover, distribution flow, and documentation.',
    },
    {
      src: 'assets/activities/mudik-walikota.jpg',
      tag: 'Community Event',
      title: 'Mudik Gratis 2026 — Opening Ceremony',
      year: '2026',
      location: 'Cilegon City Square',
      partners: ['Walikota Cilegon', 'TNI/POLRI', 'Bank BJB', 'MCCI'],
      desc: 'Stage line-up at the official opening of Cilegon\'s "Mudik Gratis Penuh Berkah 2026" — the Mayor of Cilegon (Walikota) center-stage flanked by TNI, POLRI, Garnisun, and Dishub officers, with corporate partners including MCCI behind. A multi-stakeholder program that gets thousands of people home safely for Idul Fitri at zero cost.',
      role: 'On-site as MCCI Corporate Affairs documentation lead for the ceremony.',
      span: 'wide',
    },
    {
      src: 'assets/activities/mudik-bus.jpg',
      tag: 'Documentation',
      title: 'Mudik Gratis — Cilegon → Semarang, Bus #27',
      year: '2026',
      location: 'Cilegon departure point',
      partners: ['Pemkot Cilegon', 'MCCI'],
      desc: 'Bus 27 of the Mudik Gratis fleet — "Pariwisata Mudik Gratis Penuh Berkah 2026 · Cilegon → Semarang via Pekalongan" — sponsored by MCCI. Captured at departure before the run-down call with the passengers.',
      role: 'Captured the per-bus departure documentation used across MCCI socials and the Pemkot report.',
    },
    {
      src: 'assets/activities/idul-adha.jpg',
      tag: 'CSR · Idul Adha',
      title: 'Qurban Prep — Villa Ternak',
      year: '2025',
      location: 'Villa Ternak / Villa Qurban',
      partners: ['Villa Qurban', 'MCCI'],
      desc: 'Sheep and goats lined up at the "Villa Ternak · Villa Qurban" partner farm during Qurban procurement for MCCI\'s Idul Adha program. From here the livestock are dispatched to surrounding mosques for slaughter and meat distribution to local families.',
      role: 'Site visit for livestock verification (count, condition, certification) before the program ran.',
    },
    {
      src: 'assets/activities/sembako-ramadhan.jpg',
      tag: 'CSR · Ramadhan',
      title: 'Beras Donasi Idul Fitri 2026',
      year: '2026',
      location: 'Cilegon distribution point',
      partners: ['Local community partners', 'MCCI'],
      desc: 'Pickup truck stacked with bags of donated rice — each one stamped "Beras Donasi Hari Raya Idul Fitri Tahun 2026 · MCCI · Harmonize for Sustainable Growth". Hundreds of packs heading out to surrounding villages for the Ramadhan distribution.',
      role: 'Helped coordinate packing, loading, and distribution logistics across multiple drop points.',
    },
    {
      src: 'assets/activities/industry-tour-its.jpg',
      tag: 'Industry · Hosting',
      title: 'ITS K63 Study Excursion',
      year: '2026',
      location: 'PT MCCI Administration Building',
      partners: ['Teknik Kimia ITS Surabaya', 'MCCI'],
      desc: 'Sixty-plus Chemical Engineering students from ITS Surabaya (Departemen Teknik Kimia, Angkatan K63) on their 21–24 April 2026 Study Excursion across Jawa Timur, Banten, and Jawa Barat — hosted at MCCI for a plant tour and Corporate Affairs Q&A.',
      role: 'Front-of-house coordination for guest reception, welcome materials, and group portrait.',
    },
    {
      src: 'assets/activities/powerbi-presentation.jpg',
      tag: 'Reporting · Internal',
      title: 'Power BI Presentation — "My Task"',
      year: '2026',
      location: 'MCCI Meeting Room',
      partners: ['Corporate Affairs Team'],
      desc: 'Walking the team through "My Task" — the scope of what trainees support across CSR: proposal review, program preparation (Saung Aksara, Kebun Gizi, UMKM, tree planting, waste bank), stakeholder communication, documentation, content scheduling, and Instagram analytics through the Power BI dashboard.',
      role: 'Owned the Instagram analytics & content-calendar workstream; presented findings to the team.',
    },
  ];

  // Modal state for click-to-expand
  const [openIdx, setOpenIdx] = React.useState(null);
  const open = openIdx !== null ? activities[openIdx] : null;

  React.useEffect(() => {
    if (openIdx === null) return;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx((i) => (i + 1) % activities.length);
      if (e.key === 'ArrowLeft') setOpenIdx((i) => (i - 1 + activities.length) % activities.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [openIdx]);

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">05 — Selected Work & Activities</span>
          <h2>Real <span className="serif hl">work,</span> real impact.</h2>
          <p style={{ fontSize: 17, maxWidth: 680 }}>
            A featured analytics project alongside a documented portfolio of CSR, community, and corporate-affairs activities from PT Merak Chemicals Indonesia.
          </p>
        </div>

        {/* FEATURED — AFTER MOVIE */}
        <FeaturedAfterMovie />

        {/* FEATURED PROJECT */}
        <div className="reveal featured-project glass" style={{
          padding: 0, overflow: 'hidden', marginBottom: 48,
          display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
        }}>
          <div style={{
            position: 'relative', background: 'var(--c-img-mount)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 28, minHeight: 360,
            borderRight: '1px solid var(--hairline)',
          }}>
            <img src="assets/powerbi-dashboard.png" alt="Instagram Performance Dashboard — Power BI"
              style={{
                width: '100%', height: 'auto', borderRadius: 8, display: 'block',
                boxShadow: '0 24px 60px -20px var(--c-shadow-09)',
              }}/>
            <div style={{
              position: 'absolute', top: 16, left: 16,
              padding: '6px 12px', borderRadius: 999, fontSize: 11,
              background: 'color-mix(in oklch, var(--c-panel) 85%, transparent)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--hairline-strong)', color: 'var(--accent)',
              letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }}/>
              Featured Project
            </div>
          </div>
          <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'color-mix(in oklch, var(--c-accent) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--c-accent) 20%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
              }}>
                <Icon name="eye" size={18}/>
              </div>
              <div className="mono" style={{ color: 'var(--accent)' }}>Power BI · Analytics</div>
            </div>
            <h3 style={{ fontSize: 'clamp(28px, 3vw, 36px)', letterSpacing: '-0.02em' }}>
              Instagram Performance Dashboard
            </h3>
            <p style={{ fontSize: 15 }}>
              Built for PT Merak Chemicals Indonesia to track the company's social media health at a glance.
              The dashboard surfaces follower and likes growth, engagement rate, and month-over-month trends —
              turning raw Instagram metrics into something the team can actually act on.
            </p>

            {/* KPI strip pulled from the dashboard */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
              padding: 16, borderRadius: 12,
              background: 'var(--c-line-04)', border: '1px solid var(--hairline)',
              marginTop: 4,
            }}>
              {[
                { k: '391', l: 'Followers' },
                { k: '635', l: 'Likes' },
                { k: '87', l: 'Comments' },
                { k: '10', l: 'Posts' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)' }}>{s.k}</div>
                  <div className="mono" style={{ marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {['Power BI', 'DAX', 'Data Modeling', 'Social KPIs', 'Reporting'].map((s, j) => (
                <span key={j} style={{
                  padding: '5px 10px', borderRadius: 999, fontSize: 11,
                  background: 'var(--c-line-05)', border: '1px solid var(--hairline)',
                  color: 'var(--text-2)',
                }}>{s}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems:'center', gap: 16, marginTop: 8, color: 'var(--text-3)', fontSize: 12 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon name="calendar" size={12}/> Oct 2025 — Mar 2026</span>
              <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon name="briefcase" size={12}/> PT Merak Chemicals Indonesia</span>
            </div>
          </div>
        </div>

        {/* ACTIVITIES BENTO GALLERY */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="mono" style={{ marginBottom: 8 }}>// activity log · 16 entries</div>
            <h3 style={{ fontSize: 28 }}>Activity Gallery</h3>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-3)', maxWidth: 360 }}>
            Click any photo to pop open the full description, role, and partners.
          </p>
        </div>

        <div className="bento-grid">
          {activities.map((a, i) => (
            <button
              key={i}
              onClick={() => setOpenIdx(i)}
              className={`bento-card tilt-3d reveal ${a.span || ''}`}
              data-tilt-max="6"
              aria-label={`Open ${a.title}`}
            >
              <img src={a.src} alt={a.title} loading="lazy"
                style={{ objectFit: a.fit === 'contain' ? 'contain' : 'cover' }}/>
              <div className="bento-gradient"/>
              <div className="bento-tag">{a.tag}</div>
              <div className="bento-info">
                <h4>{a.title}</h4>
                <div className="bento-meta">
                  <span>{a.year}</span>
                  <span className="dot-sep">·</span>
                  <span>{a.location}</span>
                </div>
              </div>
              <div className="bento-zoom" aria-hidden="true">
                <Icon name="plus" size={14}/>
              </div>
            </button>
          ))}
        </div>

        {/* MODAL / LIGHTBOX */}
        {open && (
          <div
            className="lightbox"
            onClick={(e) => { if (e.target.classList.contains('lightbox')) setOpenIdx(null); }}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <button className="lb-close" onClick={() => setOpenIdx(null)} aria-label="Close">
              <Icon name="close" size={18}/>
            </button>
            <button className="lb-nav lb-prev" onClick={() => setOpenIdx((openIdx - 1 + activities.length) % activities.length)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="lb-nav lb-next" onClick={() => setOpenIdx((openIdx + 1) % activities.length)} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="lb-card">
              <div className="lb-image-wrap">
                <img src={open.src} alt={open.title}/>
              </div>
              <div className="lb-body">
                <div className="lb-tag">
                  <span className="dot"/>{open.tag}
                </div>
                <h3 className="lb-title">{open.title}</h3>

                <div className="lb-meta">
                  <span><Icon name="calendar" size={12}/> {open.year}</span>
                  <span><Icon name="pin" size={12}/> {open.location}</span>
                  <span><Icon name="briefcase" size={12}/> PT Merak Chemicals Indonesia</span>
                </div>

                <p className="lb-desc">{open.desc}</p>

                <div className="lb-section">
                  <div className="mono">My role</div>
                  <p className="lb-role">{open.role}</p>
                </div>

                {open.partners && open.partners.length > 0 && (
                  <div className="lb-section">
                    <div className="mono">Partners</div>
                    <div className="lb-partners">
                      {open.partners.map((p, j) => (
                        <span key={j} className="lb-chip">{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="lb-counter">
                  <span className="mono">{String(openIdx + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}</span>
                  <span className="mono lb-hint">← → keys to navigate · Esc to close</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        /* ============ AFTER MOVIE PLAYER ============ */
        .after-movie { margin-bottom: 24px !important; }
        .am-player {
          position: relative; overflow: hidden; min-height: 360px;
          cursor: pointer; border-right: 1px solid var(--hairline);
          background: var(--c-bg-card);
        }
        .am-player img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
          filter: saturate(1) brightness(0.78);
        }
        .am-player:hover img { transform: scale(1.03); filter: saturate(1.05) brightness(0.85); }
        .am-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse at 30% 30%, color-mix(in oklch, var(--c-accent) 18%, transparent), transparent 55%),
            linear-gradient(180deg, oklch(0 0 0 / 0.20) 0%, transparent 25%, transparent 50%, oklch(0 0 0 / 0.75) 100%);
        }
        .am-badge {
          position: absolute; top: 18px; left: 18px;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 12px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: color-mix(in oklch, var(--c-on-accent) 90%, transparent); backdrop-filter: blur(10px);
          border: 1px solid var(--c-line-10); color: var(--text);
        }
        .am-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 10px var(--accent-glow);
          animation: pulse 2s ease-in-out infinite;
        }
        .am-drive {
          position: absolute; top: 18px; right: 18px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: color-mix(in oklch, var(--c-on-accent) 90%, transparent); backdrop-filter: blur(10px);
          border: 1px solid var(--c-line-10);
          color: var(--text); text-decoration: none;
          transition: all 0.25s ease;
        }
        .am-drive:hover {
          background: var(--accent); color: var(--c-on-accent);
          border-color: var(--accent); box-shadow: 0 0 24px var(--accent-glow);
        }
        .am-play {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 88px; height: 88px; border-radius: 50%;
          background: oklch(0.95 0.005 240 / 0.95);
          color: var(--c-on-accent);
          display: flex; align-items: center; justify-content: center;
          padding-left: 4px;
          box-shadow: 0 20px 60px -10px var(--c-shadow-10), 0 0 0 0 var(--accent-glow);
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .am-play.is-playing {
          padding-left: 0;
          background: var(--accent);
          box-shadow: 0 20px 60px -10px var(--c-shadow-10), 0 0 0 12px color-mix(in oklch, var(--c-accent) 15%, transparent);
        }
        .am-player:hover .am-play {
          transform: translate(-50%, -50%) scale(1.06);
          box-shadow: 0 26px 70px -10px var(--c-shadow-12), 0 0 60px -10px var(--accent-glow);
        }
        .am-eq {
          position: absolute; bottom: 72px; left: 50%;
          transform: translateX(-50%);
          display: flex; align-items: flex-end; gap: 4px;
          height: 28px; pointer-events: none;
        }
        .am-eq span {
          display: block; width: 3px; height: 100%;
          background: var(--accent);
          border-radius: 2px;
          box-shadow: 0 0 8px var(--accent-glow);
          animation: eqBar 0.9s ease-in-out infinite alternate;
          transform-origin: bottom;
        }
        @keyframes eqBar {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
        .am-controls {
          position: absolute; left: 24px; right: 24px; bottom: 22px;
          display: flex; align-items: center; gap: 14px;
          color: var(--c-on-accent);
        }
        .am-time {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; color: var(--c-on-accent);
          text-shadow: 0 1px 8px oklch(0 0 0 / 0.5);
          min-width: 40px;
        }
        .am-progress {
          flex: 1; height: 4px; border-radius: 99px;
          background: oklch(1 0 0 / 0.30); position: relative;
          cursor: pointer; overflow: visible;
        }
        .am-progress-fill {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, var(--accent), var(--c-accent-2t));
          border-radius: 99px;
          box-shadow: 0 0 10px var(--accent-glow);
          transition: width 0.1s linear;
        }
        .am-progress-thumb {
          position: absolute; top: 50%;
          width: 12px; height: 12px; border-radius: 50%;
          background: white; transform: translate(-50%, -50%);
          opacity: 0; transition: opacity 0.2s ease;
          box-shadow: 0 0 12px var(--accent-glow);
        }
        .am-progress:hover .am-progress-thumb { opacity: 1; }

        /* Credits */
        .am-credits {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
          padding: 16px; margin-top: 4px;
          background: var(--c-line-04); border: 1px solid var(--hairline);
          border-radius: 12px;
        }
        .am-credit { display: flex; flex-direction: column; gap: 3px; }
        .am-credit-name { font-size: 13px; font-weight: 500; color: var(--text); letter-spacing: -0.01em; }
        .am-credit-sub { font-size: 11px; color: var(--text-3); }

        @media (max-width: 900px) {
          .after-movie { grid-template-columns: 1fr !important; }
          .am-player { border-right: none; border-bottom: 1px solid var(--hairline); min-height: 280px; }
          .am-play { width: 72px; height: 72px; }
        }
        @media (max-width: 560px) {
          .am-credits { grid-template-columns: 1fr; }
        }

        .featured-project { transition: all 0.4s ease; }
        .featured-project:hover { border-color: color-mix(in oklch, var(--c-accent) 30%, transparent); box-shadow: 0 40px 90px -30px var(--accent-glow); }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 12px;
          grid-auto-flow: dense;
        }
        .bento-card.wide { grid-column: span 2; }
        .bento-card.tall { grid-row: span 2; }
        .bento-card.big { grid-column: span 2; grid-row: span 2; }
        .bento-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--hairline);
          background: var(--c-surface-3);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          padding: 0;
          font-family: inherit;
          color: inherit;
          text-align: left;
        }
        .bento-card img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
          filter: saturate(0.92) brightness(0.92);
        }
        .bento-card:hover { border-color: color-mix(in oklch, var(--c-accent) 40%, transparent); box-shadow: 0 24px 60px -24px var(--accent-glow); transform: translateY(-3px); }
        .bento-card:hover img { transform: scale(1.06); filter: saturate(1) brightness(1); }
        .bento-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .bento-gradient {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, color-mix(in oklch, var(--c-panel) 15%, transparent) 0%, transparent 28%, transparent 45%, color-mix(in oklch, var(--c-panel) 96%, transparent) 100%);
        }
        .bento-tag {
          position: absolute; top: 12px; left: 12px;
          padding: 5px 10px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: color-mix(in oklch, var(--c-on-accent) 92%, transparent); backdrop-filter: blur(10px);
          border: 1px solid var(--c-line-10); color: var(--accent-deep);
        }
        .bento-zoom {
          position: absolute; top: 12px; right: 12px;
          width: 30px; height: 30px; border-radius: 50%;
          background: color-mix(in oklch, var(--c-on-accent) 92%, transparent); backdrop-filter: blur(10px);
          border: 1px solid var(--c-line-10); color: var(--text);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.85);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .bento-card:hover .bento-zoom {
          opacity: 1; transform: scale(1);
          background: var(--accent); color: var(--c-on-accent); border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .bento-info {
          position: absolute; left: 16px; right: 16px; bottom: 14px;
          color: var(--text);
        }
        .bento-info h4 {
          font-family: 'Manrope', sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
          margin: 0 0 4px; line-height: 1.25;
        }
        .bento-meta {
          display: flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-3);
        }
        .bento-meta .dot-sep { opacity: 0.6; }
        .bento-desc {
          font-size: 12px; line-height: 1.5;
          color: var(--text-2); margin: 0;
        }
        .bento-cta {
          margin-top: 10px;
          display: flex; align-items: center; justify-content: flex-start;
        }
        .bento-cta-text {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent); display: inline-flex; align-items: center; gap: 6px;
        }

        /* POP animation when clicked */
        .bento-pop {
          margin-top: 10px;
          animation: bentoPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: top center;
        }
        @keyframes bentoPop {
          0% { opacity: 0; transform: scale(0.85) translateY(8px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Flipped card visual emphasis */
        .bento-card.is-flipped {
          z-index: 10;
          border-color: color-mix(in oklch, var(--c-accent) 50%, transparent) !important;
          box-shadow: 0 24px 60px -16px var(--accent-glow), 0 40px 100px -30px var(--c-shadow-12) !important;
        }
        .bento-card.is-flipped img {
          filter: saturate(0.6) brightness(0.45) blur(2px);
        }
        .bento-card.is-flipped .bento-info {
          /* Stretch info background to make text readable over the dimmed image */
          background: linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--c-bg-card) 92%, transparent) 30%, color-mix(in oklch, var(--c-bg-card) 96%, transparent) 100%);
          padding: 14px 16px 16px;
          margin: -14px -16px -14px;
          border-radius: 0 0 16px 16px;
        }
        .bento-card.is-flipped .bento-zoom {
          opacity: 1; transform: scale(1);
          background: var(--accent); color: var(--c-on-accent);
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-glow);
        }
        @media (hover: none) {
          .bento-cta { display: flex; }
        }

        /* ============ LIGHTBOX / MODAL ============ */
        .lightbox {
          position: fixed; inset: 0; z-index: 9999;
          background: oklch(0.30 0.05 50 / 0.55);
          backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
          animation: lbFadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        /* POP animation on the lightbox card */
        @keyframes lbPop {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .lb-card {
          position: relative;
          width: 100%; max-width: 1180px; max-height: calc(100vh - 64px);
          background: linear-gradient(180deg, color-mix(in oklch, var(--c-surface-5) 98%, transparent), color-mix(in oklch, var(--c-bg2) 98%, transparent));
          border: 1px solid var(--hairline-strong);
          border-radius: 22px; overflow: hidden;
          display: grid; grid-template-columns: 1.2fr 1fr;
          box-shadow: 0 60px 120px -40px var(--c-shadow-14), 0 0 100px -40px var(--accent-glow);
          opacity: 1;
          animation: lbPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transform-origin: center center;
          z-index: 1;
        }
        .lb-image-wrap {
          position: relative;
          background: var(--c-bg-card);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          min-height: 320px;
        }
        .lb-image-wrap img {
          width: 100%; height: 100%; object-fit: contain;
          max-height: calc(100vh - 64px);
        }
        .lb-body {
          padding: 40px; display: flex; flex-direction: column; gap: 18px;
          overflow-y: auto;
        }
        .lb-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 12px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: color-mix(in oklch, var(--c-accent) 10%, transparent);
          border: 1px solid color-mix(in oklch, var(--c-accent) 25%, transparent);
          color: var(--accent); align-self: flex-start;
        }
        .lb-tag .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 10px var(--accent-glow);
        }
        .lb-title {
          font-size: clamp(24px, 2.4vw, 32px);
          letter-spacing: -0.02em; margin: 0; line-height: 1.1;
        }
        .lb-meta {
          display: flex; flex-wrap: wrap; gap: 14px;
          padding-bottom: 18px; border-bottom: 1px solid var(--hairline);
          color: var(--text-3); font-size: 12px;
        }
        .lb-meta span {
          display: inline-flex; align-items: center; gap: 6px;
        }
        .lb-desc {
          font-size: 15px; line-height: 1.65; color: var(--text-2); margin: 0;
        }
        .lb-section .mono { margin-bottom: 8px; }
        .lb-role {
          font-size: 14px; line-height: 1.55; color: var(--text-2); margin: 0;
          padding-left: 14px; border-left: 2px solid var(--accent);
        }
        .lb-partners {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .lb-chip {
          padding: 5px 10px; border-radius: 999px; font-size: 11px;
          background: var(--c-line-05); border: 1px solid var(--hairline);
          color: var(--text-2);
        }
        .lb-counter {
          margin-top: auto; padding-top: 16px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--hairline); gap: 12px;
        }
        .lb-counter .mono:first-child { color: var(--accent); }
        .lb-hint { opacity: 0.7; }

        .lb-close, .lb-nav {
          position: fixed; z-index: 10000;
          width: 44px; height: 44px; border-radius: 50%;
          background: color-mix(in oklch, var(--c-surface-4) 70%, transparent); backdrop-filter: blur(16px);
          border: 1px solid var(--hairline-strong);
          color: var(--text);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .lb-close { top: 24px; right: 24px; }
        .lb-nav { top: 50%; transform: translateY(-50%); }
        .lb-prev { left: 24px; }
        .lb-next { right: 24px; }
        .lb-close:hover, .lb-nav:hover {
          background: var(--accent); color: var(--c-on-accent);
          border-color: var(--accent); box-shadow: 0 0 24px var(--accent-glow);
        }

        @media (max-width: 1100px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; }
          .bento-card.wide { grid-column: span 2; }
          .bento-card.tall { grid-row: span 2; }
        }
        @media (max-width: 900px) {
          .featured-project { grid-template-columns: 1fr !important; }
          .featured-project > div:first-child { border-right: none !important; border-bottom: 1px solid var(--hairline); min-height: auto !important; }
          .lb-card { grid-template-columns: 1fr; max-height: calc(100vh - 64px); }
          .lb-image-wrap { min-height: 260px; max-height: 40vh; }
          .lb-image-wrap img { max-height: 40vh; }
          .lb-body { padding: 28px; }
          .lb-nav { width: 38px; height: 38px; }
          .lb-prev { left: 12px; }
          .lb-next { right: 12px; }
          .lb-close { top: 12px; right: 12px; }
        }
        @media (max-width: 720px) {
          .bento-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 180px; }
          .bento-card.wide { grid-column: span 2; }
          .bento-card.tall { grid-row: span 2; }
          .bento-zoom { opacity: 1; transform: scale(1); }
          .lightbox { padding: 0; }
          .lb-card { border-radius: 0; max-width: 100%; max-height: 100vh; height: 100vh; }
        }
      `}</style>
    </section>
  );
}

/* -------------------------- CERTIFICATIONS -------------------------- */
function Certifications() {
  const featured = [
    {
      tier: 'BNSP · National Competence',
      title: 'Marketing',
      titleSub: 'Sertifikasi Kompetensi',
      issuer: 'Badan Nasional Sertifikasi Profesi',
      issuerSub: 'Government-recognized competence certification · Republic of Indonesia',
      score: 'KOMPETEN',
      scoreLabel: 'Status',
      date: '2026',
      ref: 'BNSP · Marketing',
      pdf: 'assets/certs/Sertifikat-BNSP-Marketing.pdf',
      icon: 'megaphone',
      accent: 'gold',
    },
    {
      tier: 'Kemnaker RI · MCCI',
      title: 'Internship',
      titleSub: 'Higher-Education Internship',
      issuer: 'Kementerian Ketenagakerjaan RI',
      issuerSub: '6-month program · Administrasi · PT Merak Chemicals Indonesia',
      score: 'Sangat Baik',
      scoreLabel: 'Predikat',
      date: 'May 2026',
      ref: 'MN.036.012371.02.2025',
      pdf: 'assets/Sertifikat-Magang.pdf',
      icon: 'shield',
      accent: 'emerald',
    },
  ];

  const skills = [
    { title: 'Design Thinking', score: '100', date: '02 Jan 2026', pdf: 'assets/certs/Sertifikat-Design-Thinking.pdf', icon: 'sparkles' },
    { title: 'Self Efficacy', score: '100', date: '11 Feb 2026', pdf: 'assets/certs/Sertifikat-Self-Efficacy.pdf', icon: 'target' },
    { title: 'Emotional Intelligence', score: '80', date: '25 Feb 2026', pdf: 'assets/certs/Sertifikat-Emotional-Intelligence.pdf', icon: 'message' },
  ];

  const training = [
    {
      title: 'Effective Business Communication',
      sub: 'Komunikasi Bisnis yang Efektif',
      date: '21 Feb – 04 Mar 2022', year: '2022',
      ref: 'NO. 096573',
      pdf: 'assets/certs/Sertifikat-Effective-Business-Communication.pdf',
      icon: 'message',
    },
    {
      title: 'Marketing Environment Analysis',
      sub: 'Analisis Lingkungan Pemasaran',
      date: '20 – 25 Jun 2022', year: '2022',
      ref: 'NO. 218305',
      pdf: 'assets/certs/Sertifikat-Marketing-Environment-Analysis.pdf',
      icon: 'eye',
    },
    {
      title: 'Brevet Pajak Online',
      sub: 'Tax Brevet · Income, VAT, PBB, BPHTB',
      date: '21 – 25 Nov 2022', year: '2022',
      ref: 'NO. 706738',
      pdf: 'assets/certs/Sertifikat-Brevet-Pajak.pdf',
      icon: 'doc',
    },
    {
      title: 'Corporate Income Taxes',
      sub: 'Pajak Penghasilan Perusahaan',
      date: '20 Jan 2023', year: '2023',
      ref: 'NO. 731710',
      pdf: 'assets/certs/Sertifikat-Corporate-Income-Taxes.pdf',
      icon: 'briefcase',
    },
    {
      title: 'Marketing Research Planning',
      sub: 'Perencanaan Riset Pemasaran',
      date: '27 Feb – 04 Mar 2023', year: '2023',
      ref: 'NO. 584874',
      pdf: 'assets/certs/Sertifikat-Marketing-Research-Planning.pdf',
      icon: 'target',
    },
    {
      title: 'Development of Brand Promotion Strategy',
      sub: 'Pengembangan Strategi Promosi Merek',
      date: '19 – 24 Jun 2023', year: '2023',
      ref: 'NO. 891489',
      pdf: 'assets/certs/Sertifikat-Brand-Promotion-Strategy.pdf',
      icon: 'megaphone',
    },
    {
      title: 'E-Marketing Strategies Planner',
      sub: 'Perencana Strategi Pemasaran Elektronik',
      date: '19 Feb – 02 Mar 2024', year: '2024',
      ref: 'NO. 745548',
      pdf: 'assets/certs/Sertifikat-E-Marketing-Strategies.pdf',
      icon: 'lightning',
    },
    {
      title: 'Development & Implementation of Business Strategy',
      sub: 'Pengembangan dan Penerapan Strategi Bisnis',
      date: '24 – 29 Jun 2024', year: '2024',
      ref: 'NO. 127481',
      pdf: 'assets/certs/Sertifikat-Business-Strategy.pdf',
      icon: 'lightning',
    },
    {
      title: 'Service Design, Reputation, Global Expansion & Sales Strategy',
      sub: 'Desain Layanan · Manajemen Reputasi · Ekspansi Global',
      date: '23 – 28 Sep 2024', year: '2024',
      ref: 'NO. 260809',
      pdf: 'assets/certs/Sertifikat-Service-Design-Sales-Strategy.pdf',
      icon: 'star',
    },
    {
      title: 'Aptitude Test',
      sub: 'Fakultas Psikologi · Universitas Gunadarma',
      date: '08 Mar 2025', year: '2025',
      ref: 'NO. 637554/AT/FPSI/2025',
      pdf: 'assets/certs/Sertifikat-Aptitude-Test.pdf',
      icon: 'check',
    },
    {
      title: 'Excellence in Team Leadership & Credit Customer Management',
      sub: 'Keunggulan Kepemimpinan Tim dan Pengelolaan Nasabah Kredit',
      date: '27 May – 14 Jun 2025', year: '2025',
      ref: 'NO. 817069',
      pdf: 'assets/certs/Sertifikat-Team-Leadership-Credit.pdf',
      icon: 'users',
    },
  ];

  return (
    <section id="certifications">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">03 — Certifications</span>
          <h2>Officially <span className="serif hl">certified.</span></h2>
          <p style={{ fontSize: 17, maxWidth: 680 }}>
            Government-issued credentials from BNSP and Kemnaker RI, essential-skills certifications from GNIK, and professional training programs from Universitas Gunadarma. Click any card to open the original PDF.
          </p>
        </div>

        {/* TIER 1 — Featured premium cards */}
        <div className="cert-featured-grid reveal">
          {featured.map((c, i) => (
            <a
              key={i}
              href={c.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={`cert-elite cert-elite-${c.accent}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Holographic shine overlay */}
              <div className="cert-elite-shine" aria-hidden="true"/>
              {/* Glow corner */}
              <div className="cert-elite-corner" aria-hidden="true"/>

              {/* Tier ribbon */}
              <div className="cert-elite-tier">
                <span className="cert-elite-tier-dot"/>
                <span>{c.tier}</span>
              </div>

              {/* Icon + arrow */}
              <div className="cert-elite-meta">
                <div className="cert-elite-icon">
                  <Icon name={c.icon} size={22}/>
                </div>
                <div className="cert-elite-arrow" aria-hidden="true">
                  <Icon name="arrow-up-right" size={16}/>
                </div>
              </div>

              {/* Title */}
              <div className="cert-elite-title-wrap">
                <div className="cert-elite-title-sub">{c.titleSub}</div>
                <h3 className="cert-elite-title">{c.title}</h3>
              </div>

              {/* Issuer */}
              <div className="cert-elite-issuer">
                <div className="cert-elite-issuer-name">{c.issuer}</div>
                <div className="cert-elite-issuer-sub">{c.issuerSub}</div>
              </div>

              {/* Score block */}
              <div className="cert-elite-score-block">
                <div className="cert-elite-score-label mono">{c.scoreLabel}</div>
                <div className="cert-elite-score-value">{c.score}</div>
                <div className="cert-elite-score-line"/>
                <div className="cert-elite-foot">
                  <span className="mono">Issued · {c.date}</span>
                  <span className="mono cert-elite-ref">{c.ref}</span>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="cert-elite-cta">
                <span>Open PDF</span>
                <Icon name="arrow-up-right" size={14}/>
              </div>
            </a>
          ))}
        </div>

        {/* TIER 2 — Essential skills badges */}
        <div className="cert-skills-head reveal">
          <span className="cert-skills-line"/>
          <span className="mono">Essential Skills · GNIK × Kemnaker RI</span>
          <span className="cert-skills-line"/>
        </div>
        <div className="cert-skills-grid reveal">
          {skills.map((s, i) => (
            <a key={i} href={s.pdf} target="_blank" rel="noopener noreferrer" className="cert-skill">
              <div className="cert-skill-icon"><Icon name={s.icon} size={16}/></div>
              <div className="cert-skill-info">
                <div className="cert-skill-title">{s.title}</div>
                <div className="cert-skill-date mono">{s.date}</div>
              </div>
              <div className="cert-skill-score">
                <span className="cert-skill-score-num">{s.score}</span>
                <span className="mono">/100</span>
              </div>
              <div className="cert-skill-link" aria-hidden="true">
                <Icon name="arrow-up-right" size={12}/>
              </div>
            </a>
          ))}
        </div>

        {/* TIER 3 — Professional training (Universitas Gunadarma) */}
        <div className="cert-skills-head reveal" style={{ marginTop: 56 }}>
          <span className="cert-skills-line"/>
          <span className="mono">Professional Training · Universitas Gunadarma</span>
          <span className="cert-skills-line"/>
        </div>
        <div className="cert-training-grid reveal">
          {training.map((t, i) => (
            <a key={i} href={t.pdf} target="_blank" rel="noopener noreferrer" className="cert-training">
              <div className="cert-training-top">
                <div className="cert-training-icon"><Icon name={t.icon} size={14}/></div>
                <span className="mono cert-training-year">{t.year}</span>
              </div>
              <div className="cert-training-body">
                <h4 className="cert-training-title">{t.title}</h4>
                <div className="cert-training-sub">{t.sub}</div>
              </div>
              <div className="cert-training-foot">
                <span className="mono cert-training-date">{t.date}</span>
                <span className="mono cert-training-ref">{t.ref}</span>
              </div>
              <div className="cert-training-arrow" aria-hidden="true">
                <Icon name="arrow-up-right" size={12}/>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* ============ TIER 1 ELITE CARDS ============ */
        .cert-featured-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
          margin-bottom: 56px;
        }

        .cert-elite {
          position: relative;
          padding: 36px 32px 80px;
          min-height: 480px;
          border-radius: 24px;
          text-decoration: none; color: var(--text);
          overflow: hidden; isolation: isolate;
          display: flex; flex-direction: column; gap: 24px;
          border: 1px solid;
          opacity: 0; transform: translateY(40px);
          animation: certRise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s ease, box-shadow 0.5s ease;
        }
        @keyframes certRise { to { opacity: 1; transform: translateY(0); } }

        /* === Gold variant (BNSP) === */
        .cert-elite-gold {
          background:
            radial-gradient(ellipse 80% 60% at 0% 0%, color-mix(in oklch, var(--c-gold-tint) 45%, transparent), transparent 60%),
            radial-gradient(ellipse 60% 60% at 100% 100%, color-mix(in oklch, var(--c-gold-tint2) 35%, transparent), transparent 60%),
            linear-gradient(160deg, var(--c-gold-bg) 0%, var(--c-gold-bg2) 100%);
          border-color: color-mix(in oklch, var(--c-gold-deep2) 30%, transparent);
          box-shadow:
            0 1px 0 color-mix(in oklch, var(--c-gold) 15%, transparent) inset,
            0 0 0 1px color-mix(in oklch, var(--c-gold-deep2) 8%, transparent) inset,
            0 4px 12px var(--c-shadow-07),
            0 32px 80px -20px oklch(0.40 0.14 75 / 0.4),
            0 60px 120px -40px var(--c-shadow-10);
        }
        .cert-elite-gold .cert-elite-tier-dot,
        .cert-elite-gold .cert-elite-icon,
        .cert-elite-gold .cert-elite-score-value {
          color: var(--c-gold);
        }
        .cert-elite-gold .cert-elite-icon {
          background: color-mix(in oklch, var(--c-gold) 14%, transparent);
          border-color: color-mix(in oklch, var(--c-gold) 30%, transparent);
        }
        .cert-elite-gold .cert-elite-score-value {
          filter: drop-shadow(0 0 24px color-mix(in oklch, var(--c-gold) 40%, transparent));
        }
        .cert-elite-gold:hover {
          border-color: color-mix(in oklch, var(--c-gold-mid) 50%, transparent);
          box-shadow:
            0 1px 0 color-mix(in oklch, var(--c-gold) 20%, transparent) inset,
            0 0 0 1px color-mix(in oklch, var(--c-gold-deep2) 12%, transparent) inset,
            0 8px 24px var(--c-shadow-09),
            0 40px 100px -20px color-mix(in oklch, var(--c-gold-deep) 50%, transparent),
            0 80px 160px -40px var(--c-shadow-12),
            0 0 60px -10px color-mix(in oklch, var(--c-gold) 40%, transparent);
        }
        .cert-elite-gold .cert-elite-cta {
          background: linear-gradient(180deg, var(--c-gold-light), var(--c-gold-mid2));
          color: var(--c-gold-bg);
        }

        /* === Emerald variant (Pemagangan) === */
        .cert-elite-emerald {
          background:
            radial-gradient(ellipse 80% 60% at 0% 0%, color-mix(in oklch, var(--c-gold-tint3) 55%, transparent), transparent 60%),
            radial-gradient(ellipse 60% 60% at 100% 100%, color-mix(in oklch, var(--c-accent2-t) 40%, transparent), transparent 60%),
            linear-gradient(160deg, var(--c-blue-tint) 0%, var(--c-panel) 100%);
          border-color: color-mix(in oklch, var(--c-accent-7) 30%, transparent);
          box-shadow:
            0 1px 0 color-mix(in oklch, var(--c-accent-3) 15%, transparent) inset,
            0 0 0 1px color-mix(in oklch, var(--c-accent-7) 8%, transparent) inset,
            0 4px 12px var(--c-shadow-07),
            0 32px 80px -20px color-mix(in oklch, var(--c-accent-10) 40%, transparent),
            0 60px 120px -40px var(--c-shadow-10);
        }
        .cert-elite-emerald:hover {
          border-color: color-mix(in oklch, var(--c-accent-5) 50%, transparent);
          box-shadow:
            0 1px 0 color-mix(in oklch, var(--c-accent-3) 20%, transparent) inset,
            0 0 0 1px color-mix(in oklch, var(--c-accent-7) 12%, transparent) inset,
            0 8px 24px var(--c-shadow-09),
            0 40px 100px -20px var(--accent-glow),
            0 80px 160px -40px var(--c-shadow-12),
            0 0 60px -10px var(--accent-glow);
        }

        .cert-elite:hover { transform: translateY(-6px); }

        /* Holographic shine sweep */
        .cert-elite-shine {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(115deg,
            transparent 30%,
            var(--c-line-06) 45%,
            var(--c-line-09) 50%,
            var(--c-line-06) 55%,
            transparent 70%);
          background-size: 250% 100%;
          background-position: 200% 0;
          transition: background-position 1s cubic-bezier(0.2, 0.8, 0.2, 1);
          mix-blend-mode: overlay;
          z-index: 1;
        }
        .cert-elite:hover .cert-elite-shine { background-position: -100% 0; }

        /* Corner glow that pulses */
        .cert-elite-corner {
          position: absolute; top: -50%; right: -50%;
          width: 100%; height: 100%;
          background: radial-gradient(circle, var(--c-line-05) 0%, transparent 60%);
          z-index: 0;
          animation: cornerPulse 4s ease-in-out infinite;
        }
        @keyframes cornerPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

        .cert-elite > *:not(.cert-elite-shine):not(.cert-elite-corner):not(.cert-elite-cta) {
          position: relative; z-index: 2;
        }

        /* Tier ribbon */
        .cert-elite-tier {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          border-radius: 999px;
          background: var(--c-shadow-05);
          border: 1px solid var(--c-line-07);
          backdrop-filter: blur(8px);
          align-self: flex-start;
          color: var(--text-2);
        }
        .cert-elite-tier-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px currentColor;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Meta row */
        .cert-elite-meta {
          display: flex; align-items: center; justify-content: space-between;
        }
        .cert-elite-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: var(--accent-glow);
          border: 1px solid color-mix(in oklch, var(--c-accent) 30%, transparent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          box-shadow:
            0 4px 12px var(--c-shadow-06),
            0 0 24px -8px var(--accent-glow);
        }
        .cert-elite-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--c-line-05);
          border: 1px solid var(--c-line-08);
          display: flex; align-items: center; justify-content: center;
          color: var(--text);
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cert-elite:hover .cert-elite-arrow {
          transform: rotate(-25deg) scale(1.1);
          background: var(--text); color: var(--bg);
          border-color: var(--text);
        }

        /* Title */
        .cert-elite-title-wrap { display: flex; flex-direction: column; gap: 6px; }
        .cert-elite-title-sub {
          font-size: 13px; color: var(--text-3);
          font-family: 'Instrument Serif', serif; font-style: italic;
          letter-spacing: -0.005em;
        }
        .cert-elite-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700; letter-spacing: -0.035em;
          line-height: 0.95; margin: 0;
          background: linear-gradient(180deg, var(--c-line-12) 30%, var(--c-text-soft) 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }

        /* Issuer */
        .cert-elite-issuer {
          padding-top: 14px;
          border-top: 1px solid var(--c-line-07);
        }
        .cert-elite-issuer-name {
          font-size: 14px; font-weight: 500;
          color: var(--text); letter-spacing: -0.005em;
        }
        .cert-elite-issuer-sub {
          font-size: 12px; color: var(--text-3); margin-top: 4px; line-height: 1.5;
        }

        /* Score block */
        .cert-elite-score-block {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid var(--c-line-07);
          display: flex; flex-direction: column; gap: 4px;
        }
        .cert-elite-score-label { color: var(--text-3); }
        .cert-elite-score-value {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(34px, 4vw, 44px);
          color: var(--accent);
          letter-spacing: -0.01em; line-height: 1;
          filter: drop-shadow(0 0 24px var(--accent-glow));
        }
        .cert-elite-score-line {
          height: 1px; margin-top: 10px;
          background: linear-gradient(90deg, var(--c-line-09), transparent);
        }
        .cert-elite-foot {
          margin-top: 6px;
          display: flex; justify-content: space-between; gap: 12px;
          color: var(--text-3);
          flex-wrap: wrap;
        }
        .cert-elite-ref { opacity: 0.7; }

        /* CTA pill */
        .cert-elite-cta {
          position: absolute; bottom: 20px; right: 20px;
          padding: 8px 14px; border-radius: 999px;
          background: var(--accent); color: var(--c-on-accent);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 600;
          display: inline-flex; align-items: center; gap: 6px;
          opacity: 0; transform: translateY(12px) scale(0.92);
          transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 3;
          box-shadow: 0 12px 24px -4px var(--accent-glow);
        }
        .cert-elite:hover .cert-elite-cta {
          opacity: 1; transform: translateY(0) scale(1);
        }

        /* ============ TIER 2 ESSENTIAL SKILLS ============ */
        .cert-skills-head {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 18px;
        }
        .cert-skills-head .mono {
          color: var(--text-3);
          flex-shrink: 0;
        }
        .cert-skills-line {
          height: 1px; flex: 1;
          background: linear-gradient(90deg, transparent, var(--hairline), transparent);
        }

        .cert-skills-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .cert-skill {
          position: relative;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          border-radius: 14px;
          background: linear-gradient(180deg, color-mix(in oklch, var(--c-surface-5) 50%, transparent), color-mix(in oklch, var(--c-bg2) 40%, transparent));
          border: 1px solid var(--hairline);
          text-decoration: none; color: var(--text);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cert-skill::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 35%, color-mix(in oklch, var(--c-accent) 8%, transparent) 50%, transparent 65%);
          background-size: 200% 100%; background-position: 200% 0;
          transition: background-position 0.8s ease;
          pointer-events: none;
        }
        .cert-skill:hover {
          transform: translateY(-3px);
          border-color: color-mix(in oklch, var(--c-accent) 40%, transparent);
          box-shadow:
            0 4px 12px var(--c-shadow-06),
            0 16px 40px -10px var(--c-shadow-07),
            0 0 40px -12px var(--accent-glow);
        }
        .cert-skill:hover::before { background-position: -100% 0; }

        .cert-skill-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: color-mix(in oklch, var(--c-accent) 12%, transparent);
          border: 1px solid color-mix(in oklch, var(--c-accent) 20%, transparent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); flex-shrink: 0;
        }
        .cert-skill-info { flex: 1; min-width: 0; }
        .cert-skill-title {
          font-size: 15px; font-weight: 500;
          letter-spacing: -0.01em; line-height: 1.2;
        }
        .cert-skill-date { margin-top: 4px; color: var(--text-3); }
        .cert-skill-score {
          display: flex; align-items: baseline; gap: 4px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .cert-skill-score-num {
          font-family: 'Instrument Serif', serif;
          font-size: 28px; line-height: 1; letter-spacing: -0.02em;
        }
        .cert-skill-score .mono { color: var(--text-3); }
        .cert-skill-link {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--c-line-05);
          border: 1px solid var(--hairline);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-2);
          transition: all 0.3s ease; flex-shrink: 0;
        }
        .cert-skill:hover .cert-skill-link {
          background: var(--accent); color: var(--c-on-accent);
          border-color: var(--accent);
          transform: rotate(-25deg);
        }

        /* ============ TIER 3 TRAINING CARDS ============ */
        .cert-training-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .cert-training {
          position: relative;
          padding: 18px 20px 16px;
          display: flex; flex-direction: column; gap: 12px;
          border-radius: 14px;
          background: linear-gradient(180deg, color-mix(in oklch, var(--c-surface-5) 35%, transparent), color-mix(in oklch, var(--c-bg2) 25%, transparent));
          border: 1px solid var(--hairline);
          text-decoration: none; color: var(--text);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          min-height: 168px;
        }
        .cert-training::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 35%, color-mix(in oklch, var(--c-accent) 6%, transparent) 50%, transparent 65%);
          background-size: 200% 100%; background-position: 200% 0;
          transition: background-position 0.8s ease;
          pointer-events: none;
        }
        .cert-training:hover {
          transform: translateY(-3px);
          border-color: color-mix(in oklch, var(--c-accent) 35%, transparent);
          box-shadow:
            0 4px 12px var(--c-shadow-06),
            0 16px 40px -12px var(--c-shadow-07),
            0 0 32px -14px var(--accent-glow);
        }
        .cert-training:hover::before { background-position: -100% 0; }

        .cert-training-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .cert-training-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: color-mix(in oklch, var(--c-accent) 12%, transparent);
          border: 1px solid color-mix(in oklch, var(--c-accent) 20%, transparent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .cert-training-year {
          font-size: 11px;
          color: var(--text-3);
          letter-spacing: 0.04em;
        }
        .cert-training-body { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .cert-training-title {
          font-size: 14.5px; font-weight: 500;
          letter-spacing: -0.01em; line-height: 1.3;
          margin: 0;
        }
        .cert-training-sub {
          font-size: 12.5px; color: var(--text-3);
          line-height: 1.4;
          font-style: italic;
        }
        .cert-training-foot {
          display: flex; flex-direction: column; gap: 3px;
          padding-top: 10px;
          border-top: 1px dashed var(--hairline);
        }
        .cert-training-date {
          font-size: 11px; color: var(--text-2);
        }
        .cert-training-ref {
          font-size: 10px; color: var(--text-3); opacity: 0.75;
        }
        .cert-training-arrow {
          position: absolute; top: 16px; right: 16px;
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-3); opacity: 0;
          transition: all 0.3s ease;
        }
        .cert-training:hover .cert-training-arrow {
          opacity: 1; color: var(--accent);
          transform: translate(2px, -2px);
        }

        @media (max-width: 900px) {
          .cert-featured-grid { grid-template-columns: 1fr; }
          .cert-skills-grid { grid-template-columns: 1fr; }
          .cert-training-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .cert-elite { padding: 26px 22px 72px; min-height: 420px; }
          .cert-elite-foot { font-size: 9px; }
          .cert-training-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ---------------------------- EDUCATION ---------------------------- */
function Education() {
  const courses = ['Operations Management', 'Business Communication', 'Human Resource Management', 'Basic Marketing'];
  return (
    <section id="education">
      <div className="container">
        <div className="section-head reveal">
          <span className="mono">06 — Education</span>
          <h2>Academic <span className="serif hl">foundation.</span></h2>
        </div>

        <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
          <div className="reveal glass" style={{ padding: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 240, height: 240,
              background: 'radial-gradient(circle, color-mix(in oklch, var(--c-accent) 18%, transparent), transparent 60%)',
              pointerEvents: 'none',
            }}/>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 28, position:'relative' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, color-mix(in oklch, var(--c-accent) 20%, transparent), color-mix(in oklch, var(--c-accent2) 12%, transparent))',
                border: '1px solid color-mix(in oklch, var(--c-accent) 25%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
              }}>
                <Icon name="graduation" size={26}/>
              </div>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ color: 'var(--accent)', marginBottom: 6 }}>Bachelor's Degree</div>
                <h3 style={{ fontSize: 26, marginBottom: 6 }}>Management (S.E.)</h3>
                <div style={{ color: 'var(--text-2)', fontSize: 14 }}>Universitas Gunadarma · Faculty of Economics</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--hairline)' }}>
              <div>
                <div className="mono" style={{ marginBottom: 4 }}>Institution</div>
                <div style={{ fontSize: 15 }}>Universitas Gunadarma</div>
              </div>
              <div>
                <div className="mono" style={{ marginBottom: 4 }}>Location</div>
                <div style={{ fontSize: 15 }}>Indonesia</div>
              </div>
              <div>
                <div className="mono" style={{ marginBottom: 4 }}>Concentration</div>
                <div style={{ fontSize: 15 }}>Management</div>
              </div>
            </div>
            <div>
              <div className="mono" style={{ marginBottom: 14 }}>Relevant Coursework</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {courses.map((c, i) => (
                  <span key={i} style={{
                    padding: '8px 14px', borderRadius: 999, fontSize: 13,
                    background: 'var(--c-line-04)', border: '1px solid var(--hairline)',
                    color: 'var(--text-2)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="mono" style={{ paddingLeft: 4 }}>Personal Strengths</div>
            {[
              { icon: 'shield', t: 'Highly reliable and disciplined', b: 'Shows up consistently, follows through, and meets deadlines without supervision.' },
              { icon: 'target', t: 'Strong attention to detail', b: 'Catches the small inconsistencies in reports, schedules and documentation before they become problems.' },
              { icon: 'sparkles', t: 'Positive attitude & willingness to learn', b: 'Calm and approachable under pressure — treats every project as an opportunity to grow.' },
            ].map((s, i) => (
              <div key={i} className="strength-card tilt-3d glass" data-tilt-max="5" style={{
                padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start',
                transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}>
                <div style={{
                  width: 36, height: 36, flexShrink: 0, borderRadius: 10,
                  background: 'color-mix(in oklch, var(--c-accent) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--c-accent) 20%, transparent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  <Icon name={s.icon} size={16}/>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{s.t}</div>
                  <p style={{ fontSize: 13 }}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .strength-card:hover { transform: translateX(4px); border-color: color-mix(in oklch, var(--c-accent) 25%, transparent); }
        @media (max-width: 900px) { .edu-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact() {
  const channels = [
    { icon: 'mail', label: 'Email', value: 'irfankautsar99@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=irfankautsar99@gmail.com', accent: 'var(--accent)' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/muhammadirfankautsar', href: 'https://www.linkedin.com/in/muhammadirfankautsar', accent: 'var(--accent-2)' },
    { icon: 'whatsapp', label: 'WhatsApp', value: '+62 877-9697-6572', href: 'https://wa.me/6287796976572', accent: 'var(--accent)' },
    { icon: 'pin', label: 'Location', value: 'Cilegon, Banten · Indonesia', href: 'https://www.google.com/maps/search/?api=1&query=Cilegon+Banten+Indonesia', accent: 'var(--accent-2)' },
  ];
  return (
    <section id="contact" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="reveal glass" style={{
          padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--c-accent) 15%, transparent), transparent 60%)',
            pointerEvents: 'none',
          }}/>
          <div style={{ position: 'relative' }}>
            <span className="eyebrow" style={{ marginBottom: 24 }}><span className="dot"/>Let's connect</span>
            <h2 style={{ marginTop: 24, marginBottom: 20, fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Open to the <span className="serif hl">right opportunity.</span>
            </h2>
            <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto 48px' }}>
              Currently exploring Management Trainee, CSR, and General Affairs roles across Indonesia.
              The fastest way to reach me is by email or WhatsApp.
            </p>

            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 720, margin: '0 auto 40px' }}>
              {channels.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-card tilt-3d" data-tilt-max="8" style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: 20,
                  borderRadius: 14, background: 'color-mix(in oklch, var(--c-surface-4) 55%, transparent)',
                  border: '1px solid var(--hairline-strong)',
                  textDecoration: 'none', color: 'var(--text)', textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'color-mix(in oklch, var(--c-accent) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--c-accent) 18%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent,
                  }}>
                    <Icon name={c.icon} size={18}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="mono" style={{ marginBottom: 4 }}>{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                  <Icon name="arrow-up-right" size={16} style={{ flexShrink: 0 }}/>
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=irfankautsar99@gmail.com" target="_blank" rel="noopener noreferrer" className="btn primary"><Icon name="mail" size={16}/> Send a message</a>
              <a href="assets/Muhammad-Irfan-Kautsar-Resume.pdf" download className="btn"><Icon name="download" size={16}/> Download CV</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact-card:hover { transform: translateY(-2px); border-color: color-mix(in oklch, var(--c-accent) 35%, transparent); box-shadow: 0 12px 36px -16px var(--accent-glow); }
        .contact-value {
          font-size: 14px; font-weight: 500;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-value {
            white-space: normal; overflow: visible; text-overflow: clip;
            overflow-wrap: anywhere; word-break: break-word;
            line-height: 1.35;
          }
        }
      `}</style>
    </section>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 2, padding: '32px 0 48px', borderTop: '1px solid var(--hairline)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--c-on-accent)', fontWeight: 800, fontSize: 10,
          }}>M</span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>© 2025 Muhammad Irfan Kautsar — built with care.</span>
        </div>
        <div className="mono">portfolio · v1.0</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Hero, About, Experience, Certifications, Skills, Projects, FeaturedAfterMovie, Education, Contact, Footer });
