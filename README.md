# The Geopolitical Brief — v3 (Business Edition)
**by Signal AI**

## What changed in v3
- Hero reframed: "Geopolitical risk, translated into business exposure"
- Book a demo CTA prominent in nav, hero and sidebar
- Sector filters on the conflict tracker (Energy, Supply chain, Financial markets, Commodities, Regulatory)
- Every conflict item now opens with Business Impact before the situation briefing
- Exposure ratings replace severity labels (High / Elevated / Monitor)
- Confidence ratings on every item (High / Medium / Emerging)
- Briefing request form replaces subscribe box (lead gen for Signal AI)
- Tailored exposure card in hero showing this week's top risks at a glance

## Files
- index.html — main risk hub
- issue-01.html — first issue template
- css/style.css — Signal AI brand styles
- js/map.js — interactive map + sector/region filtering + tracker rendering
- data/conflicts.js — update this weekly

## Deploying to GitHub Pages
1. Push all files to your GitHub repo (main branch)
2. Settings → Pages → Source: main branch / root
3. Live at https://yourusername.github.io/geopolitical-brief/

## Weekly update workflow
1. Edit data/conflicts.js — update conflict entries, impact, watch items
2. Duplicate issue-01.html for each new issue
3. Add new issue to ISSUES array in conflicts.js
4. Push to GitHub — Pages redeploys automatically
