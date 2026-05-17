const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'online' });
});

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_API_KEY = process.env.HF_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// --- AI RESEARCH ENDPOINT ---
app.post('/api/analyze', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-72B-Instruct",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a professional Diplomatic Research Advisor for the UN Security Council (2026) simulation. Your mission is to help delegates gain information by explaining international law provisions, defining terms, and clarifying complex concepts. ADAPTIVE DEPTH: Provide a concise (1-2 sentence) explanation for simple definitions, but offer a structured multi-point breakdown for complex legal provisions (e.g. ICCPR articles). FORMATTING: Always use Markdown: **bold** key terms and use bullet points for lists. PROHIBITION: Do not write speeches, opening statements, or resolutions. Focus exclusively on the 'Situation in the Middle East' context." 
                    },
                    { role: "user", content: query }
                ],
                stream: true,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) return res.status(response.status).json({ error: "Upstream API error" });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const reader = response.body.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
        }
        res.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- MULTI-SOURCE LIVE NEWS ENDPOINT ---
app.get('/api/news', async (req, res) => {
    try {
        const allArticles = [];
        const seenTitles = new Set();
        
        // 1. Agenda Keywords (Strategic Search)
        const agendaKeywords = [
            '"Middle East"', '"UNSC"', '"Security Council"', '"Gaza"', 
            '"Israel"', '"Iran"', '"Lebanon"', '"Hezbollah"', 
            '"Houthi"', '"Red Sea"', '"Strait of Hormuz"'
        ].join(' OR ');
        const contextKeywords = '(conflict OR diplomatic OR crisis OR resolution OR war OR peace OR humanitarian)';
        const query = `(${agendaKeywords}) AND ${contextKeywords}`;
        
        // 2. High-Credibility Sources (Reuters, AP, Al Jazeera, etc.)
        const premiumSources = [
            'reuters', 'associated-press', 'al-jazeera-english', 
            'msnbc', 'cnn', 'google-news', 'bloomberg', 'axios'
        ].join(',');

        // Construct URLs
        const SEARCH_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=15&apiKey=${NEWS_API_KEY}`;
        const HEADLINES_URL = `https://newsapi.org/v2/top-headlines?sources=${premiumSources}&pageSize=15&apiKey=${NEWS_API_KEY}`;
        const BBC_URL = "https://bbc-news-api.vercel.app/latest?lang=english";

        // Parallel Fetch from 3 intelligence streams
        const [searchRes, headlineRes, bbcRes] = await Promise.all([
            fetch(SEARCH_URL).catch(() => null),
            fetch(HEADLINES_URL).catch(() => null),
            fetch(BBC_URL).catch(() => null)
        ]);

        // Process Agenda-Specific Search
        if (searchRes && searchRes.ok) {
            const data = await searchRes.json();
            (data.articles || []).forEach(art => {
                if (!seenTitles.has(art.title)) {
                    seenTitles.add(art.title);
                    allArticles.push({
                        id: `search-${art.url}`,
                        type: "AGENDA",
                        source: art.source.name || "Agency",
                        content: art.title,
                        time: new Date(art.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        url: art.url,
                        priority: 1
                    });
                }
            });
        }

        // Process Premium Agency Headlines
        if (headlineRes && headlineRes.ok) {
            const data = await headlineRes.json();
            (data.articles || []).forEach(art => {
                if (!seenTitles.has(art.title)) {
                    seenTitles.add(art.title);
                    // Check if headline matches agenda keywords for priority boost
                    const isAgenda = agendaKeywords.split(' OR ').some(kw => 
                        art.title.toLowerCase().includes(kw.replace(/"/g, '').toLowerCase())
                    );
                    
                    allArticles.push({
                        id: `headline-${art.url}`,
                        type: isAgenda ? "AGENDA" : "WORLD",
                        source: art.source.name || "Global News",
                        content: art.title,
                        time: new Date(art.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        url: art.url,
                        priority: isAgenda ? 1 : 2
                    });
                }
            });
        }

        // Process BBC News
        if (bbcRes && bbcRes.ok) {
            const data = await bbcRes.json();
            (Array.isArray(data) ? data : []).forEach(art => {
                if (!seenTitles.has(art.title)) {
                    seenTitles.add(art.title);
                    const isAgenda = agendaKeywords.split(' OR ').some(kw => 
                        art.title.toLowerCase().includes(kw.replace(/"/g, '').toLowerCase())
                    );
                    allArticles.push({
                        id: `bbc-${art.link}`,
                        type: isAgenda ? "AGENDA" : "WORLD",
                        source: "BBC News",
                        content: art.title,
                        time: art.published ? new Date(art.published).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent",
                        url: art.link,
                        priority: isAgenda ? 1 : 3
                    });
                }
            });
        }

        // Final sorting: Agenda first, then Premium World news, then general
        const sorted = allArticles.sort((a, b) => a.priority - b.priority);
        res.json(sorted.slice(0, 30));

    } catch (error) {
        console.error('[Server] Aggregated News Error:', error);
        res.status(500).json({ error: "Failed to fetch aggregated news stream" });
    }
});

app.listen(PORT, () => {
    console.log(`[Server] Aggregated Research Server active on port ${PORT}`);
});
