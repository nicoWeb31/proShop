// const express = require('express');
// const products = require('./data/products');
// const dotenv = require('dotenv');
import path from 'path';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import totoBDD from './config/db.js';
import morgan from 'morgan'; 
import colors from 'colors';

import productRoute from './routes/productRoute.js';
import usersRoute from './routes/usersRoute.js';
import orderRoute from './routes/orderRoutes.js'
import errMidlleware from './middleware/errMidlleware.js';
import uploadRoute from './routes/uploadRoute.js';


dotenv.config();
//Bdd
totoBDD();

//morgan
//env morgan info request
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
//parser
app.use(express.json())

//static files
const __dirname = path.resolve();
console.log("🚀 ~ file: server.js ~ line 55 ~ __dirname", __dirname+'/uploads/')
app.use('/uploads',express.static(__dirname + '/uploads/'))

//_____________________ROUTE_____________________________________
app.get('/', (req, res) => {
    res.send('API is running... :)');
})
//propducts
app.use("/api/products",productRoute)
//users
app.use("/api/users", usersRoute)
//order
app.use('/api/orders', orderRoute)

//upoload 
app.use('/api/upload', uploadRoute)

//paypal 
app.use('/api/config/paypal', (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

//404
app.use(errMidlleware.notFound)



//_____________________Err midlleware_____________________________________
app.use(errMidlleware.errorHandler)



//_____________________SERVER_____________________________________

const PORT = process.env.PORT || 3005

app.listen(PORT, (err) => {
    console.log(`server running well in ${process.env.NODE_ENV} on port ${PORT}... 🙂  `.yellow.bold);
})