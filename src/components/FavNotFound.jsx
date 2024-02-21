import React from 'react';
import '../css/FavNotFound.css'; 
import emptyImage from '../assets/FavBrokenHeart.png';
function FavNotFound() {
    return (
        <div className="not-found-container">
             <img src={emptyImage} alt="Empty" className="empty-image" />
            <h2>Oops!</h2>
            <p>Your favorites list is empty.</p>
            <p>Why not add some items to your favorites?</p>
        </div>
    );
}

export default FavNotFound;
