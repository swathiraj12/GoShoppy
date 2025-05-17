import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../Assets/dropdown_icon.png";
import axios from "axios";

const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const [products, setproducts] = useState([]);
  console.log(products);
  const [searchInput, setSearchInput] = useState("");

  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const FilterSearch = async () => {
    try {
      const dummySearch = await axios.get(
        "https://goshoppy-backend.onrender.com/getallproduct"
      );
      const viewData = dummySearch.data;
      console.log("Fetched Data:", viewData);
      console.log("Dummy Search:", dummySearch);

      const SearchData = viewData.getProduct;
      console.log("Search Data:", SearchData);
      setproducts(SearchData);
    } catch (err) {
      console.log("Error in fetching the Search Data", err);
    }
  };

  useEffect(() => {
    FilterSearch();
  }, []);
  

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={dropdown_icon}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("women");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/women">
            Women
          </Link>
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("men");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/men">
            Men
          </Link>
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div>
      <div>
        <input className="search-container"
          type="text"
          placeholder="Type Here"
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
        <button className="search-button">Search</button>
      </div>

      <div className="search-input-data">
        {searchInput.length > 0 &&
          products
            .filter((item) => {
              return searchInput === ""
                ? item
                : item.name.toLowerCase().includes(searchInput);
            })
            .map((filteredItem, index) => (
              <div key={index}>{filteredItem.name}</div>
            ))}
      </div>
      </div>

      

      <div className="nav-login-cart">
        {localStorage.getItem("token") ? (
          <button
            className="login-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
