import React, { useState } from 'react';
import { FileText, BookOpen, PenTool, CheckCircle, AlertCircle, MessageSquare, Briefcase, FileSignature, FileKey, Target, Scale, X, ArrowRight, ExternalLink, List } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, icon: Icon, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      <div className="absolute inset-0 bg-[#001E3D]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white shadow-2xl border-t-4 border-[#009EDB] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-4">
            {Icon && <div className="p-2 bg-white text-[#009EDB] border border-slate-100 shadow-sm"><Icon className="w-5 h-5" /></div>}
            <h3 className="text-xl font-black text-navy-900 uppercase tracking-tighter italic">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-8 lg:p-10 overflow-y-auto custom-scrollbar">
          {content}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end items-center shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 bg-navy-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#009EDB] transition-all">CLOSE</button>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h4 className="text-[11px] font-black uppercase text-[#009EDB] tracking-[0.2em] mb-4 italic flex items-center gap-2">
    <div className="w-2 h-2 bg-[#009EDB]" /> {children}
  </h4>
);

const Documentations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (title, icon, content) => {
    setModalContent({ title, icon, content });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const docs = [
    {
      id: 'position-paper',
      title: 'Position Paper',
      icon: FileText,
      tag: 'Policy Foundation',
      desc: "A strategic document providing an overview of a country's stance on the topic area. Essential for gauging policy alignments.",
      content: (
        <div className="space-y-8">
          <SectionTitle>Purpose & Expectations</SectionTitle>
          <p className="text-sm font-bold uppercase italic text-navy-900 opacity-80 leading-relaxed mb-6">
            A position paper outlines your allocated nation's stance on the topics being discussed. It demonstrates your research and understanding of your nation's foreign policy.
          </p>

          <SectionTitle>Structure & Format</SectionTitle>
          <div className="grid gap-4">
            {[
              { t: "Header", d: "Include the Country's Flag and Coat of Arms. Standard format: Country, Committee, Agenda." },
              { t: "Introduction", d: "Concise introduction to the topic and its global significance. Provide essential historical background." },
              { t: "Country's Stance", d: "Clearly state your position, reflecting national interests. Discuss past or ongoing efforts/initiatives." },
              { t: "Proposed Solutions", d: "Practical, actionable recommendations aligning with your country's stance to address the challenges." },
              { t: "References", d: "Credible sources listed (UN websites, official government sites, treaties, press releases)." }
            ].map((item, i) => (
              <div key={i} className="p-4 border border-slate-100 flex gap-6 items-start bg-slate-50/50">
                <span className="text-xl font-black text-[#009EDB] italic shrink-0">0{i+1}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-navy-900 italic tracking-tighter leading-none mb-1">{item.t}</span>
                  <span className="text-[10px] font-bold uppercase text-slate-500">{item.d}</span>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle>Sample Format</SectionTitle>
          <div className="p-8 border border-slate-200 bg-white font-serif text-[13px] opacity-90 shadow-sm text-slate-900">
             <div className="flex justify-between items-start mb-6">
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US Flag" className="w-24 h-auto border border-slate-200" />
                <div className="text-center flex-1 px-4">
                   <p className="font-bold"><span className="font-bold">Country:</span> The United States of America</p>
                   <p className="font-bold"><span className="font-bold">Committee:</span> United Nations Children's Fund</p>
                   <p className="font-bold italic max-w-sm mx-auto"><span className="font-bold not-italic">Agenda:</span> Supporting and Safeguarding Children from Households Impacted by Domestic Violence or Substance Abuse</p>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Great_Seal_of_the_United_States_%28obverse%29.svg" alt="US Coat of Arms" className="w-20 h-auto" />
             </div>
             <p className="mb-4">
                The United States of America is honored to address the United Nations Children's Fund regarding the critical challenges faced by young children in families affected by domestic violence or substance abuse. We strongly support the development of systems to protect these vulnerable children, ensuring they do not witness such atrocities in their own homes. Our goal is to provide every child with a loving and supportive environment, promoting opportunities for them to achieve the American Dream.
             </p>
             <p className="mb-4">
                Domestic violence and substance abuse have serious effects on children. The World Health Organization estimates that 1 billion children aged 2-17 experience violence or neglect each year. Witnessing domestic violence can result in long-term psychological trauma, behavioral issues, and developmental delays, including learning difficulties and lower IQ scores. It can alter children's DNA, aging them 7-10 years and increasing their risk of suicide by six times and violent crime by 74%. Moreover, substance abuse in the household worsens these problems, with children of parents with substance use disorders being three times more likely to be abused. This environment leads to a cycle of violence and substance dependency, with affected children being 50% more likely to abuse drugs and alcohol as adults. Globally, 17.3% of people have experienced physical violence from a family member, while 16.5% have witnessed it.
             </p>
             <p className="mb-4">
                The United Nations has made significant efforts to address children's rights through various declarations and conventions, notably the Convention on the Rights of the Child (CRC) of 1989, which builds on earlier documents like the Declaration of the Rights of the Child (1959) and the Geneva Declaration (1924). The core principles emphasize child protection, but challenges in implementation persist due to inadequate funding, lack of enforcement, and cultural barriers. Although the CRC has been ratified by 196 countries, compliance varies greatly, leading to gaps in support for children. The United States is one of only two countries that have not ratified the CRC, citing concerns about potential negative impacts on children's autonomy and congressional limitations.
             </p>
             <p className="mb-4">
                The United States has implemented numerous programs and initiatives to combat domestic violence and substance abuse, focusing on both prevention and support for affected children. Organizations such as the National Child Traumatic Stress Network (NCTSN) and the National Court Appointed Special Advocate Association (CASA) work tirelessly to provide resources, advocacy, and support for children in distress. Additionally, legislative measures and community-based programs aim to create safer environments and offer rehabilitation for families. The U.S. government remains committed to refining these efforts and ensuring that every child has the opportunity to thrive in a safe and nurturing environment, as The United States believes “All persons influence their social environment and in turn are influenced by it”.
             </p>
             <p className="mb-4">
                To tackle domestic violence and substance abuse affecting children, the United States suggests a collaborative approach:
             </p>
             <ul className="list-disc pl-8 mb-6 space-y-1">
                <li>Establish stronger international standards for child protection.</li>
                <li>Enhance international cooperation and information sharing.</li>
                <li>Increase funding for global initiatives and local child protection programs.</li>
                <li>Invest in education and awareness campaigns to prevent abuse.</li>
                <li>Implement monitoring systems to ensure adherence to standards and track progress.</li>
             </ul>
             <p className="mb-2">References:</p>
             <div className="text-[11px] text-blue-600 break-words space-y-1 underline">
                <p>https://cpd.org.rs/wp-content/uploads/2017/11/01_-_Declaration_of_Geneva_1924.pdf</p>
                <p>https://digitallibrary.un.org/record/195831?ln=en&v=pdf</p>
                <p>https://www.unicef.org/child-rights-convention/convention-text</p>
                <p>https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10913340</p>
                <p>https://www.dvs-or.org/children-domestic-violence-statistics/e</p>
                <p>https://www.who.int/news-room/fact-sheets/detail/violence-against-children</p>
                <p>https://www.nctsn.org/</p>
                <p>https://nationalcasagal.org/</p>
                <p>https://legal.un.org/ilc/texts/instruments/english/conventions/1_1_1969.pdf</p>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'working-paper',
      title: 'Working Paper',
      icon: BookOpen,
      tag: 'Collaborative Draft',
      desc: "Informal documents used to outline problems and potential solutions presented during committee sessions. A precursor to Draft Resolutions.",
      content: (
        <div className="space-y-8">
           <SectionTitle>Function & Usage</SectionTitle>
           <p className="text-sm font-bold uppercase italic text-navy-900 opacity-80 leading-relaxed mb-6">
             The working paper is a reference document for the resolution. It is typically created after a few moderated caucuses to consolidate ideas, outline problems, and propose preliminary solutions.
           </p>

           <SectionTitle>Format Requirements</SectionTitle>
           <div className="p-6 bg-[#001E3D] text-white shadow-xl">
             <ul className="text-[11px] font-black uppercase text-[#009EDB] space-y-4 italic tracking-wide">
               <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4" /> NO RIGID FORMAT REQUIRED.</li>
               <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4" /> DOES NOT NEED TO FOLLOW RESOLUTION CLAUSE STYLE.</li>
               <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4" /> DOES NOT REQUIRE SIGNATORIES OR SPONSORS.</li>
               <li className="flex items-center gap-3"><AlertCircle className="w-4 h-4 text-red-500" /> MUST BEAR THE NAMES OF AUTHORS (Min. 1, Max. 3).</li>
             </ul>
           </div>

           <SectionTitle>Sample Format</SectionTitle>
           <div className="p-6 border border-slate-200 bg-white font-mono text-xs opacity-90 shadow-sm text-slate-800">
              <p className="font-bold text-center text-lg mb-6">Working Paper 1.1</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                 <p className="font-bold col-span-1">Committee:</p>
                 <p className="col-span-3">United Nations Human Rights Council (UNHCR)</p>
                 <p className="font-bold col-span-1">Agenda:</p>
                 <p className="col-span-3">Combating Human Rights Violations Based On Sexual Orientation And Gender Identity</p>
                 <p className="font-bold col-span-1">Session:</p>
                 <p className="col-span-3">61st Session, NAMI MUN</p>
                 <p className="font-bold col-span-1">Date:</p>
                 <p className="col-span-3">26th-28th December, 2025</p>
                 <p className="font-bold col-span-1">Authors:</p>
                 <p className="col-span-3">Islamic Republic Of Pakistan, Islamic Republic of Iran, United Arab Emirates, Republic of Indonesia, Russian Federation, Republic of the Philippines, Republic of Uganda</p>
              </div>
              
              <p className="font-bold mt-6 mb-2 underline uppercase tracking-widest text-[#009EDB]">Topics Discussed:</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                 <li>Addressing Violence And Hate Crimes Against LGBTQ+ Community Globally.</li>
                 <li>Causes For Denial Of LGBTQ+ Rights.</li>
                 <li>Tackling Religion, Culture And Tradition For Violating LGBTQ+ Rights.</li>
                 <li>International Cooperation For Solving The LGBTQ+ Rights Violations.</li>
                 <li>Methods To Solve The Violence Against LGBTQ+ Community.</li>
              </ul>
              
              <p className="font-bold mt-6 mb-2 underline uppercase tracking-widest text-amber-600">Problems Raised:</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                 <li>Many of these countries face sensitive cultural, religious, and social contexts, which influence how issues related to sexual orientation and gender identity are approached.</li>
                 <li>National Sovereignty VS Western Concept.</li>
                 <li>Restrictions on freedom of expression.</li>
                 <li>Social awareness and public understanding of LGBTQ+ issues remain limited in several regions, leading to challenges in dialogue and inclusion.</li>
                 <li>Lack of training for authorities.</li>
                 <li>Discrimination against women and minorities.</li>
                 <li>Political hesitation.</li>
                 <li>Restrictions LGBTQ+ people to enter any holy places.</li>
              </ul>
              
              <p className="font-bold mt-6 mb-2 underline uppercase tracking-widest text-green-600">Solutions Proposed:</p>
              <ul className="list-disc pl-5 space-y-1">
                 <li>Raise awareness and educate the public about equality, tolerance, and human rights.</li>
                 <li>Strengthen laws and policies to prevent discrimination and protect all individuals.</li>
                 <li>Work with NGOs and community groups to provide access to healthcare, education, and social services.</li>
                 <li>Encourage safe spaces where LGBTQ+ individuals can seek support without fear.</li>
                 <li>Promote dialogue and engagement between governments, civil society, and religious/cultural leaders.</li>
                 <li>Partner with international organizations like the UN and EU to share best practices and guidance.</li>
                 <li>Support campaigns and programs that reduce stigma and encourage social inclusion.</li>
                 <li>Balance human rights initiatives with cultural and religious values to ensure respectful and practical implementation.</li>
              </ul>
           </div>
        </div>
      )
    },
    {
      id: 'resolution',
      title: 'Draft Resolution',
      icon: FileSignature,
      tag: 'Legislative Outcome',
      desc: "The final, formal written document outlining the solutions to the problems discussed. The ultimate goal of the committee.",
      content: (
        <div className="space-y-8">
           <SectionTitle>The Final Outcome</SectionTitle>
           <p className="text-sm font-bold uppercase italic text-navy-900 opacity-80 leading-relaxed mb-6">
             A resolution is a formal document that, if passed, represents the committee's decision and proposed actions. It requires strict adherence to UN formatting.
           </p>

           <SectionTitle>Sponsors & Signatories</SectionTitle>
           <div className="p-6 bg-slate-900 text-white flex flex-col gap-4 mb-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#009EDB]">Sponsors</span>
                 <span className="text-[10px] font-bold uppercase italic opacity-70 text-right">Primary authors. Must vote IN FAVOR.</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#009EDB]">Signatories</span>
                 <span className="text-[10px] font-bold uppercase italic opacity-70 text-right">Supporters of debate. No voting obligation.</span>
              </div>
              <div className="pt-2 text-center">
                 <span className="text-[9px] font-black uppercase tracking-widest text-red-400 italic">Critical: A state cannot be both simultaneously.</span>
              </div>
           </div>

           <SectionTitle>Sample Format</SectionTitle>
           <div className="p-8 border border-slate-200 bg-white font-serif text-sm opacity-90 shadow-sm text-slate-800">
              <div className="flex justify-between items-start mb-8 text-xs">
                 <img src="https://www.un.org/sites/un2.un.org/files/un_logo.png" alt="UN Logo" className="w-24 h-auto" />
                 <div className="text-right">
                    <p>United Nations Security Council</p>
                    <p>S/RES/2026/1</p>
                    <p>Date: 18 May 2026</p>
                    <p>Distr.: General</p>
                    <p>Original: English</p>
                 </div>
              </div>

              <h2 className="text-center font-bold text-lg mb-6 max-w-lg mx-auto">
                 The Link Between Economic Instability and Threats to International Peace and Security
              </h2>

              <p className="mb-6 italic text-navy-900">The Security Council,</p>

              <div className="space-y-4 mb-8">
                 <p className="pl-6 -indent-6">
                    <span className="italic font-bold">Acknowledging</span> the importance of promoting decent work and economic growth as a means of achieving sustainable development and reducing poverty and inequality around the world,
                 </p>
                 <p className="pl-6 -indent-6">
                    <span className="italic font-bold">Deeply disturbed</span> by the need for investment in education, training, and skills development to promote decent work and enhance economic growth,
                 </p>
                 <p className="pl-6 -indent-6">
                    <span className="italic font-bold">Reaffirming</span> the commitment of all member states to promoting decent work, including safe and healthy working conditions...
                 </p>
              </div>

              <div className="space-y-4 mb-8">
                 <p className="pl-6 -indent-6">
                    <span className="font-bold">1. Demands</span> member states to promote inclusive economic growth through the implementation of sustainable policies that support job creation, entrepreneurship, and innovation:
                 </p>
                 <div className="pl-12 space-y-1">
                    <p>a) Ensure better protection against illegal activities,</p>
                    <p>b) Investment in better infrastructure for sustainability;</p>
                 </div>
                 
                 <p className="pl-6 -indent-6">
                    <span className="font-bold">2. Insists</span> member states to develop and implement strategies that prioritize the creation of decent work opportunities and the protection of workers' rights, including access to social protection systems, fair wages, and safe working conditions;
                 </p>
                 
                 <p className="pl-6 -indent-6">
                    <span className="font-bold">3. Encourages</span> member states to strengthen partnerships between the public and private sectors to promote investment in education and skills training programs that prepare individuals for the jobs of the future and promote lifelong learning;
                 </p>

                 <p className="pl-6 -indent-6">
                    <span className="font-bold">4. Encourages</span> member states to strengthen partnerships between the public and private sectors to promote investment in education and skills training programs that prepare individuals for the jobs of the future and promote lifelong learning;
                 </p>

                 <p className="pl-6 -indent-6">
                    <span className="font-bold">5. Calls upon</span> member states to address the challenges faced by vulnerable groups, such as women, youth, persons with disabilities, and migrant workers, in accessing decent work opportunities and to promote their inclusion in the labor market;
                 </p>

                 <p className="pl-6 -indent-6">
                    <span className="font-bold">6. Calls upon</span> member states to address the challenges faced by vulnerable groups, such as women, youth, persons with disabilities, and migrant workers, in accessing decent work opportunities and to promote their inclusion in the labor market;
                 </p>

                 <p className="pl-6 -indent-6">
                    <span className="font-bold">7. Requests</span> the United Nations and other relevant international organizations to provide technical assistance and capacity-building support to member states in the implementation of policies and programs that promote decent work and inclusive economic growth;
                 </p>
                 
                 <p className="pl-6 -indent-6">
                    <span className="font-bold">8. Decides</span> to remain actively seized of the matter.
                 </p>
              </div>
              
              <div className="border-t border-slate-300 pt-4 text-xs mt-10">
                 <p><span className="font-bold">Authors:</span> The Socialist Republic of Vietnam, The United Mexican States, The Kingdom of Norway</p>
                 <p className="mt-2"><span className="font-bold">Signatories:</span> The Republic of Albania, The Republic of Azerbaijan, The Republic of the Philippines, The Republic of Georgia, The Republic of India, The Commonwealth of Australia, The Syrian Arab Republic, The Republic of Indonesia, The Republic of Mauritius, The Republic of Moldova, The United States of America.</p>
              </div>
           </div>
        </div>
      )
    },
    {
      id: 'clauses',
      title: 'Resolution Clauses',
      icon: List,
      tag: 'Drafting Resources',
      desc: "Comprehensive lists of official Preambulatory and Operative phrases required for drafting UN Resolutions.",
      content: (
        <div className="space-y-10">
           <div className="p-6 bg-slate-50 border-l-4 border-amber-500">
              <h5 className="text-[11px] font-black text-amber-600 uppercase mb-3 tracking-widest italic">Preambulatory Clauses</h5>
              <p className="text-[10px] font-bold uppercase italic opacity-70 mb-6 text-navy-900">
                States the reasons for addressing the topic. Highlights past international action, UN Charter references, and general statements on the issue. <span className="text-amber-600">Begins with an italicized phrase and ends with a comma.</span>
              </p>
              <div className="bg-white p-6 border border-slate-200 shadow-inner flex flex-wrap gap-2 text-[11px] font-medium text-slate-700 italic leading-loose">
                 Acknowledging, Affirming, Alarmed by, Approving, Aware of, Bearing in mind, Believing, Confident, Congratulating, Contemplating, Convinced, Declaring, Deeply concerned, Deeply conscious, Deeply convinced, Deeply disturbed, Deeply regretting, Deploring, Desiring, Emphasizing, Expecting, Expressing its appreciation, Expressing its satisfaction, Fulfilling, Fully alarmed, Fully aware, Fully believing, Further deploring, Further recalling, Guided by, Having adopted, Having considered, Having considered further, Having devoted attention, Having examined, Having heard, Having received, Having studied, Keeping in mind, Noting further, Noting with appreciation, Noting with approval, Noting with deep concern, Noting with regret, Noting with satisfaction, Observing, Pointing out, Reaffirming, Realizing, Recalling, Recognizing, Referring, Taking into account, Taking into consideration, Taking note, Viewing with appreciation, Welcoming.
              </div>
           </div>

           <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[11px] font-black text-[#009EDB] uppercase mb-3 tracking-widest italic">Operative Clauses</h5>
              <p className="text-[10px] font-bold uppercase italic opacity-70 mb-6 text-navy-900">
                Offers specific, actionable solutions to the issues addressed. Must be numbered. <span className="text-[#009EDB]">Begins with a bolded/underlined verb and ends with a semicolon (except the last clause, which ends with a period).</span>
              </p>
              <div className="bg-white p-6 border border-slate-200 shadow-inner flex flex-wrap gap-2 text-[11px] font-bold text-navy-900 uppercase tracking-tight leading-loose">
                 Accepts, Affirms, Approves, Asks, Authorizes, Calls for, Calls upon, Condemns, Confirms, Congratulates, Considers, Declares accordingly, Deplores, Designates, Draws attention, Emphasizes, Encourages, Endorses, Expresses its appreciation, Expresses its concern, Expresses its hope, Further invites, Further proclaims, Further recommends, Further reminds, Further requests, Further resolves, Hopes, Invites, Proclaims, Proposes, Recommends, Regrets, Requests, Resolves, Seeks, Strongly affirms, Strongly condemns, Strongly urges, Suggests, Supports, Transmits, Trusts, Urges.
              </div>
           </div>
        </div>
      )
    },
    {
      id: 'directives',
      title: 'Directives',
      icon: Target,
      tag: 'Crisis Actions',
      desc: "Formal proposals or orders used in crisis committees to influence the flow of events. Can be public or covert.",
      content: (
        <div className="space-y-8">
           <SectionTitle>Crisis Management Tools</SectionTitle>
           <p className="text-sm font-bold uppercase italic text-navy-900 opacity-80 leading-relaxed mb-6">
             Directives are employed in crisis or security committees to react to unfolding events, issue statements, deploy troops, or enact policies. They are formal orders from your assigned portfolio to subordinate entities.
           </p>

           <SectionTitle>Types by Visibility & Action</SectionTitle>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-white border border-slate-200 border-l-4 border-[#009EDB] shadow-sm">
                 <h5 className="text-[11px] font-black text-navy-900 uppercase tracking-widest italic mb-2">Open Directive</h5>
                 <p className="text-[10px] font-bold uppercase text-slate-500 italic">Publicly read to the entire committee.</p>
              </div>
              <div className="p-5 bg-slate-900 text-white border-l-4 border-red-600 shadow-sm">
                 <h5 className="text-[11px] font-black text-white uppercase tracking-widest italic mb-2">Closed Directive</h5>
                 <p className="text-[10px] font-bold uppercase text-slate-400 italic">Hidden from the committee. Actions noted privately by the dais.</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {[
                { type: "Economic", detail: "Sanctions, tariffs, aid." },
                { type: "Diplomatic", detail: "Treaties, private talks." },
                { type: "Militaristic", detail: "Troop movement, strikes." },
                { type: "Joint", detail: "Collaborative action by 2+ actors." },
                { type: "Committee", detail: "Full committee response to a crisis." }
              ].map((act, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 flex flex-col justify-center text-center">
                   <span className="text-[10px] font-black uppercase text-[#009EDB] mb-1 italic">{act.type}</span>
                   <span className="text-[9px] font-bold uppercase text-navy-900 opacity-70 leading-tight">{act.detail}</span>
                </div>
              ))}
           </div>

           <SectionTitle>Sample Formats</SectionTitle>
           <div className="grid gap-6">
              {/* Single Directive Sample */}
              <div className="p-6 border border-slate-200 bg-white font-mono text-[11px] opacity-90 shadow-sm text-slate-800">
                 <p className="font-bold text-center text-sm mb-6 underline tracking-widest uppercase">Directive Sample</p>
                 <p className="font-bold text-red-600 mb-4">CLOSED DIRECTIVE 2.2</p>
                 <div className="grid grid-cols-4 gap-1 mb-4">
                    <p className="font-bold col-span-1">Date:</p><p className="col-span-3">September 12th 2024</p>
                    <p className="font-bold col-span-1">From:</p><p className="col-span-3">Whitehouse, USA</p>
                    <p className="font-bold col-span-1">To:</p><p className="col-span-3">Defense Ministry of USA</p>
                    <p className="font-bold col-span-1">Subject:</p><p className="col-span-3">Response to the threats of Russia</p>
                 </div>
                 
                 <p className="mb-4">Due to the announcement of Russia to back the Houthis with naval presence, we have decided to recall our commitment to the United Nations Convention on the Law of Sea (UNCLOS) and the principle of Freedom of Navigation. For this, we shall announce a military exercise in the Indian Ocean with small navy vessels.</p>
                 
                 <p className="font-bold mb-2">We call upon the US Navy along with the Airforce to send:</p>
                 <ul className="list-none pl-2 mb-4 space-y-1">
                    <li>1) One aircraft carrier- USS Ronald Reagen,</li>
                    <li>2) Escorted by Four cruisers: USS Gettysburg, USS Chosin, USS Shiloh and USS Normandy,</li>
                    <li>3) Followed by Two Destroyers and One Ballistic Missile submarines,</li>
                 </ul>
                 <p className="mb-4">To the Indian Ocean about 400km from the land of Somalia.</p>
                 
                 <p className="mb-6">These ships shall go to the Indian Ocean and cruise in the region not exceeding to the Arabian Sea by 0230 (UTC-5). They shall stay on alert and keep watch of any hostile activities. Through the destroyers, we shall impose a naval blockade to unfriendly foreign vessels with support of cruisers.</p>
                 
                 <p className="mb-6">If any threat is posed to the defense of these ships, they shall abide by the Rules of Engagement and act accordingly.</p>
                 
                 <p>Signed,</p>
                 <p className="font-bold italic">Joe Biden</p>
                 <p>President of USA</p>
              </div>

              {/* Joint Directive Sample */}
              <div className="p-6 border border-slate-200 bg-white font-mono text-[11px] opacity-90 shadow-sm text-slate-800">
                 <p className="font-bold text-center text-sm mb-6 underline tracking-widest uppercase">Joint Directive Sample</p>
                 <p className="font-bold text-[#009EDB] mb-4">JOINT DIRECTIVE 1.0</p>
                 <p className="mb-2"><span className="font-bold">Date:</span> 11th November, 2024</p>
                 <p className="mb-2"><span className="font-bold">Issued By:</span> The Federal Democratic Republic of Nepal and The United Kingdom of Great Britain and Northern Ireland</p>
                 <p className="mb-6"><span className="font-bold">Subject:</span> Regarding Recent Cyberattacks on Government Infrastructure</p>
                 
                 <p className="mb-4">Recognizing the growing threat posed by cyberattacks targeting critical infrastructure, Nepal and the United Kingdom hereby issue this joint directive to strengthen collective cybersecurity defenses and promote global stability in cyberspace. Establish a bilateral task force for real-time information sharing on cyber threats and vulnerabilities, ensuring a rapid and coordinated response to incidents.</p>
                 
                 <ol className="list-decimal pl-5 space-y-2 mb-6">
                    <li>Launch joint training programs to enhance the capabilities of cybersecurity professionals and promote knowledge exchange between our nations.</li>
                    <li>Commit to developing and deploying advanced technologies for critical infrastructure protection, with a focus on energy grids, financial systems, and healthcare networks.</li>
                    <li>Advocate for international norms to deter malicious cyber activities and hold accountable those who violate them.</li>
                    <li>Extend technical and advisory support to allied nations to fortify global cybersecurity resilience.</li>
                    <li>This directive reinforces the shared commitment of Nepal and the United Kingdom to safeguard the digital domain and protect the security and prosperity of our citizens.</li>
                 </ol>
                 
                 <p>Signed.</p>
              </div>
           </div>
        </div>
      )
    },
    {
      id: 'communique',
      title: 'Communiqués',
      icon: MessageSquare,
      tag: 'Crisis Comm.',
      desc: "Simple, formal communications to foreign officials or absent entities, often used to request assistance or collaboration.",
      content: (
        <div className="space-y-8">
           <SectionTitle>External Communications</SectionTitle>
           <p className="text-sm font-bold uppercase italic text-navy-900 opacity-80 leading-relaxed mb-6">
             Communiqués are formal proposals or messages sent to absent entities or out-of-committee actors. They are used to invite action, seek assistance, or establish diplomatic contact.
           </p>

           <div className="p-6 bg-slate-50 border-l-4 border-[#009EDB]">
              <h5 className="text-[11px] font-black text-navy-900 uppercase tracking-widest italic mb-3">Key Characteristics</h5>
              <ul className="text-[11px] font-bold uppercase text-slate-600 italic space-y-2">
                 <li>- They are communications, NOT necessarily actions (unlike directives).</li>
                 <li>- Should be detailed and persuasive.</li>
                 <li>- Used to set up future directives or joint press releases.</li>
              </ul>
           </div>

           <SectionTitle>Sample Format</SectionTitle>
           <div className="p-8 border border-slate-200 bg-white font-mono text-xs opacity-90 shadow-sm text-slate-800">
              <p className="font-bold text-red-600 mb-6">CLOSED COMMUNIQUE 1.2</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                 <p className="font-bold col-span-1">Date:</p><p className="col-span-3">July 5th, 1950</p>
                 <p className="font-bold col-span-1">From:</p><p className="col-span-3">Defense Minister of Republic of Korea</p>
                 <p className="font-bold col-span-1">To:</p><p className="col-span-3">Department of Defense of the USA</p>
                 <p className="font-bold col-span-1">Subject:</p><p className="col-span-3">Call for Defense of Seoul and Korea</p>
              </div>
              
              <p className="mb-6">As the conflict in Korea escalates and our forces face difficulty in defending our sovereignty, we urgently seek your esteemed support for our defense and operational capabilities.</p>
              
              <div className="space-y-4 mb-6 pl-2">
                 <p><strong>1. Disruption of Supply Lines:</strong> We request the deployment of U.S. Air Force assets to conduct strategic air operations aimed at disrupting enemy supply lines. This action is vital to impair the logistical capabilities of the opposing forces and to relieve pressure on our defensive positions.</p>
                 <p><strong>2. Deployment of Infantry and Armored Divisions:</strong> We urgently need additional support in the form of infantry and armored divisions. The reinforcement of these units will be crucial for our "Stand for Seoul" operation, ensuring we can defend the capital and critical infrastructure effectively. Please direct these divisions to be deployed through the ports of Busan or Gunsan, ensuring rapid and efficient transfer to the front lines.</p>
                 <p><strong>3. Provision of Field Artillery:</strong> The provision of field artillery is required to enhance our defensive firepower. This will significantly strengthen our ability to hold key positions and repel enemy advances, especially in the defense of Seoul and breaking through enemy lines.</p>
                 <p><strong>4. Reconnaissance Flights:</strong> We request the initiation of reconnaissance flights behind enemy lines to gather crucial intelligence on their positions and movements. This information is essential for strategic planning and operational effectiveness.</p>
              </div>
              
              <p className="mb-6">Our commitment to defending our nation remains steadfast, and with your assistance, we are confident in our ability to turn the tide of the conflict. Thank you for your immediate consideration.</p>
              
              <p>Sincerely,</p>
              <p className="font-bold mt-2">Ministry of Defense</p>
              <p>Republic of Korea.</p>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-white p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-14 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none -mt-10 -mr-10">
           <FileText className="w-96 h-96" />
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#001E3D] border border-slate-100 shadow-xl">
              <BookOpen className="w-6 h-6 text-[#009EDB]" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-[#001E3D] italic leading-none">
                COMMITTEE <span className="text-[#009EDB]">DOCUMENTATIONS</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="px-2 py-0.5 bg-[#009EDB] text-white text-[8px] font-black uppercase tracking-widest italic">OFFICIAL FORMATS</div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">DRAFTING GUIDELINES</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-14 max-w-[1600px] mx-auto w-full bg-slate-50/30">
         <div className="mb-12 max-w-3xl">
            <h3 className="text-xl font-black text-navy-900 uppercase italic tracking-tighter mb-4">Official Documentation Standards</h3>
            <p className="text-sm font-bold text-slate-500 uppercase italic leading-relaxed">
              Proper formatting and structuring of committee documents is critical for procedural success. Review the guidelines below for GA Resolutions, Crisis Directives, and foundational Position Papers.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {docs.map((doc) => (
               <div 
                  key={doc.id}
                  onClick={() => openModal(doc.title, doc.icon, doc.content)}
                  className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009EDB] transition-all duration-300 p-8 flex flex-col group cursor-pointer relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[#009EDB]/5 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                     <div className="p-4 bg-[#001E3D] text-[#009EDB] shadow-md group-hover:scale-110 transition-transform">
                        <doc.icon className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest italic group-hover:bg-[#009EDB] group-hover:text-white transition-colors">{doc.tag}</span>
                  </div>

                  <div className="flex-1 relative z-10">
                     <h4 className="text-2xl font-black text-navy-900 uppercase tracking-tighter italic mb-4 group-hover:text-[#009EDB] transition-colors">{doc.title}</h4>
                     <p className="text-[11px] font-bold text-slate-500 uppercase italic leading-relaxed line-clamp-3 mb-6">
                        {doc.desc}
                     </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                     <span className="text-[9px] font-black text-[#009EDB] uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        View Format <ArrowRight className="w-3 h-3" />
                     </span>
                     <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#009EDB]" />
                  </div>
               </div>
            ))}
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

export default Documentations;
