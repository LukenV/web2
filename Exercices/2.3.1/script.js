const form = document.querySelector("form#form");
const text = document.querySelector("p#text");
const wish = document.querySelector("input#wish");
const displayButton = document.querySelector("button#reDisplay");

form.addEventListener("submit", (e) => {
  console.log("Form submitted");

  form.style.display = "none";

  text.innerHTML = `<p> ${wish.value} </p>`;

  wish.value = "";

  displayButton.style.display = "block";

  e.preventDefault();
});

displayButton.addEventListener("click", (e) => {
  console.log("button");

  displayButton.style.display = "none";

  text.innerHTML = "";

  form.style.display = "block";
});
