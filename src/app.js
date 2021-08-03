const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

const usersRouter = require('./users/users.router');
const postsRouter = require('./posts/posts.router');

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;