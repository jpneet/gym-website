import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    title: 'The Floor',
    subtitle: 'Where legacies begin',
    img: '/images/programs/strength.jpg',
  },
  {
    id: 2,
    title: 'Focus',
    subtitle: 'Absolute concentration',
    img: '/images/programs/bodybuilding.jpg',
  },
  {
    id: 3,
    title: 'Community',
    subtitle: 'Tribe mentality',
    img: '/images/programs/functional.jpg',
  },
  {
    id: 4,
    title: 'Endurance',
    subtitle: 'Pushing boundaries',
    img: '/images/programs/fat-loss.jpg',
  },
  {
    id: 5,
    title: 'Results',
    subtitle: 'Earned every day',
    img: '/images/trainers/trainer-1.jpg',
  }
];

export function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useLayoutEffect(() => {
    const update = () => {
      if (scrollRef.current) {
        setScrollRange(-(scrollRef.current.scrollWidth - window.innerWidth));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);

  return (
    <section ref={targetRef} id="gallery" className="relative h-[350vh] bg-bg-surface">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        <div className="absolute top-[10%] left-6 md:left-12 z-20">
          <span className="label block mb-2 tracking-editorial">The Exhibition</span>
          <h2 className="display-md text-white font-black tracking-tighter">
            Pure <span className="clip-text-luxury">Focus</span>
          </h2>
        </div>

        <motion.div ref={scrollRef} style={{ x }} className="flex gap-16 px-[5vw] md:px-[10vw]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] md:w-[35vw] aspect-3/4 glass rounded-sm overflow-hidden shrink-0 group cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1500 ease-expo"
              />

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

              {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-x-4 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-10 transition-transform duration-700 ease-expo pointer-events-none">
                <span className="label text-accent tracking-[0.2em] block mb-2">
                  {item.subtitle}
                </span>

                <h3 className="heading-lg text-white font-bold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
