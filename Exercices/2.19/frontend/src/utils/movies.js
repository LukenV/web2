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

async function readOneMovie (movieId) {

  let movie;
  try {
    const response = await fetch(`/api/movies/${movieId}`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    movie = await response.json();

  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  return movie;

}

async function addOneMovie ( title, duration, budget, link ) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
      duration,
      budget,
      link
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

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

async function deleteOneMovie ( id ) {

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let deletedMovie;

  try {

    const response = await fetch(`/api/movies/${id}`, options); // fetch return a promise => we wait for the response

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    deletedMovie = await response.json(); // json() returns a promise => we wait for the data

    console.log('Movie deleted : ', deletedMovie);

  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  return deletedMovie;

}

async function updateOneMovie ( id, title, duration, budget, link ) {

  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      duration,
      budget,
      link
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let updatedMovie;

  try {

    const response = await fetch(`/api/movies/${id}`, options); // fetch return a promise => we wait for the response

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    updatedMovie = await response.json(); // json() returns a promise => we wait for the data

    console.log(`Movie ${id} updated : `, updatedMovie);

  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  return updatedMovie;

}

module.exports = {
  readAllMovies,
  readOneMovie,
  addOneMovie,
  deleteOneMovie,
  updateOneMovie
}