import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Bus, Navigation, X, CheckCircle2, Clock, ZoomIn, ZoomOut, Search, ChevronRight } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import { DUMMY_ROUTES } from '../constants';

// Declare Leaflet globally since it's loaded via CDN
declare const L: any;

const LiveMap: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState(DUMMY_ROUTES[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [busPos, setBusPos] = useState({ lat: 21.1752, lng: 72.8351 });
  const [showDetails, setShowDetails] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const busMarker = useRef<any>(null);
  const userMarker = useRef<any>(null);

  // Filter routes based on search
  const filteredRoutes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return DUMMY_ROUTES.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.id.toLowerCase().includes(q) ||
      r.origin.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Center on Surat
    leafletMap.current = L.map(mapRef.current).setView([21.1702, 72.8311], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
      userAgentPackageName: 'com.suratbus.hackathon'
    }).addTo(leafletMap.current);

    // Create User Marker
    const userIcon = L.divIcon({
      html: `<div class="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
      className: 'custom-user-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    userMarker.current = L.marker([21.1650, 72.8250], { icon: userIcon }).addTo(leafletMap.current);

    // Create Bus Marker with Branded SVG
    const busIcon = L.divIcon({
      html: `
        <div class="flex flex-col items-center">
          <div id="bus-label" class="mb-1 whitespace-nowrap bg-[#0B1522] text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xl border border-white/10">
            ${selectedRoute.id} - LIVE
          </div>
          <div class="relative w-11 h-11 bg-white p-1 rounded-xl shadow-2xl border border-gray-100 flex items-center justify-center">
             <svg viewBox="0 0 100 100" class="w-full h-full">
                <g transform="translate(10, 10) scale(1)">
                  <path d="M30,5 Q40,-5 50,5" fill="none" stroke="#3D85C6" stroke-width="3" stroke-linecap="round" />
                  <rect x="10" y="20" width="60" height="60" rx="8" fill="#3D85C6" />
                  <rect x="14" y="24" width="52" height="35" rx="4" fill="#F0F4F8" />
                  <rect x="10" y="63" width="60" height="3" fill="#CC0000" />
                  <circle cx="20" cy="73" r="3" fill="#FFFF00" />
                  <circle cx="60" cy="73" r="3" fill="#FFFF00" />
                  <rect x="20" y="80" width="10" height="4" rx="1" fill="#2A5A84" />
                  <rect x="50" y="80" width="10" height="4" rx="1" fill="#2A5A84" />
                </g>
             </svg>
          </div>
        </div>
      `,
      className: 'custom-bus-marker',
      iconSize: [80, 80],
      iconAnchor: [40, 60]
    });
    busMarker.current = L.marker([busPos.lat, busPos.lng], { icon: busIcon }).addTo(leafletMap.current);

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Update marker label when route changes
  useEffect(() => {
    if (busMarker.current) {
      const el = document.getElementById('bus-label');
      if (el) el.innerText = `${selectedRoute.id} - LIVE`;
    }
  }, [selectedRoute]);

  // Sync Bus Position
  useEffect(() => {
    if (busMarker.current) {
      busMarker.current.setLatLng([busPos.lat, busPos.lng]);
    }
  }, [busPos]);

  // Simulated live movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusPos(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0003,
        lng: prev.lng + (Math.random() - 0.5) * 0.0003
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleZoom = (delta: number) => {
    if (leafletMap.current) {
      const currentZoom = leafletMap.current.getZoom();
      leafletMap.current.setZoom(currentZoom + delta);
    }
  };

  const handleRecenter = () => {
    if (leafletMap.current) {
      leafletMap.current.setView([busPos.lat, busPos.lng], 15);
    }
  };

  const selectRoute = (r: typeof DUMMY_ROUTES[0]) => {
    setSelectedRoute(r);
    setIsSearching(false);
    setSearchQuery('');
    // Snap to bus
    setBusPos({ lat: 21.1702 + (Math.random() - 0.5) * 0.01, lng: 72.8311 + (Math.random() - 0.5) * 0.01 });
  };

  const routeStops = [
    { name: selectedRoute.origin, time: 'Completed', status: 'past' },
    { name: 'Intermediate Hub', time: 'Completed', status: 'past' },
    { name: 'Current Point', time: 'Live', status: 'next' },
    { name: selectedRoute.destination, time: '12 Mins', status: 'future' },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-[#E8EAED] font-poppins select-none">
      <ChatWidget />

      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[60] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-2 border border-gray-100 pointer-events-auto">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 shadow-inner">
            <Bus size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs text-blue-900 uppercase tracking-tight truncate">{selectedRoute.name}</h4>
            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest truncate">{selectedRoute.origin} ➔ {selectedRoute.destination}</p>
          </div>
          
          <button 
            onClick={() => setIsSearching(true)}
            className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-[#004A99] hover:bg-blue-50 transition-colors border border-gray-100 shadow-sm"
          >
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {isSearching && (
        <div className="fixed inset-0 z-[1000] flex flex-col justify-end">
          <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm pointer-events-auto" onClick={() => setIsSearching(false)} />
          <div className="relative w-full max-w-md mx-auto bg-white rounded-t-3xl h-3/4 flex flex-col animate-slide-up shadow-2xl pointer-events-auto">
            <div className="p-5 pb-3 flex items-center justify-between border-b">
              <div>
                <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter">Find a Bus</h3>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Search all SMC Sitilink Routes</p>
              </div>
              <button onClick={() => setIsSearching(false)} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Route No. or Destination..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-blue-500 transition-all font-bold text-xs"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar pb-10">
              {filteredRoutes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => selectRoute(r)}
                  className="w-full p-4 rounded-xl flex items-center gap-3 border border-gray-50 hover:border-blue-100 bg-white transition-all text-left"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm ${r.type === 'BRT' ? 'bg-[#E31E24]' : 'bg-[#004A99]'}`}>
                    <Bus size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-950 uppercase tracking-tight text-xs">{r.name}</h4>
                    <p className="text-[9px] font-bold text-gray-400 truncate">{r.origin} ➔ {r.destination}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="flex-1 relative z-10"></div>

      {/* Floating Controls */}
      <div className="absolute bottom-[280px] right-3 flex flex-col gap-2 z-[60]">
        <div className="flex flex-col bg-white rounded-xl shadow-xl border border-gray-100 divide-y overflow-hidden">
          <button onClick={() => handleZoom(1)} className="w-10 h-10 flex items-center justify-center text-blue-900 hover:bg-gray-50 transition-colors">
            <ZoomIn size={18} strokeWidth={2.5} />
          </button>
          <button onClick={() => handleZoom(-1)} className="w-10 h-10 flex items-center justify-center text-blue-900 hover:bg-gray-50 transition-colors">
            <ZoomOut size={18} strokeWidth={2.5} />
          </button>
        </div>
        <button onClick={handleRecenter} className="w-10 h-10 bg-white rounded-xl shadow-xl flex items-center justify-center text-blue-900 hover:bg-gray-50 transition-all border border-gray-100 active:scale-90">
          <Navigation size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Info Card Footer */}
      <div className="bg-white p-4 shadow-[0_-15px_45px_-15px_rgba(0,0,0,0.2)] rounded-t-3xl border-t border-gray-100 z-[70] relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-blue-950 uppercase tracking-tight">{selectedRoute.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className="w-6 h-0.5 bg-yellow-400 rounded-full"></span>
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">LIVE TRACKING</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-bold rounded-full uppercase tracking-widest border border-emerald-100">ON TIME</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100">
            <p className="text-[8px] text-blue-400 uppercase font-bold mb-0.5 tracking-widest">Est. Arrival</p>
            <p className="font-bold text-lg text-blue-900">4 Mins</p>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
            <p className="text-[8px] text-gray-400 uppercase font-bold mb-0.5 tracking-widest">Next Major Hub</p>
            <p className="font-bold text-base text-gray-800 truncate">{selectedRoute.destination}</p>
          </div>
        </div>

        <button 
          onClick={() => setShowDetails(true)}
          className="w-full bg-[#004A99] text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-blue-900 transition-all active:scale-[0.98] uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border-b-2 border-blue-950"
        >
          View Timeline
        </button>
      </div>

      {/* Detailed Route Bottom Sheet */}
      {showDetails && (
        <>
          <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm z-[80] transition-opacity duration-300" onClick={() => setShowDetails(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[90] p-6 pt-3 animate-slide-up max-h-[85%] overflow-y-auto no-scrollbar">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-blue-950 uppercase tracking-tight">Route Tracker</h2>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live Corridor {selectedRoute.id} Schedule</p>
              </div>
              <button onClick={() => setShowDetails(false)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 px-1 relative">
              <div className="absolute left-[16px] top-4 bottom-4 w-1 bg-gray-100 rounded-full"></div>
              {routeStops.map((stop, index) => (
                <div key={index} className="flex gap-5 items-start relative z-10">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border-2 border-white ${
                    stop.status === 'past' ? 'bg-emerald-500 text-white' : 
                    stop.status === 'next' ? 'bg-blue-600 text-white animate-pulse' : 
                    'bg-white text-gray-200 border-gray-100'
                  }`}>
                    {stop.status === 'past' ? <CheckCircle2 size={16} /> : <MapPin size={16} />}
                  </div>
                  <div className={`flex-1 p-3 rounded-xl border transition-all ${
                    stop.status === 'next' ? 'bg-blue-50 border-blue-100' : 'bg-transparent border-transparent'
                  }`}>
                    <h4 className={`font-bold uppercase tracking-tight text-xs ${stop.status === 'past' ? 'text-gray-300' : 'text-blue-950'}`}>{stop.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={10} className={stop.status === 'past' ? 'text-gray-200' : 'text-gray-400'} />
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${stop.status === 'past' ? 'text-gray-200' : 'text-gray-400'}`}>{stop.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LiveMap;