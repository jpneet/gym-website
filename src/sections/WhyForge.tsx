import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const stats = [
  { value: '5,000+', label: 'Transformations' },
  { value: '97%', label: 'Satisfaction Rate' },
  { value: '10+', label: 'Years Experience' },
];

export function WhyForge() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const shouldReduceMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], shouldReduceMotion ? ["0%", "0%", "0%", "0%"] : ["20%", "0%", "0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[150vh] bg-bg-surface"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Decorative glow */}
        <div className="ambient-orb w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <motion.div 
          style={{ y, opacity }}
          className="container max-w-5xl mx-auto flex flex-col items-center text-center z-10"
        >
          <span className="label block mb-6 tracking-editorial">The Philosophy</span>
          
          <h2 className="display-md md:display-lg uppercase font-black tracking-tighter mb-16 leading-[1.1]">
            We don't just build <span className="clip-text-luxury">bodies.</span><br/>
            We build <span className="clip-text-luxury">resilience.</span>
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-bold font-display glow-text text-accent mb-4">
                  {s.value}
                </span>
                <span className="label tracking-editorial text-text-muted">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
