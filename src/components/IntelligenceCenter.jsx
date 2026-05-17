import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Loader2, Book, 
  ChevronRight, Search, Globe, Shield, 
  Info, AlertCircle, MessageSquare, BookOpen,
  Brain, FileSearch, HelpCircle
} from 'lucide-react';

const API_URL = "https://router.huggingface.co/v1/chat/completions";
const API_KEY = import.meta.env.VITE_HF_API_KEY;

export default function IntelligenceCenter() {
  const [query, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [activeTab, setActiveFront] = useState('advisor');
  const [definition, setDefinition] = useState(null);
  const [isSearchingTerm, setIsSearchingTerm] = useState(false);
  const [searchHistory, setHistory] = useState([]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [analysisResult]);

  const handleAnalysis = async (e) => {
    e.preventDefault();
    if (!query.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisResult('');
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            { 
              role: "system", 
              content: "You are a professional Diplomatic Research Advisor for the UN Security Council (2026). Your role is to provide deep analysis of the Situation in the Middle East. Focus on providing neutral, high-quality information, strategic options, and legal context. PROHIBITION: Never generate full opening statements, complete resolutions, or pre-written speeches. Instead, provide bullet points, data analysis, and strategic considerations. Use clear, professional language." 
            },
            { role: "user", content: query }
          ],
          stream: true,
          max_tokens: 1000,
        }),
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
      setHistory(prev => [query, ...prev].slice(0, 5));
    } catch (err) {
      setAnalysisResult("Error: Failed to connect to analysis server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTermSearch = async (term) => {
    if (!term) return;
    setIsSearchingTerm(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDefinition(data[0]);
      } else {
        setDefinition({ word: term, meanings: [{ definitions: [{ definition: "No definition found in general database." }] }] });
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
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-navy-900 leading-none italic">AI Research Advisor</h3>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Analytical Support & Terminology Database</p>
          </div>
        </div>
        
        <div className="flex gap-2 p-1 neo-pressed bg-white border border-black/5">
          <button 
            onClick={() => setActiveFront('advisor')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'advisor' ? 'bg-navy-900 text-white shadow-lg' : 'text-slate-400 hover:text-navy-900'}`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Analysis
          </button>
          <button 
            onClick={() => setActiveFront('term')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'term' ? 'bg-navy-900 text-white shadow-lg' : 'text-slate-400 hover:text-navy-900'}`}
          >
            <Book className="w-3.5 h-3.5" /> Terminology
          </button>
        </div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: INPUT & STATUS */}
        <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-10 space-y-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Advisor Input</label>
                <form onSubmit={handleAnalysis} className="relative">
                   <textarea 
                     value={query}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder={activeTab === 'advisor' ? "Pose research questions or scenario analysis..." : "Enter term for definition..."}
                     className="w-full h-40 neo-pressed bg-white p-6 text-[13px] font-bold uppercase tracking-tight leading-relaxed outline-none focus:ring-2 focus:ring-blue-600/20 transition-all border border-black/5"
                   />
                   <button 
                     type="submit"
                     disabled={isAnalyzing || !query.trim()}
                     className="absolute bottom-4 right-4 p-3 neo-button bg-navy-900 text-white border-none hover:bg-blue-700 disabled:opacity-50 transition-all"
                   >
                     {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                   </button>
                </form>
             </div>

             <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Information Guidelines</label>
                <div className="space-y-3">
                   {[
                     "Neutral evidence-based analysis.",
                     "Real-time regional data integration.",
                     "Legal & historical cross-referencing."
                   ].map((tip, i) => (
                     <div key={i} className="flex gap-4 items-center p-3 neo-pressed bg-white border border-black/5">
                        <div className="w-1 h-1 bg-blue-600" />
                        <span className="text-[9px] font-black text-navy-900 uppercase tracking-widest">{tip}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: OUTPUT DISPLAY */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar" ref={scrollRef}>
            <AnimatePresence mode="wait">
              {activeTab === 'advisor' ? (
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
                       <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Awaiting Analysis Query</p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none">
                       <div className="flex items-center gap-4 mb-8">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          <span className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em]">Strategic Research Output</span>
                       </div>
                       <div className="text-[16px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight whitespace-pre-wrap border-l-8 border-slate-100 pl-10 py-4 italic">
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
                   {/* Terminology logic matches the professional theme */}
                   <div className="flex items-center gap-4 mb-8">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em]">Terminology Database</span>
                   </div>
                   {definition ? (
                     <div className="space-y-8">
                        <div className="p-8 neo-pressed bg-slate-50 border-l-8 border-navy-900">
                           <h4 className="text-4xl font-black text-navy-900 uppercase tracking-tighter mb-2">{definition.word}</h4>
                           <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{definition.phonetic || '/analytical-term/'}</p>
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
                        <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Search Terminology Database</p>
                     </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER BAR */}
          <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-300" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter">AI Analysis Engine // Session_2026 // Qwen_72B_Model</span>
             </div>
             <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol Verified</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
