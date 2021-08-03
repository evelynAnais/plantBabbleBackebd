const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

module.exports = app;