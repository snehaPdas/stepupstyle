const User=require("../Models/UserSchema")

    const CustomerData=async(req,res)=>{
        try {
            const Search=req.query.search || ""
            const Page=req.query.page || 1
            const Limit=3
            const Query={
                
                isAdmin:"0",
                $or:[{
                    name:{$regex:new RegExp(Search,"i")},
                    email:{$regex:new RegExp(Search,"i")}
                }]
            }
            const UserData=await User.find(Query)
            .limit(Limit)
            .skip((Page-1)*Limit)
            .exec()
            const count=await User.countDocuments(Query)
            const totalPages=Math.ceil(count/Limit)

    res.render("Admin/Customer",{UserData,totalPages,currentPage:Page})
    } catch (error) {
    console.log(error)
}
    }


const GetCustomerBlocked=async(req,res)=>{
    try{
        const CustomerId=req.query.id

    const CustomerData=await User.updateOne({_id:CustomerId},{$set:{isBlocked:true}})
     res.redirect("/admin/user")
    }catch(error){
        console.log(error)

    }
    
}

const GetCustomerUnBlocked=async(req,res)=>{
    try {
        const CustomerId=req.query.id
        const CustomerData=await User.updateOne({_id:CustomerId},{$set:{isBlocked:false}})
        res.redirect("/admin/user")
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    CustomerData,
    GetCustomerBlocked,
    GetCustomerUnBlocked
}




