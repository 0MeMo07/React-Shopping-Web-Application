import React, { useState, useEffect } from 'react';
import '../css/Slide.css';

function Slide() {
    const [products, setProducts] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const result = await response.json();
                setProducts(result.products);
            } catch (error) {
                console.error('error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) =>
                prevIndex === products.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [products]);


    return (
        <div className="slider-container">
            <div className="slider">
                <div className="slides">
                    {products.map((product, index) => {
                        const prevIndex = index === 0 ? products.length - 1 : index - 1;
                        const nextIndex = index === products.length - 1 ? 0 : index + 1;
                        return (
                            <div
                                key={index}
                                className={`slide ${
                                    index === slideIndex ? 'active' : index === nextIndex ? 'next' : index === prevIndex ? 'prev' : ''
                                }`}
                            >
                                <img className="image1" src={products[prevIndex].thumbnail} alt={products[prevIndex].name} style={{ width: "300px", height: "200px", borderRadius: "10px" }} />
                                <img className="image2" src={product.thumbnail} alt={product.name} style={{ width: "550px", height: "450px", borderRadius: "10px" }} />
                                <img className="image3" src={products[nextIndex].thumbnail} alt={products[nextIndex].name} style={{ width: "300px", height: "200px", borderRadius: "10px" }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Slide;
