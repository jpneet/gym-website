import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    tier: 'Starter',
    price: '49',
    period: '/mo',
    features: [
      'Full gym access',
      '2 group classes / week',
      'Locker room access',
      'Basic fitness assessment',
      'Mobile app access',
    ],
    featured: false,
  },
  {
    tier: 'Pro',
    price: '99',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      'Unlimited gym access',
      'Unlimited group classes',
      '1 PT session / week',
      'Custom nutrition plan',
      'Recovery zone access',
      'Progress tracking',
    ],
    featured: true,
  },
  {
    tier: 'Elite',
    price: '199',
    period: '/mo',
    features: [
      'Everything in Pro',
      '3 PT sessions / week',
      'VIP locker & sauna',
      'Bi-weekly body scans',
      'Priority booking',
      'Competition prep',
    ],
    featured: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.pricing-card');
    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });

    const header = sectionRef.current?.querySelector('.pricing-header');
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
      id="pricing"
      className="section-pad"
      style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Bg glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(232,164,90,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          className="pricing-header"
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5.5rem)' }}
        >
          <span className="label reveal" style={{ display: 'block', marginBottom: '1rem' }}>
            Invest In Yourself
          </span>
          <h2 className="display-lg reveal" style={{ marginBottom: '1.25rem' }}>
            Choose your <span className="gradient-text">level.</span>
          </h2>
          <p className="body-lg reveal" style={{ maxWidth: '480px', margin: '0 auto' }}>
            Every tier is designed to deliver real, measurable results. No fluff.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className="pricing-card"
              style={{
                position: 'relative',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                background: plan.featured ? 'rgba(232,164,90,0.06)' : 'var(--bg-card)',
                border: `1px solid ${plan.featured ? 'rgba(232,164,90,0.3)' : 'var(--border)'}`,
                borderRadius: '2px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: plan.featured
                  ? '0 0 60px rgba(232,164,90,0.1), 0 0 0 0 rgba(232,164,90,0)'
                  : 'none',
                transition: 'transform 0.35s var(--ease-expo), box-shadow 0.35s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                if (plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 80px rgba(232,164,90,0.2), 0 20px 60px rgba(0,0,0,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                if (plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 60px rgba(232,164,90,0.1)';
                }
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    color: '#1a0804',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 1rem',
                    borderRadius: '0 0 4px 4px',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: '2rem', paddingTop: plan.badge ? '1rem' : 0 }}>
                <div
                  className="label"
                  style={{ marginBottom: '1rem', color: plan.featured ? 'var(--accent)' : 'var(--text-muted)' }}
                >
                  {plan.tier}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span
                    className="display-md"
                    style={{ lineHeight: 1 }}
                  >
                    ${plan.price}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{plan.period}</span>
                </div>
              </div>

              <ul style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="7" stroke={plan.featured ? 'var(--accent)' : 'var(--border-hover)'} strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke={plan.featured ? 'var(--accent)' : 'var(--border-hover)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn-magnetic ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                style={{ display: 'block', textAlign: 'center', width: '100%' }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
