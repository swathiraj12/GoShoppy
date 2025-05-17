import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setimage] = useState(false);
  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log("product Details:", productDetails);
    let responseData;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    try {
      const response = await axios.post(
        "https://goshoppy-backend.onrender.com/upload",
        formData
      );
      responseData = response.data;

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);

        const addProductResponse = await axios.post(
          "https://goshoppy-backend.onrender.com/createproduct",
          product,
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
          });
          // Check if product was added successfully //
          if (addProductResponse.data) {
            alert("Product Added");
        } else {
            alert("Product Addition Failed");
        }
    } else {
        alert("Image Upload Failed");
    }
} catch (err) {
    console.error('Error:', err.message);
    alert("An error occurred"); 
    return;
}
}

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={() => Add_Product()} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
