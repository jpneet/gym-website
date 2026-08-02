import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    num: '01',
    title: 'Strength Training',
    desc: 'Build raw power with progressive overload programs designed by world-class coaches. Every rep. Every set. Perfected.',
    tag: '8–16 WEEKS',
    img: '/images/programs/strength.jpg',
    alt: 'Strength training session at FORGE gym',
  },
  {
    num: '02',
    title: 'Fat Loss',
    desc: 'Science-backed metabolic conditioning that shreds fat while preserving hard-earned muscle. No crash diets.',
    tag: '6–12 WEEKS',
    img: '/images/programs/fat-loss.jpg',
    alt: 'High-intensity fat loss training at FORGE',
  },
  {
    num: '03',
    title: 'Functional Fitness',
    desc: 'Real-world athleticism. Train your body to move beautifully through all planes of motion.',
    tag: 'ONGOING',
    img: '/images/programs/functional.jpg',
    alt: 'Functional fitness movements at FORGE',
  },
  {
    num: '04',
    title: 'Bodybuilding',
    desc: 'Sculpt a competition-ready physique with hypertrophy-focused periodization and precision nutrition.',
    tag: '16–24 WEEKS',
    img: '/images/programs/bodybuilding.jpg',
    alt: 'Bodybuilding program at FORGE elite gym',
  },
];

/** Attaches load→fade callback for lazy images */
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

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const attachLazy = useLazyImg();

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.prog-card');
    if (!cards) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax on the image inside each card
      const img = card.querySelector('.prog-img-wrap img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    });

    const header = sectionRef.current?.querySelector('.prog-header');
    if (header) {
      gsap.fromTo(
        header.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="section-pad"
      style={{ background: 'var(--bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="prog-header" style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
          <span className="label reveal" style={{ display: 'block', marginBottom: '1rem' }}>
            What We Offer
          </span>
          <h2
            className="display-lg reveal"
            style={{ maxWidth: '640px' }}
          >
            Programs built for{' '}
            <span className="gradient-text">results.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5px',
            background: 'var(--border)',
          }}
        >
          {programs.map((p) => (
            <div
              key={p.num}
              className="prog-card"
              style={{
                background: 'var(--bg)',
                cursor: 'pointer',
                transition: 'background 0.35s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg)';
              }}
            >
              {/* Program Image */}
              <div className="prog-img-wrap" style={{ height: '200px', position: 'relative' }}>
                <img
                  ref={attachLazy}
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="img-lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Gradient overlay — bottom fade into card bg */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, var(--bg) 0%, rgba(33,12,8,0.4) 60%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Program number watermark */}
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.12)',
                    letterSpacing: '-0.04em',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {p.num}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.25rem',
                  }}
                >
                  <h3 className="heading-md">
                    {p.title}
                  </h3>
                  <span className="label" style={{ marginTop: '0.25rem', flexShrink: 0 }}>
                    {p.tag}
                  </span>
                </div>

                <p className="body-md" style={{ marginBottom: '1.75rem' }}>
                  {p.desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                  }}
                >
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
