import express from 'express'
import mongoose from "mongoose"
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js'
import jwt from "jsonwebtoken"
import authorizeUser from './lib/jwtMiddleware.js'


//to connect to mongoDB
const mongoURI = "mongodb+srv://admin:1234@cluster0.ot8etbv.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoURI).then(
    () => {
        console.log("connected to monoDB")
    }
).catch(
    () => {
        console.log("Error connecting to mongoDB")
    }
)

//to create express app
const app = express()
app.use(express.json()) // to arrange request 

app.use(authorizeUser) // to authorize user for protected routes

app.use("/users", userRouter) // localhost:3000/users
app.use("/products", productRouter) // localhost:3000/products

//to start server
app.listen(3000,
    ()=>{
        console.log("server started")
    }
)