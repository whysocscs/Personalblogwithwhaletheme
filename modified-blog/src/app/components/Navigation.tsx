import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#384959]/70 backdrop-blur-lg border-b border-[#88BDF2]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              animate={{
                y: [0, 0, 0, -8, 0, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                rotate: [0, 0, 0, -15, 10, -5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <span className="text-2xl">🐋</span>
              {/* Tiny bubble */}
              <motion.div
                className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#BDDDFC]/30"
                animate={{ y: [0, -8], opacity: [0.5, 0], scale: [0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
            <span className="text-xl font-bold text-[#BDDDFC] tracking-tight">
              Dev<span className="text-[#88BDF2]">Whale</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-slate-300 hover:text-[#BDDDFC] transition-colors"
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#88BDF2]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-[#BDDDFC]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg ${
                  location.pathname === item.path
                    ? 'text-[#BDDDFC]'
                    : 'text-slate-300 hover:text-[#BDDDFC]'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}