import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import deadReckoning from './img/dead-reckoning.jpg';
import noWayHome from './img/no-way-home.jpg';
import lukenV from './img/LukenV.jpg';

const containerWrapper = document.querySelector('.container');

const createRow = () => {
  const newRow = document.createElement('div');
  newRow.className = 'row';

  containerWrapper.appendChild(newRow);

  return newRow;
};

const createTitle = ( titleText ) => {
  const row = createRow();

  const divCol = document.createElement('div');

  divCol.className = 'col-12';

  row.appendChild(divCol);

  const title = document.createElement('h1');

  title.innerText = titleText;

  divCol.appendChild(title);
};

const createImage = (src) => {
  const image = document.createElement('img');

  image.src = src;
  image.className = 'img-fluid rounded-start';
  image.alt = src;

  return image;
};

const createCard = (src, title, description ) => {
  const row = createRow();

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

  divCardRowCol2.appendChild( cardText );

};

const createButton = ( text, method ) => {

  const button = document.createElement('button');

  button.innerText = text;
  button.style.width = '150px';
  button.style.height = '50px';
  button.style.border = 'none';
  button.style.borderRadius = '15px';
  button.style.margin = 'auto';

  button.addEventListener( 'click', method );

  const divButton = document.createElement('div');

  containerWrapper.appendChild( divButton );

  divButton.appendChild( button );

};

function createMainDisplay() {

  containerWrapper.innerHTML = "";

  const spiderManText = "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const spiderManTitle = "Spider Man - No Way Home";

  const missionImpossibleText = "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const missionImpossibleTitle = "Mission Impossible - Dead Reckoning";

  createTitle( "myMovies" );

  createCard(noWayHome, spiderManTitle, spiderManText );
  createCard(deadReckoning, missionImpossibleTitle, missionImpossibleText );

  createButton( "About", createSecondaryDisplay );

};

function createSecondaryDisplay() {

  containerWrapper.innerHTML = "";

  createTitle( "About" );

  createCard( lukenV, "LukenV", "Hi, I'm a belgian student in computer science." );

  createButton( "Back", createMainDisplay );

};

createMainDisplay();