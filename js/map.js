// js/map.js
// Interactive world conflict map using D3 + TopoJSON

(function () {
  const WORLD_TOPO = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  function levelColor(level) {
    return level === 'active' ? '#e74c3c' : level === 'escalating' ? '#f39c12' : '#f1c40f';
  }
  function levelLabel(level) {
    return level === 'active' ? 'Active conflict' : level === 'escalating' ? 'Escalating' : 'Watch list';
  }
  function levelBadgeClass(level) {
    return level === 'active' ? 'badge-active' : level === 'escalating' ? 'badge-escalating' : 'badge-watchlist';
  }

  let activeRegion = 'All';

  function initMap() {
    const svg = d3.select('#world-svg').attr('viewBox', '0 0 960 500');
    const proj = d3.geoNaturalEarth1().scale(153).translate([480, 260]);
    const path = d3.geoPath(proj);
    const g = svg.append('g');
    const tooltip = document.getElementById('map-tooltip');
    const mapWrap = document.getElementById('map-wrap');
    const sidePanel = document.getElementById('side-panel');
    const panelContent = document.getElementById('panel-content');

    // Zoom + pan
    const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', (event) => {
      g.attr('transform', event.transform);
    });
    svg.call(zoom);

    // Load topology
    d3.json(WORLD_TOPO).then((world) => {
      g.append('g')
        .selectAll('path')
        .data(topojson.feature(world, world.objects.countries).features)
        .join('path')
        .attr('d', path)
        .attr('fill', '#1a2233')
        .attr('stroke', '#0d1117')
        .attr('stroke-width', 0.5);

      g.append('path')
        .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.05)')
        .attr('stroke-width', 0.4);

      renderMarkers(g, proj, tooltip, mapWrap, sidePanel, panelContent);
    });

    // Filter buttons
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Middle East'];
    const filterBar = document.getElementById('map-filter-bar');
    regions.forEach((r) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (r === 'All' ? ' active' : '');
      btn.textContent = r;
      btn.addEventListener('click', () => {
        activeRegion = r;
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderMarkers(g, proj, tooltip, mapWrap, sidePanel, panelContent);
        closeSidePanel(sidePanel);
      });
      filterBar.appendChild(btn);
    });

    // Click outside panel to close
    svg.on('click', (event) => {
      if (!event.target.closest('.conflict-marker-g')) closeSidePanel(sidePanel);
    });
  }

  function renderMarkers(g, proj, tooltip, mapWrap, sidePanel, panelContent) {
    g.selectAll('.conflict-marker-g').remove();

    const visible = CONFLICTS.filter(
      (c) => activeRegion === 'All' || c.region === activeRegion
    );

    visible.forEach((c) => {
      const [x, y] = proj([c.lng, c.lat]);
      if (!x || !y) return;
      const col = levelColor(c.level);

      const mg = g
        .append('g')
        .attr('class', 'conflict-marker-g')
        .attr('transform', `translate(${x},${y})`)
        .style('cursor', 'pointer');

      // Pulse ring
      const pulse = mg.append('circle').attr('r', 6).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.5).attr('opacity', 0.6);
      function animatePulse() {
        pulse.attr('r', 6).attr('opacity', 0.6)
          .transition().duration(1800).ease(d3.easeCubicOut)
          .attr('r', 16).attr('opacity', 0)
          .on('end', animatePulse);
      }
      animatePulse();

      // Outer glow
      mg.append('circle').attr('r', 9).attr('fill', col).attr('opacity', 0.15);
      // Core dot
      mg.append('circle').attr('r', 5.5).attr('fill', col).attr('opacity', 0.92);

      // Hover tooltip
      mg.on('mouseenter', (event) => {
        tooltip.style.display = 'block';
        tooltip.innerHTML = `
          <div style="font-size:12px;font-weight:500;color:#e8e8e8;margin-bottom:3px">${c.title}</div>
          <div style="font-size:11px;color:#6b7280;margin-bottom:7px">${c.region}</div>
          <span style="font-size:10px;padding:2px 8px;border-radius:20px;background:${col}22;color:${col};border:1px solid ${col}44">${levelLabel(c.level)}</span>
          <div style="margin-top:7px;font-size:11px;color:#4a5568">Click to open brief</div>
        `;
        const rect = mapWrap.getBoundingClientRect();
        tooltip.style.left = (event.clientX - rect.left + 14) + 'px';
        tooltip.style.top = (event.clientY - rect.top - 10) + 'px';
      });

      mg.on('mouseleave', () => { tooltip.style.display = 'none'; });

      mg.on('click', (event) => {
        event.stopPropagation();
        tooltip.style.display = 'none';
        openSidePanel(c, sidePanel, panelContent);
      });
    });
  }

  function openSidePanel(c, panel, content) {
    const col = levelColor(c.level);
    panel.style.display = 'block';
    panel.classList.add('open');
    content.innerHTML = `
      <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
        <button onclick="document.getElementById('side-panel').style.display='none'"
          style="background:transparent;border:none;color:#4a5568;cursor:pointer;font-size:20px;line-height:1">×</button>
      </div>
      <span style="font-size:10px;padding:3px 10px;border-radius:20px;
        background:${col}22;color:${col};border:1px solid ${col}44;
        letter-spacing:0.5px;font-family:monospace">${levelLabel(c.level).toUpperCase()}</span>
      <h3 style="font-size:15px;font-weight:500;color:#e8e8e8;margin:10px 0 4px;line-height:1.4;font-family:'Playfair Display',serif">${c.title}</h3>
      <div style="font-size:11px;color:#4a5568;margin-bottom:14px">${c.region} · Day ${c.days}</div>
      <p style="font-size:13px;color:#9aa5b4;line-height:1.7;margin-bottom:14px">${c.summary}</p>
      <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:12px;border:1px solid rgba(255,255,255,0.07)">
        <div style="font-size:10px;letter-spacing:1px;color:#4a5568;text-transform:uppercase;margin-bottom:6px;font-family:monospace">Watch for</div>
        <p style="font-size:12px;color:#9aa5b4;line-height:1.6">${c.watch}</p>
      </div>
      <div style="margin-top:14px">
        <a href="${ISSUES[0] ? ISSUES[0].url : '#'}" style="display:block;text-align:center;font-size:12px;
          color:#c0392b;border:1px solid rgba(192,57,43,0.4);padding:9px;border-radius:8px">
          Read full analysis →
        </a>
      </div>
    `;
  }

  function closeSidePanel(panel) {
    panel.style.display = 'none';
  }

  // Conflict tracker rows
  function renderTracker() {
    const list = document.getElementById('conflict-list');
    if (!list) return;
    list.innerHTML = '';
    CONFLICTS.forEach((c) => {
      const col = levelColor(c.level);
      const row = document.createElement('div');
      row.className = 'conflict-row';
      row.innerHTML = `
        <div class="conf-dot" style="background:${col}"></div>
        <div style="flex:1;min-width:0">
          <div class="conf-title">${c.title}</div>
          <div class="conf-meta">${c.region} · Day ${c.days} · Updated ${c.updated}</div>
        </div>
        <span class="conf-badge ${levelBadgeClass(c.level)}">${levelLabel(c.level)}</span>
      `;
      list.appendChild(row);
    });
  }

  // Risk index bars
  function renderRiskIndex() {
    const container = document.getElementById('risk-index-rows');
    if (!container) return;
    container.innerHTML = '';
    RISK_INDEX.forEach((r) => {
      const col = r.score >= 70 ? '#e74c3c' : r.score >= 50 ? '#f39c12' : '#f1c40f';
      const textCol = r.score >= 70 ? '#7f1d1d' : r.score >= 50 ? '#78350f' : '#713f12';
      const row = document.createElement('div');
      row.className = 'risk-row';
      row.innerHTML = `
        <span class="ri-label">${r.region}</span>
        <div class="ri-bar-wrap"><div class="ri-bar" style="width:${r.score}%;background:${col}"></div></div>
        <span class="ri-val" style="color:${textCol}">${r.score}</span>
      `;
      container.appendChild(row);
    });
  }

  // Archive grid
  function renderArchive() {
    const grid = document.getElementById('archive-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const slots = 3;
    ISSUES.forEach((issue) => {
      const card = document.createElement('div');
      card.className = 'archive-card';
      card.onclick = () => { window.location.href = issue.url; };
      card.innerHTML = `
        <div class="arc-num">Issue ${issue.number}</div>
        <div class="arc-title">${issue.title}</div>
        <div class="arc-date">${issue.date}</div>
        <div class="arc-tags">${issue.tags.map((t) => `<span class="arc-tag">${t}</span>`).join('')}</div>
      `;
      grid.appendChild(card);
    });
    // Fill empty slots
    for (let i = ISSUES.length; i < slots; i++) {
      const card = document.createElement('div');
      card.className = 'archive-card arc-card-placeholder';
      const weekNum = i + 1;
      card.innerHTML = `<div class="arc-num">Issue ${String(weekNum).padStart(2,'0')}</div><div class="arc-title">Coming soon</div>`;
      grid.appendChild(card);
    }
  }

  // Stat counter
  function renderStats() {
    const activeCount = CONFLICTS.filter((c) => c.level === 'active').length;
    const escalatingCount = CONFLICTS.filter((c) => c.level === 'escalating').length;
    const highIntensity = activeCount + escalatingCount;
    document.getElementById('stat-active') && (document.getElementById('stat-active').textContent = CONFLICTS.length);
    document.getElementById('stat-high') && (document.getElementById('stat-high').textContent = highIntensity);
    document.getElementById('stat-issues') && (document.getElementById('stat-issues').textContent = String(ISSUES.length).padStart(2,'0'));
  }

  // Init everything once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderTracker();
    renderRiskIndex();
    renderArchive();
    renderStats();
  });
})();
