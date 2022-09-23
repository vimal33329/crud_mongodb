const mongoose = require('mongoose');

let db;
console.log(process.env.DB_URL);

module.exports = function connection(){
    if(!db){
        db = mongoose.createConnection(process.env.DB_URL, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        });
    }

    return db;
}