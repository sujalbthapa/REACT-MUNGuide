import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, User, Globe, Info, Zap } from 'lucide-react';

const getDashboardContext = () => {
  try {
    const newsItems = Array.from(document.querySelectorAll('.neo-card p'))
      .slice(0, 10)
      .map(el => el.innerText)
      .join(' | ');
    return newsItems ? `LATEST_NEWS_UPDATES: ${newsItems}` : 'NO_LIVE_NEWS_AVAILABLE';
  } catch (e) {
    return 'CONTEXT_UNAVAILABLE';
  }
};

const SYSTEM_PROMPT = `
You are the "Senior UN Intelligence Advisor".
CONTEXT: It is 2026. The Middle East is in crisis.
MISSION: Provide diplomatic analysis for delegates.
SOURCE: Use the latest news provided below to answer questions about the current situation.
GUIDELINES:
1. Explain complex rules and laws in simple, clear language.
2. Be professional, neutral, and helpful.
3. If news is provided, use it to give "Situation Reports" (SITREPs).
4. Do not use technical computer or coding language.
5. Be concise. 1-3 sentences unless asked for more detail.
`;

export default function IntelAdvisor() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Intelligence System Active. I am ready to provide briefings on the 2026 Middle East Crisis. What information do you require?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newsContext = getDashboardContext();
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `${SYSTEM_PROMPT}\n\nLATEST_NEWS_FROM_DASHBOARD: ${newsContext}` },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            userMessage
          ],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || 'Connection Error');
      const aiResponse = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Unable to connect to the intelligence server. Please check the backend connection.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] animate-in">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8 mb-6">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} className={`flex flex-col ${msg.role === 'assistant' ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-center gap-3 mb-2 px-2`}>
              {msg.role === 'assistant' ? (
                <>
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">Intelligence Advisor</span>
                </>
              ) : (
                <>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Delegate</span>
                  <User className="w-3 h-3 text-slate-400" />
                </>
              )}
            </div>
            <div className={`max-w-[90%] p-6 neo-card ${msg.role === 'assistant' ? 'bg-white border-l-4 border-blue-600 shadow-sm' : 'bg-slate-50 border-r-4 border-slate-300'}`}>
              <div className="text-[12px] font-bold text-navy-900 leading-relaxed whitespace-pre-wrap uppercase tracking-tight">{msg.content}</div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-center gap-4 px-6 py-4 animate-pulse opacity-50">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Analyzing information...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-8 neo-flat bg-white border-t-8 border-navy-900">
        <form onSubmit={handleSend} className="flex gap-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-6 flex items-center"><Terminal className="w-5 h-5 text-slate-300" /></div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="ASK A QUESTION OR REQUEST A REPORT..." className="w-full neo-pressed bg-slate-50 pl-16 pr-6 py-6 text-[12px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300" />
          </div>
          <button type="submit" disabled={loading} className="neo-button px-12 bg-navy-900 text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50">
            <Send className="w-5 h-5" /> Execute
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-6">
             <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-amber-500" /><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Optimized for groups</span></div>
             <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-blue-500" /><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live news awareness active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
