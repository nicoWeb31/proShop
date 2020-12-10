// const express = require('express');
// const products = require('./data/products');
// const dotenv = require('dotenv');
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