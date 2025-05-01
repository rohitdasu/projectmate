import { useEffect, useState } from 'react';

export const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(var(--foreground-rgb), 0.5)',
          borderRadius: '50%',
          marginLeft: '-4px',
          marginTop: '-4px',
        }}
      />
    </div>
  );
};
