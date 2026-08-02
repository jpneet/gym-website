import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "FORGE completely changed my relationship with fitness. The coaches aren't just trainers — they're mentors who push you beyond what you think is possible.",
    name: 'Michael Carter',
    note: 'Lost 45 lbs in 6 months',
  },
  {
    quote: "I've tried every gym in the city. Nothing comes close to the energy, the equipment, and the community at FORGE. This is elite fitness.",
    name: 'Sarah Rodriguez',
    note: 'Pro Member — 2 years',
  },
  {
    quote: 'From my first session to my first competition, FORGE had my back every step. The personal training here is genuinely world-class.',
    name: 'David Kim',
    note: 'Bodybuilding competitor',
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      id="testimonials"
      className="relative min-h-[90vh] bg-bg flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-24 left-0 w-full text-center z-10">
        <span className="label tracking-editorial">Voices of the Elite</span>
      </div>

      <div className="ambient-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-breathe" />

      <div className="container relative z-10 flex flex-col items-center max-w-5xl text-center mt-12">
        <div className="h-[50vh] flex items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="heading-md md:display-md text-white font-black tracking-tighter mb-8 md:mb-12 leading-[1.1] max-w-sm md:max-w-none">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex flex-col items-center gap-2 mt-auto pb-8">
                <span className="text-xl font-bold uppercase tracking-widest text-white">
                  {testimonials[activeIndex].name}
                </span>
                <span className="label tracking-editorial text-accent">
                  {testimonials[activeIndex].note}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Nav */}
        <div className="flex items-center justify-center gap-4 mt-8 w-full">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group py-4 px-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={activeIndex === i ? 'true' : undefined}
            >
              <div 
                className={`h-[2px] w-12 md:w-16 transition-colors duration-500 ${activeIndex === i ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/50'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
