module.exports = function(){
    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;

    var tareas = Schema({
        titulo: String,
        descripcion: String,
        status: Boolean
    });

    return db.model('tareas', tareas);

}
