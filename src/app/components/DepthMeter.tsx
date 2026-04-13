import { motion, useScroll, useTransform } from 'motion/react';

const depthZones = [
  { label: 'Surface', emoji: '🌊', depth: 0 },
  { label: 'Sunlight Zone', emoji: '☀️', depth: 0.15 },
  { label: 'Twilight Zone', emoji: '🐋', depth: 0.35 },
  { label: 'Midnight Zone', emoji: '🦑', depth: 0.55 },
  { label: 'Abyssal Zone', emoji: '🐙', depth: 0.75 },
  { label: 'Hadal Zone', emoji: '🌋', depth: 0.95 },
];

export function DepthMeter() {
  const { scrollYProgress } = useScroll();
  const meterHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      {/* Track */}
      <div className="relative w-1.5 h-48 bg-[#6A89A7]/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#BDDDFC] via-[#88BDF2] to-[#384959] rounded-full"
          style={{ height: meterHeight }}
        />
      </div>
      {/* Depth labels */}
      <div className="relative h-48 -mt-48 ml-6 w-24">
        {depthZones.map((zone) => (
          <motion.div
            key={zone.label}
            className="absolute left-0 flex items-center gap-1 opacity-0"
            style={{ top: `${zone.depth * 100}%` }}
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
          >
            <span className="text-xs">{zone.emoji}</span>
            <span className="text-[10px] text-slate-500 whitespace-nowrap">{zone.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
