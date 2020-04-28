const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
/**
 * request.query => quando a rota possui variaveis nomeadas ex: localhost:3333/user?name=Ernani&idade=36
 * request.params => quando a rota possui variaveis não nomeadas ou dá forma url amigavel ex: localhost:3333/users/1
 * request.body => quando as variaveis são passado via post ou put e não constam na rota
 */
module.exports = app;