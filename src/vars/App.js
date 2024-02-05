import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../app/Home';
import Cart from '../app/Cart';
import Favorites from '../app/Favorites';
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
              <SearchBar />
              <Cart />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
