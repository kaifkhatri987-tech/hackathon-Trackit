import React, { useState, useEffect } from 'react';
import { Power, MapPin, Activity, ShieldAlert, Bus, LogOut, AlertCircle } from 'lucide-react';

interface ConductorDashboardProps {
  onEndShift: () => void;
}

const ConductorDashboard: React.FC<ConductorDashboardProps> = ({ onEndShift }) => {
  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setCoords({
          lat: 21.1702 + (Math.random() - 0.5) * 0.01,
          lng: 72.8311 + (Math.random() - 0.5) * 0.01
        });
      }, 5000);
    } else {
      setCoords(null);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="p-5 bg-gray-50 h-full flex flex-col pb-24 no-scrollbar overflow-y-auto">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-blue-900 uppercase tracking-tight">Trip Control</h2>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">SMC Sitilink Official</p>
        </div>
        <div className="px-3 py-1.5 bg-blue-100 rounded-lg flex items-center gap-1.5 border border-blue-200 shadow-sm">
          <Bus size={14} className="text-blue-600" />
          <span className="font-bold text-blue-900 text-[10px]">LIVE</span>
        </div>
      </div>

      <div className={`relative flex-1 rounded-3xl p-6 flex flex-col items-center justify-center transition-all ${isActive ? 'bg-emerald-50 border border-emerald-100 shadow-inner' : 'bg-white shadow-lg border border-gray-100'}`}>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`group w-32 h-32 rounded-full shadow-xl flex items-center justify-center transition-all transform active:scale-95 ${isActive ? 'bg-red-500' : 'bg-[#004A99]'}`}
        >
          <div className="flex flex-col items-center gap-1.5 text-white">
            <Power size={32} />
            <span className="font-bold tracking-widest uppercase text-[9px]">{isActive ? 'STOP TRIP' : 'START TRIP'}</span>
          </div>
        </button>

        <div className="mt-8 w-full space-y-3">
          <StatusRow 
            icon={<MapPin size={18} />} 
            label="Coordinates" 
            value={coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Wait for start...'} 
            active={isActive}
            color="emerald"
          />
          <StatusRow 
            icon={<Activity size={18} />} 
            label="System Status" 
            value={isActive ? 'Broadcasting...' : 'Idle'} 
            active={isActive}
            color="blue"
          />
        </div>
      </div>

      <div className="mt-4">
        {!showConfirmEnd ? (
          <button 
            onClick={() => setShowConfirmEnd(true)}
            className="w-full py-3.5 border border-red-100 text-red-500 rounded-xl font-bold uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 transition-all"
          >
            <LogOut size={14} /> End Current Shift
          </button>
        ) : (
          <div className="bg-red-600 rounded-xl p-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2 text-white">
              <AlertCircle size={16} />
              <span className="text-[9px] font-bold uppercase tracking-tight">Clear session?</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirmEnd(false)} className="px-2.5 py-1 bg-white/20 text-white rounded-md text-[8px] font-bold uppercase">No</button>
              <button onClick={onEndShift} className="px-2.5 py-1 bg-white text-red-600 rounded-md text-[8px] font-bold uppercase">Yes</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-amber-50 p-3 rounded-xl border border-amber-100 flex gap-3">
        <ShieldAlert className="text-amber-600 shrink-0" size={16} />
        <p className="text-[8px] text-amber-800 leading-tight font-bold uppercase tracking-tight opacity-80">
          Data is live. End shift if your assigned route changes.
        </p>
      </div>
    </div>
  );
};

const StatusRow: React.FC<{ icon: React.ReactNode, label: string, value: string, active: boolean, color: string }> = ({ icon, label, value, active, color }) => (
  <div className="bg-white/80 backdrop-blur rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? `bg-${color}-100 text-${color}-600` : 'bg-gray-100 text-gray-400'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-[10px] font-bold text-gray-700">{value}</p>
    </div>
  </div>
);

export default ConductorDashboard;