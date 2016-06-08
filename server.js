var express = require('express'),
  logger = require('morgan'),
  stylus = require('stylus'),
  bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development';

var app = express();

// Set up stylus
function compile(str, path) {
  return stylus(str).set('filename', path);
}

// Configure view engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname+'/public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
  res.render('index');
})

var port = 8080;
app.listen(port);
console.log('Nihao from port ' + port + '...')