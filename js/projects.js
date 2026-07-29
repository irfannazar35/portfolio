/* ==========================================================================
   PROJECT CATALOG & MODAL CASE STUDY MANAGER
   ========================================================================== */

const PROJECTS_DATA = [
  {
    id: 'dss-16',
    pid: 'DSS · 16',
    category: 'hydroinformatics',
    title: 'Small Dams Decision Support System',
    shortDesc: 'A single-file water-level monitoring dashboard built on Leaflet.js with a Google Apps Script backend, covering all 16 small dams in the Potohar Zone.',
    fullDesc: 'Developed a unified Decision Support System (DSS) tailored for daily monitoring of 16 small dams across the Potohar Zone. The system features a responsive Leaflet.js interactive GIS map interface, automated daily CSV/Excel ingestion via Google Drive API, and automated threshold alerts for reservoir capacity, inflow rates, and emergency spillway activation.',
    tags: ['Leaflet.js', 'Google Apps Script', 'Google Drive API', 'Hydroinformatics'],
    metrics: '16 Dams Monitored Live',
    image: 'assets/images/dam-schematic.png',
    client: 'Punjab Irrigation Department',
    impact: 'Reduced daily reporting lag from 12 hours to real-time sync across executive offices.'
  },
  {
    id: 'fld-ch',
    pid: 'FLD · CH',
    category: 'hydroinformatics',
    title: 'Chenab River Flood Monitoring & Early Warning',
    shortDesc: 'Real-time tracking of Marala Barrage discharge trends as part of flood early-warning work, translated into public-facing infographic bulletins during monsoon flows.',
    fullDesc: 'Engineered a real-time hydrographic monitoring bulletin system tracking river discharge trends at Marala Barrage on the Chenab River system. Built automated data plotting routines converting gauge readings into actionable flood warning infographics distributed to district authorities and emergency management agencies during monsoon peak flows.',
    tags: ['Flood Early Warning', 'Discharge Analysis', 'Public Bulletins', 'Hydrology'],
    metrics: 'Marala Barrage Hydrology',
    image: 'assets/images/gis-map.png',
    client: 'Small Dams Division / Flood Cell',
    impact: 'Provided accurate 6-hour advance warning window during major monsoon events.'
  },
  {
    id: 'gis-rf',
    pid: 'GIS · RF',
    category: 'gis',
    title: 'GFS Rainfall Accumulation Geospatial Pipeline',
    shortDesc: 'A Python / Google Colab geospatial pipeline pulling GFS forecast rainfall over Bunhan & Kahan catchments processed with rasterio and GeoPandas.',
    fullDesc: 'Built an automated Python geospatial execution pipeline leveraging Open-Meteo & GFS (Global Forecast System) gridded weather models. The system extracts 72-hour precipitation forecasts over the steep Bunhan and Kahan catchments in District Jhelum, clips spatial rasters using GeoPandas shapes, and outputs smooth continuous-ramp rainfall accumulation contours.',
    tags: ['Python', 'rasterio', 'GeoPandas', 'Open-Meteo API', 'GIS'],
    metrics: 'Bunhan & Kahan Catchments',
    image: 'assets/images/gis-map.png',
    client: 'District Jhelum Hydrological Study',
    impact: 'Enabled watershed-scale flash flood prediction for upstream reservoirs.'
  },
  {
    id: 'epap-qa',
    pid: 'EPAP · QA',
    category: 'damsafety',
    title: 'Lehri Dam — EPAP Review & QA Framework',
    shortDesc: 'Technical review of Emergency Preparedness & Action Plan submitted by NESPAK–DMC JV, examining dam-break modeling, breach parameters & PMF scenarios.',
    fullDesc: 'Conducted comprehensive engineering peer-review of the Emergency Preparedness and Action Plan (EPAP) for Lehri Dam prepared by the NESPAK–DMC Joint Venture. Evaluated HEC-RAS 2D dam-breach hydrodynamic simulations, Probable Maximum Flood (PMF) inundation maps, and hazard classifications, translating findings into a division-wide EPAP Quality Assurance Checklist.',
    tags: ['EPAP Review', 'Dam-Break Modeling', 'HEC-RAS 2D', 'QA Framework'],
    metrics: 'Lehri Dam Review Memo',
    image: 'assets/images/dam-schematic.png',
    client: 'Punjab Irrigation Department',
    impact: 'Established standardized EPAP review protocol across 16 division dams.'
  },
  {
    id: 'tor-13',
    pid: 'TOR · 13',
    category: 'procurement',
    title: 'Consultancy TOR — 13 Small Dam Schemes',
    shortDesc: 'Terms of Reference covering design review, detailed design, construction supervision and M&E across 13 small dam schemes under ADP Punjab funding.',
    fullDesc: 'Authored exhaustive Consultancy Terms of Reference (TOR) for a 36-month multi-million PKR engagement covering design review, detailed engineering, construction supervision, and M&E across 13 small dams and weir projects in Punjab. Prepared under PPRA Rules 2014 using Quality and Cost Based Selection (QCBS) procurement.',
    tags: ['PPRA QCBS Rules', 'ADP Punjab', '36-Month Scope', 'Procurement'],
    metrics: '13 Schemes Procurement',
    image: 'assets/images/dam-schematic.png',
    client: 'Planning & Development Dept, Punjab',
    impact: 'Successfully launched transparent international competitive bidding process.'
  },
  {
    id: 'ffa-stat',
    pid: 'FFA · STAT',
    category: 'hydroinformatics',
    title: 'Flood Frequency Analysis Toolkit',
    shortDesc: 'A Python application for statistical flood frequency analysis — Gumbel EV1, Log-Pearson III, Log-Normal with KS goodness-of-fit testing.',
    fullDesc: 'Developed a standalone Python toolkit for statistical flood frequency modeling incorporating Gumbel Extreme Value Type-1 (EV1), Log-Pearson Type III, Log-Normal, and Normal probability distributions. Features automated Weibull plotting position generation, Kolmogorov-Smirnov (KS) goodness-of-fit tests, and publication-ready return period curve plotting.',
    tags: ['Gumbel EV1', 'Log-Pearson III', 'KS Test', 'Python', 'Hydrology'],
    metrics: '4 Probability Distributions',
    image: 'assets/images/gis-map.png',
    client: 'Hydroinformatics Toolkit Project',
    impact: 'Standardized design-flood estimation across engineering feasibility studies.'
  }
];

