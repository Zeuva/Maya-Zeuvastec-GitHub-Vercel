# Maya Zeuvastec — GitHub/Vercel v1.8

Esta versão usa a detecção automática de Vercel Functions pela pasta `/api` e não possui `vercel.json`.

## Testes
- `/api/ping` — confirma que Functions estão ativas.
- `/api/health` — confirma que `OPENAI_API_KEY` está disponível.
- `POST /api/chat` — conversa com OpenAI.

Configure `OPENAI_API_KEY` na Vercel como Secret em Production/Preview/Development. `OPENAI_MODEL` é opcional; padrão: `gpt-5.4-mini`.
