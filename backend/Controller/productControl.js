const productModel = require('../Model/product');

//POSTING PRODUCT
const Product = async (req, res) => {
    const { id, name, image, category, new_price, old_price } = req.body;

     // Validate required fields
     if (!name || !image || !category || new_price === undefined || old_price === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
    let products_id = await productModel.find({});

   let ids = products_id.length > 0 ? products_id[products_id.length - 1].id + 1 : 1;

    products = new productModel({ 
        id:ids, 
        name, 
        image, 
        category, 
        new_price, 
        old_price });
   
        await products.save();
        console.log('Product saved', products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    } return res.status(200).json({
        message: 'Product added', products
    })
};

//GETTING PRODUCT
const GetProduct = async (req, res) => {
    try {
        const getProduct = await productModel.find();
        
        if (getProduct.length === 0) {
            return res.status(404).json({
                message: 'No products found'
            });
        }
        return res.status(200).json({
            message: 'All products found',
            getProduct
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

//DELETING PRODUCT
const DeleteProduct = async (req, res) => {
    
    try {
        const productId = req.params.id;
        const deleteProduct = await productModel.findByIdAndDelete(productId);
        if (deleteProduct) {
            return res.status(200).json({ message: 'Product deleted', deleteProduct });
            log
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//NEW COLLECTION
const NewCollection = async (req,res) => {
    try {
        let newCollectionData = await productModel.find({});

        let newCollectionProduct = newCollectionData.slice(1).slice(-8);

        res.status(200).json({newCollectionData: newCollectionProduct});
    } catch (error) {
        console.error('Error fetching new collection:', error);
        res.status(500).json({ error: 'Failed to fetch new collection data' });
      }
};

//POPULAR IN WOMEN PRODUCTS
const PopularInWomen = async (req,res) => {
    try {
        let products = await productModel.find({ category:"women" });
        
        let popularInWomenProduct = products.slice(0,4);
        
        res.status(200).json({popularInWomenProduct});
    } catch (error) {
        console.error('Error fetching products popular in women:', error);
        res.status(500).json({ error: 'Failed to fetch products popular in women' });
      }  
};


module.exports = {
    Product,
    DeleteProduct,
    GetProduct,
    NewCollection,
    PopularInWomen
};