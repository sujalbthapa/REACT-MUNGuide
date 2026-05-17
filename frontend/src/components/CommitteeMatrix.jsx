import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldAlert, Target, Globe, X, 
  ChevronRight, Search, LayoutGrid, Info, 
  ShieldCheck, MapPin, Activity,
  Landmark, History, Flag, FileText,
  Briefcase, Layers, ExternalLink, Menu,
  Coins, Users as UserGroupIcon, ShieldAlert as ShieldX, Globe as Network
} from 'lucide-react';
import { matrixData } from '../data/mockData';

export default function CommitteeMatrix() {
  const [selectedActor, setSelectedActor] = useState(matrixData && matrixData.length > 0 ? matrixData[0] : null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRosterOpen, setIsRosterOpen] = useState(false);

  const filteredActors = (matrixData || []).filter(actor => 
    actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actor.alignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const p5 = filteredActors.filter(a => a.type.includes('P5'));
  const nonPermanent = filteredActors.filter(a => a.type.includes('Non-Permanent'));
  const observers = filteredActors.filter(a => a.type.includes('Observer'));

  const RosterItem = ({ actor }) => (
    <button
      onClick={() => { setSelectedActor(actor); setIsRosterOpen(false); }}
      className={`w-full text-left px-5 py-3.5 transition-all border-l-4 flex flex-col gap-1 relative group ${
        selectedActor && selectedActor.id === actor.id 
        ? 'bg-[#009EDB]/5 border-[#009EDB] text-[#001E3D]' 
        : 'border-transparent text-slate-500 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <img src={actor.flag} alt="" className="w-5 h-3 object-cover shadow-sm border border-black/5" />
            <span className={`text-[11px] font-black uppercase tracking-widest leading-none ${selectedActor?.id === actor.id ? 'text-[#009EDB]' : 'group-hover:text-[#009EDB]'}`}>
               {actor.name}
            </span>
         </div>
         {selectedActor?.id === actor.id && <div className="w-1.5 h-1.5 bg-[#009EDB] rounded-full" />}
      </div>
      <div className="flex items-center gap-2 pl-8 opacity-50">
        <span className="text-[7px] font-bold uppercase tracking-tighter">{actor.type}</span>
      </div>
    </button>
  );

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden selection:bg-[#009EDB]/10">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 shrink-0 gap-4">
        <div className="flex items-center gap-4">
           {/* Global Nav Burger (would be linked to Sidebar toggle) */}
           <button onClick={() => window.location.href='/'} className="p-2 sm:hidden text-slate-400">
             <Menu className="w-5 h-5" />
           </button>
           <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-50 border border-slate-100 shadow-sm">
                 <LayoutGrid className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-sm sm:text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                 Committee<span className="text-[#009EDB]">_Matrix</span>
              </h3>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setIsRosterOpen(!isRosterOpen)} className="md:hidden p-2 text-[#009EDB] border border-slate-100 shadow-sm">
              <Menu className="w-5 h-5" />
           </button>
           <div className="hidden sm:block w-7 h-7 bg-white p-1 border border-slate-100 shadow-sm">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-slate-50/20">
        
        {/* --- ROSTER --- */}
        <aside className={`${isRosterOpen ? 'fixed inset-0 z-50 pt-20' : 'hidden'} md:block md:w-[300px] flex flex-col bg-white border-b md:border-b-0 md:border-r border-slate-100 shrink-0 overflow-hidden shadow-sm`}>
           <div className="p-4 bg-white border-b border-slate-50 flex items-center justify-between">
              <div className="relative group flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-[#009EDB] transition-colors" />
                 <input 
                   type="text"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="SEARCH ACTORS..."
                   className="w-full bg-slate-50 border border-slate-100 pl-10 pr-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#001E3D] outline-none focus:bg-white transition-all shadow-inner"
                 />
              </div>
              <button onClick={() => setIsRosterOpen(false)} className="md:hidden ml-4 p-2"><X className="w-5 h-5 text-slate-400"/></button>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {[
                { title: 'Permanent Members', data: p5, color: 'text-[#009EDB]' },
                { title: 'Non-Permanent', data: nonPermanent, color: 'text-slate-500' },
                { title: 'Observer States', data: observers, color: 'text-slate-400' }
              ].map(group => group.data.length > 0 && (
                <div key={group.title} className="mb-2">
                   <div className="px-5 py-2">
                      <span className={`text-[8px] font-black ${group.color} uppercase tracking-[0.4em] italic`}>{group.title}</span>
                   </div>
                   {group.data.map(a => <RosterItem key={a.id} actor={a} />)}
                </div>
              ))}
           </div>
        </aside>

        {/* --- PROFILE --- */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-12 relative bg-white">
           
           <AnimatePresence mode="wait">
              {selectedActor && (
                <motion.div 
                  key={selectedActor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-6xl mx-auto w-full space-y-8"
                >
                   {/* 01: IDENTITY NODE */}
                   <div className="flex flex-col lg:flex-row items-center gap-10 border-b border-slate-100 pb-10">
                      <div className="w-56 h-36 shrink-0 relative overflow-hidden border border-slate-100 shadow-2xl p-1 bg-white group/flag">
                         <img src={selectedActor.flag} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/flag:scale-110" />
                      </div>

                      <div className="flex-1 text-center lg:text-left space-y-4">
                         <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                            <span className={`px-4 py-1 text-[9px] font-black uppercase tracking-widest border border-slate-100 italic bg-white shadow-sm ${
                               selectedActor.alignment.includes('Side A') ? 'text-blue-600' :
                               selectedActor.alignment.includes('Side B') ? 'text-red-600' :
                               'text-emerald-600'
                            }`}>
                               {selectedActor.alignment}
                            </span>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">ISO: {selectedActor.iso}</span>
                         </div>
                         <h1 className="text-4xl md:text-5xl font-black text-[#001E3D] uppercase tracking-tighter italic leading-none">
                            {selectedActor.name}
                         </h1>
                         <div className="flex items-center justify-center lg:justify-start gap-6">
                            <ShieldCheck className="w-4 h-4 text-[#009EDB]" />
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{selectedActor.type}</span>
                         </div>
                      </div>
                      
                      <div className="w-56 h-40 bg-slate-900 border border-white/10 shadow-2xl p-6 flex flex-col items-center justify-center gap-3 relative overflow-hidden group/map shrink-0 rounded-sm">
                         <img 
                           src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${selectedActor.iso.toLowerCase()}/vector.svg`} 
                           alt="" 
                           className="w-full h-full object-contain filter invert opacity-90 transition-transform duration-1000 group-hover/map:scale-110"
                           onError={(e) => { e.target.onerror = null; e.target.src = selectedActor.flag; e.target.classList.remove('filter', 'invert'); }}
                         />
                         <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#009EDB] rounded-full animate-pulse" />
                         <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] italic">Geo_Vector</p>
                      </div>
                   </div>

                   {/* 02: COUNTRY METRICS */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Area', val: selectedActor.stats?.area, icon: Globe },
                        { label: 'Population', val: selectedActor.stats?.population, icon: Users },
                        { label: 'Joined UN', val: selectedActor.stats?.joined_un, icon: Landmark }
                      ].map((stat, i) => (                        <div key={i} className="p-6 bg-slate-50 border border-slate-100 flex flex-col gap-2 shadow-sm">
                           <div className="flex items-center gap-3 text-[#009EDB]">
                              <stat.icon className="w-3.5 h-3.5" />
                              <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</span>
                           </div>
                           <p className="text-[13px] font-black text-[#001E3D] uppercase italic">{stat.val || 'N/A'}</p>
                        </div>
                      ))}
                   </div>

                   {/* 03: STRATEGIC BRIEFING (SHRUNK) */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-300">
                         <History className="w-4 h-4" />
                         <h4 className="text-[9px] font-black uppercase tracking-widest text-[#001E3D] italic">Strategic Analysis</h4>
                      </div>
                      <div className="bg-white p-6 border-l-4 border-[#001E3D] shadow-sm border border-slate-100">
                         <p className="text-[15px] font-medium text-[#001E3D] leading-relaxed italic opacity-90">
                            "{selectedActor.detail}"
                         </p>
                      </div>
                   </div>

                   {/* 04: ALLIANCES & GROUPS */}
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-slate-300">
                            <Users className="w-4 h-4" />
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#001E3D] italic">Strategic Allies</h4>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {(selectedActor.stats?.allies || []).map((ally, i) => (
                               <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-800 text-[8px] font-black uppercase border border-blue-100 italic shadow-sm">{ally}</span>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-slate-300">
                            <ShieldX className="w-4 h-4" />
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#001E3D] italic">Adversaries</h4>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {(selectedActor.stats?.adversaries || []).map((adv, i) => (
                               <span key={i} className="px-3 py-1.5 bg-red-50 text-red-800 text-[8px] font-black uppercase border border-red-100 italic shadow-sm">{adv}</span>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-slate-300">
                            <Network className="w-4 h-4" />
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#001E3D] italic">Memberships</h4>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {(selectedActor.stats?.groups || []).map((grp, i) => (
                               <span key={i} className="px-3 py-1.5 bg-[#001E3D] text-white text-[8px] font-black uppercase italic shadow-lg">{grp}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* 05: PORTALS */}
                   <div className="pt-8">
                      <div className="flex items-center gap-3 text-slate-300 mb-4">
                         <FileText className="w-4 h-4" />
                         <h4 className="text-[9px] font-black uppercase tracking-widest text-[#001E3D] italic">Primary Source Access</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                         {(selectedActor.links || []).map((link, i) => (
                            <a 
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 bg-white border border-slate-200 text-[#001E3D] text-[9px] font-black uppercase tracking-widest hover:border-[#009EDB] transition-all flex items-center gap-3 shadow-sm italic"
                            >
                               {link.label} <ExternalLink className="w-3 h-3 text-[#009EDB]" />
                            </a>
                         ))}
                      </div>
                   </div>

                </motion.div>
              )}
           </AnimatePresence>
        </main>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>

    </div>
  );
}
