var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var petApp = require('./routes/pet_app');
var ownerReg = require('.routes/owner_reg');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/pet_app', petApp);
app.use('/owner_reg' ownerReg);

// serve the index page at /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var server = app.listen(3000, function () {
  console.log('Listening on port ', server.address().port);
});
