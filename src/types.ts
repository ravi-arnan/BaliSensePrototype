export interface Destination {
  id: string;
  name: string;
  location: [number, number];
  capacity: number;
  currentVisitors: number;
  trend: 'up' | 'down' | 'stable';
  category: 'Beach' | 'Temple' | 'Nature' | 'Cultural';
}

export type Role = 'Pengelola' | 'Wisatawan';

export const BALI_DESTINATIONS: Destination[] = [
  { id: '1', name: 'Uluwatu Temple', location: [-8.8291, 115.0849], capacity: 2000, currentVisitors: 1200, trend: 'up', category: 'Temple' },
  { id: '2', name: 'Tanah Lot', location: [-8.6212, 115.0868], capacity: 3000, currentVisitors: 1800, trend: 'stable', category: 'Temple' },
  { id: '3', name: 'Ubud Monkey Forest', location: [-8.5194, 115.2606], capacity: 1500, currentVisitors: 600, trend: 'down', category: 'Nature' },
  { id: '4', name: 'Kuta Beach', location: [-8.7178, 115.1686], capacity: 5000, currentVisitors: 4200, trend: 'up', category: 'Beach' },
  { id: '5', name: 'Tegallalang Rice Terrace', location: [-8.4333, 115.2789], capacity: 1200, currentVisitors: 400, trend: 'stable', category: 'Nature' },
  { id: '6', name: 'Besakih Temple', location: [-8.3744, 115.4511], capacity: 4000, currentVisitors: 1500, trend: 'down', category: 'Temple' },
  { id: '7', name: 'Seminyak Beach', location: [-8.6913, 115.1557], capacity: 3500, currentVisitors: 2800, trend: 'up', category: 'Beach' },
  { id: '8', name: 'Sanur Beach', location: [-8.6755, 115.2633], capacity: 2500, currentVisitors: 900, trend: 'stable', category: 'Beach' },
  { id: '9', name: 'Canggu Beach', location: [-8.6500, 115.1300], capacity: 3000, currentVisitors: 2500, trend: 'up', category: 'Beach' },
  { id: '10', name: 'Mount Batur', location: [-8.2417, 115.3750], capacity: 1000, currentVisitors: 300, trend: 'down', category: 'Nature' },
];

export const getDensityColor = (percentage: number) => {
  if (percentage < 40) return '#22d3ee'; // Cyan
  if (percentage < 60) return '#f59e0b'; // Amber
  if (percentage < 80) return '#f97316'; // Orange
  return '#ef4444'; // Red
};

export const getDensityLabel = (percentage: number) => {
  if (percentage < 40) return 'Sepi';
  if (percentage < 60) return 'Sedang';
  if (percentage < 80) return 'Ramai';
  return 'Kritis';
};
