//var gzippo = require('gzippo');
  var express = require('express');
  var app = express();
 
  //app.use(express.logger('dev'));
  //app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.use(express.static("" + __dirname + "/dist"));

app.get('/users', function(req, res) {
     res.json({ message: 'Object created!' });
});

app.listen(process.env.PORT || 5000);