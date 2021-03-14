const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./documentation/swagger_output.json');
const userRouter = require('./src/Routes/user');
const chatRouter = require('./src/Routes/chat');
const Exception = require('./src/utils/exception');
const errorCodes = require('./src/utils/constatns/errorCodes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/user', userRouter);

app.use('/user', chatRouter);

app.use('/', (req, res, next) => res.send('Chat API'));

app.use((req, res, next) => next(new Exception(errorCodes.NOT_FOUND)));

app.use(Exception.exceptionHandeler);

module.exports = app;
