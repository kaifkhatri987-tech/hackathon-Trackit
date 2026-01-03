import React from 'react';
import { UserRole } from '../types';
import { GraduationCap, UserCog } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 bg-[#E8F8FB] overflow-y-auto py-8">
      <div className="mb-12 text-center">
        {/* Accurate Branded Logo from Image */}
        <div className="w-48 h-48 mx-auto mb-4 transform hover:scale-105 transition-transform duration-500 relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#082B5B" />
                <stop offset="40%" stopColor="#87A13C" />
                <stop offset="70%" stopColor="#9C3234" />
                <stop offset="100%" stopColor="#FFD100" />
              </linearGradient>
            </defs>
            
            {/* The Gradient Ring */}
            <circle cx="100" cy="100" r="85" fill="white" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="url(#ringGradient)" strokeWidth="8" />
            
            {/* The Dotted Path & Small Pins */}
            <path d="M40,110 Q70,120 90,105 T160,130" fill="none" stroke="#90C665" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="45" cy="108" r="3" fill="#3D85C6" />
            <circle cx="85" cy="120" r="3" fill="#3D85C6" />
            <circle cx="150" cy="115" r="3" fill="#90C665" />
            <circle cx="160" cy="130" r="3" fill="#2D8653" />

            {/* The Bus - Front View */}
            <g transform="translate(60, 55)">
              {/* Signal Waves */}
              <path d="M30,10 Q40,0 50,10" fill="none" stroke="#3D85C6" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35,15 Q40,10 45,15" fill="none" stroke="#3D85C6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="18" r="1.5" fill="#3D85C6" />

              {/* Body */}
              <rect x="10" y="25" width="60" height="60" rx="8" fill="#3D85C6" />
              <rect x="14" y="29" width="52" height="35" rx="4" fill="#F0F4F8" /> {/* Windshield */}
              
              {/* Details */}
              <rect x="10" y="68" width="60" height="3" fill="#CC0000" /> {/* Red Stripe */}
              <rect x="30" y="75" width="20" height="4" rx="1" fill="#2A5A84" /> {/* Grill */}
              <circle cx="20" cy="78" r="3" fill="#FFFF00" /> {/* Left Light */}
              <circle cx="60" cy="78" r="3" fill="#FFFF00" /> {/* Right Light */}
              
              {/* Mirrors */}
              <rect x="5" y="40" width="4" height="12" rx="2" fill="#2A5A84" />
              <rect x="71" y="40" width="4" height="12" rx="2" fill="#2A5A84" />
              
              {/* Wheels/Base */}
              <rect x="20" y="85" width="10" height="5" rx="1" fill="#2A5A84" />
              <rect x="50" y="85" width="10" height="5" rx="1" fill="#2A5A84" />
            </g>
          </svg>
        </div>

        <h2 className="text-4xl font-poppins font-black text-[#1B528A] uppercase tracking-tighter mb-1">TRACKIT</h2>
        <p className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">LIVE BUS TRACKER</p>
      </div>

      <div className="w-full space-y-3 max-w-[300px] mb-12">
        <button
          onClick={() => onSelect(UserRole.PASSENGER)}
          className="group w-full p-5 bg-white border border-gray-100 hover:border-[#3D85C6] rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#3D85C6] group-hover:bg-[#3D85C6] group-hover:text-white transition-all">
            <GraduationCap size={24} />
          </div>
          <div className="text-left font-poppins">
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-tight">Passenger</h3>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Track your commute</p>
          </div>
        </button>

        <button
          onClick={() => onSelect(UserRole.CONDUCTOR)}
          className="group w-full p-5 bg-white border border-gray-100 hover:border-emerald-600 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <UserCog size={24} />
          </div>
          <div className="text-left font-poppins">
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-tight">Conductor</h3>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Manage active trip</p>
          </div>
        </button>
      </div>

      <div className="text-center space-y-6">
        <div className="flex justify-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#1B528A] rounded-full"></span>
          <span className="w-2.5 h-2.5 bg-[#FFD100] rounded-full"></span>
          <span className="w-2.5 h-2.5 bg-[#9C3234] rounded-full"></span>
        </div>
        <p className="text-2xl font-black text-[#1B528A] leading-tight tracking-tight px-4 opacity-90">
          "Your Journey,<br/>Our Priority."
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;