import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Award } from 'lucide-react';
import { SwimmingWhales } from '../components/SwimmingWhales';
import { HeroWhale } from '../components/HeroWhale';
import { OceanFloor } from '../components/OceanFloor';
import { DiveIntro } from '../components/DiveIntro';
import { SectionFade } from '../components/SectionFade';
import { ParallaxSection } from '../components/ParallaxSection';
import { useRef, useState } from 'react';

const whaleQuotes = [
  "오늘도 깊이 다이브 중... 🫧",
  "커밋은 꾸준히, 바다처럼 넓게!",
  "버그를 삼켜버리겠어! 🐋",
  "코드의 바다에서 헤엄치는 중~",
  "git push origin ocean 🌊",
  "오류의 심해를 탐험 중...",
];

const DEPTH = {
  surface: '#4a6e8a',
  shallow: '#3d5f78',
  mid: '#304d63',
  deep: '#243d50',
  abyss: '#182d3e',
  trench: '#0e1f2d',
};

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
    { date: '2021 - Present', title: 'Sangmyung University', role: 'Undergraduate Student', description: 'Entered the Department of Information Security Engineering at Sangmyung University.', icon: '🎓', creature: '🐠' },
    { date: 'Jun. 2025 - Feb. 2026', title: 'BoB (Best of the Best)', role: 'Program Graduate', description: 'Completed the BoB program with focused training in practical security', icon: '🛡️', creature: '🐡' },
    { date: 'Jan. 2026 - Feb. 2026', title: 'Undergraduate Research Intern', role: 'Research Student', description: 'Studied AI guardrails and jailbreak techniques as part of an undergraduate research program.', icon: '🔬', creature: '🦑' },
  ];

  return (
    <>
      <DiveIntro />

      <div className="min-h-screen relative overflow-x-hidden">
        <SwimmingWhales />

        {/* ===== HERO — Surface ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${DEPTH.surface} 0%, ${DEPTH.shallow} 100%)` }}
        >
          {/* Water surface caustics */}
          <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden opacity-[0.04]">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'repeating-conic-gradient(rgba(189,221,252,0.3) 0%, transparent 8%, rgba(189,221,252,0.2) 15%)',
                backgroundSize: '80px 80px',
                filter: 'blur(8px)',
              }}
              animate={{ x: [-30, 30, -30], y: [-15, 15, -15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Light rays */}
          {[12, 28, 45, 62, 80].map((left, i) => (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: `${left}%`,
                height: '70%',
                width: `${40 + i * 12}px`,
                background: `linear-gradient(180deg, rgba(189,221,252,${0.06 + i * 0.015}) 0%, transparent 80%)`,
                filter: 'blur(20px)',
                transform: `rotate(${-3 + i * 2}deg)`,
                transformOrigin: 'top center',
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5 + i * 1.2, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}

          {/* Floating plankton */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute rounded-full bg-[#BDDDFC]"
              style={{ width: 1.5 + Math.random() * 2.5, height: 1.5 + Math.random() * 2.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [-20, 25, -20], x: [-12, 12, -12], opacity: [0, 0.35, 0] }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}

          <motion.div className="relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative inline-block cursor-pointer" onClick={handleWhaleClick}>
                <HeroWhale />
                <AnimatedQuote show={showQuote} text={whaleQuotes[quoteIndex]} />
                <motion.span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-[#BDDDFC]/30"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 6 }}
                >
                  click me!
                </motion.span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-3 text-[#BDDDFC]">개발자 이름</h1>
              <p className="text-lg text-[#88BDF2]/80 mb-2">Security Researcher</p>
              <motion.p
                className="text-sm text-[#BDDDFC]/30 mb-8 max-w-md mx-auto"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
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
                    className="p-3 text-[#BDDDFC]/40 hover:text-[#BDDDFC] transition-colors bg-[#BDDDFC]/5 rounded-full hover:bg-[#BDDDFC]/10 border border-[#88BDF2]/10 hover:border-[#88BDF2]/30"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8 + i * 0.1 }}
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
              transition={{ delay: 5 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[10px] tracking-[0.3em] text-[#BDDDFC]/20 uppercase">Dive deeper</span>
                <svg width="24" height="20" viewBox="0 0 24 20" className="text-[#6A89A7]/40">
                  <path d="M12,0 Q6,8 2,12 Q6,10 12,14 Q18,10 22,12 Q18,8 12,0Z" fill="currentColor" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* === Transition: Surface → Mid === */}
        <SectionFade fromColor={DEPTH.shallow} toColor={DEPTH.mid} />

        {/* ===== CAREER — Parallax Mid-depth ===== */}
        <ParallaxSection bgColor={DEPTH.mid} depth="mid">
          <div className="py-20 px-6">
            {/* Ambient fish */}
            <motion.div
              className="absolute top-[15%] text-xs opacity-[0.08] whitespace-nowrap pointer-events-none"
              animate={{ x: ['-10%', '110%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear', delay: 5 }}
            >
              🐟 🐟 🐟 🐟 🐟
            </motion.div>

            <div className="max-w-2xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center gap-3 mb-10"
              >
                <h2 className="text-2xl font-bold text-slate-200">My Career</h2>
                <motion.span className="text-lg" animate={{ x: [0, 8, 0], rotate: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>🐋</motion.span>
              </motion.div>

              <div className="border-l-2 border-[#6A89A7]/20 pl-6 space-y-10">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#88BDF2] border-2"
                      style={{ borderColor: DEPTH.mid }}
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    />
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute -left-[34px] top-[3px] w-[18px] h-[18px] rounded-full border border-[#88BDF2]"
                      animate={{ scale: [1, 1.8], opacity: [0.25, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                    {/* Floating creature on hover */}
                    <motion.span
                      className="absolute -right-10 top-0 text-base opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      animate={{ y: [-3, 3, -3], x: [0, -3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      {item.creature}
                    </motion.span>

                    <div className="text-xs text-[#88BDF2]/70 mb-1 tracking-wide">{item.date}</div>
                    <h3 className="text-lg text-slate-100 mb-0.5"><span className="mr-2">{item.icon}</span>{item.title}</h3>
                    <div className="text-sm text-[#6A89A7]/70 mb-1">{item.role}</div>
                    <p className="text-sm text-slate-400/80 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* === Transition === */}
        <SectionFade fromColor={DEPTH.mid} toColor={DEPTH.deep} />

        {/* ===== TOTAL POSTS — Deep ===== */}
        <ParallaxSection bgColor={DEPTH.deep} depth="deep">
          <div className="py-16 px-6 relative">
            {/* Bioluminescent jellyfish */}
            <motion.div
              className="absolute right-[8%] top-[18%] opacity-[0.15] pointer-events-none"
              animate={{ y: [-12, 12, -12], x: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              <div className="relative">
                <span className="text-2xl">🪼</span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: '0 0 25px rgba(136,189,242,0.4)' }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute left-[5%] bottom-[25%] opacity-[0.06] pointer-events-none"
              animate={{ y: [-8, 15, -8], x: [3, -5, 3] }}
              transition={{ duration: 9, repeat: Infinity, delay: 2 }}
            >
              <span className="text-xl">🪼</span>
            </motion.div>

            {/* Sonar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`sonar-${i}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{ borderColor: 'rgba(136,189,242,0.04)' }}
                  animate={{ width: [0, 500], height: [0, 500], opacity: [0.15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
                />
              ))}
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-baseline gap-3 mb-8"
              >
                <h2 className="text-2xl font-bold text-slate-200/90">Total Posts</h2>
                <motion.span
                  className="text-3xl font-bold text-[#88BDF2]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                >
                  {totalPosts}
                </motion.span>
                <span className="text-xs text-slate-500/50">articles in the deep</span>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categoryStats.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -8,
                      borderColor: 'rgba(136,189,242,0.35)',
                      boxShadow: '0 12px 50px rgba(136,189,242,0.08)',
                    }}
                    className="relative p-4 border rounded-2xl overflow-hidden group backdrop-blur-sm"
                    style={{ background: 'rgba(56,73,89,0.25)', borderColor: 'rgba(106,137,167,0.08)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span className="text-lg" whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}>{category.icon}</motion.span>
                      <span className="text-xl font-bold text-slate-100/90">{category.count}</span>
                    </div>
                    <div className="text-xs text-slate-500/60">{category.name}</div>
                    <div className="mt-3 h-1.5 bg-slate-700/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max((category.count / Math.max(...categoryStats.map(c => c.count))) * 100, 6)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #6A89A7, #88BDF2, #BDDDFC)' }}
                      />
                    </div>
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#88BDF2] opacity-0 group-hover:opacity-50"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.15, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* === Transition === */}
        <SectionFade fromColor={DEPTH.deep} toColor={DEPTH.abyss} />

        {/* ===== PROJECT — Abyss ===== */}
        <ParallaxSection bgColor={DEPTH.abyss} depth="abyss">
          <div className="py-20 px-6 relative">
            {/* Bioluminescent particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`abyss-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 1.5 + Math.random() * 3,
                  height: 1.5 + Math.random() * 3,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(136,189,242,${0.04 + Math.random() * 0.06})`,
                  boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(136,189,242,${0.03 + Math.random() * 0.04})`,
                }}
                animate={{
                  y: [0, -(5 + Math.random() * 10), 0],
                  opacity: [0.05, 0.25, 0.05],
                }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
              />
            ))}

            {/* Searchlight sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 35% 45% at 50% 50%, rgba(136,189,242,0.015) 0%, transparent 70%)' }}
              animate={{
                background: [
                  'radial-gradient(ellipse 35% 45% at 38% 42%, rgba(136,189,242,0.015) 0%, transparent 70%)',
                  'radial-gradient(ellipse 35% 45% at 62% 58%, rgba(136,189,242,0.015) 0%, transparent 70%)',
                  'radial-gradient(ellipse 35% 45% at 38% 42%, rgba(136,189,242,0.015) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />

            <div className="max-w-2xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center gap-3 mb-8"
              >
                <h2 className="text-2xl font-bold text-slate-200/80">My Project</h2>
                <motion.span animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>🧭</motion.span>
                <motion.span
                  className="text-xs text-slate-600/40 italic"
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  treasure found!
                </motion.span>
              </motion.div>

              {/* Project card with dramatic reveal */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  borderColor: 'rgba(136,189,242,0.4)',
                  boxShadow: '0 0 60px rgba(136,189,242,0.06)',
                }}
                className="relative p-8 border rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(56,73,89,0.35) 0%, rgba(36,61,80,0.25) 100%)',
                  borderColor: 'rgba(106,137,167,0.15)',
                }}
              >
                {/* Sparkles */}
                {[
                  { left: '85%', top: '15%', delay: 0 },
                  { left: '92%', top: '65%', delay: 1.5 },
                  { left: '8%', top: '80%', delay: 3 },
                  { left: '15%', top: '10%', delay: 4.5 },
                ].map((pos, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-[10px] text-[#BDDDFC]/25"
                    style={{ left: pos.left, top: pos.top }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5], rotate: [0, 180] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay }}
                  >
                    ✦
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <Award className="w-4 h-4 text-[#88BDF2]/70" />
                  <motion.span
                    className="text-xs text-[#88BDF2]/60 tracking-wide"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {project.badge}
                  </motion.span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-100/90 mb-2"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-slate-400/60 mb-5 leading-relaxed"
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1.5 text-xs text-[#BDDDFC]/70 rounded-full border"
                      style={{ background: 'rgba(106,137,167,0.08)', borderColor: 'rgba(106,137,167,0.12)' }}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(136,189,242,0.3)' }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* === Final Transition === */}
        <SectionFade fromColor={DEPTH.abyss} toColor={DEPTH.trench} />

        <OceanFloor />
      </div>
    </>
  );
}

function AnimatedQuote({ show, text }: { show: boolean; text: string }) {
  return (
    <motion.div
      className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-xs whitespace-nowrap pointer-events-none z-20"
      style={{ backgroundColor: 'rgba(189,221,252,0.9)', color: '#384959' }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? -12 : 0, scale: show ? 1 : 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {text}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ backgroundColor: 'rgba(189,221,252,0.9)' }} />
    </motion.div>
  );
}
