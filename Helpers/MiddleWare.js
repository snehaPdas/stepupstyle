const User=require("../Models/UserSchema")

const isUserLogged=(req,res,next)=>{

        if(req.session.user){
            User.findById({
                _id:req.session.user
            }).lean()
            .then((data)=>{
                if(data.isBlocked==false){
                  next()
                }else{
                    res.redirect("/login")
                }
            })
        }else{
            res.redirect("/login")
            
        }
        }

        const isLoggedAdmin=(req,res,next)=>{
            if(req.session.admin){
                User.findOne({
                    isAdmin:"1"
                }).then((data)=>{
                    if(data){
                        next()
                    }else{
                        res.redirect("/admin/login")
                    }
                }).catch((error)=>{
                    console.log("error in middleware")
                    res.status(500).send("server error")
                })

                
            }else{
                res.redirect("/admin/login")
            }
        }


        module.exports={
            isUserLogged,
            isLoggedAdmin

        }