import { motion } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import whaleImg from '../../imports/whale-icon.png';

export function HeroWhale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whaleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [facingLeft, setFacingLeft] = useState(false);
  const rafRef = useRef(0);
  const isHoveringRef = useRef(false);

  const animate = useCallback(() => {
    const lerp = 0.04;
    const dx = targetRef.current.x - posRef.current.x;
    const dy = targetRef.current.y - posRef.current.y;
    posRef.current.x += dx * lerp;
    posRef.current.y += dy * lerp;
    if (whaleRef.current) {
      whaleRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
    if (Math.abs(dx) > 3) setFacingLeft(dx < 0);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRef.current = {
        x: Math.max(-120, Math.min(120, (e.clientX - cx) * 0.3)),
        y: Math.max(-40,  Math.min(40,  (e.clientY - cy) * 0.18)),
      };
      isHoveringRef.current = true;
    };

    const handleLeave = () => {
      isHoveringRef.current = false;
      const id = setInterval(() => {
        if (isHoveringRef.current) { clearInterval(id); return; }
        targetRef.current = { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 30 };
      }, 3000);
      targetRef.current = { x: (Math.random() - 0.5) * 70, y: (Math.random() - 0.5) * 25 };
      return () => clearInterval(id);
    };

    window.addEventListener('mousemove', handleMouse);
    container.addEventListener('mouseleave', handleLeave);
    rafRef.current = requestAnimationFrame(animate);
    handleLeave();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      container.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="relative w-[220px] h-[200px]">
      {/* bubbles */}
      {[
        { size: 7, right: '20%', bottom: '38%', dur: 2.4, delay: 0 },
        { size: 5, right: '38%', bottom: '30%', dur: 3.1, delay: 0.9 },
        { size: 9, right: '10%', bottom: '20%', dur: 2.8, delay: 0.4 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#c4ddf0]/20"
          style={{ width: b.size, height: b.size, right: b.right, bottom: b.bottom }}
          animate={{ y: [0, -80], opacity: [0.55, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: 'linear' }}
        />
      ))}

      {/* whale with follow + flip */}
      <div
        ref={whaleRef}
        className="absolute left-1/2 top-1/2"
        style={{ marginLeft: -90, marginTop: -90, willChange: 'transform' }}
      >
        <motion.div
          animate={{ rotateY: facingLeft ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src={whaleImg}
            alt="cute whale"
            width={180}
            height={180}
            animate={{ y: [0, -14, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              filter: 'drop-shadow(0 12px 32px rgba(0,80,160,0.45))',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
