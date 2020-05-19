let express = require('express'),
 path = require('path'),
 mongoose = require('mongoose'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 dbConfig = require('./database/db');


 mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
 }).then(() => {
  console.log('Database sucessfully connected')
  },
  error => {
  console.log('Database could not connect: ' + error)
  }
 )


 // Setting up port with express js
 const playerRoute = require('./routes/player.route')
 const app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
  extended: false
 }));
 app.use(cors());
 app.use(express.static(path.join(__dirname, 'dist/cw-app')));
 app.use('/', express.static(path.join(__dirname, 'dist/cw-app')));
 app.use('/api', playerRoute)
 // Create port
 const port = process.env.PORT || 8080;
 const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
 })
 // Find 404 and hand over to error handler
// app.use((req, res, next) => {
 // next(createError(404));
// });
 // error handler
 app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to
 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's
 //send back an error with its status code and message
 });
