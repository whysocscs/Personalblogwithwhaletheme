import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';

export function DiveIntro() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('dived'));
  const [depth, setDepth] = useState(0); // 0 → 100
  const [phase, setPhase] = useState<'loading' | 'plunge' | 'done'>('loading');

  // Random positions for particles
  const particles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      left: Math.random() * 100,
      size: 3 + Math.random() * 10,
      speed: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 2,
      xDrift: (Math.random() - 0.5) * 60,
    })),
  []);

  const fishSchools = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      y: 30 + i * 15,
      dir: i % 2 === 0 ? 1 : -1,
      fish: i % 2 === 0 ? '🐟' : '🐠',
      count: 3 + Math.floor(Math.random() * 4),
      speed: 6 + Math.random() * 4,
      delay: i * 0.8,
    })),
  []);

  useEffect(() => {
    if (!show) return;

    // Depth counter: 0 → 100 over 2.8s
    const start = Date.now();
    const duration = 2800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Eased progress (ease-in-out cubic)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setDepth(Math.floor(eased * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase('plunge'), 2800);
    const t2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('dived', '1');
      setTimeout(() => setShow(false), 600);
    }, 3800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show]);

  if (!show) return null;

  // Depth in meters (0 → 3000m)
  const depthMeters = Math.floor((depth / 100) * 3000);

  // Background gets darker as depth increases
  const bgOpacity = depth / 100;
  const lightColor = `rgba(168, 212, 245, ${1 - bgOpacity * 0.9})`;
  const midColor = `rgba(106, 137, 167, ${0.3 + bgOpacity * 0.5})`;
  const deepColor = `rgba(30, 45, 61, ${bgOpacity})`;

  // Light rays fade with depth
  const rayOpacity = Math.max(0, 1 - depth / 60);

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Dynamic ocean background */}
          <div
            className="absolute inset-0 transition-all duration-100"
            style={{
              background: `linear-gradient(180deg, ${lightColor} 0%, ${midColor} 40%, ${deepColor} 100%)`,
            }}
          />

          {/* Light rays from surface - fade as we go deeper */}
          {[10, 25, 45, 60, 78].map((left, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-0"
              style={{
                left: `${left}%`,
                width: 30 + i * 15,
                height: '70%',
                background: `linear-gradient(180deg, rgba(255,255,255,${0.08 * rayOpacity}) 0%, transparent 100%)`,
                filter: 'blur(20px)',
                transform: `rotate(${-5 + i * 3}deg)`,
                transformOrigin: 'top center',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
            />
          ))}

          {/* Rising bubbles - more as we go deeper */}
          {particles.map((p, i) => (
            <motion.div
              key={`bub-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                bottom: '-5%',
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${0.3 + bgOpacity * 0.2}), rgba(189,221,252,0.1))`,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              animate={{
                y: [0, -(window.innerHeight + 100)],
                x: [0, p.xDrift],
                scale: [1, 0.5],
              }}
              transition={{
                duration: p.speed + (1 - bgOpacity) * 3,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
            />
          ))}

          {/* Fish schools swimming past */}
          {fishSchools.map((school, i) => (
            <motion.div
              key={`school-${i}`}
              className="absolute whitespace-nowrap"
              style={{
                top: `${school.y}%`,
                opacity: 0.15 + bgOpacity * 0.15,
                fontSize: 14,
              }}
              animate={{
                x: school.dir > 0 ? ['-20%', '120vw'] : ['120vw', '-20%'],
              }}
              transition={{
                duration: school.speed,
                repeat: Infinity,
                delay: school.delay + (depth > 30 ? 0 : 99),
                ease: 'linear',
              }}
            >
              {Array(school.count).fill(school.fish).join(' ')}
            </motion.div>
          ))}

          {/* ===== DIVING WHALE ===== */}
          <motion.div
            className="relative z-20"
            animate={
              phase === 'loading'
                ? { y: [0, 15, -5, 10, 0], rotate: [0, 3, -2, 1, 0] }
                : { y: [0, window.innerHeight + 200], rotate: [0, 25], scale: [1, 0.6] }
            }
            transition={
              phase === 'loading'
                ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.9, ease: [0.6, 0, 0.4, 1] }
            }
          >
            {/* Whale SVG - more detailed, 3D-ish */}
            <div className="relative">
              <svg width="180" height="120" viewBox="0 0 180 120" fill="none"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))',
                  transform: 'rotate(15deg)',
                }}
              >
                {/* Main body */}
                <ellipse cx="80" cy="60" rx="60" ry="42" fill="url(#diveWhaleBody)" />
                {/* Top highlight */}
                <ellipse cx="65" cy="38" rx="38" ry="18" fill="url(#diveHighlight)" />
                {/* Belly */}
                <ellipse cx="75" cy="72" rx="42" ry="22" fill="url(#diveBelly)" />
                {/* Belly lines */}
                {[0,1,2,3].map(i => (
                  <path key={i} d={`M${55+i*3},${66+i*5} Q${78},${68+i*5} ${98-i*3},${66+i*5}`}
                    stroke="#BDDDFC" strokeWidth="0.6" opacity="0.12" fill="none" strokeLinecap="round" />
                ))}
                {/* Tail */}
                <motion.path
                  d="M140 60 Q155 42 168 30 Q158 52 153 60 Q158 68 168 90 Q155 78 140 60Z"
                  fill="url(#diveTail)"
                  animate={{
                    d: [
                      "M140 60 Q155 42 168 30 Q158 52 153 60 Q158 68 168 90 Q155 78 140 60Z",
                      "M140 60 Q158 35 172 25 Q162 52 156 60 Q162 68 172 95 Q158 85 140 60Z",
                      "M140 60 Q150 48 160 40 Q154 54 150 60 Q154 66 160 80 Q150 72 140 60Z",
                      "M140 60 Q155 42 168 30 Q158 52 153 60 Q158 68 168 90 Q155 78 140 60Z",
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Dorsal fin */}
                <path d="M74 18 Q82 4 90 17" fill="#4a6a80" />
                {/* Pectoral fin */}
                <motion.path d="M60 85 Q66 102 78 98 Q70 90 66 84Z" fill="#4a6a80" opacity="0.8"
                  animate={{ rotate: [0, -10, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: '64px 88px' }}
                />
                {/* Eye left */}
                <ellipse cx="42" cy="48" rx="8" ry="9" fill="#1a2535" />
                <circle cx="40" cy="46" r="3.5" fill="#BDDDFC" />
                <circle cx="45" cy="43" r="2" fill="white" opacity="0.8" />
                <circle cx="38" cy="44" r="0.8" fill="white" opacity="0.4" />
                {/* Eye right */}
                <ellipse cx="26" cy="50" rx="5.5" ry="6.5" fill="#1a2535" />
                <circle cx="25" cy="48.5" r="2.5" fill="#BDDDFC" />
                <circle cx="28" cy="46" r="1.3" fill="white" opacity="0.8" />
                {/* Blush */}
                <ellipse cx="47" cy="60" rx="6" ry="3" fill="#f0a0b0" opacity="0.15" />
                <ellipse cx="23" cy="61" rx="4.5" ry="2.5" fill="#f0a0b0" opacity="0.1" />
                {/* Smile */}
                <path d="M32 65 Q40 74 50 66" stroke="#1a2535" strokeWidth="1.8" fill="none" strokeLinecap="round" />

                <defs>
                  <linearGradient id="diveWhaleBody" x1="20" y1="18" x2="140" y2="102">
                    <stop offset="0%" stopColor="#8ab4d4" />
                    <stop offset="35%" stopColor="#6A89A7" />
                    <stop offset="100%" stopColor="#4a6a80" />
                  </linearGradient>
                  <radialGradient id="diveHighlight" cx="0.35" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#b8daf0" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#b8daf0" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="diveBelly" cx="0.5" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="#a8ccdf" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a8ccdf" stopOpacity="0.05" />
                  </radialGradient>
                  <linearGradient id="diveTail" x1="140" y1="30" x2="168" y2="90">
                    <stop offset="0%" stopColor="#7BA3C4" />
                    <stop offset="100%" stopColor="#4a6a80" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Whale trail bubbles */}
              {[0,1,2,3,4].map(i => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white/20"
                  style={{
                    width: 5 + i * 3,
                    height: 5 + i * 3,
                    top: -10 - i * 8,
                    left: 80 + (i % 2 === 0 ? 1 : -1) * (5 + i * 6),
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent)',
                  }}
                  animate={{
                    y: [0, -30 - i * 20],
                    opacity: [0.6, 0],
                    scale: [1, 2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* ===== DEPTH HUD ===== */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-12">
            {/* Depth bar + info */}
            <div className="max-w-lg mx-auto">
              {/* Depth label */}
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-3">
                  <motion.span
                    className="text-5xl md:text-6xl font-bold tracking-tight"
                    style={{ color: 'rgba(189,221,252,0.9)' }}
                    key={depth}
                  >
                    {depth}
                    <span className="text-lg ml-0.5 opacity-50">%</span>
                  </motion.span>
                  <span className="text-xs text-[#88BDF2]/50 tracking-widest uppercase">depth</span>
                </div>
                <motion.span
                  className="text-sm text-[#88BDF2]/40 font-mono"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {depthMeters.toLocaleString()}m
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="relative h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${depth}%`,
                    background: 'linear-gradient(90deg, #BDDDFC, #88BDF2, #6A89A7)',
                  }}
                />
                {/* Glowing dot at end */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#BDDDFC]"
                  style={{ left: `${depth}%`, marginLeft: -4 }}
                  animate={{ boxShadow: ['0 0 8px rgba(189,221,252,0.5)', '0 0 16px rgba(189,221,252,0.8)', '0 0 8px rgba(189,221,252,0.5)'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              {/* Zone label */}
              <motion.p className="mt-3 text-xs tracking-[0.25em] uppercase"
                style={{ color: 'rgba(136,189,242,0.3)' }}
              >
                {depth < 20 ? 'Sunlight Zone' :
                 depth < 40 ? 'Twilight Zone' :
                 depth < 60 ? 'Midnight Zone' :
                 depth < 80 ? 'Abyssal Zone' :
                 'Hadal Zone'}
              </motion.p>
            </div>
          </div>

          {/* DIVE IN text at center top */}
          <motion.div
            className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center"
            animate={phase === 'loading' ? { opacity: 1 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-white/50 text-sm md:text-base tracking-[0.5em] uppercase"
              animate={{ letterSpacing: ['0.5em', '0.6em', '0.5em'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Dive In
            </motion.p>
            <motion.div
              className="mt-3 mx-auto w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
              animate={{ height: [30, 50, 30] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Plunge splash overlay */}
          {phase === 'plunge' && (
            <>
              <motion.div
                className="absolute inset-0 bg-[#1a2a38] z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 1] }}
                transition={{ duration: 0.8, ease: 'easeIn' }}
              />
              {/* Dramatic bubbles burst */}
              {Array.from({ length: 25 }, (_, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute z-50 rounded-full border border-white/20"
                  style={{
                    width: 4 + Math.random() * 16,
                    height: 4 + Math.random() * 16,
                    left: `${30 + Math.random() * 40}%`,
                    top: '50%',
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent)',
                  }}
                  initial={{ y: 0, opacity: 0.8 }}
                  animate={{
                    y: -(100 + Math.random() * 500),
                    x: (Math.random() - 0.5) * 200,
                    opacity: 0,
                    scale: 2,
                  }}
                  transition={{ duration: 0.8, delay: Math.random() * 0.3, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
