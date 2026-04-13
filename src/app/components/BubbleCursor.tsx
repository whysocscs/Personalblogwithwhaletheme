import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

let bubbleId = 0;

export function BubbleCursor() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const handleMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (Math.random() > 0.8) {
      const count = 1 + Math.floor(Math.random() * 2);
      const newBubbles: Bubble[] = Array.from({ length: count }, () => ({
        id: bubbleId++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 10,
        size: 3 + Math.random() * 10,
      }));
      setBubbles((prev) => [...prev.slice(-15), ...newBubbles]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    document.body.style.cursor = 'none';
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.style.cursor = 'auto';
    };
  }, [handleMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* The Whale Cursor */}
      <motion.div
        className="fixed top-0 left-0 text-2xl"
        style={{
          x: mousePos.x,
          y: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        🐋
      </motion.div>

      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="fixed rounded-full border border-[#BDDDFC]/40 bg-[#BDDDFC]/10"
            style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
            initial={{ opacity: 0.7, scale: 0.5 }}
            animate={{ opacity: 0, y: -60 - Math.random() * 40, scale: 1.2, x: (Math.random() - 0.5) * 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 + Math.random() * 0.5, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setBubbles((prev) => prev.filter((p) => p.id !== b.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
