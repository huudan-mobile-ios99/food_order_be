var mongoose = require('mongoose');
const db = require('../config_mongodb/configmultiple'); // Import the MongoDB connection

const { ObjectId } = mongoose.Types;

const TokenSchema = new mongoose.Schema({
    value:{
        required:true,type:String
    },
    name:{
        required:true,type:String
    },
})

const Token = db.db1.model("token", TokenSchema);
module.exports = Token;
