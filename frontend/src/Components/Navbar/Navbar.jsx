import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import dropdown_icon from '../Assets/dropdown_icon.png';
import axios from 'axios';

const Navbar = () => {

  const [menu, setmenu] = useState("shop");
  const [products, setproducts] = useState([]);
  // const [productsname, setproductsname] = useState('');

  const {getTotalCartItems} = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  useEffect(() => {
    axios.get('http://localhost:4000/getallproduct')
    .then(res => {
      console.log('API response:', res.data);
      if (Array.isArray(res.data)) {
        setproducts(res.data);
      } else {
        console.error('API response is not an array', res.data);
      }
    })
    .catch(err => console.error('Error fetching products:', err));
  }, [])

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=''/>
            <p>GO<br/>SHOPPY</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none', color:'black'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("women")}}><Link style={{textDecoration:'none', color:'black'}} to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("men")}}><Link style={{textDecoration:'none', color:'black'}} to='/men'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none', color:'black'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>

        <input type="text" 
               className='border' 
               placeholder='Search'
              //  value={productsname}
              //  onChange={e => setproductsname(e.target.value)} 
              />

        {
          products.map((e,i) => (
            <div key={i}>
              {e.image}
            </div>
          ))
        }

        <div className="nav-login-cart">

          {
          localStorage.getItem('token')?<button className='login-btn' onClick={()=>{localStorage.removeItem('token'); window.location.replace('/')}}>Logout</button> : 
          <Link to='/login'><button>Login</button></Link> 
         }
            <Link to='/cart'><img src={cart_icon} alt=''/></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar