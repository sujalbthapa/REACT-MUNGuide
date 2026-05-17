import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldAlert, Target, Globe, X, 
  UserCheck, UserMinus, Lightbulb, TrendingUp, 
  Zap, ChevronRight, Search, Filter, LayoutGrid,
  Map as MapIcon, Landmark, ShieldCheck, ExternalLink,
  FileText, Activity
} from 'lucide-react';
import { blocData, flagMapping } from '../data/mockData';

const getFlagUrl = (name) => {
  if (!name) return null;
  // Try direct match
  let iso = flagMapping[name];
  
  if (!iso) {
    // Try short name search
    const key = Object.keys(flagMapping).find(k => name.includes(k) || k.includes(name));
    if (key) iso = flagMapping[key];
  }
  
  return iso ? `/flags/${iso.toLowerCase()}.svg` : null;
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
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-50 border border-slate-100 shadow-sm">
                <Globe className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                Global<span className="text-[#009EDB]">_Blocs</span>
              </h3>
           </div>
           <div className="h-6 w-[1px] bg-slate-200 mx-4" />
           <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] mt-0.5 italic hidden md:block">
              Multilateral Cooperation Frameworks
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-7 h-7 bg-white p-1 border border-slate-100 shadow-sm">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20">
        <div className="p-8 lg:p-12 space-y-10">

          <div className="space-y-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#009EDB] transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="FILTER ORGANIZATIONS..." 
                className="w-full bg-white border border-slate-100 pl-16 pr-6 py-5 text-[11px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:border-[#009EDB]/30 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mr-2">Category:</span>
              {groups.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveFilter(g)}
                  className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === g ? 'bg-[#001E3D] text-white' : 'bg-white text-slate-500 border border-slate-100 hover:text-navy-900'
                  }`}
                >
                  {g === 'all' ? 'Archive' : g}
                </button>
              ))}
            </div>
          </div>

          {/* --- GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredActors.map((actor) => (
              <motion.div 
                key={actor.id} 
                whileHover={{ y: -5 }}
                onClick={() => setSelectedBloc(actor)}
                className="bg-white border border-slate-100 p-10 flex flex-col items-center text-center group hover:border-[#009EDB]/20 transition-all cursor-pointer relative shadow-sm"
              >
                <div className={`w-20 h-20 bg-white border border-slate-50 mb-8 group-hover:scale-105 transition-transform shadow-md flex items-center justify-center p-4`}>
                   <img src={actor.logo} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.src = "https://www.un.org/sites/un2.un.org/files/un_logo.png"; }} />
                </div>
                <h4 className="text-[16px] font-black text-navy-900 uppercase tracking-widest leading-tight mb-2 italic">{actor.name}</h4>
                <span className="text-[8px] font-black text-[#009EDB] uppercase tracking-widest px-2 py-0.5 bg-slate-50 border border-slate-100 italic">{actor.group}</span>
                <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-3 text-[#009EDB] opacity-0 group-hover:opacity-100 transition-opacity italic">
                  <span className="text-[9px] font-black uppercase tracking-widest">Open Dossier</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedBloc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBloc(null)} className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-6xl h-[90vh] bg-white shadow-2xl border-t-8 border-[#009EDB] overflow-hidden flex flex-col">
               {/* Modal Header */}
               <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-50/50">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-white border border-slate-100 shadow-xl flex items-center justify-center p-5">
                       <img src={selectedBloc.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                       <h3 className="text-4xl font-black text-navy-900 uppercase tracking-tighter leading-none italic">{selectedBloc.name}</h3>
                       <p className="text-[10px] font-black text-[#009EDB] uppercase tracking-widest italic">{selectedBloc.group} // Institutional_Registry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <a href={selectedBloc.website} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all flex items-center gap-2 italic shadow-lg">Official Site <ExternalLink className="w-3 h-3" /></a>
                     <button onClick={() => setSelectedBloc(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-8 h-8" /></button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white space-y-12">
                  
                  {/* --- BRIEFING SECTION (NEW) --- */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-300">
                       <FileText className="w-4 h-4" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-[#001E3D] italic">Institutional Briefing</h4>
                    </div>
                    <div className="bg-slate-50 p-8 border-l-4 border-[#009EDB] shadow-inner italic">
                       <p className="text-[16px] font-medium text-navy-900 leading-relaxed opacity-90">
                          "{selectedBloc.briefing || 'Institutional data currently undergoing verification.'}"
                       </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <h4 className="font-black text-sm uppercase tracking-[0.2em] text-[#009EDB] border-b border-slate-100 pb-2 italic">Institutional Objectives</h4>
                       <ul className="space-y-4">
                          {(selectedBloc.objectives || []).map((obj, i) => (
                            <li key={i} className="flex gap-6 items-start p-6 bg-slate-50 border-l-4 border-navy-900 italic shadow-sm hover:bg-white transition-colors">
                               <span className="text-[14px] text-navy-900 font-bold uppercase">{obj}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-8">
                       <h4 className="font-black text-sm uppercase tracking-[0.2em] text-red-600 border-b border-slate-100 pb-2 italic">Policy Red Lines</h4>
                       <ul className="space-y-4">
                          {(selectedBloc.red_lines || []).map((rl, i) => (
                            <li key={i} className="flex gap-6 items-start p-6 bg-red-50/30 border-l-4 border-red-500 italic shadow-sm">
                               <span className="text-[14px] text-red-900 font-bold uppercase opacity-80">"{rl}"</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>

                  {/* --- MEMBERS SECTION --- */}
                  <div className="space-y-8">
                     <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2 italic">Participating Member Nations</h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {(selectedBloc.members || []).map((member, idx) => {
                          const flag = getFlagUrl(member);
                          return (
                            <div key={idx} className="p-4 bg-slate-50 border border-slate-100 flex items-center gap-3 group hover:bg-navy-900 transition-all overflow-hidden shadow-sm">
                               {flag ? (
                                 <img src={flag} alt="" className="w-8 h-5 object-cover shadow-sm border border-black/5 shrink-0" />
                               ) : (
                                 <div className="w-8 h-5 bg-white border border-slate-200 shrink-0 flex items-center justify-center">
                                    <Globe className="w-3 h-3 text-slate-300" />
                                 </div>
                               )}
                               <span className="text-[10px] font-black uppercase text-navy-900 group-hover:text-white tracking-widest truncate italic">{member}</span>
                            </div>
                          );
                        })}
                     </div>
                  </div>

                  {/* --- CONSENSUS STRATEGY (SHRUNK) --- */}
                  <div className="p-8 bg-navy-900 text-white border-l-[8px] border-[#009EDB] shadow-xl italic relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp className="w-32 h-32" /></div>
                     <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3 text-[#009EDB]">
                           <Lightbulb className="w-4 h-4" />
                           <h4 className="font-black text-[10px] uppercase tracking-widest">Consensus Strategy</h4>
                        </div>
                        <p className="text-xl font-black uppercase tracking-tight leading-relaxed max-w-4xl border-l border-white/10 pl-6 opacity-90">
                           "{selectedBloc.negotiation_tip}"
                        </p>
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-slate-50 bg-slate-50/80 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-8 h-8 object-contain grayscale opacity-30" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Research Bureau // 2026.GLOBAL</p>
                  </div>
                  <button onClick={() => setSelectedBloc(null)} className="px-10 py-3 bg-navy-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all italic">Terminate View</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
