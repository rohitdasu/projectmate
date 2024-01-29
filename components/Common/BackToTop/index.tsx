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
          className=" fixed bottom-4 right-4 flex h-12 w-12  items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-primary focus:border-primary-foreground focus:outline-none focus:ring  focus:ring-secondary-foreground dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary-foreground dark:hover:text-secondary dark:focus:ring-primary-foreground"
          onClick={scrollToTop}
        >
          <IoArrowUpSharp size={20} className="animate-bounce" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
