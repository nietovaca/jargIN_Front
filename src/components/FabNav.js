import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const FabNav = (props) => {
  return (
    <>
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
    <Fab color="secondary" aria-label="edit">
      <EditIcon />
    </Fab>
    <Fab variant="extended">
        <HomeIcon color="primary"sx={{ mr: 1 }} />
        Home
    </Fab>
    <Fab disabled aria-label="like">
        <FavoriteIcon />
    </Fab>
    </>
  )
};

export default FabNav;
