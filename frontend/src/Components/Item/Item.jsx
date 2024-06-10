import React from 'react';
import './Item.css';

function Item(props) {
  return (
    <div className='item'>
      <a href={`/product/${props.id}`}><img src={props.image} alt="" /></a>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-prices-new">
          ₹{props.new_price}
        </div>
        <div className="item-prices-old">
          ₹{props.old_price}
        </div>
      </div>
    </div>
  );
}

export default Item