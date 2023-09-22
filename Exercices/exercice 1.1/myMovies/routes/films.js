var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    const FILMS = [
        {
            id : 1,
            title : "Harry Potter",
            duration : "2h",
            budget : 362000,
            link : "https://"
        },
        {
            id : 2,
            title : "Star Wars",
            duration : "1h49",
            budget : 529000,
            link : "https://"
        },
        {
            id : 3,
            title : "Indiana Jones",
            duration : "2h12",
            budget : 713000,
            link : "https://"
        }
    ];

    res.json( FILMS );

});

module.exports = router;