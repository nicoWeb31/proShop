// const express = require('express');
// const products = require('./data/products');
// const dotenv = require('dotenv');
import express from 'express';
const app = express();
import products from './data/products.js'
import dotenv from 'dotenv';
import totoBDD from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';



dotenv.config();
//Bdd
totoBDD();

//morgan
//env morgan info request
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.get('/', (req, res) => {
    res.send('API is running... :)');
})

app.get('/api/products', (req, res) => {
    res.status(200).json({products})
})
app.get('/api/product/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.status(200).json({product})
})

const PORT = process.env.PORT || 3005

app.listen(PORT, (err) => {
    console.log(`server running well in ${process.env.NODE_ENV} on port ${PORT}... 🙂  `.yellow.bold);
})