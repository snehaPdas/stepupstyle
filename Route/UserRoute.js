const express=require("express")

const UserController=require("../Controllers/UserController")
const CartController=require("../Controllers/CartController")


const {isUserLogged}=require("../Helpers/MiddleWare")


const Route=express.Router()

Route.get('/',UserController.GetHomePage)
Route.get("/signUp",UserController.GetSignupPage)
Route.post("/signUp",UserController.InsertNewUser)
Route.get("/verifyOtp",UserController.GetOtpPage)
Route.post("/verifyOtp",UserController.OtpVerification)
Route.post("/resendOtp",UserController.ResendOtp)
Route.get("/login",UserController.GetLoginPage)
Route.post("/login",UserController.UserLogin)


// cart
Route.get("/cart",isUserLogged,CartController.GetCartPage)
Route.post("/addtoCart",isUserLogged,CartController.AddToCart)




// .....product

Route.get("/productdetails",isUserLogged,UserController.GetProductDetailPage)


module.exports = Route