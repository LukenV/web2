const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const moviesRouter = require('./routes/movies');

const app = express();

const requests = {};

app.use( (req, res, next) => {

    const requestInfos = req.method + " " + req.path;

    requests[requestInfos] === undefined ? requests[requestInfos] = 1 : requests[requestInfos]++;

    let string = "Request counter :\n";

    const requestEntries = Object.entries( requests );

    for ( let i=0; i<requestEntries.length; i++ ) {

        string += " - " + requestEntries[i][0] + " : " + requestEntries[i][1] + "\n";

    }

    console.log( string );

    next();

});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter); 

module.exports = app;