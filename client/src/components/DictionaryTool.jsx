import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Loader2, AlertCircle, ShieldAlert, ChevronRight, Globe, Scale, ShieldCheck, Volume2, HelpCircle } from 'lucide-react';

const DIPLOMATIC_TERMS = [
  'Abstention', 'Adjournment', 'Adoption', 'Agenda', 'Amendment', 'Annexation', 'Appeal', 'Arbitrator', 
  'Armistice', 'Asymmetric Warfare', 'Autonomy', 'Bab al-Mandab', 'Belligerent', 'Bilateral', 'Binding', 
  'Bloc', 'Blue Line', 'Buffer Zone', 'Casus Belli', 'Caucus', 'Ceasefire', 'Chair', 'Chapter VII', 
  'Charter', 'Civil War', 'Coalition', 'Collective Security', 'Colonialism', 'Communique', 'Compromise', 
  'Conciliation', 'Condemnation', 'Conflict of Interest', 'Consensus', 'Convention', 'Co-submitter', 
  'Counter-terrorism', 'Coup d\'état', 'Crisis', 'Customs Union', 'De-escalation', 'Decorum', 'Delegation', 
  'Demilitarized', 'Demography', 'Deportation', 'Deterrence', 'Diplomacy', 'Disarmament', 'Displacement', 
  'Division of the Question', 'Draft Resolution', 'Economic and Social Council (ECOSOC)', 'Embargo', 'Embassy', 
  'Enclave', 'Envoy', 'Escalation', 'Espionage', 'Ethnic Cleansing', 'Exclave', 'Exile', 'Explanation of Vote', 
  'Extradition', 'Extraterritoriality', 'Failed State', 'Formal Debate', 'Gavel', 'Gaza', 'General Assembly', 
  'Genocide', 'Geopolitics', 'Golan Heights', 'Guerrilla', 'Hamas', 'Hegemony', 'Hezbollah', 'Hormuz', 'Houthi', 
  'Human Rights', 'Humanitarian', 'IDF', 'Ideology', 'IHL', 'Imperialism', 'Incursion', 'Infrastructure', 
  'Insurgency', 'Interdependence', 'International Court of Justice (ICJ)', 'Intervention', 'IRGC', 'Isolationism', 
  'Jerusalem', 'Jingoism', 'Jurisdiction', 'Legitimacy', 'Litani River', 'Mandate', 'Maritime', 
  'Mediation', 'Mercenary', 'Middle East', 'Migration', 'Military', 'Militia', 'Mission', 'Moderated Caucus', 
  'Monitoring', 'Motion', 'Multilateral', 'Nationalism', 'Negotiate', 'Neutrality', 'Non-binding', 
  'Non-governmental', 'Non-proliferation', 'Non-state actor', 'Normalization', 'Observer', 'Operative Clause', 
  'Order of the Day', 'P5', 'Pacifism', 'Palestine', 'Peacekeeping', 'Permanent Member', 'Plebiscite', 
  'Point of Inquiry', 'Point of Order', 'Point of Personal Privilege', 'Populism', 'Preambular Clause', 
  'Preemptive', 'Prisoner Exchange', 'Propaganda', 'Proportionality', 'Protocol', 'Proxy', 'Quorum', 
  'Rapprochement', 'Ratification', 'Realpolitik', 'Red Sea', 'Referendum', 'Refugee', 'Regime Change', 
  'Regionalism', 'Repatriation', 'Resolution', 'Right of Reply', 'Roll Call', 'Safe Zone', 'Sanction', 
  'Secession', 'Secretariat', 'Secretary General', 'Sector', 'Security Council', 'Self-determination', 
  'Settlement', 'Shadow War', 'Signatory', 'Simple Majority', 'Sovereignty', 'Speakers List', 'Sponsor', 
  'Stalemate', 'Stateless', 'Strategic Depth', 'Substantive Vote', 'Succession', 'Suez Canal', 'Summit', 
  'Superpower', 'Surveillance', 'Syria', 'Tehran', 'Tel Aviv', 'Territorial Integrity', 'Terrorism', 
  'Totalitarianism', 'Treaty', 'Truce', 'Trusteeship Council', 'Unilateral', 'UNIFIL', 'United Nations Security Council', 
  'UNRWA', 'Veto', 'West Bank', 'Xenophobia', 'Yemen', 'Yield'
];

