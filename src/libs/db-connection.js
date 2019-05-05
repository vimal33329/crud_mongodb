const mongoose = require('mongoose');

let db;

module.exports = function connection(){
    if(!db){
        db = mongoose.createConnection('mongodb://localhost/crud-example', {
            useNewUrlParser: true
        });
    }

    return db;
}