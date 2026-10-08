import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  onBookTestDrive: () => void;
}

const navLinks = [
  { label: 'Modellar', href: '#catalog' },
  { label: 'Kalkulyator', href: '#calculator' },
  { label: 'Masofa', href: '#range' },
  { label: 'Kontaktlar', href: '#contact' },
];

export default function Navbar({ onBookTestDrive }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-950/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-300 to-neon-600 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)] transition-all duration-300">
              <Zap className="w-5 h-5 text-obsidian-950" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg text-white tracking-tight">BYD</span>
            <span className="text-[10px] text-silver-400 font-medium tracking-widest uppercase">O'zbekiston</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-silver-300 hover:text-white transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-neon-400 group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </div>


        <button
          className="md:hidden text-silver-200 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-obsidian-950/95 backdrop-blur-xl border-b border-white/10 animate-fade-in">
          <div className="flex flex-col p-5 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-silver-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
