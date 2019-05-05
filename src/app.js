const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const indexRoutes = require('./routes/index');

// AJUSTES
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// RUTAS
app.use('/', indexRoutes);

app.listen(app.get('port'), ()=>{
    console.log('Server on port '+app.get('port'));
});