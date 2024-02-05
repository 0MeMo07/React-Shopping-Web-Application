import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('https://dummyjson.com/docs/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setSortedProducts(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSortByChange = event => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    sortProducts(newSortBy, sortOrder);
  };

  const handleSortOrderChange = event => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    sortProducts(sortBy, newSortOrder);
  };

  const sortProducts = (sortBy, sortOrder) => {
    const sorted = [...products];

    sorted.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setSortedProducts(sorted);
  };

  return (
    <div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="name">Name</option>
          <option value="importance">Importance</option>
          <option value="price">Price</option>
        </select>
        <label>Sort Order:</label>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            {product.name} - Importance: {product.importance} - Price: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
