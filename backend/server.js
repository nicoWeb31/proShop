// const express = require('express');
// const products = require('./data/products');
// const dotenv = require('dotenv');
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import totoBDD from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';

import productRoute from './routes/productRoute.js' 



dotenv.config();
//Bdd
totoBDD();

//morgan
//env morgan info request
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}


//_____________________ROUTE_____________________________________
app.get('/', (req, res) => {
    res.send('API is running... :)');
})

app.use("/api/products",productRoute)



//_____________________SERVER_____________________________________

const PORT = process.env.PORT || 3005

app.listen(PORT, (err) => {
    console.log(`server running well in ${process.env.NODE_ENV} on port ${PORT}... 🙂  `.yellow.bold);
})