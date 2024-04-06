const mongoose=require("mongoose")
const CategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    isListed:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model("category",CategorySchema)