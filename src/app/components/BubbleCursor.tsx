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

  const handleMove = useCallback((e: MouseEvent) => {
    if (Math.random() > 0.85) {
      const newBubble: Bubble = {
        id: bubbleId++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY,
        size: 4 + Math.random() * 8,
      };
      setBubbles((prev) => [...prev.slice(-12), newBubble]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full border border-[#BDDDFC]/40 bg-[#BDDDFC]/10"
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
