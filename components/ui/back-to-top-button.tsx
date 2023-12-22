'use client';
import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from './button';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const yOffset = window.scrollY;

    if (yOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuad' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
      className="fixed right-[20px] bottom-[150px] md:bottom-[50px]"
    >
      <Button
        variant="default"
        onClick={handleScrollToTop}
        className="h-[60px] w-[60px] rounded-full drop-shadow-lg"
      >
        <FaArrowUp size={48} />
      </Button>
    </div>
  );
};

export default BackToTopButton;
