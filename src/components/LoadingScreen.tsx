import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const letters = logoRef.current?.querySelectorAll('span');

    // Animate letters in
    tl.fromTo(
      letters || [],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'expo.out' }
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'expo.out' },
      '-=0.3'
    );

    // Simulate progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 18 + 4;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setProgress(100);

        // Slide out
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'expo.inOut',
          delay: 0.3,
          onComplete,
        });
      } else {
        setProgress(Math.round(prog));
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 700,
          letterSpacing: '0.25em',
          display: 'flex',
          gap: '0.05em',
        }}
      >
        {'FORGE'.split('').map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0,
              background: 'linear-gradient(135deg, #e8a45a, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Line */}
      <div
        ref={lineRef}
        style={{
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />

      {/* Bar + text */}
      <div style={{ width: '200px' }}>
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
              transition: 'width 0.15s ease',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '0.75rem',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textAlign: 'right',
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}
