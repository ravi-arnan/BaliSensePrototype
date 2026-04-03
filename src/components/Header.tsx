import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Role } from '../types';
import { cn } from '../lib/utils';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WITA is UTC+8
  const witaTime = new Date(time.getTime() + (time.getTimezoneOffset() + 480) * 60000);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f1117]/80 backdrop-blur-md border-b border-white/8 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 12 5 7 12 7C19 7 22 12 22 12C22 12 19 17 12 17C5 17 2 12 2 12Z" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17C12 17 15 19 18 19C21 19 22 17 22 17" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17C2 17 3 19 6 19C9 19 12 17 12 17" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl font-bold tracking-tight text-[#0ea5e9]">BaliSense</span>
      </div>

      <div className="flex bg-[#1e2536] p-1 rounded-full border border-white/8">
        <button
          onClick={() => setRole('Pengelola')}
          className={cn(
            "px-4 py-1 rounded-full text-xs font-medium transition-all",
            role === 'Pengelola' ? "bg-[#0ea5e9] text-white" : "text-gray-400 hover:text-white"
          )}
        >
          🏛️ Pengelola
        </button>
        <button
          onClick={() => setRole('Wisatawan')}
          className={cn(
            "px-4 py-1 rounded-full text-xs font-medium transition-all",
            role === 'Wisatawan' ? "bg-[#0ea5e9] text-white" : "text-gray-400 hover:text-white"
          )}
        >
          🧳 Wisatawan
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-400 tabular-nums">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {format(witaTime, 'HH:mm:ss')} WITA
      </div>
    </header>
  );
};
