'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface SlideProps {
  title: string;
  subtitle?: string;
  content?: string;
  background: string;
  children?: ReactNode;
  isFirstSlide?: boolean;
  isTransitioning?: boolean;
}

interface Particle {
  x: number;
  y: number;
  duration: number;
  size: number;
  opacity: number;
  color: string;
}

const Slide = ({ title, subtitle, content, background, children, isFirstSlide, isTransitioning }: SlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles only on client side
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: isFirstSlide ? 100 : 50 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 15 + 10,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: isFirstSlide ? `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})` : 'rgba(255, 255, 255, 0.2)'
      }));
      setParticles(newParticles);
    }

    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFirstSlide]);

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 flex flex-col items-center justify-center ${background} overflow-hidden`}
    >
      {/* Animated background elements for all slides */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* Global payment network effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </motion.div>

      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Animated connection lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * dimensions.width}
              y1={Math.random() * dimensions.height}
              x2={Math.random() * dimensions.width}
              y2={Math.random() * dimensions.height}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full particle"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: [0, 1, 0],
              opacity: [0, particle.opacity, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>

      <div className="slide-content">
        <div className="slide-text">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2 
            }}
            className={`text-8xl font-bold mb-8 gradient-text glow ${
              isFirstSlide ? 'tracking-tight' : ''
            }`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.4 
              }}
              className={`text-4xl text-gray-300 mb-12 font-light glow ${
                isFirstSlide ? 'tracking-wide' : ''
              }`}
            >
              {subtitle}
            </motion.p>
          )}
          {content && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6 
              }}
              className={`text-4xl font-medium leading-relaxed glow ${
                isFirstSlide ? 'text-gray-400' : ''
              }`}
            >
              {content}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8 
              }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-white/5 rounded-full" />
      </motion.div>

      {/* Flash Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            <motion.div
              className="fixed inset-0 bg-white pointer-events-none z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.1,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="fixed inset-0 bg-white pointer-events-none z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut",
                delay: 0.05
              }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Slide; 