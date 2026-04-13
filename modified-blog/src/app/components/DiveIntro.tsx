import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const LOGS = [
  { t: 250,  text: 'DEPTH_INIT: CONNECTING...' },
  { t: 650,  text: 'PRESSURE_CHECK: NOMINAL' },
  { t: 1050, text: 'OXYGEN_SEAL: ACTIVE' },
  { t: 1500, text: 'WHALE_SIGNAL: DETECTED' },
  { t: 1950, text: 'BIOLUMINESCENCE: ENABLED' },
  { t: 2350, text: 'ABYSS_CORE: LOADED' },
];

const ZONES = [
  'SUNLIGHT ZONE — 0m',
  'SUNLIGHT ZONE — 200m',
  'TWILIGHT ZONE — 1000m',
  'MIDNIGHT ZONE — 3000m',
  'ABYSSAL ZONE — 6000m',
  'HADAL ZONE — 11000m',
];

const STATUSES = [
  'DEPTH_INIT: STANDBY',
  'PRESSURE_CHECK...',
  'OXYGEN_SEAL: ACTIVE',
  'WHALE_SIGNAL: LOCK',
  'BIOLUMINESCENCE: ON',
  'DIVE COMPLETE',
];

export function DiveIntro() {
  const [show] = useState(() => !sessionStorage.getItem('dived'));
  const [pct, setPct] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const pctRef = useRef(0);

  useEffect(() => {
    if (!show) return;

    // log injection
    LOGS.forEach(({ t, text }) => {
      setTimeout(() => setLogs(prev => [...prev, text]), t);
    });

    // progress tick
    const tick = () => {
      pctRef.current = Math.min(pctRef.current + Math.random() * 2.6 + 0.7, 100);
      setPct(Math.floor(pctRef.current));
      if (pctRef.current < 100) {
        setTimeout(tick, 52 + Math.random() * 72);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('dived', '1');
        }, 680);
      }
    };
    setTimeout(tick, 320);
  }, [show]);

  if (!show) return null;

  const zi = Math.min(Math.floor(pct / 18), 5);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
          style={{ background: '#03080e', fontFamily: "'Space Mono', monospace" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9 }}
        >
          {/* giant watermark number */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(130px, 30vw, 280px)',
              fontWeight: 800,
              color: 'rgba(196,221,240,0.04)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {pct}
          </div>

          {/* terminal logs top-left */}
          <div className="absolute top-9 left-11 flex flex-col gap-1.5">
            {logs.map((log, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(196,221,240,0.25)' }}
              >
                {log}
              </motion.span>
            ))}
          </div>

          {/* bottom HUD */}
          <div className="absolute bottom-12 left-11 right-11">
            <div style={{ fontSize: 9, letterSpacing: '0.38em', color: 'rgba(196,221,240,0.28)', marginBottom: 22 }}>
              {STATUSES[zi]}
            </div>

            <div className="flex items-baseline gap-3.5 mb-4">
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(52px, 11vw, 100px)',
                  fontWeight: 800,
                  color: '#c4ddf0',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {pct}
                <span style={{ fontSize: '0.32em', opacity: 0.45, marginLeft: 2 }}>%</span>
              </span>
              <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(196,221,240,0.3)' }}>
                {pct >= 100 ? 'READY' : 'DIVING'}
              </span>
            </div>

            {/* progress bar */}
            <div style={{ height: 1, background: 'rgba(196,221,240,0.08)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: '#c4ddf0', transition: 'width 0.06s linear' }} />
              <div style={{
                position: 'absolute', top: '50%', left: `${pct}%`,
                width: 6, height: 6, borderRadius: '50%',
                background: '#c4ddf0', transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 8px #c4ddf0', transition: 'left 0.06s linear',
              }} />
            </div>

            <div style={{ fontSize: 8, letterSpacing: '0.28em', color: 'rgba(196,221,240,0.17)', marginTop: 13 }}>
              {ZONES[zi]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
