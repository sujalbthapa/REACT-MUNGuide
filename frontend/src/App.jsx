import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronRight, AlertTriangle, BookOpen, 
  Target, Info, MapPin, Check, FileText, HeartPulse, 
  Anchor, Lock, ArrowRight, ShieldCheck, HelpCircle,
  History, Zap, Globe, Brain, Scale, Calendar, ExternalLink,
  Layers, Briefcase, Landmark, Activity, Users, LayoutDashboard, LayoutGrid, Swords
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import LiveFeed from './components/LiveFeed';
import IntelligenceCenter from './components/IntelligenceCenter';
import RulesLibrary from './components/RulesLibrary';
import ConstitutionLibrary from './components/ConstitutionLibrary';
import DiplomaticBlocs from './components/DiplomaticBlocs';
import CommitteeMatrix from './components/CommitteeMatrix';
import StudyGuidelines from './components/StudyGuidelines';
import { frontData, qarmas, flagMapping } from './data/mockData';

const getFlagUrl = (name) => {
  if (!name) return null;
  let iso = flagMapping[name];
  if (!iso) {
    const key = Object.keys(flagMapping).find(k => name.includes(k) || k.includes(name));
    if (key) iso = flagMapping[key];
  }
  return iso ? `/flags/${iso.toLowerCase()}.svg` : null;
};

const renderListWithFlags = (text, textColor) => (
  <div className={`text-[13px] font-black uppercase flex flex-wrap gap-x-4 gap-y-2 mt-1 ${textColor}`}>
    {text.split(',').map((item, index) => {
      const rawName = item.trim();
      const queryName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
      const flag = getFlagUrl(queryName);
      return (
        <div key={index} className="flex items-center gap-1.5">
          {flag ? <img src={flag} alt="" className="w-4 h-2.5 object-cover" /> : <Globe className="w-3 h-3 opacity-50" />}
          <span>{rawName}</span>
        </div>
      );
    })}
  </div>
);

const SectionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const Card = ({ children, className, pressed }) => (
  <div className={`${pressed ? 'neo-pressed' : 'neo-card'} p-6 ${className}`}>
    {children}
  </div>
);

