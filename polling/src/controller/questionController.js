const validator = require("../validator/validator")
const questionModel = require("../module/questionModule")
const optionModule = require("../module/optionModule")
const { text } = require("express")

const create = async function(req,res){
    try{ 
        let data = req.body
        if(!validator.isValidReqBody(data)){
            return res.status(400).send({status:false,msg:"Please pass some data in data body"})
        } 

        let {title,option} = data
        if(!validator.isValid(title)){
            return res.status(400).send({status:false,message:"Title is requiried"})
        }
    
        let output = await questionModel.create(data)
        output["option"] = []
        return res.status(201).send({status : true, message:"Question Has Been Created",data:output})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status : false, msg:error.message})
    }
}


const createOption =async function(req,res){
    try{ let data = req.body 
        let baseUrl = 'localhost:3000/questions'
        if(!validator.isValidReqBody(data)){
            return res.status(400).send({status:false,msg:"Please Pass Some Data"})
        }
         
        let id = req.params.id
        if(!validator.isValidObjectId(id)){
            return res.statud(400).send({status:false,msg:"Please Enter Valid Object id"})
        }
        
        if(!validator.isValid(data.text)){
            return res.status(400).send({status : false,msg:"text is a mandator field"})
        }
        

        const output = {
            question:id,
            text:data.text,
            votes:data.votes,   
        }
        let final = await optionModule.create(output)
        let link = baseUrl +'/'+final._id+'/add_vote'
        
        let createdData = {
            question:final.question,
            text:final.text,
            votes:final.votes,
            link:link
        }

        return res.status(201).send({status:true,message:"Option Created Successfully",data:createdData})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status : false, msg:error.message})
    }
}

const getOption =async function(req,res){
    try{let baseUrl = 'localhost:3000/questions'
        let id = req.params.id
        if(!validator.isValidObjectId(id)){
            return res.statud(400).send({status:false,msg:"Please Enter Valid Object id"})
        }
        
        const found = await questionModel.findOne({_id:id,isDeleted:false})
        if(!found){
            return res.status(404).send({status:false,message:"No such Data found"})
        }

        const option = await optionModule.find({question:id,isDeleted:false})
        for(let i = 0 ;i < option.length;i++){
            let link = baseUrl +'/'+option[i]._id+'/add_vote'
            option[i]["link"] = link
        }
        found["option"] = option
 
        return res.status(200).send({status:true,message:"Data found",data:found})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status : false, msg:error.message})
    }
}
const deleteQuestion =async function(req,res){
    try{
        let id = req.params.id
        if(!validator.isValidObjectId(id)){
            return res.statud(400).send({status:false,msg:"Please Enter Valid Object id"})
        }
        
        const data = await questionModel.findOne({_id:id,isDeleted:true})
        if(data){
            return res.status(404).send({status:false,msg:"this question has already been deleted"})
    
        }

        const deleted = await questionModel.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true})
        if(!deleted)
        return res.status(404).send({status:false,message:"This Question  Doesn't Exists"})

        return res.status(200).send({status:true,message:"Question Deleted Successfully"})

    }
    catch(error){
        console.log(error)
        return res.status(500).send({status : false, msg:error.message})
    }
}

const addVote =async function(req,res){
    try{
        let id = req.params.id
        if(!validator.isValidObjectId(id)){
            return res.statud(400).send({status:false,msg:"Please Enter Valid Object id"})
        }

        const data = await optionModule.findOne({_id:id,isDeleted:true})
        if(data){
            return res.status(404).send({status:false,msg:"this question has already been deleted"})
    
        }
        
        let vote = await optionModule.findOneAndUpdate({_id:id,isDeleted:false},{$inc:{votes : 1}},{new:true})
        if(!vote)
        return res.status(404).send({status:false,message:"This Question  Doesn't Exists"})

        let question= vote.question

        const voting = await questionModel.findOneAndUpdate({_id:question,isDeleted:false},{$inc:{vote:1}},{new:true})
        const percentage = (vote.votes/voting.vote)*100 +' %'
        
        const output = {
            question:vote.question,
            text:vote.text,
            votes:vote.votes,
            totalVotes:voting.vote,
            percentage:percentage
        }

        return res.status(200).send({status:true,msg:"Successfully voted the option",data:output})

        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status:false,Message:error.message})
    }
}


const deleteOption =async function(req,res){
    try{
        let id = req.params.id
        if(!validator.isValidObjectId(id)){
            return res.statud(400).send({status:false,msg:"Please Enter Valid Object id"})
        }
        
        const data = await optionModule.findOne({_id:id,isDeleted:true})
        if(data){
            return res.status(404).send({status:false,msg:"this Option has already been deleted"})
    
        }

        const random = await optionModule.findOne({_id:id,isDeleted:false})
        if(!random){
        return res.status(404).send({status:false,msg:"No such data exists"})
        }
        if(random.votes > 0){
            return res.status(400).send({status:false,msg:"This Option has Active votes(already in use)"})
        }

        const deleted = await optionModule.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true})
        if(!deleted)
        return res.status(404).send({status:false,message:"This Option  Doesn't Exists"})

        return res.status(200).send({status:true,message:"Option Deleted Successfully"})

    }
    catch(error){
        console.log(error)
        return res.status(500).send({status:false,Message:error.message})
    }
}

module.exports = {create,deleteQuestion,createOption,getOption,deleteOption,addVote}