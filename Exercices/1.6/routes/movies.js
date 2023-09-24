const express = require('express');
const router = express.Router();

// "MOVIES" array

const MOVIES = require('../assets/moviesArray.js');

// Pagination algorithm

const paginatedResults = (model, page, limit) => {

    const results = {};

    const startIndex = ( page - 1 ) * limit;
    const endIndex = page * limit;

    if ( endIndex < MOVIES.length ) {

        results.next = {

            page: page + 1,
            limit: limit

        }

    }

    if ( startIndex > 0 ) {

        results.previous = {

            page: page - 1,
            limit: limit

        }

    }

    results.results = model.slice( startIndex, endIndex );

    return results;

};

// GET movies listing

router.get('/', (req, res, next) =>{

    let alteredMoviesArray = undefined;

    // Minimum duration filtering

    const minimumDuration = parseInt( req?.query?.[ "minimum-duration" ] ) ? parseInt( req.query[ "minimum-duration" ] ) : undefined;

    if ( minimumDuration ) {

        console.log( "Minimum duration" );

        if ( minimumDuration <= 0 ) return res.sendStatus( 400 );

        console.log( minimumDuration );

        alteredMoviesArray = [...MOVIES].filter( a => a.duration > minimumDuration );

    };

    // PrefixTitle filtering

    const prefixTitle = req?.query?.[ "title-starts-with" ] ? req.query[ "title-starts-with" ] : undefined;
    
    if ( prefixTitle ) {

        console.log( "Prefix title" );

        if ( prefixTitle.length === 0 ) return res.sendStatus( 400 );
        
        alteredMoviesArray = [...MOVIES].filter( a => a.title.startsWith( prefixTitle ) );

        if ( alteredMoviesArray.length === 0 ) return res.sendStatus( 404 );

    };

    // Title ordering

    const orderTitle = req?.query?.order ? req.query.order : undefined;

    if ( orderTitle ) {

        console.log( "Ordering by title" );

        if ( !orderTitle.includes( "title" ) || orderTitle !== "title" || orderTitle !== "-title" ) return res.sendStatus( 400 );

        alteredMoviesArray = [...MOVIES].sort( (a, b) => a.title.localeCompare( b.title ) );
        
        if ( orderTitle === "-title" ) {
            
            alteredMoviesArray.reverse();
        
        };

    };

    // Pagination system

    const page = parseInt( req?.query?.page ) ? parseInt( req.query.page ) : undefined;
    const limit = parseInt( req?.query?.limit ) ? parseInt( req.query.limit ) : undefined;

    if ( page && limit ) {

        console.log( "Pagination system" );

        if ( page <= 0 ) return res.sendStatus( 400 );

        alteredMoviesArray = paginatedResults( [...MOVIES], page, limit );

    };

    return res.json( alteredMoviesArray ?? MOVIES );

});

// GET one movie by its id

router.get('/:id', (req, res) => {
    
    const filmIndex = MOVIES.findIndex( film => film.id === parseInt( req.params.id ) );

    if ( filmIndex < 0 ) return res.sendStatus( 404 );
  
    res.json( MOVIES[filmIndex] );

});

// POST create one movie

router.post('/', (req, res) => {

    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = parseInt( req?.body?.duration ) > 0 ? req.body.duration : undefined;
    const budget = parseInt( req?.body?.budget ) > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if ( !title || !duration || !budget || !link ) return res.sendStatus( 400 );

    if ( MOVIES.find( x => x.title.toLowerCase() === titletoLowerCase() ) ) return res.sendStatus( 409 );

    const lastFilmIndex = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined;
    const lastFilmId = lastFilmIndex !== undefined ? MOVIES[lastFilmIndex]?.id : 0;
    const nextId = lastFilmId + 1;

    const newFilm = {

        id : nextId,
        title : title,
        duration : duration,
        budget : budget,
        link : link

    };

    MOVIES.push( newFilm );

    return res.json( newFilm );

});

// DELETE delete one movie

router.delete('/:id', (req, res) => {

    const indexMovieFound = MOVIES.findIndex( movie => movie.id === parseInt( req.params.id ) );

    if ( indexMovieFound < 0 ) return res.sendStatus( 404 );

    const moviesRemoved = MOVIES.splice( indexMovieFound, 1 );
    
    return res.json( moviesRemoved );

});

// PATCH update one movie (min. one attribute)

router.patch('/:id', (req, res) => {

    const title = req?.body?.title ? req.body.title : undefined;
    const duration = parseInt( req?.body?.duration ) ? parseInt( req?.body?.duration ) : undefined;
    const budget = req?.body?.budget ? parseInt( req?.body?.budget ) : undefined;
    const link = req?.body?.link ? req.body.link : undefined;

    if ( ( !title && !duration && !budget && !link ) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0 ) return res.sendStatus( 400 );

    const indexMovieFound = MOVIES.findIndex( movie => movie.id === parseInt( req.params.id ) );

    if ( indexMovieFound < 0 ) return res.sendStatus( 404 );

    const updatedMovie = { ...MOVIES[indexMovieFound], ...req.body };

    MOVIES[indexMovieFound] = updatedMovie;
    
    return res.json( updatedMovie );

});

// PUT update one movie (all attributes) OR add a new one with all of the attributes

router.put('/:id', (req, res) => {

    const title = req?.body?.title ? req.body.title : undefined;
    const duration = parseInt( req?.body?.duration ) ? parseInt( req?.body?.duration ) : undefined;
    const budget = req?.body?.budget ? parseInt( req?.body?.budget ) : undefined;
    const link = req?.body?.link ? req.body.link : undefined;

    if ( ( !title || !duration || !budget || !link ) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0 ) return res.sendStatus( 400 );

    const indexMovieFound = MOVIES.findIndex( movie => movie.id === parseInt( req.params.id ) );

    console.log( indexMovieFound );

    if ( indexMovieFound < 0 ) {

        const newMovie = { id : parseInt( req.params.id ), ...req.body };

        MOVIES[ MOVIES.length - 1 ] = newMovie;

        return res.json( newMovie );

    }

    const updatedMovie = { ...MOVIES[indexMovieFound], ...req.body };

    MOVIES[indexMovieFound] = updatedMovie;
    
    return res.json( updatedMovie );

});

module.exports = router;