const Tooltip = ({ text, children }) => (
  <span className="group relative inline-block cursor-help border-b border-[#009EDB]/20 text-[#009EDB] font-bold uppercase tracking-tighter text-[9px]">
    {children}
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-40 -translate-x-1/2 bg-white p-2.5 text-[9px] leading-relaxed text-slate-800 opacity-0 transition-all group-hover:opacity-100 z-50 border border-slate-100 shadow-xl font-bold uppercase">
      {text}
    </span>
  </span>
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFront, setActiveFront] = useState('iran');
  const [selectedBriefing, setSelectedBriefing] = useState(null);

  const isHome = location.pathname === '/';

  const briefingDetails = {
    history: {
      title: "Historical Context",
      icon: History,
      color: "text-[#009EDB]",
      content: "The history of instability in the region dates back to the Arab-Israeli war following the establishment of Israel in 1948. Persistent disputes over land, identity, and sovereignty resulted in several wars that continue to influence modern tensions."
    },
    escalation: {
      title: "Strategic Situation",
      icon: Zap,
      color: "text-amber-500",
      content: "As of 2026, the Situation in the Middle East has reached a critical phase. The Israeli-Hamas war in Gaza has caused catastrophic property destruction and a severe civilian death toll. Tensions between Iran and regional actors have shifted into direct confrontation."
    },
    humanitarian: {
      title: "Humanitarian Data",
      icon: HeartPulse,
      color: "text-red-600",
      content: "The humanitarian consequences are a primary focus. Millions across Gaza, Syria, and Yemen face displacement, acute food insecurity, and the collapse of healthcare infrastructure. Urgent action is required from the Security Council."
    },
    stalemate: {
      title: "Geopolitical Dynamics",
      icon: Lock,
      color: "text-navy-900",
      content: "Global geopolitical positioning continues to influence the path to resolution. Diverging priorities among P5 members can result in structural challenges within the Council. Successful outcomes require navigating these political divides."
    }
  };

  return (
    <div className="flex min-h-screen font-sans selection:bg-[#009EDB]/30 selection:text-[#001E3D] bg-white text-slate-700 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden bg-slate-50/30">
        <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ${
          isHome ? 'p-6 lg:p-10 space-y-10' : 'p-0'
        }`}>
          
          <div className={`lg:hidden flex justify-between items-center mb-6 ${!isHome ? 'px-6 pt-6' : ''}`}>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-white border border-slate-100 shadow-sm rounded-none">
              <Menu className="w-5 h-5 text-navy-900" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white p-0.5 border border-slate-100 shadow-sm">
                <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-[9px] tracking-widest uppercase text-navy-900 italic">UNSC PORTAL</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <SectionWrapper>
                  <div className="p-10 lg:p-12 border-l-4 border-[#009EDB] mb-10 relative overflow-hidden bg-white shadow-sm">
                    <div className="absolute -top-10 -right-10 opacity-[0.02] pointer-events-none">
                       <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-96 h-96 object-contain" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-8 mb-10 pb-8 border-b border-slate-100">
                         <div className="w-24 h-24 bg-white p-3 border border-slate-100 shadow-sm shrink-0">
                            <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
                         </div>
                         <div className="flex flex-col gap-1">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase text-navy-900 italic leading-none">
                               Welcome, <span className="text-[#009EDB]">Delegate</span>
                            </h2>
                            <div className="flex flex-col gap-0.5 mt-4">
                               <h1 className="text-base font-black uppercase tracking-[0.2em] text-navy-900">United Nations Security Council</h1>
                               <div className="bg-[#001E3D] text-[#009EDB] py-1 px-3 w-fit">
                                  <p className="text-[12px] font-black uppercase tracking-[0.2em] italic">Agenda : Situation in the Middle East</p>
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="mb-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.keys(briefingDetails).map(key => (
                            <div 
                              key={key}
                              onClick={() => setSelectedBriefing(key)}
                              className="p-6 bg-white border border-slate-100 group hover:border-[#009EDB] transition-all cursor-pointer relative shadow-sm hover:shadow-md"
                            >
                               <div className="flex items-center gap-4 mb-4">
                                  <div className="p-2 bg-slate-50 text-slate-400 group-hover:text-[#009EDB] transition-colors border border-slate-100">
                                     {React.createElement(briefingDetails[key].icon, { className: "w-5 h-5" })}
                                  </div>
                                  <h4 className="text-[10px] font-black uppercase text-navy-900 tracking-widest italic">{briefingDetails[key].title}</h4>
                               </div>
                               <p className="text-slate-500 text-[11px] leading-relaxed font-bold uppercase tracking-tight opacity-80 line-clamp-2">
                                  {briefingDetails[key].content}
                               </p>
                               <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[#009EDB] text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                  Access Node <ArrowRight className="w-3 h-3" />
                               </div>
                            </div>
                          ))}
                        </div>

                        <AnimatePresence>
                          {selectedBriefing && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBriefing(null)} className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" />
                              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-3xl bg-white shadow-2xl border-t-4 border-[#009EDB] overflow-hidden flex flex-col">
                                 <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                    <div className="flex items-center gap-4">
                                       <div className={`p-2 bg-white ${briefingDetails[selectedBriefing].color} border border-slate-100 shadow-sm`}>
                                          {React.createElement(briefingDetails[selectedBriefing].icon, { className: "w-5 h-5" })}
                                       </div>
                                       <h3 className="text-xl font-black text-navy-900 uppercase tracking-tighter italic">{briefingDetails[selectedBriefing].title}</h3>
                                    </div>
                                    <button onClick={() => setSelectedBriefing(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
                                 </div>
                                 <div className="p-8 lg:p-10 overflow-y-auto">
                                    <p className="text-[15px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight border-l-4 border-slate-100 pl-8 py-2 italic opacity-90">
                                       {briefingDetails[selectedBriefing].content}
                                    </p>
                                 </div>
                                 <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Source: UNSC_ARC_2026</span>
                                    <button onClick={() => setSelectedBriefing(null)} className="px-6 py-2.5 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all">CLOSE</button>
                                 </div>
                              </motion.div>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button onClick={() => navigate('/conflicts')} className="px-8 py-4 bg-[#009EDB] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#007AB8] flex items-center gap-3 shadow-lg transition-all active:scale-95 italic">Tactical Briefings <ArrowRight className="w-4 h-4" /></button>
                        <button onClick={() => navigate('/study')} className="px-8 py-4 bg-white text-navy-900 text-[11px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all italic">Research Guidelines</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 border-t-4 border-[#009EDB] shadow-sm">
                      <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 text-[#009EDB] flex items-center gap-3 italic"><BookOpen className="w-4 h-4" /> Operational Objectives</h3>
                      <ul className="space-y-6">
                        {["Map conflict vulnerabilities.", "Monitor security feeds.", "Coordinate bloc consensus."].map((text, i) => (
                          <li key={i} className="flex gap-5 items-start">
                            <span className="text-[12px] font-black text-[#009EDB] italic">0{i+1}.</span>
                            <p className="text-[12px] text-navy-800 font-bold uppercase tracking-tight opacity-80">{text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-8 border-t-4 border-navy-900 shadow-sm">
                      <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 text-navy-900 flex items-center gap-3 italic"><AlertTriangle className="w-4 h-4" /> Assessment Note</h3>
                      <p className="text-[13px] text-navy-900 font-bold uppercase leading-relaxed italic border-l-2 border-slate-100 pl-6 mb-8 opacity-80">
                        Focus research on <Tooltip text="The 2006 framework.">Res 1701</Tooltip> and <Tooltip text="Maritime energy corridor.">Strait of Hormuz</Tooltip> escalations.
                      </p>
                      <div className="p-4 bg-slate-50 border border-slate-100 flex items-center gap-5 shadow-inner">
                        <div className="w-10 h-10 bg-navy-900 flex items-center justify-center text-white font-black text-xs italic">P5</div>
                        <p className="text-[11px] font-black text-navy-900 uppercase italic">Multi-Polar Decision Trends</p>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              } />

              <Route path="/conflicts" element={
                <SectionWrapper>
                  <div className="h-screen flex flex-col bg-white overflow-hidden">
                    {/* --- HEADER --- */}
                    <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
                      <div className="flex items-center gap-5">
                         <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-slate-50 border border-slate-100 shadow-sm">
                               <Swords className="w-4 h-4 text-[#009EDB]" />
                            </div>
                            <h3 className="font-black text-base uppercase tracking-tighter text-[#001E3D] italic leading-none">
                               Active<span className="text-[#009EDB]">_Conflicts</span>
                            </h3>
                         </div>
                         <div className="h-6 w-[1px] bg-slate-200 mx-4" />
                         <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] mt-0.5 italic">
                            Situational Intelligence & Conflict Mapping
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
                        <div className="flex flex-wrap gap-2 mb-8">
                          {Object.keys(frontData).map((key) => (
                            <button key={key} onClick={() => setActiveFront(key)} className={`px-5 py-2.5 text-[8px] font-black uppercase tracking-widest transition-all border ${activeFront === key ? 'bg-[#001E3D] text-white border-[#001E3D]' : 'bg-white text-slate-400 border-slate-100 hover:text-navy-900 hover:border-slate-300'}`}>{frontData[key].title.split(':')[0]}</button>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div key={activeFront} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-8">
                            <div className="bg-white p-10 border border-slate-100 relative overflow-hidden shadow-sm">
                              <div className="absolute top-0 right-0 p-6 opacity-[0.01]"><MapPin className="w-24 h-24 text-navy-900" /></div>
                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 text-[#009EDB]">
                                  <Target className="w-4 h-4" />
                                  <span className="font-black text-[9px] uppercase tracking-[0.2em] italic opacity-60">Situational Analysis Report</span>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-1">
                                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-navy-900 italic leading-tight">{frontData[activeFront].title}</h3>
                                  <div className="flex items-center gap-2">
                                    {({
                                      iran: ['Israel', 'Iran', 'USA'],
                                      lebanon: ['Israel', 'Lebanon', 'Iran'],
                                      gaza: ['Israel', 'Palestine'],
                                      proxy: ['USA', 'UK', 'Yemen', 'Iran'],
                                      syria: ['Syria', 'Russia', 'Iran', 'Israel'],
                                      westbank: ['Israel', 'Palestine']
                                    }[activeFront] || []).map(actor => {
                                      const flag = getFlagUrl(actor);
                                      return flag ? (
                                        <div key={actor} className="relative group cursor-help">
                                          <img src={flag} alt={actor} className="w-10 h-7 object-cover border border-slate-200 shadow-sm" />
                                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[#001E3D] text-white text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">{actor}</span>
                                        </div>
                                      ) : null;
                                    })}
                                  </div>
                                </div>
                                <p className="text-sm font-black text-[#009EDB] uppercase tracking-widest mb-8 italic opacity-80">{frontData[activeFront].subtitle}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                  {[
                                    { label: "Status", val: frontData[activeFront].status, color: "text-red-600" },
                                    { label: "Location", val: frontData[activeFront].location, color: "text-navy-900" },
                                    { label: "Vector", val: frontData[activeFront].coordinates, color: "text-slate-400" },
                                    { label: "Intensity", val: `${frontData[activeFront].intensity}%`, color: "text-[#009EDB]" }
                                  ].map((stat, i) => (
                                    <div key={i} className="p-4 bg-white border border-slate-200/60 flex flex-col gap-1.5 shadow-sm">
                                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                                      <p className={`text-[11px] font-black uppercase italic ${stat.color}`}>{stat.val}</p>
                                    </div>
                                  ))}
                                </div>

                                <div className="p-8 bg-white border border-slate-100 border-l-[10px] border-[#001E3D] mb-10 shadow-sm">
                                  <p className="text-navy-900 text-[16px] leading-relaxed font-medium uppercase tracking-tight italic opacity-90">
                                    "{frontData[activeFront].summary}"
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                   <div className="space-y-8">
                                      <div className="space-y-3">
                                         <h4 className="text-[10px] font-black uppercase text-[#009EDB] tracking-widest border-b border-slate-100 pb-1 italic">Intelligence Context</h4>
                                         <p className="text-[13px] text-slate-600 font-bold leading-relaxed uppercase italic opacity-80">{frontData[activeFront].context}</p>
                                      </div>
                                      <div className="space-y-3">
                                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-1 italic">Nations Involved</h4>
                                         <div className="flex flex-wrap gap-2 pt-1">
                                            {(frontData[activeFront].involvedNations || []).map(nation => {
                                              const flag = getFlagUrl(nation);
                                              return (
                                                <div key={nation} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 shadow-sm">
                                                  {flag ? <img src={flag} alt="" className="w-4 h-2.5 object-cover" /> : <Globe className="w-3 h-3 text-slate-300" />}
                                                  <span className="text-[8px] font-black uppercase text-navy-900 italic">{nation}</span>
                                                </div>
                                              );
                                            })}
                                         </div>
                                      </div>
                                      <div className="space-y-3">
                                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-1 italic">Binding Resolutions</h4>
                                         <div className="flex flex-wrap gap-2 pt-1">
                                            {frontData[activeFront].resolutions.map(res => (
                                              <span key={res} className="px-4 py-2 bg-slate-50 text-navy-900 text-[8px] font-black uppercase border border-slate-200 italic shadow-sm">{res}</span>
                                            ))}
                                         </div>
                                      </div>
                                   </div>
                                   <div className="space-y-8">
                                      <div className="space-y-3">
                                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-1 italic">Operational Log</h4>
                                         <div className="flex items-center gap-3 p-4 bg-[#001E3D] text-white shadow-lg border border-white/5">
                                            <Calendar className="w-4 h-4 text-[#009EDB]" />
                                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">ESCALATION_POINT: {frontData[activeFront].engaged}</p>
                                         </div>
                                         <p className="text-[13px] text-slate-500 font-medium uppercase italic border-l border-slate-200 pl-5 leading-relaxed">{frontData[activeFront].history}</p>
                                      </div>
                                   </div>
                                </div>

                                <div className="mt-10 p-6 bg-[#001E3D] text-white relative overflow-hidden shadow-xl border-l-[8px] border-[#009EDB] group">
                                   <div className="relative z-10 space-y-4">
                                      <div className="flex items-center gap-2 text-[#009EDB]">
                                         <Scale className="w-4 h-4" />
                                         <h4 className="font-black text-[10px] uppercase tracking-widest italic leading-none">Legal Directives</h4>
                                      </div>
                                      <p className="text-lg md:text-xl font-medium leading-relaxed italic border-l border-white/10 pl-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                         "{frontData[activeFront].study_note}"
                                      </p>
                                   </div>
                                </div>

                                <div className="mt-16 space-y-6">
                                   <h4 className="text-[10px] font-black uppercase text-navy-900 tracking-widest italic border-b border-slate-100 pb-2">Technical Repository</h4>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                      {(frontData[activeFront].study_links || []).map((link, i) => (
                                         <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-navy-900 flex flex-col gap-3 group hover:border-[#009EDB] transition-all border border-slate-200 shadow-sm italic">
                                            <div className="flex justify-between items-start">
                                               <span className="text-[9px] font-black uppercase tracking-widest leading-tight opacity-70 group-hover:opacity-100">{link.label}</span>
                                               <ExternalLink className="w-2.5 h-2.5 text-slate-200 group-hover:text-[#009EDB]" />
                                            </div>
                                         </a>
                                      ))}
                                   </div>
                                </div>

                                <div className="mt-16 p-8 bg-red-50 border border-red-100 border-l-[12px] border-red-500 flex flex-col sm:flex-row gap-8 items-center shadow-sm">
                                   <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
                                   <div className="space-y-1">
                                      <h4 className="text-[10px] font-black uppercase text-red-600 tracking-widest italic leading-none">Assessment Summary</h4>
                                      <p className="text-xl text-red-900 font-black uppercase tracking-tight italic leading-tight">
                                         {frontData[activeFront].damages}
                                      </p>
                                   </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                  <div className="bg-white p-8 border-t-4 border-[#009EDB] shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-8 text-[#009EDB]">
                                      <Anchor className="w-5 h-5" />
                                      <h4 className="font-black text-[10px] uppercase tracking-[0.3em] italic">Regional Power Breakdown</h4>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="p-5 bg-slate-50 border border-slate-100 italic">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Direct Allies & Support</p>
                                        {renderListWithFlags(frontData[activeFront].detailed.allies, "text-[#001E3D]")}
                                      </div>
                                      <div className="p-5 bg-slate-50 border border-slate-100 italic">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Operational Adversaries</p>
                                        {renderListWithFlags(frontData[activeFront].detailed.adversaries, "text-red-700")}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-white p-8 border-t-4 border-red-600 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-8 text-red-600">
                                      <AlertTriangle className="w-5 h-5" />
                                      <h4 className="font-black text-[10px] uppercase tracking-[0.3em] italic">Impact Analysis</h4>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="p-5 bg-slate-50 border border-slate-100 italic">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Strategic Consequences</p>
                                        <p className="text-[13px] font-black text-[#001E3D] uppercase">{frontData[activeFront].detailed.effects}</p>
                                      </div>
                                      <div className="p-5 bg-slate-50 border border-slate-100 italic">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Structural Damage Report</p>
                                        <p className="text-[13px] font-black text-red-700 uppercase">{frontData[activeFront].detailed.damages}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              } />

              <Route path="/matrix" element={<SectionWrapper><CommitteeMatrix /></SectionWrapper>} />
              <Route path="/law" element={<SectionWrapper><div className="p-8 lg:p-12"><RulesLibrary /></div></SectionWrapper>} />
              <Route path="/constitutions" element={<SectionWrapper><div className="p-8 lg:p-12"><ConstitutionLibrary /></div></SectionWrapper>} />
              <Route path="/blocs" element={<SectionWrapper><DiplomaticBlocs /></SectionWrapper>} />
              <Route path="/study" element={<SectionWrapper><StudyGuidelines /></SectionWrapper>} />
            </Routes>
          </AnimatePresence>
        </div>


      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
