import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldAlert, Target, Globe, X, 
  UserCheck, UserMinus, Lightbulb, TrendingUp, 
  Zap, ChevronRight, Search, Filter, LayoutGrid,
  Map as MapIcon, Landmark, ShieldCheck, ExternalLink
} from 'lucide-react';
import { blocData, flagMapping } from '../data/mockData';

const getFlagUrl = (name) => {
  if (!name) return null;
  // Try direct match
  let iso = flagMapping[name];
  
  if (!iso) {
    // Try short name search (e.g. if name is 'United States of America', find 'United States')
    const key = Object.keys(flagMapping).find(k => name.includes(k) || k.includes(name));
    if (key) iso = flagMapping[key];
  }
  
  return iso ? `https://flagsapi.com/${iso.toUpperCase()}/flat/64.png` : null;
};

export default function DiplomaticBlocs() {
  const [selectedBloc, setSelectedBloc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const groups = ['all', ...new Set((blocData || []).map(b => b.group))].sort();

  const filteredActors = (blocData || []).filter(actor => {
    const matchesFilter = activeFilter === 'all' || actor.group === activeFilter;
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          actor.group.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden selection:bg-[#009EDB]/10">
      
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-50 border border-slate-100">
                <Globe className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                Global<span className="text-[#009EDB]">_Blocs</span>
              </h3>
           </div>
           <div className="h-6 w-[1px] bg-slate-200 mx-4" />
           <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest italic hidden md:block">
              Multilateral Cooperation Frameworks
           </p>
        </div>
        <div className="w-7 h-7 bg-white p-1 border border-slate-100">
           <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20">
        <div className="p-8 lg:p-12 space-y-10">

          <div className="space-y-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="FILTER..." 
                className="w-full bg-white border border-slate-200 pl-14 pr-6 py-4 text-[11px] font-black uppercase tracking-widest outline-none text-[#001E3D] shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {groups.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveFilter(g)}
                  className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === g ? 'bg-[#001E3D] text-white' : 'bg-white text-slate-500 border border-slate-100 hover:text-navy-900 shadow-sm'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredActors.map((actor) => (
              <motion.div 
                key={actor.id} 
                whileHover={{ y: -4 }}
                onClick={() => setSelectedBloc(actor)}
                className="bg-white border border-slate-100 p-8 flex flex-col items-center text-center group cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-white border border-slate-50 mb-6 flex items-center justify-center p-3 shadow-sm">
                   <img src={actor.logo} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.src = "https://www.un.org/sites/un2.un.org/files/un_logo.png"; }} />
                </div>
                <h4 className="text-[14px] font-black text-[#001E3D] uppercase tracking-widest mb-1 italic">{actor.name}</h4>
                <span className="text-[7px] font-black text-[#009EDB] uppercase tracking-widest px-2 py-0.5 bg-slate-50 italic">{actor.group}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedBloc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBloc(null)} className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-5xl h-[90vh] bg-white shadow-2xl border-t-8 border-[#009EDB] overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white border border-slate-100 shadow-xl flex items-center justify-center p-4">
                       <img src={selectedBloc.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-3xl font-black text-navy-900 uppercase tracking-tighter italic leading-none">{selectedBloc.name}</h3>
                  </div>
                  <button onClick={() => setSelectedBloc(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-8 h-8" /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="font-black text-[10px] uppercase text-[#009EDB] border-b border-slate-100 pb-2 italic">Institutional Objectives</h4>
                       <ul className="space-y-3">
                          {(selectedBloc.objectives || []).map((obj, i) => (
                            <li key={i} className="flex gap-4 items-start p-4 bg-slate-50 border-l-2 border-navy-900 italic">
                               <span className="text-[12px] text-navy-900 font-bold uppercase">{obj}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-6">
                       <h4 className="font-black text-[10px] uppercase text-red-600 border-b border-slate-100 pb-2 italic">Policy Red Lines</h4>
                       <ul className="space-y-3">
                          {(selectedBloc.red_lines || []).map((rl, i) => (
                            <li key={i} className="flex gap-4 items-start p-4 bg-red-50/30 border-l-2 border-red-500 italic">
                               <span className="text-[12px] text-red-900 font-bold uppercase opacity-80">"{rl}"</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                  <div className="p-10 bg-navy-900 text-white border-l-[10px] border-[#009EDB] shadow-xl italic">
                     <h4 className="font-black text-sm uppercase tracking-widest text-[#009EDB] mb-4">Consensus Strategy</h4>
                     <p className="text-2xl font-black uppercase tracking-tight leading-relaxed opacity-90 italic">"{selectedBloc.negotiation_tip}"</p>
                  </div>
               </div>
               <div className="p-6 border-t border-slate-50 bg-slate-50/80 flex justify-between items-center">
                  <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-8 h-8 object-contain grayscale opacity-30" />
                  <button onClick={() => setSelectedBloc(null)} className="px-8 py-2.5 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all italic">Close</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </div>
  );
}
