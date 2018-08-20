require('dotenv').config();
const mongoose = require('mongoose');
//Auto increment
const autoIncrement = require('mongoose-auto-increment-fix');
const connection = mongoose.createConnection(process.env.MONGO_URI,{ useNewUrlParser: true });

let Schema = mongoose.Schema;

//Auto increment
autoIncrement.initialize(connection);

let urlSchema = new Schema(
    {
        "original_url" : {type: String, required: true},
    }
);

//Auto increment
urlSchema.plugin(autoIncrement.plugin, {model: 'Url', field:'short_url'});
//El tercer argumento es la colección
let Url = connection.model('Url', urlSchema, 'urls');

module.exports = Url;