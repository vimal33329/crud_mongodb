const mongoose = require('mongoose');
//console.log(process.env.DB_URL);
module.exports = function connection(){
        let db = mongoose.createConnection(process.env.DB_URL, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        },err => {
		if (err) { console.log(err); return; } 
		console.log('[LOG=DB] Successfully connected to MongoDB');
		})
    return db;
}