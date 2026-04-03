import React from 'react';
import { LayoutDashboard, Map as MapIcon, TrendingUp, Route, FileText, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Peta Kepadatan', icon: MapIcon },
  { id: 'prediction', label: 'Prediksi Kerumunan', icon: TrendingUp },
  { id: 'routes', label: 'Rekomendasi Rute', icon: Route },
  { id: 'reports', label: 'Laporan', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 bg-[#0f1117] border-r border-white/8 p-4 flex flex-col gap-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
            activeTab === item.id
              ? "bg-[#1e2536] text-[#0ea5e9] border border-white/8 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5",
            activeTab === item.id ? "text-[#0ea5e9]" : "text-gray-500 group-hover:text-gray-300"
          )} />
          {item.label}
        </button>
      ))}
    </aside>
  );
};
