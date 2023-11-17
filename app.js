require("dotenv").config();
require('express-async-errors')
const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

const connectDB = require("./DB/connect");
const productRoutes = require('./routes/productR')

const notFoundMiddleware = require("./middleWare/notFound");
const errorHandlerMiddleware = require("./middleWare/error-handler");

app.use(express.json());
app.use('/api/product', productRoutes)

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Click me</a>');
});



const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    app.listen(port, () => {
      console.log(`port is running at ${port}`);
    });
  } catch (error) {
    console.log(`somethings wrong with your port`, error);
  }
};
start();
