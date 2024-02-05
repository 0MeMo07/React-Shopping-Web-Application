import React from "react";
import BasketItem from "./Basketitem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from 'styled-components';
import { BsCartX } from "react-icons/bs";

function Basket({ basket, products, total, resetBasket }) {

  const BoxBottom = styled.div`
  text-align: center;
  background-color: rgb(255 255 255 / 50%);
  border-radius: 0% 0% 15px 15px;
  `;

  const ShopCartX = styled.i`
  width: 50px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  `;

  return (
    <>
      <BoxBottom>
        <Box>
          
          {basket.map((item) => (
            <BasketItem item={item} product={products.find((p) => p.id === item.id)} />
          ))}
          <Box mt={2}>
            <Typography variant="h6">Total: ${total}</Typography>
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={resetBasket}>
              <ShopCartX><BsCartX/></ShopCartX>
            </Button>
          </Box>
        </Box>
      </BoxBottom>
    </>
  );
}

export default Basket;
