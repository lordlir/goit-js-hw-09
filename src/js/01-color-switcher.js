const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
console.dir(stopBtn);
stopBtn.disabled = 'true';

// const timerId = setInterval(() => {
//   document.body.style.background = getRandomHexColor;
// }, 1000);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  console.log(startBtn.disabled);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  document.body.style.background = 'white';
  clearTimeout(timerId);
});

// startBtn.addEventListener('click', timerId);
