import { useState, useMemo } from 'react';
import { Gauge, Battery, Zap, Timer, ArrowRight } from 'lucide-react';
import { vehicles, categoryFilters, bodyTypeFilters, formatUSD, type Vehicle, type VehicleCategory, type VehicleBodyType } from '@/data/vehicles';
import Reveal from '@/components/Reveal';
import { useTilt } from '@/components/Reveal';

interface CatalogProps {
  onSelectVehicle: (v: Vehicle) => void;
}

export default function Catalog({ onSelectVehicle }: CatalogProps) {
  const [category, setCategory] = useState<'all' | VehicleCategory>('all');
  const [bodyType, setBodyType] = useState<'all' | VehicleBodyType>('all');

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (category !== 'all' && v.category !== category) return false;
      if (bodyType !== 'all' && v.bodyType !== bodyType) return false;
      return true;
    });
  }, [category, bodyType]);

  return (
    <section id="catalog" className="relative py-20 md:py-28">
      <div className="absolute inset-0 grid-bg radial-fade opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <span className="text-xs font-medium text-neon-300 tracking-wider uppercase">Modellar katalogi</span>
          </div>
          <h2 className="section-title text-white mb-4">
            O'zingizga mos <span className="neon-text">BYD</span> ni toping
          </h2>
          <p className="text-silver-400 max-w-2xl mx-auto">
            Elektro va gibrid modellarning to'liq assortimenti. Filtrlash orqali istalgan avtomobilni batafsil ko'rib chiqing.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setCategory(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  category === f.id
                    ? 'bg-gradient-to-r from-neon-400 to-neon-500 text-obsidian-950 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]'
                    : 'glass text-silver-300 hover:text-white hover:border-neon-400/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {bodyTypeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setBodyType(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  bodyType === f.id
                    ? 'bg-white/10 text-white border border-neon-400/40'
                    : 'glass text-silver-400 hover:text-silver-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <VehicleCard vehicle={v} onSelect={() => onSelectVehicle(v)} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-silver-400">Tanlangan filtrlar bo'yicha modellar topilmadi.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function VehicleCard({ vehicle, onSelect }: { vehicle: Vehicle; onSelect: () => void }) {
  const { ref, handleMove, handleLeave } = useTilt<HTMLDivElement>(8);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="glass-card glass-card-hover overflow-hidden cursor-pointer group preserve-3d transition-transform duration-300 ease-out"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
        {vehicle.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neon-400/90 text-obsidian-950 text-xs font-bold backdrop-blur-sm">
            {vehicle.badge}
          </div>
        )}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md glass text-xs font-medium text-silver-200">
          {vehicle.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display text-xl font-bold text-white">{vehicle.name}</h3>
        </div>
        <p className="text-sm text-silver-400 mb-5">{vehicle.tagline}</p>

        {/* Mini specs */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <MiniSpec icon={Gauge} label="Tezlanish" value={vehicle.specs.acceleration} />
          <MiniSpec icon={Battery} label="Masofa" value={vehicle.specs.range.split(' ')[0]} />
          <MiniSpec icon={Zap} label="Quvvat" value={vehicle.specs.horsepower.split(' ')[0] + ' ot k.'} />
          <MiniSpec icon={Timer} label="Quvvatlash" value={vehicle.specs.chargingSpeed.split(' ')[0] + ' daq.'} />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-silver-500">Dan</p>
            <p className="font-display text-lg font-bold neon-text">{formatUSD(vehicle.pricing[0].usd)}</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-neon-300 group-hover:gap-2.5 transition-all duration-300">
            Batafsil
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniSpec({ icon: Icon, label, value }: { icon: typeof Gauge; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-neon-400/70 flex-shrink-0" strokeWidth={1.5} />
      <div className="min-w-0">
        <p className="text-[10px] text-silver-500 uppercase tracking-wide">{label}</p>
        <p className="text-xs text-silver-200 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
