
import React from 'react';
import { NavigationTab, UserRole } from '../types';
import { Map, Clock, User, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  role: UserRole;
  onResetRole: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role, onResetRole }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden border-x border-gray-200">
      {/* Header - SMC Blue */}
      <header className="bg-[#004A99] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          {role !== UserRole.NONE && (
            <button onClick={onResetRole} className="p-1 hover:bg-blue-800 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="font-bold text-lg leading-tight">Trackit</h1>
            <span className="text-[10px] text-yellow-400 font-bold tracking-widest uppercase">Sitilink | BRTS</span>
          </div>
        </div>
        <div className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded text-[10px] font-black uppercase">
          {role}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-gray-50">
        {children}
      </main>

      {/* Bottom Navigation */}
      {role !== UserRole.NONE && (
        <nav className="bg-white border-t border-gray-200 px-8 py-3 flex justify-between items-center shadow-lg">
          <NavItem 
            icon={<Map size={24} />} 
            label="Live" 
            active={activeTab === NavigationTab.HOME} 
            onClick={() => setActiveTab(NavigationTab.HOME)} 
          />
          <NavItem 
            icon={<Clock size={24} />} 
            label="Schedule" 
            active={activeTab === NavigationTab.SCHEDULE} 
            onClick={() => setActiveTab(NavigationTab.SCHEDULE)} 
          />
          <NavItem 
            icon={<User size={24} />} 
            label="Profile" 
            active={activeTab === NavigationTab.PROFILE} 
            onClick={() => setActiveTab(NavigationTab.PROFILE)} 
          />
        </nav>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#004A99] scale-110' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;
