import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';
import { DiveIntro } from '../components/DiveIntro';
import { OceanFloor } from '../components/OceanFloor';
import { SwimmingWhales } from '../components/SwimmingWhales';
import { OceanWaves, HeroWaves } from '../components/OceanWaves';

/* ── data ── */
const timeline = [
  {
    date: '2021 — Present',
    name: '상명대학교',
    role: '정보보안공학과 · Undergraduate',
    desc: '정보보안공학 학부 재학. 시스템 보안, 네트워크 보안, 암호학 심화 학습 중.',
  },
  {
    date: 'Jun 2025 — Feb 2026',
    name: 'BoB (Best of the Best)',
    role: 'Program Graduate',
    desc: '실전 보안 훈련 프로그램 수료. 취약점 분석, 침투 테스트, OT 보안 집중 훈련.',
  },
  {
    date: 'Jan 2026 — Feb 2026',
    name: '학부 연구 인턴',
    role: 'Research Student',
    desc: 'AI 가드레일 및 LLM jailbreak 기법 연구. 보안 취약점 분석 및 대응 방안 도출.',
  },
];

const projects = [
  {
    idx: '001',
    name: 'SLM-based OT Solution',
    desc: 'SLM 기반 OT 보안 솔루션. 실전 방어와 응용 보안 아키텍처에 집중한 Best of the Best 수상 프로젝트.',
    tags: ['Security', 'OT', 'SLM', 'BoB'],
  },
  {
    idx: '002',
    name: 'AI Guardrail 우회 연구',
    desc: 'LLM 보안의 AI 가드레일을 우회하는 jailbreak 기법 분석 및 대응 방안 연구.',
    tags: ['AI', 'LLM', 'Research'],
  },
  {
    idx: '003',
    name: 'Personal Blog — DeepSea',
    desc: '심해와 고래 테마의 개인 개발 블로그. React + Motion 기반 몰입형 UX.',
    tags: ['React', 'TypeScript', 'Motion'],
  },
];

const posts = [
  { date: '2026.04.10', cat: 'Development',       title: 'AI Guardrail 우회 기법 연구',   excerpt: 'LLM 보안 Guardrail을 우회하는 jailbreak 기법 분석.', time: '5 min' },
  { date: '2026.04.05', cat: 'Technical Document', title: 'OT 보안의 이해',               excerpt: 'OT 환경 보안 위협과 대응 방안 정리.',           time: '8 min' },
  { date: '2026.03.28', cat: 'Development',        title: 'SLM 기반 보안 아키텍처',       excerpt: '소형 언어 모델 기반 실시간 보안 모니터링.',      time: '6 min' },
  { date: '2026.03.20', cat: 'Paper',              title: 'BoB 프로그램 회고',            excerpt: 'Best of the Best 수료 후기 및 배운 것들.',      time: '10 min' },
  { date: '2026.03.15', cat: 'CTF',               title: 'Pwnable.kr Writeup',           excerpt: '고난이도 문제 상세 풀이 정리.',                 time: '7 min' },
];

