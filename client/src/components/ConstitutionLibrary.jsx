import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Landmark, Loader2, Globe, X, ExternalLink, ShieldCheck, MapPin, Calendar, FileText, ChevronDown, History } from 'lucide-react';
import { flagMapping } from '../data/mockData';

const getFlagUrl = (countryName) => {
  if (!countryName) return null;
  let iso = flagMapping[countryName];
  if (!iso) {
    // Try short name search fallback
    const key = Object.keys(flagMapping).find(k => countryName.includes(k) || k.includes(countryName));
    if (key) iso = flagMapping[key];
  }
  if (iso) return `https://flagsapi.com/${iso.toUpperCase()}/flat/64.png`;
  return null;
};

export default function ConstitutionLibrary() {
  const [groupedConstitutions, setGroupedConstitutions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewingConstitution, setViewingConstitution] = useState(null);
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
      const groups = {};
      (data || []).forEach(item => {
        if (!groups[item.country]) groups[item.country] = [];
        groups[item.country].push(item);
      });
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
    <div className="h-screen flex flex-col bg-white overflow-hidden selection:bg-[#009EDB]/10">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-50 border border-slate-100 shadow-sm">
                <Landmark className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                National<span className="text-[#009EDB]">_Constitutions</span>
              </h3>
           </div>
           <div className="h-6 w-[1px] bg-slate-200 mx-4" />
           <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] mt-0.5 italic">
              Global Governing Documents Archive
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

          <div className="space-y-8">
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#009EDB] transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH BY COUNTRY (E.G. EGYPT, IRAN, USA)..." 
                className="w-full neo-pressed bg-white pl-20 pr-8 py-6 text-[13px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:bg-white transition-all border border-black/5 shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest mr-2">Region:</span>
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedRegion === r ? 'bg-[#009EDB] text-white shadow-xl scale-105 italic' : 'neo-button bg-white text-slate-500 hover:text-navy-900'
                  }`}
                >
                  {r === 'all' ? 'Unified Global' : r}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="w-16 h-16 text-[#009EDB] animate-spin opacity-40" />
              <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Consolidating Global Records...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
              {filteredCountries.map((country) => {
                const versions = groupedConstitutions[country];
                const latest = versions[0];
                const flagUrl = getFlagUrl(country);
                
                return (
                  <div 
                    key={country} 
                    onClick={() => {
                      setViewingConstitution({ country, id: latest.id });
                      fetchConstitutionHtml(latest.id);
                    }}
                    className="neo-card p-10 bg-white border border-black/5 flex flex-col group hover:border-[#009EDB]/30 transition-all cursor-pointer relative overflow-hidden shadow-xl"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <Globe className="w-20 h-20" />
                    </div>
                    
                    <div className="relative z-10 flex-1 space-y-6">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[9px] font-black uppercase rounded-none tracking-widest border border-blue-100 italic shadow-sm">
                          {latest.region}
                        </span>
                        {versions.length > 1 && (
                          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-black uppercase rounded-none tracking-widest border border-amber-100 italic shadow-sm">
                            {versions.length} Records
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-5">
                        {flagUrl ? (
                          <img src={flagUrl} alt="" className="w-12 h-8 object-cover shadow-2xl border border-black/5 shrink-0 group-hover:scale-110 transition-transform" />
                        ) : (
                          <div className="w-12 h-8 bg-slate-100 flex items-center justify-center border border-black/5 shadow-inner">
                             <Globe className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                        <h4 className="text-[18px] font-black text-navy-900 uppercase tracking-tighter leading-tight group-hover:text-[#009EDB] transition-colors italic">
                          {country}
                        </h4>
                      </div>
                      
                      <div className="space-y-2 border-l-4 border-slate-100 pl-4 py-2">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Current Version</p>
                        <p className="text-[12px] text-navy-800 font-bold uppercase leading-tight italic">{latest.title}</p>
                      </div>
                      
                      <div className="pt-6 grid grid-cols-2 gap-4 border-t border-black/5">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-300" />
                          <span className="text-[10px] font-black text-slate-500 uppercase italic">{latest.year_enacted || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-300" />
                          <span className="text-[10px] font-black text-slate-500 uppercase italic">{latest.word_length} Words</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-10 pt-6 border-t border-black/5">
                      <button className="w-full neo-button py-4 text-[10px] font-black text-blue-800 hover:text-white hover:bg-[#009EDB] transition-all uppercase tracking-widest bg-slate-50 flex items-center justify-center gap-3 border-none italic shadow-md">
                        Access Archive <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* --- MODAL: CONSTITUTION VIEWER --- */}
      <AnimatePresence>
        {viewingConstitution && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingConstitution(null)} className="absolute inset-0 bg-[#001E3D]/80 backdrop-blur-xl" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-7xl h-[95vh] bg-white neo-flat overflow-hidden flex flex-col border-t-[12px] border-[#009EDB]">
               {/* Modal Header */}
               <div className="p-10 border-b-2 border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 bg-slate-50/50 shadow-sm">
                  <div className="flex items-center gap-10">
                    {getFlagUrl(viewingConstitution.country) && (
                      <img src={getFlagUrl(viewingConstitution.country)} alt="" className="w-24 h-16 object-cover shadow-2xl border-4 border-white" />
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-navy-900 shadow-xl">
                            <Landmark className="w-5 h-5 text-[#009EDB]" />
                          </div>
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Consolidated Archive // Multi-Version Viewer</span>
                      </div>
                      <h3 className="text-5xl font-black text-navy-900 uppercase tracking-tighter leading-none italic">
                          {viewingConstitution.country}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex-1 md:flex-none relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <History className="w-4 h-4 text-[#009EDB]" />
                      </div>
                      <select 
                        value={viewingConstitution.id}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setViewingConstitution(prev => ({ ...prev, id: newId }));
                          fetchConstitutionHtml(newId);
                        }}
                        className="w-full md:w-80 neo-pressed bg-white pl-12 pr-12 py-5 text-[11px] font-black uppercase tracking-widest appearance-none outline-none border border-black/5 cursor-pointer italic shadow-inner"
                      >
                        {groupedConstitutions[viewingConstitution.country]?.map(v => (
                          <option key={v.id} value={v.id}>{v.title}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>

                    <button onClick={() => setViewingConstitution(null)} className="neo-button p-4 text-slate-400 hover:text-red-600 transition-colors bg-white border-none shadow-xl"><X className="w-10 h-10" /></button>
                  </div>
               </div>

               {/* Modal Content */}
               <div className="flex-1 overflow-y-auto p-16 custom-scrollbar bg-white">
                  {loadingHtml ? (
                    <div className="flex flex-col items-center justify-center h-full gap-6 py-32">
                      <Loader2 className="w-16 h-16 text-[#009EDB] animate-spin opacity-40" />
                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Retrieving Legal Documents...</p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none constitution-content">
                      <style>{`
                        .constitution-content h1 { font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; color: #001E3D; border-bottom: 8px solid #009EDB; padding-bottom: 1.5rem; margin-bottom: 3rem; font-style: italic; }
                        .constitution-content h2 { font-weight: 900; text-transform: uppercase; color: #009EDB; margin-top: 4rem; font-style: italic; border-l: 8px solid #009EDB; padding-left: 1.5rem; }
                        .constitution-content h3 { font-weight: 800; text-transform: uppercase; color: #334155; margin-top: 3rem; font-style: italic; }
                        .constitution-content section { margin-bottom: 3rem; padding: 2rem; background: #f8fafc; border-left: 12px solid #001E3D; shadow: 10px 10px 20px #e2e8f0; }
                        .constitution-content p { font-size: 16px; line-height: 1.8; font-weight: 500; color: #1e293b; margin-bottom: 1.5rem; }
                        .article-header { font-weight: 900; color: #001E3D; margin-top: 3rem; text-transform: uppercase; font-style: italic; }
                      `}</style>
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                  )}
               </div>

               {/* Modal Footer */}
               <div className="p-10 border-t-8 border-navy-900 bg-slate-50/80 flex justify-between items-center shrink-0 shadow-2xl z-20">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white p-2 shadow-2xl border border-slate-100">
                        <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-4">
                       <ShieldCheck className="w-6 h-6 text-green-600" />
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Verified Official Record // Institutional_Trust_Network</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Global Research Bureau // Session_2026</p>
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
