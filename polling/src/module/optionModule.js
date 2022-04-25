const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    text: {
        type: String,
        trim: true,
        required:true
    },
    votes: {
        type: Number,default:0
    },
    link: {
        type: String,
        trim: true
    },
    isDeleted:{type:Boolean,default :false}
}, { timestamps: true })

module.exports = mongoose.model('Options',optionSchema)