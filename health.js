module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Use GET /api/health.' });
  return res.status(200).json({
    ok: true,
    api: 'maya-zeuvastec',
    runtime: 'vercel-node',
    openaiKeyConfigured: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
    routes: ['/api/ping', '/api/health', '/api/chat']
  });
};
