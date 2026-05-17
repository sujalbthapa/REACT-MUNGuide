import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Radio, Terminal, ExternalLink, History, Zap, Bell } from 'lucide-react';
import { mockNews, historicalNews } from '../data/mockData';

const getStatusColor = (type) => {
  switch (type) {
    case 'ALERT': return 'bg-red-700';
    case 'URGENT': return 'bg-amber-600';
    case 'CRISIS': return 'bg-red-900';
    case 'FLASH': return 'bg-purple-800';
    case 'HISTORICAL': return 'bg-navy-900';
    default: return 'bg-blue-700';
  }
};

export default function LiveFeed() {
  const [activeTab, setActiveTab] = useState('latest');
  const [news, setNews] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchRealNews = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    const feeds = [
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml' },
      { name: 'CNBC', url: 'https://search.cnbc.com/rs/search/all/view.xml?partnerId=2000&keywords=middle%20east' },
      { name: 'France24', url: 'https://www.france24.com/en/middle-east/rss' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/middleeast/rss' }
    ];
    const keywords = ['iran', 'israel', 'lebanon', 'gaza', 'palestine', 'red sea', 'hormuz', 'hezbollah', 'houthi', 'unsc', 'middle east', 'yemen', 'syria', 'iraq', 'jerusalem', 'beirut', 'tehran', 'tel aviv', 'idf', 'hamas', 'maritime', 'blockade', 'strike', 'ceasefire', 'unifil', 'refugee'];
    try {
      const results = await Promise.all(feeds.map(async (feed) => {
        try {
          const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
          const data = await res.json();
          if (data.status !== 'ok') return [];
          return data.items.map(item => ({ id: item.guid || item.link, type: 'UPDATE', source: feed.name, content: item.title, time: new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), url: item.link, date: new Date(item.pubDate) }));
        } catch (e) { return []; }
      }));
      const combinedNews = results.flat().filter(item => { const lowerContent = item.content.toLowerCase(); return keywords.some(kw => lowerContent.includes(kw)); }).sort((a, b) => b.date - a.date).slice(0, 15);
      if (combinedNews.length === 0) setNews(mockNews);
      else setNews(combinedNews);
    } catch (err) { setError('Unable to reach live news.'); setNews(mockNews); }
    finally { setIsRefreshing(false); }
  }, []);

  useEffect(() => { fetchRealNews(); const interval = setInterval(fetchRealNews, 300000); return () => clearInterval(interval); }, [fetchRealNews]);
  const displayNews = activeTab === 'latest' ? news : historicalNews;

  return (
    <aside className="w-full lg:w-96 neo-sidebar border-l border-black/10 flex flex-col h-screen overflow-hidden bg-[#f1f5f9]">
      <div className="bg-inherit border-b border-black/10">
        <div className="p-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-3 h-3 text-red-700" />
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-navy-900">Intelligence Center</h3>
          </div>
          <button onClick={fetchRealNews} disabled={isRefreshing} className={`neo-button p-2 bg-white ${isRefreshing ? 'opacity-50' : ''}`}>
            <RefreshCw className={`w-3.5 h-3.5 text-navy-900 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex p-4 gap-4">
          <button onClick={() => setActiveTab('latest')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'latest' ? 'neo-pressed text-blue-800 bg-slate-100' : 'neo-button text-slate-500 bg-white'}`}><Zap className="w-3 h-3" /> Recent</button>
          <button onClick={() => setActiveTab('important')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'important' ? 'neo-pressed text-navy-900 bg-slate-100' : 'neo-button text-slate-500 bg-white'}`}><History className="w-3 h-3" /> Key Events</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {error && activeTab === 'latest' && <div className="neo-pressed p-3 border border-amber-200 text-[10px] text-amber-800 font-black uppercase tracking-tight text-center bg-amber-50">{error}</div>}
        <AnimatePresence mode="popLayout">
          {displayNews.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="neo-card p-6 group relative overflow-hidden bg-white border border-black/5">
              <div className="flex justify-between items-start mb-5">
                <div className="flex flex-col gap-2">
                  <span className={`w-fit text-[9px] font-black px-2.5 py-1 text-white tracking-widest ${getStatusColor(item.type)}`}>{item.type === 'HISTORICAL' ? 'ARCHIVE' : item.type}</span>
                  <span className="text-[10px] font-black text-navy-900 uppercase opacity-70 tracking-tight">Source: {item.source}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">{item.time}</span>
              </div>
              <p className="text-[12px] text-navy-900 leading-relaxed font-bold mb-5 uppercase tracking-tight">{item.content}</p>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="neo-button inline-flex items-center gap-2.5 px-4 py-2 text-[9px] font-black text-blue-800 hover:text-blue-900 transition-colors uppercase tracking-widest bg-slate-50">View Report <ExternalLink className="w-3 h-3" /></a>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="p-4 border-t border-black/10 bg-navy-900 text-white text-[9px] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <span className="opacity-80 uppercase tracking-tighter font-bold">{activeTab === 'latest' ? 'Live Intelligence' : 'Archives Active'}</span>
        </div>
        <span className="opacity-50 font-bold uppercase">{new Date().toISOString().substring(11, 16)} UTC</span>
      </div>
    </aside>
  );
}
