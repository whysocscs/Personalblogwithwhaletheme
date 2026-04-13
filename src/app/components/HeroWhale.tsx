import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function HeroWhale() {
  // Random wandering path that covers a wide area
  const [pathIndex, setPathIndex] = useState(0);

  // Multiple swimming paths for variety
  const paths = [
    { x: [-120, 80, 160, -60, -180, 50, -120], y: [0, -40, 20, -60, 30, -20, 0], rotate: [-5, 8, -3, 10, -8, 5, -5], scaleX: [1, 1, 1, 1, -1, -1, 1] },
    { x: [100, -150, -80, 140, -30, 120, 100], y: [-30, 10, -50, 25, -15, 40, -30], rotate: [3, -6, 5, -10, 7, -4, 3], scaleX: [-1, -1, 1, 1, 1, -1, -1] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPathIndex((i) => (i + 1) % paths.length);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  const currentPath = paths[pathIndex];

  return (
    <div className="relative w-full h-[220px] md:h-[260px] mx-auto mb-6">
      {/* Bubble trail - follows whale loosely */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#BDDDFC]/15 border border-[#BDDDFC]/20"
          style={{
            width: 3 + Math.random() * 8,
            height: 3 + Math.random() * 8,
            left: `${40 + Math.random() * 20}%`,
            top: `${30 + Math.random() * 30}%`,
          }}
          animate={{
            y: [-5, -80 - Math.random() * 60],
            x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
            opacity: [0.5, 0],
            scale: [1, 2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* The whale - freely roaming across the section */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ marginLeft: -110, marginTop: -70 }}
        animate={{
          x: currentPath.x,
          y: currentPath.y,
          rotate: currentPath.rotate,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.5, 0.65, 0.85, 1],
        }}
      >
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="md:w-[260px] md:h-[165px]">
          {/* Shadow */}
          <ellipse cx="100" cy="125" rx="55" ry="6" fill="#384959" opacity="0.2" />

          {/* Body */}
          <motion.ellipse
            cx="100" cy="68" rx="68" ry="38"
            fill="#6A89A7"
            animate={{ ry: [38, 40, 38], rx: [68, 66, 68] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Belly */}
          <ellipse cx="96" cy="80" rx="52" ry="22" fill="#88BDF2" opacity="0.4" />
          <ellipse cx="96" cy="84" rx="42" ry="14" fill="#BDDDFC" opacity="0.15" />

          {/* Belly lines */}
          {[0, 1, 2].map((i) => (
            <line key={i} x1={72 + i * 4} y1={72 + i * 6} x2={120 - i * 4} y2={72 + i * 6}
              stroke="#BDDDFC" strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
          ))}

          {/* Tail - flapping */}
          <motion.path
            d="M168 68 Q188 48 205 35 Q190 58 185 68 Q190 78 205 105 Q188 88 168 68Z"
            fill="#6A89A7"
            animate={{
              d: [
                "M168 68 Q188 48 205 35 Q190 58 185 68 Q190 78 205 105 Q188 88 168 68Z",
                "M168 68 Q192 42 212 30 Q194 58 185 68 Q194 78 212 106 Q192 94 168 68Z",
                "M168 68 Q185 52 200 40 Q188 58 185 68 Q188 78 200 96 Q185 84 168 68Z",
                "M168 68 Q188 48 205 35 Q190 58 185 68 Q190 78 205 105 Q188 88 168 68Z",
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Dorsal fin */}
          <motion.path
            d="M95 30 Q105 12 115 28" fill="#5a7a97"
            animate={{ d: ["M95 30 Q105 12 115 28", "M95 30 Q105 8 115 28", "M95 30 Q105 12 115 28"] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Pectoral fin */}
          <motion.path
            d="M85 90 Q95 115 108 108 Q98 98 94 86Z"
            fill="#5a7a97" opacity="0.8"
            animate={{ rotate: [0, -10, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '90px 90px' }}
          />

          {/* Eye */}
          <circle cx="52" cy="60" r="7" fill="#2a3949" />
          <circle cx="52" cy="60" r="5.5" fill="#384959" />
          <motion.circle cx="50" cy="58.5" r="2.5" fill="#BDDDFC"
            animate={{ cx: [50, 51, 49, 50], cy: [58.5, 59, 58, 58.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <circle cx="54" cy="56" r="1" fill="#BDDDFC" opacity="0.6" />
          {/* Blush */}
          <ellipse cx="46" cy="72" rx="6" ry="3" fill="#88BDF2" opacity="0.15" />

          {/* Mouth */}
          <motion.path
            d="M42 76 Q54 85 68 78"
            stroke="#384959" strokeWidth="2" fill="none" strokeLinecap="round"
            animate={{ d: ["M42 76 Q54 85 68 78", "M42 76 Q54 87 68 78", "M42 76 Q54 85 68 78"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Water spout */}
          <motion.g
            animate={{ opacity: [0, 0, 0.7, 0.7, 0], y: [0, 0, -5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          >
            <path d="M72 30 Q68 14 63 4" stroke="#BDDDFC" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M72 30 Q72 12 72 2" stroke="#BDDDFC" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M72 30 Q76 14 82 4" stroke="#BDDDFC" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            <circle cx="63" cy="4" r="2" fill="#BDDDFC" opacity="0.3" />
            <circle cx="72" cy="2" r="2.5" fill="#BDDDFC" opacity="0.3" />
            <circle cx="82" cy="4" r="2" fill="#BDDDFC" opacity="0.3" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
