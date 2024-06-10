const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id:{
        type: Number,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    image:{
        type: String,
    },
    category:{
        type: String,
        required:true
    },
    new_price:{
        type: String,
        required:true
    },
    old_price:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
})
module.exports = mongoose.model('Products', productSchema);
