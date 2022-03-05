import React, {Component} from 'react';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
// import logo from '~/public/jarginLogo.png'


import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {Card, CardMedia, CardContent, CardActions, Collapse} from '@mui/material'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

// const [expanded, setExpanded] = useState(false);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LandingPage = (props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);}
  return (
    <Card sx={{ width: 1}}>
      <CardMedia
        component="img"
        alt="JargIn Logo"
        height="345"
        image="jarginLogo.png"
      />
      <CardContent>

      </CardContent>
      <CardActions>
        <Link to="/interviews"
          variant="body2">
          <Button
            disableElevation variant="contained" color="secondary">
            Slay the Interview
          </Button>
        </Link>
        <ExpandMore
           expand={expanded}
           onClick={handleExpandClick}
           aria-expanded={expanded}
           aria-label="show more"
         >
           <ExpandMoreIcon color="primary"/>
         </ExpandMore>
     </CardActions>
     <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>

       </CardContent>
     </Collapse>
    </Card>
  );
};

export default LandingPage;
