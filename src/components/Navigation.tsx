'use client';

import { motion } from 'framer-motion';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const Navigation = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onDotClick,
}: NavigationProps) => {
  return (
    <>
      {/* Arrows */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center gap-4">
        <motion.button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSlide === 0
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:text-white/80'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSlide === totalSlides - 1
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:text-white/80'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.button>
      </div>

      {/* Dots */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-1.5 z-50">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </>
  );
}; 