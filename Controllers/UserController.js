const User=require("../Models/UserSchema")
const nodemailer=require("nodemailer")
const AuthOtp=require("../Helpers/Authentication")
const Product=require("../Models/ProductSchema")
const bcrypt=require("bcrypt")


const PasswordSecurity=async(password)=>{
    try {
        const PasswordHash=bcrypt.hash(password,10)
        return PasswordHash
    } catch (error) {
        console.log(error)
        
    }
}


const GetHomePage=async(req,res)=>{
    try {
        const user=req.session.user
        const UserData=await User.findOne({})
       // const id=req.query.id
        
        const ProductData=await Product.find({isBlocked:false}).sort({_id:-1}).limit(8)
        if(user){
            if(req.url==="/")
            res.render("User/HomePage",{user:UserData,product:ProductData})
        }else{
            res.render("User/HomePage",{product:ProductData})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const GetSignupPage = async (req,res) => {
    try {
        res.render("User/SignUp")
        
    } catch (error) {
        res.status(500).send("server error");
        console.log(error)
        
    }   
}

const InsertNewUser=async(req,res)=>{
    try {
       let {name,email,phone,password}=req.body
       const ExistedUser=await User.findOne({email:email})
       if(ExistedUser){
        res.send("user alrady exist")
       }
       req.session.UserData={name,email,phone,password}
       if(req.body.password!==req.body.confirmpassword){
        console.log("password and confirm password doesnt match")
        res.render("User/SignUp")
       }
    const otp=Math.floor(100000 +Math.random()*900000)
        req.session.otp=otp
       await AuthOtp.EmailSend(req.session.UserData.email,req.session.otp)
     res.render("User/OtpVerification")

    } catch (error) {
        console.log(error)
    }
}


const GetOtpPage=async (req,res)=>{
    try {
        res.render("OtpVerification")
        
    } catch (error) {
        console.log(error)
    }
}



//otp verification


const OtpVerification=async(req,res)=>{
    console.log("entere into here")
    try {
       const otp=req.body.otp
       console.log("entry")
       if(Number(otp)===req.session.otp){
        const UserData=req.session.UserData
        const NewUser=new User({
            name:UserData.name,
            email:UserData.email,
            phone:UserData.phone,
            password:await PasswordSecurity(UserData.password)
        })
        await NewUser.save()
        
        res.json({status:true})

       }else{
        res.json({status:false})
       }
     

    } catch (error) {
        console.log(error)
    }
}

//resend otp
const ResendOtp=async(req,res)=>{
    try{
        const email=req.session.UserData.email
        const newOtp=Math.floor(100000 +Math.random()*900000)
        const transporter=nodemailer.createTransport({
            service:"gmail",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:"snehap7das@gmail.com" ,
                pass:"txbq sgdu bxjh qhpm"
                }
          })


    
 const information= await transporter.sendMail({
     from:"snehap7das@gmail.com",
     to:email,
     subject:"Resend Otp",
     text:`your resend otp is${newOtp}`
        })
        if(information){
            req.session.otp=newOtp
            res.json({success:true,message:"Resend Otp send successfully"})
            console.log("Email resent", information.messageId);
            console.log("resend otp",newOtp)
        }else{
            res.json({success:false,message:"resend Otp failed to send"})
        }

        }catch(error){
            console.log(error)
            res.json({success:false,message:"resend Otp Error"})
        }
    
}


const GetLoginPage=async(req,res)=>{
    try {
        res.render("User/Login")
    } catch (error) {
      console.log(error)  
    }
    
}



const UserLogin=async(req,res)=>{
    try {
        const{email,password}=req.body
        console.log(email)
        const FindUser= await User.findOne({
           isAdmin:"0",
            isBlocked:false,
            email:email
        })
        console.log(FindUser)
         if(FindUser){
            const PasswordMatch=bcrypt.compare(password,FindUser.password)
            if(PasswordMatch){
                req.session.user=FindUser._id
                res.redirect("/")
            }
        }else{
            console.log("password does not match")
            res.render("User/Login",{message:"user not found"})
        }
        

    } catch (error) {
        console.log(error)
        
    }
}

const GetProductDetailPage=async(req,res)=>{
    try {
        const user=req.session.user
        const prodid=req.query.id

        console.log("productiddddddddd",prodid)
        const product=await Product.findOne({_id: prodid})
        const AllProduct=await Product.find({isBlocked:false})
        res.render("User/ProductDetails",{product})
    } catch (error) {
       console.log(error) 
    }
   

}


module.exports={
    GetSignupPage,
    InsertNewUser,
    GetHomePage,
    GetOtpPage,
    OtpVerification,
    ResendOtp,
    GetLoginPage,
    UserLogin,
    GetProductDetailPage
}