const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongodbutil = require( './model' );
mongodbutil.connectToServer( function( err ) {
	var indexRouter = require('./routes/index');
	var reviewRouter = require('./routes/review');
	
	app.use('/', indexRouter);
	app.use('/review', reviewRouter);
	
	app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
   res.send('error');
  });
});

module.exports = app;
