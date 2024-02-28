import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { IoIosHeart, IoMdHeartEmpty } from 'react-icons/io';

const IconButton = styled(Button)`
  && {
    padding: 0; 
    min-width: unset; 
    width: auto; 
    left: 0;
    margin-top: auto;
    padding-left: 100px;
  }

  @media (max-width: 767px) {
    && {
    padding: 0; 
    min-width: unset; 
    width: auto; 
    left: 0;
    margin-top: auto;
    padding-left: 65px;
  }
  }
  
`;

const HeartIconEmpty = styled(IoMdHeartEmpty)`
  font-size: 24px;
`;

const HeartIcon = styled(IoIosHeart)`
  font-size: 24px;
  color: red;
`;

function FavoriteAddHeart({ productId }) {
    
  const [isFavorite, setIsFavorite] = useState(checkIfFavorite(productId));

  function checkIfFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    return favorites.includes(productId);
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];

    if (!isFavorite) {
      favorites.push(productId);
      localStorage.setItem('Favorites', JSON.stringify(favorites));

      toast.success('Product successfully added to favorites', {
        style: {
          boxShadow: 'none',
        },
      });
    } else {
      // Favoriden kaldır
      const updatedFavorites = favorites.filter((favId) => favId !== productId);
      localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));

      toast.success('Product removed from favorites', {
        style: {
          boxShadow: 'none',
        },
      });
    }
    setIsFavorite(!isFavorite); 
  };

  return (
    <IconButton variant="icon" onClick={toggleFavorite}>
      {isFavorite ? <HeartIcon /> : <HeartIconEmpty />}
    </IconButton>
  );
}

export default FavoriteAddHeart;
