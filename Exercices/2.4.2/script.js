const greenLight = document.getElementById("greenLight");
const orangeLight = document.getElementById("orangeLight");
const redLight = document.getElementById("redLight");

let interval;

let step = { number: 0 };

const startClock = () => {
  interval = setInterval(function() {
    alternateColor(step);
  }, 2000);
};

const alternateColor = (step) => {
  console.log("In alternate color\n\nStep n°" + step.number);

  let number = step.number;

  if (number == 0) {
    orangeLight.style.backgroundColor = "";
    redLight.style.backgroundColor = "red";
  } else if (number == 1) {
    redLight.style.backgroundColor = "";
    orangeLight.style.backgroundColor = "orange";
  } else if (number == 2) {
    orangeLight.style.backgroundColor = "";
    greenLight.style.backgroundColor = "green";
  } else if (number == 3) {
    greenLight.style.backgroundColor = "";
    orangeLight.style.backgroundColor = "orange";
    step.number = 0;
  }

  if (number != 3) step.number++;
};

startClock();
