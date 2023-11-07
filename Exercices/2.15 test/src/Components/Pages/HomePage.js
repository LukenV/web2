import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();
  
    fetch('https://v2.jokeapi.dev/joke/Any?type=single')
      .then((response) => {
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        return response.json();
      })
      .then((joke) => {
        renderRandomJoke(joke);
      })
      .catch((err) => {
        console.error('HomePage::error: ', err);
      });
};

function renderRandomJoke (joke) {

  const main = document.querySelector('main');

  const container = document.createElement('div');

  container.className = 'container';

  main.appendChild(container);
  
  const row = document.createElement('div');
  row.className = 'row mb-3';

  container.appendChild(row);

  const col = document.createElement('div');
  col.className = 'col-md';

  row.appendChild(col);

  const paragraph = document.createElement('p');

  const jokeString = `Category : ${joke.category}\nJoke : ${joke.joke}`
  paragraph.innerText = jokeString;
  paragraph.style.padding = '40px';
  paragraph.style.textAlign = 'center';

  col.appendChild( paragraph );

}

export default HomePage;
