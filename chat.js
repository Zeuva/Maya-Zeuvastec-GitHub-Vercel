const OpenAI = require('openai');
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY não configurada' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
      instructions: body.system || 'Você é Maya, uma tutora de inglês da Zeuvastec. Seja amigável, clara e ajude o usuário a praticar inglês americano.',
      input: messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '') }))
    });
    return res.status(200).json({ reply: response.output_text || '' });
  } catch (e) {
    return res.status(500).json({ error: e && e.message ? e.message : 'Erro ao chamar a OpenAI' });
  }
};
