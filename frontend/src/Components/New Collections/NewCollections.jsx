import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import axios from 'axios';

const NewCollections = () => {
  const [new_collection, setnew_collection] = useState([]);

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const response = await axios.get('https://goshoppy-backend.onrender.com/newcollection');
        // Ensure the data is an array
        if (Array.isArray(response.data.newCollectionData)) {
          setnew_collection(response.data.newCollectionData);
        } else {
          console.error('Expected an array but got:', response.data.newCollectionData);
          setnew_collection([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchNewCollection();
  }, []);

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections