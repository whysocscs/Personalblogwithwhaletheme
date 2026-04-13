import { motion } from 'motion/react';

export function SectionFade({
  fromColor = '#384959',
  toColor = '#324252',
}: {
  fromColor?: string;
  toColor?: string;
}) {
  return (
    <div className="relative h-28 md:h-36 overflow-hidden" style={{ marginTop: -1, marginBottom: -1 }}>
      {/* Gradient blend */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`,
      }} />

      {/* Animated wave line - more visible now */}
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute top-1/2 -translate-y-1/2 w-full h-14 md:h-16"
      >
        {/* Shadow/glow wave behind */}
        <motion.path
          d="M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30"
          stroke="rgba(136,189,242,0.06)"
          strokeWidth="8"
          fill="none"
          animate={{
            d: [
              "M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30",
              "M0,30 Q150,42 300,30 Q450,18 600,30 Q750,42 900,30 Q1050,18 1200,30",
              "M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(4px)' }}
        />

        {/* Main wave line */}
        <motion.path
          d="M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30"
          stroke="rgba(136,189,242,0.12)"
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              "M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30",
              "M0,30 Q150,42 300,30 Q450,18 600,30 Q750,42 900,30 Q1050,18 1200,30",
              "M0,30 Q150,15 300,30 Q450,45 600,30 Q750,15 900,30 Q1050,45 1200,30",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Second wave - offset phase */}
        <motion.path
          d="M0,30 Q200,20 400,30 Q600,40 800,30 Q1000,20 1200,30"
          stroke="rgba(136,189,242,0.07)"
          strokeWidth="1"
          fill="none"
          animate={{
            d: [
              "M0,30 Q200,20 400,30 Q600,40 800,30 Q1000,20 1200,30",
              "M0,30 Q200,38 400,30 Q600,22 800,30 Q1000,38 1200,30",
              "M0,30 Q200,20 400,30 Q600,40 800,30 Q1000,20 1200,30",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating particles along the line */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#88BDF2]"
          style={{
            width: 2 + i * 0.5,
            height: 2 + i * 0.5,
            left: `${10 + i * 15}%`,
            top: '50%',
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            opacity: [0.06, 0.18, 0.06],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