const MUN_CONTEXT = {
  'sovereignty': { focus: 'Main Principle', usage: 'Used to protect a country\'s borders from interference.', mun_tip: 'Argue this when a state\'s territory is entered without permission.' },
  'security council': { focus: 'Main UN Body', usage: 'The only body that can make rules all countries must follow.', mun_tip: 'Mention Article 24 of the UN Charter when discussing its role.' },
  'unsc': { focus: 'Main UN Body', usage: 'Short for United Nations Security Council.', mun_tip: 'Work with the 5 permanent members (P5) to avoid a blocked vote.' },
  'veto': { focus: 'Voting Power', usage: 'The power of 5 countries (USA, China, Russia, UK, France) to stop any plan.', mun_tip: 'Always talk to the P5 before a vote to make sure they won\'t stop your plan.' },
  'annexation': { focus: 'International Rule Break', usage: 'When one country takes another country\'s land by force.', mun_tip: 'This is usually illegal under UN rules; focus on protecting land rights.' },
  'ceasefire': { focus: 'Stopping the Fight', usage: 'An agreement between two sides to stop shooting.', mun_tip: 'Resolutions should explain who will watch the border to keep the peace.' },
  'sanction': { focus: 'Political Pressure', usage: 'Economic or political punishments to force a country to follow rules.', mun_tip: 'Try to target specific leaders instead of hurting the whole population.' },
  'unifil': { focus: 'Peacekeeping Force', usage: 'The UN team watching the border in Lebanon.', mun_tip: 'Mention this when discussing the Lebanon conflict.' }
};

const BAD_WORDS = ['fuck', 'shit', 'ass', 'bastard', 'bitch', 'damn', 'hell'];

