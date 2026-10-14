// Service worker da Maya: guarda o app no celular para abrir rápido (e o avatar não ser
// baixado de novo toda vez). Conversas com o Gemini nunca são guardadas aqui.
const VERSAO='maya-v1.6.2';
const ESSENCIAIS=[
  './','index.html','style.css','app.js','lips.js','gravador.js','manifest.webmanifest',
  'corpo-vida.js','corpo-congelado.js',
  'vendor/talkinghead/talkinghead.mjs','vendor/talkinghead/dynamicbones.mjs','vendor/talkinghead/playback-worklet.js',
  'icons/icon-192-v2.png','icons/icon-512-v2.png','icons/apple-touch-icon-v2.png','icons/favicon-v2.png',
  'img/avatar-feminino.webp','img/avatar-masculino.webp'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ESSENCIAIS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO && k!=='maya-avatares').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.hostname.endsWith('googleapis.com') || url.pathname.includes('/api/')) return; // IA: sempre ao vivo
  // Avatares (arquivos grandes): guardados em cache separado, que sobrevive às atualizações.
  if(url.origin===location.origin && url.pathname.endsWith('.glb')){
    e.respondWith(caches.open('maya-avatares').then(async c=>{
      const hit=await c.match(req); if(hit) return hit;
      const r=await fetch(req); if(r.ok) c.put(req,r.clone()); return r;
    }));
    return;
  }
  // Bibliotecas 3D do CDN: cache primeiro (versão fixa, não muda).
  if(url.hostname==='cdn.jsdelivr.net'){
    e.respondWith(caches.open(VERSAO).then(async c=>{
      const hit=await c.match(req); if(hit) return hit;
      const r=await fetch(req); if(r.ok) c.put(req,r.clone()); return r;
    }));
    return;
  }
  // Arquivos do app: rede primeiro (pega atualizações), cache se estiver sem internet.
  if(url.origin===location.origin){
    e.respondWith(fetch(req).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(VERSAO).then(c=>c.put(req,cp)); } return r; })
      .catch(()=>caches.match(req).then(h=>h||caches.match('index.html'))));
  }
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){ if('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
