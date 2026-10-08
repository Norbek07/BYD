export type VehicleCategory = 'EV' | 'DM-i' | 'Premium';
export type VehicleBodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Flagship SUV';

export interface PricingTier {
  name: string;
  usd: number;
  features: string[];
}

export interface VehicleSpecs {
  batteryCapacity: string;
  horsepower: string;
  acceleration: string;
  range: string;
  chargingSpeed: string;
  drivetrain: string;
  topSpeed: string;
  seating: string;
}

export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: VehicleCategory;
  bodyType: VehicleBodyType;
  image: string;
  gallery: string[];
  specs: VehicleSpecs;
  pricing: PricingTier[];
  badge?: string;
  accentColor: string;
}

export const USD_TO_UZS = 12750;

export const vehicles: Vehicle[] = [
  {
    id: 'song-plus',
    name: 'BYD Song Plus',
    tagline: 'Oilaviy gibrid SUV',
    description:
      "Song Plus DM-i — BYD ning eng mashhur gibrid modeli. Tejamkor, ishonchli va keng salonli oilaviy avtomobil. Shahar va uzoq yo'l uchun ideal.",
    category: 'DM-i',
    bodyType: 'SUV',
    image: 'https://bydzone.uz/wp-content/uploads/2024/02/black-02-7-min.png',
    gallery: [
      'https://bydzone.uz/wp-content/uploads/2024/02/black-02-7-min.png',
      'https://www.borderlesscar.com/wp-content/uploads/2023/07/1-5-1.jpg',
      'https://www.borderlesscar.com/wp-content/uploads/2023/07/1-3-1.jpg',
      'https://electro-motors.top/image/cache/catalog/electrocars/byd%09songplusdm-i/1400x0_1_q95_autohomecar__chxkpmayxaqautl7aa1ojhy69wc251-740x480.jpg',
    ],
    specs: {
      batteryCapacity: '18.3 kWh',
      horsepower: '197 ot kuchi',
      acceleration: '7.9 soniya',
      range: '120 km (EV) / 1200 km (gibrid)',
      chargingSpeed: '30 daq. (10%→80%)',
      drivetrain: 'FWD',
      topSpeed: '180 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Comfort', usd: 24900, features: ['18.3 kWh batareya', '12.8\" ekran', 'Apple CarPlay', 'Adaptive cruise'] },
      { name: 'Premium', usd: 27500, features: ['Premium audio', 'Panoroma shift', 'Ventilyatsiya o\'rindiqlari', '360° kamera'] },
      { name: 'Flagship', usd: 31000, features: ['DiPilot 100', 'HUD displey', 'Premium teri salon', 'OTA yangilanishlar'] },
    ],
    badge: 'Bestseller',
    accentColor: 'neon',
  },
  {
    id: 'han',
    name: 'BYD Han',
    tagline: 'Flagship elektro sedan',
    description:
      "BYD Han — biznes klassi uchun mo'ljallangan premium elektromobil. 3.9 soniyada 0-100 km/soat tezlanish va 715 km yurish masofasi.",
    category: 'EV',
    bodyType: 'Sedan',
    image: 'https://carnewschina.com/wp-content/uploads/2026/07/byd_da_han_official-1500x844.jpg',
    gallery: [
      'https://carnewschina.com/wp-content/uploads/2026/07/byd_da_han_official-1500x844.jpg',
      'https://carnewschina.com/wp-content/uploads/2026/07/byd_da_han_official-4-1500x844.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSn9kUVkNxfULHMd0IHlupKvRU0GvUnMX3Pz2xMa67GwecJvz21KM3xpVI&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYkIdrFw17i7zbBcaw9F5IpTwl5fAHH0JkQTeReHtr-VqkOrXz2184n8nl&s=10',
    ],
    specs: {
      batteryCapacity: '85.4 kWh',
      horsepower: '517 ot kuchi',
      acceleration: '3.9 soniya',
      range: '715 km (CLTC)',
      chargingSpeed: '25 daq. (10%→80%)',
      drivetrain: 'AWD',
      topSpeed: '200 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Standard', usd: 38900, features: ['85.4 kWh Blade batareya', '15.6\" rotatsion ekran', 'DiLink 4.0', '12 dinamik'] },
      { name: 'Performance', usd: 42500, features: ['517 ot kuchi AWD', 'DiPilot 100', 'HUD displey', 'Premium teri'] },
      { name: 'Flagship', usd: 46000, features: ['Dinamik amortizatorlar', 'Massaj o\'rindiqlari', 'BSM tinglov tizimi', 'OTA + 5G'] },
    ],
    badge: 'Flagship',
    accentColor: 'neon',
  },
  {
    id: 'seal',
    name: 'BYD Seal',
    tagline: 'Sport elektro sedan',
    description:
      "BYD Seal — sport ko'rinishidagi elektro sedan. CTB (Cell-to-Body) texnologiyasi bilan integratsiyalashgan batareya va ajoyib dinamika.",
    category: 'EV',
    bodyType: 'Sedan',
    image: 'https://fischer-automobile.de/fileadmin/user_upload/BYD_Seal_Highlights_01.png',
    gallery: [
      'https://fischer-automobile.de/fileadmin/user_upload/BYD_Seal_Highlights_01.png',
      'https://ev-database.org/img/auto/BYD_SEAL/BYD_SEAL-01@2x.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/930x620/BYD/Seal/9561/1709635009606/side-view-(left)-90.jpg',
      'https://static.independent.co.uk/2024/05/03/11/BYD_SEAL_2.jpg',
    ],
    specs: {
      batteryCapacity: '82.5 kWh',
      horsepower: '523 ot kuchi',
      acceleration: '3.8 soniya',
      range: '650 km (CLTC)',
      chargingSpeed: '26 daq. (10%→80%)',
      drivetrain: 'AWD',
      topSpeed: '180 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Design', usd: 33500, features: ['82.5 kWh CTB batareya', 'RWD', '15.6\" ekran', 'DiLink'] },
      { name: 'Performance', usd: 37000, features: ['523 ot kuchi AWD', '3.8s tezlanish', 'Sport amortizatorlar', 'Brembo tormozlar'] },
      { name: 'Flagship AWD', usd: 41000, features: ['DiPilot 100', 'iTAC tizimi', 'Premium audio', 'HUD displey'] },
    ],
    badge: 'Yangi',
    accentColor: 'neon',
  },
  {
    id: 'yangwang-u8',
    name: 'Yangwang U8',
    tagline: 'Premium off-road flagman',
    description:
      "Yangwang U8 — BYD ning premium sub-brendi ostidagi hashamatli off-road SUV. 1195 ot kuchi va suzish qobiliyatiga ega.",
    category: 'Premium',
    bodyType: 'Flagship SUV',
    image: 'https://qatar.yallamotor.com/_next/image?url=https%3A%2F%2Fymimg1.b8cdn.com%2Fresized%2Fcar_model%2F11792%2Fpictures%2F13421676%2Fwebp_listing_main_yangwang-u8-2023-02.webp&w=1920&q=75',
    gallery: [
      'https://qatar.yallamotor.com/_next/image?url=https%3A%2F%2Fymimg1.b8cdn.com%2Fresized%2Fcar_model%2F11792%2Fpictures%2F13421676%2Fwebp_listing_main_yangwang-u8-2023-02.webp&w=1920&q=75',
      'https://img.staticdj.com/b3965b7055d65c542fba485873ad1c4f.png',
      'https://dolubatarya.com/uploads/2023/01/byd-yangwang-u8-range-cltc.jpg',
      'https://dolubatarya.com/uploads/2023/01/byd-yangwang-u8-design-hero-image.jpg',
    ],
    specs: {
      batteryCapacity: '49.05 kWh',
      horsepower: '1195 ot kuchi',
      acceleration: '3.6 soniya',
      range: '1000 km (gibrid)',
      chargingSpeed: '30 daq. (10%→80%)',
      drivetrain: 'AWD (4 motor)',
      topSpeed: '200 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Luxury', usd: 98000, features: ['4 mustaqil motor', 'Suzish rejimi (30 daq.)', 'DiSus-P gidropnevmatika', 'Premium teri salon'] },
      { name: 'Off-Road', usd: 105000, features: ['Drone integratsiyasi', 'V2L tashqi quvvat', 'Terrain rejimlar', 'Night Vision'] },
      { name: 'Flagship', usd: 112000, features: ['DiPilot 600', '5G + OTA', 'Massaj o\'rindiqlari', '23 dinamik audio'] },
    ],
    badge: 'Premium',
    accentColor: 'neon',
  },
  {
    id: 'chazor',
    name: 'BYD Chazor',
    tagline: 'Shahar elektro SUV',
    description:
      "BYD Chazor — shahar hayoti uchun ixcham va zamonaviy elektro SUV. Tejamkor, qulay va stilniy dizayn.",
    category: 'EV',
    bodyType: 'SUV',
    image: 'https://aniq.uz/photos/news/0HifDrjDRVjLeU8.jpeg',
    gallery: [
      'https://aniq.uz/photos/news/0HifDrjDRVjLeU8.jpeg',
      'https://bydzone.uz/wp-content/uploads/2024/01/byd-han-exterior-03-6-min.png',
      'https://strg1.newauto.uz/neofiles/serve-image/68665952a004140007d9e782/1190x500/q90',
      'https://www.byd.com/material/byd-site/uz/product/chazor-champion/pc/Section-1-0-pc.jpg',
    ],
    specs: {
      batteryCapacity: '60.48 kWh',
      horsepower: '201 ot kuchi',
      acceleration: '7.8 soniya',
      range: '520 km (CLTC)',
      chargingSpeed: '28 daq. (10%→80%)',
      drivetrain: 'FWD',
      topSpeed: '180 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Active', usd: 21500, features: ['60.48 kWh batareya', '12.8\" ekran', 'Apple CarPlay', 'Adaptive cruise'] },
      { name: 'Design', usd: 23800, features: ['Panoroma shift', 'Premium audio', 'Ventilyatsiya o\'rindiqlari', '360° kamera'] },
      { name: 'Flagship', usd: 26200, features: ['DiPilot 100', 'HUD displey', 'OTA yangilanishlar', '5G ulanish'] },
    ],
    accentColor: 'neon',
  },
  {
    id: 'tang',
    name: 'BYD Tang',
    tagline: '7 o\'rinli elektro SUV',
    description:
      "BYD Tang — katta oila uchun 7 o\'rinli premium elektro SUV. 536 ot kuchi va ajoyib tezlanish bilan jihozlangan.",
    category: 'EV',
    bodyType: 'SUV',
    image: 'https://www.autodeal.com.ph/custom/car-model-photo/original/byd-tang-ev-662f320d23473.jpg',
    gallery: [
      'https://www.autodeal.com.ph/custom/car-model-photo/original/byd-tang-ev-662f320d23473.jpg',
      'https://www.borderlesscar.com/wp-content/uploads/2023/09/10061.jpg',
      'https://auto.prc.today/wp-content/uploads/2024/08/byd-tang-2.jpg',
      'https://www.borderlesscar.com/wp-content/uploads/2023/09/10060.jpg',
    ],
    specs: {
      batteryCapacity: '90.3 kWh',
      horsepower: '536 ot kuchi',
      acceleration: '4.4 soniya',
      range: '635 km (CLTC)',
      chargingSpeed: '25 daq. (10%→80%)',
      drivetrain: 'AWD',
      topSpeed: '180 km/soat',
      seating: '7 o\'rin',
    },
    pricing: [
      { name: 'Premium', usd: 42900, features: ['90.3 kWh batareya', '7 o\'rin', '15.6\" ekran', 'DiLink 4.0'] },
      { name: 'Flagship', usd: 46500, features: ['DiPilot 100', 'HUD displey', 'Premium teri salon', '12 dinamik audio'] },
      { name: 'Performance', usd: 49800, features: ['536 ot kuchi AWD', 'Sport rejim', 'Brembo tormozlar', 'OTA + 5G'] },
    ],
    accentColor: 'neon',
  },
  {
    id: 'atto-3',
    name: 'BYD Atto 3',
    tagline: 'Kompakt elektro crossover',
    description:
      "BYD Atto 3 — yoshlar va shahar hayotchilari uchun ixcham elektro crossover. Zamonaviy dizayn va tejamkor batareya.",
    category: 'EV',
    bodyType: 'SUV',
    image: 'https://images.topgear.com.ph/topgear/images/2026/02/12/byd-atto-3-2026-awd-443hp-01-1770863429.webp',
    gallery: [
      'https://images.topgear.com.ph/topgear/images/2026/02/12/byd-atto-3-2026-awd-443hp-01-1770863429.webp',
      'https://media.byd.com/wp-content/uploads/2026/02/60a37aeb07ebda71c97948e4f82818ab-l.jpg.webp',
      'https://www.electrifying.com/files/POm1Q-4FTZRVkOfg/BYD-ATTO-3-EVO-Static_19.jpg',
      'https://www.whatcar.com/sites/whatcar/files/image/byd-atto-3-evo-rear-cornering.jpg',
    ],
    specs: {
      batteryCapacity: '60.48 kWh',
      horsepower: '201 ot kuchi',
      acceleration: '7.3 soniya',
      range: '480 km (CLTC)',
      chargingSpeed: '28 daq. (10%→80%)',
      drivetrain: 'FWD',
      topSpeed: '167 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Standard', usd: 19900, features: ['60.48 kWh Blade batareya', '12.8\" rotatsion ekran', 'Apple CarPlay', 'Adaptive cruise'] },
      { name: 'Design', usd: 22500, features: ['Panoroma shift', 'Premium audio', 'Ventilyatsiya o\'rindiqlari', '360° kamera'] },
      { name: 'Flagship', usd: 24800, features: ['DiPilot 100', 'HUD displey', 'OTA yangilanishlar', '5G ulanish'] },
    ],
    accentColor: 'neon',
  },
  {
    id: 'dolphin',
    name: 'BYD Dolphin',
    tagline: 'Shahar elektro xetchbek',
    description:
      "BYD Dolphin — shahar harakati uchun ixcham va tejamkor elektro xetchbek. Ekologik va iqtisodiy yechim.",
    category: 'EV',
    bodyType: 'Hatchback',
    image: 'https://assets.autobuzz.my/wp-content/uploads/2023/07/07161057/BYD-Dolphin-launch-Singapore-Thailand.jpg',
    gallery: [
      'https://assets.autobuzz.my/wp-content/uploads/2023/07/07161057/BYD-Dolphin-launch-Singapore-Thailand.jpg',
      'https://bydauto.com.cy/wp-content/uploads/2024/03/DOLPHIN_LHD_-Exterior_Blue_01_download.jpg',
      'https://www.evspecs.org/gr/images/63cfda0903063/6499/64994b5c6ed1d-c.jpg',
      'https://www.topgear.com/sites/default/files/cars-car/image/2025/07/1-BYD-Dolphin-review.jpg?w=1280&h=720',
    ],
    specs: {
      batteryCapacity: '44.9 kWh',
      horsepower: '174 ot kuchi',
      acceleration: '7.0 soniya',
      range: '410 km (CLTC)',
      chargingSpeed: '30 daq. (10%→80%)',
      drivetrain: 'FWD',
      topSpeed: '160 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Active', usd: 16500, features: ['44.9 kWh batareya', '12.8\" ekran', 'Apple CarPlay', 'DiLink'] },
      { name: 'Design', usd: 18900, features: ['Premium audio', 'Panoroma shift', '360° kamera', 'Ventilyatsiya o\'rindiqlari'] },
      { name: 'Flagship', usd: 21200, features: ['DiPilot 100', 'HUD displey', 'OTA yangilanishlar', '5G ulanish'] },
    ],
    accentColor: 'neon',
  },
  {
    id: 'frigate',
    name: 'BYD Frigate',
    tagline: 'Gibrid flagship SUV',
    description:
      "BYD Frigate — DM-i gibrid texnologiyasi bilan jihozlangan flagship SUV. 1200 km yurish masofasi va premium salonda.",
    category: 'DM-i',
    bodyType: 'SUV',
    image: 'https://st.arenaev.com/news/22/08/byd-unveils-flagship-suv/-1242x621/arenaev_001.jpg',
    gallery: [
      'https://st.arenaev.com/news/22/08/byd-unveils-flagship-suv/-1242x621/arenaev_001.jpg',
      'https://s.auto.drom.ru/i24276/c/photos/fullsize/byd/frigate_07/byd_frigate_07_1105529.jpg',
      'https://assets.pandaily.com/uploads/2022/12/4-1.jpg',
      'https://www.gneenev.com/d/files/a-b/720/h230510-10.jpg',
    ],
    specs: {
      batteryCapacity: '36.8 kWh',
      horsepower: '351 ot kuchi',
      acceleration: '4.7 soniya',
      range: '100 km (EV) / 1200 km (gibrid)',
      chargingSpeed: '25 daq. (10%→80%)',
      drivetrain: 'AWD',
      topSpeed: '180 km/soat',
      seating: '5 o\'rin',
    },
    pricing: [
      { name: 'Premium', usd: 32900, features: ['36.8 kWh batareya', '15.6\" ekran', 'DiLink 4.0', 'Premium audio'] },
      { name: 'Flagship', usd: 36500, features: ['DiPilot 100', 'HUD displey', 'Panoroma shift', 'Massaj o\'rindiqlari'] },
      { name: 'Performance', usd: 39800, features: ['351 ot kuchi AWD', 'Sport rejim', 'Brembo tormozlar', 'OTA + 5G'] },
    ],
    accentColor: 'neon',
  },
];

export const categoryFilters: { id: 'all' | VehicleCategory; label: string }[] = [
  { id: 'all', label: 'Barchasi' },
  { id: 'EV', label: 'Elektro (EV)' },
  { id: 'DM-i', label: 'Gibrid (DM-i)' },
  { id: 'Premium', label: 'Premium' },
];

export const bodyTypeFilters: { id: 'all' | VehicleBodyType; label: string }[] = [
  { id: 'all', label: 'Barcha turlari' },
  { id: 'Sedan', label: 'Sedanlar' },
  { id: 'SUV', label: 'SUVlar' },
  { id: 'Hatchback', label: 'Xetchbeklar' },
  { id: 'Flagship SUV', label: 'Flagship SUV' },
];

export function formatUZS(usd: number): string {
  return new Intl.NumberFormat('uz-UZ').format(usd * USD_TO_UZS) + ' so\'m';
}

export function formatUSD(usd: number): string {
  return '$' + new Intl.NumberFormat('en-US').format(usd);
}
