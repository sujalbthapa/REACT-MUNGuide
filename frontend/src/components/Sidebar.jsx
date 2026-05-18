import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Swords, Scale, Briefcase, Book, BookOpen, Landmark, LayoutGrid, Globe2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const SidebarItem = ({ icon: Icon, label, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "group w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 relative overflow-hidden",
      isActive 
        ? "bg-[#009EDB]/10 text-white border-l-4 border-[#009EDB] shadow-2xl shadow-[#009EDB]/10" 
        : "text-slate-400 hover:bg-[#009EDB]/5 hover:text-slate-200"
    )}
  >
    <Icon className={cn(
      "w-5 h-5 transition-transform duration-500 group-hover:scale-110",
      "group-[.active]:text-[#009EDB] group-hover:text-[#009EDB]"
    )} />
    
    <div className="flex flex-col items-start text-left">
      <span className={cn(
        "font-black text-[10px] uppercase tracking-[0.2em] leading-none transition-colors",
        "group-[.active]:text-white group-hover:text-slate-200"
      )}>
        {label}
      </span>
    </div>
  </NavLink>
);

export default function Sidebar({ isOpen, toggleSidebar }) {
  const menuItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Overview', to: '/' },
    { id: 'wars', icon: Swords, label: 'Active Conflicts', to: '/conflicts' },
    { id: 'matrix', icon: LayoutGrid, label: 'Committee Matrix', to: '/matrix' },
    { id: 'una-rules', icon: Book, label: 'UNA-USA Rules', to: '/una-rules' },
    { id: 'documentations', icon: BookOpen, label: 'Documentations', to: '/documentations' },
    { id: 'law', icon: Scale, label: 'International Law', to: '/law' },
    { id: 'constitutions', icon: Landmark, label: 'Constitutions', to: '/constitutions' },
    { id: 'blocs', icon: Globe2, label: 'Global Blocs', to: '/blocs' },
    { id: 'study', icon: Briefcase, label: 'Study Guidelines', to: '/study' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#003366]/60 backdrop-blur-md z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#001E3D] text-slate-300 transform transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:block border-r border-white/5 shadow-2xl",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* UN Institutional Header */}
          <div className="p-8 border-b border-white/5 relative overflow-hidden group bg-black/10">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white flex items-center justify-center p-1.5 shadow-xl border border-white/10">
                <img 
                  src="https://www.un.org/sites/un2.un.org/files/un_logo.png" 
                  alt="UN Emblem" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-black text-white text-xl tracking-tighter uppercase leading-none italic">
                  UNSC<span className="text-[#009EDB]">.PORTAL</span>
                </h1>
                <p className="text-[9px] uppercase font-black text-[#009EDB]/70 tracking-[0.3em] mt-1">
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
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              />
            ))}
          </nav>

          <div className="p-6 bg-black/20 border-t border-white/5">
            <div className="text-center text-slate-400 text-[10px] font-medium leading-relaxed">
              <p>Biratnagar Rotaract MUN 2026</p>
              <p>United Nations Security Council</p>
              <p className="font-bold text-white mt-2">Sujal Bikram Thapa</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
