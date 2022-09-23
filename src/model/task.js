module.exports = function(){
    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;

    var task = Schema({
        title: String,
        descripcion: String,
        status: Boolean
    });

    return db.model('task', task);

}
