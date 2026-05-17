import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Scale, ShieldAlert, FileText, ExternalLink, Globe, X, FileSearch, ShieldCheck, Hash, Calendar, Users, Info } from 'lucide-react';
import { internationalRules } from '../data/mockData';

const typeBadge = {
  treaty: { label: 'Treaty', color: 'bg-blue-100 text-blue-800' },
  unres: { label: 'UN/ICJ', color: 'bg-green-100 text-green-800' },
  eures: { label: 'EU', color: 'bg-purple-100 text-purple-800' }
};

const catLabel = {
  hr: 'Human Rights',
  war: 'Conflict Law',
  trade: 'Trade/Sanctions',
  ihl: 'IHL'
};

const catColor = {
  hr: 'bg-orange-50 text-orange-700 border-orange-100',
  war: 'bg-red-50 text-red-700 border-red-100',
  trade: 'bg-amber-50 text-amber-700 border-amber-100',
  ihl: 'bg-teal-50 text-teal-700 border-teal-100'
};

export default function RulesLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRule, setSelectedRule] = useState(null);

  const filteredRules = (internationalRules || []).filter(rule => {
    const cats = rule.cats || [];
    const tags = rule.tags || [];
    const fronts = rule.fronts || [];
    const title = rule.title || '';
    const body = rule.body || '';

    const matchesFilter = activeFilter === 'all' || rule.type === activeFilter || cats.includes(activeFilter);
    if (!matchesFilter) return false;

    const term = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(term) ||
      body.toLowerCase().includes(term) ||
      tags.some(t => t.toLowerCase().includes(term)) ||
      fronts.some(f => f.toLowerCase().includes(term))
    );
  });

  const categories = [
    { id: 'all', label: 'All Frameworks' },
    { id: 'treaty', label: 'Treaties' },
    { id: 'unres', label: 'UN Resolutions' },
    { id: 'eures', label: 'EU Legislation' },
    { id: 'hr', label: 'Human Rights' },
    { id: 'war', label: 'Conflict Law' },
    { id: 'trade', label: 'Trade/Sanctions' }
  ];

  return (
    <div className="space-y-8 animate-in pb-10">
      {/* --- HEADER --- */}
      <div className="neo-flat p-10 border-l-8 border-navy-900 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 neo-button bg-navy-900 text-white shadow-lg">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-navy-900 leading-none italic">International Law Library</h3>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Global Legal Frameworks & Historical Resolutions</p>
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
              placeholder="SEARCH BY KEYWORD, COUNTRY, OR TOPIC..." 
              className="w-full neo-pressed bg-slate-50 pl-16 pr-6 py-6 text-[12px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:bg-white transition-all border border-black/5"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-2">Category:</span>
            {categories.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === f.id ? 'neo-pressed text-blue-700 bg-slate-100' : 'neo-button bg-white text-slate-500'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRules.map((rule) => (
          <div 
            key={rule.id} 
            onClick={() => setSelectedRule(rule)}
            className="neo-card p-6 bg-white border border-black/5 flex flex-col group hover:border-blue-600/20 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <FileText className="w-16 h-16" />
            </div>
            
            <div className="relative z-10 flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded ${typeBadge[rule.type]?.color || 'bg-slate-100'}`}>
                  {typeBadge[rule.type]?.label || rule.type}
                </span>
                {(rule.cats || []).map(c => (
                  <span key={c} className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded border ${catColor[c] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                    {catLabel[c] || c}
                  </span>
                ))}
              </div>

              <h4 className="text-[15px] font-black text-navy-900 uppercase tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
                {rule.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-tight line-clamp-3 opacity-90">
                {rule.body}
              </p>
              
              <div className="pt-4 grid grid-cols-2 gap-2 border-t border-black/5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-slate-300" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">{rule.briefing?.signed?.split(',')[1]?.trim() || rule.briefing?.signed || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-slate-300" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">{(rule.fronts && rule.fronts[0]) || 'International'}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-black/5 flex gap-2">
              <button className="flex-1 neo-button py-2.5 text-[9px] font-black text-blue-800 hover:text-blue-900 transition-colors uppercase tracking-widest bg-slate-50 flex items-center justify-center gap-2 border-none">
                Details <Info className="w-3 h-3" />
              </button>
              <a 
                href={rule.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="neo-button p-2.5 text-slate-400 hover:text-navy-900 transition-colors bg-white flex items-center justify-center border-none"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL: DOCUMENT DETAILS --- */}
      <AnimatePresence>
        {selectedRule && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRule(null)} className="absolute inset-0 bg-navy-900/60 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-6xl h-[90vh] bg-white neo-flat overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <Scale className="w-5 h-5 text-blue-600" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Official Framework Details</span>
                     </div>
                     <h3 className="text-3xl font-black text-navy-900 uppercase tracking-tighter leading-none max-w-3xl">{selectedRule.title}</h3>
                  </div>
                  <button onClick={() => setSelectedRule(null)} className="neo-button p-2 text-slate-400 hover:text-navy-900 transition-colors bg-white border-none shadow-none"><X className="w-6 h-6" /></button>
               </div>

               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white space-y-12">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                        <h4 className="font-black text-xs uppercase tracking-widest text-blue-700">Legal Summary</h4>
                     </div>
                     <p className="text-[15px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight border-l-4 border-blue-600 pl-8 py-2">
                        {selectedRule.briefing?.summary || "Summary data currently being compiled for this document."}
                     </p>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-slate-400" />
                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-500">Document Excerpt</h4>
                     </div>
                     <div className="neo-pressed p-8 bg-slate-50">
                        <p className="text-[13px] text-slate-700 font-bold uppercase leading-relaxed tracking-tight italic">
                           "{selectedRule.body}"
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="neo-pressed p-8 bg-slate-50 border-l-4 border-navy-900">
                        <div className="flex items-center gap-2 mb-4">
                           <Calendar className="w-4 h-4 text-slate-400" />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Adoption Date</p>
                        </div>
                        <p className="text-[13px] text-navy-900 font-black uppercase">{selectedRule.briefing?.signed || "N/A"}</p>
                     </div>
                     <div className="neo-pressed p-8 bg-slate-50 border-l-4 border-blue-600">
                        <div className="flex items-center gap-2 mb-4">
                           <Users className="w-4 h-4 text-slate-400" />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Parties & Signatories</p>
                        </div>
                        <p className="text-[13px] text-navy-900 font-black uppercase leading-tight">{selectedRule.briefing?.parties || "International Community"}</p>
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Globe className="w-4 h-4 text-slate-300" />
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Global Legal Database // 2026 Session</span>
                  </div>
                  <a href={selectedRule.link} target="_blank" rel="noopener noreferrer" className="neo-button px-8 py-4 bg-navy-900 text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-navy-800 transition-all border-none">
                     Full Document Source <ExternalLink className="w-4 h-4" />
                  </a>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
