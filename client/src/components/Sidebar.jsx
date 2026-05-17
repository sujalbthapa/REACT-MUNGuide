import React from 'react';
import { LayoutDashboard, Swords, Scale, Users, Briefcase, Globe, Shield, Search, Sparkles, Book, Landmark, Brain } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "group w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 relative overflow-hidden",
      active 
        ? "bg-navy-800 text-white border-l-4 border-blue-500 shadow-2xl shadow-black/20" 
        : "text-slate-400 hover:bg-navy-800/50 hover:text-slate-200"
    )}
  >
    <Icon className={cn(
      "w-5 h-5 transition-transform duration-500 group-hover:scale-110",
      active ? "text-blue-400" : "group-hover:text-blue-300"
    )} />
    
    <div className="flex flex-col items-start text-left">
      <span className={cn(
        "font-black text-[10px] uppercase tracking-[0.2em] leading-none",
        active ? "text-white" : "text-slate-400 group-hover:text-slate-200"
      )}>
        {label}
      </span>
    </div>

    {active && (
      <div className="ml-auto flex items-center gap-1">
        <div className="w-1 h-1 bg-blue-50" />
      </div>
    )}
  </button>
);

export default function Sidebar({ activeSection, setActiveSection, isOpen, toggleSidebar }) {
  const menuItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Overview' },
    { id: 'wars', icon: Swords, label: 'Active Conflicts' },
    { id: 'advisor', icon: Brain, label: 'Legal & Concept Research' },
    { id: 'law', icon: Scale, label: 'International Law' },
    { id: 'constitutions', icon: Landmark, label: 'Constitutions' },
    { id: 'blocs', icon: Users, label: 'Global Actors' },
    { id: 'toolkit', icon: Briefcase, label: 'Delegate Toolkit' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-navy-900/60 backdrop-blur-md z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-navy-900 text-slate-300 transform transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:block border-r border-white/5 shadow-2xl",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-white/5 relative overflow-hidden group">
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 shadow-inner">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="font-black text-white text-xl tracking-tighter uppercase leading-none italic">
                  UNSC<span className="text-blue-500">.PORTAL</span>
                </h1>
                <p className="text-[9px] uppercase font-black text-slate-500 tracking-[0.3em] mt-1">
                  Research Dashboard
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 py-6 overflow-y-auto">
            <div className="px-6 mb-4">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">
                NAVIGATE
              </p>
            </div>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                active={activeSection === item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              />
            ))}
          </nav>

          <div className="p-6 bg-black/20 border-t border-white/5">
            <div className="p-5 border border-white/5 relative bg-navy-900/50">
              <div className="space-y-3 text-center">
                <div className="flex justify-between text-[8px] font-black uppercase tracking-tighter">
                  <span className="text-slate-500">System Link</span>
                  <span className="text-blue-500">CONNECTED</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="w-[100%] h-full bg-blue-600" />
                </div>
                <p className="text-slate-500 text-[8px] font-black uppercase">Official Study Guide</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
