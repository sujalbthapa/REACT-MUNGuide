import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Landmark, Loader2, Globe, X, ExternalLink, ShieldCheck, MapPin, Calendar, FileText, ChevronDown, History } from 'lucide-react';

export default function ConstitutionLibrary() {
  const [groupedConstitutions, setGroupedConstitutions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewingConstitution, setViewingConstitution] = useState(null); // { country: string, id: string }
  const [htmlContent, setHtmlContent] = useState('');
  const [loadingHtml, setLoadingHtml] = useState(false);

  useEffect(() => {
    fetchConstitutions();
  }, []);

  const fetchConstitutions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.constituteproject.org/service/constitutions?lang=en');
      const data = await response.json();
      
      // Group by country and sort versions
      const groups = {};
      (data || []).forEach(item => {
        if (!groups[item.country]) groups[item.country] = [];
        groups[item.country].push(item);
      });

      // Sort versions within each group (latest first)
      Object.keys(groups).forEach(country => {
        groups[country].sort((a, b) => (b.year_enacted || 0) - (a.year_enacted || 0));
      });

      setGroupedConstitutions(groups);
    } catch (err) {
      console.error('Failed to fetch constitutions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConstitutionHtml = async (id) => {
    try {
      setLoadingHtml(true);
      const response = await fetch(`https://www.constituteproject.org/service/html?cons_id=${id}&lang=en`);
      const data = await response.json();
      setHtmlContent(data.html || '<p>Content unavailable.</p>');
    } catch (err) {
      console.error('Failed to fetch constitution HTML:', err);
      setHtmlContent('<p>Error loading content.</p>');
    } finally {
      setLoadingHtml(false);
    }
  };

  const countries = Object.keys(groupedConstitutions).sort();
  const regions = ['all', ...new Set(Object.values(groupedConstitutions).map(v => v[0].region))].sort();

  const filteredCountries = countries.filter(country => {
    const data = groupedConstitutions[country];
    const matchesRegion = selectedRegion === 'all' || data[0].region === selectedRegion;
    const matchesSearch = country.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          data[0].title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in pb-10">
      {/* Search & Filter Header */}
      <div className="neo-flat p-10 border-l-8 border-navy-900 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 neo-button bg-navy-900 text-white shadow-lg">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-navy-900 leading-none italic">Global Constitutions</h3>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">National Governing Documents // Consolidated Archive</p>
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
              placeholder="SEARCH BY COUNTRY (E.G. EGYPT, IRAN, USA)..." 
              className="w-full neo-pressed bg-slate-50 pl-16 pr-6 py-6 text-[12px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:bg-white transition-all border border-black/5"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-2">Region:</span>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${
                  selectedRegion === r ? 'neo-pressed text-blue-700 bg-slate-100' : 'neo-button bg-white text-slate-500'
                }`}
              >
                {r === 'all' ? 'Global' : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin opacity-20" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Consolidating Records...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.map((country) => {
            const versions = groupedConstitutions[country];
            const latest = versions[0];
            
            return (
              <div 
                key={country} 
                onClick={() => {
                  setViewingConstitution({ country, id: latest.id });
                  fetchConstitutionHtml(latest.id);
                }}
                className="neo-card p-6 bg-white border border-black/5 flex flex-col group hover:border-blue-600/20 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <Globe className="w-16 h-16" />
                </div>
                
                <div className="relative z-10 flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-black uppercase rounded tracking-widest border border-blue-100">
                      {latest.region}
                    </span>
                    {versions.length > 1 && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[8px] font-black uppercase rounded tracking-widest border border-amber-100">
                        {versions.length} Versions
                      </span>
                    )}
                  </div>

                  <h4 className="text-[16px] font-black text-navy-900 uppercase tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
                    {country}
                  </h4>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Latest Version</p>
                    <p className="text-[11px] text-navy-800 font-bold uppercase">{latest.title}</p>
                  </div>
                  
                  <div className="pt-4 grid grid-cols-2 gap-2 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-slate-300" />
                      <span className="text-[9px] font-black text-slate-500 uppercase">{latest.year_enacted || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-slate-300" />
                      <span className="text-[9px] font-black text-slate-500 uppercase">{latest.word_length} Words</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-black/5">
                  <button className="w-full neo-button py-2.5 text-[9px] font-black text-blue-800 hover:text-blue-900 transition-colors uppercase tracking-widest bg-slate-50 flex items-center justify-center gap-2 border-none">
                    Open Archive <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL: CONSTITUTION VIEWER --- */}
      <AnimatePresence>
        {viewingConstitution && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingConstitution(null)} className="absolute inset-0 bg-navy-900/60 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-6xl h-[90vh] bg-white neo-flat overflow-hidden flex flex-col">
               {/* Modal Header */}
               <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/50">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5 text-blue-600" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Consolidated Archive // Multi-Version Viewer</span>
                     </div>
                     <h3 className="text-3xl font-black text-navy-900 uppercase tracking-tighter leading-none">
                        {viewingConstitution.country}
                     </h3>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Version Selector */}
                    <div className="flex-1 md:flex-none relative group">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <History className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <select 
                        value={viewingConstitution.id}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setViewingConstitution(prev => ({ ...prev, id: newId }));
                          fetchConstitutionHtml(newId);
                        }}
                        className="w-full md:w-64 neo-pressed bg-white pl-10 pr-10 py-3 text-[10px] font-black uppercase tracking-widest appearance-none outline-none border border-black/5 cursor-pointer"
                      >
                        {groupedConstitutions[viewingConstitution.country]?.map(v => (
                          <option key={v.id} value={v.id}>{v.title}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <button onClick={() => setViewingConstitution(null)} className="neo-button p-2 text-slate-400 hover:text-navy-900 transition-colors bg-white border-none shadow-none"><X className="w-6 h-6" /></button>
                  </div>
               </div>

               {/* Modal Content */}
               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white">
                  {loadingHtml ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin opacity-20" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Downloading Documents...</p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none constitution-content">
                      <style>{`
                        .constitution-content h1 { font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; color: #0f172a; border-bottom: 4px solid #0f172a; padding-bottom: 1rem; margin-bottom: 2rem; }
                        .constitution-content h2 { font-weight: 900; text-transform: uppercase; color: #1e3a8a; margin-top: 3rem; }
                        .constitution-content h3 { font-weight: 800; text-transform: uppercase; color: #334155; }
                        .constitution-content section { margin-bottom: 2rem; padding: 1.5rem; background: #f8fafc; border-left: 4px solid #cbd5e1; }
                        .constitution-content p { font-size: 14px; line-height: 1.8; font-weight: 500; color: #334155; }
                        .article-header { font-weight: 900; color: #1e3a8a; margin-top: 2rem; }
                        .article-list { list-style: none; padding: 0; }
                      `}</style>
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                  )}
               </div>

               {/* Modal Footer */}
               <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-green-600" />
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified Official Source</span>
                    </div>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Research Center // Session_2026</p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
