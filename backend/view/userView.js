const userControl = require('../Controller/userControl')
const express = require('express');
const route = express.Router();

route.post('/signup', userControl.SignUp);

route.post('/login', userControl.Login);

route.post('/addtocart', userControl.AddToCart, userControl.FetchUser);

route.post('/removefromcart', userControl.RemoveFromCart, userControl.FetchUser);

module.exports = route;