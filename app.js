const express = require('express');
const mysql = require('mysql2');
const app = express();
const Product = require('./model/product');

app.get('/get', async (req, res) => {
    console.log('here')
    const product = await new Product("title");
    console.log('product', product)
    await product
        .save()
        .then(() => {
            res.json('Done');
        })
        .catch(err => console.log("Error while connecting", err));
})

app.listen(3306, () => {
    console.log('Connected at port 3306')
})