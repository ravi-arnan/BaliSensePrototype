import React from 'react';
import { Route as RouteIcon, MapPin, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { Destination, getDensityColor, getDensityLabel } from '../types';

interface RouteRecommendationProps {
  destinations: Destination[];
}

export const RouteRecommendation: React.FC<RouteRecommendationProps> = ({ destinations }) => {
  const lowDensitySpots = destinations
    .filter(d => (d.currentVisitors / d.capacity) * 100 < 50)
    .sort((a, b) => (a.currentVisitors / a.capacity) - (b.currentVisitors / b.capacity));

  const recommendations = [
    {
      id: 'r1',
      name: 'South Bali Explorer (Low Crowd)',
      duration: '4-5 Jam',
      stops: [lowDensitySpots[0]?.name || 'Sanur Beach', lowDensitySpots[1]?.name || 'Ubud Monkey Forest'],
      difficulty: 'Mudah',
      status: 'Optimal'
    },
    {
      id: 'r2',
      name: 'Cultural Heritage Route',
      duration: '6-7 Jam',
      stops: ['Besakih Temple', 'Tegallalang Rice Terrace'],
      difficulty: 'Sedang',
      status: 'Normal'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Rekomendasi Rute Pintar</h3>
        <button className="px-4 py-2 bg-[#0ea5e9] text-white rounded-lg text-sm font-bold hover:bg-[#0284c7] transition-all">
          Generate Rute Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((route) => (
          <div key={route.id} className="bg-[#1e2536] border border-white/8 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/8 bg-white/2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#0ea5e9]/10 rounded-lg">
                    <RouteIcon className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h4 className="font-bold">{route.name}</h4>
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/20">
                  {route.status}
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {route.duration}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Zap className="w-3 h-3" />
                  {route.difficulty}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="relative space-y-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5 border-l border-dashed border-white/20" />
                {route.stops.map((stop, idx) => {
                  const dest = destinations.find(d => d.name === stop);
                  const density = dest ? (dest.currentVisitors / dest.capacity) * 100 : 30;
                  return (
                    <div key={idx} className="relative flex items-start gap-4 pl-8">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#1e2536] border-2 border-[#0ea5e9] flex items-center justify-center z-10">
                        <span className="text-[10px] font-bold text-[#0ea5e9]">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold">{stop}</p>
                          <span className="text-[10px] font-bold tabular-nums" style={{ color: getDensityColor(density) }}>
                            {density.toFixed(0)}% Kepadatan
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Estimasi waktu kunjungan: 1.5 jam</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/8">
                <button className="w-full py-3 bg-white/5 border border-white/8 rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Buka di Google Maps
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1e2536] p-6 rounded-xl border border-white/8">
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          Kenapa Rute Ini?
        </h4>
        <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
          <li>Menghindari kemacetan di area Seminyak dan Canggu.</li>
          <li>Memanfaatkan waktu sepi di destinasi populer.</li>
          <li>Menghemat waktu perjalanan hingga 35 menit.</li>
        </ul>
      </div>
    </div>
  );
};
