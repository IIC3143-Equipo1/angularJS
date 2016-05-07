var debug = require('debug')('express-example');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require("./server/models");
var routes = require("./server/routes");
var survey = require("./server/routes/survey");
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var csrf = require('csurf');

var app = express();
var api_prefix = '/api/v1.0'

app.set('port', process.env.PORT || 5000);
//app.use(express.static("" + __dirname + "/dist"));
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
	app.use(bodyParser());
	app.use(methodOverride());
	app.use(function(err, req, res, next) {
	  console.log(err);
	  next();
	});
}

app.use(session({
    secret: '5h4r1ng15C4r1ng'
}));
app.use(cookieParser('secret'));
app.use(csrf());
app.use(function (req, res, next) {
    res.cookie("XSRF-TOKEN",req.csrfToken());
    return next();
});

app.get('/', routes.index);

app.get(api_prefix + '/survey',        survey.allSurveis);
app.post(api_prefix + '/survey', 	   survey.createSurvey);
app.get(api_prefix + '/survey/:id',    survey.getSurvey);
app.put(api_prefix + '/survey/:id',    survey.updateSurvey);
app.delete(api_prefix + '/survey/:id', survey.deleteSurvey);

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});
