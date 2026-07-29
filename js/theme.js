/* ==========================================================================
   THEME MANAGER LOGIC
   ========================================================================== */

(function () {
  const THEME_KEY = 'irfan_portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`);
    }

    // Trigger custom event so Canvas & charts re-render if needed
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }
  });
})();
