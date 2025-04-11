var mongoose = require('mongoose');
const db = require('../config_mongodb/configmultiple'); // Import the MongoDB connection

const FoodSchema = new mongoose.Schema({
    code: {
        required:true,
        type:String, unique : true,
    },
    name:{
        required :true,
        type:String,unique: true,
    },
    level:{
        required:true,
        type:[String],
        default:[],
    },
    countryCode :{
        required:true,
        type:[String],
        default:[],
    },
    note:{
        type:String,
    },
    image_url:{
        type:String,
        default:"https://i.pinimg.com/564x/7f/c4/c6/7fc4c6ecc7738247aac61a60958429d4.jpg"
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    updateAt: {
        default: Date.now(),
        type: Date,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    isSpicy:{
        type:Boolean,
        default:false,
    },
    isHotelFood: {
        type:Boolean,
        default:false,
    }

})

const Foods = db.db1.model("foods", FoodSchema);
module.exports = Foods;
