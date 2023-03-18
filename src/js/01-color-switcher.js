const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.setAttribute('disabled', true);

let intervalId = null;

function onStartClick() {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
