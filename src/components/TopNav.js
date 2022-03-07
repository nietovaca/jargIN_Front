import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SearchBar from './searchBar.js'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.success.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.success.main, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
  color: [theme.palette.success.main],
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const TopNav = ({placeholder, data}) => {
  return (
      <AppBar position="sticky" sx={{bgcolor:'#FE2BFE'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{color: "yellow"}}
            />
          </Search>
          <Link to ="/interviews"><Typography sx={{ color: 'yellow' }}>INTERVIEW LIBRARY</Typography></Link>
          <Link to ="/resources"><Typography sx={{ color: 'yellow' }}>RESOURCES LIBRARY</Typography></Link>
          <Link to ="/"><HomeIcon sx={{ color: 'yellow' }}/></Link>
        </Toolbar>
      </AppBar>
  )
}

export default TopNav;
