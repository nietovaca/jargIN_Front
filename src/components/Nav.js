import React from 'react'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcon from '@mui/material/SvgIcon';


const homeIcon = SvgIcon;

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// export default function FloatingActionButtons {
//   return (
//
// )};

const Nav = (props) => {
  return (
    <>
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
    <Fab color="secondary" aria-label="edit">
      <EditIcon />
    </Fab>
    <Fab variant="extended">
        <HomeIcon sx={{ mr: 1 }} />
        Home
    </Fab>
    <Fab disabled aria-label="like">
        <FavoriteIcon />
    </Fab>
    </>
  )

};

export default Nav;



// <div>
// <Button
//   href="#"
//   variant='outlined'
//   color='secondary'>
//     {<HomeIcon color="secondary" />}
// </Button>
// </div>
