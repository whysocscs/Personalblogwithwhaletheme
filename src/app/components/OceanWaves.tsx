import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SVG wave layers with:
 * - SVG path animation (morphing wave shapes)
 * - Parallax scrolling (each layer moves at different speed)
 */

export function HeroWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#0a2540' }}>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e5582" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a2540" stopOpacity="0.8" />
          </linearGradient>
          <filter id="water-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      
      {/* Background Deep Layers */}
      <motion.div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%]" style={{ y: y1, filter: 'url(#water-ripple)' }}>
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="w-full h-full opacity-30">
          <motion.path
            fill="url(#bg-grad)"
            animate={{
              d: [
                'M0,200 C320,100 480,300 800,200 C1120,100 1280,300 1440,200 L1440,800 L0,800 Z',
                'M0,250 C320,350 480,150 800,250 C1120,350 1280,150 1440,250 L1440,800 L0,800 Z',
                'M0,200 C320,100 480,300 800,200 C1120,100 1280,300 1440,200 L1440,800 L0,800 Z',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Mid Layers */}
      <motion.div className="absolute top-[10%] left-[-5%] w-[110%] h-[110%]" style={{ y: y2, filter: 'url(#water-ripple)' }}>
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="w-full h-full opacity-40">
          <motion.path
            fill="url(#bg-grad)"
            animate={{
              d: [
                'M0,300 C400,200 600,400 1000,300 C1200,250 1350,350 1440,300 L1440,600 L0,600 Z',
                'M0,250 C400,350 600,150 1000,250 C1200,300 1350,200 1440,250 L1440,600 L0,600 Z',
                'M0,300 C400,200 600,400 1000,300 C1200,250 1350,350 1440,300 L1440,600 L0,600 Z',
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Front Layers */}
      <motion.div className="absolute top-[30%] left-0 w-full h-[80%]" style={{ y: y3, filter: 'url(#water-ripple)' }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full opacity-60">
          <motion.path
            fill="url(#bg-grad)"
            animate={{
              d: [
                'M0,150 C250,50 500,250 750,150 C1000,50 1250,250 1440,150 L1440,400 L0,400 Z',
                'M0,200 C250,300 500,100 750,200 C1000,300 1250,100 1440,200 L1440,400 L0,400 Z',
                'M0,150 C250,50 500,250 750,150 C1000,50 1250,250 1440,150 L1440,400 L0,400 Z',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
      
      {/* Light Caustics Effect on top of waves */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(136,189,242,0.4) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

const WAVE_LAYERS = [
  {
    color: 'rgba(255,255,255,0.4)', // White sea foam
    speed: 0.1,
    duration: 12,
    paths: [
      'M0,100 C160,60 320,130 480,90 C640,50 800,120 960,80 C1120,40 1280,100 1440,70 L1440,250 L0,250 Z',
      'M0,80 C160,120 320,55 480,105 C640,70 800,110 960,65 C1120,95 1280,50 1440,90 L1440,250 L0,250 Z',
      'M0,95 C160,65 320,115 480,75 C640,105 800,60 960,100 C1120,70 1280,110 1440,80 L1440,250 L0,250 Z',
      'M0,100 C160,60 320,130 480,90 C640,50 800,120 960,80 C1120,40 1280,100 1440,70 L1440,250 L0,250 Z',
    ],
    yRange: [50, -40] as [number, number],
  },
  {
    color: 'rgba(77, 182, 230, 0.7)', // Bright shallow water
    speed: 0.2,
    duration: 10,
    paths: [
      'M0,120 C180,80 360,140 540,95 C720,65 900,125 1080,90 C1260,60 1350,110 1440,85 L1440,250 L0,250 Z',
      'M0,90 C180,130 360,70 540,115 C720,85 900,60 1080,110 C1260,90 1350,70 1440,105 L1440,250 L0,250 Z',
      'M0,110 C180,75 360,120 540,80 C720,110 900,70 1080,100 C1260,65 1350,95 1440,75 L1440,250 L0,250 Z',
      'M0,120 C180,80 360,140 540,95 C720,65 900,125 1080,90 C1260,60 1350,110 1440,85 L1440,250 L0,250 Z',
    ],
    yRange: [80, -80] as [number, number],
  },
  {
    color: 'url(#gradient-layer)', // Deep surface water connecting to Career
    speed: 0.35,
    duration: 8,
    paths: [
      'M0,140 C200,105 400,160 600,120 C800,90 1000,150 1200,110 C1320,85 1400,130 1440,100 L1440,250 L0,250 Z',
      'M0,110 C200,150 400,95 600,135 C800,100 1000,80 1200,130 C1320,110 1400,90 1440,125 L1440,250 L0,250 Z',
      'M0,130 C200,90 400,140 600,100 C800,130 1000,85 1200,120 C1320,95 1400,115 1440,90 L1440,250 L0,250 Z',
      'M0,140 C200,105 400,160 600,120 C800,90 1000,150 1200,110 C1320,85 1400,130 1440,100 L1440,250 L0,250 Z',
    ],
    yRange: [120, -120] as [number, number],
  },
];

export function OceanWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className="absolute bottom-0 left-0 right-0 h-[350px] z-10 pointer-events-none overflow-hidden">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient-layer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#035e8c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0273a5" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      {WAVE_LAYERS.map((layer, i) => (
        <WaveLayer key={i} layer={layer} scrollProgress={scrollYProgress} index={i} />
      ))}
    </div>
  );
}

function WaveLayer({
  layer,
  scrollProgress,
  index,
}: {
  layer: (typeof WAVE_LAYERS)[number];
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
}) {
  const y = useTransform(scrollProgress, [0, 1], layer.yRange);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0"
      style={{ y, zIndex: index }}
    >
      <svg
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
        className="w-full h-[160px]"
        style={{ display: 'block' }}
      >
        <motion.path
          fill={layer.color}
          animate={{ d: layer.paths }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  );
}

/**
 * A secondary set of waves for section transitions — placed between sections
 */
export function SectionWaves({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [10, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [5, -25]);

  return (
    <div ref={ref} className="relative h-[80px] -mt-[80px] z-10 pointer-events-none overflow-hidden">
      <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: y1 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[50px] block">
          <motion.path
            fill={toColor}
            opacity={0.4}
            animate={{
              d: [
                'M0,30 C360,10 720,50 1080,25 C1260,15 1380,35 1440,20 L1440,80 L0,80 Z',
                'M0,20 C360,45 720,15 1080,40 C1260,30 1380,18 1440,35 L1440,80 L0,80 Z',
                'M0,30 C360,10 720,50 1080,25 C1260,15 1380,35 1440,20 L1440,80 L0,80 Z',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: y2 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] block">
          <motion.path
            fill={toColor}
            opacity={0.7}
            animate={{
              d: [
                'M0,40 C480,20 960,55 1440,30 L1440,80 L0,80 Z',
                'M0,25 C480,50 960,18 1440,42 L1440,80 L0,80 Z',
                'M0,40 C480,20 960,55 1440,30 L1440,80 L0,80 Z',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
