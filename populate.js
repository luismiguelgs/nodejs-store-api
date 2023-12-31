require('dotenv').config()

const connectDB = require('./db/connection')
const Product = require('./models/product')

const jsonProducts = require('./db/products.json')

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('Success!!!');
        process.exit(0);
    }catch(error){
        console.log(error);
    }
}
start()