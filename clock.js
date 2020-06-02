//Creating the countdown, by creating a new date.
var startingTime = new Date();

//Variables for quickly setting base countdown time
var startingMinutes = 25;
var startingSeconds = 0;
var startingMilliseconds = 0;

//Setting countdown
startingTime.setMinutes(startingMinutes);
startingTime.setSeconds(startingSeconds);
startingTime.setMilliseconds(startingMilliseconds);

//Creating a countdown element in the document
setCountdownFormat(startingMinutes, startingSeconds);

//Variabel to hold the countdown
var initiateCountdown;

//This makes sure the user can't start the countdown more then once
var countDownInitiated = false;


function startCountdown() {

    //Starts the countdown
    if (countDownInitiated == false) {
        initiateCountdown = setInterval(countDown, 1000);
        countDownInitiated = true;

    }
}


function countDown() {

    //Counts 1000 miliseconds off the time
    startingTime.setTime(startingTime - 1000);

    //Sets the HTML countdown element to keep the format 00:00
    setCountdownFormat(startingTime.getMinutes(), startingTime.getSeconds());

    //When countdown hits 0:00
    if (startingTime.getMinutes() == 0 & startingTime.getSeconds() == 0 & startingTime.getMilliseconds() == 0) {
        clearInterval(initiateCountdown);

        if (startingMinutes == 25) {
            document.getElementById("times-up-audio").play();

            var acceptBreak = confirm("Take a break?");

            acceptBreak ? setCountdown(5, 0, 0) : setCountdown(startingMinutes, startingSeconds, startingMilliseconds);

        } else {
            document.getElementById("get-to-work").play();

            var acceptWork = confirm("Get back to work?");

            acceptWork ? setCountdown(25, 0, 0) : setCountdown(0, 5, 0);

        }

    }

}

function pauseCountdown() {
    clearInterval(initiateCountdown);
    countDownInitiated = false;
}


// HELPER FUNCTIONS


//This sets the countdown time
function setCountdown(minutes, seconds, milliseconds) {
    startingMinutes = minutes;
    startingSeconds = seconds;
    startingMilliseconds = milliseconds;

    clearInterval(initiateCountdown);

    startingTime.setMinutes(minutes);
    startingTime.setSeconds(seconds);
    startingTime.setMilliseconds(milliseconds);

    countDownInitiated = false;

    setCountdownFormat(startingTime.getMinutes(), startingTime.getSeconds());

}

//Function to set format of the HTML countdown element
function setCountdownFormat(getMinutes, getSeconds) {
    var countDownElement = document.getElementById("countdown");

    if (getMinutes < 10) {
        countDownElement.innerHTML = "0" + getMinutes + ":" + getSeconds;

        if (getSeconds < 10) {
            countDownElement.innerHTML = "0" + getMinutes + ":" + "0" + getSeconds;

        }

    } else if (getSeconds < 10) {
        countDownElement.innerHTML = getMinutes + ":" + "0" + getSeconds;

    } else {
        countDownElement.innerHTML = getMinutes + ":" + getSeconds;

    }
}


//Apply functions to elements in document

document.getElementById("start-button").addEventListener("click", function () {
    startCountdown()
});

document.getElementById("pause-button").addEventListener("click", function () {
    pauseCountdown()
});

document.getElementById("reset-button").addEventListener("click", function () {
    setCountdown(startingMinutes, startingSeconds, startingMilliseconds)
});