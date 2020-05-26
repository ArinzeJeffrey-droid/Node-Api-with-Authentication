const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

//configuring enviroment variables
require("dotenv").config()


//import routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")


//route middlewares
app.use(express.json())
app.use(cors())
app.use('/user', authRoute)
app.use('/user/post', postRoute)




//db connection
const db_uri = process.env.DATABASE_URI
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', () => {
    console.log("Database Connected Successfully");
})








app.listen(4000, () => console.log("Listening On Port 4000"))