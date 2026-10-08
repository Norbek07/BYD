import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import Reveal from '@/components/Reveal';

const footerLinks = {
  'Modellar': [
    { label: 'BYD Song Plus', href: '#catalog' },
    { label: 'BYD Han', href: '#catalog' },
    { label: 'BYD Seal', href: '#catalog' },
    { label: 'Yangwang U8', href: '#catalog' },
    { label: 'BYD Chazor', href: '#catalog' },
  ],
  'Xizmatlar': [
    { label: 'Tejash kalkulyatori', href: '#calculator' },
    { label: 'Masofa hisoblagich', href: '#range' },
    { label: 'Konsultatsiya', href: '#contact' },
  ],
  'Kompaniya': [
    { label: 'Biz haqimizda', href: '#hero' },
    { label: 'Yangiliklar', href: '#hero' },
    { label: 'Dilerlar', href: '#contact' },
    { label: 'Karyera', href: '#hero' },
  ],
};

export default function Footer({ onBookTestDrive }: { onBookTestDrive: () => void }) {
  return (
    <footer id="contact" className="relative border-t border-white/10 mt-10">
      <div className="absolute inset-0 grid-bg radial-fade opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-300 to-neon-600 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]">
                <Zap className="w-5 h-5 text-obsidian-950" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-white tracking-tight">BYD</span>
                <span className="text-[10px] text-silver-400 font-medium tracking-widest uppercase">O'zbekiston</span>
              </div>
            </div>
            <p className="text-sm text-silver-400 leading-relaxed max-w-sm mb-6">
              BYD — dunyodagi yetakchi elektromobil ishlab chiqaruvchisi. O'zbekiston bozorida eng so'nggi elektro va gibrid modellarni taqdim etamiz.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+998712008080" className="flex items-center gap-2.5 text-sm text-silver-300 hover:text-neon-300 transition-colors">
                <Phone className="w-4 h-4 text-neon-400/70" strokeWidth={1.5} />
                +998 99 999 99 99
              </a>
              <a href="mailto:info@byd.uz" className="flex items-center gap-2.5 text-sm text-silver-300 hover:text-neon-300 transition-colors">
                <Mail className="w-4 h-4 text-neon-400/70" strokeWidth={1.5} />
                info@byd.uz
              </a>
              <p className="flex items-center gap-2.5 text-sm text-silver-300">
                <MapPin className="w-4 h-4 text-neon-400/70" strokeWidth={1.5} />
                Toshkent sh., Amir Temur ko'chasi 10
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold text-white mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-silver-400 hover:text-neon-300 transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-silver-500">© 2026 BYD O'zbekiston. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-silver-300 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-silver-300 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-silver-300 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300" aria-label="YouTube">
              <Youtube className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
