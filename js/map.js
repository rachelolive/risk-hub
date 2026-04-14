(function () {
  var WORLD_TOPO = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  var activeRegion = 'All';
  var activeSector = 'All';

  function levelColor(l) { return l==='active'?'#FF585D':l==='escalating'?'#f39c12':'#f1c40f'; }
  function levelLabel(l) { return l==='active'?'High exposure':l==='escalating'?'Elevated':'Monitor'; }
  function badgeClass(l)  { return l==='active'?'exp-high':l==='escalating'?'exp-elev':'exp-mon'; }
  function confClass(c)   { return c==='high'?'conf-h':c==='medium'?'conf-m':'conf-e'; }
  function confLabel(c)   { return c==='high'?'● High confidence':c==='medium'?'● Medium confidence':'● Emerging signal'; }

  var gSel, projFn, tooltipEl, mapWrapEl, sidePanelEl, panelContentEl;

  function initMap() {
    var svg = d3.select('#world-svg').attr('viewBox','0 0 960 500');
    projFn = d3.geoNaturalEarth1().scale(153).translate([480,260]);
    var path = d3.geoPath(projFn);
    gSel = svg.append('g');
    tooltipEl = document.getElementById('map-tooltip');
    mapWrapEl = document.getElementById('map-wrap');
    sidePanelEl = document.getElementById('side-panel');
    panelContentEl = document.getElementById('panel-content');

    var zoom = d3.zoom().scaleExtent([1,8]).on('zoom', function(e){ gSel.attr('transform', e.transform); });
    svg.call(zoom);

    d3.json(WORLD_TOPO).then(function(world) {
      gSel.append('g').selectAll('path')
        .data(topojson.feature(world, world.objects.countries).features)
        .join('path').attr('d', path).attr('fill','#1a2233').attr('stroke','#0d1117').attr('stroke-width',0.5);
      gSel.append('path')
        .datum(topojson.mesh(world, world.objects.countries, function(a,b){return a!==b;}))
        .attr('d', path).attr('fill','none').attr('stroke','rgba(255,255,255,0.05)').attr('stroke-width',0.4);
      renderMarkers();
    });

    var regions = ['All','Africa','Americas','Asia','Europe','Middle East'];
    var filterBar = document.getElementById('map-filter-bar');
    if (filterBar) {
      regions.forEach(function(r) {
        var btn = document.createElement('button');
        btn.className = 'map-filter-btn' + (r==='All' ? ' active' : '');
        btn.textContent = r;
        btn.addEventListener('click', function() {
          activeRegion = r;
          document.querySelectorAll('.map-filter-btn').forEach(function(b){b.classList.remove('active');});
          btn.classList.add('active');
          renderMarkers();
          if (sidePanelEl) sidePanelEl.style.display = 'none';
          renderTracker();
        });
        filterBar.appendChild(btn);
      });
    }

    svg.on('click', function(){ if(sidePanelEl) sidePanelEl.style.display='none'; });
  }

  function renderMarkers() {
    if (!gSel) return;
    gSel.selectAll('.conflict-marker').remove();
    var visible = CONFLICTS.filter(function(c) {
      var regOk = activeRegion==='All' || c.region===activeRegion;
      var secOk = activeSector==='All' || (c.sectors && c.sectors.indexOf(activeSector)!==-1);
      return regOk && secOk;
    });
    visible.forEach(function(c) {
      var coords = projFn([c.lng, c.lat]);
      if (!coords || !coords[0]) return;
      var x = coords[0], y = coords[1];
      var col = levelColor(c.level);
      var mg = gSel.append('g').attr('class','conflict-marker').attr('transform','translate('+x+','+y+')').style('cursor','pointer');
      var pulse = mg.append('circle').attr('r',6).attr('fill','none').attr('stroke',col).attr('stroke-width',1.5).attr('opacity',0.6);
      function anim(){ pulse.attr('r',6).attr('opacity',0.6).transition().duration(1800).ease(d3.easeCubicOut).attr('r',16).attr('opacity',0).on('end',anim); }
      anim();
      mg.append('circle').attr('r',9).attr('fill',col).attr('opacity',0.12);
      mg.append('circle').attr('r',5.5).attr('fill',col).attr('opacity',0.9);
      mg.on('mouseenter', function(ev) {
        if (!tooltipEl||!mapWrapEl) return;
        tooltipEl.style.display='block';
        tooltipEl.innerHTML='<div style="font-size:12px;font-weight:700;color:#e8e8e8;margin-bottom:3px">'+c.name+'</div><div style="font-size:11px;color:#6b7280;margin-bottom:6px">'+(c.geo||c.region)+'</div><span style="font-size:9px;padding:2px 8px;border-radius:20px;background:'+col+'22;color:'+col+';border:1px solid '+col+'44;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">'+levelLabel(c.level)+'</span><div style="margin-top:7px;font-size:11px;color:#4a5568;font-weight:500">Click to open brief</div>';
        var rect=mapWrapEl.getBoundingClientRect();
        tooltipEl.style.left=(ev.clientX-rect.left+14)+'px';
        tooltipEl.style.top=(ev.clientY-rect.top-10)+'px';
      }).on('mouseleave', function(){if(tooltipEl) tooltipEl.style.display='none';})
        .on('click', function(ev){ ev.stopPropagation(); if(tooltipEl) tooltipEl.style.display='none'; openPanel(c); });
    });
  }

  function openPanel(c) {
    if (!sidePanelEl||!panelContentEl) return;
    var col = levelColor(c.level);
    sidePanelEl.style.display='block';
    var secs = (c.sectors||[]).map(function(s){return '<span style="font-size:9px;padding:2px 8px;border-radius:2px;background:rgba(255,255,255,0.06);color:#9aa5b4;font-weight:700">'+s+'</span>';}).join('');
    var issueUrl = (typeof ISSUES!=='undefined'&&ISSUES[0])?ISSUES[0].url:'#';
    panelContentEl.innerHTML='<div style="display:flex;justify-content:flex-end;margin-bottom:10px"><button onclick="document.getElementById(\'side-panel\').style.display=\'none\'" style="background:transparent;border:none;color:#4a5568;cursor:pointer;font-size:20px;line-height:1">×</button></div>'
      +'<span style="font-size:9px;padding:3px 9px;border-radius:20px;background:'+col+'22;color:'+col+';border:1px solid '+col+'44;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">'+levelLabel(c.level)+'</span>'
      +'<h3 style="font-size:14px;font-weight:700;color:#e8e8e8;margin:10px 0 4px;line-height:1.4">'+c.name+'</h3>'
      +'<div style="font-size:10px;color:#4a5568;margin-bottom:12px;font-weight:600">'+(c.geo||c.region)+' · Day '+c.days+'</div>'
      +(c.impact?'<div style="background:rgba(255,88,93,0.1);border-left:3px solid #FF585D;padding:10px 12px;margin-bottom:12px"><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#FF585D;margin-bottom:4px">Business impact</div><p style="font-size:12px;color:#ccc;line-height:1.65">'+c.impact+'</p></div>':'')
      +'<p style="font-size:12px;color:#9aa5b4;line-height:1.7;margin-bottom:10px">'+(c.situation||c.summary||'')+'</p>'
      +(c.watch?'<div style="background:rgba(255,255,255,0.04);border-radius:6px;padding:10px;border:1px solid rgba(255,255,255,0.07);margin-bottom:12px"><div style="font-size:9px;letter-spacing:1px;color:#4a5568;text-transform:uppercase;margin-bottom:5px;font-weight:700">Watch for</div><p style="font-size:12px;color:#9aa5b4;line-height:1.6">'+c.watch+'</p></div>':'')
      +(secs?'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px">'+secs+'</div>':'')
      +'<a href="'+issueUrl+'" style="display:block;text-align:center;font-size:12px;color:#FF585D;border:1px solid rgba(255,88,93,0.4);padding:8px;border-radius:6px;font-weight:700">Read full analysis →</a>';
  }

  function initSectorFilters() {
    var row = document.getElementById('sector-filter-row');
    if (!row) return;
    row.querySelectorAll('.sector-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        activeSector = this.dataset.sector;
        row.querySelectorAll('.sector-btn').forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        renderTracker();
        renderMarkers();
      });
    });
  }

  function renderTracker() {
    var list = document.getElementById('conflict-list');
    if (!list || typeof CONFLICTS==='undefined') return;
    var filtered = CONFLICTS.filter(function(c) {
      var regOk = activeRegion==='All'||c.region===activeRegion;
      var secOk = activeSector==='All'||(c.sectors&&c.sectors.indexOf(activeSector)!==-1);
      return regOk&&secOk;
    });
    if (!filtered.length) { list.innerHTML='<div class="tr-empty">No conflicts match the selected filters.</div>'; return; }
    list.innerHTML='';
    filtered.forEach(function(c) {
      var col=levelColor(c.level);
      var div=document.createElement('div');
      div.className='tr-item';
      var secs=(c.sectors||[]).map(function(s){return '<span class="sector-tag">'+s+'</span>';}).join('');
      div.innerHTML='<div class="tr-top"><div><div class="tr-name"><span class="tr-dot" style="background:'+col+'"></span>'+c.name+'</div><div class="tr-geo">'+(c.geo||c.region)+' · Day '+c.days+' · Updated '+(c.updated||'recently')+'</div></div><div class="tr-right"><span class="exp-pill '+badgeClass(c.level)+'">'+levelLabel(c.level)+'</span><div class="tr-sectors">'+secs+'</div></div></div>'
        +(c.impact?'<div class="biz-impact"><div class="biz-lbl">Business impact</div><div class="biz-text">'+c.impact+'</div></div>':'')
        +'<div class="sit-text">'+(c.situation||c.summary||'')+'</div>'
        +(c.watch?'<div class="watch-row"><strong>Watch:</strong> '+c.watch+'</div>':'')
        +(c.confidence?'<span class="conf-badge '+confClass(c.confidence)+'">'+confLabel(c.confidence)+'</span>':'');
      list.appendChild(div);
    });
  }

  function renderRiskIndex() {
    var container=document.getElementById('risk-index-rows');
    if(!container||typeof RISK_INDEX==='undefined') return;
    container.innerHTML='';
    RISK_INDEX.forEach(function(r) {
      var col=r.score>=70?'#FF585D':r.score>=50?'#f39c12':'#f1c40f';
      var tc=r.score>=70?'#991b1b':r.score>=50?'#92400e':'#713f12';
      var row=document.createElement('div');
      row.className='ri-row';
      row.innerHTML='<span class="ri-lbl">'+r.region+'</span><div class="ri-bar-w"><div class="ri-bar" style="width:'+r.score+'%;background:'+col+'"></div></div><span class="ri-val" style="color:'+tc+'">'+r.score+'</span>';
      container.appendChild(row);
    });
  }

  function renderArchive() {
    var grid=document.getElementById('archive-grid');
    if(!grid||typeof ISSUES==='undefined') return;
    grid.innerHTML='';
    ISSUES.forEach(function(issue) {
      var card=document.createElement('div');
      card.className='arc-card';
      card.onclick=function(){window.location.href=issue.url;};
      card.innerHTML='<div class="arc-num">Issue '+issue.number+'</div><div class="arc-title">'+issue.title+'</div><div class="arc-date">'+issue.date+'</div><div class="arc-tags">'+issue.tags.map(function(t){return '<span class="arc-tag">'+t+'</span>';}).join('')+'</div>';
      grid.appendChild(card);
    });
    var slots=3;
    for(var i=ISSUES.length;i<slots;i++){
      var card=document.createElement('div');
      card.className='arc-card arc-ph';
      card.innerHTML='<div class="arc-num">Issue '+String(i+1).padStart(2,'0')+'</div><div class="arc-title">Coming soon</div>';
      grid.appendChild(card);
    }
  }

  function renderStats() {
    var e=function(id){return document.getElementById(id);};
    if(e('stat-active')) e('stat-active').textContent=CONFLICTS.length;
    if(e('stat-high'))   e('stat-high').textContent=CONFLICTS.filter(function(c){return c.level==='active'||c.level==='escalating';}).length;
    if(e('stat-issues')) e('stat-issues').textContent=String(ISSUES.length).padStart(2,'0');
  }

  window.handleBriefing = function() {
    var email=document.getElementById('b-email')&&document.getElementById('b-email').value;
    var sector=document.getElementById('b-sector')&&document.getElementById('b-sector').value;
    if(!email||!email.includes('@')||!sector){alert('Please enter your work email and select a sector.');return;}
    var ok=document.getElementById('briefing-ok');
    if(ok){ok.style.display='block';setTimeout(function(){ok.style.display='none';},5000);}
    if(document.getElementById('b-email')) document.getElementById('b-email').value='';
    if(document.getElementById('b-sector')) document.getElementById('b-sector').selectedIndex=0;
    if(document.getElementById('b-region')) document.getElementById('b-region').value='';
  };

  window.shareLinkedIn = function() {
    var url=encodeURIComponent(window.location.href);
    var title=encodeURIComponent('The Geopolitical Brief by Signal AI');
    var summary=encodeURIComponent('Weekly geopolitical risk intelligence with business impact analysis — for executives, risk officers and investors.');
    window.open('https://www.linkedin.com/sharing/share-offsite/?url='+url+'&title='+title+'&summary='+summary,'_blank','width=600,height=500');
  };

  document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initSectorFilters();
    renderTracker();
    renderRiskIndex();
    renderArchive();
    renderStats();
  });
})();
