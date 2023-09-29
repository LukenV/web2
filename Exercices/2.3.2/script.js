const divs = document.querySelectorAll("div");

divs.forEach((div) => {
  div.addEventListener("click", (e) => {
    if (e.target.innerText) {
      e.target.innerText = "";
      e.target.style.width = "50px";
      e.target.style.height = "50px";
    } else {
      e.target.innerText = e.target.style.backgroundColor;
      e.target.style.width = "100px";
      e.target.style.height = "100px";
    }
  });
});
