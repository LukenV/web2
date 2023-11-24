import { clearPage, renderTitle } from '../../utils/render';
import { readAllMovies, deleteOneMovie, updateOneMovie } from '../../utils/movies';

const ViewMoviePage = async () => {

  clearPage();

  const movies = await readAllMovies();

  renderTitle( "Movies list" );
  createTableMovies(movies);

};

function createTableMovies (movies) {

  const main = document.querySelector('main');
  const table = getMoviesTableAsNode( movies );

  main.appendChild( table );

  addListenersToButtons();

};

function getMoviesTableAsNode(movies) {
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'container';
  tableWrapper.style.padding = '20px';
  const table = document.createElement('table');
  table.className = 'table table-hover table-striped';

  const thead = document.createElement('thead');
  table.appendChild(thead);
  const header = document.createElement('tr');
  header.innerHTML = `
    <tr>
      <th scope="col">
        #
      </th>
      <th scope="col">
        Title
      </th>
      <th scope="col">
        Link
      </th>
      <th scope="col">
        Duration
      </th>
      <th scope="col">
        Budget
      </th>
      <th scope="col"></th>
    </tr>
  `;
  thead.appendChild(header);

  const tbody = document.createElement('tbody');
  tableWrapper.appendChild(table);
  table.appendChild(tbody);
  

  movies?.forEach((movie) => {

    const line = `
    <tr class="movieLine">
      <th scope="row">${movie.id}</th>
      <td id="title" data-is-updatable="1">
        ${movie.title}
      </td>
      <td id="link" data-is-updatable="1">
        ${movie.link}
      </td>
      <td id="duration" data-is-updatable="1">
        ${movie.duration}
      </td>
      <td id="budget" data-is-updatable="1">
        ${movie.budget}
      </td>
      <td>
        <button type="button" class="btn btn-danger delete" data-element-id="${movie.id}">Delete</button>
        <button type="button" class="btn btn-primary update" data-element-id="${movie.id}">Update</button>
        <button type="button" class="btn btn-primary save" style="display:none;" data-element-id="${movie.id}">Save</button>
      </td>
    </tr>`

    tbody.innerHTML += line;

  });

  return tableWrapper;
}

function addListenerToDeleteButtons() {

  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach( button => {

    button.addEventListener("click", (e) => {

      const movieId = Number( e.target.dataset.elementId );
  
      deleteOneMovie( movieId );

      ViewMoviePage();

    });

    return true;

  });

};

function addListenerToUpdateButtons() {

  const updateButtons = document.querySelectorAll(".update");

  updateButtons.forEach( button => {
    
    button.addEventListener("click", () => {

      const updatableColumns = getColumnsOfButtonLine(button);

      updatableColumns.forEach( column => {

        if ( column.dataset.isUpdatable === "1" ) {

          const copyColumn = column;

          copyColumn.contentEditable = true;
          
        };

      });

      const updateButton = button;
      updateButton.style.display = "none";

      const saveButton = getSaveButton(updateButton);
      saveButton.style.display = "block";

    });

    return true;

  });

};

function addListenerToSaveButtons() {

  const saveButtons = document.querySelectorAll(".save");

  saveButtons.forEach( button => {
  
    button.addEventListener("click", () => {

      const columns = getColumnsOfButtonLine(button);
      const values = {};

      columns.forEach( column => {

        if ( column.dataset.isUpdatable === "1" ) {

          const copyColumn = column;

          copyColumn.contentEditable = false;
          values[column.id] = column.innerText;
          
        };

      });

      console.log( JSON.stringify( values ) );

      const saveButton = button;
      saveButton.style.display = "none";

      const updateButton = getUpdateButton(saveButton);
      updateButton.style.display = "block";

      const { title, duration, budget, link } = values;
      const id = button.dataset.elementId;

      updateOneMovie( id, title, duration, budget, link );

      ViewMoviePage();

    });

  });

};

function getSaveButton(updateButton) {

  const parent = updateButton.parentNode;
  const saveButton = parent.querySelector('.save');

  return saveButton;

}

function getUpdateButton(saveButton) {

  const parent = saveButton.parentNode;
  const updateButton = parent.querySelector('.update');

  return updateButton;
  
}

function getColumnsOfButtonLine(button) {

  const buttonColumnParent = button.parentNode;
  const buttonLineParent = buttonColumnParent.parentNode;

  const columns = buttonLineParent.querySelectorAll("td");
  return columns;

}

function addListenersToButtons() {

  addListenerToDeleteButtons();
  addListenerToUpdateButtons();
  addListenerToSaveButtons();

}

export default ViewMoviePage;
