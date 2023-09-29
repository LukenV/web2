const btn1 = document.querySelector('#myBtn1');
const btn2 = document.querySelector('#myBtn2');
const buttons = document.querySelectorAll('button');
const btn3 = buttons[2]; // fancy way to get a reference...
const btn4 = document.querySelector('#myBtn4');

btn1.addEventListener('click', () => {
  btn1.innerText = 'myBtn1 : I have been clicked !';
  console.log('onClickHandlerForBtn1::click');
});
btn2.addEventListener('click', onClickHandlerForBtn2);
btn2.addEventListener('click', onClickHandlerForBtnExtra);
btn3.addEventListener('click', onClickHandlerForBtn3);

function onClickHandlerForBtn2() {
  btn2.innerText = 'myBtn2 : I have also been clicked';
  console.log('onClickHandlerForBtn2::click');
}

function onClickHandlerForBtn3() {
  btn2.removeEventListener('click', onClickHandlerForBtnExtra);
  console.log('onClickHandlerForBtn3::click');
}

function onClickHandlerForBtnExtra() {
  console.log('onClickHandlerForBtnExtra::click');
}

btn4.onclick = function() {
  btn4.innerText = 'myBtn4 : You clicked on me : )';
  console.log('onClickHandlerForBtn4::click');
};
