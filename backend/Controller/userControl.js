const userModel = require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = "shoppers";

const SignUp = async (req,res) => {

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    
    const { name, email, password } = req.body;

    try {
        let existUser = await userModel.findOne({ email:email });

        if (existUser) {
            return res.status(400).json({message:'User Already Exist'})
        }

    const pwd = bcrypt.hashSync(password, 10)

    const newUser = new userModel({
        name: name,
        email: email,
        password: pwd,
        cartData: cart
    })

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to create user' });
    }

    // const token = jwt.sign({id: newUser._id}, key, {expiresIn:'1h'});
    // console.log('Generated Token:', token);

    // return res.json({success: true, token, newUser });
};

const Login = async (req,res) => {
    const {email, password} = req.body;
    try {
        console.log('Login attempt for email:', email);

        let existUser = await userModel.findOne({email:email});
        console.log('Found user:', existUser);

        if (!existUser) {
            return res.json({message:'Please Signup, User is not found'})
        }

    const mypwd = bcrypt.compareSync(password, existUser.password);
    if (!mypwd) {
        return res.json({message:'Password incorrect'});
    }

    const token = jwt.sign({id: existUser._id}, key, {expiresIn:'1h'});
    console.log('Generated Token:', token);

    return res.json({success: true, token, existUser });
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
}
};

// Middleware to authenticate user
const FetchUser = async (req,res, next) => {
    const token = req.header('token');
    console.log('Received token:', token);

if (!token) {
    console.log('Token not provided');
    return res.status(401).send({errors: 'Please authenticate using a valid token'});
} try {
        const data = jwt.verify(token, key);
        console.log('Decoded JWT data:', data);
        req.existUser = data;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        res.status(401).send({errors: 'Please authenticate using valid token'})
    }
};

const AddToCart = async (req,res) => {
    try {
        console.log('req.existUser:', req.existUser);

        if (!req.existUser || !req.existUser.id) {
            throw new Error('User ID not found in request');
        }

        let userData = await userModel.findOne({_id:req.existUser.id});
        console.log('User Data:', userData);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;
        }
        userData.cartData[req.body.itemId] += 1;

        await userModel.findOneAndUpdate({_id:req.existUser.id}, {cartData:userData.cartData});

        res.send('Added')
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).send({ errors: 'Failed to add to cart' });
    }
};

const RemoveFromCart = async (req,res) => {
    console.log('removed', req.body.itemId);

    let userData = await userModel.findOne({_id:req.existUser.id});
    console.log('User Data:', userData);

    if (userData.cartData[req.body.itemId]>0) {
        userData.cartData[req.body.itemId] -= 1;
    }

    await userModel.findOneAndUpdate({_id:req.existUser.id}, {cartData:userData.cartData});

    res.send('Removed')
}

module.exports = {
    SignUp,
    Login,
    AddToCart,
    FetchUser,
    RemoveFromCart
 }