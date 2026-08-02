const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Programs: ['Strength', 'Fat Loss', 'Functional', 'Bodybuilding'],
  Support: ['FAQs', 'Contact', 'Privacy Policy', 'Terms'],
};

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#050505] border-t border-white/5 pt-16 md:pt-32 pb-8"
    >
      <div className="container">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-16 md:mb-24">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="font-display text-3xl font-black tracking-editorial inline-block mb-6 bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent"
            >
              FORGE
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs mb-8">
              Elite fitness for those who refuse to settle. Transform your body,
              transform your life.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { label: 'Instagram', path: 'M2 2h20v20H2V2zm10 5a5 5 0 110 10A5 5 0 0112 7zm6.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z' },
                { label: 'Twitter', path: 'M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L9 4H4z' },
                { label: 'YouTube', path: 'M2 4h20v16H2V4zm8 4.5l6 3.5-6 3.5V8.5z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all duration-300"
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
              <h4 className="label mb-6 tracking-editorial">{heading}</h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group flex items-center transition-all duration-300"
                    >
                      <span className="w-0 h-[1px] bg-accent group-hover:w-4 transition-all duration-300 ease-out" />
                      <span className="text-sm text-text-muted group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-2">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2026 FORGE Fitness. All rights reserved.
          </p>
          <p className="text-[10px] text-white/20 tracking-editorial font-bold">
            BUILT WITH INTENTION
          </p>
        </div>
      </div>
    </footer>
  );
}
