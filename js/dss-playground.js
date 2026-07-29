/* ==========================================================================
   INTERACTIVE DSS PLAYGROUND & FLOOD FREQUENCY ANALYSIS TOOLKIT
   ========================================================================== */

const DAM_DATASETS = [
  {
    id: 'lehri',
    name: 'Lehri Dam',
    district: 'Jhelum',
    capacity: '18,400 AF',
    elevation: '342.5 m',
    storagePercent: 88,
    inflow: '145 cusecs',
    outflow: '40 cusecs',
    status: 'Normal Operations',
    statusClass: 'status-normal'
  },
  {
    id: 'tainpura',
    name: 'Tainpura Dam',
    district: 'Rawalpindi',
    capacity: '12,200 AF',
    elevation: '410.2 m',
    storagePercent: 94,
    inflow: '210 cusecs',
    outflow: '120 cusecs',
    status: 'Spillway Active',
    statusClass: 'status-alert'
  },
  {
    id: 'ugahan',
    name: 'Ugahan Dam',
    district: 'Chakwal',
    capacity: '9,800 AF',
    elevation: '298.0 m',
    storagePercent: 72,
    inflow: '65 cusecs',
    outflow: '30 cusecs',
    status: 'Normal Operations',
    statusClass: 'status-normal'
  },
  {
    id: 'salial',
    name: 'Salial Dam',
    district: 'Attock',
    capacity: '15,600 AF',
    elevation: '385.8 m',
    storagePercent: 61,
    inflow: '45 cusecs',
    outflow: '25 cusecs',
    status: 'Low Storage',
    statusClass: 'status-warning'
  }
];

class DSSPlayground {
  constructor() {
    this.currentDam = DAM_DATASETS[0];
    this.init();
  }

  init() {
    this.renderDamSelector();
    this.updateDashboardMetrics();
    this.initFFACalculator();
  }

  renderDamSelector() {
    const grid = document.getElementById('damSelectorGrid');
    if (!grid) return;

    grid.innerHTML = DAM_DATASETS.map(dam => `
      <div class="dam-select-card ${dam.id === this.currentDam.id ? 'active' : ''}" data-id="${dam.id}">
        <h4>${dam.name}</h4>
        <span>District ${dam.district}</span>
      </div>
    `).join('');

    grid.querySelectorAll('.dam-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.currentDam = DAM_DATASETS.find(d => d.id === id);
        
        grid.querySelectorAll('.dam-select-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        this.updateDashboardMetrics();
      });
    });
  }

  updateDashboardMetrics() {
    const dam = this.currentDam;
    const nameEl = document.getElementById('dssDamName');
    const capEl = document.getElementById('dssCapacity');
    const elevEl = document.getElementById('dssElevation');
    const storEl = document.getElementById('dssStorage');
    const flowEl = document.getElementById('dssFlow');
    const statusEl = document.getElementById('dssStatus');

    if (nameEl) nameEl.textContent = `${dam.name} — ${dam.district} District`;
    if (capEl) capEl.textContent = dam.capacity;
    if (elevEl) elevEl.textContent = dam.elevation;
    if (storEl) storEl.textContent = `${dam.storagePercent}%`;
    if (flowEl) flowEl.textContent = `${dam.inflow} / ${dam.outflow}`;
    if (statusEl) {
      statusEl.textContent = dam.status;
      statusEl.className = `chip ${dam.statusClass}`;
    }
  }

  initFFACalculator() {
    const calcBtn = document.getElementById('calcFFABtn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const meanFlow = parseFloat(document.getElementById('ffaMeanFlow').value) || 1200;
      const stdDev = parseFloat(document.getElementById('ffaStdDev').value) || 450;
      const returnPeriod = parseFloat(document.getElementById('ffaReturnPeriod').value) || 50;

      // Gumbel EV1 Estimation: Q_T = Mean + K_T * StdDev
      // K_T = - (sqrt(6)/pi) * (0.5772 + ln(ln(T / (T - 1))))
      const y_T = -Math.log(-Math.log(1 - 1 / returnPeriod));
      const k_T = (y_T - 0.5772) / 1.2825;
      const peakDischarge = Math.round(meanFlow + k_T * stdDev);

      const resultEl = document.getElementById('ffaResultOutput');
      if (resultEl) {
        resultEl.innerHTML = `
          <div style="margin-top: 16px; padding: 16px; background: var(--bg-tertiary); border: 1px solid var(--border-active); border-radius: 8px;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--text-muted);">GUMBEL EV1 ESTIMATED DESIGN FLOOD (${returnPeriod}-YR RETURN)</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: var(--accent-cyan); margin-top: 4px;">
              ${peakDischarge.toLocaleString()} <span style="font-size: 1rem;">cusecs</span>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--accent-amber); margin-top: 6px;">
              K_T Frequency Factor: ${k_T.toFixed(3)} | Reduced Variate Y_T: ${y_T.toFixed(3)}
            </div>
          </div>
        `;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DSSPlayground();
});
