const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },

    option:Array,
    vote: {type:Number,default :false},
    isDeleted:{type:Boolean,default :false}
},{timestamps:true})


module.exports=mongoose.model('Question',questionSchema)