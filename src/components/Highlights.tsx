import { Battery, Zap, Leaf } from 'lucide-react';
import Reveal from '@/components/Reveal';

const highlights = [
  {
    icon: Battery,
    title: 'Uzoq yurish masofasi',
    description: '715 km gacha CLTC yurish masofasi',
    stat: '715 km',
  },
  {
    icon: Zap,
    title: 'Tez quvvatlash',
    description: '25 daqiqada 10% dan 80% gacha',
    stat: '25 daq.',
  },
  {
    icon: Leaf,
    title: 'Nol chiqindilar',
    description: 'Toza energiya, ekologik kelajak',
    stat: '0 CO₂',
  },
];

export default function Highlights() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 grid-bg radial-fade opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.title} delay={i * 100}>
              <div
                className="glass-card glass-card-hover p-8 group h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-400/20 to-neon-600/10 border border-neon-400/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-7 h-7 text-neon-300" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-3xl font-bold neon-text">{h.stat}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{h.title}</h3>
                <p className="text-sm text-silver-400 leading-relaxed">{h.description}</p>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
