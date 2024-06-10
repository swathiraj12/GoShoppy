const productControl = require('../Controller/productControl');
const express = require('express');
const route = express.Router();

route.post('/createproduct', productControl.Product);

route.get('/getallproduct', productControl.GetProduct);

route.delete('/removeproduct/:id', productControl.DeleteProduct);

route.get('/newcollection', productControl.NewCollection);

route.get('/popularinwomen', productControl.PopularInWomen);

module.exports = route;