var debug = require('debug')('express-example');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require("./server/routes");
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var csrf = require('csurf');

var app = express();

app.set('port', process.env.PORT || 5001);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
	app.use(bodyParser.urlencoded({
		extended: true
	}))
	app.use(bodyParser.json());
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

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
