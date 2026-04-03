import React from 'react';
import { Users, MapPin, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Destination, getDensityColor, getDensityLabel } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardProps {
  destinations: Destination[];
}

export const Dashboard: React.FC<DashboardProps> = ({ destinations }) => {
  const totalVisitors = destinations.reduce((acc, curr) => acc + curr.currentVisitors, 0);
  const avgDensity = (destinations.reduce((acc, curr) => acc + (curr.currentVisitors / curr.capacity), 0) / destinations.length) * 100;
  const criticalSpots = destinations.filter(d => (d.currentVisitors / d.capacity) * 100 > 80).length;

  const chartData = destinations.map(d => ({
    name: d.name.split(' ')[0],
    density: Math.round((d.currentVisitors / d.capacity) * 100),
    fullName: d.name
  })).sort((a, b) => b.density - a.density);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Pengunjung"
          value={totalVisitors.toLocaleString()}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <KPICard
          title="Rata-rata Kepadatan"
          value={`${avgDensity.toFixed(1)}%`}
          icon={TrendingUp}
          trend="-3%"
          trendUp={false}
        />
        <KPICard
          title="Titik Kritis"
          value={criticalSpots.toString()}
          icon={AlertTriangle}
          color={criticalSpots > 0 ? 'text-red-500' : 'text-green-500'}
        />
        <KPICard
          title="Destinasi Aktif"
          value={destinations.length.toString()}
          icon={MapPin}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e2536] p-6 rounded-xl border border-white/8">
          <h3 className="text-lg font-semibold mb-6">Kepadatan Real-time per Lokasi</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    backgroundColor: '#1e2536',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#f8fafc'
                  }}
                />
                <Bar dataKey="density" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getDensityColor(entry.density)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e2536] p-6 rounded-xl border border-white/8 flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Lokasi Teramai</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {destinations
              .sort((a, b) => b.currentVisitors / b.capacity - a.currentVisitors / a.capacity)
              .slice(0, 5)
              .map((dest) => {
                const density = (dest.currentVisitors / dest.capacity) * 100;
                return (
                  <div key={dest.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <div>
                      <p className="text-sm font-medium">{dest.name}</p>
                      <p className="text-xs text-gray-400">{dest.currentVisitors} / {dest.capacity} pax</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums" style={{ color: getDensityColor(density) }}>
                        {density.toFixed(0)}%
                      </p>
                      <p className="text-[10px] uppercase font-bold text-gray-500">
                        {getDensityLabel(density)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  icon: any;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, trend, trendUp, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#1e2536] p-6 rounded-xl border border-white/8 relative overflow-hidden group"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
        <h4 className={cn("text-2xl font-bold tabular-nums", color || "text-white")}>{value}</h4>
      </div>
      <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-[#0ea5e9]/10 group-hover:border-[#0ea5e9]/20 transition-all">
        <Icon className="w-5 h-5 text-[#0ea5e9]" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-1">
        {trendUp ? (
          <ArrowUpRight className="w-4 h-4 text-red-400" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-green-400" />
        )}
        <span className={cn("text-xs font-medium", trendUp ? "text-red-400" : "text-green-400")}>
          {trend} vs jam lalu
        </span>
      </div>
    )}
  </motion.div>
);
