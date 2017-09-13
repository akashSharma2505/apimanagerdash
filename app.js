var express = require('express');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');

var app = express();

var config = {
  userName: 'arjunsas',
  password: 'sas@123456789',
  server: 'arjuntestdb.database.windows.net',
  // If you are on Microsoft Azure, you need this:  
  options: { encrypt: true, database: 'ITSMDB' }
};



app.use(function (req, res, next) {
  req.query = tediousExpress(req, config);
  next();
});

app.use(bodyParser.text());
app.use('/changeList', require('./api/controllers/changelist'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found: ' + req.method + ":" + req.originalUrl);
  err.status = 404;
  next(err);
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});