import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Search, X } from 'lucide-react';
import { SwimmingWhales } from '../components/SwimmingWhales';
import { OceanFloor } from '../components/OceanFloor';
import { useState, useMemo } from 'react';

const categoryCreatures: Record<string, { emoji: string; animDelay: number }> = {
  All: { emoji: '🐋', animDelay: 0 },
  Development: { emoji: '🐙', animDelay: 0.2 },
  'CTF-Wargame': { emoji: '🦈', animDelay: 0.4 },
  BugBounty: { emoji: '🦀', animDelay: 0.6 },
  'Technical Document': { emoji: '🐢', animDelay: 0.8 },
  'Paper-Conference': { emoji: '🐬', animDelay: 1.0 },
  'Contest-Certification': { emoji: '🏅', animDelay: 1.2 },
  Etc: { emoji: '🐚', animDelay: 1.4 },
};

const postCreatures: Record<string, string> = {
  Development: '🐙',
  'CTF-Wargame': '🦈',
  BugBounty: '🦀',
  'Technical Document': '🐢',
  'Paper-Conference': '🐬',
  'Contest-Certification': '🏅',
};

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { name: 'All Posts', slug: 'All' },
    { name: 'Development', slug: 'Development', subcategories: ['React', 'TypeScript', 'Node.js', 'Python'] },
    { name: 'CTF-Wargame', slug: 'CTF-Wargame', subcategories: ['Pwnable', 'Web', 'Reversing', 'Crypto'] },
    { name: 'BugBounty', slug: 'BugBounty', subcategories: ['XSS', 'SQLI', 'IDOR', 'SSRF'] },
    { name: 'Technical Document', slug: 'Technical Document', subcategories: ['Architecture', 'Security', 'DevOps', 'Database'] },
    { name: 'Paper-Conference', slug: 'Paper-Conference', subcategories: ['Security', 'AI/ML', 'Networks', 'Systems'] },
    { name: 'Contest-Certification', slug: 'Contest-Certification', subcategories: ['CTF', 'Hackathon', 'Certification', 'Awards'] },
    { name: 'Etc', slug: 'Etc', subcategories: ['Life', 'Review', 'Thoughts', 'Misc'] },
  ];

  const posts = [
    { id: 1, title: 'AI Guardrail 우회 기법 연구', excerpt: 'LLM 보안에서 AI Guardrail을 우회하는 다양한 jailbreak 기법들을 분석합니다.', date: '2026-04-10', readTime: '5 min', category: 'Development' },
    { id: 2, title: 'OT 보안의 이해', excerpt: 'OT(Operational Technology) 환경에서의 보안 위협과 대응 방안을 알아봅니다.', date: '2026-04-05', readTime: '8 min', category: 'Technical Document' },
    { id: 3, title: 'SLM 기반 보안 아키텍처', excerpt: 'Small Language Model을 활용한 실시간 보안 모니터링 시스템 구축 경험을 공유합니다.', date: '2026-03-28', readTime: '6 min', category: 'Development' },
    { id: 4, title: 'BoB 프로그램 회고', excerpt: 'Best of the Best 프로그램에서 배운 실전 보안 기술과 프로젝트 경험을 정리합니다.', date: '2026-03-20', readTime: '10 min', category: 'Paper-Conference' },
    { id: 5, title: 'Pwnable.kr Writeup', excerpt: 'Pwnable.kr의 난이도 높은 문제들에 대한 상세한 풀이를 공유합니다.', date: '2026-03-15', readTime: '7 min', category: 'CTF-Wargame' },
    { id: 6, title: '정보보호 컨퍼런스 참석 후기', excerpt: '최신 보안 트렌드와 연구 동향을 파악한 컨퍼런스 참석 경험을 나눕니다.', date: '2026-03-08', readTime: '5 min', category: 'Contest-Certification' },
  ];

  const filteredPosts = useMemo(() => {
    let result = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d5f78] via-[#304d63] to-[#243d50] relative">
      <SwimmingWhales />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1698334846753-cc817a5277be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3aGFsZSUyMG9jZWFuJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NzU5OTg4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Ocean"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#BDDDFC] to-[#88BDF2] bg-clip-text text-transparent"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 mb-8"
          >
            개발하며 배운 것들을 기록합니다
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto relative"
          >
            <motion.div
              className="relative flex items-center"
              animate={isSearchFocused ? {
                boxShadow: '0 0 30px rgba(136,189,242,0.15)',
              } : {
                boxShadow: '0 0 0px rgba(136,189,242,0)',
              }}
              style={{ borderRadius: 16 }}
            >
              <Search className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="바다 속에서 글 찾기... 🔍"
                className="w-full pl-11 pr-10 py-3.5 bg-[#2d3d4d]/80 backdrop-blur-sm border border-[#6A89A7]/25 rounded-2xl text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-[#88BDF2]/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
            {/* Search bubbles decoration */}
            {isSearchFocused && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#BDDDFC]/10 border border-[#BDDDFC]/15"
                    style={{
                      width: 4 + i * 3,
                      height: 4 + i * 3,
                      right: `${-10 + i * 8}%`,
                      bottom: `${80 + i * 10}%`,
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: -30 - i * 10 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories and Posts */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-72 flex-shrink-0"
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-slate-100">BLOG MENU</h2>
                  <motion.span
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-sm"
                  >
                    🫧
                  </motion.span>
                </div>
                <div className="space-y-1.5">
                  {categories.map((category, index) => {
                    const creature = categoryCreatures[category.slug];
                    const isSelected = selectedCategory === category.slug;
                    return (
                      <div key={category.slug}>
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedCategory(category.slug)}
                          whileHover={{ x: 4 }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'bg-[#88BDF2]/20 text-[#BDDDFC] border border-[#88BDF2]/40'
                              : 'text-slate-400 hover:text-[#BDDDFC] hover:bg-[#384959]/30 border border-transparent'
                          }`}
                        >
                          <span>{category.name}</span>
                          {creature && (
                            <motion.span
                              className={`text-sm transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                              animate={isSelected ? { y: [-2, 2, -2], rotate: [-5, 5, -5] } : {}}
                              transition={{ duration: 2, repeat: Infinity, delay: creature.animDelay }}
                            >
                              {creature.emoji}
                            </motion.span>
                          )}
                        </motion.button>

                        {category.subcategories && isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                          >
                            {category.subcategories.map((sub, subIdx) => (
                              <motion.button
                                key={sub}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIdx * 0.05 }}
                                className="block w-full text-left px-3 py-2 text-sm text-slate-500 hover:text-[#88BDF2] transition-colors rounded hover:bg-[#88BDF2]/5"
                              >
                                <span className="mr-1.5 text-[10px] opacity-40">~</span>
                                {sub}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Decorative bottom */}
                <div className="mt-8 flex justify-center gap-3 opacity-20">
                  {['🌿', '🪸', '🌊'].map((plant, i) => (
                    <motion.span
                      key={i}
                      className="text-lg"
                      animate={{ rotate: [-5, 5, -5], y: [-2, 2, -2] }}
                      transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {plant}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Posts */}
            <div className="flex-1">
              <motion.div className="mb-6 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-sm text-slate-500">
                  {searchQuery
                    ? `"${searchQuery}" 검색 결과: ${filteredPosts.length}개`
                    : `${filteredPosts.length}개의 글이 바다 속에 있어요`
                  }
                </span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, boxShadow: '0 16px 60px rgba(136,189,242,0.1)' }}
                    className="group relative p-6 bg-[#384959]/30 backdrop-blur-sm border border-[#88BDF2]/20 rounded-3xl hover:border-[#88BDF2]/40 hover:shadow-xl hover:shadow-[#88BDF2]/10 transition-all cursor-pointer overflow-hidden"
                  >
                    {/* Floating creature */}
                    <motion.span
                      className="absolute top-4 right-4 text-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {postCreatures[post.category] || '🐟'}
                    </motion.span>

                    {/* Hover bubbles */}
                    <motion.div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#BDDDFC]/5 border border-[#BDDDFC]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-[#BDDDFC]/5 border border-[#BDDDFC]/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />

                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block px-3 py-1 text-xs bg-[#88BDF2]/10 text-[#BDDDFC] border border-[#88BDF2]/30 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-[#BDDDFC] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#88BDF2] group-hover:gap-4 transition-all text-sm font-medium">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Empty state */}
              {filteredPosts.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <motion.span
                    className="text-4xl block mb-4"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🐡
                  </motion.span>
                  <p className="text-slate-500">
                    {searchQuery ? `"${searchQuery}"에 해당하는 글을 찾지 못했어요...` : '아직 이 바다에는 글이 없어요...'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-sm text-[#88BDF2] hover:text-[#BDDDFC] transition-colors"
                    >
                      검색어 지우기
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <OceanFloor />
    </div>
  );
}