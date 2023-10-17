import { clearPage } from '../../utils/render';
import { 
  createCard, 
  createTitle
} from '../../utils/functions';
import lukenV from '../../img/LukenV.jpg';

const AboutPage = () => {
  clearPage();
  renderCards();
};

function renderCards() {

  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';

  main.appendChild(container);

  createTitle('About', container);

  createCard(lukenV, 'LukenV', "Hi, I'm a belgian student in computer science.", container);

}

export default AboutPage;
