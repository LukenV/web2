const path = require('node:path');
const { parse, serialize } = require('../utils/json');

// 1.10 : API : CRUD texts & fat model

const jsonDbPath = __dirname + '/../data/movies.json';

// "defaultMovies" array

const defaultMovies = require('../utils/moviesArray');

function readAllMovies(orderTitle, minDuration, prefixTitle, page, limit) {
  console.log(
    `readAllMovies :\norderTitle : ${orderTitle}\nminDuration : ${minDuration}\nprefixTitle : ${prefixTitle}\npage : ${page}\nlimit : ${limit}`,
  );

  const movies = parse(jsonDbPath, defaultMovies);

  let results;

  if (orderTitle) {
    results = orderByTitle(orderTitle);
  }

  if (minDuration) {
    results = filterByMinimumDuration(minDuration);
  }

  if (prefixTitle) {
    results = filterByPrefixTitle(prefixTitle);
  }

  if (page && limit) {
    results = paginatedResults(page, limit);
  }

  return results ?? movies;
}

function filterByMinimumDuration(minDuration) {
  console.log(`filterByMinimumDuration :\nminDuration : ${minDuration}`);

  const movies = parse(jsonDbPath, defaultMovies);

  minDuration = parseInt(minDuration);

  minDuration = !isNaN(minDuration) ? minDuration : undefined;

  const results = {};

  const filteredMoviesArray = [...movies].filter((a) => a.duration > minDuration);

  if (minDuration <= 0) {
    results.error = 400;

    return results;
  }

  if (filteredMoviesArray.length === 0) {
    results.error = 404;

    return results;
  }

  results.results = filteredMoviesArray;

  return results;
}

function filterByPrefixTitle(prefixTitle) {
  console.log(`filterByPrefixTitle \nprefixTitle: ${prefixTitle}`);

  const movies = parse(jsonDbPath, defaultMovies);
  const filteredMoviesArray = [...movies].filter((a) => a.title.startsWith(prefixTitle));
  const results = {};

  if (filteredMoviesArray.length === 0) {
    results.error = 404;

    return results;
  }

  results.results = filteredMoviesArray;

  return results;
}

function orderByTitle(orderTitle) {
  console.log(`orderByTitle :\norder : ${orderTitle}`);

  const results = {};

  if (orderTitle.length === 0) {
    results.error = 400;

    return results;
  }

  const movies = parse(jsonDbPath, defaultMovies);

  orderTitle = orderTitle?.includes('title') ? orderTitle : undefined;

  let orderedMovies;

  if (orderTitle) {
    orderedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));

    if (orderTitle === '-title') {
      orderedMovies.reverse();
    }

    results.results = orderedMovies;

    return results;
  }
}

// Pagination algorithm

function paginatedResults(page, limit) {
  console.log(`paginatedResults :\npage : ${page}\nlimit : ${limit}`);

  const movies = parse(jsonDbPath, defaultMovies);

  page = parseInt(page);
  page = !isNaN(page) ? page : undefined;
  limit = parseInt(limit);
  limit = !isNaN(limit) ? limit : undefined;

  const results = {};

  if (page <= 0 || limit <= 0) {
    results.error = 400;

    return results;
  }

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < movies.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = movies.slice(startIndex, endIndex);

    return results;
  }
}

function readOneMovie(movieId) {
  console.log(`readOneMovie :\movieId : ${movieId}`);
  const movies = parse(jsonDbPath, defaultMovies);

  const filmIndex = movies.findIndex((film) => film.id === movieId);

  const result = {};

  if (filmIndex < 0) {
    result.error = 404;

    return result;
  }

  result.result = movies[filmIndex];

  return result;
}

function createOneMovie(title, duration, budget, link) {
  console.log(
    `createOneMovie :\ntitle : ${title}\nduration : ${duration}\nbudget : ${budget}\nlink : ${link}`,
  );
  const result = {};

  if (!title || !duration || !budget || !link) {
    result.error = 400;

    return result;
  }

  duration = parseInt(duration);
  budget = parseInt(budget);

  if (title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0) {
    result.error = 400;

    return result;
  }

  const movies = parse(jsonDbPath, defaultMovies);

  if (movies.find((x) => x.title.toLowerCase() === title.toLowerCase())) {
    result.error = 409;

    return result;
  }

  const lastFilmIndex = movies?.length !== 0 ? movies.length - 1 : undefined;
  const lastFilmId = lastFilmIndex !== undefined ? movies[lastFilmIndex]?.id : 0;
  const nextId = lastFilmId + 1;

  console.log(`createOneMovie :\ntitle : ${title}\nmovieId : ${nextId}`);

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  movies.push(newFilm);

  serialize(jsonDbPath, movies);

  result.result = newFilm;

  return result;
}

function deleteOneMovie(movieId) {
  console.log(`deleteOneMovie :\nmovieId : ${movieId}`);
  const movies = parse(jsonDbPath, defaultMovies);
  const indexMovieFound = movies.findIndex((movie) => movie.id === movieId);

  const result = {};

  if (indexMovieFound < 0) {
    result.error = 404;
    return result;
  }

  const movieRemoved = movies.splice(indexMovieFound, 1);

  serialize(jsonDbPath, movies);

  result.result = movieRemoved;
  return result;
}

function updateOneMovie(movieId, title, duration, budget, link) {
  console.log(
    `updateOneMovie :\nmovieId : ${movieId}\ntitle : ${title}\nduration : ${duration}\nbudget : ${budget}\nlink : ${link}`,
  );

  const result = {};

  const movies = parse(jsonDbPath, defaultMovies);

  const indexMovieFound = movies.findIndex((movie) => movie.id === movieId);

  const movieObject = {
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  if (indexMovieFound < 0) {
    result.error = 404;
    return result;
  }

  const updatedMovie = { ...movies[indexMovieFound], ...movieObject };

  movies[indexMovieFound] = updatedMovie;

  serialize(jsonDbPath, movies);

  result.result = updatedMovie;

  return result;
}

module.exports = {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneMovie,
};
