import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Loader2, Book, 
  ChevronRight, Search, Globe, Shield, 
  Info, AlertCircle, MessageSquare, BookOpen,
  Brain, FileSearch, HelpCircle, Scale, Gavel
} from 'lucide-react';

const SERVER_URL = "http://localhost:5000/api/analyze";

const SUGGESTED_INQUIRIES = [
  "What is ICCPR Article 17?",
  "Explain Principle of Proportionality",
  "Define 'Non-interference' in UN Charter",
  "What does GC IV Article 33 mean?",
  "Explain 'Responsibility to Protect'",
  "Define Sovereignty in 2026 context"
];

export default function IntelligenceCenter() {
  const [query, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [activeTab, setActiveFront] = useState('legal'); // 'legal' or 'dictionary'
  const [definition, setDefinition] = useState(null);
  const [isSearchingTerm, setIsSearchingTerm] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [analysisResult]);

  const handleAnalysis = async (inputQuery) => {
    const finalQuery = inputQuery || query;
    if (!finalQuery.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisResult('');
    setSearchQuery(finalQuery);
    
    try {
      const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices[0]?.delta?.content || '';
              setAnalysisResult(prev => prev + content);
            } catch (err) {}
          }
        }
      }
    } catch (err) {
      setAnalysisResult("Error: Failed to connect to research server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTermSearch = async (term) => {
    const finalTerm = term || query;
    if (!finalTerm.trim() || isSearchingTerm) return;

    setIsSearchingTerm(true);
    setSearchQuery(finalTerm);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${finalTerm.toLowerCase()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDefinition(data[0]);
      } else {
        setDefinition({ word: finalTerm, meanings: [{ partOfSpeech: "n/a", definitions: [{ definition: "No technical definition found. Please use the AI Research tab for contextual explanation." }] }] });
      }
    } catch (err) {
      setDefinition(null);
    } finally {
      setIsSearchingTerm(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white neo-flat overflow-hidden border-l-8 border-navy-900">
      {/* --- HEADER --- */}
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-5">
          <div className="p-3 neo-button bg-navy-900 text-white border-none shadow-lg">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-navy-900 leading-none italic">Legal & Concept Research</h3>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Definitions, Provisions & Diplomatic Explanations</p>
          </div>
        </div>
        
        <div className="flex gap-2 p-1 neo-pressed bg-white border border-black/5">
          <button 
            onClick={() => setActiveFront('legal')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'legal' ? 'bg-navy-900 text-white shadow-lg' : 'text-slate-400 hover:text-navy-900'}`}
          >
            <Gavel className="w-3.5 h-3.5" /> Legal Explainer
          </button>
          <button 
            onClick={() => setActiveFront('dictionary')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'dictionary' ? 'bg-navy-900 text-white shadow-lg' : 'text-slate-400 hover:text-navy-900'}`}
          >
            <Book className="w-3.5 h-3.5" /> Dictionary
          </button>
        </div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: SEARCH & SUGGESTIONS */}
        <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30 overflow-y-auto custom-scrollbar">
          <div className="p-10 space-y-12">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Search Inquiry</label>
                <form onSubmit={(e) => { e.preventDefault(); activeTab === 'legal' ? handleAnalysis() : handleTermSearch(); }} className="relative">
                   <textarea 
                     value={query}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder={activeTab === 'legal' ? "e.g., Explain ICCPR Article 17..." : "e.g., Sovereignty..."}
                     className="w-full h-32 neo-pressed bg-white p-6 text-[13px] font-bold uppercase tracking-tight leading-relaxed outline-none focus:ring-2 focus:ring-blue-600/20 transition-all border border-black/5 resize-none"
                   />
                   <button 
                     type="submit"
                     disabled={isAnalyzing || isSearchingTerm || !query.trim()}
                     className="absolute bottom-4 right-4 p-3 neo-button bg-navy-900 text-white border-none hover:bg-blue-700 disabled:opacity-50 transition-all"
                   >
                     {isAnalyzing || isSearchingTerm ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                   </button>
                </form>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <Search className="w-3.5 h-3.5 text-blue-600" />
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Suggested Inquiries</label>
                </div>
                <div className="flex flex-col gap-3">
                   {SUGGESTED_INQUIRIES.map((item, i) => (
                     <button 
                       key={i} 
                       onClick={() => activeTab === 'legal' ? handleAnalysis(item) : handleTermSearch(item)}
                       className="text-left p-4 neo-button bg-white text-[11px] font-black uppercase text-navy-900 tracking-widest border-none hover:text-blue-600 transition-all shadow-sm"
                     >
                        {item}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: RESEARCH OUTPUT */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar" ref={scrollRef}>
            <AnimatePresence mode="wait">
              {activeTab === 'legal' ? (
                <motion.div 
                  key="analysis"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {!analysisResult && !isAnalyzing ? (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-30">
                       <FileSearch className="w-20 h-20 text-slate-300 mb-6" />
                       <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Awaiting Legal Inquiry</p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none">
                       <div className="flex items-center gap-4 mb-8">
                          <Brain className="w-5 h-5 text-blue-600" />
                          <span className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em]">Conceptual Explanation</span>
                       </div>
                       <div className="text-[16px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight whitespace-pre-wrap border-l-8 border-slate-100 pl-10 py-4">
                          {analysisResult}
                          {isAnalyzing && <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-2 align-middle" />}
                       </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="term"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                   <div className="flex items-center gap-4 mb-8">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em]">Terminology Quick-Lookup</span>
                   </div>
                   {definition ? (
                     <div className="space-y-8">
                        <div className="p-8 neo-pressed bg-slate-50 border-l-8 border-navy-900">
                           <h4 className="text-4xl font-black text-navy-900 uppercase tracking-tighter mb-2">{definition.word}</h4>
                           <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{definition.phonetic || '/technical-term/'}</p>
                        </div>
                        <div className="space-y-6">
                           {definition.meanings.map((m, i) => (
                             <div key={i} className="p-8 neo-card bg-white border border-black/5 space-y-4">
                                <span className="text-[9px] font-black uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded tracking-widest">{m.partOfSpeech}</span>
                                <p className="text-[15px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight italic">
                                   "{m.definitions[0].definition}"
                                </p>
                             </div>
                           ))}
                        </div>
                     </div>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-30">
                        <HelpCircle className="w-20 h-20 text-slate-300 mb-6" />
                        <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Search Dictionary</p>
                     </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-slate-300" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter">Information Gain Center // Educational Purpose Only</span>
             </div>
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600 opacity-20" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Framework Sync</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
