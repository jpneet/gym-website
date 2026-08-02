import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: 'Marcus Cole',
    role: 'Strength & Conditioning',
    color: '#e8a45a',
    img: '/images/trainers/trainer-1.jpg',
    alt: 'Marcus Cole — Strength & Conditioning coach at FORGE',
    spec: '12 yrs experience · NSCA Certified',
  },
  {
    name: 'Sophia Chen',
    role: 'Functional Fitness',
    color: '#ff6b35',
    img: '/images/trainers/trainer-2.jpg',
    alt: 'Sophia Chen — Functional Fitness coach at FORGE',
    spec: '8 yrs experience · CrossFit L3',
  },
  {
    name: 'James Rivera',
    role: 'Bodybuilding Coach',
    color: '#c9a96e',
    img: '/images/trainers/trainer-3.jpg',
    alt: 'James Rivera — Bodybuilding Coach at FORGE',
    spec: '10 yrs experience · IFBB Pro',
  },
  {
    name: 'Aisha Patel',
    role: 'Fat Loss Specialist',
    color: '#e8a45a',
    img: '/images/trainers/trainer-4.jpg',
    alt: 'Aisha Patel — Fat Loss Specialist at FORGE',
    spec: '9 yrs experience · Precision Nutrition',
  },
];

/** Fades an image in once it's loaded — avoids pop-in. */
function useLazyImg() {
  return useCallback((el: HTMLImageElement | null) => {
    if (!el) return;
    const reveal = () => el.classList.add('loaded');
    if (el.complete && el.naturalWidth > 0) {
      reveal();
    } else {
      el.addEventListener('load', reveal, { once: true });
    }
  }, []);
}

export function Trainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const attachLazy = useLazyImg();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Horizontal scroll via pin
    const totalWidth = track.scrollWidth - track.offsetWidth;

    const st = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Card entrance
    const cards = track.querySelectorAll('.trainer-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: `top ${80 - i * 5}%`,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => { st.scrollTrigger?.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trainers"
      style={{ background: 'var(--bg)', overflow: 'hidden' }}
    >
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3rem', flexShrink: 0 }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Meet The Team
          </span>
          <h2 className="display-md">
            World-class{' '}
            <span className="gradient-text">coaches.</span>
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <div style={{ overflow: 'hidden' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
              willChange: 'transform',
            }}
          >
            {trainers.map((t) => (
              <div
                key={t.name}
                className="trainer-card"
                style={{
                  flexShrink: 0,
                  width: 'clamp(260px, 28vw, 360px)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.35s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = t.color + '55')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')
                }
              >
                {/* Photo */}
                <div
                  className="trainer-img-wrap"
                  style={{ height: 'clamp(220px, 28vw, 320px)', background: 'var(--bg-card)' }}
                >
                  <img
                    ref={attachLazy}
                    src={t.img}
                    alt={t.alt}
                    loading="lazy"
                    decoding="async"
                    className="img-lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />

                  {/* Accent glow at bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: `linear-gradient(to top, ${t.color}22 0%, transparent 100%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Hover social overlay */}
                  <div
                    className="trainer-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(33,12,8,0.72)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {['IG', 'TW'].map((s) => (
                      <a
                        key={s}
                        href="#"
                        aria-label={s === 'IG' ? 'Instagram' : 'Twitter'}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: t.color,
                          border: `1px solid ${t.color}55`,
                          padding: '0.45rem 0.85rem',
                          borderRadius: '100px',
                          transition: 'background 0.2s ease, border-color 0.2s ease',
                          backdropFilter: 'blur(8px)',
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.background = t.color + '22')
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.background = 'transparent')
                        }
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="heading-md" style={{ marginBottom: '0.25rem' }}>
                    {t.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: t.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {t.role}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.spec}
                  </span>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div
              style={{
                flexShrink: 0,
                width: 'clamp(260px, 28vw, 360px)',
                border: '1px dashed var(--border)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div className="heading-lg" style={{ letterSpacing: '-0.03em' }}>
                Join the<br />team
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                We're always looking for elite coaches.
              </p>
              <a href="#contact" className="btn-magnetic btn-outline">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for trainer card hover */}
      <style>{`
        .trainer-card:hover .trainer-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
