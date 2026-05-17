export const frontData = {
    iran: { id: 'iran', title: "Iran: Operation Epic Fury", subtitle: "Direct State Confrontation", status: "Strategic Ceasefire / Blockade", summary: "Initiated on Feb 28, 2026, as a massive US-Israeli air campaign targeting Iran's nuclear and command infrastructure.", detailed: { allies: "United States, Israel, UK", adversaries: "Iran, IRGC, Proxies", fronts: "Hormuz, Tehran", effects: "Energy blockade", damages: "Port destruction" }, intensity: 88, location: "Tehran", coordinates: "35.68 N" },
    lebanon: { id: 'lebanon', title: "Lebanon: Res 1701 Collapse", subtitle: "Northern Front", status: "Active Conflict", summary: "Israel has launched 'Operation Roaring Lion' into Southern Lebanon.", detailed: { allies: "Israel, US", adversaries: "Hezbollah", fronts: "Blue Line", effects: "Displacement", damages: "Village destruction" }, intensity: 94, location: "Litani River", coordinates: "33.33 N" },
    gaza: { id: 'gaza', title: "Gaza: Enclave Insurgency", subtitle: "Humanitarian Crisis", status: "Stalemate", summary: "Gaza remains in high-intensity urban insurgency with acute famine risk.", detailed: { allies: "Aid Orgs", adversaries: "Israel, Hamas", fronts: "Rafah", effects: "Healthcare collapse", damages: "Residential destruction" }, intensity: 72, location: "Gaza City", coordinates: "31.50 N" },
    proxy: { id: 'proxy', title: "Red Sea: Trade War", subtitle: "Maritime Front", status: "Trade Denial", summary: "Houthi forces have successfully rerouted 70% of global traffic.", detailed: { allies: "US, UK, EU", adversaries: "Houthis", fronts: "Bab al-Mandab", effects: "Price spikes", damages: "Vessel sinking" }, intensity: 81, location: "Aden", coordinates: "12.58 N" }
};

