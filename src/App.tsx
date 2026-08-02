import { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Programs } from './sections/Programs';
import { WhyForge } from './sections/WhyForge';
import { Trainers } from './sections/Trainers';
import { Pricing } from './sections/Pricing';
import { Testimonials } from './sections/Testimonials';
import { CTA } from './sections/CTA';

function AppContent() {
  useLenis();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <WhyForge />
        <Trainers />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    document.documentElement.classList.remove('loading');
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      {/* Always mount content so canvas preloads immediately */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <AppContent />
      </div>
    </>
  );
}
