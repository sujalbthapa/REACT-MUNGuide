import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, BookOpen, ShieldAlert, ArrowRight, Target, Network, CheckCircle2, Search, Zap, Scale, FileText, Lock, Brain, 
  ChevronDown, Gavel, Users, Flag, MessageSquare, Repeat, List, AlertTriangle, Shield, Globe, Info
} from 'lucide-react';

export default function StudyGuidelines() {
  const [activeModule, setActiveTab] = useState(0);

  const trainingModules = [
    {
      title: "Core Protocols",
      icon: Scale,
      subtitle: "Mastering the Flow of Debate",
      color: "border-blue-500",
      textColor: "text-blue-600",
      bg: "bg-blue-50/50",
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
            The foundation of every MUN session. Success starts with knowing when to speak and how to raise your voice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-slate-100 shadow-sm">
               <h5 className="text-[11px] font-black text-blue-600 uppercase mb-4 tracking-widest italic flex items-center gap-2">
                  <Flag className="w-3 h-3" /> The GSL (General Speaker's List)
               </h5>
               <p className="text-xs text-slate-500 font-bold uppercase leading-relaxed mb-4">
                  The default state of committee. Your primary platform to establish national policy and set red lines.
               </p>
               <ul className="space-y-2">
                  <li className="text-[10px] font-black uppercase text-navy-900 flex items-center gap-2">
                     <div className="w-1 h-1 bg-blue-500" /> Default Time: 60-90 Seconds
                  </li>
                  <li className="text-[10px] font-black uppercase text-navy-900 flex items-center gap-2">
                     <div className="w-1 h-1 bg-blue-500" /> Yields: Chair, Delegate, or PoIs
                  </li>
               </ul>
            </div>
            <div className="bg-white p-6 border border-slate-100 shadow-sm">
               <h5 className="text-[11px] font-black text-blue-600 uppercase mb-4 tracking-widest italic flex items-center gap-2">
                  <Info className="w-3 h-3" /> Procedural Points
               </h5>
               <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                     <span className="text-[9px] font-black uppercase text-navy-900">Personal Privilege</span>
                     <span className="text-[8px] font-bold text-slate-400">Audibility/Comfort</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                     <span className="text-[9px] font-black uppercase text-navy-900">Point of Order</span>
                     <span className="text-[8px] font-bold text-slate-400">Rule Violation</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-black uppercase text-navy-900">Parl. Inquiry</span>
                     <span className="text-[8px] font-bold text-slate-400">Clarification</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white border-l-[12px] border-blue-500">
             <h6 className="text-[10px] font-black text-blue-400 uppercase mb-2 italic">Pro-Tip: Recognition Protocol</h6>
             <p className="text-[11px] font-bold uppercase italic opacity-70 leading-relaxed">
                Always wait for the Chair to say "The floor is open for any points or motions" before raising your placard. Never speak before being formally recognized.
             </p>
          </div>
        </div>
      )
    },
    {
      title: "Negotiation Mechanics",
      icon: Users,
      subtitle: "Moderated & Unmoderated Caucuses",
      color: "border-cyan-500",
      textColor: "text-cyan-600",
      bg: "bg-cyan-50/50",
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-cyan-500 pl-6 py-2">
             Debate moves from the general to the specific during caucuses. This is where alliances are forged and documents are written.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <SectionHeader title="Moderated Caucus" color="text-cyan-600" />
                <div className="p-6 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-5"><MessageSquare className="w-12 h-12" /></div>
                   <p className="text-xs text-slate-500 font-bold uppercase mb-4 leading-relaxed">Focus on specific sub-topics. Chair calls speakers one-by-one. No yields allowed.</p>
                   <div className="p-3 bg-cyan-50 border border-cyan-100">
                      <p className="text-[9px] font-black text-cyan-700 uppercase italic">Required Script:</p>
                      <p className="text-[9px] font-bold uppercase text-navy-900 mt-1 italic">"Motion for a [X] min Mod-Caucus on the topic of [Y] with a [Z] second speaking time."</p>
                   </div>
                </div>
             </div>
             <div className="space-y-4">
                <SectionHeader title="Unmoderated Caucus" color="text-cyan-600" />
                <div className="p-6 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-5"><Users className="w-12 h-12" /></div>
                   <p className="text-xs text-slate-500 font-bold uppercase mb-4 leading-relaxed">Informal lobbying. Delegates move freely to form blocs and draft Working Papers.</p>
                   <div className="p-3 bg-cyan-50 border border-cyan-100">
                      <p className="text-[9px] font-black text-cyan-700 uppercase italic">Required Script:</p>
                      <p className="text-[9px] font-bold uppercase text-navy-900 mt-1 italic">"Motion for an unmoderated caucus for the purpose of [Lobbying/Writing] for [X] minutes."</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 bg-[#001E3D] text-white border-l-[12px] border-red-500">
             <h5 className="text-[10px] font-black uppercase text-red-500 mb-2 italic">Tie-Breaking Rules</h5>
             <p className="text-[11px] font-bold uppercase italic opacity-80 leading-relaxed">
               If multiple motions are on the floor, the Chair votes on them from <strong>Most Disruptive</strong> to <strong>Least Disruptive</strong>. Unmods &gt; Mods &gt; Extensions.
             </p>
          </div>
        </div>
      )
    },
    {
      title: "Legislative Architecture",
      icon: FileText,
      subtitle: "Papers, Resolutions & Amendments",
      color: "border-violet-500",
      textColor: "text-violet-600",
      bg: "bg-violet-50/50",
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-violet-500 pl-6 py-2">
             The evolution of an idea: From a simple Working Paper to a binding Security Council Resolution.
          </p>

          <div className="relative pl-12 space-y-12">
             <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-200"></div>
             
             {[
               { t: "Working Paper", desc: "Informal collection of ideas. No signatures required. Becomes the basis for debate.", icon: Search },
               { t: "Draft Resolution", desc: "Formal document in UN format. Requires Sponsors (Authors) and Signatories (Supporters).", icon: Target },
               { t: "Amendment", desc: "Surgical changes (Addition, Deletion, Modification) to a Draft Resolution.", icon: Zap }
             ].map((step, i) => (
                <div key={i} className="relative">
                   <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-violet-600 border-4 border-white shadow-md flex items-center justify-center z-10">
                      <step.icon className="w-3 h-3 text-white" />
                   </div>
                   <div className="p-5 bg-white border border-slate-100 shadow-sm">
                      <h6 className="text-[11px] font-black text-violet-700 uppercase italic mb-1 tracking-wider">{step.t}</h6>
                      <p className="text-[10px] font-bold uppercase text-slate-500 leading-relaxed italic opacity-80">{step.desc}</p>
                   </div>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-slate-900 border-l-[10px] border-violet-500 text-white">
                <h6 className="text-[10px] font-black text-violet-400 uppercase mb-3 italic tracking-widest text-center">Amendment Types</h6>
                <div className="grid grid-cols-2 gap-4">
                   <div className="text-center p-2 bg-white/5 border border-white/10">
                      <p className="text-[9px] font-black text-green-500 mb-1">FRIENDLY</p>
                      <p className="text-[8px] font-bold uppercase opacity-60">Auto-Incorporated</p>
                   </div>
                   <div className="text-center p-2 bg-white/5 border border-white/10">
                      <p className="text-[9px] font-black text-red-500 mb-1">UNFRIENDLY</p>
                      <p className="text-[8px] font-bold uppercase opacity-60">Requires Vote</p>
                   </div>
                </div>
             </div>
             <div className="p-6 bg-slate-900 border-l-[10px] border-violet-500 text-white">
                <h6 className="text-[10px] font-black text-violet-400 uppercase mb-3 italic tracking-widest text-center">Dais Protocol</h6>
                <p className="text-[10px] font-bold uppercase italic opacity-70 leading-relaxed text-center">
                   Upon introduction of an amendment, the Chair will always ask the Authors: <br/>
                   <span className="text-white opacity-100 mt-2 block font-black">"IS THIS FRIENDLY OR UNFRIENDLY?"</span>
                </p>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "The Final Tally",
      icon: Gavel,
      subtitle: "Voting Rounds & Majorities",
      color: "border-green-500",
      textColor: "text-green-600",
      bg: "bg-green-50/50",
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-green-500 pl-6 py-2">
             The debate is over. The committee now moves into formal voting procedure to decide the outcome of the agenda.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
             {[
               { r: "R1", t: "Initial Stances", d: "Yes, No, Abstain, or Yes/No with Rights. (Authors cannot have rights)." },
               { r: "R2", t: "Explanations", d: "Delegates with rights explain their deviation from policy." },
               { r: "R3", t: "Final Vote", d: "The definitive tally where everyone must cast their final vote." }
             ].map((round, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-6 shadow-sm flex flex-col items-center">
                   <span className="text-lg font-black text-green-600 bg-green-50 px-3 py-1 mb-4 border border-green-200">{round.r}</span>
                   <h6 className="text-[10px] font-black uppercase text-navy-900 mb-2 italic tracking-tighter">{round.t}</h6>
                   <p className="text-[9px] font-bold uppercase text-slate-400 leading-tight">{round.d}</p>
                </div>
             ))}
          </div>

          <div className="p-8 bg-[#001E3D] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-20 h-20" />
            </div>
            <div className="text-sm font-black text-green-400 uppercase mb-4 tracking-[0.2em] italic flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400" /> Veto Power Warning
            </div>
            <div className="space-y-4 relative z-10">
              <p className="text-[11px] font-bold uppercase italic opacity-70 leading-relaxed">
                In the Security Council, any substantive resolution requires 9/15 affirmative votes and <strong>ZERO "NO" votes from the P5 members.</strong>
              </p>
              <div className="p-4 bg-white/5 border border-white/10 transform skew-x-[-3deg]">
                 <p className="text-[10px] font-black uppercase text-red-500 italic">CRITICAL: A single P5 "NO" fails the entire resolution automatically.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "UNSC Mandate",
      icon: ShieldAlert,
      subtitle: "Chapter VII & Enforcement",
      color: "border-red-500",
      textColor: "text-red-600",
      bg: "bg-red-50/50",
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-red-500 pl-6 py-2">
             Understand the unique enforcement powers of the Security Council compared to other UN organs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 bg-white border border-slate-100 shadow-sm border-l-8 border-red-600">
                <h5 className="text-[11px] font-black text-navy-900 uppercase italic mb-3 tracking-widest">Chapter VI: Peace</h5>
                <p className="text-xs font-bold uppercase text-slate-500 italic leading-relaxed">Focus on mediation, arbitration, and recommendations. Non-binding measures to resolve disputes.</p>
             </div>
             <div className="p-8 bg-white border border-slate-100 shadow-sm border-l-8 border-red-600">
                <h5 className="text-[11px] font-black text-navy-900 uppercase italic mb-3 tracking-widest">Chapter VII: Enforcement</h5>
                <p className="text-xs font-bold uppercase text-slate-500 italic leading-relaxed">Binding mandates including Sanctions, Peacekeeping deployment, and Authorizing Use of Force.</p>
             </div>
          </div>

          <div className="bg-slate-900 p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Globe className="w-40 h-40" /></div>
             <SectionHeader title="The Global Impact" color="text-red-500" />
             <p className="text-sm font-bold uppercase italic opacity-70 leading-relaxed mb-6">
                Your actions in this council set global precedents. Use Chapter VII sparingly; aggressive mandates without consensus often lead to committee fracture and geopolitical gridlock.
             </p>
             <div className="flex gap-4">
                <div className="px-3 py-1 bg-red-600 text-[8px] font-black uppercase tracking-widest">Mandatory Compliance</div>
                <div className="px-3 py-1 bg-white/10 text-[8px] font-black uppercase tracking-widest border border-white/20">International Legitimacy</div>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* HEADER */}
      <div className="bg-white p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-navy-900 border border-slate-100 shadow-xl">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-navy-900 italic leading-none">
                PROCEDURAL <span className="text-blue-500">ACADEMY</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="px-2 py-0.5 bg-blue-500 text-white text-[8px] font-black uppercase tracking-widest italic">CURRICULUM</div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.4em] italic">DELEGATE PREPARATION HUB</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:block text-right">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">UNSC Refined Preparation</p>
              <p className="text-[10px] font-black uppercase text-navy-900 italic mt-1">Unified Procedural Standards</p>
           </div>
           <div className="w-12 h-12 bg-white p-2 border border-slate-100 shadow-lg">
             <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" alt="UN" />
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* MODULE SELECTION (LEFT) */}
        <div className="w-full lg:w-96 border-r border-slate-100 bg-slate-50/30 overflow-y-auto custom-scrollbar shrink-0 p-6 md:p-10 space-y-4">
           <SectionTitle>Training Modules</SectionTitle>
           <div className="space-y-3">
              {trainingModules.map((module, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full text-left p-6 transition-all relative overflow-hidden group ${
                    activeModule === i 
                    ? 'bg-white border-l-[6px] '+module.color+' shadow-xl' 
                    : 'bg-white/40 border border-slate-100 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className={`p-2 ${activeModule === i ? module.bg : 'bg-slate-100'} transition-colors`}>
                      <module.icon className={`w-5 h-5 ${activeModule === i ? module.textColor : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest italic ${activeModule === i ? 'text-navy-900' : 'text-slate-400'}`}>
                        {module.title}
                      </h4>
                      <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{module.subtitle}</p>
                    </div>
                  </div>
                  {activeModule === i && (
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                      <module.icon className="w-20 h-20" />
                    </div>
                  )}
                </button>
              ))}
           </div>

           <div className="mt-10 p-6 bg-navy-900 text-white rounded-none border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                 <Shield className="w-12 h-12" />
              </div>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 italic">Ready for Debate?</h5>
              <p className="text-[9px] font-bold uppercase opacity-60 leading-relaxed mb-6">Familiarize yourself with all modules to ensure maximum procedural effectiveness.</p>
              <div className="h-[1px] w-full bg-white/10 mb-4" />
              <div className="flex items-center gap-2 text-[8px] font-black text-blue-400 uppercase tracking-widest italic">
                 BRMUN MISSION READY <ArrowRight className="w-3 h-3" />
              </div>
           </div>
        </div>

        {/* MODULE CONTENT (RIGHT) */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-8 md:p-14 lg:p-20">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-6 mb-12">
                   <div className={`p-5 rounded-none border border-slate-100 shadow-2xl ${trainingModules[activeModule].bg}`}>
                      {React.createElement(trainingModules[activeModule].icon, { className: "w-10 h-10 " + trainingModules[activeModule].textColor })}
                   </div>
                   <div>
                      <h3 className="text-4xl font-black text-navy-900 uppercase tracking-tighter italic leading-none mb-3">
                         {trainingModules[activeModule].title}
                      </h3>
                      <p className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] italic">
                         {trainingModules[activeModule].subtitle}
                      </p>
                   </div>
                </div>

                <div className="h-[2px] w-full bg-slate-50 mb-12" />

                {trainingModules[activeModule].content}

              </motion.div>
           </AnimatePresence>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

// Sub-components for cleaner structure
const SectionTitle = ({ children }) => (
  <div className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6 italic flex items-center gap-3">
    <div className="w-4 h-[2px] bg-slate-200" /> {children}
  </div>
);

const SectionHeader = ({ title, color }) => (
  <div className={`text-[11px] font-black uppercase ${color} italic tracking-widest mb-4 flex items-center gap-2`}>
     <div className={`w-2 h-2 rounded-full ${color.replace('text', 'bg')}`} /> {title}
  </div>
);

const SectionPara = ({ children }) => (
  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
    {children}
  </p>
);
