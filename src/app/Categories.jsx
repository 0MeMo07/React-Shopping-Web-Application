import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavNotFound from '../components/FavNotFound';
import Header from '../components/Search'
import Button from "@mui/material/Button";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import "../css/ecommerce-category-product.css";
import '../css/filter.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components'
import FavoriteHeart from '../components/FavoriteAddHeart'


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
`;

const HeartIcon = styled(IoIosHeart)`
  font-size: 24px;
  color:red;
`;

function Filter() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
    setProductItem(!ProductItem)

    toast.success('Product successfully added to cart', {
      style: {
        boxShadow: 'none',
      },
    });
  
  }
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const result = await response.json();

            if (result && Array.isArray(result.products)) {
                setProducts(result.products);
                setFilteredProducts(result.products);
                
                const uniqueCategories = Array.from(new Set(result.products.map(product => product.category)));
                setCategories(uniqueCategories);
            } else {
                console.error('Invalid data structure:', result);
                setProducts([]);
                setFilteredProducts([]);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []); 

const handleSearch = (searchValue) => {
  const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  setFilteredProducts(filtered);


  const uniqueCategories = Array.from(new Set(filtered.map(product => product.category)));
  setCategories(uniqueCategories);
};
const handleChange = (event) => {
  const selectedCategory = event.target.value;
  let filteredProducts = [];
  if (selectedCategory === "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === selectedCategory);
  }
  setFilteredProducts(filteredProducts);

  const uniqueCategories = Array.from(new Set(filteredProducts.map(product => product.category)));
  setCategories(uniqueCategories);
};



const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');

const handlePriceFilter = () => {
  const minPriceValue = parseFloat(minPrice);
  const maxPriceValue = parseFloat(maxPrice);

  if (isNaN(minPriceValue) || isNaN(maxPriceValue)) {
    toast.error('Please enter valid numeric values for both minimum and maximum prices', {
      style: {
        boxShadow: 'none',
      },
    });
    return;
  }

  const filteredByPrice = products.filter(product => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  setFilteredProducts(filteredByPrice);
};

  return (
    <>
    <Toaster/>
    <Header onSearch={handleSearch}/>
    <div className='MainContainer' style={{ display: 'flex' }}>
    <FormControl className="FilterBar">
         
          
         <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           className="categories"
           defaultValue="All"
           name="radio-buttons-group"
           onChange={handleChange}
         >
           <FormLabel id="demo-radio-buttons-group-label" className='CategoriesText'>Categories</FormLabel>
           {/* <Typography className="line">---------------------------------------------------</Typography> */}
           <FormControlLabel value="All" control={<Radio />} label="All" />
           <FormControlLabel value="smartphones" control={<Radio />} label="Smart Phones" />
           <FormControlLabel value="laptops" control={<Radio />} label="Laptops" />
           <FormControlLabel value="fragrances" control={<Radio />} label="fragrances" />
           <FormControlLabel value="skincare" control={<Radio />} label="skincare" />
           <FormControlLabel value="groceries" control={<Radio />} label="groceries" />
           <FormControlLabel value="home-decoration" control={<Radio />} label="home decoration" />
         </RadioGroup>

         
         <Box sx={{ width: 300 }} className="Filterprice">
            <Typography className='priceText'>Price</Typography>
            <div style={{ display: 'flex', gap: '8px' }}>
              <TextField
                  className="MinPrice"
                  label="Min Price"
                  variant="standard"
                  size="small"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <TextField
                  className="MaxPrice"
                  label="Max Price"
                  variant="standard"
                  size="small"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <Button variant="contained" onClick={handlePriceFilter} className='Price-Filter-Button'>Filter</Button>
          </Box>
     </FormControl>
    <div className='Product-Container-Catogory'>

    {categories.map(category => (
    <div key={category} className="filter-category-container">
      <h2 className="Filter-category-title">{category}</h2>
      <div className="Filter-product-container">
      {filteredProducts
        .filter(product => product.category === category)
        .map((product, index) => (
          <div className="ProductContainer page-wrapper" key={index}>
            <div className="ProductContainer page-wrapper" key={index}>
              <div className="page-inner">
                <div className="row">
                  <div className="el-wrapper">
                    <div className="box-up">
                      <img className="img" id="Favİtemİmage" src={product.thumbnail} alt="" />
                      <div className="img-info">
                        <div className="info-inner">
                          <span className="p-name">{product.title}</span>
                          {/* <span className="p-company">MeMo</span> */}
                        </div>
                        <div className="a-size">{product.description}</div>
                      </div>
                    </div>

                    <div className="box-down">
                      <div className="h-bg">
                        <div className="h-bg-inner"></div>
                      </div>
                      <Link className="cart">
                        <span className="price">${product.price}</span>
                        <span className="add-to-cart">
                          <span className="txt" >
                            <Link className='GoToCartLink' onClick={() => toggleProduct(product.id)}>Add Cart</Link>
                  
                            <FavoriteHeart productId={product.id}  id="PFTrash"/>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
    </div>

    </div>
    </>
  );
}

export default Filter;


  
         