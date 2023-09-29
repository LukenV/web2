const btn1 = document.querySelector("#myBtn1");
const btn2 = document.querySelector("#myBtn2");

btn1.addEventListener("click", delayedAlert);
btn2.addEventListener("click", clearAlert);

let timeoutID;
const delayInSeconds = 2;
const delayInMiliSeconds = delayInSeconds * 1000;

function delayedAlert() {
  timeoutID = setTimeout(() => {
    alert(`You asked for this popup ${delayInSeconds}s ago!`);
  }, delayInMiliSeconds);
}

function clearAlert() {
  clearTimeout(timeoutID);
}
