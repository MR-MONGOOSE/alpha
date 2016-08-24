var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Sockets
// io = require('socket.io').listen(server)

// Body Parser
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Session
var session = require('express-session')
app.use(session({
  secret: 'combo',
  resave: false,
  saveUninitialized: true
}))


app.use(express.static(__dirname + '/flatkit'))

// Mongoose
require('./server/config/mongoose.js');
// HTTP Routes`	
require('./server/config/routes.js')(app);
// Socket Routes
// require('./server/config/socket.routes.js')(app);


app.listen(app.get('port'), function() {
  console.log(`listening on port ${app.get('port')}`)
})
