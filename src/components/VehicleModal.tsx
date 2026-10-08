import { useState, useEffect } from 'react';
import { X, Battery, Gauge, Zap, Timer, Car, Wind, Users, Check, ImageIcon } from 'lucide-react';
import { type Vehicle, formatUSD, formatUZS } from '@/data/vehicles';
import SpinViewer from '@/components/SpinViewer';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
}

export default function VehicleModal({ vehicle, onClose, onBookTestDrive }: VehicleModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTier, setActiveTier] = useState(0);
  const [viewMode, setViewMode] = useState<'spin' | 'gallery'>('spin');

  useEffect(() => {
    if (vehicle) {
      setActiveImage(0);
      setActiveTier(0);
      setViewMode('spin');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [vehicle]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!vehicle) return null;

  const specItems = [
    { icon: Battery, label: 'Batareya hajmi', value: vehicle.specs.batteryCapacity },
    { icon: Zap, label: 'Ot kuchi', value: vehicle.specs.horsepower },
    { icon: Gauge, label: '0→100 km/soat', value: vehicle.specs.acceleration },
    { icon: Wind, label: 'Yurish masofasi', value: vehicle.specs.range },
    { icon: Timer, label: 'Quvvatlash', value: vehicle.specs.chargingSpeed },
    { icon: Car, label: 'Avtomobil turi', value: vehicle.specs.drivetrain },
    { icon: Gauge, label: 'Maks. tezlik', value: vehicle.specs.topSpeed },
    { icon: Users, label: 'O\'rinlar', value: vehicle.specs.seating },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl max-h-[100dvh] md:max-h-[90vh] overflow-y-auto bg-obsidian-900/95 backdrop-blur-2xl border border-white/10 md:rounded-2xl animate-scale-in custom-scroll">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-silver-200 hover:text-white hover:border-neon-400/40 transition-all duration-300"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Spin viewer */}
        <div className="relative md:rounded-t-2xl overflow-hidden">
          {viewMode === 'spin' ? (
            <div className="relative md:rounded-t-2xl overflow-hidden">
              <SpinViewer images={vehicle.gallery} alt={vehicle.name} />
              {/* Badge */}
              {vehicle.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-neon-400/90 text-obsidian-950 text-sm font-bold backdrop-blur-sm z-10">
                  {vehicle.badge}
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[16/9] md:aspect-[16/8] overflow-hidden md:rounded-t-2xl">
              <img
                src={vehicle.gallery[activeImage]}
                alt={vehicle.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent" />

              {/* Badge */}
              {vehicle.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-neon-400/90 text-obsidian-950 text-sm font-bold backdrop-blur-sm">
                  {vehicle.badge}
                </div>
              )}

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {vehicle.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      i === activeImage ? 'border-neon-400 opacity-100' : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* View mode toggle */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 rounded-xl glass">
            <button
              onClick={() => setViewMode('spin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                viewMode === 'spin' ? 'bg-neon-400/20 text-neon-300' : 'text-silver-400 hover:text-white'
              }`}
            >
              360°
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                viewMode === 'gallery' ? 'bg-neon-400/20 text-neon-300' : 'text-silver-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md glass text-xs font-medium text-neon-300">{vehicle.category}</span>
              <span className="px-2.5 py-1 rounded-md glass text-xs font-medium text-silver-300">{vehicle.bodyType}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{vehicle.name}</h2>
            <p className="text-lg text-silver-300 mb-4">{vehicle.tagline}</p>
            <p className="text-sm text-silver-400 leading-relaxed max-w-3xl">{vehicle.description}</p>
          </div>

          {/* Specs grid */}
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Texnik ko'rsatkichlar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {specItems.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="glass-card p-4">
                    <Icon className="w-5 h-5 text-neon-400/70 mb-2" strokeWidth={1.5} />
                    <p className="text-[10px] text-silver-500 uppercase tracking-wide mb-1">{spec.label}</p>
                    <p className="text-sm font-medium text-white">{spec.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Narx variantlari</h3>

            {/* Tier tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {vehicle.pricing.map((tier, i) => (
                <button
                  key={tier.name}
                  onClick={() => setActiveTier(i)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    i === activeTier
                      ? 'bg-gradient-to-r from-neon-400 to-neon-500 text-obsidian-950 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]'
                      : 'glass text-silver-300 hover:text-white hover:border-neon-400/30'
                  }`}
                >
                  {tier.name}
                </button>
              ))}
            </div>

            {/* Active tier details */}
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm text-silver-400 mb-1">{vehicle.pricing[activeTier].name} versiyasi</p>
                  <p className="font-display text-3xl font-bold neon-text">{formatUSD(vehicle.pricing[activeTier].usd)}</p>
                  <p className="text-sm text-silver-500 mt-1">{formatUZS(vehicle.pricing[activeTier].usd)}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {vehicle.pricing[activeTier].features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-neon-400/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neon-300" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-silver-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onClose} className="btn-ghost flex-1">
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
