const greenLight = document.getElementById("greenLight");
const orangeLight = document.getElementById("orangeLight");
const redLight = document.getElementById("redLight");

const COLORS = [ "red", "orange", "green", "orange" ];

let step = { number: 0 };

const startClock = () => {
  setInterval(function() {
    alternateColor(step);
  }, 2000);
};

const alternateColor = ( step ) => {

  const color = COLORS[step.number];
  const light = document.getElementById( color + "Light" );

  let lastElementIndex = step.number - 1;

  if ( lastElementIndex < 0 ) lastElementIndex = COLORS.length - 1;

  const lastColor = COLORS[lastElementIndex];
  const lastLight = document.getElementById( lastColor + "Light" );

  lastLight.style.backgroundColor = "";
  light.style.backgroundColor = color;

  if ( step.number === COLORS.length - 1 ) step.number = 0;
  else step.number++;
  
};

startClock();