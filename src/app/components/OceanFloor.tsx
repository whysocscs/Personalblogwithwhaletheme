import { motion } from 'motion/react';

export function OceanFloor() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden bg-gradient-to-b from-[#384959] to-[#1a2a38]">
      {/* Sandy bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#4a5a3a]/20 to-transparent" />

      {/* Seaweed */}
      {[12, 28, 55, 72, 88].map((left, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${left}%` }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height={50 + i * 10} viewBox={`0 0 20 ${50 + i * 10}`}>
            <path
              d={`M10,${50 + i * 10} Q5,${30 + i * 5} 12,${20 + i * 3} Q18,${10 + i * 2} 8,0`}
              stroke="#4a7a5a"
              strokeWidth="3"
              fill="none"
              opacity="0.3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* Small sea creatures */}
      <motion.span
        className="absolute bottom-6 left-[20%] text-sm opacity-30"
        animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🦀
      </motion.span>
      <motion.span
        className="absolute bottom-8 right-[25%] text-xs opacity-20"
        animate={{ x: [3, -3, 3] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ⭐
      </motion.span>
      <motion.span
        className="absolute bottom-4 left-[60%] text-xs opacity-20"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        🐚
      </motion.span>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <p className="text-slate-500 text-sm">
            Built from the deep sea with 🐋
          </p>
          <p className="text-slate-600 text-xs">
            © 2026 DevWhale — Swimming through code, one commit at a time
          </p>
          <motion.p
            className="text-xs text-slate-600/50 italic"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul."
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
