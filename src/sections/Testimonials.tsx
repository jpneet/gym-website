import { useCallback } from 'react';

// Map 5 testimonials to 3 available avatars
const AVATARS = [
  '/images/testimonials/avatar-1.jpg',
  '/images/testimonials/avatar-2.jpg',
  '/images/testimonials/avatar-3.jpg',
];

const testimonials = [
  {
    quote: "FORGE completely changed my relationship with fitness. The coaches aren't just trainers — they're mentors who push you beyond what you think is possible.",
    name: 'Michael Carter',
    note: 'Lost 45 lbs in 6 months',
    avatar: AVATARS[0],
  },
  {
    quote: "I've tried every gym in the city. Nothing comes close to the energy, the equipment, and the community at FORGE. This is elite fitness.",
    name: 'Sarah Rodriguez',
    note: 'Pro Member — 2 years',
    avatar: AVATARS[1],
  },
  {
    quote: 'From my first session to my first competition, FORGE had my back every step. The personal training here is genuinely world-class.',
    name: 'David Kim',
    note: 'Bodybuilding competitor',
    avatar: AVATARS[2],
  },
  {
    quote: "The nutrition coaching alone was worth the membership fee. I hit goals I'd been chasing for years within my first 12 weeks.",
    name: 'Priya Sharma',
    note: 'Elite Member',
    avatar: AVATARS[0],
  },
  {
    quote: "Every detail at FORGE is designed to make you better — the equipment, the programming, the team. It's not a gym, it's a system.",
    name: 'Leon Fraser',
    note: 'Strength athlete',
    avatar: AVATARS[1],
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

function TestimonialCard({ quote, name, note, avatar }: (typeof testimonials)[0]) {
  const attachLazy = useLazyImg();

  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 30vw, 380px)',
        padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '2px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
        marginRight: '1.5rem',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{ color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
        ★★★★★
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.6,
          color: 'var(--text)',
          opacity: 0.9,
          marginBottom: '1.75rem',
          fontStyle: 'italic',
        }}
      >
        "{quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        {/* Real avatar photo */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '1.5px solid var(--border-hover)',
            background: 'var(--bg-card)',
          }}
        >
          <img
            ref={attachLazy}
            src={avatar}
            alt={`${name} — FORGE member`}
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
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{note}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Duplicate for infinite marquee
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice(2), ...testimonials, ...testimonials.slice(0, 2)];

  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ background: 'var(--bg)', overflow: 'hidden' }}
    >
      <div className="container" style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
          Member Stories
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <h2 className="display-md">
            Real results.<br />
            <span className="gradient-text">Real athletes.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '340px' }}>
            5,000+ transformations. Every story is different. Every result is real.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolling left */}
      <div style={{ display: 'flex', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div className="marquee-track" style={{ display: 'flex', willChange: 'transform' }}>
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling right */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="marquee-track-reverse" style={{ display: 'flex', willChange: 'transform' }}>
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
