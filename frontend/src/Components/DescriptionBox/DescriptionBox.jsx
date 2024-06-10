import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className='description-box'>
            <div className="description-box-nav">
                <div className="description-box-nav-box">Description</div>
                <div className="description-box-nav-box fade">Reviews(130)</div>
            </div>
            <div className="description-box-description">
                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services
                    over the internet. It serves as a vrtual marketplace where businesses and individuals can showcase their
                    products, interact with customers, and conduct transactions without the need for a physical presence.
                    E-commerce websites have gained immense popularity due to their convenience, accessibility and the global
                    reach they offer.
                </p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices
                    and any available variations (for example, sizes, colours). each product usually has it's own dedicated
                    page wiyh relevany information.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox