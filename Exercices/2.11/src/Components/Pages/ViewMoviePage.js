import { clearPage } from '../../utils/render';

const ViewMoviePage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const title = document.createElement('h3');
  title.style.margin = '30px';
  title.textContent = 'Movies list';

  main.appendChild(title);
}

export default ViewMoviePage;
