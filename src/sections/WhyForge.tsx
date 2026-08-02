import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5000, suffix: '+', label: 'Transformations' },
  { value: 97, suffix: '%', label: 'Satisfaction Rate' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Facility Access' },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
    ),
    title: 'Elite Coaches',
    desc: 'Certified professionals with 10+ years in competitive athletics and coaching.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: 'Custom Plans',
    desc: 'Personalized training and nutrition blueprints tailored to your body and goals.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Proven Results',
    desc: 'Over 5,000 transformations with a 97% client satisfaction rate.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Premium Facilities',
    desc: 'State-of-the-art equipment, recovery zones, saunas, and luxury locker rooms.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: '24/7 Access',
    desc: 'Train on your schedule. Our facilities are open around the clock.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Community',
    desc: 'Join a tribe of driven individuals who push each other toward greatness.',
  },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: elRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => setDisplayed(Math.round(obj.val)),
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className="display-md"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        <span ref={elRef}>{displayed}</span>
        <span>{suffix}</span>
      </div>
      <div
        className="label"
        style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}

export function WhyForge() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.feat-card');
    cards?.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });

    const header = sectionRef.current?.querySelector('.why-header');
    if (header) {
      gsap.fromTo(
        header.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: header, start: 'top 85%' } }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(232,164,90,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Header */}
        <div
          className="why-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'end',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}
        >
          <div>
            <span className="label reveal" style={{ display: 'block', marginBottom: '1rem' }}>
              Why Forge
            </span>
            <h2 className="display-lg reveal">
              We don't just build bodies.
            </h2>
          </div>
          <p className="body-lg reveal" style={{ alignSelf: 'end' }}>
            We build discipline, resilience, and unstoppable confidence —
            one rep at a time.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: 'clamp(4rem, 7vw, 7rem)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
          }}
        >
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>

        {/* Features */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="feat-card"
              style={{
                background: 'var(--bg-surface)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-card)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)')}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(232,164,90,0.07)',
                  borderRadius: '10px',
                  border: '1px solid rgba(232,164,90,0.15)',
                }}
              >
                {f.icon}
              </div>
              <h3 className="heading-md" style={{ marginBottom: '0.75rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive stat grid */}
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
