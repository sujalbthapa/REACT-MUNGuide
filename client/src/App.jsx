import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronRight, AlertTriangle, BookOpen, 
  Target, Info, MapPin, Check, FileText, HeartPulse, 
  Anchor, Lock, ArrowRight, ShieldCheck, HelpCircle,
  History, Zap, Globe, Brain
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import LiveFeed from './components/LiveFeed';
import IntelligenceCenter from './components/IntelligenceCenter';
import RulesLibrary from './components/RulesLibrary';
import ConstitutionLibrary from './components/ConstitutionLibrary';
import DiplomaticBlocs from './components/DiplomaticBlocs';
import { frontData, blocData, qarmas } from './data/mockData';

const SectionWrapper = ({ children, id, active }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={id === active ? "block" : "hidden"}
  >
    {children}
  </motion.div>
);

const Card = ({ children, className, pressed }) => (
  <div className={`${pressed ? 'neo-pressed' : 'neo-card'} p-8 ${className}`}>
    {children}
  </div>
);

const Tooltip = ({ text, children }) => (
  <span className="group relative inline-block cursor-help border-b-2 border-blue-600/30 text-blue-800 font-bold uppercase tracking-tighter text-[11px]">
    {children}
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-4 w-56 -translate-x-1/2 neo-card p-4 text-[11px] leading-relaxed text-slate-800 opacity-0 transition-all group-hover:opacity-100 z-50 border border-slate-200 font-bold shadow-xl bg-white">
      {text}
    </span>
  </span>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFront, setActiveFront] = useState('iran');
  const [checkedQarmas, setCheckedQarmas] = useState([]);
  const [selectedBriefing, setSelectedBriefing] = useState(null);

  const briefingDetails = {
    history: {
      title: "Historical Context",
      icon: History,
      color: "text-blue-600",
      content: "The history of instability in the region dates back to the Arab-Israeli war following the establishment of Israel in 1948. Persistent disputes over land, identity, and sovereignty resulted in several wars that continue to influence modern tensions. The core Israel-Palestine conflict remains unresolved, focusing on the need for Palestinian statehood balanced against Israeli security concerns. This has been further complicated by regional rivalries, particularly following the 1979 Iranian Revolution, which transformed Iran into a vehement opponent of Israel and divided the region along deep ideological lines."
    },
    escalation: {
      title: "Strategic Situation (2026)",
      icon: Zap,
      color: "text-amber-500",
      content: "As of 2026, the Situation in the Middle East has reached a critical phase. The Israeli-Hamas war in Gaza has caused catastrophic property destruction and a severe civilian death toll. Simultaneously, the long-standing tensions between Iran, the US, and Israel have shifted into a direct conventional conflict, characterized by missile exchanges and coordinated strategic attacks. This has heightened concerns regarding a broader regional conflict, as non-state actors like Hezbollah in Lebanon and the Houthi movement in Yemen have become increasingly involved, specifically impacting international maritime trade routes in the Red Sea."
    },
    humanitarian: {
      title: "Humanitarian Data",
      icon: HeartPulse,
      color: "text-red-600",
      content: "The humanitarian consequences of these conflicts are a primary focus for the international community. Millions across Gaza, Syria, and Yemen face displacement, acute food insecurity, and the collapse of healthcare infrastructure. Reports of International Humanitarian Law (IHL) violations are frequent, requiring urgent action from the Security Council. Compounding this is the concern regarding nuclear proliferation; regional developments have triggered an arms race that fundamentally impacts the regional balance of power and global security."
    },
    stalemate: {
      title: "Geopolitical Dynamics",
      icon: Lock,
      color: "text-navy-900",
      content: "Global geopolitical positioning continues to influence the path to resolution. The United States maintains a consistent policy in support of Israeli security, while Russia and China propose alternative diplomatic frameworks and often criticize Western regional influence. These diverging priorities can result in structural challenges within the Security Council, as the use of veto power can limit the Council's ability to take decisive action. Successful outcomes require navigating these political divides to establish regional security structures and build confidence between competing states."
    }
  };

  const toggleQarma = (id) => {
    setCheckedQarmas(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen font-sans selection:bg-blue-600 selection:text-white bg-slate-100">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Main Research Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 space-y-12 bg-[#f1f5f9]">
          
          <div className="lg:hidden flex justify-between items-center mb-8">
            <button onClick={() => setIsSidebarOpen(true)} className="neo-button p-3">
              <Menu className="w-5 h-5 text-navy-900" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="font-black text-xs tracking-[0.2em] uppercase text-navy-900">UNSC PORTAL</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <SectionWrapper key="home" id="home" active={activeSection}>
                <div className="neo-flat p-12 border-l-8 border-navy-900 mb-12 relative overflow-hidden bg-white">
                  <div className="relative z-10">
                    <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-none uppercase text-navy-900">
                      Welcome, <br/><span className="text-blue-700">Delegate</span>
                    </h2>
                    
                    <div className="mb-12 space-y-10">
                      <div className="flex items-center gap-3">
                         <div className="h-[2px] w-12 bg-blue-600" />
                         <span className="text-[12px] font-black uppercase text-slate-500 tracking-[0.4em]">Agenda: The Situation in the Middle East</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1: History */}
                        <div 
                          onClick={() => setSelectedBriefing('history')}
                          className="p-8 neo-card bg-white border-l-4 border-slate-300 group hover:border-blue-600 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                              <History className="w-16 h-16" />
                           </div>
                           <div className="flex items-center gap-4 mb-6">
                              <div className="p-2 bg-slate-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                                 <History className="w-5 h-5" />
                              </div>
                              <h4 className="text-[11px] font-black uppercase text-navy-900 tracking-widest italic tracking-tighter">Historical Context</h4>
                           </div>
                           <p className="text-slate-600 text-[12px] leading-relaxed font-bold uppercase tracking-tight opacity-90 line-clamp-3">
                              Rooted in the 1948 conflict, the region is defined by persistent disputes over land and sovereignty. This has evolved from a localized struggle into a broad spectrum of crises...
                           </p>
                           <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details <ArrowRight className="w-3 h-3" />
                           </div>
                        </div>

                        {/* Card 2: 2026 Escalation */}
                        <div 
                          onClick={() => setSelectedBriefing('escalation')}
                          className="p-8 neo-card bg-white border-l-4 border-blue-600 group hover:bg-blue-50 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                              <Zap className="w-16 h-16" />
                           </div>
                           <div className="flex items-center gap-4 mb-6">
                              <div className="p-2 bg-blue-50 text-blue-600">
                                 <Zap className="w-5 h-5" />
                              </div>
                              <h4 className="text-[11px] font-black uppercase text-navy-900 tracking-widest italic tracking-tighter">Current Situation</h4>
                           </div>
                           <p className="text-slate-600 text-[12px] leading-relaxed font-bold uppercase tracking-tight opacity-90 line-clamp-3">
                              The region has shifted from proxy skirmishes into direct state-on-state warfare. Active missile exchanges between major powers threat...
                           </p>
                           <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View Briefing <ArrowRight className="w-3 h-3" />
                           </div>
                        </div>

                        {/* Card 3: Humanitarian */}
                        <div 
                          onClick={() => setSelectedBriefing('humanitarian')}
                          className="p-8 neo-card bg-white border-l-4 border-red-600 group hover:bg-red-50 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                              <HeartPulse className="w-16 h-16" />
                           </div>
                           <div className="flex items-center gap-4 mb-6">
                              <div className="p-2 bg-red-50 text-red-600">
                                 <HeartPulse className="w-5 h-5" />
                              </div>
                              <h4 className="text-[11px] font-black uppercase text-navy-900 tracking-widest italic tracking-tighter">Humanitarian Data</h4>
                           </div>
                           <p className="text-slate-600 text-[12px] leading-relaxed font-bold uppercase tracking-tight opacity-90 line-clamp-3">
                               Displacement across Gaza, Syria, and Yemen has resulted in significant pressure on healthcare systems and regional stability...
                           </p>
                           <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View Metrics <ArrowRight className="w-3 h-3" />
                           </div>
                        </div>

                        {/* Card 4: Superpowers */}
                        <div 
                          onClick={() => setSelectedBriefing('stalemate')}
                          className="p-8 neo-card bg-white border-l-4 border-navy-900 group hover:bg-navy-50 transition-all cursor-pointer relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                              <Lock className="w-16 h-16" />
                           </div>
                           <div className="flex items-center gap-4 mb-6">
                              <div className="p-2 bg-navy-50 text-navy-900">
                                 <Lock className="w-5 h-5" />
                              </div>
                              <h4 className="text-[11px] font-black uppercase text-navy-900 tracking-widest italic tracking-tighter">Geopolitical Landscape</h4>
                           </div>
                           <p className="text-slate-600 text-[12px] leading-relaxed font-bold uppercase tracking-tight opacity-90 line-clamp-3">
                              Conflicting interests between major global powers influence the Council's ability to coordinate effective responses...
                           </p>
                           <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View Analysis <ArrowRight className="w-3 h-3" />
                           </div>
                        </div>
                      </div>

                      {/* --- BRIEFING MODAL --- */}
                      <AnimatePresence>
                        {selectedBriefing && (
                          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBriefing(null)} className="absolute inset-0 bg-navy-900/60 backdrop-blur-md" />
                            
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl max-h-[80vh] bg-white neo-flat overflow-hidden flex flex-col">
                               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                  <div className="flex items-center gap-4">
                                     <div className={`p-2 neo-button bg-white ${briefingDetails[selectedBriefing].color} border-none shadow-sm`}>
                                        {React.createElement(briefingDetails[selectedBriefing].icon, { className: "w-5 h-5" })}
                                     </div>
                                     <h3 className="text-2xl font-black text-navy-900 uppercase tracking-tighter italic">{briefingDetails[selectedBriefing].title}</h3>
                                  </div>
                                  <button onClick={() => setSelectedBriefing(null)} className="neo-button p-2 text-slate-400 hover:text-navy-900 transition-colors bg-white border-none shadow-none"><X className="w-6 h-6" /></button>
                               </div>

                               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white">
                                  <div className="space-y-8">
                                     <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 bg-blue-600" />
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">Research Data // 2026 Session</span>
                                     </div>
                                     <p className="text-[16px] text-navy-900 font-bold uppercase leading-relaxed tracking-tight border-l-8 border-slate-200 pl-10 py-4 italic">
                                        {briefingDetails[selectedBriefing].content}
                                     </p>
                                  </div>
                               </div>

                               <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                     <Globe className="w-4 h-4 text-slate-300" />
                                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Information Repository // Session_2026</span>
                                  </div>
                                  <button onClick={() => setSelectedBriefing(null)} className="neo-button px-8 py-3 bg-navy-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-navy-800 transition-all border-none">Close Information</button>
                               </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>

                      <div className="p-6 neo-pressed bg-slate-50 border border-slate-200 flex items-center gap-6">
                         <div className="shrink-0 p-3 neo-button bg-navy-900 text-white border-none shadow-lg">
                            <Info className="w-5 h-5" />
                         </div>
                         <p className="text-[11px] font-black text-slate-600 uppercase leading-relaxed tracking-tight">
                            Success for the Council depends on proposing effective solutions that balance immediate needs with long-term regional stability and cooperation.
                         </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 pt-4">
                      <button 
                        onClick={() => setActiveSection('wars')}
                        className="neo-button px-10 py-5 bg-navy-900 text-white text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3 border-none shadow-lg shadow-navy-900/20"
                      >
                        Active Conflicts <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Card className="relative overflow-hidden group bg-white">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-blue-800 flex items-center gap-3">
                      <BookOpen className="w-4 h-4" />
                      Research Objectives
                    </h3>
                    <ul className="space-y-8">
                      {[
                        { text: "Analyze the 4 active conflict zones to understand regional dynamics." },
                        { text: "Monitor the news center for real-time situational updates." },
                        { text: "Utilize actor profiles to build consensus for resolutions." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-6 items-start">
                          <div className="neo-pressed shrink-0 w-8 h-8 flex items-center justify-center text-[11px] font-black text-navy-900 bg-slate-50">
                            0{i+1}
                          </div>
                          <p className="text-[12px] text-navy-800 font-bold uppercase tracking-tight leading-relaxed">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="border-l-4 border-slate-300 bg-white">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-navy-900 flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4" />
                      Situational Assessment
                    </h3>
                    <p className="text-[12px] text-navy-800 font-bold uppercase tracking-tight leading-relaxed mb-10">
                      The regional situation remains unstable. Issues concerning <Tooltip text="The 2006 framework for peace in Lebanon.">Resolution 1701</Tooltip> and the <Tooltip text="A critical maritime energy trade route.">Strait of Hormuz</Tooltip> are high-priority research topics.
                    </p>
                    <div className="neo-pressed p-6 flex items-center gap-6 bg-slate-50">
                      <div className="w-12 h-12 neo-button bg-navy-900 flex items-center justify-center text-white font-black text-xs border-none">
                        P5
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 mb-1 tracking-widest">Decision Trends</p>
                        <p className="text-[11px] font-black text-navy-900 uppercase tracking-tighter">Increased complexity in consensus building</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </SectionWrapper>
            )}

            {activeSection === 'advisor' && (
              <SectionWrapper key="advisor" id="advisor" active={activeSection}>
                <div className="h-[calc(100vh-140px)] flex flex-col">
                  <IntelligenceCenter />
                </div>
              </SectionWrapper>
            )}

            {activeSection === 'wars' && (
              <SectionWrapper key="wars" id="wars" active={activeSection}>
                <div className="mb-12">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-navy-900">Active Conflicts</h2>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Current status of the primary conflict zones.</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                  {Object.keys(frontData).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveFront(key)}
                      className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeFront === key 
                        ? 'neo-pressed text-blue-700 bg-slate-100' 
                        : 'neo-button text-slate-500 hover:text-navy-900 bg-white'
                      }`}
                    >
                      {frontData[key].title.split(':')[0]}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={activeFront}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-10"
                >
                  <div className="space-y-10">
                    <div className="neo-flat p-12 bg-white border-l-8 border-navy-900 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <MapPin className="w-32 h-32 text-navy-900" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                          <Target className="w-6 h-6" />
                          <span className="font-black text-[10px] uppercase tracking-[0.3em] italic">Conflict Status Report</span>
                        </div>
                        <h3 className="text-5xl font-black uppercase tracking-tighter text-navy-900 mb-4">{frontData[activeFront].title}</h3>
                        <p className="text-sm font-black text-blue-700 uppercase tracking-widest mb-8">{frontData[activeFront].subtitle}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                          {[
                            { label: "Current Status", val: frontData[activeFront].status, color: "text-red-600" },
                            { label: "Location", val: frontData[activeFront].location, color: "text-navy-900" },
                            { label: "Coordinates", val: frontData[activeFront].coordinates, color: "text-slate-500" },
                            { label: "Intensity", val: `${frontData[activeFront].intensity}%`, color: "text-blue-600" }
                          ].map((stat, i) => (
                            <div key={i} className="neo-pressed p-4 bg-slate-50 border border-black/5">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">{stat.label}</p>
                              <p className={`text-[11px] font-black uppercase ${stat.color}`}>{stat.val}</p>
                            </div>
                          ))}
                        </div>

                        <div className="p-8 neo-pressed bg-slate-50 border border-black/5">
                          <p className="text-slate-600 text-[13px] leading-relaxed font-bold uppercase tracking-tight italic">
                            "{frontData[activeFront].summary}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Card className="bg-white">
                        <div className="flex items-center gap-3 mb-8">
                          <Anchor className="w-4 h-4 text-blue-600" />
                          <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-navy-900 italic">Regional Analysis</h4>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Allied Support</p>
                            <p className="text-[11px] font-black text-navy-900 uppercase leading-tight">{frontData[activeFront].detailed.allies}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Opposition</p>
                            <p className="text-[11px] font-black text-red-700 uppercase leading-tight">{frontData[activeFront].detailed.adversaries}</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-white">
                        <div className="flex items-center gap-3 mb-8">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-navy-900 italic">Impact Overview</h4>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Primary Effects</p>
                            <p className="text-[11px] font-black text-navy-900 uppercase leading-tight">{frontData[activeFront].detailed.effects}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Assessed Damages</p>
                            <p className="text-[11px] font-black text-red-700 uppercase leading-tight">{frontData[activeFront].detailed.damages}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              </SectionWrapper>
            )}

            {activeSection === 'law' && (
              <SectionWrapper key="law" id="law" active={activeSection}>
                <div className="mb-12">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-navy-900">International Law</h2>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Database of International Laws, Trade Regulations & Resolutions.</p>
                </div>
                <RulesLibrary />
              </SectionWrapper>
            )}

            {activeSection === 'constitutions' && (
              <SectionWrapper key="constitutions" id="constitutions" active={activeSection}>
                <div className="mb-12">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-navy-900">National Constitutions</h2>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Official Governing Documents of All UN Member States.</p>
                </div>
                <ConstitutionLibrary />
              </SectionWrapper>
            )}

            {activeSection === 'blocs' && (
              <SectionWrapper key="blocs" id="blocs" active={activeSection}>
                <DiplomaticBlocs />
              </SectionWrapper>
            )}

            {activeSection === 'toolkit' && (
              <SectionWrapper key="toolkit" id="toolkit" active={activeSection}>
                <div className="mb-12">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-navy-900">Delegate Toolkit</h2>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Checklist for council success.</p>
                </div>
                <div className="grid grid-cols-1 gap-12">
                  <Card className="bg-white">
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-12 text-navy-900 flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      Readiness Checklist
                    </h3>
                    <div className="space-y-6">
                      {qarmas.map((q) => (
                        <div 
                          key={q.id} 
                          onClick={() => toggleQarma(q.id)}
                          className={`group p-8 border-l-8 cursor-pointer transition-all ${
                            checkedQarmas.includes(q.id) 
                            ? 'bg-green-50 border-green-600' 
                            : 'bg-slate-50 border-slate-300 hover:border-blue-600'
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-6 h-6 border-4 flex items-center justify-center transition-colors ${
                              checkedQarmas.includes(q.id) ? 'bg-green-600 border-green-600' : 'border-slate-300 group-hover:border-blue-600'
                            }`}>
                              {checkedQarmas.includes(q.id) && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <h4 className={`text-sm font-black uppercase tracking-widest mb-1 transition-colors ${checkedQarmas.includes(q.id) ? 'text-green-900' : 'text-navy-900'}`}>{q.title}</h4>
                              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">{q.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </SectionWrapper>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent News Sidebar */}
        <aside className="w-[450px] hidden xl:flex flex-col bg-slate-50 border-l border-black/5 h-screen overflow-y-auto custom-scrollbar p-8 animate-in slide-in-from-right duration-500">
             <div className="mb-10 flex items-center gap-4">
                <div className="p-2 neo-button bg-navy-900 text-white border-none shadow-lg">
                   <Globe className="w-4 h-4" />
                </div>
                <div>
                   <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-navy-900">News Stream</h4>
                   <p className="text-[8px] font-black uppercase text-blue-600 tracking-widest mt-1">Live Updates</p>
                </div>
             </div>
             <LiveFeed />
          </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

const UserCheckIcon = ({ className }) => <Users className={className} />;
const UserMinusIcon = ({ className }) => <Users className={className} />;
