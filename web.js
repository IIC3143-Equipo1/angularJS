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

app.get('/test', function(req, res) {
// get the total number of visits today (including the current visit)
      	var client = new pg.Client(connectionString);
	client.connect();

      client.query('SELECT * FROM items ORDER BY text', function(err, result) {

        // handle an error from the query
        if(handleError(err)) return;

        // return the client to the connection pool for other requests to reuse
        done();
        res.json({ message: result.rows[0] });
      });
});

app.get('/connect', function(req, res) {
	/*pg.connect(process.env.DATABASE_URL, function(err, client) {
	  if (err) throw err;
	  console.log('Connected to postgres! Getting schemas...');

	  client
	    .query('SELECT table_schema,table_name FROM information_schema.tables limit 1;')
	    .on('row', function(row) {
	      console.log(JSON.stringify(row));
	    });
	});*/
	var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

	var client = new pg.Client(connectionString);
	client.connect();
	//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	client.query("INSERT INTO items(text,complete) values($1, $2)", ['Test Number One', true]);
    client.query("INSERT INTO items(text,complete) values($1, $2)", ['Test Number Two', false]);

    var query = client.query("SELECT * FROM items ORDER BY text");
	query.on("row", function (row, result) {
	    result.addRow(row);
	});

	query.on('end', function(result) { 
		//console.log('Created')
		 console.log(JSON.stringify(result.rows, null, "    "));
		 JSON.stringify(result.rows, null, "    ");
		 res.json({ message: 'Object created!' });
		client.end(); 
	});
});



	app.listen(process.env.PORT || 5000);