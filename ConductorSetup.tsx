import React, { useState, useRef, useMemo } from 'react';
import { User, ShieldCheck, ArrowRight, Smartphone, Camera, X, Check, Bus, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import Avatar from '../components/Avatar';
import { DUMMY_ROUTES } from '../constants';

interface ConductorSetupProps {
  onComplete: (name: string, phone: string, image: string | undefined, themeColor: string, route: string) => void;
  onBack: () => void;
}

const PALETTE = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 
  'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 
  'bg-cyan-500', 'bg-fuchsia-500', 'bg-orange-500', 'bg-teal-500'
];

const ConductorSetup: React.FC<ConductorSetupProps> = ({ onComplete, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState(PALETTE[5]); // Default indigo
  const [error, setError] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [routeSearch, setRouteSearch] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredRoutes = useMemo(() => {
    const query = routeSearch.toLowerCase();
    return DUMMY_ROUTES.filter(r => 
      r.name.toLowerCase().includes(query) || 
      r.id.toLowerCase().includes(query) ||
      r.origin.toLowerCase().includes(query) ||
      r.destination.toLowerCase().includes(query)
    );
  }, [routeSearch]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !route) {
      setError('Official Name, Phone, and Route selection are required.');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    onComplete(name, phone, image, selectedColor, route);
  };

  return (
    <div className="h-full flex flex-col p-8 bg-gray-50 overflow-y-auto pb-20 font-poppins relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-500 hover:text-blue-900 transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="mb-8 text-center mt-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl mb-4 border-2 border-white">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-xl font-black text-blue-950 uppercase tracking-tight">Conductor Identity</h2>
        <p className="mt-1 text-[9px] text-blue-800 font-black uppercase tracking-widest bg-blue-100/50 inline-block px-3 py-1 rounded-full">SMC Sitilink Official Personnel</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
        
        <div className="flex flex-col items-center mb-2">
          <div className="relative mb-4">
            <Avatar name={name || "C"} image={image} themeColor={selectedColor} size="lg" className="border-4 border-blue-50" />
            <button 
              type="button"
              onClick={() => image ? setImage(undefined) : fileInputRef.current?.click()}
              className={`absolute bottom-0 right-0 p-1.5 rounded-full shadow-lg border-2 border-white transition-all ${image ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
            >
              {image ? <X size={14} /> : <Camera size={14} />}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {!image && (
            <div className="w-full">
              <p className="text-[9px] font-black text-gray-400 uppercase text-center mb-2 tracking-widest">Select ID Theme Color</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {PALETTE.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full ${color} border-2 transition-all flex items-center justify-center ${selectedColor === color ? 'border-blue-900 scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    {selectedColor === color && <Check size={12} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-blue-900 uppercase tracking-widest ml-1">Official Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/60" size={14} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-blue-900 uppercase tracking-widest ml-1">Mobile Number</label>
          <div className="relative">
            <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/60" size={14} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-blue-900 uppercase tracking-widest ml-1">Current Active Route</label>
          <button
            type="button"
            onClick={() => setIsSelectorOpen(true)}
            className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between hover:border-blue-400 transition-all text-left"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Bus size={16} className="text-blue-900/60 flex-shrink-0" />
              <span className={`font-bold text-xs truncate ${route ? 'text-blue-900' : 'text-gray-400'}`}>
                {route ? `Selected: ${route}` : 'Choose Your Active Route ID'}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
          <p className="text-[8px] text-gray-400 font-bold px-1 italic uppercase tracking-tighter">* All passengers on this route will see your updates</p>
        </div>

        {error && (
          <p className="text-[9px] text-red-700 font-black bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2 uppercase tracking-tight">
            <ShieldCheck size={12} /> {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#004A99] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-[10px] active:scale-95 border-b-2 border-blue-950"
        >
          Verify & Log In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Route Selector Modal */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-[2000] flex flex-col justify-end">
          <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={() => setIsSelectorOpen(false)} />
          <div className="relative w-full max-w-md mx-auto bg-white rounded-t-3xl h-4/5 flex flex-col animate-slide-up shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 pb-3 flex items-center justify-between border-b">
              <div>
                <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter">Current Active Routes</h3>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Select your assigned trip</p>
              </div>
              <button 
                onClick={() => setIsSelectorOpen(false)}
                className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  value={routeSearch}
                  onChange={(e) => setRouteSearch(e.target.value)}
                  placeholder="Search Route ID..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-blue-500 transition-all font-bold text-xs"
                />
              </div>
            </div>

            {/* Modal List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar pb-10">
              {filteredRoutes.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRoute(r.name);
                    setIsSelectorOpen(false);
                    setRouteSearch('');
                  }}
                  className={`w-full p-4 rounded-xl flex items-center gap-3 border transition-all ${
                    route === r.name ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-50 hover:border-gray-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm ${
                    r.type === 'BRT' ? 'bg-[#E31E24]' : 'bg-[#004A99]'
                  }`}>
                    <Bus size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-blue-950 uppercase tracking-tight text-xs">{r.name}</h4>
                      <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                        r.type === 'BRT' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {r.type}
                      </span>
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 truncate mt-0.5">
                      {r.origin} ➔ {r.destination}
                    </p>
                  </div>
                  {route === r.name && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
              {filteredRoutes.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">No matching routes</p>
                </div>
              )}
            </div>
          </div>
        </div>
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
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ConductorSetup;