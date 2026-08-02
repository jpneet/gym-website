import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background text
    gsap.to(bgTextRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Content entrance
    const els = sectionRef.current?.querySelectorAll('.cta-reveal');
    if (els) {
      gsap.fromTo(
        els,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad"
      style={{
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background FORGE text */}
      <div
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 22rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.02)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        FORGE
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(232,164,90,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <span className="label cta-reveal" style={{ display: 'block', marginBottom: '1.5rem' }}>
          Start Your Journey
        </span>

        <h2
          className="display-lg cta-reveal"
          style={{ maxWidth: '720px', margin: '0 auto 1.5rem' }}
        >
          Ready to build your{' '}
          <span className="gradient-text">strongest self?</span>
        </h2>

        <p
          className="body-lg cta-reveal"
          style={{ maxWidth: '440px', margin: '0 auto 2.5rem' }}
        >
          Join a community of driven individuals pushing past their limits every single day.
          Your first session is on us.
        </p>

        <div
          className="cta-reveal"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#pricing"
            className="btn-magnetic btn-primary"
            style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}
          >
            Join Today — It's Free to Start
          </a>
          <a
            href="#programs"
            className="btn-magnetic btn-outline"
            style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}
          >
            View All Programs
          </a>
        </div>

        {/* Divider */}
        <div
          className="cta-reveal"
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            flexWrap: 'wrap',
          }}
        >
          {['No contracts', 'Cancel anytime', 'Free first session'].map((item) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
