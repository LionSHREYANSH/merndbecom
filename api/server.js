const express = require("express")
const app = express()

app.use(express.json())

const frontendRoute = require("./router/frontend")

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/merndb")






app.use(express.static("public"))
app.use("/api",frontendRoute)
app.listen(5000,()=>{
    console.log("server is running on port : 5000")
})