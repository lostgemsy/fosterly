/* HOHO GAMES HUD + performance controls. No external dependencies. */
(() => {
  const KEY = "hoho-hud-settings-v1";
  const defaults = { position: "top", performance: false, drag: false };
  const read = () => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
    catch (_) { return { ...defaults }; }
  };
  let settings = read();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch (_) {} };
  const style = document.createElement("style");
  style.id = "hoho-hud-style";
  style.textContent = `
    .hoho-hud-launcher{position:fixed!important;right:18px!important;bottom:18px!important;z-index:2147483000!important;display:inline-flex!important;align-items:center!important;gap:8px!important;padding:11px 15px!important;border:1px solid rgba(235,241,250,.24)!important;border-radius:16px!important;color:#f5f7fb!important;background:linear-gradient(145deg,rgba(255,255,255,.19),rgba(255,255,255,.055))!important;box-shadow:inset 0 1px rgba(255,255,255,.2),0 12px 32px rgba(0,0,0,.3)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;font:600 12px/1 Inter,system-ui,sans-serif!important;cursor:pointer!important;transition:transform .22s ease,background .22s ease,border-color .22s ease!important}
    .hoho-hud-launcher:hover{transform:translateY(-3px)!important;background:linear-gradient(145deg,rgba(255,255,255,.27),rgba(255,255,255,.09))!important;border-color:rgba(255,255,255,.4)!important}
    .hoho-hud-launcher svg{width:16px;height:16px}
    .hoho-hud-panel{position:fixed;right:18px;bottom:72px;z-index:2147483000;width:min(340px,calc(100vw - 24px));padding:18px;border:1px solid rgba(235,241,250,.22);border-radius:22px;color:#f4f6fa;background:linear-gradient(145deg,rgba(31,35,43,.96),rgba(10,12,17,.96));box-shadow:0 24px 70px rgba(0,0,0,.48),inset 0 1px rgba(255,255,255,.12);backdrop-filter:blur(26px) saturate(1.2);-webkit-backdrop-filter:blur(26px) saturate(1.2);font:13px/1.45 Inter,system-ui,sans-serif}
    .hoho-hud-panel[hidden]{display:none!important}.hoho-hud-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.hoho-hud-title{font-size:16px;font-weight:800;letter-spacing:-.03em}.hoho-hud-close{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(255,255,255,.06);color:#fff;cursor:pointer}.hoho-hud-section{padding:12px 0;border-top:1px solid rgba(255,255,255,.1)}.hoho-hud-label{display:block;margin-bottom:9px;color:#cbd2de;font-size:12px;font-weight:700}.hoho-hud-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.hoho-hud-choice,.hoho-hud-action{min-height:36px;padding:8px 9px;border:1px solid rgba(231,238,249,.15);border-radius:11px;background:rgba(255,255,255,.055);color:#dce3ed;font:600 11px/1.2 Inter,system-ui,sans-serif;cursor:pointer;transition:transform .18s ease,background .18s ease,border-color .18s ease}.hoho-hud-choice:hover,.hoho-hud-action:hover{transform:translateY(-2px);background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.3)}.hoho-hud-choice[aria-pressed=true],.hoho-hud-action[aria-pressed=true]{background:linear-gradient(145deg,rgba(255,255,255,.24),rgba(255,255,255,.09));border-color:rgba(255,255,255,.38);color:#fff}.hoho-hud-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.hoho-hud-note{margin:8px 0 0;color:rgba(225,232,242,.58);font-size:11px}.hoho-hud-toggle{display:flex;align-items:center;gap:8px;color:#e7ebf2;font-size:12px}.hoho-hud-toggle input{accent-color:#e7ebf2;width:16px;height:16px}.hoho-hud-actions{display:flex;gap:8px;flex-wrap:wrap}.hoho-hud-action{flex:1}.hoho-hud-dragging{outline:2px dashed rgba(255,255,255,.7)!important;outline-offset:5px!important;cursor:move!important}
    body.hoho-performance *,body.hoho-performance *::before,body.hoho-performance *::after{scroll-behavior:auto!important;animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important}
    body.hoho-performance #particles,body.hoho-performance .particles,body.hoho-performance canvas#particles{display:none!important}
    body.hoho-hud-drag .ol-sidebar{outline:2px dashed rgba(255,255,255,.65)!important;outline-offset:5px!important;cursor:move!important}
    body.hoho-nav-left .ol-sidebar{left:12px!important;right:auto!important;top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;flex-direction:column!important;max-height:calc(100vh - 24px)!important;max-width:calc(100vw - 24px)!important}
    body.hoho-nav-right .ol-sidebar{left:auto!important;right:12px!important;top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;flex-direction:column!important;max-height:calc(100vh - 24px)!important;max-width:calc(100vw - 24px)!important}
    body.hoho-nav-bottom .ol-sidebar{left:50%!important;right:auto!important;top:auto!important;bottom:12px!important;transform:translateX(-50%)!important;flex-direction:row!important;max-width:calc(100vw - 16px)!important}
    body.hoho-nav-left .ol-sidebar .ol-group,body.hoho-nav-left .ol-sidebar .ol-rail,body.hoho-nav-right .ol-sidebar .ol-group,body.hoho-nav-right .ol-sidebar .ol-rail{flex-direction:column!important}
    body.hoho-nav-left .ol-sidebar .ol-brand,body.hoho-nav-right .ol-sidebar .ol-brand{border-right:0!important;border-bottom:1px solid rgba(231,237,247,.15)!important;margin:0 0 5px!important;padding:8px!important}
    body.hoho-nav-left .ol-stage,body.hoho-nav-right .ol-stage{padding-top:24px!important}
    body.hoho-nav-left .ol-stage{padding-left:94px!important}body.hoho-nav-right .ol-stage{padding-right:94px!important}
    body.hoho-nav-bottom .ol-stage{padding-bottom:92px!important}
    body.hoho-nav-left .ol-sidebar .ol-label,body.hoho-nav-right .ol-sidebar .ol-label{display:inline!important}
    @media(max-width:600px){.hoho-hud-launcher{right:10px!important;bottom:10px!important;padding:10px 12px!important}.hoho-hud-panel{right:10px;bottom:60px}.hoho-hud-choices{grid-template-columns:repeat(2,minmax(0,1fr))}body.hoho-nav-left .ol-stage{padding-left:76px!important}body.hoho-nav-right .ol-stage{padding-right:76px!important}}
    @media(prefers-reduced-motion:reduce){.hoho-hud-launcher,.hoho-hud-choice,.hoho-hud-action{transition:none!important}}
  `;
  document.head.appendChild(style);

  const apply = () => {
    document.body.classList.toggle("hoho-performance", !!settings.performance);
    ["top","left","right","bottom"].forEach(p => document.body.classList.toggle("hoho-nav-"+p, settings.position === p && p !== "top"));
    document.body.classList.toggle("hoho-hud-drag", !!settings.drag);
    const nav = document.querySelector(".ol-sidebar");
    if (nav) {
      nav.querySelectorAll(".ol-link,.ol-panic").forEach(link => {
        const label = (link.querySelector(".ol-label")?.textContent || link.getAttribute("aria-label") || link.title || "").trim().toLowerCase();
        if (label === "apps" || label === "apps page" || label === "applications") link.remove();
      });
      nav.setAttribute("aria-label","HOHO GAMES navigation");
      nav.style.touchAction = settings.drag ? "none" : "";
    }
    const pos = panel?.querySelectorAll("[data-position]");
    pos?.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.position === settings.position)));
    const perf = panel?.querySelector("#hohoPerfToggle");
    if (perf) perf.checked = !!settings.performance;
    const drag = panel?.querySelector("#hohoDragToggle");
    if (drag) drag.checked = !!settings.drag;
  };
  let panel;
  const init = () => {
    if (document.querySelector(".hoho-hud-launcher")) return;
    const launcher = document.createElement("button");
    launcher.className = "hoho-hud-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-expanded","false");
    launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3H3.7a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z"/></svg><span>HUD & Performance</span>';
    panel = document.createElement("section");
    panel.className = "hoho-hud-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label","HUD editor and performance settings");
    panel.innerHTML = '<div class="hoho-hud-head"><div><div class="hoho-hud-title">HUD Editor</div><div class="hoho-hud-note">Customize your navigation layout</div></div><button type="button" class="hoho-hud-close" aria-label="Close settings">×</button></div><div class="hoho-hud-section"><span class="hoho-hud-label">Navigation position</span><div class="hoho-hud-choices"><button class="hoho-hud-choice" data-position="top" aria-pressed="false">Top</button><button class="hoho-hud-choice" data-position="left" aria-pressed="false">Left</button><button class="hoho-hud-choice" data-position="bottom" aria-pressed="false">Bottom</button><button class="hoho-hud-choice" data-position="right" aria-pressed="false">Right</button></div><p class="hoho-hud-note">Choose where the navigation panel sits. Your choice is saved on this device.</p></div><div class="hoho-hud-section"><div class="hoho-hud-row"><label class="hoho-hud-toggle"><input id="hohoDragToggle" type="checkbox"> Drag navigation to reposition</label></div><p class="hoho-hud-note">Turn this on, then drag the navigation panel. Turn it off to use the buttons normally.</p></div><div class="hoho-hud-section"><div class="hoho-hud-row"><label class="hoho-hud-toggle"><input id="hohoPerfToggle" type="checkbox"> Performance mode</label><span class="hoho-hud-note">Less animation / blur</span></div><p class="hoho-hud-note">Reduces heavy visual effects to help lower-end devices feel smoother.</p></div><div class="hoho-hud-section hoho-hud-actions"><button class="hoho-hud-action" id="hohoHudReset" type="button">Reset layout</button><button class="hoho-hud-action" id="hohoHudDone" type="button">Done</button></div>';
    document.body.append(launcher,panel);
    launcher.addEventListener("click", () => { panel.hidden = !panel.hidden; launcher.setAttribute("aria-expanded",String(!panel.hidden)); apply(); });
    panel.querySelector(".hoho-hud-close").addEventListener("click",close);
    panel.querySelector("#hohoHudDone").addEventListener("click",close);
    function close(){panel.hidden=true;launcher.setAttribute("aria-expanded","false");}
    panel.querySelectorAll("[data-position]").forEach(b=>b.addEventListener("click",()=>{settings.position=b.dataset.position;save();apply();}));
    panel.querySelector("#hohoPerfToggle").addEventListener("change",e=>{settings.performance=e.target.checked;save();apply();});
    panel.querySelector("#hohoDragToggle").addEventListener("change",e=>{settings.drag=e.target.checked;save();apply();});
    panel.querySelector("#hohoHudReset").addEventListener("click",()=>{settings={...defaults};save();apply();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)close();});
    let dragging=false, startX=0,startY=0,navX=0,navY=0;
    const getNav=()=>document.querySelector(".ol-sidebar");
    document.addEventListener("pointerdown",e=>{
      const nav=getNav();
      if(!settings.drag||!nav||!nav.contains(e.target)||e.target.closest("button,a,input"))return;
      dragging=true;startX=e.clientX;startY=e.clientY;
      const r=nav.getBoundingClientRect();navX=r.left;navY=r.top;
      nav.style.left=r.left+"px";nav.style.top=r.top+"px";nav.style.right="auto";nav.style.bottom="auto";nav.style.transform="none";
      try{nav.setPointerCapture(e.pointerId)}catch(_){}
      e.preventDefault();
    });
    document.addEventListener("pointermove",e=>{
      if(!dragging)return;const nav=getNav();if(!nav)return;
      const x=Math.max(4,Math.min(innerWidth-nav.offsetWidth-4,navX+e.clientX-startX));
      const y=Math.max(4,Math.min(innerHeight-nav.offsetHeight-4,navY+e.clientY-startY));
      nav.style.left=x+"px";nav.style.top=y+"px";
    });
    document.addEventListener("pointerup",()=>{
      if(!dragging)return;dragging=false;const nav=getNav();if(!nav)return;
      const r=nav.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
      settings.position=(Math.min(cx,innerWidth-cx)>Math.min(cy,innerHeight-cy))?(cy<innerHeight/2?"top":"bottom"):(cx<innerWidth/2?"left":"right");
      settings.drag=false;save();nav.style.left="";nav.style.top="";nav.style.right="";nav.style.bottom="";nav.style.transform="";apply();
    });
    const observer=new MutationObserver(apply);
    observer.observe(document.body,{childList:true,subtree:true});
    apply();
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{init();apply();},{once:true});else {init();apply();}
})();