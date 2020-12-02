const express = require('express');
const products = require('./data/products');
const app = express();


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

app.listen(3005, (err) => {
    console.log('server run well on port 3005.... 🙋 ');
})