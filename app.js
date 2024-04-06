const express=require("express")
const path =require("path")
const session=require("express-session")


const UserRoute=require("./Route/UserRoute")
const AdminRoute=require("./Route/AdminRoute")
const ConnectDB=require("./DataBase/connection")

ConnectDB()

const app=express()
const PORT=process.env.PORT|| 7000
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(session({
    secret:"stepupstyle",
    resave:false,
    saveUninitialized:false
}))

app.set("view engine","ejs")


app.use("/",UserRoute)
app.use("/admin",AdminRoute)


app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})