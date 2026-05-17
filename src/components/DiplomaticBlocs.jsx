import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ShieldAlert, Target, Globe, X, UserCheck, UserMinus, Lightbulb, TrendingUp, Zap, ChevronRight, Search, LayoutGrid, List, Filter } from 'lucide-react';
import { blocData } from '../data/mockData';

export default function DiplomaticBlocs() {
  const [selectedBloc, setSelectedBloc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const groups = ['all', ...new Set(blocData.map(b => b.group))].sort();

  const filteredActors = blocData.filter(actor => {
    const matchesFilter = activeFilter === 'all' || actor.group === activeFilter;
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          actor.group.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in pb-20">
      {/* --- SEARCH & FILTER CENTER --- */}
      <div className="neo-flat p-10 border-l-8 border-navy-900 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-5 mb-8">
          <div className="p-3 neo-button bg-navy-900 text-white border-none shadow-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-navy-900 leading-none italic">Global Actors & Blocs</h3>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Geopolitical Profiles & Alignment Database</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-300" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH ACTORS (E.G. BRICS, IRAN, NATO)..." 
              className="w-full neo-pressed bg-slate-50 pl-16 pr-6 py-6 text-[12px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:bg-white transition-all border border-black/5"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 mr-4">
               <Filter className="w-3.5 h-3.5 text-slate-400" />
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Grouping:</span>
            </div>
            {groups.map(g => (
              <button
                key={g}
                onClick={() => setActiveFilter(g)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === g ? 'neo-pressed text-blue-700 bg-slate-100' : 'neo-button bg-white text-slate-500'
                }`}
              >
                {g === 'all' ? 'All Actors' : g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- ACTORS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredActors.map((actor) => (
          <motion.div 
            key={actor.id} 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedBloc(actor)}
            className="neo-card p-10 bg-white border border-black/5 flex flex-col items-center justify-center text-center group hover:border-blue-600/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Globe className="w-16 h-16" />
            </div>
            <div className={`w-20 h-20 neo-button ${actor.color} border-none mb-8 group-hover:scale-110 transition-transform shadow-xl relative`}>
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-[18px] font-black text-navy-900 uppercase tracking-widest leading-tight mb-2">{actor.name}</h4>
            <div className="flex flex-col gap-1 items-center">
               <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded">{actor.group}</span>
            </div>
            
            <div className="mt-8 pt-6 border-t border-black/5 w-full flex items-center justify-center gap-3 text-blue-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[9px] font-black uppercase tracking-widest">View Details</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}

        {filteredActors.length === 0 && (
          <div className="col-span-full neo-pressed p-20 flex flex-col items-center justify-center text-center opacity-40">
             <ShieldAlert className="w-16 h-16 text-slate-300 mb-6" />
             <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed">No actor profiles matched <br/> your search parameters.</p>
          </div>
        )}
      </div>

      {/* --- MODAL: ACTOR DETAILS --- */}
      <AnimatePresence>
        {selectedBloc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBloc(null)} className="absolute inset-0 bg-navy-900/70 backdrop-blur-xl" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} className="relative w-full max-w-7xl h-[95vh] bg-white neo-flat overflow-hidden flex flex-col">
               <div className="p-12 border-b-8 border-navy-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 bg-slate-50/50">
                  <div className="flex items-center gap-12">
                    <div className={`w-32 h-32 neo-button ${selectedBloc.color} border-none shadow-2xl relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <span className="px-4 py-1.5 neo-pressed bg-white text-blue-800 text-[11px] font-black uppercase tracking-[0.2em] border border-blue-100">{selectedBloc.group}</span>
                          <div className="h-1 w-20 bg-blue-600/10" />
                          <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Information Verified</span>
                       </div>
                       <h3 className="text-7xl font-black text-navy-900 uppercase tracking-tighter leading-none">{selectedBloc.name}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedBloc(null)} className="neo-button p-5 text-slate-400 hover:text-red-600 transition-colors bg-white border-none shadow-xl"><X className="w-10 h-10" /></button>
               </div>

               <div className="flex-1 overflow-y-auto p-16 custom-scrollbar bg-white space-y-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div className="space-y-12">
                       <div className="flex items-center gap-5">
                          <div className="p-3 neo-button bg-blue-50 text-blue-600 border-none"><Target className="w-10 h-10" /></div>
                          <h4 className="font-black text-lg uppercase tracking-[0.3em] text-blue-800 border-b-2 border-blue-100 pb-2">Strategic Objectives</h4>
                       </div>
                       <ul className="space-y-6">
                          {(selectedBloc.objectives || []).map((obj, i) => (
                            <li key={i} className="flex gap-10 items-start p-8 neo-pressed bg-slate-50 border-l-8 border-navy-900 group hover:bg-white transition-all">
                               <div className="text-[16px] font-black text-blue-600 mt-1 opacity-40">0{i+1}</div>
                               <p className="text-[16px] text-navy-900 font-bold uppercase tracking-tight leading-relaxed">{obj}</p>
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-12">
                       <div className="flex items-center gap-5">
                          <div className="p-3 neo-button bg-red-50 text-red-600 border-none"><ShieldAlert className="w-10 h-10" /></div>
                          <h4 className="font-black text-lg uppercase tracking-[0.3em] text-red-800 border-b-2 border-red-100 pb-2">Policy Red Lines</h4>
                       </div>
                       <ul className="space-y-6">
                          {(selectedBloc.red_lines || []).map((rl, i) => (
                            <li key={i} className="flex gap-8 items-start p-8 neo-pressed bg-red-50/20 border-l-8 border-red-600 group hover:bg-red-50 transition-all">
                               <Zap className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                               <p className="text-[16px] text-red-900 font-black uppercase tracking-tight leading-relaxed italic">"{rl}"</p>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                     <div className="space-y-12">
                        <div className="flex items-center gap-5">
                           <div className="p-3 neo-button bg-green-50 text-green-600 border-none"><Users className="w-10 h-10" /></div>
                           <h4 className="font-black text-lg uppercase tracking-[0.3em] text-green-800 border-b-2 border-green-100 pb-2">Allied Support</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           {(selectedBloc.allies || []).map(ally => (
                             <div key={ally} className="px-8 py-5 neo-button bg-white text-[12px] font-black uppercase text-navy-900 tracking-[0.2em] border-none text-center shadow-lg hover:text-blue-600 transition-colors">{ally}</div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-12">
                        <div className="flex items-center gap-5">
                           <div className="p-3 neo-button bg-slate-50 text-slate-500 border-none"><Users className="w-10 h-10" /></div>
                           <h4 className="font-black text-lg uppercase tracking-[0.3em] text-slate-600 border-b-2 border-slate-100 pb-2">Regional Opposition</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           {(selectedBloc.adversaries || []).map(adv => (
                             <div key={adv} className="px-8 py-5 neo-button bg-slate-50/50 text-[12px] font-black uppercase text-slate-500 tracking-[0.2em] border-none text-center shadow-inner">{adv}</div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="p-16 neo-flat bg-navy-900 text-white relative overflow-hidden group shadow-2xl border-t-8 border-blue-600">
                     <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-15 transition-opacity">
                        <Globe className="w-64 h-64" />
                     </div>
                     <div className="relative z-10 space-y-10">
                        <div className="flex items-center gap-6">
                           <div className="p-4 bg-blue-600/20 border border-blue-500/30 shadow-inner rounded-none">
                              <TrendingUp className="w-10 h-10 text-blue-400" />
                           </div>
                           <h4 className="font-black text-xl uppercase tracking-[0.4em] text-blue-400">Consensus Strategy Briefing</h4>
                        </div>
                        <div className="space-y-6">
                           <p className="text-4xl font-black uppercase tracking-tighter leading-tight max-w-5xl italic border-l-8 border-blue-600 pl-12 py-4">
                              "{selectedBloc.negotiation_tip}"
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-12 border-t-8 border-navy-900 bg-slate-50/80 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-5">
                     <Globe className="w-8 h-8 text-slate-300" />
                     <div>
                        <p className="text-[11px] font-black text-navy-900 uppercase tracking-widest">Global Research Bureau</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Session_2026 // Middle_East_Crisis</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedBloc(null)} className="neo-button px-16 py-6 bg-navy-900 text-white text-[14px] font-black uppercase tracking-[0.3em] hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all border-none shadow-2xl">
                     Close Details
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