/* ── reusable reveal wrapper ── */
function Reveal({ children, delay = 0, x = 0 }: { children: React.ReactNode; delay?: number; x?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── section heading ── */
function SectionHead({ num, title, italic }: { num: string; title: string; italic: string }) {
  return (
    <div className="mb-14">
      <p className="text-[9px] tracking-[0.48em] text-[#c4ddf0]/22 mb-3">{num}</p>
      <h2
        className="leading-none tracking-tight text-[#c4ddf0]"
        style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(34px, 5vw, 58px)', letterSpacing: '-0.03em', fontWeight: 700 }}
      >
        {title} <em className="text-[#5ba3cc] not-italic">{italic}</em>
      </h2>
    </div>
  );
}

const DEPTH = {
  sandTop:  '#e6d5b8',
  sandBot:  '#cba276',
  surface:  '#0273a5', // Surface water, starts at bottom of waves
  shallow:  '#01476d', // Career - darker than before
  mid:      '#002238', // Projects
  deep:     '#000b14', // Posts
  abyss:    '#000000',
};

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <DiveIntro />

      <div className="min-h-screen overflow-x-hidden" style={{ background: `linear-gradient(180deg, ${DEPTH.sandTop} 0%, ${DEPTH.sandBot} 100%)` }}>
        <SwimmingWhales />

        {/* ══ HERO ══ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-transparent"
        >
          {/* Animated Hero Waves */}
          {/* We remove HeroWaves because Hero is now sand. Instead we just have OceanWaves at the bottom */}

          {/* SVG Parallax Wave layers (Bottom) - crashing onto the sand */}
          <OceanWaves />

          {/* vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 75% 85% at 50% 50%,transparent 25%,rgba(203,162,118,0.3) 100%)' }}
          />

          {/* name content — flush to bottom */}
          <motion.div
            className="relative z-20 px-11 pb-14"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.p
              className="text-[9px] tracking-[0.42em] mb-4 font-bold"
              style={{ color: '#013a5a' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Security Researcher · Developer
            </motion.p>

            <motion.h1
              className="leading-[.9] tracking-tight text-[#012238] mb-5"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(60px, 11vw, 120px)',
                letterSpacing: '-0.04em',
                fontWeight: 800,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              <em className="not-italic" style={{ color: '#0273a5' }}>이상호</em>
            </motion.h1>

            <motion.p
              className="text-[10px] tracking-[0.3em] mb-10 font-bold"
              style={{ color: '#01476d' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              정보보안 · 풀스택 개발 · 심해 탐험가
            </motion.p>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { href: 'https://github.com',     icon: Github,   label: 'GitHub'   },
                { href: 'https://linkedin.com',   icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:you@example.com', icon: Mail,     label: 'Email'    },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[9px] tracking-[0.22em] border px-4 py-2.5 transition-all duration-300 uppercase font-bold"
                  style={{
                    color: '#013a5a',
                    borderColor: 'rgba(1, 58, 90, 0.2)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.borderColor = '#0273a5';
                    (e.currentTarget as HTMLElement).style.background = '#0273a5';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#013a5a';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(1, 58, 90, 0.2)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            className="absolute bottom-7 right-11 flex flex-col items-center gap-2 z-20"
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <span className="text-[8px] tracking-[0.4em] font-bold" style={{ color: 'rgba(1,58,90,0.4)' }}>scroll</span>
            <motion.div
              className="w-px h-11"
              style={{ background: 'linear-gradient(transparent, rgba(1,58,90,0.6))' }}
              animate={{ scaleY: [1, 0.55, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        </section>

        {/* ══ CONTENT SECTIONS WITH CONTINUOUS GRADIENT ══ */}
        <div 
          className="relative" 
          style={{ 
            background: `linear-gradient(180deg, ${DEPTH.surface} 0%, ${DEPTH.shallow} 30%, ${DEPTH.mid} 65%, ${DEPTH.deep} 100%)` 
          }}
        >
          {/* ══ CAREER ══ */}
          <section>
            <div className="max-w-[940px] mx-auto px-11 py-20 pb-32">
              <SectionHead num="01 — Career" title="My" italic="Career" />
              <div className="flex flex-col">
                {timeline.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1} x={-16}>
                    <div
                      className="grid gap-6 py-8"
                      style={{
                        gridTemplateColumns: '128px 1fr',
                        borderTop: '1px solid rgba(196,221,240,0.04)',
                      }}
                    >
                      <p className="text-[9px] leading-loose tracking-[0.12em]" style={{ color: 'rgba(196,221,240,0.35)', paddingTop: 3 }}>
                        {item.date}
                      </p>
                      <div>
                        <p className="text-[19px] text-[#dceaf7] mb-1" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{item.name}</p>
                        <p className="text-[9px] tracking-[0.2em] mb-2.5" style={{ color: '#7cc4f0' }}>{item.role}</p>
                        <p className="text-[11px] leading-loose" style={{ color: 'rgba(196,221,240,0.5)' }}>{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ══ PROJECTS ══ */}
          <section>
            <div className="max-w-[940px] mx-auto px-11 py-20 pb-32">
              <SectionHead num="02 — Projects" title="My" italic="Project" />
              {/* card grid separated by 1px lines */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1px',
                  background: 'rgba(196,221,240,0.03)',
                }}
              >
                {projects.map((p, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-pointer relative overflow-hidden"
                    style={{ background: 'rgba(7, 15, 26, 0.6)', padding: '32px 28px' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ background: 'rgba(7, 15, 26, 0.9)' }}
                  >
                    {/* bottom glow line on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, #5ba3cc, transparent)', scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <p className="text-[8px] tracking-[0.3em] mb-3.5" style={{ color: 'rgba(196,221,240,0.18)' }}>{p.idx}</p>
                    <motion.p
                      className="text-[19px] text-[#c4ddf0] mb-3 leading-snug"
                      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                      whileHover={{ color: '#5ba3cc' }}
                      transition={{ duration: 0.25 }}
                    >
                      {p.name}
                    </motion.p>
                    <p className="text-[11px] leading-loose mb-4.5" style={{ color: 'rgba(196,221,240,0.32)' }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[8px] tracking-[0.16em] border px-2.5 py-0.5"
                          style={{ color: 'rgba(196,221,240,0.25)', borderColor: 'rgba(196,221,240,0.1)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ BLOG ══ */}
          <section>
            <div className="max-w-[940px] mx-auto px-11 py-20 pb-32">
              <SectionHead num="03 — Blog" title="Recent" italic="Posts" />
              <div className="flex flex-col">
                {posts.map((post, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <motion.div
                      className="grid py-6 cursor-pointer group"
                      style={{
                        gridTemplateColumns: '94px 1fr 60px',
                        gap: '20px',
                        borderTop: '1px solid rgba(196,221,240,0.04)',
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-[9px] tracking-[0.1em] leading-loose pt-0.5" style={{ color: 'rgba(196,221,240,0.2)' }}>
                        {post.date}
                      </p>
                      <div>
                        <p className="text-[8px] tracking-[0.24em] mb-1.5" style={{ color: '#5ba3cc' }}>{post.cat}</p>
                        <motion.p
                          className="text-[15px] text-[#c4ddf0] mb-1 leading-snug"
                          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                          whileHover={{ color: '#5ba3cc' }}
                          transition={{ duration: 0.22 }}
                        >
                          {post.title}
                        </motion.p>
                        <p className="text-[10px] leading-loose" style={{ color: 'rgba(196,221,240,0.28)' }}>{post.excerpt}</p>
                      </div>
                      <p className="text-[9px] text-right pt-0.5" style={{ color: 'rgba(196,221,240,0.16)' }}>{post.time}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </div>

        <OceanFloor />
      </div>
    </>
  );
}