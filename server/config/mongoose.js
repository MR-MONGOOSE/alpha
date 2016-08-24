mongoose = require('mongoose');
var fs = require('fs');

if (!process.env.MONGODB_URI) {
  var mongoUri = 'mongodb://127.0.0.1:27017/vo'
} else {
  var mongoUri = process.env.MONGODB_URI
}

mongoose.connect(mongoUri)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', dbCallback)

function dbCallback() {
  console.log('db callback called')
}

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})