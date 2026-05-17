import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Send, Loader2, Sparkles, 
  History, Info, ChevronRight, Target, Activity, 
  Globe, X, ShieldCheck, Landmark, MessageSquare, Search, Users,
  TrendingUp, Lightbulb
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ANALYZE_URL = "http://localhost:5000/api/analyze";
const HEALTH_URL = "http://localhost:5000/api/health";

export default function IntelligenceCenter() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    checkHealth();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const checkHealth = async () => {
    try {
      const res = await fetch(HEALTH_URL);
      setIsOnline(res.ok);
    } catch {
      setIsOnline(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', content: query };
    setChatHistory(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch(ANALYZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!response.ok) throw new Error("Connection Failure");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponseContent = '';
      
      // Initialize the assistant message in history
      setChatHistory(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') break;
            try {
              const data = JSON.parse(dataStr);
              const text = data.choices[0]?.delta?.content || "";
              if (text) {
                aiResponseContent += text;
                setChatHistory(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: aiResponseContent };
                  return updated;
                });
              }
            } catch (err) {
              // Ignore partial JSON chunks
            }
          }
        }
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: "**ERROR:** System connection lost. Please verify local research server status and API configuration." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden selection:bg-[#009EDB]/10">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-5 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 border border-slate-100 shadow-sm">
                 <Brain className="w-4 h-4 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-lg uppercase tracking-tighter text-[#001E3D] italic leading-none">
                 Research<span className="text-[#009EDB]">_Advisor</span>
              </h3>
           </div>
           <div className="h-6 w-[1px] bg-slate-200 mx-4" />
           <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] italic hidden md:block">
              Institutional Intelligence & Situational Analysis
           </p>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right hidden md:block">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Link</p>
              <div className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 justify-end italic ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
                 <div className={`w-1 h-1 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-50'}`} />
                 {isOnline ? 'Active' : 'Offline'}
              </div>
           </div>
           <div className="w-8 h-8 bg-white p-1 border border-slate-100 shadow-sm">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-50/50">
        
        {/* --- GUIDELINES SIDEBAR --- */}
        <aside className="w-[300px] hidden xl:flex flex-col bg-white border-r border-slate-100 shrink-0 overflow-hidden shadow-sm">
           <div className="p-6 bg-slate-50/50 border-b border-slate-100">
              <p className="text-[9px] font-black text-[#009EDB] uppercase tracking-[0.3em] italic">Operational Protocol</p>
           </div>
           <div className="p-6 space-y-10 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-[#009EDB]" />
                    <h4 className="text-[10px] font-black text-[#001E3D] uppercase tracking-widest italic">Research Focus</h4>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase italic opacity-80">
                    Restricted to the 2026 Middle East simulation. Analyze state interests, legal frameworks, and conflict dynamics.
                 </p>
              </div>
              <div className="space-y-4 border-t border-slate-50 pt-8">
                 <div className="flex items-center gap-3">
                    <History className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[10px] font-black text-[#001E3D] uppercase tracking-widest italic">Methodology</h4>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase italic opacity-80">
                    Challenge assumptions. Propose multi-lateral de-escalation based on established UN resolutions and treaties.
                 </p>
              </div>
              <div className="p-5 bg-[#001E3D] shadow-xl space-y-3">
                 <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Base_Model_v1</span>
                 </div>
                 <div className="w-full bg-white/10 h-1">
                    <div className="w-[100%] h-full bg-[#009EDB]" />
                 </div>
              </div>
           </div>
        </aside>

        {/* --- CHAT INTERFACE --- */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-[600px] h-[600px] object-contain" />
           </div>

           {/* FEED */}
           <div 
             ref={scrollRef}
             className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-16 space-y-12 relative z-10"
           >
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-10">
                   <div className="w-20 h-20 bg-white border border-slate-100 shadow-xl flex items-center justify-center group hover:border-[#009EDB] transition-colors">
                      <MessageSquare className="w-8 h-8 text-[#009EDB]" />
                   </div>
                   <div className="space-y-3">
                      <h2 className="text-3xl font-black text-[#001E3D] uppercase tracking-tighter italic">Initiate Research</h2>
                      <p className="text-[12px] text-slate-500 font-bold uppercase tracking-[0.2em] italic">
                         Standing by for analytical inquiries regarding the 2026 regional landscape.
                      </p>
                   </div>
                   <div className="grid grid-cols-1 gap-3 w-full pt-8 border-t border-slate-100">
                      {[
                        "Explain Resolution 1701's current failure.",
                        "What is Iran's strategic vector in 2026?"
                      ].map(suggestion => (
                        <button 
                          key={suggestion}
                          onClick={() => { setQuery(suggestion); }}
                          className="p-4 bg-white border border-slate-100 text-[9px] font-black uppercase text-slate-500 hover:border-[#009EDB] hover:text-[#009EDB] transition-all text-left flex items-center justify-between shadow-sm italic"
                        >
                           {suggestion}
                           <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl w-full p-8 lg:p-10 border shadow-sm relative ${
                    msg.role === 'user' 
                    ? 'bg-slate-50 border-slate-200 text-[#001E3D]' 
                    : 'bg-white border-slate-100 text-[#001E3D] border-l-4 border-l-[#009EDB]'
                  }`}>
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`p-2 border ${msg.role === 'user' ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'}`}>
                          {msg.role === 'user' ? <Users className="w-3 h-3 text-slate-400" /> : <Brain className="w-3 h-3 text-[#009EDB]" />}
                       </div>
                       <span className={`text-[8px] font-black uppercase tracking-[0.3em] italic ${msg.role === 'user' ? 'text-slate-400' : 'text-[#009EDB]'}`}>
                          {msg.role === 'user' ? 'OFFICIAL_INQUIRY' : 'INSTITUTIONAL_ANALYSIS'}
                       </span>
                    </div>
                    <div className={`prose max-w-none prose-sm markdown-content ${msg.role === 'user' ? 'opacity-80' : ''}`}>
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                   <div className="p-6 bg-white border border-slate-100 border-l-4 border-l-[#009EDB] flex items-center gap-4 shadow-sm italic">
                      <Loader2 className="w-4 h-4 text-[#009EDB] animate-spin" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Processing Intelligence...</span>
                   </div>
                </div>
              )}
           </div>

           {/* INPUT */}
           <div className="p-8 lg:p-12 bg-white border-t border-slate-100 relative z-20">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4">
                 <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#009EDB] transition-colors" />
                    <input 
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ENTER RESEARCH PARAMETERS..."
                      className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-5 text-[12px] font-black uppercase tracking-widest outline-none text-[#001E3D] placeholder:text-slate-300 focus:bg-white transition-all shadow-inner"
                    />
                 </div>
                 <button 
                   disabled={loading || !query.trim()}
                   className="px-10 bg-[#001E3D] text-white flex items-center justify-center gap-3 hover:bg-[#009EDB] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg italic active:scale-95"
                 >
                    <span className="font-black text-[11px] uppercase tracking-widest">Process</span>
                    <Send className="w-4 h-4" />
                 </button>
              </form>
           </div>

        </main>
      </div>
      
      <style>{`
        .markdown-content h1, .markdown-content h2, .markdown-content h3 { font-weight: 900; text-transform: uppercase; color: #001E3D; margin-top: 1.5rem; margin-bottom: 1rem; font-style: italic; border-bottom: 2px solid #009EDB22; display: inline-block; width: 100%; }
        .markdown-content p { font-weight: 500; line-height: 1.6; margin-bottom: 1rem; text-transform: uppercase; font-size: 12px; }
        .markdown-content strong { color: #009EDB; font-weight: 900; }
        .markdown-content ul { list-style: none; padding-left: 0; }
        .markdown-content li { position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; font-weight: 700; font-size: 11px; }
        .markdown-content li::before { content: ""; position: absolute; left: 0; top: 0.45rem; width: 0.4rem; height: 0.4rem; background: #009EDB; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

    </div>
  );
}
