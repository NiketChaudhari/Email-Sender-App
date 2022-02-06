const express = require("express");
const nodemailer = require("nodemailer")

const app = express();
const port = 8000;

app.get("/valid/:myEmail/:myPassword/:senderEmail/:senderSubject/:senderData", (req,res) => {

    // console.log(req.params.myEmail)
    // console.log(req.params.myPassword)
    // console.log(req.params.senderEmail)
    // console.log(req.params.senderSubject)
    // console.log(req.params.senderData)


    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : req.params.myEmail,
            pass : req.params.myPassword
        }
    })

    const mailOptions = {
        from : req.params.myEmail,
        to : req.params.senderEmail,
        subject : req.params.senderSubject,
        html : req.params.senderData
    }

    transporter.sendMail(mailOptions, (err,info) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log("Email sent : "+info.response)
        }
    })

    res.send("Email Sent...")
})

app.listen(port, ()=>{
    console.log(`Listning the port at ${port}`)
})