export default function DictionaryTool() {
  const [word, setWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState(null);
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [safetyTriggered, setSafetyTriggered] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  useEffect(() => {
    if (word.length > 1) {
      const filtered = DIPLOMATIC_TERMS.filter(term => term.toLowerCase().includes(word.toLowerCase()));
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [word]);

  const lookupWord = async (searchWord = word) => {
    if (!searchWord.trim()) return;
    const lowerWord = searchWord.toLowerCase();
    if (BAD_WORDS.some(bw => lowerWord.includes(bw))) {
      setSafetyTriggered(true);
      setError('Inappropriate language detected. Please use professional terms.');
      setResult(null);
      return;
    }
    setSafetyTriggered(false);
    setLoading(true);
    setError(null);
    setResult(null);
    setContext(MUN_CONTEXT[lowerWord] || null);
    setShowSuggestions(false);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchWord)}`);
      if (!response.ok) {
        if (response.status === 404) {
          if (!MUN_CONTEXT[lowerWord]) setError('Term not found. Try searching for a simpler term.');
        } else {
          throw new Error('Search failed');
        }
      } else {
        const data = await response.json();
        setResult(data[0]);
      }
    } catch (err) {
      if (!MUN_CONTEXT[lowerWord]) setError('Unable to connect to the dictionary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (phonetic) => {
    const audioUrl = phonetic?.audio;
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="space-y-10 animate-in">
      <div className="neo-flat p-12 border-l-8 border-blue-600 bg-white">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 neo-button bg-blue-600 text-white"><Book className="w-6 h-6" /></div>
          <div>
            <h3 className="font-black text-3xl uppercase tracking-tighter text-navy-900 leading-none italic">Diplomatic Dictionary</h3>
            <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] mt-2">Find and understand complex terms</p>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); lookupWord(); }} className="relative z-50">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-6 flex items-center"><Search className="w-5 h-5 text-slate-300" /></div>
              <input type="text" value={word} onFocus={() => word.length > 1 && setShowSuggestions(true)} onChange={(e) => setWord(e.target.value)} placeholder="Type a term here..." className="w-full neo-pressed bg-slate-50 pl-16 pr-6 py-6 text-[12px] font-black uppercase tracking-widest outline-none text-navy-900 placeholder:text-slate-300 focus:bg-white transition-all" />
              {showSuggestions && (
                <div ref={suggestionRef} className="absolute top-full left-0 w-full mt-2 neo-card bg-white z-[60] border border-black/5 overflow-hidden shadow-2xl">
                  {suggestions.map((suggestion, i) => (
                    <button key={i} type="button" onClick={() => { setWord(suggestion); lookupWord(suggestion); }} className="w-full px-6 py-4 text-left text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-between group">{suggestion}<ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" disabled={loading} className="neo-button px-12 bg-navy-900 text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-navy-800 disabled:opacity-50">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />} Search
            </button>
          </div>
        </form>
      </div>
      <div className="min-h-[300px]">
        {loading && <div className="flex flex-col items-center justify-center py-20 gap-4"><Loader2 className="w-12 h-12 text-blue-600 animate-spin opacity-20" /><p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Searching...</p></div>}
        <AnimatePresence mode="wait">
          {context && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-10 border-l-8 border-blue-600 bg-blue-50/30 neo-flat">
              <div className="flex items-center gap-4 mb-6"><Globe className="w-6 h-6 text-blue-600" /><h4 className="font-black text-xs uppercase tracking-[0.2em] text-blue-700">Council Information</h4></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">How it is used</p><p className="text-[14px] text-navy-900 font-bold uppercase tracking-tight leading-relaxed">{context.usage}</p></div>
                <div className="p-6 bg-white border border-blue-100"><p className="text-[9px] font-black text-blue-500 uppercase mb-2">Tip for your debate</p><p className="text-[13px] text-blue-900 font-black uppercase tracking-tight italic leading-relaxed">{context.mun_tip}</p></div>
              </div>
            </motion.div>
          )}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="neo-card p-10 bg-white border border-black/5 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4"><h4 className="text-5xl font-black text-navy-900 uppercase tracking-tighter italic">{result.word}</h4></div>
                    {result.phonetics?.some(p => p.audio) && (
                      <button onClick={() => playAudio(result.phonetics.find(p => p.audio))} className="neo-button p-4 text-blue-600 hover:text-blue-800 transition-colors"><Volume2 className="w-6 h-6" /></button>
                    )}
                  </div>
                  <div className="space-y-12">
                    {result.meanings.map((meaning, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-4"><span className="neo-pressed px-4 py-1.5 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-slate-50">{meaning.partOfSpeech}</span><div className="h-[1px] flex-1 bg-black/5" /></div>
                        <div className="grid grid-cols-1 gap-6">
                          {meaning.definitions.slice(0, 3).map((def, dIdx) => (
                            <div key={dIdx} className="neo-pressed p-8 bg-slate-50/50">
                              <p className="text-[15px] text-navy-900 font-bold uppercase leading-tight mb-4 tracking-tight">{dIdx + 1}. {def.definition}</p>
                              {def.example && <p className="text-[12px] text-slate-500 font-medium italic border-l-2 border-slate-200 pl-4 mt-4">"{def.example}"</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {error && !loading && (
          <div className="neo-pressed p-10 border-l-4 border-amber-500 bg-amber-50 flex items-start gap-8">
            <AlertCircle className="w-8 h-8 text-amber-600 shrink-0" />
            <div><h4 className="font-black text-xs uppercase tracking-[0.2em] mb-2 text-amber-700">Notice</h4><p className="text-[12px] font-bold uppercase tracking-tight leading-relaxed max-w-2xl text-amber-900">{error}</p></div>
          </div>
        )}
        {!result && !context && !loading && !error && (
          <div className="neo-pressed p-16 flex flex-col items-center justify-center text-center opacity-40">
            <HelpCircle className="w-12 h-12 text-slate-300 mb-6" />
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Ready for search</p>
          </div>
        )}
      </div>
    </div>
  );
}
