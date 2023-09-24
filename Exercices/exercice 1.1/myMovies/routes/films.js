var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id : 1,
        title : "Harry Potter",
        duration : 120,
        budget : 362000,
        link : "https://"
    },
    {
        id : 2,
        title : "Star Wars",
        duration : 109,
        budget : 529000,
        link : "https://"
    },
    {
        id : 3,
        title : "Indiana Jones",
        duration : 132,
        budget : 713000,
        link : "https://"
    }
];

// For pagination system

const paginatedResults = model => {

    return (req, res, next) => {

        const page = parseInt( req?.query?.page ) > 0 ? parseInt( req.query.page ) : undefined;
        const limit = parseInt( req?.query?.limit ) > 0 ? parseInt( req.query.limit ) : undefined;

        console.log( "page : " + page );
        console.log( "limit : " + limit );

        if ( page && limit ) {

            const results = {};

            const startIndex = (page - 1) * limit;
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

            res.paginatedResults = results;
            next();

        };

    };

};

/* GET users listing. */
router.get('/', paginatedResults( FILMS ), (req, res, next) =>{

    let alteredFilms;

    // For minimum duration filtering

    const minimumDuration = parseInt( req.query[ "minimum-duration" ] ) > 0 ? parseInt( req.query[ "minimum-duration" ] ) : undefined;

    if ( minimumDuration ) {

        alteredFilms = [...FILMS].filter( a => a.duration > minimumDuration );

    };

    // For prefixTitle filtering

    const prefixTitle = req?.query[ "title-starts-with" ]?.length !== 0 ? req.query[ "title-starts-with" ] : undefined;
    
    if ( prefixTitle ) {
        
        alteredFilms = [...FILMS].filter( a => a.title.startsWith( prefixTitle ) );

    };

    // For title ordering

    const orderTitle = req?.query?.order?.includes( "title" ) ? req.query.order : undefined;

    if ( orderTitle ) {

        alteredFilms = [...FILMS].sort( (a, b) => a.title.localeCompare( b.title ) );

        if ( orderTitle === "-title" ) alteredFilms.reverse();

    };

    // For pagination system

    if ( !alteredFilms ) {

        alteredFilms = res.paginatedResults;

    }

    res.json( alteredFilms ?? FILMS );

});

router.get('/:id', (req, res) => {
    
    const filmIndex = FILMS.findIndex( film => film.id === parseInt( req.params.id ) );

    if ( filmIndex < 0 ) return res.sendStatus( 404 );
  
    res.json( FILMS[filmIndex] );

});

router.post('/', (req, res) => {

    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = parseInt( req?.body?.duration ) > 0 ? req.body.duration : undefined;
    const budget = parseInt( req?.body?.budget ) > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if ( !title || !duration || !budget || !link ) res.sendStatus( 400 );

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

    res.json( newFilm );

});

module.exports = router;