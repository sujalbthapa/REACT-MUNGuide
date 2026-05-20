import React, { useState } from 'react';
import { ArrowDown, Info, Hand, Vote } from 'lucide-react';

export default function BRMUNRulesOfProcedure() {
  const [activeTab, setActiveTab] = useState('points');

  const tabData = {
    points: {
      title: 'POINTS & RIGHTS',
      content: [
        { title: 'HOW TO RAISE A POINT', desc: '1. Raise your placard. 2. Get recognized by the Chair. 3. State: "Point of [Type]". 4. Wait for the Chair\'s approval before speaking further.' },
        { title: 'ORDER OF PRECEDENCE', desc: 'Points supersede all motions. Handled in this order: 1. Point of Personal Privilege, 2. Point of Order, 3. Point of Parliamentary Inquiry, 4. Point of Information.' },
        { title: 'POINT OF PERSONAL PRIVILEGE', desc: 'Used for matters of personal comfort, safety, or well-being. May interrupt a speaker ONLY for audibility issues.' },
        { title: 'POINT OF ORDER', desc: 'Used when a delegate believes the Chair has made an error in the formal procedure.' },
        { title: 'POINT OF PARLIAMENTARY INQUIRY', desc: 'Used when a delegate is unsure of the rules and would like an explanation from the Chair. May not interrupt a speaker.' },
        { title: 'POINT OF INFORMATION', desc: 'Used to ask another delegate a question about their speech after it concludes (during GSL).' },
        { title: 'RIGHT OF REPLY', desc: 'Requested if a country\'s national integrity is insulted. Granted at the Chair\'s discretion.' }
      ]
    },
    motions: {
      title: 'MOTIONS & SCRIPTS',
      content: [
        { title: 'HOW TO RAISE A MOTION', desc: '1. Raise your placard when the floor is open. 2. Get recognized by the Chair. 3. State: "The Delegate of [Country Name] would like to raise a motion to..."' },
        { title: 'MOTION SCRIPTS', desc: 'Examples include: "...set the agenda to [Agenda].", "...establish the General Speaker\'s List.", "...start an unmoderated caucus for total time [time] minutes.", "...start a moderated caucus on the topic [Topic] for total time [time] with each speaker getting [time] seconds.", "...introduce the [Type of Document] [Document Number].", "...close debate and move [Document type + Number] into voting.", "...suspend the committee for [Lunch / Break / ...].", "...adjourn the committee until the next session."' },
        { title: 'ORDER OF DISRUPTION', desc: 'When multiple motions are proposed, the Chair votes on them from most disruptive to least disruptive: 1. Extension of a previous caucus, 2. Unmoderated Caucus, 3. Moderated Caucus.' }
      ]
    },
    voting: {
      title: 'VOTING & UNSC RULES',
      content: [
        { title: 'PROCEDURAL VOTING FLOW', desc: '1. Seconds/Objections (Informal). 2. If objection: 2 For/2 Against debate. 3. Placard Vote (Formal). No abstentions for procedural votes.' },
        { title: 'THREE-ROUND ROLL CALL (RESOLUTIONS)', desc: 'Round 1: Stances & Rights (Yes, No, Abstain, Yes/No with Rights). Round 2: Explanation of Rights. Round 3: Final definitive vote (Yes, No, Abstain).' },
        { title: 'VOTING RIGHTS RESTRICTION', desc: 'Sponsors and Authors are NOT permitted to vote "With Rights" during Round 1 of a Roll Call vote.' },
        { title: 'PRESENT vs. PRESENT AND VOTING', desc: 'Present: Can abstain on resolutions. Present and Voting: Must vote Yes or No; no abstentions allowed.' },
        { title: 'UNSC SUBSTANTIVE VOTING', desc: 'Requires 9 affirmative votes AND no veto from any P5 member (China, France, Russia, UK, US). P5 abstentions are not vetos.' },
        { title: 'QUORUM', desc: 'UNGA: 1/3 of registered delegates. UNSC: Generally 9 members present.' }
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-white">
      {/* 1. Header */}
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 italic">
        <span className="text-slate-900">BRMUN</span> <span className="text-[#009EDB]">RULES OF PROCEDURE</span>
      </h1>

      {/* 2. Flow of Debate Diagram */}
      <section className="mb-24 overflow-x-auto">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12 italic text-center">Flow of Debate</h2>
        
        {/* Horizontal Sequence */}
        <div className="flex justify-center items-center gap-2 mb-8">
            <div className="bg-[#001E3D] text-white p-3 font-black text-[10px] uppercase w-32 text-center shadow-md">Roll Call</div>
            <ArrowDown className="rotate-[-90deg] w-4 h-4 text-slate-400" />
            <div className="bg-[#001E3D] text-white p-3 font-black text-[10px] uppercase w-48 text-center shadow-md">Open Speakers' List</div>
            <ArrowDown className="rotate-[-90deg] w-4 h-4 text-slate-400" />
            <div className="bg-[#001E3D] text-white p-3 font-black text-[10px] uppercase w-48 text-center shadow-md">Set Agenda</div>
            <ArrowDown className="rotate-[-90deg] w-4 h-4 text-slate-400" />
            <div className="flex flex-col gap-1">
                <div className="bg-[#001E3D] text-white p-2 font-black text-[9px] uppercase w-24 text-center">Topic 1</div>
                <div className="bg-[#001E3D] text-white p-2 font-black text-[9px] uppercase w-24 text-center">Topic 2</div>
            </div>
        </div>

        <div className="flex justify-center mb-8"><ArrowDown className="w-6 h-6 text-slate-400" /></div>
        <div className="bg-[#001E3D] text-white p-4 font-black text-[11px] uppercase w-full max-w-4xl mx-auto text-center shadow-lg">OPENING STATEMENTS</div>
        <div className="flex justify-center mb-8"><ArrowDown className="w-6 h-6 text-slate-400" /></div>
        <div className="bg-[#009EDB] text-white p-8 font-black text-lg uppercase w-full max-w-4xl mx-auto text-center shadow-2xl relative">
            SPEAKERS' LIST
            {/* Side column points */}
            <div className="absolute top-0 -right-48 hidden lg:flex flex-col gap-2">
                {['Point Of Information', 'Point Of Inquiry', 'Point Of Personal Privilege', 'Point Of Order'].map(p => (
                    <div key={p} className="bg-teal-900 text-white p-2 text-[9px] font-black uppercase w-36 text-center">{p}</div>
                ))}
            </div>
        </div>

        {/* Four Branches */}
        <div className="grid grid-cols-4 gap-4 mt-12 w-full max-w-5xl mx-auto">
            {/* Branches code would continue with simplified grid logic for responsiveness */}
        </div>
      </section>

      {/* 3. Tabbed Information */}
      <section>
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab ? 'text-[#009EDB] border-[#009EDB]' : 'text-slate-400 border-transparent hover:text-navy-900'
              }`}
            >
              {tabData[tab].title}
            </button>
          ))}
        </div>

        <div className="py-8 space-y-4">
          {tabData[activeTab].content.map((item, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-100 shadow-sm hover:border-[#009EDB]/30 transition-all">
              <h4 className="text-[11px] font-black uppercase text-navy-900 mb-2 italic">{item.title}</h4>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
