# The Geopolitical Brief — Risk Hub
**by Signal AI**

A weekly geopolitical risk intelligence hub with an interactive conflict map, live tracker, and newsletter archive.

## Structure

```
geopolitical-brief/
├── index.html          # Main risk hub page
├── issue.html          # Individual issue template
├── css/
│   └── style.css       # Global styles
├── js/
│   ├── map.js          # Interactive world map (D3 + TopoJSON)
│   └── main.js         # Conflict data + UI logic
├── data/
│   └── conflicts.js    # Conflict data (update weekly)
└── README.md
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `geopolitical-brief`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch` → `main` → `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/geopolitical-brief/`

## Updating weekly

1. Edit `data/conflicts.js` — update conflict entries, risk levels, summaries
2. Duplicate `issue.html` → rename to e.g. `issue-02.html` and fill in content
3. Update the archive grid in `index.html` with the new issue card
4. Push to GitHub — Pages redeploys automatically

## Custom domain (optional)

1. Add a `CNAME` file to the repo root containing your domain, e.g. `brief.signal.ai`
2. Configure your DNS with a CNAME record pointing to `yourusername.github.io`

## Dependencies (all CDN, no install needed)

- [D3.js v7](https://d3js.org/) — map rendering
- [TopoJSON](https://github.com/topojson/topojson) — world topology
- [world-atlas](https://github.com/topojson/world-atlas) — country shapes
- [Google Fonts](https://fonts.google.com/) — typography
