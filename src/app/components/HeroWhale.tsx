import { motion } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';

export function HeroWhale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whaleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [facingLeft, setFacingLeft] = useState(false);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);
  const isHoveringRef = useRef(false);

  // Smooth follow with lerp
  const animate = useCallback(() => {
    const lerp = 0.04; // Very smooth following
    const dx = targetRef.current.x - posRef.current.x;
    const dy = targetRef.current.y - posRef.current.y;

    posRef.current.x += dx * lerp;
    posRef.current.y += dy * lerp;

    if (whaleRef.current) {
      whaleRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }

    // Update facing direction with deadzone to prevent flickering
    if (Math.abs(dx) > 3) {
      setFacingLeft(dx < 0);
      lastXRef.current = posRef.current.x;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouse = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Limit movement range
      const maxX = 150;
      const maxY = 50;
      const rawX = (e.clientX - cx) * 0.35;
      const rawY = (e.clientY - cy) * 0.2;

      targetRef.current = {
        x: Math.max(-maxX, Math.min(maxX, rawX)),
        y: Math.max(-maxY, Math.min(maxY, rawY)),
      };
      isHoveringRef.current = true;
    };

    const handleLeave = () => {
      isHoveringRef.current = false;
      // Drift back with gentle wander
      const wanderInterval = setInterval(() => {
        if (isHoveringRef.current) { clearInterval(wanderInterval); return; }
        targetRef.current = {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 40,
        };
      }, 3000);
      // First drift
      targetRef.current = { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 30 };

      return () => clearInterval(wanderInterval);
    };

    window.addEventListener('mousemove', handleMouse);
    container.addEventListener('mouseleave', handleLeave);
    rafRef.current = requestAnimationFrame(animate);

    // Start with idle wander
    handleLeave();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      container.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="relative w-full h-[250px] md:h-[300px] mx-auto mb-4">
      {/* Ambient bubble trail */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + i * 2.5,
            height: 3 + i * 2.5,
            left: `${44 + i * 2.5}%`,
            top: `${30 + i * 5}%`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent)',
            border: '1px solid rgba(189,221,252,0.12)',
          }}
          animate={{
            y: [-10, -80 - i * 20],
            x: [0, (i % 2 === 0 ? 1 : -1) * (8 + i * 4)],
            opacity: [0.5, 0],
            scale: [1, 2],
          }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
        />
      ))}

      {/* Whale container - positioned by JS for smooth follow */}
      <div
        ref={whaleRef}
        className="absolute left-1/2 top-1/2"
        style={{ marginLeft: -95, marginTop: -60, willChange: 'transform' }}
      >
        {/* Direction flip using rotateY - no flattening */}
        <motion.div
          animate={{ rotateY: facingLeft ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        >
          <WhaleBody />
        </motion.div>
      </div>
    </div>
  );
}

