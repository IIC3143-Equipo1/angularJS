//var gzippo = require('gzippo');
  var express = require('express');
  var app = express();
  var pg = require('pg');
 
   pg.defaults.ssl = true;
  //app.use(express.logger('dev'));
  //app.use(gzippo.staticGzip("" + __dirname + "/app"));
	app.use(express.static("" + __dirname + "/dist"));

	app.get('/users', function(req, res) {
	     res.json({ message: 'Object created!' });
	});
	//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

	/*var client = new pg.Client(connectionString);
	client.connect();
	var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	query.on('end', function() { client.end(); });*/

app.get('/connect', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
	  if (err) throw err;
	  console.log('Connected to postgres! Getting schemas...');

	  client
	    .query('SELECT table_schema,table_name FROM information_schema.tables;')
	    .on('row', function(row) {
	      console.log(JSON.stringify(row));
	    });
	});
});



	app.listen(process.env.PORT || 5000);