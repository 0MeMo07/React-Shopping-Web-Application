import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FaFilter } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import '../css/Routes.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const BoxSide = Styled.div`
  position: fixed;
  z-index: 100;
  width: 100%; 
  top:0;
  right:0;
  left:0;
`;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ product, total, money, basket, setBasket, onSearch }) {
  // const [marginTop, setMarginTop] = useState(0);

  // useEffect(() => {
  //   const $sidebar = document.getElementById('menu'); 
  //   const offsetTop = $sidebar.offsetTop; 

  //   const handleScroll = () => {
  //     const newMarginTop = Math.max(0, window.scrollY - offsetTop + 1);
  //     setMarginTop(newMarginTop);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const totalQuantity = basket ? basket.reduce((acc, item) => acc + item.amount, 0) : 0;

  const [value, setValue] = useState('');

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu>
      <MenuItem onClick={handleMenuClose}></MenuItem>
      <MenuItem onClick={handleMenuClose}></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <FaFilter />
          </Badge>
        </IconButton>
        <p>Filter</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <FaRegStar />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FaShoppingCart />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <ThemeProvider theme={darkTheme}>
      <BoxSide>
      <Box sx={{ flexGrow: 1 }} id="menu">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            <Link to="/" className="İconLinks"><IoMdHome className="İconLinks"/></Link>
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MeMo Shoping
            </Typography>
            
            <Search>
              <SearchIconWrapper>
                <IoSearchSharp />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  onSearch(e.target.value);
                }}
              />
            </Search>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <FaFilter />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <Link to="/Favorites" className='İconLinks'><FaRegStar className='İconLinks'/></Link>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Badge className="amount" badgeContent={totalQuantity} color="error">
                  <Link to="/cart" className="İconLinks"><FaShoppingCart className="İconLinks"/></Link>
                </Badge>
              </IconButton>
            </Box>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <IoMenu />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      </BoxSide>
    </ThemeProvider>

  );
}
