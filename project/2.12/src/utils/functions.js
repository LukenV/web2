function createRow( container ) {
  const newRow = document.createElement('div');
  newRow.className = 'row';

  container.appendChild(newRow);

  return newRow;
}

function createTitle(titleText, container ) {
  const row = createRow( container );

  const divCol = document.createElement('div');

  divCol.className = 'col-12';

  row.appendChild(divCol);

  const title = document.createElement('h1');

  title.innerText = titleText;

  divCol.appendChild(title);
}

function createImage(src) {
  const image = document.createElement('img');

  image.src = src;
  image.className = 'img-fluid rounded-start';
  image.alt = src;

  return image;
}

function createCard(src, title, description, container) {
  const row = createRow( container );

  const divCol = document.createElement('div');

  divCol.className = 'col';

  row.appendChild(divCol);

  const divCard = document.createElement('div');

  divCard.className = 'card mb-3';
  divCard.style = 'max-width: 540px;';

  divCol.appendChild(divCard);

  const divCardRow = document.createElement('div');

  divCardRow.className = 'row g-0';

  divCard.appendChild(divCardRow);

  const divCardRowCol1 = document.createElement('div');

  divCardRowCol1.className = 'col-md-4';

  divCardRow.appendChild(divCardRowCol1);

  const image = createImage(src);

  divCardRowCol1.appendChild(image);

  const divCardRowCol2 = document.createElement('div');

  divCardRowCol2.className = 'col-md-8';

  divCardRow.appendChild(divCardRowCol2);

  const cardBody = document.createElement('div');

  cardBody.className = 'card-body';

  divCardRowCol2.appendChild(cardBody);

  const cardTitle = document.createElement('h5');

  cardTitle.className = 'card-title';
  cardTitle.style.padding = '15px';

  cardTitle.innerText = title;

  divCardRowCol2.appendChild(cardTitle);

  const cardText = document.createElement('p');

  cardText.className = 'card-text';
  cardText.style.padding = '20px';

  cardText.innerText = description;

  divCardRowCol2.appendChild(cardText);
}

export {
    createRow,
    createCard,
    createImage,
    createTitle
}