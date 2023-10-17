import { clearPage } from '../../utils/render';
import { addOneMovie } from '../../utils/movies';
import ViewMoviePage from './ViewMoviePage';

const AddMoviePage = () => {
  clearPage();
  renderTitle();
  renderForm();
  addFormListener();
};

function renderTitle() {
  const main = document.querySelector('main');

  main.innerHTML = `
    <h3 style="margin:30px;">
      Add movie
    </h3>`;
}

function renderForm() {
  const main = document.querySelector('main');

  main.innerHTML += `
    <div class="container">

      <div class="row mb-3" style="padding:20px;">

        <form id="formAdd">

          <div class="col-md" style="padding:10px;">
            <label>Title</label>
            <input type="text" class="form-control" id="title" placeholder="Title of the movie" required>
          </div>

          <div class="col-md" style="padding:10px;">
            <label>Duration</label>
            <input type="number" class="form-control" min="0" step="1" id="duration" placeholder="Duration of the movie" required>
          </div>

          <div class="col-md" style="padding:10px;">
            <label>Budget</label>
            <input type="number" class="form-control" min="0" step="1" id="budget" placeholder="Budget of the movie" required>
          </div>

          <div class="col-md" style="padding:10px;">
            <label>Link</label>
            <input type="url" class="form-control" id="link" placeholder="Link of the movie" required>
          </div>

          <div class="col-md" style="padding:10px;">
            <input type="submit" class="btn btn-primary mb-2" value="Send">
          </div>

        </form>

      </div>

    </div>`;
}

function addFormListener() {
  const form = document.querySelector('#formAdd');

  form.addEventListener('submit', (e) => {
    checkInputs(form);

    e.preventDefault();
  });
}

function checkInputs(form) {
  const inputs = form.querySelectorAll('input');

  const values = {};

  for (let i = 0; i < inputs.length; i += 1) {

    const input = inputs[i];

    const dataKey = input.id;

    // L'input submit ne contient pas de valeur

    if (input.type !== 'submit') {

      values[dataKey] = input.value;

      input.value = '';
    }
  }

  const { title, duration, budget, link } = values;

  addOneMovie(title, duration, budget, link);

  ViewMoviePage();

  return true;
}

export default AddMoviePage;
