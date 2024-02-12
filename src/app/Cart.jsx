import React, { useState, useEffect } from 'react';
import CartProductNotFound from '../components/CartProductNotFound';
import { Link } from 'react-router-dom';
import { BsChevronCompactRight,  BsChevronCompactLeft } from "react-icons/bs";
import '../css/Cart.css'

export default function Cart() {
  // const[total, SetTotal] = useState('')
  // useEffect(() => {
  //   setTotal(
  //       basket.reduce((acc, item) => {
  //           return acc + item.total;
  //       }, 0)
  //   );
  // }, [basket]);


  const [ProductCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    const ProductCount = JSON.parse(localStorage.getItem('Products')) || [];
    setProductCount(ProductCount.length);
  }, []);

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
      const ProductIds = JSON.parse(localStorage.getItem('Products')) || [];
      const productsDetails = [];
    
      for (const productInfo of ProductIds) {
        const productId = productInfo.id; 
        const productQuantity = productInfo.quantity; 
        const product = products.find(product => product.id === productId);
    
        if (product) {
          const productDetail = {
            thumbnail: product.thumbnail,
            price: product.price,
            title: product.title,
            description: product.description,
            id: product.id,
            quantity: productQuantity, 
          };
          productsDetails.push(productDetail);
        }
      }
    
      setProductDetails(productsDetails);
    };

    fetchProductDetails();
  }, [products]);

  const DeleteProduct = (productId) => {
    const DeleteProducts = JSON.parse(localStorage.getItem('Products')) || [];
    const updatedFavorites = DeleteProducts.filter((product) => product.id !== productId);
    localStorage.setItem('Products', JSON.stringify(updatedFavorites));
    setProductDetails(prevDetails => prevDetails.filter(product => product.id !== productId));
    setProductCount(prevCount => prevCount - 1); 
  };

  const AddQuantity = (productId) => {
    const productsInLocalStorage = JSON.parse(localStorage.getItem('Products')) || [];
    const productIndex = productsInLocalStorage.findIndex(product => product.id === productId);
    if (productIndex !== -1 && productsInLocalStorage[productIndex].quantity > 0) {
      productsInLocalStorage[productIndex].quantity += 1;

      localStorage.setItem('Products', JSON.stringify(productsInLocalStorage));
      
      const updatedProductDetails = productDetails.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });
      
      setProductDetails(updatedProductDetails);
    }
  };

  const RemoveQuantity = (productId) => {
    const productsInLocalStorage = JSON.parse(localStorage.getItem('Products')) || [];
    const productIndex = productsInLocalStorage.findIndex(product => product.id === productId);
    
    if (productIndex !== -1 && productsInLocalStorage[productIndex].quantity > 0) {
      productsInLocalStorage[productIndex].quantity -= 1;
  
      if (productsInLocalStorage[productIndex].quantity === 0) {
        const updatedProductsInLocalStorage = productsInLocalStorage.filter(product => product.id !== productId);
        localStorage.setItem('Products', JSON.stringify(updatedProductsInLocalStorage));
        
        const updatedProductDetails = productDetails.filter(product => product.id !== productId);
        setProductDetails(updatedProductDetails);
        setProductCount(prevCount => prevCount - 1); 
      } else {
        localStorage.setItem('Products', JSON.stringify(productsInLocalStorage));
        
        const updatedProductDetails = productDetails.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity - 1
            };
          }
          return product;
        });
        setProductDetails(updatedProductDetails);
      }
    }
  };

  let totalPrice = 0;
  productDetails.map((product, index) => {
    totalPrice += product.price * product.quantity;
  });


  
  
  return (
    <>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                <Link to="/" className='FavİconLinks'>
                  <i className="fa fa-long-arrow-left"></i>
                  <span className="ml-2">Continue Shopping</span>
                </Link>
              </div>
              <hr />
              <h6 className="mb-0">Shopping Favorites</h6>
              <div className="d-flex justify-content-between">
                <span>You have {ProductCount} items in your Favorites</span>
                {ProductCount === 0 && <CartProductNotFound />}
              </div>

              {productDetails.map((product, index) => (
              <div key={index}>
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                  <div className="d-flex flex-row">
                    <img className="rounded" src={product.thumbnail} width="40" alt={`${index}`} />
                    <div className="ml-2">
                      <span className="font-weight-bold d-block">{product.title}</span>
                      <span className="spec">{product.description}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="d-block ml-5 font-weight-bold">${product.price * product.quantity}</span>
                    <span className="d-block ml-5 font-weight-bold" id= "AddQuantity-RemoveQuantity">
                    <BsChevronCompactLeft onClick={() => RemoveQuantity(product.id)} id="Leftİcon"/>
                    {product.quantity}
                    <BsChevronCompactRight onClick={() => AddQuantity(product.id)} id="Rightİcon"/>
                    </span>
                    <i className="fa fa-trash-o ml-3 text-black-50" id="Trash" onClick={() => DeleteProduct(product.id)}></i>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center">
                <span>Card details</span>
                <img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30" alt="Card Type" />
              </div>

              {/* Repeat this block for each card type */}
              <label className="radio">
                <input type="radio" name="card" value="payment" checked />
                <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" /></span>
              </label>
              {/* Repeat block end */}

              <div>
                <label className="credit-card-label">Name on card</label>
                <input type="text" className="form-control credit-inputs" placeholder="Name" />
              </div>
              <div>
                <label className="credit-card-label">Card number</label>
                <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="credit-card-label">Date</label>
                  <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">CVV</label>
                  <input type="text" className="form-control credit-inputs" placeholder="342" />
                </div>
              </div>
              <div>
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Subtotal</span>
                <span>{totalPrice }</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Total (Incl. taxes)</span>
                <span>{totalPrice}</span>
              </div>
              <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button">
                <span>{totalPrice}</span>
                <span>Checkout <i className="fa fa-long-arrow-right ml-1"></i></span>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
