const express = require('express');
const { v1_routes } = require('./routes');
const errorHandler = require('./middleware/errors');
const { default: helmet } = require('helmet');

const app = express();
app.use(express.json());
app.use(helmet());
v1_routes(app);

app.use(errorHandler);

module.exports = app;
