# Maya Zeuvastec — Vercel v1.7

Esta versão usa as Serverless Functions Node.js da Vercel em `/api` e adiciona uma configuração ampla `api/**` para evitar problemas de correspondência de padrão de função em alguns deployments.

## Estrutura obrigatória

O conteúdo desta pasta deve estar na raiz do repositório GitHub:

```
api/
  chat.js
  health.js
index.html
renderer.js
styles.css
vercel.json
package.json
```

Não coloque esta pasta dentro de outra pasta no GitHub e não configure um Root Directory apontando para uma pasta diferente.

## Vercel

1. Importe o repositório.
2. Framework Preset: **Other** (se a Vercel pedir).
3. Root Directory: **/** (raiz do repositório).
4. Não defina Build Command nem Output Directory personalizados.
5. Em Environment Variables, adicione `OPENAI_API_KEY` como Secret em Production, Preview e Development.
6. Opcionalmente adicione `OPENAI_MODEL`. O padrão é `gpt-5.4-mini`.
7. Faça um novo Deploy/Redeploy.

## Teste obrigatório

Abra:

`https://SEU-DOMINIO.vercel.app/api/health`

Deve retornar JSON com:

```json
{
  "ok": true,
  "openaiKeyConfigured": true
}
```

Depois teste a interface da Maya.
