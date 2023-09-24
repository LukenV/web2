var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        duration: 152,
        budget: 125000000,
        link: "https://www.example.com/harry-potter"
    },
    {
        id: 2,
        title: "Star Wars: Episode IV - A New Hope",
        duration: 121,
        budget: 11000000,
        link: "https://www.example.com/star-wars"
    },
    {
        id: 4,
        title: "Jurassic Park",
        duration: 127,
        budget: 63000000,
        link: "https://www.example.com/jurassic-park"
    },
    {
        id: 5,
        title: "Pirates of the Caribbean: The Curse of the Black Pearl",
        duration: 143,
        budget: 140000000,
        link: "https://www.example.com/pirates-caribbean"
    },
    {
        id: 6,
        title: "The Avengers: Age of Ultron",
        duration: 141,
        budget: 250000000,
        link: "https://www.example.com/avengers-age-of-ultron"
    },
    {
        id: 7,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        duration: 178,
        budget: 93000000,
        link: "https://www.example.com/lord-of-the-rings"
    },
    {
        id: 8,
        title: "The Matrix",
        duration: 136,
        budget: 63000000,
        link: "https://www.example.com/the-matrix"
    },
    {
        id: 9,
        title: "E.T. the Extra-Terrestrial",
        duration: 115,
        budget: 10500000,
        link: "https://www.example.com/et"
    },
    {
        id: 10,
        title: "Inception",
        duration: 148,
        budget: 160000000,
        link: "https://www.example.com/inception"
    },
    {
        id: 11,
        title: "The Shawshank Redemption",
        duration: 142,
        budget: 25000000,
        link: "https://www.example.com/shawshank-redemption"
    },
    {
        id: 12,
        title: "Forrest Gump",
        duration: 142,
        budget: 55000000,
        link: "https://www.example.com/forrest-gump"
    },
    {
        id: 13,
        title: "Avatar",
        duration: 162,
        budget: 237000000,
        link: "https://www.example.com/avatar"
    },
    {
        id: 14,
        title: "Titanic",
        duration: 195,
        budget: 200000000,
        link: "https://www.example.com/titanic"
    },
    {
        id: 15,
        title: "The Dark Knight",
        duration: 152,
        budget: 185000000,
        link: "https://www.example.com/dark-knight"
    },
    {
        id: 16,
        title: "Inglourious Basterds",
        duration: 153,
        budget: 70000000,
        link: "https://www.example.com/inglourious-basterds"
    },
    {
        id: 17,
        title: "The Godfather",
        duration: 175,
        budget: 6000000,
        link: "https://www.example.com/godfather"
    },
    {
        id: 18,
        title: "Gladiator",
        duration: 155,
        budget: 103000000,
        link: "https://www.example.com/gladiator"
    },
    {
        id: 19,
        title: "The Revenant",
        duration: 156,
        budget: 135000000,
        link: "https://www.example.com/the-revenant"
    },
    {
        id: 20,
        title: "The Wolf of Wall Street",
        duration: 180,
        budget: 100000000,
        link: "https://www.example.com/wolf-wall-street"
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