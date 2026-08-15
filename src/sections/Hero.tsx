import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useFrameSequence } from '../hooks/useFrameSequence';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Frame sequence (canvas animation)
  useFrameSequence(
    canvasRef as React.RefObject<HTMLCanvasElement>,
    scrollContainerRef as React.RefObject<HTMLElement>
  );

  // Hero entrance animation
  useEffect(() => {
    const chars = headlineRef.current?.querySelectorAll('.char') ?? [];
    const tl = gsap.timeline({ delay: 1.5 });

    tl.fromTo(
        chars,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'expo.out' }
      )
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, '-=0.4')
      .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');

    return () => { tl.kill(); };
  }, []);


  const headline = 'BUILD YOUR STRONGEST SELF';
  const words = headline.split(' ');

  return (
    <section ref={sectionRef} id="hero" style={{ position: 'relative' }}>
      {/* Tall scroll container for pin height */}
      <div
        ref={scrollContainerRef}
        style={{ height: '600vh', position: 'relative' }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />

          {/* Gradient overlay — bottom fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to top, #210C08 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Gradient overlay — left darkening */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(33,12,8,0.75) 0%, rgba(33,12,8,0.15) 60%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Hero Content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(1.5rem, 5vw, 4rem)',
              paddingTop: 'clamp(120px, 15vh, 160px)',
              paddingBottom: 'clamp(4rem, 8vw, 7rem)',
              maxWidth: '820px',
            }}
          >
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="display-xl"
              style={{
                fontSize: 'clamp(2.7rem, 6vw, 76px)',
                lineHeight: 0.88,
                letterSpacing: '-0.045em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                rowGap: '0.15em',
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                position: 'relative',
                zIndex: 20,
              }}
              aria-label={headline}
            >
              {[[0, 1], [2], [3]].map((group, gi) => (
                <div key={gi} style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.2em' }}>
                  {group.map(wi => {
                    const word = words[wi];
                    return (
                      <span
                        key={wi}
                        style={{ display: 'inline-flex', overflow: 'hidden', paddingBottom: '0.1em' }}
                      >
                        {word.split('').map((ch, ci) => (
                          <span
                            key={ci}
                            className="char"
                            style={{
                              display: 'inline-block',
                              opacity: 0,
                              color: wi === 1 ? 'transparent' : 'var(--text)',
                              background: wi === 1 ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'none',
                              WebkitBackgroundClip: wi === 1 ? 'text' : 'unset',
                              WebkitTextFillColor: wi === 1 ? 'transparent' : 'unset',
                              backgroundClip: wi === 1 ? 'text' : 'unset',
                            }}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                    );
                  })}
                </div>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="body-lg"
              style={{
                maxWidth: '480px',
                marginBottom: '2.5rem',
                opacity: 0,
              }}
            >
              Transform your body through elite coaching, strength training,
              and relentless consistency.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                opacity: 0,
              }}
            >
              <a href="#pricing" className="btn-magnetic btn-primary">
                Join Today
              </a>
              <a href="#programs" className="btn-magnetic btn-outline">
                Explore Programs
              </a>
            </div>
          </div>

          {/* Scroll Hint */}
          <div
            ref={scrollHintRef}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              right: 'clamp(1.5rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                writingMode: 'vertical-rl',
              }}
            >
              Scroll to explore
            </span>
            <div
              style={{
                width: '1px',
                height: '48px',
                background: 'linear-gradient(to bottom, var(--accent), transparent)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.4; transform: scaleY(1); }
                50% { opacity: 1; transform: scaleY(1.1); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
