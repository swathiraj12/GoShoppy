import React, { useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useState } from 'react';
import axios from 'axios';

const Popular = () => {

  const [popularProducts, setpopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/popularinwomen');
        // console.log('API Response:', response); 

        if (Array.isArray(response.data.popularInWomenProduct)) {
          setpopularProducts(response.data.popularInWomenProduct);
        } else {
          console.error('Expected an array but got:', response.data.popularInWomenProduct);
          setpopularProducts([]);
        }

      } catch (err) {
        console.error('Error in fetching products:', err);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular