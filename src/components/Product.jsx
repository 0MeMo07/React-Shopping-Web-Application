import React, { useState } from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";


const darkTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.8)', 
      
    },
    secondary: {
      main: 'rgba(237, 242, 255, 0.8)',
    },
  },
});

const BoxSide = styled.div`
  float: left;
  padding: 17px;
`;

const İconSize = styled.i`
  width: 20px;
  height: 20px;
  text-align: center;
`;

// const Uppernumber = styled.div`
//   border: 2px solid #eee;
//   background-color: #eee;
//   width: 40px;
//   height: 20px;
//   text-align: center;
//   border-radius: 15px;
// `;

// const Heart = styled.i`
//   padding: 0px 0px;
//   position: absolute;
//   /* margin-left: 120px;
//   margin-top: 20px; */
//   left: 0;
// `;

const IconButton = styled(Button)`
  && {
    padding: 0; 
    min-width: unset; 
    width: auto; 
    left: 0;
  }
`;

const HeartIconEmpty = styled(IoMdHeartEmpty)`
  font-size: 24px;
  margin-left: 200px;
  margin-top: 20px;
  position: absolute;
`;

const HeartIcon = styled(IoIosHeart)`
  font-size: 24px;
  margin-left: 200px;
  margin-top: 20px;
  color:red;
  position: absolute;
`;
// const CartImg = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-bottom: 20px;
//   border-radius: 10px; 26
// `;

function Product({ product, total, money, basket, setBasket, value }) {

  const [ProductItem, setProductItem] = useState(checkIfProduct(product.id));

  function checkIfProduct(productİtemId){
    const ProductsItems = JSON.parse(localStorage.getItem('Products')) || [];
    return ProductsItems.includes(productİtemId)
  }
  
  const toggleProduct = () => {
    const productId = product.id;
    let ProductItems = JSON.parse(localStorage.getItem('Products')) || [];
  
    const productIndex = ProductItems.findIndex(item => item.id === productId);
  
    if (productIndex === -1) {
      
      ProductItems.push({ id: productId, quantity: 1 });
    } else {
      
      ProductItems[productIndex].quantity += 1;
    }
  
    localStorage.setItem('Products', JSON.stringify(ProductItems));
    setProductItem(!ProductItem);
  
    toast.success('Product successfully added to cart', {
      style: {
        boxShadow: 'none',
      },
    });
  };
  const basketItem = basket.find((item) => item.id === product.id) || [];

  const [productDetails, setProductDetails] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  const DeleteProduct = (productId) => {
    const DeleteProducts = JSON.parse(localStorage.getItem('Products')) || [];
    let updatedFavorites = [...DeleteProducts];
    let shouldRemoveProduct = false;
  
    updatedFavorites = updatedFavorites.map(product => {
      if (product.id === productId) {
        product.quantity -= 1; 
        if (product.quantity === 0) {
          shouldRemoveProduct = true; 
        }
      }
      return product;
    });

    if (shouldRemoveProduct) {
      updatedFavorites = updatedFavorites.filter(product => product.id !== productId);
    }
  
    localStorage.setItem('Products', JSON.stringify(updatedFavorites));
    setProductDetails(updatedFavorites);

    toast.error('The product has been successfully removed from your cart', {
      style: {
        boxShadow: 'none',
      },
    });
  };
  

  const [isFavorite, setIsFavorite] = useState(checkIfFavorite(product.id));

  function checkIfFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    return favorites.includes(productId);
  }

  const toggleFavorite = () => {
    const productId = product.id;
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

    // Favori durumunu güncelle
    setIsFavorite(!isFavorite);
  };



  return (
    <>
     <ThemeProvider theme={darkTheme} >
     <BoxSide>
        <Toaster />
        <Box
          className="product"
          p={2}
          bgcolor="#fff"
          border="1px solid #ddd"
          marginBottom="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="250px"
          height="250px"
          marginLeft="10px"
          borderRadius="20px"
        >
          {/* <Uppernumber>
            <Typography className="amount" variant="body1">
              {basketItem && basketItem.amount || 0}
            </Typography>
          </Uppernumber> */}
          <IconButton variant="icon" onClick={toggleFavorite}>
            {checkIfFavorite(product.id) ? <HeartIcon /> : <HeartIconEmpty />}
          </IconButton>

          <img
            src={product.thumbnail}
            alt=""
            style={{ width: "100px", height: "100px", marginBottom: "10px", borderRadius: "10px"}}
          />
          <Typography variant="h6">{product.title}</Typography>
          <Typography className="price" variant="body1">
            ${product.price}
          </Typography>
          <Box display="flex" alignItems="center" marginTop="10px">
            <Button
              onClick={() => DeleteProduct(product.id)}
              variant="outlined"
              sx={{ marginRight: "10px" }}
            >
              <İconSize><FaRegTrashCan /></İconSize>
            </Button>
            <Button
              variant="contained"
              disabled={total + product.price > money}
              onClick={toggleProduct}
              sx={{ marginRight: "10px" }}
            >
              <İconSize><MdAddShoppingCart/></İconSize>
            </Button>
          </Box>
        </Box>
      </BoxSide>
      </ThemeProvider>

      
    </>
  );
};

export default Product;
