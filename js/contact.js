/* ==========================================================================
   CONTACT FORM & INTERACTIVE ACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('portfolioContactForm');
  const formFeedback = document.getElementById('formFeedback');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'irfannazar35@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '✓ Copied!';
        copyEmailBtn.style.color = 'var(--accent-emerald)';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.style.color = 'var(--accent-amber)';
          formFeedback.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      // Simulate successful submit
      if (formFeedback) {
        formFeedback.style.color = 'var(--accent-emerald)';
        formFeedback.innerHTML = `✓ Thank you, ${name}! Your inquiry has been sent. Executive office will respond shortly.`;
      }
      contactForm.reset();
    });
  }
});
