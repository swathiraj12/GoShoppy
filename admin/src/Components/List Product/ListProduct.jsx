import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [all_product, setall_product] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getallproduct');
      console.log('Data fetched successfully:', response.data);
      setall_product(response.data.getProduct);
    } catch (error) {
      console.error('Error in fetching the products:', error);
    }
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchInfo();
  },[]);
  console.log('All products:', all_product);

  const remove_product = async (_id) => {
    await axios.delete(`http://localhost:4000/removeproduct/${_id}`);
    fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p className='listproduct-format-main-header' >Products</p>
        <p className='listproduct-format-main-header'>Title</p>
        <p className='listproduct-format-main-header'>Old Price</p>
        <p className='listproduct-format-main-header'>New Price</p>
        <p className='listproduct-format-main-header'>Category</p>
        <p className='listproduct-format-main-header'>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {all_product.length > 0 ? (
        all_product.map((product, index) => (
          <><div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img src={cross_icon} alt="" className="listproduct-remove-icon" onClick={() => remove_product(product._id)} />
          </div>
          <hr /></>
        ))
      ) : (
        <p>No Products Found.</p>
      )}
      </div>
    </div>
  )
}

export default ListProduct