export const blocData = [
    { 
        id: 'usa', 
        name: "United States", 
        group: "Western Alliance",
        color: "bg-blue-600",
        objectives: ["Preservation of freedom of navigation", "Defense of Israeli sovereignty", "Containment of Iranian nuclear program"],
        red_lines: ["Direct closure of the Strait of Hormuz", "Iranian nuclear breakout", "Attacks on US Carrier Strike Groups"],
        allies: ["Israel", "UK", "France", "GCC States"],
        adversaries: ["Iran", "Hezbollah", "Houthis"],
        negotiation_tip: "Focus on 'Global Economic Stability' and 'Maritime Security' when proposing resolutions to the US."
    },
    { 
        id: 'iran', 
        name: "Islamic Republic of Iran", 
        group: "Axis of Resistance",
        color: "bg-green-700",
        objectives: ["Regime survival and internal stability", "Removal of US forces from the region", "Recognition of regional strategic depth"],
        red_lines: ["Direct ground invasion of Iranian territory", "Total energy embargo", "Decapitation strikes on supreme leadership"],
        allies: ["Syria", "Hezbollah", "Houthis", "Russia (Strategic partner)"],
        adversaries: ["USA", "Israel", "UK"],
        negotiation_tip: "Proposals must emphasize 'Sovereignty' and 'Non-interference' to gain Iranian engagement."
    },
    { 
        id: 'israel', 
        name: "Israel", 
        group: "Regional Powers",
        color: "bg-cyan-600",
        objectives: ["Elimination of non-state rocket threats", "Demilitarization of Southern Lebanon", "Neutralization of Iranian proxy 'ring of fire'"],
        red_lines: ["Recognition of Hamas/Hezbollah governance", "Division of Jerusalem", "Unrestricted Iranian presence on borders"],
        allies: ["USA", "Germany", "UK"],
        adversaries: ["Hezbollah", "Hamas", "Iran", "Houthis"],
        negotiation_tip: "Focus on 'Security Guarantees' and 'Right to Self-Defense' (Article 51)."
    },
    { 
        id: 'saudi', 
        name: "Saudi Arabia", 
        group: "Regional Powers",
        color: "bg-emerald-600",
        objectives: ["Regional de-escalation for Vision 2030", "Containment of Houthi threats to energy sites", "Balance between US security and Chinese trade"],
        red_lines: ["Nuclear proliferation in the Gulf", "Permanent disruption of oil exports", "Regional war spillover"],
        allies: ["UAE", "Egypt", "USA (Security)", "China (Trade)"],
        adversaries: ["Houthis", "Iranian proxies (selective)"],
        negotiation_tip: "Saudi Arabia values 'Regional Stability' and 'Economic Diversification'."
    },
    { 
        id: 'china', 
        name: "China", 
        group: "Global Interests",
        color: "bg-red-700",
        objectives: ["Uninterrupted energy flow through Hormuz", "Increasing diplomatic influence (mediator role)", "Protection of Belt and Road investments"],
        red_lines: ["Total regional conflict", "US-led total blockade of trade routes", "Forced regime change in Tehran"],
        allies: ["Iran (Economic)", "Saudi Arabia", "Russia"],
        adversaries: ["None (Official policy of neutrality)"],
        negotiation_tip: "China will support resolutions that emphasize 'Dialogue' and 'Economic Connectivity'."
    },
    { 
        id: 'russia', 
        name: "Russia", 
        group: "Global Interests",
        color: "bg-blue-800",
        objectives: ["Diverting Western resources from Europe", "Strengthening the military alliance with Iran", "Maintaining naval access in Syria"],
        red_lines: ["US-led regime change", "Collapse of Syrian government", "Loss of Tartus naval base"],
        allies: ["Iran", "Syria", "China"],
        adversaries: ["USA", "NATO members"],
        negotiation_tip: "Russia often uses its Veto to counter 'Western Hegemony'. Frame resolutions as 'Multi-polar'."
    },
    { 
        id: 'lebanon', 
        name: "Lebanon", 
        group: "Front-Line States",
        color: "bg-red-600",
        objectives: ["Preservation of territorial integrity", "Prevention of full-scale civil collapse", "Implementation of aid frameworks"],
        red_lines: ["Permanent Israeli occupation of the South", "Loss of Beirut airport/port functionality"],
        allies: ["France", "Arab League", "UNIFIL"],
        adversaries: ["Israel (Conflict party)"],
        negotiation_tip: "Lebanon is caught between Hezbollah and the IDF. Focus on 'State Sovereignty'."
    },
    { id: 'g7', name: "G7 (Group of Seven)", group: "Global Coalitions", color: "bg-indigo-600", objectives: ["Economic stability", "Containment of non-state threats", "Unified democratic security architecture"], red_lines: ["Collapse of global energy markets", "Direct attacks on member state naval assets"], allies: ["NATO", "EU", "Ukraine", "Japan"], adversaries: ["Axis of Resistance", "Economic Spoilers"], negotiation_tip: "Prioritize 'Global Economic Resilience' and 'Rule-based Order'." },
    { id: 'g20', name: "G20 (Group of Twenty)", group: "Global Coalitions", color: "bg-slate-700", objectives: ["International financial coordination", "Sustainable regional growth", "Crisis mitigation"], red_lines: ["Global supply chain disintegration", "Unilateral financial decoupling"], allies: ["UN", "IMF", "World Bank"], adversaries: ["None (Inclusive forum)"], negotiation_tip: "Focus on 'Inclusive Development' and 'Global South Interests'." },
    { id: 'brics', name: "BRICS+", group: "Global Coalitions", color: "bg-amber-700", objectives: ["Multi-polar world order", "Alternative financial systems (NDB)", "Diplomatic non-alignment"], red_lines: ["US-led regime change operations", "Unilateral sanctions without UN mandate"], allies: ["Iran", "China", "Russia", "Brazil", "South Africa", "UAE", "Egypt"], adversaries: ["None (Systemic competition with G7)"], negotiation_tip: "Emphasize 'Sovereignty' and 'Alternative Payment Mechanisms'." },
    { id: 'nato', name: "NATO", group: "Security Blocs", color: "bg-blue-900", objectives: ["Collective defense (Article 5)", "Stability in the Mediterranean", "Maritime security coalitions"], red_lines: ["Attacks on member state territory", "Proliferation of WMDs to proxy groups"], allies: ["USA", "UK", "EU", "Turkey"], adversaries: ["IRGC", "State-sponsored terrorist groups"], negotiation_tip: "Focus on 'Collective Security' and 'Transatlantic Unity'." },
    { id: 'eu', name: "European Union (EU)", group: "Security Blocs", color: "bg-blue-700", objectives: ["Humanitarian leadership", "Regional de-escalation", "Unified sanction regimes"], red_lines: ["Mass refugee crises", "Collapse of Mediterranean stability"], allies: ["USA", "G7", "Ukraine"], adversaries: ["Human rights violators"], negotiation_tip: "Prioritize 'Humanitarian Corridors' and 'Diplomatic Mediation'." },
    { id: 'oecd', name: "OECD", group: "Global Coalitions", color: "bg-sky-800", objectives: ["Policy standard coordination", "Transparent trade", "Economic benchmarking"], red_lines: ["Widespread corruption in aid", "Energy contract defaults"], allies: ["G7", "EU"], adversaries: ["None"], negotiation_tip: "Use 'Data-Driven Policy' and 'Governance Standards'." },
    { id: 'au', name: "African Union (AU)", group: "Regional Blocs", color: "bg-green-600", objectives: ["Peace in the Horn of Africa", "Food security imports", "Red Sea mediation"], red_lines: ["Cross-border conflict spillover", "Uncontrolled migration"], allies: ["UN", "EU", "China"], adversaries: ["Regional insurgents"], negotiation_tip: "Focus on 'Pan-African Solidarity' and 'Food Sovereignty'." },
    { id: 'saarc', name: "SAARC", group: "Regional Blocs", color: "bg-teal-600", objectives: ["South Asian economic integration", "Disaster management", "Poverty alleviation"], red_lines: ["Cross-border terrorism", "Humanitarian crises affecting South Asia"], allies: ["OIC", "ASEAN"], adversaries: ["None"], negotiation_tip: "Emphasize 'Regional Connectivity' and 'South-South Cooperation'." },
    { id: 'gcc', name: "GCC (Gulf Cooperation Council)", group: "Regional Blocs", color: "bg-emerald-700", objectives: ["Gulf security unified front", "Protection of energy exports", "Stability of the Red Sea"], red_lines: ["Direct Iranian interference in Gulf states", "Disruption of oil flow"], allies: ["Saudi Arabia", "USA", "Egypt"], adversaries: ["Houthis", "Iranian IRGC"], negotiation_tip: "Focus on 'Regional Stability' and 'Common Defense'." },
    { id: 'arab_league', name: "The Arab League", group: "Regional Blocs", color: "bg-green-800", objectives: ["Palestinian statehood", "Arab regional sovereignty", "Resolution of Lebanon crisis"], red_lines: ["Permanent displacement of Palestinians", "Occupation of Beirut"], allies: ["Palestine", "Egypt", "Jordan", "Saudi Arabia"], adversaries: ["External interference"], negotiation_tip: "Prioritize 'Pan-Arab Consensus' and 'Land for Peace'." }
];

