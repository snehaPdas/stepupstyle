const nodemailer=require("nodemailer")

const Transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"snehap7das@gmail.com" ,
        pass:"txbq sgdu bxjh qhpm"

    }

})


const EmailSend=async(email,otp)=>{
    let SendingOptions={
        from:"snehap7das@gmail.com",
        to:email,
        subject:"email Verification",
        text:`your otp is :${otp}`
    }
    try {
        await Transport.sendMail(SendingOptions)
        console.log("verification has sent successfully")
        console.log(otp)
        
    } catch (error) {
        console.error("error verification email:",error)
        
    }
}

module.exports={
    EmailSend
}