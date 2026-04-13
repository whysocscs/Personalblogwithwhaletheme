import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

const depthZones = [
  { label: 'Surface', emoji: '🌊', depth: 0, meters: '0m' },
  { label: 'Twilight', emoji: '🐋', depth: 0.33, meters: '1000m' },
  { label: 'Midnight', emoji: '🦑', depth: 0.66, meters: '4000m' },
  { label: 'Hadal', emoji: '🌋', depth: 0.95, meters: '11000m' },
];

export function DepthMeter() {
  const { scrollYProgress } = useScroll();
  const meterHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [currentZone, setCurrentZone] = useState(0);
  const [depthPercent, setDepthPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDepthPercent(Math.round(v * 100));
    const zoneIdx = depthZones.reduce((acc, zone, i) => (v >= zone.depth ? i : acc), 0);
    setCurrentZone(zoneIdx);
  });

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-3">
      {/* Zone info */}
      <div className="flex flex-col items-end gap-1">
        <motion.span
          key={currentZone}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] tracking-[0.15em] uppercase text-[#88BDF2]/40"
        >
          {depthZones[currentZone].label}
        </motion.span>
        <span className="text-[10px] font-mono text-[#6A89A7]/30">
          {depthPercent}%
        </span>
      </div>

      {/* Track */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-[3px] h-32 bg-[#6A89A7]/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              height: meterHeight,
              background: 'linear-gradient(180deg, #BDDDFC 0%, #88BDF2 40%, #6A89A7 70%, #384959 100%)',
            }}
          />
        </div>

        {/* Zone dots */}
        {depthZones.map((zone, i) => (
          <motion.div
            key={zone.label}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `${zone.depth * 100}%` }}
          >
            <motion.div
              className="w-[7px] h-[7px] rounded-full border"
              style={{
                borderColor: i <= currentZone ? '#88BDF2' : 'rgba(106,137,167,0.15)',
                background: i <= currentZone ? '#88BDF2' : 'transparent',
              }}
              animate={i === currentZone ? {
                boxShadow: ['0 0 4px rgba(136,189,242,0.3)', '0 0 10px rgba(136,189,242,0.6)', '0 0 4px rgba(136,189,242,0.3)'],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        ))}

        {/* Current position indicator - glowing dot */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#BDDDFC]"
          style={{
            top: meterHeight,
            marginTop: -4,
            boxShadow: '0 0 8px rgba(189,221,252,0.6)',
          }}
        />
      </div>
    </div>
  );
}
