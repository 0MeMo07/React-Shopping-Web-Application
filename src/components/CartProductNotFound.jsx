import React from 'react';
import '../css/CartProductNotFound.css'; 
import emptyImage from '../assets/CartEmpty.png';
function CartProductNotFound() {
    return (
        <div className="cart-not-found-container">
             <img src={emptyImage} alt="Empty" className="cart-empty-image" />
            <h2>Oops!</h2>
            <p>Your Cart list is empty.</p>
            <p>Why not add some items to your Cart?</p>
        </div>
    );
}

export default CartProductNotFound;