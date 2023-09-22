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

/* GET users listing. */
router.get('/', function(req, res, next) {

    const minimumDuration = parseInt( req.query[ "minimum-duration" ] ) > 0 ? parseInt( req.query[ "minimum-duration" ] ) : undefined;


    console.log( minimumDuration );
    console.log( typeof minimumDuration );

    let filteredFilms;

    if ( minimumDuration ) {

        filteredFilms = FILMS.filter( a => a.duration > minimumDuration );

    }

    console.log( JSON.stringify( filteredFilms ) )

    res.json( filteredFilms ?? FILMS );

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