import { useState, useEffect } from 'react';
import { IoArrowUpSharp } from 'react-icons/io5';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          aria-label="Back to top"
          className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center border-2 border-[#0f0f0f] bg-[#0044ff] text-white shadow-[4px_4px_0_0_#0f0f0f] transition-all duration-300 ease-in-out hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none focus:outline-none focus:ring-2 focus:ring-[#0044ff]"
          onClick={scrollToTop}
        >
          <IoArrowUpSharp size={20} className="animate-bounce" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
