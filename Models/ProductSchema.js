const mongoose=require("mongoose")
const ProductSchema=mongoose.Schema({
    productname:{
         type:String,
         //required:true
    },
    description:{
        type:String,
        //required:true
    },
    category:{
        categoryId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"category"
        }
        
    },
    regularprice:{
        type:Number,
        //required:true
    },
    saleprice:{
        type:Number,
       // required:true
    },
    createdon:{
        type:   String
    },
    quantity:{
        type:Number,
       // required:true
    },
    productimage:{
        type:Array
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("product",ProductSchema)