// Miss Mishti website interactions and appointment form
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz05EYySBHhffLOV7Ehs19Hz8R-ymxAXdHS1yJusLsjlC_Xu_I0GItKswh4_BnI0UU/exec';

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Prevent booking dates in the past.
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  dateInput.min = localToday;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const payload = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    payload.append(key, String(value).trim());
  }
  // Also send common aliases in case the existing Apps Script expects them.
  payload.append('fullName', payload.get('name') || '');
  payload.append('mobile', payload.get('phone') || '');
  payload.append('appointmentDate', payload.get('date') || '');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending request...';

  try {
    // Apps Script web apps commonly redirect after POST. no-cors avoids browser
    // CORS blocking; the opaque response cannot confirm sheet-side processing.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: payload
    });

    statusEl.textContent = 'Your request has been sent. We will contact you shortly to confirm the appointment.';
    statusEl.classList.add('success');
    form.reset();
  } catch (error) {
    console.error('Appointment submission failed:', error);
    statusEl.textContent = 'We could not send your request. Please call +91 98765 43210 to book directly.';
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Appointment Request →';
  }
});
