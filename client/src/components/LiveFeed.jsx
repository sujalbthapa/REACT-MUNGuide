import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock, ExternalLink, RefreshCw, Loader2, Newspaper } from 'lucide-react';

const NEWS_ENDPOINT = "http://localhost:5000/api/news";

export default function LiveFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLiveNews = async (silent = false) => {
    if (!silent) setLoading(true);
    else setIsRefreshing(true);
    
    try {
      const response = await fetch(NEWS_ENDPOINT);
      if (!response.ok) throw new Error("News stream unavailable");
      const data = await response.json();
      setNews(data);
      setError(null);
    } catch (err) {
      console.error("LiveFeed Error:", err);
      setError("Unable to sync live stream. Using cached intelligence.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
    // Refresh every 10 minutes
    const interval = setInterval(() => fetchLiveNews(true), 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Connecting to NewsAPI...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Refresh Tool */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
           <Newspaper className="w-3 h-3 text-slate-400" />
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Global Data Sync</span>
        </div>
        <button 
          onClick={() => fetchLiveNews(true)}
          disabled={isRefreshing}
          className="p-1.5 neo-button bg-white text-slate-400 hover:text-blue-600 transition-all border-none"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-[9px] font-black text-amber-800 uppercase leading-tight">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {news.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative"
          >
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-5 bg-white neo-pressed hover:bg-slate-50 transition-all border-l-4 border-blue-600 group-hover:translate-x-1"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-black uppercase rounded tracking-widest border border-blue-100">
                  {item.type}
                </span>
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase">
                  <Clock className="w-2.5 h-2.5" />
                  {item.time}
                </div>
              </div>
              
              <p className="text-[11px] text-navy-900 font-bold leading-relaxed uppercase tracking-tight mb-3">
                {item.content}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest opacity-60">
                  {item.source}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-6 border-t border-black/5 text-center">
         <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">End of Live Stream</p>
      </div>
    </div>
  );
}
