# Maya — Zeuvastec Language (GitHub + Vercel)

Esta é a versão web do Avatar. O ponto principal desta versão é que a conversa com o GPT passa por `/api/chat` na Vercel, e a chave da OpenAI fica somente em variável de ambiente do servidor.

## Deploy na Vercel

1. Crie um repositório no GitHub, por exemplo `Maya-Zeuvastec-GitHub-Vercel`.
2. Envie **o conteúdo desta pasta**, não o ZIP.
3. Importe o repositório na Vercel.
4. Em Vercel → Project → Settings → Environment Variables, crie:
   - `OPENAI_API_KEY` = sua chave da OpenAI
   - `OPENAI_MODEL` = `gpt-5.4-mini` (opcional; esse é o padrão)
5. Faça Redeploy.
6. Abra a URL da Vercel e vá em ⚙ para testar a conexão.

## Importante sobre transparência

O canvas do Avatar é transparente, mas um navegador comum não consegue tornar a própria página uma janela transparente sobre a área de trabalho do Windows. Para o efeito de Avatar "morando" na área de trabalho, use a versão Electron/Windows. A Vercel é a versão web para testar Avatar + GPT.

## Segurança

Não coloque `OPENAI_API_KEY` em `renderer.js`, `index.html`, `.env` enviado ao GitHub ou qualquer arquivo público. A chave deve ficar apenas nas Environment Variables da Vercel.


## Vercel

This version intentionally does not include a `functions` block in `vercel.json`. Vercel auto-detects `api/chat.js` as a Node.js Serverless Function. Configure `OPENAI_API_KEY` in Project Settings → Environment Variables. `OPENAI_MODEL` is optional and defaults to `gpt-5.4-mini`.

## Diagnóstico
- `GET /api/health` verifica se a Function está publicada e se `OPENAI_API_KEY` está disponível.
- `POST /api/chat` sempre devolve JSON, inclusive em erros.
