import React, { useState } from 'react';
import { ChevronRight, Info, BookOpen, Scale, Landmark, Hand, Gavel, Users, ShieldCheck, Flag, TriangleAlert, BellRing, X, Globe, ArrowRight, Target, FileText, PenTool, CheckCircle, AlertCircle, HelpCircle, MessageSquare, Repeat, ListOrdered } from 'lucide-react';

// Modal Component
const Modal = ({ isOpen, onClose, title, icon: Icon, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      <div className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white shadow-2xl border-t-4 border-[#009EDB] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-4">
            {Icon && <div className="p-2 bg-white text-[#009EDB] border border-slate-100 shadow-sm"><Icon className="w-5 h-5" /></div>}
            <h3 className="text-xl font-black text-navy-900 uppercase tracking-tighter italic">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-8 lg:p-10 overflow-y-auto max-h-[70vh]">
          {content}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end items-center">
          <button onClick={onClose} className="px-6 py-2.5 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all">CLOSE</button>
        </div>
      </div>
    </div>
  );
};

const UNAUSARules = () => {
  const [activeTab, setActiveTab] = useState('points-rights');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (title, icon, content) => {
    setModalContent({ title, icon, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Cite = ({ children }) => (
    <span className="text-[#009EDB] text-[10px] font-bold ml-1 uppercase">[{children}]</span>
  );

  const SectionTitle = ({ children }) => (
    <h4 className="text-[11px] font-black uppercase text-[#009EDB] tracking-[0.2em] mb-4 italic flex items-center gap-2">
      <div className="w-2 h-2 bg-[#009EDB]" /> {children}
    </h4>
  );

  const tabContentData = {
    'points-rights': [
      {
        id: 'protocolPrecedence',
        title: 'PROTOCOL & PRECEDENCE',
        icon: Scale,
        content: (
          <div className="space-y-8">
            <SectionTitle>Standard Engagement Protocol</SectionTitle>
            <ul className="space-y-4">
              {[
                "Wait for a pause in debate (when the floor is open).",
                "Raise your placard and wait for recognition.",
                "State: \"Point of [Type]\" or \"Requesting Right of [Type]\".",
                "Wait for the Chair to grant the floor before elaborating."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start border-l-2 border-slate-100 pl-4 py-1">
                  <span className="text-[#009EDB] font-black italic">P-0{i+1}</span>
                  <p className="text-navy-900 font-bold uppercase tracking-tight opacity-90 text-sm">{text}</p>
                </li>
              ))}
            </ul>

            <SectionTitle>Hierarchical Precedence</SectionTitle>
            <div className="grid gap-2">
              {[
                { name: "Point of Personal Privilege", desc: "Highest Priority. Can interrupt for audibility." },
                { name: "Point of Order", desc: "Procedural integrity concerns." },
                { name: "Point of Parliamentary Inquiry", desc: "Rules and scheduling questions." },
                { name: "Point of Information", desc: "Questions to a peer speaker." }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="text-[#009EDB] font-black italic">{i+1}.</span>
                    <span className="text-navy-900 font-black uppercase text-xs">{item.name}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase italic">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'points',
        title: 'ACTUAL POINTS',
        icon: Info,
        content: (
          <div className="space-y-8">
            <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-4 tracking-widest italic">Personal Privilege</h5>
              <p className="text-xs font-bold uppercase text-navy-900 opacity-80 leading-relaxed mb-4">Used for personal discomfort (temperature, audibility, safety). Only bad audibility allows interrupting a speaker.</p>
              <Cite>cite: 53, 54, 173, 206</Cite>
            </div>
            <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-4 tracking-widest italic">Point of Order</h5>
              <p className="text-xs font-bold uppercase text-navy-900 opacity-80 leading-relaxed mb-4">Raised when a delegate believes the Chair or another delegate has violated the formal ROPs. No speaker interruption allowed.</p>
              <Cite>cite: 57, 176, 207</Cite>
            </div>
            <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-4 tracking-widest italic">Parliamentary Inquiry</h5>
              <p className="text-xs font-bold uppercase text-navy-900 opacity-80 leading-relaxed mb-4">Clarification of the rules or the current status of the committee (e.g., "What is the speaking time?").</p>
              <Cite>cite: 55, 183, 208</Cite>
            </div>
            <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-4 tracking-widest italic">Point of Information</h5>
              <p className="text-xs font-bold uppercase text-navy-900 opacity-80 leading-relaxed mb-4">A direct question to a delegate who has just finished speaking. Only possible if the speaker yields to Questions/PoIs.</p>
              <Cite>cite: 179, 181, 209</Cite>
            </div>
          </div>
        ),
      },
      {
        id: 'rightsPleas',
        title: 'RIGHTS & PLEAS',
        icon: BellRing,
        content: (
          <div className="space-y-8">
            <SectionTitle>The Right of Reply</SectionTitle>
            <div className="p-6 border border-red-100 bg-red-50/20">
               <p className="text-xs font-bold uppercase italic text-navy-900 leading-relaxed mb-4">Requested when a country's national integrity or sovereignty is insulted. Granted solely at Chair's discretion. No appeal possible.</p>
               <Cite>cite: 62, 63, 162</Cite>
            </div>

            <SectionTitle>Procedural Pleas</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 bg-slate-900 text-white shadow-xl">
                  <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-3 italic tracking-widest">Plea to Follow Up</h5>
                  <p className="text-[11px] font-bold uppercase italic opacity-70 leading-relaxed">Request made immediately after a PoI is answered, asking the Chair for one additional follow-up question.</p>
               </div>
               <div className="p-6 bg-slate-900 text-white shadow-xl">
                  <h5 className="text-[10px] font-black text-[#009EDB] uppercase mb-3 italic tracking-widest">Plea to Reply</h5>
                  <p className="text-[11px] font-bold uppercase italic opacity-70 leading-relaxed">Request to respond further to a PoI if the initial answer was interrupted or needs critical expansion.</p>
               </div>
            </div>
          </div>
        ),
      },
    ],
    'motions-scripts': [
      {
        id: 'listMotions',
        title: 'LIST OF MOTIONS',
        icon: ListOrdered,
        content: (
          <div className="space-y-8">
            <SectionTitle>Comprehensive Motion Catalog</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: "Set the Agenda", type: "Procedural", scripts: "To choose Topic A or B" },
                 { name: "Establish GSL", type: "Procedural", scripts: "To open formal debate" },
                 { name: "Moderated Caucus", type: "Procedural", scripts: "For structured sub-topic debate" },
                 { name: "Unmoderated Caucus", type: "Procedural", scripts: "For informal lobbying/writing" },
                 { name: "Adjournment of Debate", type: "Procedural", scripts: "To 'Table' the topic (rare)" },
                 { name: "Closure of Debate", type: "Procedural", scripts: "To move into voting procedure" },
                 { name: "Suspension of Meeting", type: "Procedural", scripts: "For lunch/breaks/overnight" },
                 { name: "Adjournment of Meeting", type: "Procedural", scripts: "To end the conference" },
                 { name: "Resume GSL", type: "Procedural", scripts: "To return to the default state" }
               ].map((m, i) => (
                 <div key={i} className="p-4 border border-slate-100 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-[11px] font-black uppercase text-navy-900 italic tracking-tight">{m.name}</p>
                      <p className="text-[9px] font-bold uppercase text-slate-400 mt-1">{m.scripts}</p>
                    </div>
                    <span className="text-[8px] font-black uppercase px-2 py-1 bg-[#001E3D] text-white italic tracking-widest">{m.type}</span>
                 </div>
               ))}
            </div>
          </div>
        ),
      },
      {
        id: 'motionScripts',
        title: 'FORMAL SCRIPTS',
        icon: PenTool,
        content: (
          <div className="space-y-6">
            <SectionTitle>Precise Phrasing</SectionTitle>
            <div className="space-y-4">
               {[
                 { cmd: "Agenda", txt: "\"The Delegate of [Country] motions to set the agenda to Topic [X].\"" },
                 { cmd: "Mod-Caucus", txt: "\"The Delegate of [Country] motions for a moderated caucus on [Topic] for [Total Time] mins with [Individual Time] seconds speaking time.\"" },
                 { cmd: "Unmod", txt: "\"The Delegate of [Country] motions for an unmoderated caucus for a total time of [X] minutes for the purpose of [Lobbying/Writing].\"" },
                 { cmd: "Resume GSL", txt: "\"The Delegate of [Country] motions to resume the General Speaker's List.\"" },
                 { cmd: "Close Debate", txt: "\"The Delegate of [Country] motions to close debate and move into voting procedure on Draft Resolution [X].\"" }
               ].map((s, i) => (
                 <div key={i} className="p-6 bg-slate-900 border-l-[10px] border-[#009EDB] text-white">
                    <h6 className="text-[9px] font-black uppercase text-[#009EDB] mb-2 tracking-widest italic">{s.cmd}</h6>
                    <p className="text-sm font-black uppercase italic opacity-90 leading-tight tracking-tight">{s.txt}</p>
                 </div>
               ))}
            </div>
          </div>
        ),
      },
      {
        id: 'orderDisruption',
        title: 'ORDER OF DISRUPTION',
        icon: Scale,
        content: (
          <div className="space-y-8">
            <SectionTitle>Voting Precedence (High to Low)</SectionTitle>
            <div className="space-y-3">
              {[
                { name: "Adjournment of Meeting", disruptive: "MAXIMUM" },
                { name: "Suspension of Meeting (Recess)", disruptive: "MAXIMUM" },
                { name: "Adjournment of Debate (Table)", disruptive: "HIGH" },
                { name: "Closure of Debate", disruptive: "HIGH" },
                { name: "Unmoderated Caucus", disruptive: "MODERATE" },
                { name: "Moderated Caucus", disruptive: "MODERATE" },
                { name: "Extension of a Caucus", disruptive: "MODERATE" },
                { name: "Motion to Resume GSL", disruptive: "LOWEST" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-[#009EDB] font-black italic">{i+1}.</span>
                    <span className="text-navy-900 font-black uppercase text-xs italic tracking-tighter">{item.name}</span>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 ${item.disruptive === 'MAXIMUM' ? 'bg-red-600 text-white' : item.disruptive === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>{item.disruptive}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-[#001E3D] text-white border-l-[12px] border-red-600">
               <h5 className="text-[10px] font-black uppercase text-red-600 mb-2">CRITICAL RULE: TIE-BREAKING</h5>
               <p className="text-xs font-bold uppercase italic opacity-80 leading-relaxed">
                 If multiple caucuses of the same type are proposed: 01. Longer total time is voted on first. 02. If total time is equal, longer speaking time is voted on first.
               </p>
               <div className="mt-4"><Cite>cite: 490, 491</Cite></div>
            </div>
          </div>
        ),
      },
    ],
    'voting-unsc-rules': [
      {
        id: 'votingStances',
        title: 'VOTING STANCES',
        icon: Hand,
        content: (
          <div className="space-y-10">
            <SectionTitle>GA Stances (Standard)</SectionTitle>
            <div className="grid gap-6">
               <div className="p-8 bg-white border border-slate-100 shadow-sm border-l-8 border-[#009EDB]">
                  <h5 className="text-lg font-black text-navy-900 italic uppercase mb-2">PRESENT</h5>
                  <p className="text-sm font-bold uppercase italic opacity-70 text-navy-900 leading-relaxed">The delegate reserves the right to ABSTAIN during substantive votes (resolutions/amendments).</p>
                  <div className="mt-4"><Cite>cite: 4, 108</Cite></div>
               </div>
               <div className="p-8 bg-white border border-slate-100 shadow-sm border-l-8 border-navy-900">
                  <h5 className="text-lg font-black text-navy-900 italic uppercase mb-2">PRESENT AND VOTING</h5>
                  <p className="text-sm font-bold uppercase italic opacity-70 text-navy-900 leading-relaxed">The delegate MUST cast a definitive "Yes" or "No". Abstention is prohibited.</p>
                  <div className="mt-4"><Cite>cite: 4, 109, 233</Cite></div>
               </div>
            </div>

            <SectionTitle>UNSC Procedural Nuance</SectionTitle>
            <div className="p-6 bg-red-50 border border-red-200">
               <p className="text-xs font-black uppercase text-red-700 italic leading-relaxed">In many UNSC simulations, ABSTENTIONS are NOT allowed for procedural votes, even if the delegate stated "Present" during roll call.</p>
            </div>
          </div>
        ),
      },
      {
        id: 'quorumRefined',
        title: 'QUORUM STANDARDS',
        icon: Users,
        content: (
          <div className="space-y-10">
            <div className="p-10 bg-[#001E3D] text-white shadow-2xl border-l-[12px] border-[#009EDB]">
              <SectionTitle>Standard Committee (GA)</SectionTitle>
              <p className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">ONE-THIRD (1/3)</p>
              <p className="text-sm font-bold uppercase italic opacity-80 leading-relaxed">1/3 of all registered delegates must be present to open the session and verify debate.</p>
              <div className="mt-8 border-t border-white/10 pt-4"><Cite>cite: 7, 8</Cite></div>
            </div>

            <div className="p-10 bg-slate-900 text-white shadow-2xl border-l-[12px] border-red-600">
              <SectionTitle>Security Council (UNSC)</SectionTitle>
              <p className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">NINE (9/15)</p>
              <p className="text-sm font-bold uppercase italic opacity-80 leading-relaxed">For the Security Council, a quorum is generally defined by the presence of at least 9 members (including P5 presence requirements in some formats) to conduct substantive business.</p>
              <div className="mt-8 border-t border-white/10 pt-4"><Cite>cite: UNSC Provisional Rules</Cite></div>
            </div>
          </div>
        ),
      },
      {
        id: 'unscSpecifics',
        title: 'THE UNSC VETO',
        icon: ShieldCheck,
        content: (
          <div className="space-y-10">
            <div className="p-10 bg-red-800 text-white shadow-2xl border-l-[15px] border-[#001E3D]">
              <SectionTitle>The P5 Mandate</SectionTitle>
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-2 italic">9 Affirmative Votes</h5>
                  <p className="text-[13px] font-bold uppercase italic opacity-80 leading-relaxed">To pass any substantive motion in the UNSC, at least 9 affirmative votes are required.</p>
                </div>
                <div>
                  <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-2 italic">The Veto Power</h5>
                  <p className="text-[13px] font-bold uppercase italic opacity-80 leading-relaxed">Even with 9+ votes, a single "NO" vote from any of the five Permanent Members (China, France, Russia, UK, US) constitutes a VETO and fails the resolution.</p>
                </div>
                <div className="p-4 bg-white/10 border border-white/20">
                   <p className="text-[11px] font-black uppercase italic">Note: P5 Abstentions do NOT count as vetos.</p>
                </div>
              </div>
              <div className="mt-8 border-t border-white/20 pt-4"><Cite>cite: 230, 252, 253</Cite></div>
            </div>
          </div>
        ),
      },
    ],
    'yields': [
      {
        id: 'yieldDelegate',
        title: 'YIELD TO DELEGATE',
        icon: Users,
        content: (
          <div className="space-y-6">
            <SectionTitle>Peer Allocation</SectionTitle>
            <p className="text-navy-900 font-bold uppercase leading-relaxed italic border-l-4 border-[#009EDB] pl-8 py-4 bg-slate-50 opacity-90 text-sm">
              The speaker gives their remaining time to another specific delegate. The second delegate must accept or decline.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-100">
               <p className="text-[10px] font-black text-amber-800 uppercase italic">LIMITATION: The receiving delegate CANNOT yield further. They must yield back to the Chair when finished.</p>
            </div>
            <Cite>cd623d13d7: Page 08</Cite>
          </div>
        ),
      },
      {
        id: 'yieldQuestions',
        title: 'YIELD TO QUESTIONS',
        icon: MessageSquare,
        content: (
          <div className="space-y-6">
            <SectionTitle>Points of Information</SectionTitle>
            <p className="text-navy-900 font-bold uppercase leading-relaxed italic border-l-4 border-[#009EDB] pl-8 py-4 bg-slate-50 opacity-90 text-sm">
              The speaker opens the floor to direct questions (PoIs) from other delegates. Time for questions does NOT count against the speaker's time, but time for answers DOES.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-100">
               <p className="text-[10px] font-black text-blue-800 uppercase italic tracking-tight">"Chair, I yield my remaining time to points of information."</p>
            </div>
            <Cite>cd623d13d7: Page 08</Cite>
          </div>
        ),
      },
      {
        id: 'yieldComments',
        title: 'YIELD TO COMMENTS',
        icon: Repeat,
        content: (
          <div className="space-y-6">
            <SectionTitle>Open Commentary</SectionTitle>
            <p className="text-navy-900 font-bold uppercase leading-relaxed italic border-l-4 border-[#009EDB] pl-8 py-4 bg-slate-50 opacity-90 text-sm">
              The speaker yields their time to "Comments." The Chair will then recognize two delegates to make 30-second comments regarding the speech.
            </p>
            <div className="p-4 bg-slate-900 text-white">
               <p className="text-[10px] font-black text-[#009EDB] uppercase italic mb-2 tracking-widest">Protocol</p>
               <p className="text-[11px] font-bold uppercase italic opacity-70">Comments must specifically address the content of the preceding speech and cannot be used for unrelated points.</p>
            </div>
          </div>
        ),
      },
      {
        id: 'yieldChair',
        title: 'YIELD TO THE CHAIR',
        icon: Gavel,
        content: (
          <div className="space-y-6">
            <SectionTitle>Ending the Floor</SectionTitle>
            <p className="text-navy-900 font-bold uppercase leading-relaxed italic border-l-4 border-navy-900 pl-8 py-4 bg-slate-50 opacity-90 text-sm">
              The delegate concludes their speech and relinquishes all remaining time back to the Chairpersons.
            </p>
            <div className="p-4 bg-slate-100 border border-slate-200">
               <p className="text-[10px] font-black text-slate-500 uppercase italic">"Chair, I yield my time back to the bench."</p>
            </div>
            <Cite>cd623d13d7: Page 08</Cite>
          </div>
        ),
      },
    ],
    'document-types': [
      {
        id: 'posPaper',
        title: 'POSITION PAPERS',
        icon: FileText,
        content: (
          <div className="space-y-6">
            <SectionTitle>The Delegate's Foundation</SectionTitle>
            <p className="text-sm font-bold uppercase italic text-navy-900 opacity-70 leading-relaxed mb-6">A strategic document providing an overview of a country's stance. Essential for gauging policy alignments.</p>
            <div className="grid gap-3">
               {[
                 { t: "Country Position", d: "General policy and internal history on the topic." },
                 { t: "Relation to Topic", d: "Specific impact and international involvement." },
                 { t: "Policy Proposals", d: "Actionable solutions to be included in resolutions." }
               ].map((item, i) => (
                 <div key={i} className="p-4 border border-slate-100 flex gap-6 items-center">
                    <span className="text-xl font-black text-[#009EDB] italic">0{i+1}</span>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-black uppercase text-navy-900 italic tracking-tighter leading-none">{item.t}</span>
                       <span className="text-[9px] font-bold uppercase text-slate-400 mt-1">{item.d}</span>
                    </div>
                 </div>
               ))}
            </div>
            <Cite>cd623d13d7: Page 12</Cite>
          </div>
        ),
      },
      {
        id: 'workingPaper',
        title: 'WORKING PAPERS',
        icon: BookOpen,
        content: (
          <div className="space-y-6">
            <SectionTitle>Collaborative Drafts</SectionTitle>
            <div className="p-8 bg-[#001E3D] text-white">
               <p className="text-xs font-bold uppercase italic opacity-80 leading-relaxed mb-6">Informal documents used to present viewpoints and group solutions. They aid in the eventual creation of a Draft Resolution.</p>
               <ul className="text-[11px] font-black uppercase text-[#009EDB] space-y-3 italic">
                 <li>- NO SET FORMAT REQUIRED.</li>
                 <li>- NO SIGNATORIES/SPONSORS REQUIRED.</li>
                 <li>- MUST BEAR NAMES OF AUTHORS.</li>
               </ul>
            </div>
            <Cite>cd623d13d7: Page 12</Cite>
          </div>
        ),
      },
      {
        id: 'draftRes',
        title: 'DRAFT RESOLUTIONS',
        icon: ShieldCheck,
        content: (
          <div className="space-y-6">
            <SectionTitle>Legislative Protocol</SectionTitle>
            <div className="p-6 border-l-8 border-navy-900 bg-slate-50">
               <p className="text-xs font-bold uppercase italic text-navy-900 opacity-90 leading-relaxed">The formal document that, if passed, represents the committee's decision. Requires strict formatting and approval.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 border border-slate-100 shadow-sm">
                  <h5 className="text-[9px] font-black text-[#009EDB] uppercase mb-2">SPONSORS</h5>
                  <p className="text-[10px] font-bold uppercase italic opacity-60">Primary authors. Must vote 'YES' on the resolution.</p>
               </div>
               <div className="p-6 border border-slate-100 shadow-sm">
                  <h5 className="text-[9px] font-black text-[#009EDB] uppercase mb-2">SIGNATORIES</h5>
                  <p className="text-[10px] font-bold uppercase italic opacity-60">Supporters of debate. No voting obligation.</p>
               </div>
            </div>
            <div className="p-4 bg-red-50 border border-red-100">
               <p className="text-[10px] font-black text-red-600 uppercase italic">CRITICAL: ONE DELEGATION CANNOT BE BOTH A SPONSOR AND A SIGNATORY.</p>
            </div>
            <Cite>cd623d13d7: Page 13</Cite>
          </div>
        ),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-white p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#001E3D] border border-slate-100 shadow-xl">
              <Scale className="w-6 h-6 text-[#009EDB]" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-[#001E3D] italic leading-none">
                BRMUN <span className="text-[#009EDB]">RULES OF PROCEDURE</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="px-2 py-0.5 bg-[#009EDB] text-white text-[8px] font-black uppercase tracking-widest italic">OFFICIAL</div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.4em] italic">UNA-USA ADVANCED PROTOCOL</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:block text-right">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Procedural Directives & Mandates</p>
              <p className="text-[10px] font-black uppercase text-[#001E3D] italic mt-1">Version 2026.4.1 | UNSC Refined</p>
           </div>
           <div className="w-12 h-12 bg-white p-2 border border-slate-100 shadow-lg">
             <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-14 space-y-20 max-w-[1400px] mx-auto w-full">
        
        {/* TABS NAVIGATION */}
        <div className="bg-white border border-slate-100 shadow-2xl rounded-none">
          <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/20">
            {Object.keys(tabContentData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 min-w-[150px] py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group overflow-hidden ${
                  activeTab === key ? 'text-[#009EDB] bg-white' : 'text-slate-400 hover:text-navy-900 bg-slate-50/40 hover:bg-white'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {key === 'points-rights' && <Flag className="w-3 h-3" />}
                  {key === 'motions-scripts' && <PenTool className="w-3 h-3" />}
                  {key === 'voting-unsc-rules' && <Landmark className="w-3 h-3" />}
                  {key === 'document-types' && <FileText className="w-3 h-3" />}
                  {key === 'yields' && <Repeat className="w-3 h-3" />}
                  {key.replace(/-/g, ' ')}
                </div>
                {activeTab === key && (
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#009EDB] z-20" />
                )}
                <div className="absolute inset-0 bg-[#009EDB]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            ))}
          </div>

          {/* TAB CONTENT GRID */}
          <div className="p-8 md:p-12 bg-slate-50/10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {tabContentData[activeTab].map((item) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item.title, item.icon, item.content)}
                  className="p-10 bg-white border border-slate-100 group hover:border-[#009EDB] transition-all cursor-pointer relative shadow-sm hover:shadow-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 -mr-12 -mt-12 rotate-45 group-hover:bg-[#009EDB]/10 transition-colors" />
                  
                  <div>
                    <div className="flex items-center gap-5 mb-8">
                      <div className="p-3 bg-white text-slate-300 group-hover:text-[#009EDB] group-hover:scale-110 transition-all border border-slate-100 shadow-sm relative z-10">
                        {item.icon && React.createElement(item.icon, { className: "w-6 h-6" })}
                      </div>
                      <div className="relative z-10">
                        <div className="h-[1px] w-8 bg-[#009EDB] mb-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-[11px] font-black uppercase text-navy-900 tracking-[0.2em] italic leading-tight">{item.title}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 relative z-10">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Protocol Ref: {item.id.toUpperCase()}</span>
                     <div className="flex items-center gap-2 text-[#009EDB] text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        ACCESS DIRECTIVE <ArrowRight className="w-3 h-3" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 pb-10">
           <div className="flex items-center gap-6">
              <Users className="w-8 h-8 text-[#001E3D]" />
              <div>
                <p className="text-[10px] font-black uppercase text-navy-900 italic">Delegation First</p>
                <p className="text-[9px] font-bold uppercase text-slate-500 mt-1">Designed for maximum accessibility and procedural speed.</p>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <Globe className="w-8 h-8 text-[#001E3D]" />
              <div>
                <p className="text-[10px] font-black uppercase text-navy-900 italic">Global Standard</p>
                <p className="text-[9px] font-bold uppercase text-slate-500 mt-1">Strictly adhering to the UNA-USA rules of procedure.</p>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <ShieldCheck className="w-8 h-8 text-[#001E3D]" />
              <div>
                <p className="text-[10px] font-black uppercase text-navy-900 italic">Official Resource</p>
                <p className="text-[9px] font-bold uppercase text-slate-500 mt-1">The primary procedural reference for all BRMUN delegates.</p>
              </div>
           </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        icon={modalContent.icon}
        content={modalContent.content}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default UNAUSARules;
