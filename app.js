require("dotenv").config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const indexRoutes = require('./src/routes/index');

// AJUSTES
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.static("./public"));

// MIDDLEWARES
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// RUTAS
app.use('/', indexRoutes);

app.listen(app.get('port'), ()=>{
    console.log('Server on port '+app.get('port'));
});