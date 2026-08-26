# Deploy Maya on Vercel

1. Create/use a GitHub repository for this project.
2. Upload the contents of this folder (not the ZIP itself).
3. Import the repository into Vercel.
4. Do NOT add a custom `functions` pattern for `api/chat.js`; this version relies on Vercel auto-detection.
5. In Vercel: Project → Settings → Environment Variables:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENAI_MODEL` = optional; default is `gpt-5.4-mini`
6. Redeploy.
7. Open the site and use ⚙️ → Testar conexão.

The browser calls `/api/chat`; the API key remains on the server.
