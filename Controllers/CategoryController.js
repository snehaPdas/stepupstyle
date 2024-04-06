const Category=require("../Models/CategorySchema")
const User=require("../Models/UserSchema")

const GetCategoryPage=async(req,res)=>{
    try {
        const page=req.query.page||1
        const Limit=3
        const CategoryData=await Category.find({})
            .limit(Limit)
            .skip((page-1)*Limit)
            .exec()
            const count=await Category.countDocuments()
            const totalPages=Math.ceil(count/Limit)
            res.render("Admin/Category",{categorydata:CategoryData,totalPages,currentPage:page})
        
    } catch (error) {
        console.log("error")
    }
}

const CategoryAdd=async(req,res)=>{
    try {
        const {name,description}=req.body
        const ExistingCategory=await Category.findOne({name:{$regex:new RegExp(`^${name}$`,'i')}})
        if(description&&description.trim()!==""){
            if(!ExistingCategory){
                const CategoryData=new Category({
                    name:name,
                    description:description
                })
               await CategoryData.save()
               res.redirect(302,"/admin/category")
            }else{
                res.render("Admin/Category",{message:"category already exist"})
                console.log("category already exist")
            }

        }else{
            res.render("Admin/Category",{message:"Description cannot be empty"})
            console.log("description empty")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error");
    }
}



const CategoryListed=async(req,res)=>{
try {
    const CategoryId=req.query.id
    const CategoryData=await Category.updateOne({
        _id:CategoryId},{$set:{isListed:false}})
        res.redirect("/admin/category")
    
} catch (error) {
    console.log(error)
}
}
const CategoryUnlisted=async(req,res)=>{
    const categoryId=req.query.id
    const CategoryData=await Category.updateOne({_id:categoryId},{$set:{isListed:true}})
    res.redirect("/admin/category")
}



const pagination=async(req,res)=>{
try {
    const page=req.query.page||1
    const Limit=3
    const CategoryData=await Category.find({})
        .limit(Limit)
        .skip((page-1)*Limit)
        .exec()
        const count=await User.countDocuments
        const totalPages=Math.ceil(count/Limit)
        res.render("Admin/Category",{CategoryData,totalPages,currentPage:page})

    
    
} catch (error) {
    console.log(error)
}
}

module.exports={
    GetCategoryPage,
    CategoryAdd,
    CategoryListed,
    CategoryUnlisted,
    pagination
}
