import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Destination, getDensityColor } from '../types';
import { Clock, Info } from 'lucide-react';

interface PredictionProps {
  destinations: Destination[];
}

export const Prediction: React.FC<PredictionProps> = ({ destinations }) => {
  const selectedDest = destinations[0]; // Default to first for demo

  const generatePredictionData = () => {
    const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    return hours.map(h => ({
      time: h,
      density: Math.floor(Math.random() * 60) + 20,
      historical: Math.floor(Math.random() * 40) + 30
    }));
  };

  const data = generatePredictionData();

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2536] p-6 rounded-xl border border-white/8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold">Prediksi Kepadatan 24 Jam</h3>
            <p className="text-sm text-gray-400">Berdasarkan data historis dan tren real-time</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
            <Clock className="w-4 h-4 text-[#0ea5e9]" />
            <span className="text-sm font-medium">Update: 5 menit lalu</span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e2536',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Area
                type="monotone"
                dataKey="density"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorDensity)"
                strokeWidth={3}
                name="Prediksi Hari Ini"
              />
              <Area
                type="monotone"
                dataKey="historical"
                stroke="#475569"
                fill="transparent"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Rata-rata Historis"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-4">
          <Info className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-400 mb-1">Waktu Terbaik Berkunjung</h4>
            <p className="text-xs text-gray-300">Pukul 08:00 - 10:00 WITA diprediksi memiliki kepadatan terendah untuk sebagian besar destinasi.</p>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-4">
          <Info className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-1">Puncak Kepadatan</h4>
            <p className="text-xs text-gray-300">Diprediksi terjadi lonjakan pada pukul 16:00 - 18:00 WITA di area Kuta dan Uluwatu (Sunset Peak).</p>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex gap-4">
          <Info className="w-6 h-6 text-green-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-green-400 mb-1">Rekomendasi Alternatif</h4>
            <p className="text-xs text-gray-300">Ubud Monkey Forest dan Sanur Beach menunjukkan tren penurunan pengunjung hari ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
