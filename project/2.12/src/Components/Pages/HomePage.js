import { clearPage } from '../../utils/render';
import { 
  createCard, 
  createTitle
} from '../../utils/functions';
import deadReckoning from '../../img/dead-reckoning.jpg';
import noWayHome from '../../img/no-way-home.jpg';

const HomePage = () => {
  clearPage();
  renderCards();
};

function renderCards () {

  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';

  main.appendChild(container);

  const spiderManText =
    "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const spiderManTitle = 'Spider Man - No Way Home';

  const missionImpossibleText =
    "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const missionImpossibleTitle = 'Mission Impossible - Dead Reckoning';

  createTitle('myMovies', container);

  createCard(noWayHome, spiderManTitle, spiderManText, container);
  createCard(deadReckoning, missionImpossibleTitle, missionImpossibleText, container);

}

export default HomePage;
