// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);

let date = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const inputDate = new Date(selectedDates[0]).getTime();
    if (inputDate < Date.now()) {
      refs.startBtn.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
    date = inputDate;
  },
};

flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', true);
  timer();
  intervalId = setInterval(timer, 1000);
}

function timer() {
  let timerStartTime = date - Date.now();
  if (timerStartTime <= 0) {
    clearInterval(intervalId);
    timerStartTime = 0;
  }
  const { days, hours, minutes, seconds } = convertMs(timerStartTime);
  updateTimer({ days, hours, minutes, seconds });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
