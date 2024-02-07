import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { BsCircleFill, BsChevronCompactRight,  BsChevronCompactLeft } from "react-icons/bs";
import '../css/Slider.css';

const ImageSlider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState([]);

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

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className='slider'>
        
      <BsChevronCompactLeft className='left-arrow' onClick={prevSlide} />
      <BsChevronCompactRight className='right-arrow' onClick={nextSlide} />
      <div className='slider-container'>
        {products.map((product, index) => (
          <div
            className={index === slideIndex ? 'slide active' : 'slide'}
            key={index}
          >
            {index === slideIndex && (
              <img src={product.thumbnail} alt='travel image' className='image' />
            )}
          </div>
        ))}
      </div>
      <div className='slider-dots'>
        {products.map((_, index) => (
          <BsCircleFill
            key={index}
            className={index === slideIndex ? 'dot active' : 'dot'}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
