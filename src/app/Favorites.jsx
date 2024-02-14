import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavNotFound from '../components/FavNotFound';
import { FaRegTrashCan } from "react-icons/fa6";
import Button from "@mui/material/Button";
import '../css/Favorites.css'
import '../css/Routes.css';

export default function Favorites({ product, total, money, basket, setBasket, value }) {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem('Favorites')) || [];
      const productsDetails = [];

      for (const id of favoriteIds) {
        const product = products.find(product => product.id === id);
        if (product) {
          productsDetails.push({
            thumbnail: product.thumbnail,
            price: product.price,
            title: product.title,
            description: product.description,
            id: product.id,
          });
        }
      }

      setProductDetails(productsDetails);
      setFavoritesCount(favoriteIds.length); 
    };

    fetchProductDetails();
  }, [products]);

  const DeleteFavorite = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    const updatedFavorites = favorites.filter((favId) => favId !== productId);
    localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));
    setProductDetails(prevDetails => prevDetails.filter(product => product.id !== productId));
    setFavoritesCount(prevCount => prevCount - 1); 
  };

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

  };
  const [ProductItem, setProductItem] = useState(checkIfProduct());

  function checkIfProduct(productİtemId){
    const ProductsItems = JSON.parse(localStorage.getItem('Products')) || [];
    return ProductsItems.includes(productİtemId)
  }
  
  const toggleProduct = (productId) => {
    let ProductItems = JSON.parse(localStorage.getItem('Products')) || [];
  
    const productIndex = ProductItems.findIndex(item => item.id === productId);
  
    if (productIndex === -1) {
      
      ProductItems.push({ id: productId, quantity: 1 });
    } else {
      
      ProductItems[productIndex].quantity += 1;
    }
  
    localStorage.setItem('Products', JSON.stringify(ProductItems));
    setProductItem(!ProductItem);
  
  };
  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="d-flex flex-row align-items-center">
        <Link to="/" className='FavİconLinks'>
          <i className="fa fa-long-arrow-left"></i>
          <span className="ml-2">Continue Shopping</span>
        </Link>
      </div>
      <hr />
      <h6 className="mb-0">Shopping Favorites</h6>
      <div className="d-flex justify-content-between">
        <span>You have {favoritesCount} items in your Favorites</span>
        {favoritesCount === 0 && <FavNotFound />}
      </div>
      {productDetails.map((product, index) => (
        <div key={index}>
          <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
            <div className="d-flex flex-row">
              <img className="rounded" src={product.thumbnail} width="40" alt={`${index}`} />
              <div className="ml-2">
                <span className="font-weight-bold d-block" id="Title">{product.title}</span>
                <span className="spec">{product.description}</span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center" id="Price">
              <span className="d-block ml-3 font-weight-bold">${product.price}</span>
              <Button className="d-block ml-3 font-weight-bold" onClick={() => toggleProduct(product.id)}><Link to="/cart" className='FavİconLinks'>Go To Cart </Link></Button>
              <i className="fa fa-trash-o ml-3 text-black-50" id="Trash" onClick={() => DeleteFavorite(product.id)}></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
