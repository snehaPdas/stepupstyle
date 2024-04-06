const { trusted } = require("mongoose")

Cart=require("../Models/CartSchema")
User=require("../Models/UserSchema")
Product=require("../Models/ProductSchema")
Category=require("../Models/CategorySchema")



const GetCartPage=async(req,res)=>{
    try {
        const user=req.session.user
        res.render("User/CartPage")
    } catch (error) {
        console.log(error)
    }
    
}

const AddToCart=async(req,res)=>{
    console.log("1")
    try {
        const UserId=req.session.user
        const productid=req.body.id
        const qty=req.body.quantity
        const FindProduct=await Product.findById(productid)
       if(!FindProduct){
        return res.status(404).json({message:"product not found"})
       }
       let UserCart=await Cart.findOne({user:UserId})
       if(!UserCart){
        UserCart=new Cart({
            user:UserId,
            items:[],
            price:0
        })
       }
       console.log("2")
       const ExistingItemIndex=UserCart.items.findIndex((item)=>{
        item.product.toString()===productid
       })
       let totalquantityincart
       if(ExistingItemIndex>=0){

        totalquantityincart= UserCart.items[ExistingItemIndex].quantity+qty
       if(totalquantityincart<=FindProduct.quantity){

        UserCart.items[ExistingItemIndex].quantity+=qty
        UserCart.items[ExistingItemIndex].price=FindProduct.saleprice*UserCart.items(ExistingItemIndex).quantity
       }else{
        return res.status(200).json({
            status:"out of stock",
            message:"product out of stock"
        })
       }
       console.log("2")

       }else{
        if(FindProduct.quantity>0){
            UserCart.items.push({
                product: productid,
                quantity: qty,
                price: FindProduct.saleprice * qty,
      
              
              });
        }else{
            return res.status(200).json({
                status:"out of stock",
                message:"product out of stock"
            })
        }
       }
       console.log("4")
       UserCart.totalquantity = UserCart.items.reduce(
        (total, item) => total + item.quantity,0);
      UserCart.totalprice = UserCart.items.reduce((total, item) => total + item.price,0);
      await UserCart.save()
      console.log("5")
      console.log("usercart is",UserCart)
      return res.status(200).json({
        status:"true",
        message:"product added sucessfully"
      })
    
    } catch (error) {
        console.log(error)
        res.status(200).json({message:"server error"})
        
    }

}




module.exports={
    GetCartPage,
    AddToCart
}