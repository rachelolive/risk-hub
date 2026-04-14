// data/conflicts.js
// Update this file each week before pushing to GitHub.
// Each entry = one conflict marker on the map and one row in the tracker.

const CONFLICTS = [
  {
    id: 'ukraine',
    name: 'Ukraine',
    region: 'Europe',
    lat: 49,
    lng: 32,
    level: 'active',        // 'active' | 'escalating' | 'watchlist'
    title: 'Russia–Ukraine war',
    summary: 'Active frontline conflict now in its fourth year. Ceasefire negotiations stalled. Energy infrastructure remains under sustained attack across multiple oblasts.',
    watch: 'NATO summit May 2026; US supplemental aid vote pending in Congress.',
    days: 786,
    updated: '6h ago'
  },
  {
    id: 'sudan',
    name: 'Sudan',
    region: 'Africa',
    lat: 15,
    lng: 30,
    level: 'active',
    title: 'Sudan civil war',
    summary: 'RSF forces within 80km of Port Sudan, threatening the last functioning government hub. Humanitarian corridors from Chad contested. Aid suspended in three states.',
    watch: 'UN Security Council emergency session expected. Egypt posture a key signal.',
    days: 382,
    updated: '3h ago'
  },
  {
    id: 'lebanon',
    name: 'Lebanon',
    region: 'Middle East',
    lat: 33.9,
    lng: 35.5,
    level: 'active',
    title: 'Lebanon–Israel border',
    summary: 'Ceasefire framework under sustained pressure. Cross-border incidents up for third consecutive week. UNIFIL patrols suspended in two sectors. Beirut markets down 3.2%.',
    watch: 'US envoy visit Apr 17. Outcome shapes near-term escalation risk.',
    days: 41,
    updated: '12h ago'
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    region: 'Asia',
    lat: 19,
    lng: 96,
    level: 'active',
    title: 'Myanmar civil conflict',
    summary: 'PDF and ethnic armed groups have consolidated control over three state capitals. Junta supply lines increasingly strained. Humanitarian crisis deepening in border areas.',
    watch: 'ASEAN special envoy meeting. China mediation signals worth monitoring.',
    days: 1140,
    updated: '1d ago'
  },
  {
    id: 'drc',
    name: 'DRC',
    region: 'Africa',
    lat: -4,
    lng: 28,
    level: 'escalating',
    title: 'DRC – M23 advance',
    summary: 'M23 rebels seized Goma and advanced into North Kivu. Regional spillover risk elevated as Rwanda denies involvement. Humanitarian access severely restricted.',
    watch: 'AU peacekeeping mandate renewal. Humanitarian corridor negotiations in North Kivu.',
    days: 210,
    updated: '1d ago'
  },
  {
    id: 'india-pak',
    name: 'India–Pakistan',
    region: 'Asia',
    lat: 33,
    lng: 74,
    level: 'escalating',
    title: 'India–Pakistan LoC',
    summary: 'Firing incidents on the Line of Control doubled in past 30 days. Deputy ambassadors recalled by both sides. Pakistan army chief cancelled multilateral summit appearance.',
    watch: 'Indian state elections. Domestic hawkish rhetoric likely to intensify.',
    days: 31,
    updated: '1d ago'
  },
  {
    id: 'sahel',
    name: 'Mali',
    region: 'Africa',
    lat: 17,
    lng: -2,
    level: 'escalating',
    title: 'Sahel instability',
    summary: 'Wagner/Africa Corps operations expanding across Burkina Faso and Mali. French Barkhane vacuum driving further state fragility. Two major pipeline projects effectively frozen.',
    watch: 'Niger pipeline project status. EU emergency stabilisation fund disbursement.',
    days: 480,
    updated: '2d ago'
  },
  {
    id: 'haiti',
    name: 'Haiti',
    region: 'Americas',
    lat: 18.9,
    lng: -72.3,
    level: 'escalating',
    title: 'Haiti gang crisis',
    summary: 'G9 and Viv Ansanm coalition controls ~85% of Port-au-Prince. Kenyan MSS mission severely under-resourced. Government authority effectively limited to isolated enclaves.',
    watch: 'UN Security Council mission review. US deportation and engagement policy shift.',
    days: 90,
    updated: '2d ago'
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    region: 'Americas',
    lat: -1.8,
    lng: -78,
    level: 'watchlist',
    title: 'Ecuador cartel violence',
    summary: 'State of emergency extended for sixth consecutive month. Senior prosecutor assassinated in Guayaquil. Banana and shrimp export disruption beginning to affect investor sentiment.',
    watch: 'Congressional vote on emergency extension. Governing coalition stability.',
    days: 210,
    updated: '2d ago'
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    region: 'Asia',
    lat: 23.7,
    lng: 121,
    level: 'watchlist',
    title: 'Taiwan Strait tensions',
    summary: 'PLA naval exercises frequency elevated following US arms sale. Economic coercion measures intensified via targeted trade restrictions. Semiconductor supply chain exposure growing.',
    watch: 'US–Taiwan defence dialogue. PLA exercise schedule Q2 2026.',
    days: 60,
    updated: '3d ago'
  },
  {
    id: 'nagorno',
    name: 'Armenia',
    region: 'Europe',
    lat: 40.2,
    lng: 44.5,
    level: 'watchlist',
    title: 'Armenia–Azerbaijan',
    summary: 'Post-war border demarcation stalled. Armenian enclaves inside Azerbaijan face integration pressure. Diaspora political tensions in France and US elevated.',
    watch: 'EU monitoring mission mandate renewal. Peace treaty final status talks.',
    days: 120,
    updated: '3d ago'
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    region: 'Africa',
    lat: 9,
    lng: 40,
    level: 'watchlist',
    title: 'Ethiopia – Amhara conflict',
    summary: 'Amhara Fano militia conflict with federal forces ongoing despite Tigray peace deal. Humanitarian access severely limited in Amhara region. Drought conditions compounding crisis.',
    watch: 'AU mediation talks. Humanitarian corridor negotiations with federal government.',
    days: 310,
    updated: '3d ago'
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
  // Add new issues here each week:
  // { number: '02', title: '...', date: 'April 21, 2026', tags: [...], url: 'issue-02.html' }
];
