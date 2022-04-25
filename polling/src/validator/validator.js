const mongoose = require("mongoose")

const isValidReqBody = function(data){
    return Object.keys(data).length > 0
}

const isValid = function(value){
    if(typeof value === 'undefined' || value === null){
        return false
    }
    if(typeof value === 'string' && value.trim().length == 0){
        return false
    }
    return true

}

const isValidObjectId = function(id){
    return mongoose.Types.ObjectId.isValid(id)
}

module.exports.isValidReqBody=isValidReqBody
module.exports.isValid=isValid
module.exports.isValidObjectId=isValidObjectId