let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;

window.onload = () => {
  loadLog();
  updateDisplay();
};

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timerDisplay').innerText =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startPomodoro() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      logPomodoro();
      timeLeft = 25 * 60;
      updateDisplay();
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
}

function logPomodoro() {
  const log = document.getElementById('pomodoroLog');
  const timestamp = new Date().toLocaleString();
  const entry = document.createElement('li');
  entry.innerText = `✅ Completed at ${timestamp}`;
  log.appendChild(entry);

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('pomodoroLog')) || [];
  existing.push(timestamp);
  localStorage.setItem('pomodoroLog', JSON.stringify(existing));
}

function loadLog() {
  const log = document.getElementById('pomodoroLog');
  const saved = JSON.parse(localStorage.getItem('pomodoroLog')) || [];
  saved.forEach(ts => {
    const entry = document.createElement('li');
    entry.innerText = `✅ Completed at ${ts}`;
    log.appendChild(entry);
  });
}

