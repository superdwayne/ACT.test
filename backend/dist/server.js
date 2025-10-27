"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ai_1 = require("ai");
const openai_1 = require("@ai-sdk/openai");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});
app.post('/api/chat', async (req, res) => {
    const { prompt, system } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt' });
    }
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server' });
    }
    try {
        const openai = (0, openai_1.createOpenAI)({
            apiKey: process.env.OPENAI_API_KEY
        });
        const result = await (0, ai_1.generateText)({
            model: openai('gpt-4o-mini'),
            prompt,
            system,
            maxOutputTokens: 512,
            temperature: 0.7
        });
        res.json({ output: result.text });
    }
    catch (error) {
        console.error('Chat generation error', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map