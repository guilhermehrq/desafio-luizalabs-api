require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// Conexão com o mongodb
require('./dbConnect');

const consign = require('consign');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

// Configurando timezone padrão
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');


const app = express();

app.use(express.json());
app.use(cors());

// Logs de requests
app.use(morgan(':method | :url | :status | :response-time ms | :date[clf]'));

consign()
    .include('./src/routes.js')
    .into(app);

module.exports = app;
