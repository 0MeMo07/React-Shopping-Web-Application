
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { IoIosHeart} from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const FilterComponent = () => {
    const FilterId = 'primary-search-account-menu-fliter';
    const FilterMenu = (
    <Menu
      FilteranchorEl={filterMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={FilterId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isFilterMenuOpen}
      onClose={handleFilterMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="white">
          <Badge color="error">
            <BiCategory/>
          </Badge>
        </IconButton>
        <p>Category</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={favoritesCount} color="error">
            <IoIosHeart />
          </Badge>
        </IconButton>
        <Link to="/Favorites" className='İconLinks'>Favorites</Link>
      </MenuItem>
      <MenuItem onClick={handleFilterMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FaShoppingCart />
        </IconButton>
        <Link to="/cart" className="İconLinks">Cart</Link>
      </MenuItem>
    </Menu>
  );

    return(
        <>
        </>
    );
};

export default FilterComponent;
