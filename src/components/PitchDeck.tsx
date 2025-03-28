'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Slide } from './Slide';
import { Navigation } from './Navigation';

const slides = [
  {
    id: 1,
    title: "$1.5 трлн в год теряется из-за санкций...",
    subtitle: "Мы вернем их бизнесу",
    content: "Первый P2P-маркетплейс, где компании обменивают безнал на крипту без риска",
    background: "bg-gradient-to-br from-blue-900 via-blue-800 to-black",
    isFirstSlide: true
  },
  {
    id: 2,
    title: "Боль рынка",
    content: "В 2023 году 68% компаний из РФ столкнулись с отказами в платежах",
    background: "bg-gradient-to-br from-red-900 via-red-800 to-black"
  },
  {
    id: 3,
    title: "Решение",
    content: "Обходите санкции за 3 клика. Без посредников. Без риска.",
    background: "bg-gradient-to-br from-green-900 via-green-800 to-black"
  },
  {
    id: 4,
    title: "Как это работает?",
    content: "USDT блокируются, пока вы не получите деньги. Это не мы придумали — это код.",
    background: "bg-gradient-to-br from-purple-900 via-purple-800 to-black"
  },
  {
    id: 5,
    title: "NFT для инвесторов",
    content: "Investor Pass NFT = доля в $20K/мес от комиссий + право голоса. Осталось 17 из 100.",
    background: "bg-gradient-to-br from-yellow-900 via-yellow-800 to-black"
  },
  {
    id: 6,
    title: "Экономика",
    content: "Даже при 0.5% комиссии — это $50M в год при обороте $10B. Мы берем рынок.",
    background: "bg-gradient-to-br from-indigo-900 via-indigo-800 to-black"
  },
  {
    id: 7,
    title: "Команда",
    content: "Мы взламывали банки. Теперь взламываем систему.",
    background: "bg-gradient-to-br from-pink-900 via-pink-800 to-black"
  },
  {
    id: 8,
    title: "Roadmap",
    content: "Хотите узнать, что в Q4? Давайте обсудим после презентации.",
    background: "bg-gradient-to-br from-orange-900 via-orange-800 to-black"
  },
  {
    id: 9,
    title: "Финал",
    content: "Через 5 лет вы либо будете частью этого, либо будете читать об этом в Forbes.",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
  },
];

export const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setDirection(1);
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait" custom={direction}>
        <Slide key={currentSlide} {...slides[currentSlide]} />
      </AnimatePresence>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
    </div>
  );
}; 