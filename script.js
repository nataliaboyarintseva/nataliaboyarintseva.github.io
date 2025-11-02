const form = document.getElementById('emailForm');
const message = document.getElementById('message');

function updateTheme() {
  const hours = new Date().getHours();
  document.body.classList.toggle('night', hours >= 11 || hours < 7);
}
updateTheme();

// Smooth theme fade-in
document.body.style.opacity = 0;
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 1s ease';
  document.body.style.opacity = 1;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const email = document.getElementById('email').value.trim();
  const extra = document.getElementById('extra').value;

  if (extra) {
    message.textContent = 'Suspicious activity detected.';
    return;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  try {
    await fetch('https://script.google.com/macros/s/AKfycbzO2-kYHsK44mHPXC0cPcAhmLpRTNm0Brw2yNwwTiokkxbBOilKgBwanMdwDskSU_1SIg/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    message.textContent = 'Thank you! Your email has been saved.';
    form.reset();
  } catch (err) {
    message.textContent = 'Error while sending. Please try again later.';
  }
});
