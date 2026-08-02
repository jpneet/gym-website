import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const trainers = [
  {
    name: 'Marcus Cole',
    role: 'Strength & Conditioning',
    spec: 'NSCA Certified',
    img: '/images/trainers/trainer-1.jpg',
  },
  {
    name: 'Sophia Chen',
    role: 'Functional Fitness',
    spec: 'CrossFit L3',
    img: '/images/trainers/trainer-2.jpg',
  },
  {
    name: 'James Rivera',
    role: 'Bodybuilding Coach',
    spec: 'IFBB Pro',
    img: '/images/trainers/trainer-3.jpg',
  },
  {
    name: 'Aisha Patel',
    role: 'Fat Loss Specialist',
    spec: 'Precision Nutrition',
    img: '/images/trainers/trainer-4.jpg',
  },
];

export function Trainers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="trainers" className="spacing-section bg-bg relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Massive Headline */}
        <h2 className="display-lg uppercase font-black tracking-tighter mb-16 md:mb-24 text-white">
          The <span className="clip-text-luxury">Architects</span>
        </h2>
        
        {/* Accordion List */}
        <div className="w-full md:w-[50%] border-t border-white/10">
          {trainers.map((t, idx) => (
            <div
              key={t.name}
              className="relative group border-b border-white/10 py-8 md:py-12 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHoveredIndex(hoveredIndex === idx ? null : idx); } }}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-white/[0.015] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-expo z-0" />
              
              <div className="relative z-10 flex items-center justify-between px-4">
                <div className="flex flex-col">
                  <h3 className="display-md text-text-muted group-hover:text-white transition-colors duration-500 ease-out mb-2">
                    {t.name}
                  </h3>
                  <div className="flex items-center gap-4 text-text-muted group-hover:text-accent transition-colors duration-500">
                    <span className="label tracking-[0.2em]">{t.role}</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span className="label tracking-[0.2em]">{t.spec}</span>
                  </div>
                </div>
                
                {/* Arrow Icon */}
                <div className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-700 ease-expo text-text-muted group-hover:text-white">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* Mobile Inline Image Reveal */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden overflow-hidden relative z-10 px-4"
                  >
                    <img 
                      src={t.img} 
                      alt={t.name}
                      className="w-full aspect-[4/5] object-cover mt-6 rounded-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Magnetic Image */}
      <div className="hidden md:block absolute left-[55%] top-1/2 -translate-y-1/2 w-[30%] pointer-events-none z-20">
        <div className="relative w-full aspect-[3/4]">
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.img
                key={hoveredIndex}
                src={trainers[hoveredIndex].img}
                alt={trainers[hoveredIndex].name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.8, rotate: -5, clipPath: 'inset(10%)' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: 'inset(0%)' }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2, clipPath: 'inset(10%)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
