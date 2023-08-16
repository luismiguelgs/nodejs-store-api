require('dotenv').config()
const productsRouter = require('./routes/products')
//async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connection')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)
//products route
app.use(notFoundMiddleware)
app.use(errorMiddleware)
const port = process.env.PORT || 8080

const start = async () =>{
    try{
        //conectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    }catch(err){
        console.log(err);
    }
}
start()

