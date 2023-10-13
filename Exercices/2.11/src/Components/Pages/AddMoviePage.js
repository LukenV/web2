import { clearPage } from '../../utils/render';

const AddMoviePage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const title = document.createElement('h3');
  title.style.margin = '30px';
  title.textContent = 'Add movie';

  main.appendChild(title);
}

export default AddMoviePage;
