require("dotenv").config()

const connectDB = require('./DB/connect')

const product = require('./model/productM')

const jsonProducts = require('./product.json')


const start = async () => {
  
  try {
    await connectDB(process.env.MONGO);
      await product.deleteMany();
      await product.create(jsonProducts);
  } catch (error) {
    console.log(`somethings wrong with your port`, error);
  }
};
start();

