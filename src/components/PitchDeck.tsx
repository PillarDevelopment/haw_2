'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Slide from './Slide';

const slides = [
  {
    id: 1,
    title: "$1.5 трлн в год теряется из-за санкций...",
    subtitle: "Мы вернем их бизнесу",
    content: "Первый P2P-маркетплейс, где компании обменивают безнал на крипту без риска",
    background: "bg-gradient-to-br from-blue-900 via-blue-800 to-black",
    isFirstSlide: true,
    isMirrorEffect: false
  },
  {
    id: 2,
    title: "Боль рынка",
    content: "В 2024 году 68% компаний из РФ столкнулись с отказами в платежах",
    background: "bg-gradient-to-br from-red-900 via-red-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 3,
    title: "Боль",
    content: "В 2024 году 68% компаний из РФ столкнулись с отказами в платежах",
    background: "bg-gradient-to-br from-red-900 via-red-700 to-black",
    isMirrorEffect: false
  },
  {
    id: 4,
    title: "Решение",
    content: "Обходите санкции за 3 клика. Без посредников. Без риска.",
    background: "bg-gradient-to-br from-green-900 via-green-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 5,
    title: "Как это работает?",
    content: "USDT блокируются, пока вы не получите деньги. Это не мы придумали — это код.",
    background: "bg-gradient-to-br from-purple-900 via-purple-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 6,
    title: "NFT для инвесторов",
    content: "Investor Pass NFT = доля в $20K/мес от комиссий + право голоса. Осталось 17 из 100.",
    background: "bg-gradient-to-br from-yellow-900 via-yellow-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 7,
    title: "Экономика",
    content: "Даже при 0.5% комиссии — это $50M в год при обороте $10B. Мы берем рынок.",
    background: "bg-gradient-to-br from-indigo-900 via-indigo-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 8,
    title: "Команда",
    content: "Мы взламывали банки. Теперь взламываем систему.",
    background: "bg-gradient-to-br from-pink-900 via-pink-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 9,
    title: "Roadmap",
    content: "Хотите узнать, что в Q4? Давайте обсудим после презентации.",
    background: "bg-gradient-to-br from-orange-900 via-orange-800 to-black",
    isMirrorEffect: false
  },
  {
    id: 10,
    title: "Финал",
    content: "Через 5 лет вы либо будете частью этого, либо будете читать об этом в Forbes.",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    isMirrorEffect: false
  }
];

// Добавим интерфейс для слайдов
interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  background: string;
  isFirstSlide?: boolean;
  isMirrorEffect: boolean;
}

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isIntenseFlash, setIsIntenseFlash] = useState(false);

  const handlePrevious = useCallback(() => {
    if (currentSlide > 0) {
      setIsTransitioning(true);
      setIsIntenseFlash(currentSlide === 1);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsTransitioning(false);
        setIsIntenseFlash(false);
      }, 100);
    }
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true);
      setIsIntenseFlash(currentSlide === 0);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsTransitioning(false);
        setIsIntenseFlash(false);
      }, 100);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          title={slides[currentSlide].title}
          subtitle={slides[currentSlide].subtitle}
          content={slides[currentSlide].content}
          background={slides[currentSlide].background}
          isFirstSlide={slides[currentSlide].isFirstSlide}
          isTransitioning={isTransitioning}
          isIntenseFlash={isIntenseFlash}
          isMirrorEffect={slides[currentSlide].isMirrorEffect}
        />
      </AnimatePresence>
    </div>
  );
};

export default PitchDeck; 