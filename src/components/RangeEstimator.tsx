import { useState, useMemo } from 'react';
import { BatteryCharging, Route, Gauge, Wind, Mountain, Building2 } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import Reveal from '@/components/Reveal';

type DriveMode = 'city' | 'highway' | 'mixed';

const driveModes: { id: DriveMode; label: string; icon: typeof Building2; multiplier: number; desc: string }[] = [
  { id: 'city', label: 'Shahar', icon: Building2, multiplier: 1.15, desc: 'Tez-tez to\'xtash, past tezlik' },
  { id: 'mixed', label: 'Aralash', icon: Wind, multiplier: 1.0, desc: 'Shahar + shosse' },
  { id: 'highway', label: 'Shosse', icon: Mountain, multiplier: 0.75, desc: 'Yuqori tezlik, uzluksiz' },
];

function parseRange(rangeStr: string): number {
  const match = rangeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function RangeEstimator() {
  const [batteryPct, setBatteryPct] = useState(80);
  const [driveMode, setDriveMode] = useState<DriveMode>('mixed');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0].id);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) ?? vehicles[0];

  const estimatedRange = useMemo(() => {
    const baseRange = parseRange(selectedVehicle.specs.range);
    const mode = driveModes.find((m) => m.id === driveMode)!;
    const adjusted = baseRange * mode.multiplier;
    return Math.round((adjusted * batteryPct) / 100);
  }, [selectedVehicle, driveMode, batteryPct]);

  const batteryColor = batteryPct > 50 ? 'from-neon-400 to-neon-500' : batteryPct > 20 ? 'from-yellow-400 to-orange-400' : 'from-orange-500 to-red-500';

  return (
    <section id="range" className="relative py-20 md:py-28">
      <div className="absolute inset-0 grid-bg radial-fade opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Route className="w-3.5 h-3.5 text-neon-300" />
            <span className="text-xs font-medium text-neon-300 tracking-wider uppercase">Masofa hisoblagich</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Qancha <span className="neon-text">yura olasiz</span>?
          </h2>
          <p className="text-silver-400 max-w-2xl mx-auto">
            Batareya foizi va yurish sharoitini tanlang — qancha masofa yurish mumkinligini bilib oling.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Controls */}
          <Reveal animation="slide-in" className="lg:col-span-3">
          <div className="glass-card p-8">
            {/* Vehicle selector */}
            <div className="mb-8">
              <label className="text-sm font-medium text-silver-200 mb-3 block">Avtomobilni tanlang</label>
              <div className="flex flex-wrap gap-2">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      v.id === selectedVehicleId
                        ? 'bg-gradient-to-r from-neon-400 to-neon-500 text-obsidian-950'
                        : 'glass text-silver-300 hover:text-white hover:border-neon-400/30'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Battery slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-silver-200">Batareya quvvati</label>
                <span className="font-display text-2xl font-bold neon-text">{batteryPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={batteryPct}
                onChange={(e) => setBatteryPct(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-700 rounded-full appearance-none cursor-pointer range-neon"
              />
              <div className="flex justify-between mt-2 text-xs text-silver-500">
                <span>5%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Drive mode */}
            <div>
              <label className="text-sm font-medium text-silver-200 mb-3 block">Yurish sharoiti</label>
              <div className="grid grid-cols-3 gap-3">
                {driveModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setDriveMode(mode.id)}
                      className={`p-4 rounded-xl text-left transition-all duration-300 ${
                        driveMode === mode.id
                          ? 'bg-neon-500/10 border border-neon-400/40 shadow-[0_0_20px_-8px_rgba(34,211,238,0.4)]'
                          : 'glass hover:border-neon-400/20'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${driveMode === mode.id ? 'text-neon-300' : 'text-silver-400'}`} strokeWidth={1.5} />
                      <p className={`text-sm font-medium mb-0.5 ${driveMode === mode.id ? 'text-white' : 'text-silver-200'}`}>{mode.label}</p>
                      <p className="text-[10px] text-silver-500 leading-tight">{mode.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          </Reveal>

          {/* Result */}
          <Reveal animation="slide-in" delay={100} className="lg:col-span-2">
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            {/* Circular gauge */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 85}
                  strokeDashoffset={2 * Math.PI * 85 * (1 - Math.min(estimatedRange / 1000, 1))}
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <BatteryCharging className="w-7 h-7 text-neon-300 mb-1" strokeWidth={1.5} />
                <p className="font-display text-4xl font-bold text-white">{estimatedRange}</p>
                <p className="text-xs text-silver-400">km masofa</p>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-silver-400">Batareya</span>
                <span className="text-white font-medium">{batteryPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-obsidian-700 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${batteryColor} rounded-full transition-all duration-500`}
                  style={{ width: `${batteryPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm pt-2">
                <span className="text-silver-400">Model</span>
                <span className="text-white font-medium">{selectedVehicle.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-silver-400">Sharoit</span>
                <span className="text-white font-medium">{driveModes.find((m) => m.id === driveMode)?.label}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-silver-400">To'liq masofa</span>
                <span className="text-white font-medium">{parseRange(selectedVehicle.specs.range)} km</span>
              </div>
            </div>

            <p className="text-xs text-silver-500 mt-6 leading-relaxed">
              Hisob-kitob taxminiy. Haqiqiy masofa harorat, havo sovutgich va yurish uslubiga qarab o'zgaradi.
            </p>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
