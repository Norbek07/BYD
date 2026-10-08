import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { vehicles, type Vehicle } from '@/data/vehicles';

interface HeroProps {
  onSelectVehicle: (v: Vehicle) => void;
}

export default function Hero({ onSelectVehicle }: HeroProps) {
  const heroVehicles = vehicles.slice(0, 5);
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(idx);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((active + 1) % heroVehicles.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + heroVehicles.length) % heroVehicles.length), [active, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const current = heroVehicles[active];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const scrolled = window.scrollY;
      const opacity = Math.max(1 - scrolled / 600, 0);
      el.style.setProperty('--hero-opacity', String(opacity));
      el.style.setProperty('--hero-translate', `${scrolled * 0.3}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ opacity: 'var(--hero-opacity, 1)' }}>
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-700/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Background image with crossfade + parallax */}
      <div className="absolute inset-0" style={{ transform: 'translateY(var(--hero-translate, 0))' }}>
        {heroVehicles.map((v, i) => (
          <div
            key={v.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === active ? 'opacity-40 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={v.image}
              alt={v.name}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          <div
            key={current.id}
            className="animate-fade-up"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
              <span className="text-xs font-medium text-neon-300 tracking-wider uppercase">
                {current.badge ?? 'Flagship'} · {current.category}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-[0.95]">
              {current.name}
            </h1>
            <p className="text-lg md:text-xl text-silver-300 mb-2 font-medium">
              {current.tagline}
            </p>
            <p className="text-sm md:text-base text-silver-400 mb-8 max-w-lg leading-relaxed">
              {current.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button onClick={() => onSelectVehicle(current)} className="btn-primary">
                Batafsil ko'rish
              </button>
              <a href="#catalog" className="btn-ghost">
                Barcha modellar
              </a>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-3 gap-4 max-w-lg perspective-1000">
              <div className="glass-card p-4 transition-transform duration-500 hover:rotateY-[-8deg] hover:scale-105 preserve-3d">
                <p className="text-xs text-silver-400 mb-1">Yurish masofasi</p>
                <p className="font-display text-lg font-bold text-white">{current.specs.range.split(' ')[0]}</p>
                <p className="text-[10px] text-silver-500">{current.specs.range.split(' ').slice(1).join(' ')}</p>
              </div>
              <div className="glass-card p-4 transition-transform duration-500 hover:rotateY-[-8deg] hover:scale-105 preserve-3d">
                <p className="text-xs text-silver-400 mb-1">Tezlanish</p>
                <p className="font-display text-lg font-bold text-white">{current.specs.acceleration.split(' ')[0]}</p>
                <p className="text-[10px] text-silver-500">0→100 km/soat</p>
              </div>
              <div className="glass-card p-4 transition-transform duration-500 hover:rotateY-[-8deg] hover:scale-105 preserve-3d">
                <p className="text-xs text-silver-400 mb-1">Quvvat</p>
                <p className="font-display text-lg font-bold text-white">{current.specs.horsepower.split(' ')[0]}</p>
                <p className="text-[10px] text-silver-500">ot kuchi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-silver-200 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300"
          aria-label="Oldingi"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {heroVehicles.map((v, i) => (
            <button
              key={v.id}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-neon-400' : 'w-2 bg-silver-600 hover:bg-silver-400'
              }`}
              aria-label={v.name}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-silver-200 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300"
          aria-label="Keyingi"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-silver-500 animate-float">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center mb-8">Aylantiring</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
