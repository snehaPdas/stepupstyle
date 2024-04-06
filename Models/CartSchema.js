const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number,
            default:0,
            required:true
        }
    }],
    totalquantity:{
        type:Number,
        required:true,
    },
    totalprice:{
        type:Number,
    }
},
{
    timestamps:true
})

const cartModel=mongoose.model("Cart",cartSchema)
module.exports=cartModel