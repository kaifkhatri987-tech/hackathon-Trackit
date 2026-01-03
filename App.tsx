import React, { useState, useEffect } from 'react';
import { UserRole, NavigationTab, EmergencyContact, UserProfile } from './types';
import Layout from './components/Layout';
import RoleSelection from './screens/RoleSelection';
import EmergencySetup from './screens/EmergencySetup';
import ConductorSetup from './screens/ConductorSetup';
import LiveMap from './screens/LiveMap';
import ConductorDashboard from './screens/ConductorDashboard';
import Schedule from './screens/Schedule';
import Avatar from './components/Avatar';
import { 
  Mail, Phone, ShieldCheck, AlertTriangle, 
  ShieldAlert, MessageCircle, Loader2,
  Smartphone, LogOut, Bus
} from 'lucide-react';

const STORAGE_KEY = 'trackit_user_data';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.NONE);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.HOME);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const { role: savedRole, profile: savedProfile, emergencyContact: savedContact, timestamp } = parsed;

        if (savedRole === UserRole.CONDUCTOR) {
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;
          if (now - timestamp > oneDay) {
            setRole(UserRole.CONDUCTOR);
            setNeedsSetup(true);
          } else {
            setRole(savedRole);
            setProfile(savedProfile);
            setNeedsSetup(false);
          }
        } else if (savedRole === UserRole.PASSENGER) {
          if (savedProfile && savedProfile.name) {
            setRole(savedRole);
            setProfile(savedProfile);
            setEmergencyContact(savedContact);
            setNeedsSetup(false);
          } else {
            setRole(UserRole.PASSENGER);
            setNeedsSetup(true);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setNeedsSetup(true);
  };

  const handlePassengerSetupComplete = (name: string, phone: string, image: string | undefined, themeColor: string, contact: EmergencyContact) => {
    const newProfile = { name, phone, profileImage: image, themeColor };
    setProfile(newProfile);
    setEmergencyContact(contact);
    setNeedsSetup(false);
    setActiveTab(NavigationTab.HOME);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      role: UserRole.PASSENGER, profile: newProfile, emergencyContact: contact, timestamp: Date.now()
    }));
  };

  const handleConductorSetupComplete = (name: string, phone: string, image: string | undefined, themeColor: string, route: string) => {
    const newProfile = { name, phone, profileImage: image, themeColor, assignedRoute: route };
    setProfile(newProfile);
    setNeedsSetup(false);
    setActiveTab(NavigationTab.HOME);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      role: UserRole.CONDUCTOR, profile: newProfile, timestamp: Date.now()
    }));
  };

  const handleEndShift = () => {
    setNeedsSetup(true);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const resetRole = () => {
    setRole(UserRole.NONE);
    setNeedsSetup(false);
    setProfile(null);
    setEmergencyContact(null);
    setActiveTab(NavigationTab.HOME);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!isInitialized) return null;
  if (role === UserRole.NONE) return <RoleSelection onSelect={handleRoleSelect} />;
  if (needsSetup) {
    return role === UserRole.PASSENGER ? (
      <EmergencySetup onComplete={handlePassengerSetupComplete} onBack={resetRole} />
    ) : (
      <ConductorSetup onComplete={handleConductorSetupComplete} onBack={resetRole} />
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case NavigationTab.HOME:
        return role === UserRole.PASSENGER ? <LiveMap /> : <ConductorDashboard onEndShift={handleEndShift} />;
      case NavigationTab.SCHEDULE:
        return <Schedule />;
      case NavigationTab.PROFILE:
        return <ProfileScreen role={role} profile={profile} emergencyContact={emergencyContact} onLogout={resetRole} />;
      default:
        return <LiveMap />;
    }
  };

  return (
    <Layout role={role} activeTab={activeTab} setActiveTab={setActiveTab} onResetRole={resetRole}>
      {renderScreen()}
    </Layout>
  );
};

const ProfileScreen: React.FC<{ role: UserRole, profile: UserProfile | null, emergencyContact: EmergencyContact | null, onLogout: () => void }> = ({ role, profile, emergencyContact, onLogout }) => {
  const [sosStatus, setSosStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');
  
  const triggerSOS = () => {
    if (!emergencyContact) return;
    setSosStatus('SENDING');
    setTimeout(() => setSosStatus('SENT'), 2000);
    setTimeout(() => setSosStatus('IDLE'), 6000);
  };

  return (
    <div className="p-5 bg-gray-50 h-full overflow-y-auto pb-20 no-scrollbar">
      <div className="mb-6 px-1">
        <h2 className="text-xl font-bold text-[#004A99] uppercase tracking-tight">Account</h2>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-6 h-0.5 bg-yellow-400 rounded-full"></span>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">SMC Profile</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-sm mb-6 border border-gray-100">
        <Avatar 
          name={profile?.name || "U"} 
          image={profile?.profileImage} 
          themeColor={profile?.themeColor}
          size="md" 
          className="mb-3" 
        />
        <h3 className="text-base font-bold text-blue-900 uppercase tracking-tight">{profile?.name || 'User'}</h3>
        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{role === UserRole.PASSENGER ? 'Passenger Member' : `Official • ${profile?.assignedRoute}`}</p>
        
        <div className="w-full mt-6 space-y-2">
          <ProfileItem icon={<Smartphone size={14} />} label="Mobile" value={`+91 ${profile?.phone}`} />
          <ProfileItem icon={<ShieldCheck size={14} />} label="Security" value="SMC Verified" />
        </div>
      </div>

      {role === UserRole.PASSENGER && emergencyContact && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-red-50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-tight">Security SOS</h4>
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Guardian Alerts</p>
            </div>
            <ShieldAlert size={18} className="text-red-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
             <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
               <p className="text-[6px] text-gray-400 font-bold uppercase tracking-widest">Guardian</p>
               <p className="text-[10px] font-bold text-gray-700 truncate">{emergencyContact.name}</p>
             </div>
             <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
               <p className="text-[6px] text-gray-400 font-bold uppercase tracking-widest">WhatsApp</p>
               <p className="text-[10px] font-bold text-gray-700 truncate">{emergencyContact.phone}</p>
             </div>
          </div>

          <button
            onClick={triggerSOS}
            disabled={sosStatus !== 'IDLE'}
            className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-sm transition-all flex items-center justify-center gap-2 ${
              sosStatus === 'IDLE' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {sosStatus === 'IDLE' ? <><AlertTriangle size={14} /> Send SOS</> : 'Transmitting...'}
          </button>
        </div>
      )}

      <button onClick={onLogout} className="w-full py-3 bg-white text-red-500 font-bold rounded-xl border border-red-50 text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
        <LogOut size={14} /> Logout Session
      </button>
    </div>
  );
};

const ProfileItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-[6px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-[10px] font-bold text-blue-900 uppercase tracking-tight">{value}</p>
    </div>
  </div>
);

export default App;