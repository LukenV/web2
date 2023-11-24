const express = require('express');
const router = express.Router();

const {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneMovie,
  resetDatabase,
} = require('../models/movies.js');

// GET movies listing

router.get('/', (req, res, next) => {
  // Minimum duration filtering

  const minDuration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;

  const prefixTitle = req?.query?.['title-starts-with']
    ? req.query['title-starts-with']
    : undefined;

  const orderTitle = req?.query?.order ? req.query.order : undefined;
  const page = req?.query?.page ? req.query.page : undefined;
  const limit = req?.query?.limit ? req.query.limit : undefined;

  const list = readAllMovies(orderTitle, minDuration, prefixTitle, page, limit);

  if (list.error) {
    return res.sendStatus(list.error);
  }

  return res.json(list);
});

router.get('/reset', (req, res, next) => {

  resetDatabase();

  return res.json("Database successfuly reset !");
});

// GET one movie by its id

router.get('/:id', (req, res, next) => {
  const movieFound = readOneMovie(parseInt(req.params.id));

  if (movieFound.error) return res.sendStatus(movieFound.error);

  res.json(movieFound.result);
});

// POST create one movie

router.post('/', (req, res, next) => {
  const title = req?.body?.title?.length ? req.body.title : undefined;
  const duration = req?.body?.duration ? req.body.duration : undefined;
  const budget = req?.body?.budget ? req.body.budget : undefined;
  const link = req?.body?.link?.length ? req.body.link : undefined;

  const movieCreated = createOneMovie(title, duration, budget, link);

  if (movieCreated.error) {
    return res.sendStatus(movieCreated.error);
  }

  return res.json(movieCreated.result);
});

// DELETE delete one movie

router.delete('/:id', (req, res, next) => {
  const movieRemoved = deleteOneMovie(parseInt(req.params.id));

  if (movieRemoved.error) {
    return res.sendStatus(movieRemoved.error);
  }
  return res.json(movieRemoved);
});

// PATCH update one movie (min. one attribute)

router.patch('/:id', (req, res, next) => {
  const title = req?.body?.title ? req.body.title : undefined;
  const duration = parseInt(req?.body?.duration) ? parseInt(req?.body?.duration) : undefined;
  const budget = req?.body?.budget ? parseInt(req?.body?.budget) : undefined;
  const link = req?.body?.link ? req.body.link : undefined;
  const movieId = parseInt(req.params.id);

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    duration <= 0 ||
    budget <= 0 ||
    link?.length === 0
  ) {
    return res.sendStatus(400);
  }
  const updatedMovie = updateOneMovie(movieId, title, duration, budget, link);

  if (updateOneMovie.error) {
    return res.sendStatus(updateOneMovie.error);
  }

  return res.json(updatedMovie);
});

// PUT update one movie (all attributes) OR add a new one with all of the attributes

router.put('/:id', (req, res, next) => {
  const title = req?.body?.title ? req.body.title : undefined;
  const duration = parseInt(req?.body?.duration) ? parseInt(req?.body?.duration) : undefined;
  const budget = req?.body?.budget ? parseInt(req?.body?.budget) : undefined;
  const link = req?.body?.link ? req.body.link : undefined;
  const movieId = parseInt(req.params.id);

  if (
    !title ||
    !duration ||
    !budget ||
    !link ||
    title?.length === 0 ||
    duration <= 0 ||
    budget <= 0 ||
    link?.length === 0
  )
    return res.sendStatus(400);

  let result;

  result = updateOneMovie(movieId, title, duration, budget, link);

  if (result.error && result.error !== 404) {
    return res.sendStatus(result.error);
  }

  if (result.error === 404) {
    result.error = undefined;
    result = { ...createOneMovie(title, duration, budget, link) };

    if (result.error) return res.sendStatus(result.error);
  }

  return res.json(result.result);
});

module.exports = router;
