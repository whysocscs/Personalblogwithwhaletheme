import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  bgColor: string;
  depth: 'surface' | 'shallow' | 'mid' | 'deep' | 'abyss';
  className?: string;
}

// Depth-based visual config
const depthConfig = {
  surface: { creatures: ['🐟', '🐠'], lightRays: 5, particleOpacity: 0.35, ambientLight: 0.06 },
  shallow: { creatures: ['🐟', '🐡'], lightRays: 3, particleOpacity: 0.2, ambientLight: 0.04 },
  mid: { creatures: ['🦑', '🐙'], lightRays: 1, particleOpacity: 0.12, ambientLight: 0.02 },
  deep: { creatures: ['🪼', '🦐'], lightRays: 0, particleOpacity: 0.06, ambientLight: 0.01 },
  abyss: { creatures: ['🪼'], lightRays: 0, particleOpacity: 0.03, ambientLight: 0.005 },
};

export function ParallaxSection({ children, bgColor, depth, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const config = depthConfig[depth];

  // Parallax layers move at different speeds
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ background: bgColor }}>
      {/* Background parallax layer - light rays */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {Array.from({ length: config.lightRays }, (_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-0"
            style={{
              left: `${15 + i * (70 / Math.max(config.lightRays, 1))}%`,
              width: 30 + i * 15,
              height: '80%',
              background: `linear-gradient(180deg, rgba(189,221,252,${config.ambientLight}) 0%, transparent 70%)`,
              filter: 'blur(25px)',
              transform: `rotate(${-4 + i * 3}deg)`,
              transformOrigin: 'top center',
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </motion.div>

      {/* Mid parallax layer - floating particles */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: midY }}>
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-[#BDDDFC]"
            style={{
              width: 1.5 + Math.random() * 3,
              height: 1.5 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, 20, -15],
              x: [-8, 10, -8],
              opacity: [0, config.particleOpacity, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground - actual content */}
      <motion.div className="relative z-10" style={{ y: fgY }}>
        {children}
      </motion.div>
    </div>
  );
}
