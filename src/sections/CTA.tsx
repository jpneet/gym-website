import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section id="contact" className="spacing-section bg-bg relative overflow-hidden flex flex-col items-center justify-center text-center">
      
      <div className="ambient-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />

      <div className="container relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full max-w-4xl"
        >
          <span className="label tracking-editorial mb-8">Initiate Sequence</span>
          <h2 className="display-lg uppercase font-black tracking-tighter mb-16 leading-[1.1]">
            Build Your <span className="clip-text-luxury">Legacy</span>
          </h2>
          
          <a href="#pricing" className="relative w-48 h-48 rounded-full overflow-hidden group cursor-pointer border border-white/20 flex items-center justify-center">
            {/* Base Background */}
            <div className="absolute inset-0 bg-transparent z-0" />
            
            {/* Fill 1 (Amber) */}
            <div className="absolute inset-0 bg-accent translate-y-[100%] rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-transform duration-700 ease-expo z-10" />
            
            {/* Fill 2 (White) */}
            <div className="absolute inset-0 bg-white translate-y-[100%] rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-transform duration-700 delay-75 ease-expo z-20" />
            
            {/* Text */}
            <div className="relative z-30 flex items-center justify-center w-full h-full text-white group-hover:text-black transition-colors duration-300 delay-100 font-bold uppercase tracking-widest text-sm">
              Start Now
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
