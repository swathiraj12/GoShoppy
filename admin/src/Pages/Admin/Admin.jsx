import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/Ad Product/AddProduct';
import ListProduct from '../../Components/List Product/ListProduct';

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
    </div>
  )
}

export default Admin