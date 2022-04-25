const mongoose = require("mongoose")

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

isValidReqBody = function(requestBody){  
    return Object.keys(requestBody).length > 0
}

isValid = function(value){
    if(typeof value == "undefined" || value === null){
        return false
    }
    if(typeof value == "string" && value.trim().length === 0){ 
        return false
    }
    if(typeof value =="number" && value.toString().trim().length === 0){
        return false
    }

    return true
}

const isValidSizes = (availableSizes) => {
    return ["S", "XS", "M", "X", "L", "XXL", "XL"].indexOf(availableSizes) !== -1

}

const isINR = (currencyId) => {
    return ["INR"].indexOf(currencyId) != -1

}

const isRs = (currencyFormat) => {
    return ["₹"].indexOf(currencyFormat) != -1

}


module.exports.isValidReqBody=isValidReqBody
module.exports.isValid=isValid
module.exports.isValidobjectId=isValidobjectId
module.exports.isValidSizes=isValidSizes
module.exports.isINR=isINR
module.exports.isRs=isRs