class ProjectManager {
  constructor() {
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.renderProjects();
    this.setupFilters();
    this.setupModal();
  }

  setupFilters() {
    const filterContainer = document.getElementById('projectFilters');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.getAttribute('data-filter');
        this.renderProjects();
      }
    });
  }

  renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const filtered = this.currentFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === this.currentFilter);

    grid.innerHTML = filtered.map(p => `
      <div class="project-card" data-id="${p.id}">
        <div class="project-pid">${p.pid}</div>
        <h3>${p.title}</h3>
        <p>${p.shortDesc}</p>
        <div class="chip-list" style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:16px;">
          ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--accent-amber);">${p.metrics}</span>
          <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--accent-cyan); font-weight:600;">Details →</span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.openModal(id);
      });
    });
  }

  setupModal() {
    const overlay = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }
  }

  openModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const overlay = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBodyContent');

    if (overlay && modalBody) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 12px; font-family:'JetBrains Mono', monospace; color:var(--accent-amber); font-size:0.85rem;">
          ${project.pid} · CASE STUDY
        </div>
        <h2 style="font-size: clamp(1.5rem, 2.5vw, 2.2rem); margin-bottom: 16px; font-weight:700;">${project.title}</h2>
        
        <img src="${project.image}" alt="${project.title}" style="width:100%; height:220px; object-fit:cover; border-radius:10px; border:1px solid var(--border-line); margin-bottom:20px;">
        
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px; border-left: 3px solid var(--accent-cyan); margin-bottom: 20px; font-size: 0.95rem;">
          <strong>Executive Summary:</strong> ${project.shortDesc}
        </div>

        <h4 style="margin-bottom:8px; font-size:1.1rem;">Full Scope & Methodology</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:20px;">
          ${project.fullDesc}
        </p>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:24px; background:var(--bg-primary); padding:16px; border-radius:8px;">
          <div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--text-subtle);">CLIENT / DEPT</div>
            <div style="font-size:0.9rem; font-weight:600;">${project.client}</div>
          </div>
          <div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--text-subtle);">KEY OUTCOME / IMPACT</div>
            <div style="font-size:0.9rem; font-weight:600; color:var(--accent-emerald);">${project.impact}</div>
          </div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${project.tags.map(t => `<span class="chip" style="background:var(--bg-tertiary);">${t}</span>`).join('')}
        </div>
      `;

      overlay.classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProjectManager();
});
