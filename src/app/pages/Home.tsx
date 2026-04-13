import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Award } from 'lucide-react';
import { SwimmingWhales } from '../components/SwimmingWhales';
import { HeroWhale } from '../components/HeroWhale';
import { WaveDivider } from '../components/WaveDivider';
import { OceanFloor } from '../components/OceanFloor';
import { useRef, useState } from 'react';

const whaleQuotes = [
  "오늘도 깊이 다이브 중... 🫧",
  "커밋은 꾸준히, 바다처럼 넓게!",
  "버그를 삼켜버리겠어! 🐋",
  "코드의 바다에서 헤엄치는 중~",
  "git push origin ocean 🌊",
  "오류의 심해를 탐험 중...",
];

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  const handleWhaleClick = () => {
    setQuoteIndex((i) => (i + 1) % whaleQuotes.length);
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 2500);
  };

  const categoryStats = [
    { name: 'Development', count: 8, icon: '💻' },
    { name: 'CTF-Wargame', count: 1, icon: '🚩' },
    { name: 'BugBounty', count: 0, icon: '🐛' },
    { name: 'Technical Document', count: 6, icon: '📚' },
    { name: 'Paper-Conference', count: 5, icon: '📝' },
    { name: 'Contest-Certification', count: 1, icon: '🏆' },
  ];

  const totalPosts = categoryStats.reduce((sum, cat) => sum + cat.count, 0);

  const project = {
    title: 'SLM-based OT Solution',
    badge: 'BEST OF THE BEST',
    description: 'An OT security solution based on SLM, focused on practical defense and applied security architecture.',
    tags: ['Security', 'OT', 'SLM'],
  };

  const timeline = [
    {
      date: '2021 - Present',
      title: 'Sangmyung University',
      role: 'Undergraduate Student',
      description: 'Entered the Department of Information Security Engineering at Sangmyung University.',
      icon: '🎓',
      creature: '🐠',
    },
    {
      date: 'Jun. 2025 - Feb. 2026',
      title: 'BoB (Best of the Best)',
      role: 'Program Graduate',
      description: 'Completed the BoB program with focused training in practical security',
      icon: '🛡️',
      creature: '🐡',
    },
    {
      date: 'Jan. 2026 - Feb. 2026',
      title: 'Undergraduate Research Intern',
      role: 'Research Student',
      description: 'Studied AI guardrails and jailbreak techniques as part of an undergraduate research program.',
      icon: '🔬',
      creature: '🦑',
    },
  ];

  return (
    <div className="min-h-screen bg-[#384959] relative overflow-x-hidden">
      <SwimmingWhales />

      {/* ============================================ */}
      {/* HERO - 수면 가까이, 빛이 내리쬐는 느낌 */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Sunlight filtering through water surface */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden">
          {[15, 30, 48, 62, 78].map((left, i) => (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: `${left}%`,
                height: '100%',
                width: `${30 + i * 8}px`,
                background: `linear-gradient(180deg, rgba(189,221,252,${0.03 + i * 0.01}) 0%, transparent 100%)`,
                filter: 'blur(15px)',
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], x: [-5, 5, -5] }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>

        {/* Floating plankton / light particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`plankton-${i}`}
            className="absolute rounded-full bg-[#BDDDFC]"
            style={{
              width: 1 + Math.random() * 3,
              height: 1 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Clickable whale */}
            <div className="relative inline-block cursor-pointer" onClick={handleWhaleClick}>
              <HeroWhale />
              <AnimatedQuote show={showQuote} text={whaleQuotes[quoteIndex]} />
              {/* Click hint */}
              <motion.span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-600"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 3 }}
              >
                click me!
              </motion.span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-3 text-[#BDDDFC]">
              개발자 이름
            </h1>
            <p className="text-lg text-[#88BDF2]/80 mb-2">Security Researcher</p>
            <motion.p
              className="text-sm text-slate-400 mb-8 max-w-md mx-auto"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              깊은 바다처럼 깊이 있는 개발을 추구합니다.
            </motion.p>

            <div className="flex items-center justify-center gap-4">
              {[
                { href: 'https://github.com', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="p-3 text-slate-400 hover:text-[#BDDDFC] transition-colors bg-[#6A89A7]/10 rounded-full hover:bg-[#6A89A7]/20 border border-transparent hover:border-[#88BDF2]/30"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] tracking-[0.3em] text-slate-600 uppercase">Dive deeper</span>
              <svg width="24" height="20" viewBox="0 0 24 20" className="text-[#6A89A7]">
                <path d="M12,0 Q6,8 2,12 Q6,10 12,14 Q18,10 22,12 Q18,8 12,0Z" fill="currentColor" opacity="0.5" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <WaveDivider color="#324252" />

      {/* ============================================ */}
      {/* CAREER - 해류가 흐르는 중층, 물고기 떼가 지나감 */}
      {/* ============================================ */}
      <section className="py-20 px-6 bg-[#324252] relative overflow-hidden">
        {/* 해류 느낌 - 흐르는 파도 라인 */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`current-${i}`}
            className="absolute h-px w-[200%]"
            style={{
              top: `${25 + i * 25}%`,
              left: '-50%',
              background: `linear-gradient(90deg, transparent, rgba(136,189,242,${0.05 + i * 0.02}), transparent)`,
            }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* 물고기 떼가 지나가는 효과 */}
        <motion.div
          className="absolute top-[15%] text-xs opacity-15 whitespace-nowrap"
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
        >
          🐟 🐟 🐟 🐟 🐟
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] text-[10px] opacity-10 whitespace-nowrap"
          animate={{ x: ['110%', '-10%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 8 }}
        >
          🐠 🐠 🐠
        </motion.div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <h2 className="text-2xl font-bold text-slate-200">My Career</h2>
            <motion.span
              className="text-lg"
              animate={{ x: [0, 8, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🐋
            </motion.span>
          </motion.div>

          <div className="border-l-2 border-[#6A89A7]/40 pl-6 space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                {/* Timeline dot - pulsing */}
                <motion.div
                  className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#88BDF2] border-2 border-[#324252]"
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                />
                {/* Pulse ring */}
                <motion.div
                  className="absolute -left-[34px] top-[3px] w-[18px] h-[18px] rounded-full border border-[#88BDF2]"
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                />

                {/* Sea creature - peeking in from the side */}
                <motion.span
                  className="absolute -right-10 top-0 text-base opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  animate={{ y: [-3, 3, -3], x: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {item.creature}
                </motion.span>

                <div className="text-xs text-[#88BDF2] mb-1 tracking-wide">{item.date}</div>
                <h3 className="text-lg text-slate-100 mb-0.5">
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </h3>
                <div className="text-sm text-[#6A89A7] mb-1">{item.role}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#2d3d4d" />

      {/* ============================================ */}
      {/* TOTAL POSTS - 심해 소나 / 레이더 느낌 */}
      {/* ============================================ */}
      <section className="py-16 px-6 bg-[#2d3d4d] relative overflow-hidden">
        {/* Sonar ring pulse effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`sonar-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{ borderColor: 'rgba(136,189,242,0.06)' }}
              animate={{
                width: [0, 500],
                height: [0, 500],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* 심해 발광 해파리 */}
        <motion.div
          className="absolute right-[10%] top-[20%] opacity-15"
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <div className="relative">
            <span className="text-2xl">🪼</span>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 20px rgba(136,189,242,0.3)' }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-bold text-slate-200">Total Posts</h2>
            <motion.span
              className="text-3xl font-bold text-[#88BDF2]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {totalPosts}
            </motion.span>
            <span className="text-xs text-slate-500">articles in the deep</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStats.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                  y: -5,
                  borderColor: 'rgba(136,189,242,0.4)',
                  boxShadow: '0 8px 30px rgba(136,189,242,0.1)',
                }}
                className="relative p-4 bg-[#384959]/60 border rounded-2xl overflow-hidden group"
                style={{ borderColor: 'rgba(106,137,167,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.span
                    className="text-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  >
                    {category.icon}
                  </motion.span>
                  <span className="text-xl font-bold text-slate-100">{category.count}</span>
                </div>
                <div className="text-xs text-slate-500">{category.name}</div>

                {/* Sonar-style progress bar */}
                <div className="mt-3 h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.max((category.count / Math.max(...categoryStats.map(c => c.count))) * 100, 6)}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #6A89A7, #88BDF2, #BDDDFC)',
                    }}
                  />
                </div>

                {/* Sonar blip on hover */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#88BDF2] opacity-0 group-hover:opacity-60"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#283848" />

      {/* ============================================ */}
      {/* PROJECT - 보물 상자 발견! 심해 탐험 느낌 */}
      {/* ============================================ */}
      <section className="py-20 px-6 bg-[#283848] relative overflow-hidden">
        {/* 심해 바닥 모래 입자 느낌 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sand-${i}`}
            className="absolute rounded-full bg-[#6A89A7]/10"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
            }}
            animate={{ y: [0, -5, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}

        {/* 잠수함 탐조등 효과 */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(189,221,252,0.03) 0%, transparent 70%)',
          }}
          animate={{
            background: [
              'radial-gradient(ellipse 40% 50% at 40% 45%, rgba(189,221,252,0.03) 0%, transparent 70%)',
              'radial-gradient(ellipse 40% 50% at 60% 55%, rgba(189,221,252,0.03) 0%, transparent 70%)',
              'radial-gradient(ellipse 40% 50% at 40% 45%, rgba(189,221,252,0.03) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-slate-200">My Project</h2>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🧭
            </motion.span>
            <motion.span
              className="text-xs text-slate-600 italic"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              treasure found!
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              borderColor: 'rgba(136,189,242,0.5)',
              boxShadow: '0 0 60px rgba(136,189,242,0.08)',
            }}
            className="relative p-8 bg-gradient-to-br from-[#384959]/80 to-[#2d3d4d]/80 border rounded-2xl overflow-hidden"
            style={{ borderColor: 'rgba(106,137,167,0.3)' }}
          >
            {/* Sparkle / 반짝이 효과 - 보물 느낌 */}
            {[
              { left: '85%', top: '15%', delay: 0 },
              { left: '90%', top: '70%', delay: 1.5 },
              { left: '10%', top: '80%', delay: 3 },
            ].map((pos, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-[10px]"
                style={{ left: pos.left, top: pos.top }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
              >
                ✦
              </motion.div>
            ))}

            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-[#88BDF2]" />
              <motion.span
                className="text-xs text-[#88BDF2] tracking-wide"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {project.badge}
              </motion.span>
            </div>

            <h3 className="text-xl text-slate-100 mb-2">{project.title}</h3>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 text-xs bg-[#6A89A7]/15 text-[#BDDDFC] rounded-full border"
                  style={{ borderColor: 'rgba(106,137,167,0.2)' }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(136,189,242,0.4)' }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider color="#1a2a38" />

      {/* Ocean Floor Footer */}
      <OceanFloor />
    </div>
  );
}

function AnimatedQuote({ show, text }: { show: boolean; text: string }) {
  return (
    <motion.div
      className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-xs whitespace-nowrap pointer-events-none z-20"
      style={{ backgroundColor: 'rgba(189,221,252,0.9)', color: '#384959' }}
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? -12 : 0,
        scale: show ? 1 : 0.8,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {text}
      <div
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
        style={{ backgroundColor: 'rgba(189,221,252,0.9)' }}
      />
    </motion.div>
  );
}