export const mockNews = [
    { id: 1, type: "ALERT", source: "Reuters", content: "Shipping insurance premiums spike 15% in Hormuz.", time: "2m ago", url: "https://reuters.com" },
    { id: 2, type: "UPDATE", source: "Al Jazeera", content: "UNIFIL reports skirmishes along Blue Line.", time: "14m ago", url: "https://aljazeera.com" }
];

export const historicalNews = [
    { id: 'h1', type: "HISTORICAL", source: "Reuters", content: "Abraham Accords Signed.", time: "Sept 2020", url: "https://reuters.com" },
    { id: 'h7', type: "HISTORICAL", source: "CNN", content: "Oct 7 Incursion.", time: "Oct 2023", url: "https://cnn.com" }
];

export const qarmas = [
    { id: 1, title: "Ceasefire Terms", description: "What are the specific conditions?" }
];

export const internationalRules = [
  {id:1,title:"Geneva Convention I — Wounded & Sick in Armed Forces (1949)",type:"treaty",cats:["war","hr","ihl"],tags:["wounded","sick","armed forces","POW","medical"],body:"Protects wounded and sick soldiers on land. Requires humane treatment regardless of nationality. Prohibits torture, murder, biological experiments. Foundational IHL document.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/gci-1949/full-text",fronts:["Gaza","Lebanon","general"], briefing: { summary: "A core pillar of International Humanitarian Law protecting victims of war.", signed: "August 12, 1949", parties: "196 States (Universal)" }},
  {id:2,title:"Geneva Convention II — Wounded, Sick & Shipwrecked at Sea (1949)",type:"treaty",cats:["war","hr","ihl"],tags:["maritime","naval","wounded","Red Sea","shipwrecked"],body:"Extends GC I protections to maritime warfare. Highly relevant to Red Sea conflict. Protects hospital ships and medical personnel at sea.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/gcii-1949/full-text",fronts:["Red Sea","general"], briefing: { summary: "A core pillar of International Humanitarian Law protecting victims of war.", signed: "August 12, 1949", parties: "196 States (Universal)" }},
  {id:3,title:"Geneva Convention III — Treatment of Prisoners of War (1949)",type:"treaty",cats:["war","hr","ihl"],tags:["POW","prisoners","detention","torture","humane treatment"],body:"Defines rights of prisoners of war — humane treatment, no torture, right to communicate with family. Applies to captured Hamas fighters, IDF soldiers held in Gaza, Houthi detainees.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/gciii-1949/full-text",fronts:["Gaza","Lebanon","general"], briefing: { summary: "A core pillar of International Humanitarian Law protecting victims of war.", signed: "August 12, 1949", parties: "196 States (Universal)" }},
  {id:4,title:"Geneva Convention IV — Protection of Civilians (1949)",type:"treaty",cats:["war","hr","ihl"],tags:["civilians","occupation","collective punishment","siege","hostages","deportation"],body:"Most directly applicable to Gaza. Prohibits collective punishment, deportation of civilians, siege-induced starvation, using civilians as shields. Regulates occupied territories.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/full-text",fronts:["Gaza","West Bank","Lebanon"], briefing: { summary: "A core pillar of International Humanitarian Law protecting victims of war.", signed: "August 12, 1949", parties: "196 States (Universal)" }},
  {id:5,title:"Additional Protocol I — International Armed Conflicts (1977)",type:"treaty",cats:["war","ihl"],tags:["proportionality","distinction","precaution","civilian objects","hospitals","journalists"],body:"Extends GC protections. Codifies principles of distinction (civilians vs combatants), proportionality, and precaution in attack. Prohibits attacks on civilian infrastructure. Relevant to IDF operations in Gaza and Lebanon.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/api-1977",fronts:["Gaza","Lebanon","general"], briefing: { summary: "Extends GC protections. Codifies principles of distinction (civilians vs combatants), proportionality, and precaution in attack. Prohibits attacks on civilian infrastructure.", signed: "N/A", parties: "International Community" }},
  {id:6,title:"Additional Protocol II — Non-International Armed Conflicts (1977)",type:"treaty",cats:["war","ihl"],tags:["non-international","civil war","internal conflict","humanitarian"],body:"Applies to internal armed conflicts. May apply to Iran's relations with proxy forces (Hezbollah, Houthis, Hamas). Sets minimum humanitarian standards.",link:"https://ihl-databases.icrc.org/en/ihl-treaties/apii-1977",fronts:["Lebanon","general"], briefing: { summary: "Applies to internal armed conflicts. May apply to Iran's relations with proxy forces (Hezbollah, Houthis, Hamas). Sets minimum humanitarian standards.", signed: "N/A", parties: "International Community" }},
  {id:7,title:"UN Charter (1945)",type:"treaty",cats:["war","hr"],tags:["self-defense","use of force","sovereignty","Article 51","Chapter VII","collective security"],body:"Governs use of force in international relations. Article 2(4) prohibits threat or use of force. Article 51 allows self-defense. Chapter VII authorizes UNSC enforcement. Cited by all parties in Middle East conflicts.",link:"https://www.un.org/en/about-us/un-charter/full-text",fronts:["Gaza","Lebanon","Iran","USA","general"], briefing: { summary: "The foundational treaty of the UN, defining state rights and obligations.", signed: "June 26, 1945", parties: "193 UN Members" }},
  {id:8,title:"Rome Statute of the International Criminal Court (1998)",type:"treaty",cats:["war","hr"],tags:["ICC","war crimes","crimes against humanity","genocide","individual criminal responsibility","Netanyahu","Hamas"],body:"Establishes ICC jurisdiction over genocide, crimes against humanity, war crimes, and aggression. ICC issued arrest warrants for PM Netanyahu and former Defense Minister Gallant. Hamas leaders also investigated.",link:"https://www.icc-cpi.int/sites/default/files/RS-Eng.pdf",fronts:["Gaza","Lebanon","general"], briefing: { summary: "Establishes ICC jurisdiction over genocide, crimes against humanity, war crimes, and aggression.", signed: "July 17, 1998", parties: "124 States Parties" }},
  {id:9,title:"Convention on the Prevention and Punishment of Genocide (1948)",type:"treaty",cats:["hr","war"],tags:["genocide","intent","group","destroy","South Africa ICJ","Israel"],body:"Prohibits acts committed with intent to destroy a national, ethnic, racial, or religious group. South Africa filed ICJ case against Israel under this convention in December 2023. Ongoing proceedings.",link:"https://www.un.org/en/genocideprevention/documents/atrocity-crimes/Doc.1_Convention%20on%20the%20Prevention%20and%20Punishment%20of%20the%20Crime%20of%20Genocide.pdf",fronts:["Gaza"], briefing: { summary: "Prohibits acts committed with intent to destroy a national, ethnic, racial, or religious group.", signed: "December 9, 1948", parties: "153 States Parties" }},
  {id:23,title:"UN Security Council Resolution 242 (1967)",type:"unres",cats:["war","hr"],tags:["occupied territories","withdrawal","land for peace","Israel","Palestine","1967 borders"],body:"Calls for Israeli withdrawal from territories occupied in 1967 Six-Day War. Basis of 'land for peace' formula. Israel's interpretation disputed. Still legally binding.",link:"https://undocs.org/en/S/RES/242(1967)",fronts:["Gaza","West Bank","general"], briefing: { summary: "A binding decision by the Security Council intended to maintain or restore international peace and security.", signed: "Adopted by UNSC", parties: "15 Council Members" }},
  {id:26,title:"UN Security Council Resolution 1701 (2006)",type:"unres",cats:["war"],tags:["Hezbollah","Lebanon","ceasefire","UNIFIL","disarmament","Blue Line"],body:"Ended 2006 Lebanon War. Called for Hezbollah disarmament south of Litani River, deployment of Lebanese army, strengthening UNIFIL. Widely considered unimplemented. Central to 2024 Lebanon conflict.",link:"https://undocs.org/en/S/RES/1701(2006)",fronts:["Lebanon"], briefing: { summary: "A binding decision by the Security Council intended to maintain or restore international peace and security.", signed: "Adopted by UNSC", parties: "15 Council Members" }},
  {id:66,title:"UNSC Resolution 2790 (August 2025)",type:"unres",cats:["war"],tags:["UNIFIL","Lebanon","mandate","extension","2025","2026"],body:"Extended UNIFIL's mandate in Lebanon for a final time until Dec 31, 2026, requesting options for the future security of the Blue Line post-UNIFIL.",link:"https://undocs.org/en/S/RES/2790(2025)",fronts:["Lebanon"], briefing: { summary: "A binding decision by the Security Council intended to maintain or restore international peace and security.", signed: "Adopted by UNSC", parties: "15 Council Members" }},
  {id:67,title:"UNSC Resolution 2803 (November 2025)",type:"unres",cats:["war","hr"],tags:["Gaza","peace plan","Board of Peace","Stabilization Force","ISF","2025"],body:"Passed to implement the Gaza peace plan, welcoming the creation of a transitional 'Board of Peace' and authorizing the deployment of an International Stabilization Force.",link:"https://undocs.org/en/S/RES/2803(2025)",fronts:["Gaza"], briefing: { summary: "A binding decision by the Security Council intended to maintain or restore international peace and security.", signed: "Adopted by UNSC", parties: "15 Council Members" }},
  { id: 200, title: "Abraham Accords Declaration (2020)", type: "treaty", cats: ["trade", "diplomacy"], tags: ["normalization", "Israel", "UAE", "Bahrain"], body: "Historic shift in regional security and economic cooperation.", link: "https://www.state.gov/the-abraham-accords/", fronts: ["Middle East"], briefing: { summary: "Normalization of diplomatic, economic, and security ties between Israel and UAE, Bahrain, Sudan, and Morocco.", signed: "September 15, 2020", parties: "Israel, UAE, Bahrain, USA" } }
];
