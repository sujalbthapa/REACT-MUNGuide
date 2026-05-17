const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_API_KEY = process.env.HF_API_KEY;

app.post('/api/analyze', async (req, res) => {
    try {
        const { query } = req.body;

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
                        content: "You are a professional Diplomatic & Legal Information Assistant for the UN Security Council (2026). Your sole purpose is to provide clear, neutral, and accurate definitions of legal terms, explanations of international law provisions (e.g., ICCPR, Geneva Conventions, UN Charter), and clarifications of diplomatic concepts. Your goal is to help delegates gain information and understanding. PROHIBITION: You are strictly forbidden from writing speeches, opening statements, resolutions, or persuasive arguments. Do not take sides. Focus entirely on 'What does this term mean?' and 'How does this legal provision work?' Provide structured, educational breakdowns." 
                    },
                    { role: "user", content: query }
                ],
                stream: true,
                max_tokens: 1000,
            }),
        });

        // Forward the stream
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        response.body.pipe(res);

    } catch (error) {
        console.error('Server Analysis Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Professional Research Server active on port ${PORT}`);
});
