const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

const app = express();

//config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter)

//out port
const port = process.env.PORT || 3000; 
app.listen(port, ()=>{
    console.log('App run port 3000');
});