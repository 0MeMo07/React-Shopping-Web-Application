import React, { useState, useEffect } from 'react';
import Header from '../components/Search';
import Product from '../components/Product';
import Basket from '../components/Basket';
import '../css/Home.css'
import Loginİmage from '../components/Loginİmage'
import Slider from '../components/Slider';

export default function Home() {
    const [money] = useState(100000);
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const resetBasket = () => {
        setBasket([]);
        setTotal(0);
    };

    const handleSearch = (searchValue) => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredProducts(filtered);


        const uniqueCategories = Array.from(new Set(filtered.map(product => product.category)));
        setCategories(uniqueCategories);
    };

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

   

    return (
        <div className='Main'>
            <Header onSearch={handleSearch} />

            {total > 0 && (
                <Basket resetBasket={resetBasket} total={total} products={filteredProducts} basket={basket} />
            )}
            
           {/* <Slider slides={products.thumbnail} /> */}
           <Loginİmage/>
            <div className="categories-container">
                {categories.map(category => (
                    <div key={category} className="category-container">
                        <h2 className="category-title">{category}</h2>
                        <div className="product-container">
                            {filteredProducts
                                .filter(product => product.category === category)
                                .map(product => (
                                    <Product key={product.id} total={total} money={money} basket={basket} setBasket={setBasket} product={product}/>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



