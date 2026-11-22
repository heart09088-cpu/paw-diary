// 毛孩零用錢日記：只處理頁面本身（先連網路，斷線時用上次的頁面），其他檔案交給瀏覽器
const C='paw-page-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||r.mode!=='navigate')return;
  e.respondWith((async()=>{
    try{const res=await fetch(r);if(res&&res.ok){const c=await caches.open(C);c.put('./',res.clone())}return res}
    catch(err){const c=await caches.open(C);return (await c.match('./'))||Response.error()}
  })());
});
