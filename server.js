const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const path = require('path');



dotenv.config({path: './config/config.env'});


// connect to db
connectDB();

const app = express();

app.use(express.json());


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;


const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);