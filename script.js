(function(){try{
  var slug="lp-moptore5-1s5ue";
  var SK='lp_access_'+slug;
  var map={access_token:'lp_pw_',allowlist_access_token:'lp_al_',pin_access_token:'lp_pin_',paywall_access_token:'lp_paid_'};
  var u=new URL(location.href);var found=null;var changed=false;
  Object.keys(map).forEach(function(p){var v=u.searchParams.get(p);if(v){found=v;try{localStorage.setItem(map[p]+slug,v);}catch(e){}u.searchParams.delete(p);changed=true;}});
  if(found){try{sessionStorage.setItem(SK,found);}catch(e){}}
  else{try{if(!sessionStorage.getItem(SK)){var t=localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);if(t)sessionStorage.setItem(SK,t);}}catch(e){}}
  if(changed){try{history.replaceState(null,'',u.toString());}catch(e){}}

  // Auto-attach gate token to:
  //   1. sheet-rows writes (PATCH/POST/PUT/DELETE)
  //   2. LLM proxy calls (POST/GET) — /api/landing-pages/public/<slug>/llm/...
  //   3. landing-page LLM config probes (GET) — same prefix
  // So AI-generated pages don't have to know about the X-Landing-Page-Token header.
  function getTok(){try{return sessionStorage.getItem(SK)||localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);}catch(e){return null;}}
  function needsToken(url,method){if(!url)return false;var s=String(url);var m=(method||'GET').toUpperCase();var isSheetWrite=(m==='POST'||m==='PATCH'||m==='PUT'||m==='DELETE')&&/\/sheet-rows(\/|$|\?)/.test(s);var isLlm=/\/api\/landing-pages\/public\/[^/]+\/(llm|llm-config)(\/|$|\?)/.test(s);return isSheetWrite||isLlm;}
  if(window.fetch){var _f=window.fetch;window.fetch=function(input,init){try{var url=typeof input==='string'?input:(input&&input.url)||'';var method=(init&&init.method)||(input&&input.method)||'GET';if(needsToken(url,method)){var tok=getTok();if(tok){init=init||{};var h=new Headers(init.headers||(typeof input!=='string'?input.headers:undefined)||{});if(!h.has('X-Landing-Page-Token'))h.set('X-Landing-Page-Token',tok);init.headers=h;}}}catch(e){}return _f.call(this,input,init);};}
  if(window.XMLHttpRequest){var _o=XMLHttpRequest.prototype.open;var _s=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(m,u){this.__lpM=m;this.__lpU=u;return _o.apply(this,arguments);};XMLHttpRequest.prototype.send=function(){try{if(needsToken(this.__lpU,this.__lpM)){var tok=getTok();if(tok)this.setRequestHeader('X-Landing-Page-Token',tok);}}catch(e){}return _s.apply(this,arguments);};}
}catch(e){}})();

(function(){
  var apiUrl = 'https://api.getkrowd.com/v1/beer?apiKey=krwd_fd6a9bdbc7c6adb43d3f6f1ba812c4a2365f9ea520de24f81c3969e91ac';
  var container = document.getElementById('taps-container');
  fetch(apiUrl)
    .then(function(r){ return r.json(); })
    .then(function(data){
      var beers = data.beers || data.items || data.data || (Array.isArray(data) ? data : []);
      if(!beers.length){ container.innerHTML='<div class="taps-loading">Check out our full beer list at the bar!</div>'; return; }
      var html = '<div class="taps-grid">';
      beers.slice(0,9).forEach(function(b){
        html += '<div class="tap-card">';
        if(b.style||b.type) html += '<div class="tap-card-style">'+(b.style||b.type||'')+'</div>';
        html += '<div class="tap-card-name">'+(b.name||b.beer_name||'')+'</div>';
        if(b.brewery||b.brewery_name) html += '<div class="tap-card-brewery">'+(b.brewery||b.brewery_name||'')+'</div>';
        if(b.abv) html += '<span class="tap-card-abv">'+b.abv+'% ABV</span>';
        if(b.description||b.desc) html += '<p class="tap-card-desc">'+(b.description||b.desc||'')+'</p>';
        html += '</div>';
      });
      html += '</div>';
      container.innerHTML = html;
    })
    .catch(function(){ container.innerHTML='<div class="taps-loading">Visit us to see what\'s pouring today — 50 taps always rotating.</div>'; });
})();