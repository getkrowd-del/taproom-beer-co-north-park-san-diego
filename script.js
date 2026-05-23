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