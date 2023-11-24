async function readAllMovies () {

  let movies;
  try {
    const response = await fetch('/api/movies');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    movies = await response.json();

  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  return movies;

}

async function addOneMovie ( options ) {

  let newMovie;

  try {

    const response = await fetch('/api/movies', options); // fetch return a promise => we wait for the response

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    newMovie = await response.json(); // json() returns a promise => we wait for the data

    console.log('New movie added : ', newMovie);

  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  return newMovie;

}

module.exports = {
    readAllMovies,
    addOneMovie
}