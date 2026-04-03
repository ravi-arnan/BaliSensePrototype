import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CrowdMap } from './components/CrowdMap';
import { Prediction } from './components/Prediction';
import { RouteRecommendation } from './components/RouteRecommendation';
import { BALI_DESTINATIONS, Destination, Role } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<Role>('Wisatawan');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [destinations, setDestinations] = useState<Destination[]>(BALI_DESTINATIONS);

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDestinations(prev => prev.map(dest => {
        // Randomly fluctuate visitors by +/- 5%
        const change = Math.floor(Math.random() * (dest.capacity * 0.05)) * (Math.random() > 0.5 ? 1 : -1);
        let newValue = dest.currentVisitors + change;

        // Keep within bounds [5% capacity, 95% capacity]
        newValue = Math.max(Math.floor(dest.capacity * 0.05), Math.min(newValue, Math.floor(dest.capacity * 0.95)));

        return {
          ...dest,
          currentVisitors: newValue,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard destinations={destinations} />;
      case 'map':
        return <CrowdMap destinations={destinations} />;
      case 'prediction':
        return <Prediction destinations={destinations} />;
      case 'routes':
        return <RouteRecommendation destinations={destinations} />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <p className="text-lg font-medium">Laporan Kunjungan Bulanan</p>
            <p className="text-sm">Modul ini hanya tersedia untuk akun Pengelola Premium.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl space-y-8">
            <h3 className="text-2xl font-bold">Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#1e2536] rounded-xl border border-white/8 flex items-center justify-between">
                <div>
                  <p className="font-bold">Notifikasi Kepadatan</p>
                  <p className="text-xs text-gray-400">Terima alert jika destinasi favorit mencapai &gt;80%</p>
                </div>
                <div className="w-10 h-5 bg-[#0ea5e9] rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-4 bg-[#1e2536] rounded-xl border border-white/8 flex items-center justify-between">
                <div>
                  <p className="font-bold">Unit Kapasitas</p>
                  <p className="text-xs text-gray-400">Tampilkan persentase atau jumlah riil</p>
                </div>
                <select className="bg-[#0f1117] border border-white/8 rounded px-2 py-1 text-xs">
                  <option>Persentase (%)</option>
                  <option>Jumlah Riil (Pax)</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard destinations={destinations} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white selection:bg-[#0ea5e9]/30">
      <Header role={role} setRole={setRole} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pl-56 pt-14 min-h-screen">
        <div className="p-6 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  {activeTab === 'dashboard' && 'Ringkasan Kepadatan'}
                  {activeTab === 'map' && 'Peta Interaktif'}
                  {activeTab === 'prediction' && 'Analisis Prediktif'}
                  {activeTab === 'routes' && 'Rekomendasi Perjalanan'}
                  {activeTab === 'reports' && 'Laporan & Statistik'}
                  {activeTab === 'settings' && 'Pengaturan Akun'}
                </h1>
                <p className="text-gray-400 text-sm">
                  {role === 'Pengelola' ? 'Panel Administrasi Kawasan Wisata Bali' : 'Panduan Wisata Cerdas & Bebas Kerumunan'}
                </p>
              </div>

              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="pl-56 py-6 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        BaliSense v1.0.4 — Data diperbarui secara real-time dari sensor IoT & GPS Tracking
      </footer>
    </div>
  );
}
