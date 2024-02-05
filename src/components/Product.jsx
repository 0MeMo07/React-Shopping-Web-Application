import React from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';


const BoxSide = styled.div`
  float: left;
  padding: 17px;
`;

const İconSize = styled.i`
  width: 20px;
  height: 20px;
  text-align: center;
`;

const Uppernumber = styled.div`
  border: 2px solid #eee;
  background-color: #eee;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 15px;
`;

// const CartImg = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-bottom: 20px;
//   border-radius: 10px;
// `;

function Product({ product, total, money, basket, setBasket, value }) {
  const basketItem = basket.find((item) => item.id === product.id);

  const addBasket = () => {
    const checkBasket = basket.find((item) => item.id === product.id);
    if (checkBasket) {
      checkBasket.amount += 1;
      setBasket([
        ...basket.filter((item) => item.id !== product.id),
        checkBasket,
      ]);
    } else {
      setBasket([
        ...basket,
        {
          id: product.id,
          amount: 1,
        },
      ]);
    }
  
    setTimeout(() => {
      toast.success('The product has been successfully added to the cart', {
        style: {
          boxShadow: 'none',
        },
      });
    }, 0);
  };

  const removeBasket = () => {
    const currentBasket = basket.find((item) => item.id === product.id);
    const basketWithoutCurrent = basket.filter(
      (item) => item.id !== product.id
    );

    currentBasket.amount -= 1;
    if (currentBasket.amount === 0) {
      setBasket([...basketWithoutCurrent]);
    } else {
      setBasket([...basketWithoutCurrent, currentBasket]);
    }
  };

  return (
    <>

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
          <Uppernumber>
            <Typography className="amount" variant="body1">
              {basketItem && basketItem.amount || 0}
            </Typography>
          </Uppernumber>
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
              disabled={!basketItem}
              onClick={removeBasket}
              variant="outlined"
              sx={{ marginRight: "10px" }}
            >
              <İconSize><FaRegTrashCan /></İconSize>
            </Button>
            <Button
              variant="contained"
              disabled={total + product.price > money}
              onClick={addBasket}
              sx={{ marginRight: "10px" }}
            >
              <İconSize><MdAddShoppingCart/></İconSize>
            </Button>
          </Box>
        </Box>
      </BoxSide>
    </>
  );
}

export default Product;
