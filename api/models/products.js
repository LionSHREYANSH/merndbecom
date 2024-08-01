const mongoose = require("mongoose")

const proSchema = mongoose.Schema({
    
    PName : {type : String } , 
    PDesc : {type : String } , 
    PAmount : {type : Number} , 
    PStatus : {type : String  ,  default : "IN-STOCK" } , 
    PQty : {type : Number } , 
    PImg : {type : String} , 


})

module.exports = mongoose.model("products" , proSchema)