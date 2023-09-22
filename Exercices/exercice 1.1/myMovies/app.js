var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

const requests = {};

app.use( (req, res, next) => {

    const requestInfos = req.method + " " + req.path;

    if ( requests[ requestInfos ] === undefined ) {

        requests [ requestInfos ] = 1;

    } else {

        requests [ requestInfos ] ++;

    }

    let string = "Request counter :\n";

    const requestEntries = Object.entries( requests );

    for ( let i=0; i<requestEntries.length; i++ ) {

        string += " -\t" + requestEntries[i][0] + " : " + requestEntries[i][1] + "\n";

    }

    console.log( string );

    next();

});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter); 

module.exports = app;