function WhaleBody() {
  return (
    <svg width="190" height="125" viewBox="0 0 190 125" fill="none"
      style={{ filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.35))' }}
    >
      {/* === BODY === */}
      <motion.ellipse
        cx="82" cy="62" rx="62" ry="44"
        fill="url(#hwBody)"
        animate={{ ry: [44, 46, 44], rx: [62, 60, 62] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top specular highlight */}
      <ellipse cx="65" cy="38" rx="40" ry="18" fill="url(#hwSpec)" />

      {/* Side rim light */}
      <ellipse cx="30" cy="55" rx="8" ry="30" fill="url(#hwRim)" />

      {/* Belly */}
      <ellipse cx="78" cy="76" rx="46" ry="24" fill="url(#hwBelly)" />

      {/* Belly grooves */}
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i}
          d={`M${56 + i * 2},${68 + i * 4.5} Q${80},${70 + i * 4.5} ${102 - i * 2},${68 + i * 4.5}`}
          stroke="rgba(189,221,252,0.08)" strokeWidth="0.8" fill="none" strokeLinecap="round"
        />
      ))}

      {/* === TAIL === */}
      <motion.path
        d="M144 62 Q160 44 174 32 Q164 54 158 62 Q164 70 174 92 Q160 80 144 62Z"
        fill="url(#hwTail)"
        animate={{
          d: [
            "M144 62 Q160 44 174 32 Q164 54 158 62 Q164 70 174 92 Q160 80 144 62Z",
            "M144 62 Q164 36 178 26 Q168 54 162 62 Q168 70 178 98 Q164 88 144 62Z",
            "M144 62 Q154 50 164 42 Q158 56 154 62 Q158 68 164 82 Q154 74 144 62Z",
            "M144 62 Q160 44 174 32 Q164 54 158 62 Q164 70 174 92 Q160 80 144 62Z",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Tail highlight */}
      <motion.path
        d="M146 58 Q156 48 164 42 Q158 53 155 58Z"
        fill="rgba(168,204,223,0.15)"
        animate={{
          d: [
            "M146 58 Q156 48 164 42 Q158 53 155 58Z",
            "M146 58 Q160 40 170 34 Q162 53 158 58Z",
            "M146 58 Q150 52 158 46 Q154 54 151 58Z",
            "M146 58 Q156 48 164 42 Q158 53 155 58Z",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* === DORSAL FIN === */}
      <motion.path
        d="M76 18 Q84 2 92 17" fill="#4a6a80"
        animate={{ d: ["M76 18 Q84 2 92 17", "M76 18 Q84 -1 92 17", "M76 18 Q84 2 92 17"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <path d="M80 16 Q84 6 86 16" fill="rgba(168,212,245,0.1)" />

      {/* === PECTORAL FIN === */}
      <motion.path
        d="M62 90 Q70 110 84 106 Q74 96 68 88Z"
        fill="url(#hwFin)" opacity="0.85"
        animate={{ rotate: [0, -10, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: '66px 92px' }}
      />

      {/* === FACE === */}
      {/* Left eye */}
      <circle cx="44" cy="48" r="10" fill="#16222e" />
      <circle cx="44" cy="48" r="8" fill="#0e1820" />
      <motion.circle cx="42" cy="46" r="3.8" fill="#c8e2f5"
        animate={{ cx: [42, 43, 41, 42], cy: [46, 47, 45.5, 46] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <circle cx="48" cy="43" r="2.2" fill="white" opacity="0.85" />
      <circle cx="40" cy="44" r="1" fill="white" opacity="0.4" />
      <circle cx="44" cy="48" r="9" stroke="rgba(189,221,252,0.08)" strokeWidth="0.5" fill="none" />

      {/* Right eye */}
      <circle cx="26" cy="52" r="7" fill="#16222e" />
      <circle cx="26" cy="52" r="5.5" fill="#0e1820" />
      <motion.circle cx="25" cy="50.5" r="2.5" fill="#c8e2f5"
        animate={{ cx: [25, 26, 24, 25], cy: [50.5, 51.5, 50, 50.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <circle cx="28.5" cy="48.5" r="1.5" fill="white" opacity="0.85" />
      <circle cx="23" cy="49.5" r="0.6" fill="white" opacity="0.35" />

      {/* Blush */}
      <ellipse cx="50" cy="62" rx="7.5" ry="3.5" fill="#e8909a" opacity="0.12" />
      <ellipse cx="23" cy="63" rx="5.5" ry="2.8" fill="#e8909a" opacity="0.09" />

      {/* Mouth */}
      <motion.path
        d="M32 68 Q42 78 54 70"
        stroke="#16222e" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ["M32 68 Q42 78 54 70", "M32 68 Q42 80 54 70", "M32 68 Q42 78 54 70"] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      />

      {/* === WATER SPOUT === */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path d="M66 14 Q62 4 56 7 Q54 12 60 16 Q63 12 66 14Z" fill="#BDDDFC" opacity="0.2" />
          <path d="M66 14 Q70 4 76 7 Q78 12 72 16 Q69 12 66 14Z" fill="#BDDDFC" opacity="0.2" />
          <circle cx="56" cy="4" r="1.8" fill="#BDDDFC" opacity="0.15" />
          <circle cx="66" cy="0" r="2.2" fill="#BDDDFC" opacity="0.18" />
          <circle cx="76" cy="5" r="1.5" fill="#BDDDFC" opacity="0.13" />
        </motion.g>
      </motion.g>

      {/* Ambient light */}
      <ellipse cx="55" cy="50" rx="15" ry="6" fill="rgba(255,255,255,0.03)" transform="rotate(-15 55 50)" />

      <defs>
        <linearGradient id="hwBody" x1="20" y1="18" x2="144" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9ac0dd" />
          <stop offset="30%" stopColor="#7BA3C4" />
          <stop offset="65%" stopColor="#5c8099" />
          <stop offset="100%" stopColor="#3d5c72" />
        </linearGradient>
        <radialGradient id="hwSpec" cx="0.35" cy="0.25" r="0.8">
          <stop offset="0%" stopColor="#cbe5f5" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#a8d0e8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#a8d0e8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hwRim" cx="0.7" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#a8d4f5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#a8d4f5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hwBelly" cx="0.5" cy="0.2" r="0.8">
          <stop offset="0%" stopColor="#b8daf0" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#88BDF2" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#88BDF2" stopOpacity="0.03" />
        </radialGradient>
        <linearGradient id="hwTail" x1="144" y1="32" x2="174" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8ab4d4" />
          <stop offset="100%" stopColor="#4a6a80" />
        </linearGradient>
        <linearGradient id="hwFin" x1="62" y1="88" x2="84" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6A89A7" />
          <stop offset="100%" stopColor="#3d5c72" />
        </linearGradient>
      </defs>
    </svg>
  );
}
