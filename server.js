const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const path = require('path');
const errorHandler = require('./middleware/error');


//route files
const auth = require('./controllers/auth.js');
const posts = require('./controllers/posts.js');


// config
dotenv.config({path: './config/config.env'});


// connect to db
connectDB();

const app = express();


// json content
app.use(express.json());



// for rest api's
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
// for static assets
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', posts);


// Errors middleware
app.use(errorHandler());
// Port
const PORT = process.env.PORT || 5000;

// server
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);