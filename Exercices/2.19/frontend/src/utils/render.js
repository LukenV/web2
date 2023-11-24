const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  main.innerHTML += `
    <h3 style="margin:30px;">
      ${title}
    </h3>`;
};

export { clearPage, renderTitle };
