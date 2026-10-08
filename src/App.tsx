import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Catalog from '@/components/Catalog';
import VehicleModal from '@/components/VehicleModal';
import SavingsCalculator from '@/components/SavingsCalculator';
import RangeEstimator from '@/components/RangeEstimator';
import Footer from '@/components/Footer';
import type { Vehicle } from '@/data/vehicles';

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const closeVehicleModal = useCallback(() => {
    setSelectedVehicle(null);
  }, []);


  return (
    <div className="min-h-screen bg-obsidian-950 relative overflow-x-hidden">
      {/* Ambient gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-800/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero onSelectVehicle={setSelectedVehicle} />
          <Highlights />
          <Catalog onSelectVehicle={setSelectedVehicle} />
          <SavingsCalculator />
          <RangeEstimator />
        </main>
        <Footer />

        {/* Modals */}
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={closeVehicleModal}
          
        />
        
      </div>
    </div>
  );
}
