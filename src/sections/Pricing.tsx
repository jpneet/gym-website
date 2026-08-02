import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    tier: 'Starter',
    price: '49',
    period: '/mo',
    desc: 'The essential foundation for your fitness journey.',
    features: [
      'Full gym access',
      '2 group classes / week',
      'Locker room access',
      'Basic fitness assessment',
      'Mobile app access',
    ],
  },
  {
    tier: 'Pro',
    price: '99',
    period: '/mo',
    desc: 'For the dedicated athlete demanding more.',
    features: [
      'Unlimited gym access',
      'Unlimited group classes',
      '1 PT session / week',
      'Custom nutrition plan',
      'Recovery zone access',
      'Progress tracking',
    ],
  },
  {
    tier: 'Elite',
    price: '199',
    period: '/mo',
    desc: 'Uncompromised coaching and luxury amenities.',
    features: [
      'Everything in Pro',
      '3 PT sessions / week',
      'VIP locker & sauna',
      'Bi-weekly body scans',
      'Priority booking',
      'Competition prep',
    ],
  },
];

export function Pricing() {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="pricing" className="spacing-section bg-bg-base relative overflow-hidden">
      <div className="container relative z-10 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Tiers */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <span className="label block mb-6 tracking-editorial">Engagement Models</span>
          <h2 className="display-lg uppercase font-black tracking-tighter mb-16 leading-[1.1]">
            Commit to <span className="clip-text-luxury">Greatness.</span>
          </h2>

          <div className="flex flex-col border-t border-white/10" role="tablist" aria-label="Pricing Tiers">
            {plans.map((plan, idx) => {
              const isActive = activeTier === idx;
              return (
                <div 
                  key={plan.tier}
                  className="border-b border-white/10 py-6 md:py-8 cursor-pointer"
                  onClick={() => setActiveTier(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tier-content-${idx}`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTier(idx); } }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-3xl md:text-5xl font-black uppercase transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                      {plan.tier}
                    </h3>
                    <div className="text-xl md:text-2xl font-bold text-accent">
                      ${plan.price}
                    </div>
                  </div>
                  
                  {/* Accordion Feature List */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                        id={`tier-content-${idx}`}
                        role="tabpanel"
                      >
                        <p className="body-md mb-6">{plan.desc}</p>
                        <ul className="flex flex-col gap-3 mb-4">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-center gap-3 text-sm text-text-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Sticky Glass Card */}
        <div className="w-full lg:w-1/2 relative">
          <div className="sticky top-40 w-full aspect-[4/5] md:aspect-square group flex items-center justify-center">
            
            {/* Absolute Ambient Orb */}
            <div className="ambient-orb inset-0 scale-100 group-hover:scale-150 transition-transform duration-1500 ease-expo" />
            
            <div className="relative z-10 glass w-full max-w-md h-full rounded-2xl border border-white/10 flex flex-col items-center justify-center p-12 text-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center w-full"
                >
                  <span className="label tracking-editorial mb-4 text-accent">{plans[activeTier].tier}</span>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-8xl font-black tracking-tighter text-white">
                      ${plans[activeTier].price}
                    </span>
                    <span className="text-text-muted tracking-widest">{plans[activeTier].period}</span>
                  </div>
                  <p className="body-md text-text-muted mb-12">
                    {plans[activeTier].desc}
                  </p>
                  
                  <button className="w-full py-4 rounded-full bg-white text-black font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-300">
                    Select Tier
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
