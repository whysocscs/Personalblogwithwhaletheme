import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Whale {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
}

export function SwimmingWhales() {
  const [whales, setWhales] = useState<Whale[]>([]);

  useEffect(() => {
    const newWhales: Whale[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 60,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      size: 16 + Math.random() * 10,
    }));
    setWhales(newWhales);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {whales.map((whale) => (
        <motion.div
          key={whale.id}
          className="absolute text-4xl opacity-10"
          initial={{ x: '-10%', y: `${whale.y}%` }}
          animate={{
            x: '110%',
            y: [`${whale.y}%`, `${whale.y + 10}%`, `${whale.y - 5}%`, `${whale.y}%`],
          }}
          transition={{
            duration: whale.duration,
            delay: whale.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ fontSize: `${whale.size}px` }}
        >
          🐋
        </motion.div>
      ))}
    </div>
  );
}