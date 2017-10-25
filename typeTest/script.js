const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0]; //min-sec-hundreth sec- thousanth sec
var interval;
var timerRunning = false; //means that when script originally loads, timer is not running

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if(time <= 9) {
    time = "0" + time;  //converts value inside time to a string consisting of zero and whatever value sits in time (1-9)
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60); //timer[3] is thousanth of a second. divide by 100 to get seconds, then by 60 to get min
  timer[1] = Math.floor((timer[3]/100) - (timer[0]*60)); //subtract the value of timer 0 (min) * 60 so every time it hits 60 it returns to zero
  timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0,textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval); //interval is cleared and the clock stops
    testWrapper.style.borderColor = "#429890";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCF3";
    } else {
      testWrapper.style.borderColor = "#E95D0F";
    }
  }
}

// Start the timer:
function start() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10); //when interval starts function will run every thousandth of a second
  }
  console.log(textEnterdLength);
}


// Reset everything:
function reset(){
  clearInterval(interval);
  interval = null; //do so that when we reassign set interval the next time we start the app we're not setting up a new interval with a new index number
  timer = [0,0,0,0];
  timerRunning = false;

  testArea.value = ""; //clear the text area
  the.innerHTML - "00:00:00";
  testWrapper.style.borderColor = "gray";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
