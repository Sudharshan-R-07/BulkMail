const express = require("express")
const cors = require("cors")
const app = express()
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://sudharshan:HUs3j9X5m9Z7g2c4@cluster0.lavdlzh.mongodb.net/passkey?appName=Cluster0")
    .then(function () {
        console.log("DataBase is Connected")
    }).catch(function () {
        console.log("DataBase is Connect Failed")
    })
    

const credential = mongoose.model("credential",{},"bulkmail");
app.post("/sendmail", function (req, res) {
    var msg = req.body.msg
    var emailList = req.body.emaillist
    


    credential.find().then(function (data) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:data[0].toJSON().username,
                pass:data[0].toJSON().password,


            }
        });
       

        new Promise(async function (resolve, reject) {

            try {
                for (var i = 0; i < emailList.length; i++) {
                    await transporter.sendMail(
                        {

                            from: data.username,
                            to: emailList[i],
                            subject: "A message from Bulk mail app",
                            text: msg

                        },
                    )
                    console.log("Email send to:" + emailList[i])

                }
                resolve("Success")
            }
            catch (error) {
                console.log(error)
                reject("failed")
            }

        }).then(function () {
            res.send(true)
        })
            .catch(function () {
                res.send(false)
            })
    }).catch(function (error) {
        console.log(error)
    })



})




app.listen(5000, function () {
    console.log("Sever Started....")
})
