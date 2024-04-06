const User=require("../Models/UserSchema")
const Category=require("../Models/CategorySchema")
const Product=require("../Models/ProductSchema")

const GetProductAddPage=async(req,res)=>{
    try {
        const categorydata=await Category.find({isListed:true})

        res.render("Admin/ProductAdd",{categorydata})
        
    } catch (error) {
        console.log(error.message)
    }
}

const AddProduct=async(req,res)=>{
    try {
        const products=req.body
        const ProductExist=await Product.findOne({
            Productname:{$regex:new RegExp(products.Productname,"i")}
            })
        if(!ProductExist){
            let images=[]
            if(req.files&&req.files.length>0){
                for(let i=0;i<req.files.length;i++){
                    images.push(req.files[i].filename)  
                }
            }
            const newproduct=new Product({
                productname:products.productName,
                description:products.description,
                category:products.category,
                regularprice:products.regularPrice,
                saleprice:products.salePrice,
                createdon:new Date(),
                quantity:products.quantity,
                productimage:images,
                })

              await newproduct.save()  
        }else{
          Category=await Category.find({
            isListed:true
          })
        return  res.render("Admin/ProductAdd",{message:"product already exist",categorydata:Category})
        }

        res.render("Admin/ProductDetails",)
        
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    GetProductAddPage,
    AddProduct
}
