import React, { useState } from 'react';
import './App.css';
import {  Route, Routes, } from 'react-router-dom';
import Filter from './components/Filter';
import Header from './components/Header';
import About from './components/About';
import PageNotFound from './components/PageNotFound';
import AddToCard from './components/AddToCard';
import Swal from 'sweetalert2';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Items added to cart successfully.',
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });
  };
  return (
    <div className='container'>
      <Header cartItems={cartItems}/>
      <Routes>
        <Route path="/" exact  element={<Filter addToCart={addToCart}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/card" element={<AddToCard cartItems={cartItems} />} />
        <Route path="*" element={<PageNotFound  />} />
      </Routes>
    </div>
  );
}
export default App;
