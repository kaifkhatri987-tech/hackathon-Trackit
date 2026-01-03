import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Info, Bus, Route, X } from 'lucide-react';
import { DUMMY_ROUTES } from '../constants';

type RouteFilter = 'ALL' | 'BRT' | 'City';

const Schedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<RouteFilter>('ALL');

  const filteredRoutes = useMemo(() => {
    let query = searchTerm.toLowerCase().trim();
    if (query.includes('starlink')) query = query.replace('starlink', 'sitilink');
    if (query.includes('smartlink')) query = query.replace('smartlink', 'sitilink');
    
    const keywords = query.split(/\s+/).filter(k => k.length > 0 && k !== 'bus');

    return DUMMY_ROUTES.filter(route => {
      const searchableTerms = [
        route.name,
        route.id,
        route.origin,
        route.destination,
        route.description,
        route.type === 'BRT' ? 'brts brt corridor red bus' : 'city sitilink sitilink blue bus',
        'surat',
        'smc'
      ].join(' ').toLowerCase();

      if (query === 'bus' || keywords.length === 0) {
        return typeFilter === 'ALL' || route.type === typeFilter;
      }

      const matchesSearch = keywords.every(word => searchableTerms.includes(word));
      const matchesType = typeFilter === 'ALL' || route.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  return (
    <div className="p-5 bg-gray-50 h-full overflow-y-auto pb-24 no-scrollbar">
      <div className="mb-6 px-1">
        <h2 className="text-xl font-bold text-[#004A99] uppercase tracking-tight">Timetable</h2>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-6 h-0.5 bg-yellow-400 rounded-full"></span>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">SMC Sitilink Network</p>
        </div>
      </div>

      {/* Tighter Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Route or Area..."
          className="w-full pl-11 pr-10 py-3 bg-white border border-gray-100 rounded-xl shadow-sm outline-none transition-all font-bold text-xs text-gray-800 placeholder:text-gray-300"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Smaller Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar px-1">
        <FilterButton label="All" active={typeFilter === 'ALL'} onClick={() => setTypeFilter('ALL')} />
        <FilterButton label="BRTS" active={typeFilter === 'BRT'} onClick={() => setTypeFilter('BRT')} />
        <FilterButton label="City Bus" active={typeFilter === 'City'} onClick={() => setTypeFilter('City')} />
      </div>

      {/* Tighter Route List */}
      <div className="space-y-4">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <div key={route.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-blue-100 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${route.type === 'BRT' ? 'bg-[#E31E24]' : 'bg-[#004A99]'}`}>
                    <Bus size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950 uppercase tracking-tight text-sm">{route.name}</h3>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      {route.type === 'BRT' ? 'BRTS Corridor' : 'City Sitilink'}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-100 text-gray-400">
                  <Clock size={14} />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 p-2.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">From</p>
                  <p className="text-[10px] font-bold text-blue-900 truncate uppercase">{route.origin}</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 shrink-0" />
                <div className="flex-1 text-right min-w-0">
                  <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">To</p>
                  <p className="text-[10px] font-bold text-blue-900 truncate uppercase">{route.destination}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[8px] font-bold text-gray-400 uppercase tracking-widest pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <Info size={10} className="text-yellow-500" />
                  <span>{route.timing}</span>
                </div>
                <button className="text-[#004A99] bg-blue-50 px-2 py-1 rounded-md">
                  View Path
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-50">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border ${
      active 
        ? 'bg-[#004A99] text-white border-[#004A99] shadow-sm' 
        : 'bg-white text-gray-400 border-gray-100'
    }`}
  >
    {label}
  </button>
);

export default Schedule;