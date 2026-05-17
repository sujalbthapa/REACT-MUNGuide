import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Layers, Info, BookOpen, ShieldAlert, ArrowRight, Target, Network, CheckCircle2, Search, Zap, Scale, FileText, Lock, Brain
} from 'lucide-react';

export default function StudyGuidelines() {
  const navigate = useNavigate();

  const flowchartSteps = [
    {
      id: "01",
      title: "Deconstruct the Mandate",
      icon: Search,
      description: "Understand the limits and powers of the UN Security Council. What constitutes a threat to international peace? When can Chapter VII be invoked?",
      actions: ["Review UN Charter Chapters VI & VII", "Analyze past UNSC interventions", "Define 'binding resolution' vs 'recommendation'"]
    },
    {
      id: "02",
      title: "Establish National Policy",
      icon: Target,
      description: "Identify your state's vital interests in the Middle East. Who are your strategic allies? Where do your energy or security vulnerabilities lie?",
      actions: ["Map arms trade and economic ties", "Review historical UN voting records", "Determine red lines and non-negotiables"]
    },
    {
      id: "03",
      title: "Analyze Theater Dynamics",
      icon: Network,
      description: "Deconstruct the active fronts. Understand the interplay between state actors (e.g., Israel, Iran) and non-state proxies (e.g., Hezbollah, Houthis).",
      actions: ["Study the 'Active Conflicts' module", "Map proxy funding and supply chains", "Identify flashpoints (e.g., Strait of Hormuz)"]
    },
    {
      id: "04",
      title: "Apply International Law",
      icon: Scale,
      description: "Ground your arguments in established legal frameworks. How do the Geneva Conventions apply to blockades, urban warfare, and nuclear proliferation?",
      actions: ["Consult the 'International Law' archive", "Review ICC/ICJ precedents", "Analyze proportionality and distinction"]
    },
    {
      id: "05",
      title: "Draft Actionable Directives",
      icon: Zap,
      description: "Translate policy into concrete UNSC action. Vague calls for peace will fail; propose specific mechanisms like sanctions, peacekeeping deployments, or humanitarian corridors.",
      actions: ["Design enforcement mechanisms", "Identify funding sources for mandates", "Negotiate with P5 members to avoid vetoes"]
    }
  ];

  const councilBriefs = [
    {
      title: "The Power of the Veto",
      icon: Lock,
      content: "The P5 (USA, UK, France, Russia, China) hold veto power. A single veto kills a resolution. Your diplomacy must navigate these five distinct geopolitical agendas. Compromise is essential, but appeasement can water down action.",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      title: "Chapter VII Enforcement",
      icon: ShieldAlert,
      content: "Unlike the General Assembly, the UNSC can authorize the use of force or impose binding economic sanctions under Chapter VII. Use this power surgically; aggressive mandates often fracture consensus.",
      color: "text-[#009EDB]",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      title: "Drafting Architecture",
      icon: FileText,
      content: "A strong resolution has robust operative clauses. Don't just 'condemn'—establish verification missions, authorize maritime task forces, or set strict timelines for compliance with automatic trigger penalties.",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 overflow-hidden">
      {/* --- HEADER --- */}
      <div className="bg-white p-6 border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 border border-slate-200 shadow-sm rounded-sm">
                 <Briefcase className="w-5 h-5 text-[#009EDB]" />
              </div>
              <h3 className="font-black text-xl uppercase tracking-tighter text-[#001E3D] italic leading-none">
                 Delegate<span className="text-[#009EDB]">_Preparation</span>
              </h3>
           </div>
           <div className="hidden md:block h-8 w-[2px] bg-slate-200 mx-2" />
           <p className="hidden md:block text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-1 italic">
              Strategic Briefings & Protocol Roadmap
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-white p-1.5 border border-slate-200 shadow-sm rounded-sm">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" alt="UN Logo" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="max-w-5xl mx-auto p-8 lg:p-12 space-y-16">
          
          {/* Intro Section */}
          <div className="bg-white p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
              <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-96 h-96 object-contain" alt="" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-navy-900 italic mb-4">Navigating the Security Council</h2>
              <p className="text-slate-600 leading-relaxed max-w-3xl font-medium">
                The United Nations Security Council is the premier organ of international security. As a delegate, you are not merely debating; you are drafting binding international law, deploying peacekeepers, and managing the brink of global conflict. Preparation requires a deep synthesis of national policy, legal frameworks, and crisis management.
              </p>
            </div>
          </div>

          {/* Flowchart Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
               <Layers className="w-6 h-6 text-[#009EDB]" />
               <h3 className="text-2xl font-black uppercase tracking-tighter text-navy-900 italic">Preparation Flowchart</h3>
            </div>

            <div className="relative">
              {/* Vertical line connecting steps (hidden on mobile) */}
              <div className="hidden md:block absolute left-[3.5rem] top-10 bottom-10 w-[2px] bg-slate-200 z-0" />
              
              <div className="space-y-8 relative z-10">
                {flowchartSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-10 group"
                  >
                    <div className="flex-shrink-0 flex items-center gap-4 md:flex-col md:w-28 md:pt-2">
                      <div className="w-16 h-16 bg-white border-2 border-slate-200 group-hover:border-[#009EDB] flex items-center justify-center rounded-sm shadow-sm transition-colors relative z-10">
                        <span className="text-2xl font-black text-slate-300 group-hover:text-[#009EDB] italic transition-colors">{step.id}</span>
                      </div>
                      <div className="hidden md:flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-[#009EDB]" />
                        <div className="w-1 h-1 rounded-full bg-[#009EDB]" />
                        <div className="w-1 h-1 rounded-full bg-[#009EDB]" />
                      </div>
                    </div>

                    <div className="flex-1 bg-white border border-slate-200 p-8 shadow-sm group-hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-50 text-[#009EDB] rounded-sm">
                          <step.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight text-navy-900 italic">{step.title}</h4>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                        {step.description}
                      </p>
                      <div className="bg-slate-50 p-4 border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Action Items</p>
                        <ul className="space-y-2">
                          {step.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* UNSC Specific Briefs */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
               <BookOpen className="w-6 h-6 text-[#009EDB]" />
               <h3 className="text-2xl font-black uppercase tracking-tighter text-navy-900 italic">Council Mechanics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {councilBriefs.map((brief, i) => (
                <div key={i} className={`p-8 border ${brief.border} ${brief.bg} shadow-sm flex flex-col h-full`}>
                  <div className={`p-3 ${brief.border} bg-white w-max mb-5 shadow-sm rounded-sm`}>
                    <brief.icon className={`w-6 h-6 ${brief.color}`} />
                  </div>
                  <h4 className={`text-lg font-black uppercase tracking-tight ${brief.color} mb-4 italic`}>{brief.title}</h4>
                  <p className="text-slate-700 leading-relaxed font-medium flex-1">
                    {brief.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-10 bg-[#001E3D] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl border border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
             <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/10 border border-white/20 rounded-sm">
                  <Brain className="w-8 h-8 text-[#009EDB]" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-widest mb-1 italic">Initiate Research Phase</h4>
                  <p className="text-slate-300 text-sm font-medium">Deploy the AI Advisor to analyze specific resolutions or mandate constraints.</p>
                </div>
             </div>
             <button 
                onClick={() => navigate('/advisor')} 
                className="relative z-10 flex items-center gap-3 px-8 py-4 bg-[#009EDB] text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-navy-900 transition-all shadow-lg italic active:scale-95 group"
              >
                <span>Launch AI Advisor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
