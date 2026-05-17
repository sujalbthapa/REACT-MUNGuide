import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Scale, Shield, Globe, Search, Filter, ChevronRight, X, ExternalLink, Calendar, Users, Activity, Target, Zap, ShieldCheck, History, FileText, TrendingUp, Lightbulb } from 'lucide-react';
import { internationalRules } from '../data/mockData';

export default function RulesLibrary() {
  const [selectedRule, setSelectedRule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveFilter] = useState('all');

  const filteredRules = (internationalRules || []).filter(rule => {
    const matchesFilter = activeTab === 'all' || rule.type === activeTab;
    const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rule.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (rule.tags && rule.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden selection:bg-[#009EDB]/10">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 shrink-0 gap-4">
        <div className="flex items-center gap-2 sm:gap-5 w-full sm:w-auto">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-50 border border-slate-100 shadow-sm">
                <Scale className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-sm sm:text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                International<span className="text-[#009EDB]">_Law</span>
              </h3>
           </div>
           <div className="hidden sm:block h-6 w-[1px] bg-slate-200 mx-4" />
           <p className="hidden sm:block text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] mt-0.5 italic">
              Official Treaties & Binding Resolutions
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-7 h-7 bg-white p-1 border border-slate-100 shadow-sm">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20">
        <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10">

          <div className="space-y-4 sm:space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-focus-within:text-[#009EDB] transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH ARCHIVE..." 
                className="w-full bg-white border border-slate-100 pl-12 sm:pl-16 pr-4 py-4 sm:py-5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:border-[#009EDB]/30 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 tracking-widest mr-1 sm:mr-2">Legal Tier:</span>
              {['all', 'treaty', 'unres'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 sm:px-6 py-2 text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeTab === f ? 'bg-[#001E3D] text-white' : 'bg-white text-slate-500 border border-slate-100 hover:text-navy-900'
                  }`}
                >
                  {f === 'all' ? 'Archive' : f === 'treaty' ? 'Treaties' : 'Resolutions'}
                </button>
              ))}
            </div>
          </div>

          {/* --- GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
            {filteredRules.map((rule) => (
              <motion.div 
                key={rule.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedRule(rule)}
                className="bg-white border border-slate-100 p-10 flex flex-col group hover:border-[#009EDB]/20 transition-all cursor-pointer relative shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                   <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border italic ${
                      rule.type === 'treaty' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                   }`}>
                      {rule.type === 'treaty' ? 'Multilateral Treaty' : 'Binding Resolution'}
                   </span>
                </div>

                <h4 className="text-[18px] font-black text-navy-900 uppercase tracking-tight leading-tight mb-4 italic group-hover:text-[#009EDB] transition-colors">{rule.title}</h4>
                
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed italic opacity-80 line-clamp-3 mb-8">
                   "{rule.body}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 w-full flex items-center justify-between gap-4 italic">
                  <div className="flex items-center gap-2">
                     <Globe className="w-3 h-3 text-slate-300" />
                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Jurisdiction: Global</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#009EDB]">
                     <span className="text-[9px] font-black uppercase tracking-widest">Analyze</span>
                     <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedRule && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRule(null)} className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-5xl h-[85vh] bg-white shadow-2xl border-t-8 border-[#009EDB] overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-50/50">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-navy-900 flex items-center justify-center shadow-xl">
                       <Scale className="w-8 h-8 text-[#009EDB]" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-3xl font-black text-navy-900 uppercase tracking-tighter leading-none italic">{selectedRule.title}</h3>
                       <p className="text-[9px] font-black text-[#009EDB] uppercase tracking-widest italic">{selectedRule.type === 'treaty' ? 'Official Treaty' : 'UNSC Resolution'} // Legal_Node</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <a href={selectedRule.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#009EDB] text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#007AB8] transition-all flex items-center gap-2 italic shadow-lg">Full Text <ExternalLink className="w-3 h-3" /></a>
                     <button onClick={() => setSelectedRule(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-8 h-8" /></button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 custom-scrollbar bg-white space-y-8 sm:space-y-12">
                  <div className="bg-slate-50 p-6 sm:p-10 border-l-4 sm:border-l-8 border-navy-900 italic shadow-inner">
                     <h4 className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-[#009EDB] mb-4 sm:mb-6">Executive Summary</h4>
                     <p className="text-base sm:text-2xl font-medium text-navy-900 leading-relaxed italic">
                        "{selectedRule.body}"
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="p-6 sm:p-8 bg-white border border-slate-100 shadow-sm">
                       <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#009EDB]" />
                          <p className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 tracking-widest">Enactment Data</p>
                       </div>
                       <p className="text-lg sm:text-xl font-black text-navy-900 uppercase italic">{selectedRule.briefing?.signed || 'N/A'}</p>
                    </div>
                    <div className="p-6 sm:p-8 bg-white border border-slate-100 shadow-sm">
                       <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          <p className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 tracking-widest">Scope of Accession</p>
                       </div>
                       <p className="text-base sm:text-lg font-black text-navy-900 uppercase italic opacity-80">{selectedRule.briefing?.parties || 'International Community'}</p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-10 bg-navy-900 text-white border-l-[6px] sm:border-l-[10px] border-[#009EDB] shadow-xl italic">
                     <h4 className="font-black text-[10px] sm:text-sm uppercase tracking-widest text-[#009EDB] mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                        Strategic Applicability
                     </h4>
                     <p className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-relaxed pl-4 sm:pl-8 border-l border-white/10 opacity-90">
                        "{selectedRule.briefing?.summary || 'Standard legal framework for simulation context.'}"
                     </p>
                  </div>
               </div>

               <div className="p-4 sm:p-6 border-t border-slate-50 bg-slate-50/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-6 h-6 sm:w-8 sm:h-8 object-contain grayscale opacity-30" />
                     <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Research Bureau // 2026.LEGAL</p>
                  </div>
                  <button onClick={() => setSelectedRule(null)} className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-navy-900 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all italic">Terminate View</button>
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
