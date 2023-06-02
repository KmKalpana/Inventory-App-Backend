// @ts-nocheck
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require('cookie-parser')
const path=require("path")
const contactRoute=require("./routes/contactRoute")
const app = express()

// Set the strictQuery option before connecting to MongoDB
mongoose.set('strictQuery', false);

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
       origin:["http://localhost:3000","https://inventory-app-opal.vercel.app/"],
       credentials:true
}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes Middleware
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

// Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})
app.use("/api/contactus", contactRoute);
// Error Middleware 
app.use(errorHandler)
const PORT = process.env.PORT || 5000
// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
