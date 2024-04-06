const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{
       type:String,
       required:true
},
   email:{
    type:String,
    required:true
},
   phone:{
    type:String,
    required:true
},
   password:{
    type:String,
    required:true
},
   isBlocked:{
    type:Boolean,
    default:false
   },
   isAdmin:{
    type:String,
    default:"0"
   }
})


module.exports=mongoose.model("user",UserSchema)