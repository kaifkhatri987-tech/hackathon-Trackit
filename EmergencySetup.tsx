import React, { useState, useRef } from 'react';
import { User, Phone, ShieldAlert, ArrowRight, Mail, Smartphone, Camera, X, Check, ChevronLeft } from 'lucide-react';
import { EmergencyContact } from '../types';
import Avatar from '../components/Avatar';

interface EmergencySetupProps {
  onComplete: (passengerName: string, passengerPhone: string, passengerImage: string | undefined, themeColor: string, contact: EmergencyContact) => void;
  onBack: () => void;
}

const PALETTE = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 
  'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 
  'bg-cyan-500', 'bg-fuchsia-500', 'bg-orange-500', 'bg-teal-500'
];

const EmergencySetup: React.FC<EmergencySetupProps> = ({ onComplete, onBack }) => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerImage, setPassengerImage] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassengerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate mandatory fields
    if (!passengerName || !passengerPhone || !contactName || !contactPhone) {
      setError('Name and Mobile fields are required.');
      return;
    }
    if (passengerPhone.length < 10 || contactPhone.length < 10) {
      setError('Please enter valid 10-digit mobile numbers.');
      return;
    }
    // Optional email validation
    if (contactEmail && !contactEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    onComplete(passengerName, passengerPhone, passengerImage, selectedColor, { 
      name: contactName, 
      phone: contactPhone, 
      email: contactEmail || '' 
    });
  };

  return (
    <div className="h-full flex flex-col p-8 bg-gray-50 overflow-y-auto pb-20 no-scrollbar relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-500 hover:text-blue-900 transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="mb-6 text-center mt-8">
        <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl mb-4 border-2 border-white">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-black text-blue-950 uppercase tracking-tight">Passenger Profile</h2>
        <p className="mt-1 text-[10px] text-blue-800 font-black uppercase tracking-widest bg-blue-100/50 inline-block px-3 py-1 rounded-full">Secure your commute in Surat</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4 bg-white p-5 rounded-3xl shadow-xl border border-gray-100">
        
        {/* Profile Image & Color Section */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-4">
            <Avatar name={passengerName || "P"} image={passengerImage} themeColor={selectedColor} size="lg" className="border-4 border-blue-50" />
            <button 
              type="button"
              onClick={() => passengerImage ? setPassengerImage(undefined) : fileInputRef.current?.click()}
              className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg border-2 border-white transition-all ${passengerImage ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
            >
              {passengerImage ? <X size={14} /> : <Camera size={14} />}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {!passengerImage && (
            <div className="w-full">
              <p className="text-[9px] font-black text-gray-400 uppercase text-center mb-2 tracking-widest">Choose Your Theme Color</p>
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
          <label className="text-[9px] font-black text-blue-900 uppercase tracking-widest ml-1">Your Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/60" size={14} />
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="e.g. Yash Patel"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-blue-900 uppercase tracking-widest ml-1">Your Mobile Number</label>
          <div className="relative">
            <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/60" size={14} />
            <input
              type="tel"
              value={passengerPhone}
              onChange={(e) => setPassengerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit Mobile No."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 my-1"></div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-red-700 uppercase tracking-widest ml-1">Emergency Contact Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-700/60" size={14} />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Guardian's Name"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-red-700 uppercase tracking-widest ml-1">Contact WhatsApp No.</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-700/60" size={14} />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Guardian's WhatsApp"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[9px] font-black text-red-700 uppercase tracking-widest">Contact Email</label>
            <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full">Optional</span>
          </div>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-700/60" size={14} />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Guardian's Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-600 focus:bg-white outline-none transition-all font-bold text-xs text-gray-800"
            />
          </div>
        </div>

        {error && (
          <p className="text-[9px] text-red-700 font-black bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2 uppercase tracking-tight">
            <ShieldAlert size={12} /> {error}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#004A99] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-[10px] active:scale-95 border-b-2 border-blue-950"
          >
            Finish Setup <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencySetup;