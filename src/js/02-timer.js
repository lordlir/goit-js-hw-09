import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  d: document.querySelector('[data-days]'),
  h: document.querySelector('[data-hours]'),
  m: document.querySelector('[data-minutes]'),
  s: document.querySelector('[data-seconds]'),
};

let timer = null;

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', counterStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.disabled = false;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function counterStart() {
  refs.startBtn.disabled = true;
  timer = setInterval(() => {
    const dateNow = new Date().getTime();
    let dateSelected = document.querySelector('input#datetime-picker');
    let dateSelectedMs = new Date(dateSelected.value).getTime();
    const timeLeft = dateSelectedMs - dateNow;
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    refs.d.innerHTML = days < 10 ? addLeadingZero(days) : days;
    refs.h.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
    refs.m.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
    refs.s.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

    if (timeLeft < 1000) {
      clearInterval(timer);
      refs.startBtn.disabled = false;
    }
  }, 1000);
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
