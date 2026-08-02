const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Programs: ['Strength', 'Fat Loss', 'Functional', 'Bodybuilding'],
  Support: ['FAQs', 'Contact', 'Privacy Policy', 'Terms'],
};

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: '#050505',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 7vw, 6rem) 0 2rem',
      }}
    >
      <div className="container">
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          {/* Brand */}
          <div>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 900,
                letterSpacing: '0.2em',
                display: 'inline-block',
                marginBottom: '1.25rem',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              FORGE
            </a>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '280px',
                marginBottom: '1.75rem',
              }}
            >
              Elite fitness for those who refuse to settle. Transform your body,
              transform your life.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'Instagram', path: 'M2 2h20v20H2V2zm10 5a5 5 0 110 10A5 5 0 0112 7zm6.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z' },
                { label: 'Twitter', path: 'M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L9 4H4z' },
                { label: 'YouTube', path: 'M2 4h20v16H2V4zm8 4.5l6 3.5-6 3.5V8.5z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d={s.path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="label" style={{ marginBottom: '1.25rem' }}>
                {heading}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover-underline-anim"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        transition: 'color 0.25s ease',
                        paddingBottom: '2px',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © 2026 FORGE Fitness. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.1em',
            }}
          >
            BUILT WITH INTENTION
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
