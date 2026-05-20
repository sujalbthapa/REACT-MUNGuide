import React, { useState } from 'react';
import { ChevronRight, Info, BookOpen, Scale, Landmark, Hand, Gavel, Users, ShieldCheck, Flag, TriangleAlert, BellRing, X } from 'lucide-react'; // Added X for modal close button

// Re-using the basic FlowchartNode and FlowchartPointsNode from earlier CSS attempts
const FlowchartNode = ({ children, className = "" }) => (
    <div className={`bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg text-center flex items-center justify-center min-h-[3rem] text-sm md:text-base ${className}`}>
      {children}
    </div>
  );

  const FlowchartPointsNode = ({ children, className = "" }) => (
    <div className={`bg-teal-700 text-white px-3 py-2 rounded-full shadow-lg text-center flex items-center justify-center min-h-[3rem] text-sm md:text-base ${className}`}>
      {children}
    </div>
  );

// Modal Component - Adapted from App.jsx pattern
const Modal = ({ isOpen, onClose, title, icon: Icon, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      <div className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white shadow-2xl border-t-4 border-[#009EDB] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-4">
            {Icon && <div className="p-2 bg-white text-[#009EDB] border border-slate-100 shadow-sm"><Icon className="w-5 h-5" /></div>}
            <h3 className="text-xl font-black text-navy-900 uppercase tracking-tighter italic">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-8 lg:p-10 overflow-y-auto">
          {content}
        </div>
        <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-end items-center">
          <button onClick={onClose} className="px-6 py-2.5 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all">CLOSE</button>
        </div>
      </div>
    </div>
  );
};

const RulesOfProcedure = () => {
  const [activeTab, setActiveTab] = useState('points-rights');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (title, icon, content) => {
    setModalContent({ title, icon, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
  };

  // Helper for rendering cite references with smaller text
  const Cite = ({ children }) => (
    <span className="text-gray-500 text-xs">{children}</span>
  );

  const tabContentData = {
    'points-rights': [
      {
        id: 'howToRaisePoint',
        title: 'HOW TO RAISE A POINT',
        icon: Hand,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>Raise your placard.</li>
            <li>Get recognized by the Chair.</li>
            <li>State: "Point of [Type]".</li>
            <li>Wait for the Chair's approval before speaking further.</li>
          </ul>
        ),
      },
      {
        id: 'orderOfPrecedence',
        title: 'ORDER OF PRECEDENCE',
        icon: Scale,
        content: (
          <>
            <p className="text-gray-700">Points supersede all motions. If multiple points are raised, they are handled in this order<Cite>[cite: 206, 207, 208, 209]</Cite>:</p>
            <ol className="list-decimal list-inside space-y-1 pl-5 mt-2 text-gray-700">
              <li>Point of Personal Privilege <Cite>[cite: 206]</Cite></li>
              <li>Point of Order <Cite>[cite: 207]</Cite></li>
              <li>Point of Parliamentary Inquiry <Cite>[cite: 208]</Cite></li>
              <li>Point of Information <Cite>[cite: 209]</Cite></li>
            </ol>
          </>
        ),
      },
      {
        id: 'pointOfPersonalPrivilege',
        title: 'POINT OF PERSONAL PRIVILEGE',
        icon: Info,
        content: (
          <p className="text-gray-700">Used for matters of personal comfort, safety, or well-being (e.g., cannot hear speaker, too cold)<Cite>[cite: 53, 54, 173]</Cite>. May interrupt a speaker ONLY for audibility issues<Cite>[cite: 54]</Cite>.</p>
        ),
      },
      {
        id: 'pointOfOrder',
        title: 'POINT OF ORDER',
        icon: Gavel,
        content: (
          <p className="text-gray-700">Used when a delegate believes the Chair has made an error in the formal procedure<Cite>[cite: 57, 176]</Cite>.</p>
        ),
      },
      {
        id: 'pointOfParliamentaryInquiry',
        title: 'POINT OF PARLIAMENTARY INQUIRY',
        icon: BookOpen,
        content: (
          <p className="text-gray-700">Used when a delegate is unsure of the rules and would like an explanation from the Chair<Cite>[cite: 55, 183]</Cite>. May not interrupt a speaker<Cite>[cite: 184]</Cite>.</p>
        ),
      },
      {
        id: 'pointOfInformation',
        title: 'POINT OF INFORMATION',
        icon: Info,
        content: (
          <p className="text-gray-700">Used to ask another delegate a question about their speech after it concludes (during GSL)<Cite>[cite: 179, 181]</Cite>.</p>
        ),
      },
      {
        id: 'rightOfReply',
        title: 'RIGHT OF REPLY',
        icon: BellRing,
        content: (
          <p className="text-gray-700">Requested if a country's national integrity is insulted<Cite>[cite: 62, 162]</Cite>. Granted at the Chair's discretion<Cite>[cite: 63]</Cite>.</p>
        ),
      },
    ],
    'motions-scripts': [
      {
        id: 'howToRaiseMotion',
        title: 'HOW TO RAISE A MOTION',
        icon: Hand,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>Raise your placard when the floor is open.</li>
            <li>Get recognized by the Chair.</li>
            <li>State: "The Delegate of [Country Name] would like to raise a motion to..."</li>
          </ul>
        ),
      },
      {
        id: 'motionScripts',
        title: 'MOTION SCRIPTS',
        icon: BookOpen,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>"...set the agenda to [Agenda]."</li>
            <li>"...establish the General Speaker's List."</li>
            <li>"...start an unmoderated caucus for total time [time in mins] minutes." <Cite>[cite: 613]</Cite></li>
            <li>"...start a moderated caucus on the topic [Topic] for total time [time] with each speaker getting [time] seconds." <Cite>[cite: 612]</Cite></li>
            <li>"...introduce the [Type of Document] [Document Number]."</li>
            <li>"...close debate and move [Document type + Number] into voting."</li>
            <li>"...suspend the committee for [Lunch / Break / 15 mins / the day]." <Cite>[cite: 607]</Cite></li>
            <li>"...adjourn the committee until the next session." <Cite>[cite: 608]</Cite></li>
          </ul>
        ),
      },
      {
        id: 'orderOfDisruption',
        title: 'ORDER OF DISRUPTION (VOTING PRECEDENCE)',
        icon: Scale,
        content: (
          <>
            <p className="text-gray-700">When multiple motions are proposed, the Chair votes on them from most disruptive to least disruptive<Cite>[cite: 488]</Cite>:</p>
            <ol className="list-decimal list-inside space-y-1 pl-5 mt-2 text-gray-700">
              <li>Extension of a previous caucus <Cite>[cite: 493]</Cite></li>
              <li>Unmoderated Caucus <Cite>[cite: 494]</Cite></li>
              <li>Moderated Caucus <Cite>[cite: 495]</Cite></li>
            </ol>
            <p className="mt-2 text-gray-700"><span className="font-semibold">(Note:</span> Longer caucuses are voted on before shorter ones. Longer speaking times are voted on before shorter ones <Cite>[cite: 490, 491])</Cite>.</p>
          </>
        ),
      },
    ],
    'voting-unsc-rules': [
      {
        id: 'votingFlow',
        title: 'PROCEDURAL VOTING FLOW',
        icon: Gavel,
        content: (
          <ul className="list-disc list-inside space-y-2 pl-5 text-gray-700">
            <li><span className="font-semibold">Informal Phase:</span> Chair asks for Seconds and Objections.</li>
            <li><span className="font-semibold">Auto-Fail:</span> 0 Seconds.</li>
            <li><span className="font-semibold">Auto-Pass:</span> 0 Objections (Unanimous Consent).</li>
            <li><span className="font-semibold">Formal Phase:</span> Triggered by Objections. Placard vote (For/Against).</li>
            <li><span className="font-semibold">Mini-Debate:</span> For Closure of Debate/Division, a "2 For / 2 Against" debate is triggered if there is an objection.</li>
          </ul>
        ),
      },
      {
        id: 'rollCallProcedure',
        title: '3-ROUND ROLL CALL',
        icon: ListOrdered,
        content: (
          <ol className="list-decimal list-inside space-y-2 pl-5 text-gray-700 font-medium italic">
            <li><span className="font-bold">ROUND 1:</span> Initial Stances (Yes, No, Abstain) and Rights (Yes/No with Rights). Sponsors/Authors cannot vote with rights.</li>
            <li><span className="font-bold">ROUND 2:</span> Explanation of Rights.</li>
            <li><span className="font-bold">ROUND 3:</span> Final definitive vote (Yes, No, Abstain).</li>
          </ol>
        ),
      },
      {
        id: 'votingStances',
        title: 'VOTING STANCES (ROLL CALL)',
        icon: Hand,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li><span className="font-semibold">PRESENT:</span> The delegate is present and reserves the right to abstain during substantive votes on draft resolutions<Cite>[cite: 4, 108]</Cite>.</li>
            <li><span className="font-semibold">PRESENT AND VOTING:</span> The delegate is present but relinquishes the right to abstain. They must cast a definitive "Yes" or "No" during all substantive votes<Cite>[cite: 4, 109, 233]</Cite>.</li>
          </ul>
        ),
      },
      {
        id: 'quorum',
        title: 'QUORUM',
        icon: Users,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li><span className="font-semibold">UN Committees:</span> The minimum number of delegates needed to open a session. The quorum is met when at least one-third (1/3) of all registered delegates are present<Cite>[cite: 7, 8]</Cite>.</li>
            <li><span className="font-semibold">UNSC:</span> Typically requires 9 members present to conduct business.</li>
          </ul>
        ),
      },
      {
        id: 'proceduralVsSubstantive',
        title: 'PROCEDURAL VS. SUBSTANTIVE VOTES',
        icon: Gavel,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li><span className="font-semibold">Procedural Votes:</span> Voting on committee operation<Cite>[cite: 111, 621]</Cite>. Requires a simple majority<Cite>[cite: 116, 227]</Cite>. No abstentions allowed<Cite>[cite: 112, 623]</Cite>.</li>
            <li><span className="font-semibold">Substantive Votes:</span> Voting on ideas (Draft Resolutions, Amendments)<Cite>[cite: 107, 624]</Cite>. Requires Simple Majority in GA, or 9 votes in UNSC.</li>
          </ul>
        ),
      },
      {
        id: 'votingMajorities',
        title: 'VOTING MAJORITIES & VETO',
        icon: Landmark,
        content: (
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li><span className="font-semibold">UNGA:</span> Simple Majority (50% + 1) or 2/3 for important questions.</li>
            <li><span className="font-semibold">UNSC:</span> 9 affirmative votes required<Cite>[cite: 230, 252]</Cite>.</li>
            <li><span className="font-semibold">P5 VETO:</span> A single "No" vote from China, France, Russia, UK, or US fails the resolution<Cite>[cite: 230, 253]</Cite>.</li>
          </ul>
        ),
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        <span className="text-navy-900 dark:text-gray-800">BRMUN</span>{" "}
        <span className="text-sky-500">RULES OF PROCEDURE</span>
      </h1>

      {/* Flow of Debate Diagram */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Flow of Debate Diagram</h2>
        {/* New Flowchart implementation */}
        <div className="relative overflow-x-auto p-4 md:min-h-[700px] lg:min-h-[500px] xl:min-h-[400px]">
          <div className="grid grid-cols-[100px_repeat(10,_minmax(0,_1fr))_120px] md:grid-cols-[100px_repeat(10,_minmax(0,_1fr))_120px] grid-rows-[repeat(10,_minmax(0,_1fr))] gap-y-4 items-center justify-items-center">
            {/* MUN Flow Of Debate Text */}
            <div className="absolute left-0 top-0 h-full flex flex-col items-start justify-center text-left text-navy-900 font-bold text-lg md:text-xl transform -rotate-90 origin-bottom-left md:rotate-0 md:origin-center md:relative md:flex-row md:items-center md:justify-start md:col-start-1 md:row-start-1 md:self-start md:mt-20">
              <p className="whitespace-nowrap text-xs md:text-base">MUN Flow Of Debate</p>
            </div>

            {/* SVG Overlay for arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" viewBox="0 0 1600 800">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" /> {/* Gray arrow */}
                </marker>
                <marker id="blueArrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" /> {/* Blue arrow */}
                </marker>
              </defs>

              {/* Paths from image */}
              {/* Top sequence horizontal arrows */}
              {/* Roll Call -> Motion To Open Speakers' List */}
              <path d="M180,80 L350,80" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Motion To Open Speakers' List -> Motion To Set the Agenda */}
              <path d="M430,80 L600,80" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Motion To Set the Agenda -> Topic 1 (branching) */}
              <path d="M680,80 L730,80 L730,40 L810,40" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Motion To Set the Agenda -> Topic 2 (branching) */}
              <path d="M680,80 L730,80 L730,120 L810,120" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Topic 1 -> Opening Statements */}
              <path d="M890,40 H950" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Topic 2 -> Opening Statements */}
              <path d="M890,120 H950" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Opening Statements -> Speakers' List */}
              <path d="M1020,120 V160" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />


              {/* Speakers' List to Branches */}
              {/* Speakers' List (bottom-center) to start of each branch */}
              <path d="M600,240 V300 H350 V340" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* To Moderated Caucus Branch */}
              <path d="M600,240 V300 H550 V340" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* To Unmoderated Caucus Branch */}
              <path d="M600,240 V300 H750 V340" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* To Debate/Resolution Branch */}
              <path d="M600,240 V300 H950 V340" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* To Adjourn Branch */}

              {/* Within Branches */}
              {/* Moderated Caucus Branch */}
              <path d="M350,420 V460" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M350,540 V580" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Unmoderated Caucus Branch */}
              <path d="M550,420 V460" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M550,540 V580" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Debate/Resolution Branch */}
              <path d="M750,420 V460" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M750,540 V580" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M750,660 V700" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M750,780 V820" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* Placeholder until Pass Resolution is connected */}
              {/* Adjourn Branch */}
              <path d="M950,420 V460" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              <path d="M950,540 V580" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

              {/* Looping Arrows */}
              {/* Moderated Caucus -> Speakers' List */}
              <path d="M350,660 V700 C350,750 200,750 200,700 V240 H500" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              {/* Unmoderated Caucus -> Speakers' List */}
              <path d="M550,660 V700 C550,750 700,750 700,700 V240 H700" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

              {/* Cross-column Arrow (Substantive Vote -> Pass a Resolution) */}
              <path d="M750,540 H600 C550,540 550,850 600,850 H750" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

              {/* Side Column (Points) - dotted line */}
              <path d="M1070,200 V400" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" fill="none" /> {/* Vertical dotted line */}
              <path d="M1070,300 H800" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" /> {/* Connecting from Speakers' List to dotted line */}


            </svg>

            {/* Nodes - positioned within the grid */}
            {/* Top Sequence */}
            <div className="md:col-start-2 md:col-span-2 md:row-start-1 flex items-center justify-center">
              <FlowchartNode>Roll Call</FlowchartNode>
            </div>
            <div className="md:col-start-4 md:col-span-2 md:row-start-1 flex items-center justify-center">
              <FlowchartNode>{`Motion To Open Speakers' List`}</FlowchartNode>
            </div>
            <div className="md:col-start-6 md:col-span-2 md:row-start-1 flex items-center justify-center">
              <FlowchartNode>Motion To Set the Agenda</FlowchartNode>
            </div>
            <div className="md:col-start-8 md:col-span-1 md:row-start-1 flex items-center justify-center">
              <FlowchartNode>Topic 1</FlowchartNode>
            </div>
            <div className="md:col-start-8 md:col-span-1 md:row-start-2 flex items-center justify-center">
              <FlowchartNode>Topic 2</FlowchartNode>
            </div>
            <div className="md:col-start-10 md:col-span-2 md:row-start-1 row-span-2 flex items-center justify-center">
              <FlowchartNode>Opening Statements</FlowchartNode>
            </div>
            
            {/* Speakers' List */}
            <div className="md:col-start-2 md:col-span-9 md:row-start-3 flex items-center justify-center">
              <FlowchartNode className="w-full bg-blue-800">Speakers' List</FlowchartNode>
            </div>

            {/* Branches - adjust row/col spans */}
            {/* Column 1: Moderated Caucus */}
            <div className="md:col-start-3 md:col-span-2 md:row-start-4 flex flex-col items-center justify-center space-y-4">
              <FlowchartNode>Motion For a Moderated Caucus</FlowchartNode>
              <FlowchartNode>Procedural Vote</FlowchartNode>
              <FlowchartNode>Moderated Caucus</FlowchartNode>
            </div>

            {/* Column 2: Unmoderated Caucus */}
            <div className="md:col-start-5 md:col-span-2 md:row-start-4 flex flex-col items-center justify-center space-y-4">
              <FlowchartNode>Motion For a Unmoderated Caucus</FlowchartNode>
              <FlowchartNode>Procedural Vote</FlowchartNode>
              <FlowchartNode>Unmoderated Caucus</FlowchartNode>
            </div>

            {/* Column 3: Pass a Resolution */}
            <div className="md:col-start-7 md:col-span-2 md:row-start-4 flex flex-col items-center justify-center space-y-4">
              <FlowchartNode className="bg-violet-700">Introduction of Document</FlowchartNode>
              <FlowchartNode>Motion To Close Debate</FlowchartNode>
              <FlowchartNode className="bg-amber-600 text-[10px]">2 Speakers for, 2 Against (if objected)</FlowchartNode>
              <FlowchartNode>Voting Procedure (3-Rounds)</FlowchartNode>
              <FlowchartNode className="bg-green-700">Pass a Resolution</FlowchartNode>
            </div>

            {/* Column 4: Adjourn */}
            <div className="md:col-start-9 md:col-span-2 md:row-start-4 flex flex-col items-center justify-center space-y-4">
              <FlowchartNode>Motion to Adjourn</FlowchartNode>
              <FlowchartNode>Procedural Vote</FlowchartNode>
              <FlowchartNode>Adjourn</FlowchartNode>
            </div>
            
            {/* Side Column (Points) */}
            <div className="md:col-start-11 md:col-span-1 md:row-start-3 row-span-4 flex flex-col items-center justify-center space-y-2">
              <FlowchartPointsNode>Point Of Information</FlowchartPointsNode>
              <FlowchartPointsNode>Point Of Inquiry</FlowchartPointsNode>
              <FlowchartPointsNode>Point Of Personal Privilege</FlowchartPointsNode>
              <FlowchartPointsNode>Point Of Order</FlowchartPointsNode>
            </div>

            {/* Pass a Resolution at bottom */}
            <div className="md:col-start-4 md:col-span-4 md:row-start-9 flex items-center justify-center">
              <FlowchartNode className="w-full bg-blue-900">Pass a Resolution</FlowchartNode>
            </div>
            <div className="md:col-start-7 md:col-span-2 md:row-start-9 flex items-center justify-center">
              <FlowchartNode>Substantive Vote</FlowchartNode>
            </div>

          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          {Object.keys(tabContentData).map((key) => (
            <li className="mr-2" role="presentation" key={key}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === key
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(key)}
                type="button"
                role="tab"
                aria-controls={key}
                aria-selected={activeTab === key}
              >
                {key.replace(/-/g, ' ').toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div>
        {Object.keys(tabContentData).map((key) => (
          <div
            key={key}
            className={`p-4 rounded-lg bg-gray-50 ${activeTab === key ? '' : 'hidden'}`}
            id={key}
            role="tabpanel"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tabContentData[key].map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openModal(item.title, item.icon, item.content)}
                >
                  <div className="flex items-center mb-2">
                    <item.icon className="w-6 h-6 mr-3 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    Click to expand for details
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        icon={modalContent.icon}
        content={modalContent.content}
      />
    </div>
  );
};

export default RulesOfProcedure;
