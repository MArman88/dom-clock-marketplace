const hourSpan = document.getElementById("hour");
const minuteSpan = document.getElementById("minute");
const secondSpan = document.getElementById("second");
const meridiumSpan = document.getElementById("meridium");
const blinkSpans = document.getElementsByName("blink");


const hourHand = document.querySelector('[data-hand-hour]');
const minuteHand = document.querySelector('[data-hand-minute]');
const secondHand = document.querySelector('[data-hand-second]');

function updateTick() {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    let secondRotationRatio = second / 60;
    let minuteRotationRatio = (secondRotationRatio + minute) / 60;
    let hourRotationRatio = (minuteRotationRatio + hour) / 12;

    setRotation(secondHand, secondRotationRatio);
    setRotation(minuteHand, minuteRotationRatio);
    setRotation(hourHand, hourRotationRatio);

}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}


var shouldBlink = false;
function timeBlink() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let isPm = false;
    if (hour > 12) {
        hour = hour - 12;
        isPm = true
    } else if (hour == 0) {
        hour = 12;
    }

    hourSpan.innerText = (hour + "").padStart(2, "0");
    minuteSpan.innerText = (minute + "").padStart(2, "0");
    secondSpan.innerText = (second + "").padStart(2, "0");
    meridiumSpan.innerText = (isPm == true) ? "PM" : "AM";

}

function blink() {
    blinkSpans.forEach(elem => {
        elem.style.visibility = (shouldBlink == true) ? 'hidden' : 'visible';
    });
    shouldBlink = !shouldBlink;
}

let isRunning = false;
let idBlink = -1;
let idTimeBlink = -1;
let idTimeTick = -1;
function start() {
    if (isRunning) { return; }
    isRunning = true;
    blink();
    timeBlink();
    updateTick();
    idBlink = setInterval(blink, 500);
    idTimeBlink = setInterval(timeBlink, 1000);
    idTimeTick = setInterval(updateTick, 1000);
}

function stop() {
    if (!isRunning) { return; }
    isRunning = false;
    window.clearInterval(idBlink);
    window.clearInterval(idTimeBlink);
    window.clearInterval(idTimeTick);
    blinkSpans.forEach(elem => {
        elem.style.visibility = 'visible';
    });
    shouldBlink = false;
}

