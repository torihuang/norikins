var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

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

// mongoose.connect('mongodb://localhost/multivision')
mongoose.connect('mongodb://torihuang:dogdatanori@ds011314.mlab.com:11314/dogdata')
var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('The db is up and running...')
})

var userSchema = mongoose.Schema({username: String, password: String});
var User = mongoose.model('User', userSchema);
var mongoUser;
User.findOne().exec(function(err, userDoc) {
  mongoUser = userDoc.username;
});

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
  res.render('index');
})

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Nihao from port ' + port + '...')