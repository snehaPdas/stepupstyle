const User=require("../Models/UserSchema")
const bcrypt=require("bcrypt")

const GetLogin=async(req,res)=>{
    try {
        res.render("Admin/Login")
    } catch (error) {
        console.log(error)
    }
}
const VerifyAdmin=async(req,res)=>{
    try {
      const {email,password}=req.body  
      const FindUser=await User.findOne({
        email:email,
        isAdmin:1
      })
      const PasswordMatch=await bcrypt.compare(password,FindUser.password)
      if(PasswordMatch){
        req.session.admin=true
        res.redirect("/admin")
      }else{
        res.redirect("/admin/login")
      }
    } catch (error) {
        console.log(error)
    }
}





const GetIndex=async(req,res)=>{
    try {
        res.render("Admin/dashboard")
        
    } catch (error) {
        console,log(error)
    }
}


module.exports={
    GetLogin,
    GetIndex,
    VerifyAdmin
}