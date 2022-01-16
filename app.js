const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors=require('cors');

require("dotenv/config");


//Middleware
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("tiny"));

//router

const api = process.env.API_URL;

const productRouter = require("./routers/product");
const categoryRouter= require("./routers/category")
const userRouter= require("./routers/user")
const orderRouter= require("./routers/order")

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("the server is runing on HTTP://localhost:3000");
});
