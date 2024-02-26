import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../app/Home';
import Cart from '../app/Cart';
import Favorites from '../app/Favorites';
import Categories from '../app/Categories'
import SearchBar from '../components/Search';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
