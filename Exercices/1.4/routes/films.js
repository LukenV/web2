const express = require('express');
const router = express.Router();

// "FILMS" array

const FILMS = require( '../assets/movies.js' );

// Pagination algorithm

const paginatedResults = (model, page, limit) => {

    const results = {};

    const startIndex = ( page - 1 ) * limit;
    const endIndex = page * limit;

    if ( endIndex < FILMS.length ) {

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

    let alteredFilms = undefined;

    // Minimum duration filtering

    const minimumDuration = parseInt( req?.query?.[ "minimum-duration" ] ) ? parseInt( req.query[ "minimum-duration" ] ) : undefined;

    if ( minimumDuration ) {

        console.log( "Minimum duration" );

        if ( minimumDuration <= 0 ) return res.sendStatus( 400 );

        console.log( minimumDuration );

        alteredFilms = [...FILMS].filter( a => a.duration > minimumDuration );

    };

    // PrefixTitle filtering

    const prefixTitle = req?.query?.[ "title-starts-with" ] ? req.query[ "title-starts-with" ] : undefined;
    
    if ( prefixTitle ) {

        console.log( "Prefix title" );

        if ( prefixTitle.length === 0 ) return res.sendStatus( 400 );
        
        alteredFilms = [...FILMS].filter( a => a.title.startsWith( prefixTitle ) );

        if ( alteredFilms.length === 0 ) return res.sendStatus( 404 );

    };

    // Title ordering

    const orderTitle = req?.query?.order ? req.query.order : undefined;

    if ( orderTitle ) {

        console.log( "Ordering by title" );

        if ( !orderTitle.includes( "title" ) || orderTitle !== "title" || orderTitle !== "-title" ) return res.sendStatus( 400 );

        alteredFilms = [...FILMS].sort( (a, b) => a.title.localeCompare( b.title ) );
        
        if ( orderTitle === "-title" ) {
            
            alteredFilms.reverse();
        
        };

    };

    // Pagination system

    const page = parseInt( req?.query?.page ) ? parseInt( req.query.page ) : undefined;
    const limit = parseInt( req?.query?.limit ) ? parseInt( req.query.limit ) : undefined;

    if ( page && limit ) {

        console.log( "Pagination system" );

        if ( page <= 0 ) return res.sendStatus( 400 );

        alteredFilms = paginatedResults( [...FILMS], page, limit );

    };

    return res.json( alteredFilms ?? FILMS );

});

// GET one movie by its id

router.get('/:id', (req, res) => {
    
    const filmIndex = FILMS.findIndex( film => film.id === parseInt( req.params.id ) );

    if ( filmIndex < 0 ) return res.sendStatus( 404 );
  
    res.json( FILMS[filmIndex] );

});

// POST create one movie

router.post('/', (req, res) => {

    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = parseInt( req?.body?.duration ) > 0 ? req.body.duration : undefined;
    const budget = parseInt( req?.body?.budget ) > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if ( !title || !duration || !budget || !link ) return res.sendStatus( 400 );

    if ( [...FILMS].find( x => x.title.toLowerCase() === titletoLowerCase() ) ) return res.sendStatus( 409 );

    const lastFilmIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastFilmId = lastFilmIndex !== undefined ? FILMS[lastFilmIndex]?.id : 0;
    const nextId = lastFilmId + 1;

    const newFilm = {

        id : nextId,
        title : title,
        duration : duration,
        budget : budget,
        link : link

    };

    FILMS.push( newFilm );

    return res.json( newFilm );

});

module.exports = router;