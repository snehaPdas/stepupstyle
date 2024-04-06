const express=require("express")
const Route=express.Router()

const AdminController=require("../Controllers/AdminController")
const CustomerController=require("../Controllers/CustomerController")
const CategoryController=require("../Controllers/CategoryController")
const ProductController=require("../Controllers/ProductController")



const {isLoggedAdmin}=require("../Helpers/MiddleWare")

 Route.get("/",isLoggedAdmin,AdminController.GetIndex)
 Route.get("/login",AdminController.GetLogin)
 Route.post("/login",AdminController.VerifyAdmin)

 //customer
 Route.get("/user",isLoggedAdmin,CustomerController.CustomerData)
 Route.get("/blockCustomer",isLoggedAdmin,CustomerController.GetCustomerBlocked)
 Route.get("/unblockCustomer",isLoggedAdmin,CustomerController.GetCustomerUnBlocked)


 //category
 Route.get("/category",isLoggedAdmin,CategoryController.GetCategoryPage)
 Route.post("/category",isLoggedAdmin,CategoryController.CategoryAdd)
Route.get("/listedcategory",isLoggedAdmin,CategoryController.CategoryListed)
Route.get("/unlistedcategory",isLoggedAdmin,CategoryController.CategoryUnlisted)


// multer
const multer=require("multer")
const storage=require("../Helpers/multer")
const upload=multer({storage:storage})
Route.use("public/uploads",express.static("public/uploads"))



// productuploadProductController
Route.get("/addProducts",isLoggedAdmin,ProductController.GetProductAddPage)
Route.post("/addProducts",isLoggedAdmin,upload.array("images",5),ProductController.AddProduct)



module.exports=Route