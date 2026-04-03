import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination, getDensityColor, getDensityLabel } from '../types';

interface CrowdMapProps {
  destinations: Destination[];
}

export const CrowdMap: React.FC<CrowdMapProps> = ({ destinations }) => {
  return (
    <div className="h-[calc(100vh-180px)] w-full rounded-xl overflow-hidden border border-white/8 shadow-2xl relative">
      <MapContainer
        center={[-8.4095, 115.1889]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {destinations.map((dest) => {
          const density = (dest.currentVisitors / dest.capacity) * 100;
          const color = getDensityColor(density);

          return (
            <CircleMarker
              key={dest.id}
              center={dest.location}
              radius={12 + (density / 10)}
              fillColor={color}
              color={color}
              weight={2}
              opacity={0.8}
              fillOpacity={0.4}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium" style={{ color }}>
                      {getDensityLabel(density)} ({density.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Pengunjung: <span className="text-white font-medium">{dest.currentVisitors}</span></p>
                    <p>Kapasitas: <span className="text-white font-medium">{dest.capacity}</span></p>
                    <p>Kategori: <span className="text-white font-medium">{dest.category}</span></p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-[#1e2536]/90 backdrop-blur-md p-4 rounded-xl border border-white/8 z-[1000] space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status Kepadatan</p>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#22d3ee]" />
          <span className="text-xs text-gray-300">Sepi (&lt;40%)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <span className="text-xs text-gray-300">Sedang (40-60%)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#f97316]" />
          <span className="text-xs text-gray-300">Ramai (60-80%)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="text-xs text-gray-300">Kritis (&gt;80%)</span>
        </div>
      </div>
    </div>
  );
};
