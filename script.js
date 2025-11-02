const form = document.getElementById('emailForm');
const message = document.getElementById('message');

// Переключение день/ночь
function updateTheme() {
  const hours = new Date().getHours();
  document.body.classList.toggle('night', hours >= 19 || hours < 7);
}
updateTheme();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const email = document.getElementById('email').value.trim();
  const extra = document.getElementById('extra').value;

  if (extra) {
    message.textContent = 'Подозрительная активность.';
    return;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    message.textContent = 'Введите корректный e-mail.';
    return;
  }

  try {
    const res = await fetch('ВАША_ССЫЛКА_НА_СЦРИПТ', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    message.textContent = 'Спасибо! Ваш e-mail сохранён.';
    form.reset();
  } catch (err) {
    message.textContent = 'Ошибка при отправке. Попробуйте позже.';
  }
});
