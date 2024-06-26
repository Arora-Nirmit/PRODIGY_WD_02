// script.js
let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.innerText = '00:00:00';
    difference = 0;
    running = false;
    laps.innerHTML = '';
    lapCount = 0;
}

function lap() {
    if (running) {
        lapCount++;
        const li = document.createElement('li');
        li.innerText = `Lap ${lapCount}: ${display.innerText}`;
        laps.appendChild(li);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}
