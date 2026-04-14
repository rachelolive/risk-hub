// data/conflicts.js — Update this file each week before pushing to GitHub.

const CONFLICTS = [
  {
    id: 'sudan',
    name: 'Sudan — Port Sudan advance',
    region: 'Africa',
    lat: 15, lng: 30,
    level: 'active',
    geo: 'East Africa',
    sectors: ['Supply chain', 'Commodities', 'Energy'],
    impact: 'Port Sudan handles ~90% of Sudan\'s export volume. RSF takeover would freeze commodity flows across East Africa and expose companies with Egyptian or Horn of Africa operations to immediate logistics disruption.',
    situation: 'RSF forces within 80km of Port Sudan. Aid corridors from Chad contested; access suspended in three states. SAF ability to hold the port depends on Egyptian military support — unconfirmed.',
    watch: 'UN Security Council session expected this week. Egypt\'s official posture toward the SAF is the key forward indicator.',
    days: 382, updated: '6h ago', confidence: 'high'
  },
  {
    id: 'lebanon',
    name: 'Lebanon–Israel border',
    region: 'Middle East',
    lat: 33.9, lng: 35.5,
    level: 'active',
    geo: 'Middle East / Levant',
    sectors: ['Financial markets', 'Insurance', 'Real estate'],
    impact: 'Beirut equity markets fell 3.2% on Thursday. Political risk insurance premiums for Lebanese operations are moving. Organisations with regional treasury or real estate exposure should model a 30-day escalation scenario.',
    situation: 'Cross-border incidents up for third consecutive week. UNIFIL patrols suspended in two sectors. Pattern typically precedes a formal ceasefire breakdown.',
    watch: 'US envoy visit April 17. If talks collapse without a commitment, expect material re-rating of Levant risk by month-end.',
    days: 41, updated: '3h ago', confidence: 'high'
  },
  {
    id: 'india-pak',
    name: 'India–Pakistan LoC',
    region: 'Asia',
    lat: 33, lng: 74,
    level: 'escalating',
    geo: 'South Asia',
    sectors: ['Supply chain', 'Regulatory'],
    impact: 'India–Pakistan cross-border trade remains frozen since 2019. Further deterioration could affect multinationals with operations spanning both markets and complicate India-routed supply chains serving European and US buyers.',
    situation: 'Firing incidents doubled in 30 days per SIPRI monitors. Deputy ambassadors recalled. Pakistan army chief cancelled multilateral summit — domestic pressure overriding engagement.',
    watch: 'Indian state elections create incentive for hawkish signalling. Rhetoric likely to intensify before stabilising.',
    days: 31, updated: '1d ago', confidence: 'medium'
  },
  {
    id: 'drc',
    name: 'DRC — M23 advance',
    region: 'Africa',
    lat: -4, lng: 28,
    level: 'escalating',
    geo: 'Central Africa',
    sectors: ['Commodities', 'Energy'],
    impact: 'DRC accounts for ~70% of global cobalt supply. M23 control of North Kivu creates direct supply risk for EV battery manufacturers and electronics supply chains globally.',
    situation: 'M23 seized Goma and advanced into North Kivu. Regional spillover risk elevated as Rwanda denies involvement. Humanitarian access severely restricted.',
    watch: 'AU peacekeeping mandate renewal. Humanitarian corridor negotiations are the near-term pressure valve.',
    days: 210, updated: '1d ago', confidence: 'high'
  },
  {
    id: 'sahel',
    name: 'Sahel — AES bloc instability',
    region: 'Africa',
    lat: 17, lng: -2,
    level: 'escalating',
    geo: 'West Africa',
    sectors: ['Energy', 'Commodities'],
    impact: 'Two major European natural gas pipeline projects transiting the Sahel are effectively frozen. IMF estimates 14% FDI decline in region in 2025. European energy boards should treat this as a capital allocation question.',
    situation: 'Wagner/Africa Corps expanding across Mali and Burkina Faso. French Barkhane vacuum driving state fragility. Niger pipeline project indefinitely suspended.',
    watch: 'AES bloc governance trajectory. EU emergency stabilisation fund disbursement.',
    days: 480, updated: '2d ago', confidence: 'medium'
  },
  {
    id: 'myanmar',
    name: 'Myanmar civil conflict',
    region: 'Asia',
    lat: 19, lng: 96,
    level: 'active',
    geo: 'Southeast Asia',
    sectors: ['Supply chain', 'Regulatory'],
    impact: 'Myanmar is a key node in regional garment and manufacturing supply chains. Junta instability is driving investor exit and increasing compliance risk for companies with Myanmar-linked sourcing.',
    situation: 'PDF and ethnic armed groups consolidated control over three state capitals. Junta supply lines increasingly strained. Humanitarian crisis deepening in border areas.',
    watch: 'ASEAN special envoy meeting. China mediation signals worth monitoring.',
    days: 1140, updated: '2d ago', confidence: 'high'
  },
  {
    id: 'haiti',
    name: 'Haiti — gang crisis',
    region: 'Americas',
    lat: 18.9, lng: -72.3,
    level: 'escalating',
    geo: 'Caribbean',
    sectors: ['Supply chain', 'Regulatory'],
    impact: 'Haiti\'s port disruption is affecting regional shipping lanes and nearshoring investment plans. US companies with Dominican Republic operations should monitor cross-border spillover.',
    situation: 'G9 coalition controls ~85% of Port-au-Prince. Kenyan MSS mission severely under-resourced. Government authority limited to isolated enclaves.',
    watch: 'UN Security Council mission review. US deportation and engagement policy.',
    days: 90, updated: '2d ago', confidence: 'medium'
  },
  {
    id: 'ecuador',
    name: 'Ecuador — cartel disruption',
    region: 'Americas',
    lat: -1.8, lng: -78,
    level: 'watchlist',
    geo: 'Latin America',
    sectors: ['Commodities', 'Supply chain'],
    impact: 'Ecuador is the world\'s largest banana exporter and a major shrimp supplier. Six consecutive months of state of emergency are beginning to affect export logistics. Buyers should review alternative sourcing.',
    situation: 'Senior prosecutor assassinated in Guayaquil. Cartel influence over port access is the primary operational risk. Noboa\'s governing coalition is fragile.',
    watch: 'Congressional vote on emergency extension. Coalition stability heading into Q2.',
    days: 210, updated: '2d ago', confidence: 'emerging'
  },
  {
    id: 'taiwan',
    name: 'Taiwan Strait tensions',
    region: 'Asia',
    lat: 23.7, lng: 121,
    level: 'watchlist',
    geo: 'Indo-Pacific',
    sectors: ['Supply chain', 'Financial markets', 'Energy'],
    impact: 'Taiwan produces ~90% of the world\'s most advanced semiconductors. Even a partial blockade scenario would trigger supply disruptions across automotive, consumer electronics and defence sectors globally.',
    situation: 'PLA naval exercises frequency elevated following US arms sale. Economic coercion via targeted trade restrictions intensifying.',
    watch: 'US–Taiwan defence dialogue. PLA exercise schedule Q2 2026.',
    days: 60, updated: '3d ago', confidence: 'medium'
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia — Amhara conflict',
    region: 'Africa',
    lat: 9, lng: 40,
    level: 'watchlist',
    geo: 'East Africa',
    sectors: ['Commodities', 'Supply chain'],
    impact: 'Ethiopia is Africa\'s second-largest economy and a key coffee and cut-flower exporter. Amhara conflict is disrupting regional logistics and creating compliance risk for agricultural supply chain operators.',
    situation: 'Amhara Fano militia conflict with federal forces ongoing despite Tigray peace deal. Humanitarian access limited in Amhara region.',
    watch: 'AU mediation talks. Humanitarian corridor negotiations with federal government.',
    days: 310, updated: '3d ago', confidence: 'medium'
  }
];

// Regional risk index — update scores weekly (0–100)
const RISK_INDEX = [
  { region: 'Middle East', score: 82 },
  { region: 'Africa',      score: 76 },
  { region: 'Europe',      score: 61 },
  { region: 'South Asia',  score: 57 },
  { region: 'SE Asia',     score: 44 },
  { region: 'Americas',    score: 38 }
];

// Issue archive — add a new entry each week
const ISSUES = [
  {
    number: '01',
    title: 'The fracturing of peace guarantees',
    date: 'April 14, 2026',
    tags: ['Sudan', 'Sahel', 'Lebanon'],
    url: 'issue-01.html'
  }
];
