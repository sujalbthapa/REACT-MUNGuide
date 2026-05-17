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

app.post('/api/chat', async (req, res) => {
    const { messages, system_prompt } = req.body;

    if (!messages) {
        return res.status(400).json({ error: 'messages are required' });
    }

    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-72B-Instruct",
                messages: messages,
                max_tokens: 400,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            console.error('Hugging Face API Error:', await response.text());
            return res.status(response.status).json({ error: "Upstream API error" });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
                        content: `You are the UN Security Council Strategic Research Advisor (Simulation Year: 2026). 
                        
                        CORE MANDATE: 
                        1. Provide strictly geopolitical, diplomatic, and legal analysis regarding the Middle East.
                        2. Explain provisions of international treaties (UNCLOS, Geneva Conventions, Rome Statute, etc.).
                        3. Define diplomatic terminology and institutional roles.
                        
                        STRICT PROHIBITIONS:
                        - DO NOT give technical, programming, or web development advice.
                        - DO NOT advise the user to build tools, websites, or software.
                        - ABSOLUTELY NO drafting speeches, opening statements, resolutions, or any form of documents. 
                        - DO NOT write any prose or content that resembles a speech, outline, or draft document.
                        - LIMIT your responses strictly to brief, conceptual, high-level analysis and geopolitical facts.
                        - DO NOT provide "outlines" for speeches or documents.
                        - DO NOT step out of your persona as a high-level research bureau.
                        
                        ADAPTIVE DEPTH: Use a professional, institutional tone.
                        
                        FORMATTING REQUIREMENTS:
                        - Structure all responses using bold, clear CATEGORY HEADERS (e.g., **Geopolitical Context**, **Legal Provisions**, **Institutional Role**).
                        - Under each header, use only 2-3 concise, high-level bullet points.
                        - ABSOLUTELY NO prose, no documents, no speeches.
                        - KEEP IT EXTREMELY BRIEF.` 
                    },
                    { role: "user", content: query }
                ],
                stream: true,
                max_tokens: 500,
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
        const agendaTerms = [
            "Middle East", "UNSC", "Gaza", "Israel", "Iran", 
            "Lebanon", "Hezbollah"
        ];
        // Use a more focused query
        const query = agendaTerms.join(' OR ');

        // Construct URLs
        const SEARCH_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=relevancy&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;
        const BBC_URL = "https://bbc-news-api.vercel.app/latest?lang=english";

        // Parallel Fetch
        const [searchRes, bbcRes] = await Promise.all([
            fetch(SEARCH_URL, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }).catch(() => null),
            fetch(BBC_URL).catch(() => null)
        ]);

        // Process Agenda-Specific Search (Relevancy-based)
        if (searchRes && searchRes.ok) {
            const data = await searchRes.json();
            (data.articles || []).forEach(art => {
                if (art.title && !seenTitles.has(art.title)) {
                    const titleLower = art.title.toLowerCase();
                    const isRelevant = agendaTerms.some(term => titleLower.includes(term.toLowerCase()));

                    if (isRelevant) {
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
                }
            });
        }
 else {
            console.error('[NewsAPI] Failed or empty response. Status:', searchRes ? searchRes.status : 'No response');
        }

        // Process BBC News
        if (bbcRes && bbcRes.ok) {
            const data = await bbcRes.json();
            // The API returns an object with category keys (e.g., "Weekend reads") containing arrays of articles.
            Object.keys(data).forEach(category => {
                const articles = data[category];
                if (Array.isArray(articles)) {
                    articles.forEach(art => {
                        // The structure uses news_link instead of link.
                        const link = art.news_link || art.link;
                        const title = art.title;
                        
                        if (title && !seenTitles.has(title)) {
                            const isAgenda = agendaTerms.some(term => 
                                title.toLowerCase().includes(term.toLowerCase())
                            );
                            
                            if (isAgenda) {
                                seenTitles.add(title);
                                allArticles.push({
                                    id: `bbc-${link}`,
                                    type: "AGENDA",
                                    source: "BBC News",
                                    content: title,
                                    time: "Recent",
                                    url: link,
                                    priority: 1
                                });
                            }
                        }
                    });
                }
            });
        } else {
            console.error('[News] BBC API failed or returned invalid response');
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
