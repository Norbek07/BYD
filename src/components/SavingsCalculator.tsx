import { useState, useMemo } from 'react';
import { Fuel, Zap, TrendingDown, Calendar } from 'lucide-react';
import Reveal from '@/components/Reveal';

// Uzbekistan fuel & electricity prices (approximate 2026)
const PETROL_PRICE_PER_LITER = 9000; // UZS (AI-80)
const EV_KWH_PRICE = 450; // UZS per kWh (off-peak charging)
const PETROL_CONSUMPTION = 8; // liters per 100km (average)
const EV_CONSUMPTION = 15; // kWh per 100km (average)

const formatUZS = (val: number) => new Intl.NumberFormat('uz-UZ').format(Math.round(val)) + ' so\'m';

export default function SavingsCalculator() {
  const [monthlyKm, setMonthlyKm] = useState(1500);

  const savings = useMemo(() => {
    const petrolMonthlyCost = (monthlyKm / 100) * PETROL_CONSUMPTION * PETROL_PRICE_PER_LITER;
    const evMonthlyCost = (monthlyKm / 100) * EV_CONSUMPTION * EV_KWH_PRICE;
    const monthlySavings = petrolMonthlyCost - evMonthlyCost;
    const yearlySavings = monthlySavings * 12;
    const petrolYearly = petrolMonthlyCost * 12;
    const evYearly = evMonthlyCost * 12;
    return { petrolMonthlyCost, evMonthlyCost, monthlySavings, yearlySavings, petrolYearly, evYearly };
  }, [monthlyKm]);

  const petrolPct = savings.petrolMonthlyCost > 0 ? 100 : 0;
  const evPct = savings.petrolMonthlyCost > 0
    ? Math.min((savings.evMonthlyCost / savings.petrolMonthlyCost) * 100, 100)
    : 0;

  return (
    <section id="calculator" className="relative py-20 md:py-28">
      <div className="absolute inset-0 grid-bg radial-fade opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <TrendingDown className="w-3.5 h-3.5 text-neon-300" />
            <span className="text-xs font-medium text-neon-300 tracking-wider uppercase">Tejash kalkulyatori</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Elektromobil bilan <span className="neon-text">qancha</span> tejasiz?
          </h2>
          <p className="text-silver-400 max-w-2xl mx-auto">
            Oylik yurish masofangizni kiriting va benzin bilan elektr quvvatlash xarajatlari tafovutini ko'ring.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Reveal animation="slide-in">
          <div className="glass-card p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-silver-200">Oylik yurish masofasi</label>
                <span className="font-display text-2xl font-bold neon-text">{monthlyKm} km</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-700 rounded-full appearance-none cursor-pointer range-neon"
              />
              <div className="flex justify-between mt-2 text-xs text-silver-500">
                <span>200 km</span>
                <span>5000 km</span>
              </div>
            </div>

            {/* Comparison bars */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-sm font-medium text-silver-200">Benzin (AI-80)</span>
                  </div>
                  <span className="font-display font-bold text-orange-400">{formatUZS(savings.petrolMonthlyCost)}</span>
                </div>
                <div className="h-3 rounded-full bg-obsidian-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${petrolPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-neon-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-neon-300" />
                    </div>
                    <span className="text-sm font-medium text-silver-200">Elektr quvvatlash</span>
                  </div>
                  <span className="font-display font-bold text-neon-300">{formatUZS(savings.evMonthlyCost)}</span>
                </div>
                <div className="h-3 rounded-full bg-obsidian-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-400 to-neon-500 rounded-full transition-all duration-500"
                    style={{ width: `${evPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-silver-500">
              <p>· Benzin narxi: ~{formatUZS(PETROL_PRICE_PER_LITER)} / litr</p>
              <p>· Elektr narxi: ~{formatUZS(EV_KWH_PRICE)} / kWh</p>
              <p>· O'rtacha benzin sarfi: {PETROL_CONSUMPTION} l/100km · EV sarfi: {EV_CONSUMPTION} kWh/100km</p>
            </div>
          </div>
          </Reveal>

          {/* Results */}
          <Reveal animation="slide-in" delay={100}>
          <div className="glass-card p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-silver-400 mb-2">Oylik tejov</p>
              <p className="font-display text-4xl md:text-5xl font-bold neon-text mb-1">
                {formatUZS(savings.monthlySavings)}
              </p>
              <p className="text-sm text-silver-500 mb-8">Elektromobil bilan har oyda</p>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-neon-500/5 border border-neon-400/20 mb-4">
                <Calendar className="w-8 h-8 text-neon-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-silver-400">Yillik tejov</p>
                  <p className="font-display text-2xl font-bold text-white">{formatUZS(savings.yearlySavings)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                  <p className="text-xs text-silver-400 mb-1">Benzin (yil)</p>
                  <p className="font-display text-lg font-bold text-orange-400">{formatUZS(savings.petrolYearly)}</p>
                </div>
                <div className="p-4 rounded-xl bg-neon-500/5 border border-neon-400/15">
                  <p className="text-xs text-silver-400 mb-1">Elektr (yil)</p>
                  <p className="font-display text-lg font-bold text-neon-300">{formatUZS(savings.evYearly)}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-silver-500 mt-6 leading-relaxed">
              Hisob-kitob O'zbekiston o'rtacha narxlari asosida amalga oshirilgan. Haqiqiy xarajatlar yurish sharoiti va narxlarga qarab farq qilishi mumkin.
            </p>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
