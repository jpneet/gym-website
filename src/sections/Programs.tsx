import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const programs = [
  {
    num: '01',
    title: 'Strength Training',
    desc: 'Build raw power with progressive overload programs designed by world-class coaches. Every rep. Every set. Perfected.',
    tag: '8–16 WEEKS',
    img: '/images/programs/strength.jpg',
    alt: 'Strength training',
  },
  {
    num: '02',
    title: 'Fat Loss',
    desc: 'Science-backed metabolic conditioning that shreds fat while preserving hard-earned muscle. No crash diets.',
    tag: '6–12 WEEKS',
    img: '/images/programs/fat-loss.jpg',
    alt: 'Fat Loss',
  },
  {
    num: '03',
    title: 'Functional Fitness',
    desc: 'Real-world athleticism. Train your body to move beautifully through all planes of motion.',
    tag: 'ONGOING',
    img: '/images/programs/functional.jpg',
    alt: 'Functional Fitness',
  },
  {
    num: '04',
    title: 'Bodybuilding',
    desc: 'Sculpt a competition-ready physique with hypertrophy-focused periodization and precision nutrition.',
    tag: '16–24 WEEKS',
    img: '/images/programs/bodybuilding.jpg',
    alt: 'Bodybuilding',
  },
];

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
  const attachLazy = useLazyImg();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={containerRef}
      id="programs"
      className="spacing-section bg-bg-base relative overflow-hidden"
    >
      {/* Ambient Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
        }}
      />
      
      {/* Ambient Orb */}
      <div className="ambient-orb w-[600px] h-[600px] top-1/4 left-0 -translate-x-1/2" />

      <div className="container relative z-10">
        {/* Parallax Title */}
        <motion.div 
          style={{ 
            y: titleY,
            marginBottom: 'clamp(10rem, 15vw, 14rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
          }}
          className="relative z-30 mix-blend-difference"
        >
          <span className="label block mb-4 tracking-editorial" style={{ wordBreak: 'break-word', maxWidth: '100%' }}>The Method</span>
          <h2 
            className="display-lg uppercase font-black tracking-tighter"
            style={{
              maxWidth: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            Programs built for <span className="clip-text-luxury">results.</span>
          </h2>
        </motion.div>

        {/* Asymmetrical List */}
        <div className="flex flex-col gap-32 md:gap-48">
          {programs.map((p, i) => {
            const isEven = i % 2 !== 0;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Wrap */}
                <div className="w-full md:w-1/2 relative">
                  {/* Giant Overlap Number */}
                  <div className="absolute -top-8 md:-top-16 -left-4 md:-left-12 z-20 text-huge font-black leading-none text-white mix-blend-overlay opacity-40 hover:opacity-80 transition-opacity duration-700 pointer-events-none" aria-hidden="true">
                    {p.num}
                  </div>
                  
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <img
                      ref={attachLazy}
                      src={p.img}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="img-lazy w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1500 ease-expo will-change-transform"
                    />
                  </div>
                </div>

                {/* Text Wrap */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="label mb-4 tracking-editorial">{p.tag}</span>
                  <h3 className="display-md mb-6">{p.title}</h3>
                  <p className="body-lg mb-8 max-w-md">{p.desc}</p>
                  
                  <button className="self-start text-sm font-bold tracking-widest uppercase hover-underline-anim">
                    Explore Program
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
