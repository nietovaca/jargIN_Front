import React, {Component} from 'react';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
// import logo from '~/public/jarginLogo.png'


import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {Card, CardMedia, CardContent, CardActions, Collapse} from '@mui/material'
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

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
    <>
    <Card sx={{ width: 1, height: 1}}>
      <CardMedia
        component="img"
        alt="JargIn Logo"
        image="bannerBlack.png"
      />
      <CardActions sx={{bgcolor:'#483362'}}>
        <Link to="/interviews"
          variant="body2">
          <Typography
            variant="h5"
             sx={{ml: 3}, {color:"#FEFE00"}}
          >
            Slay the Interview
          </Typography>
        </Link>
        <ExpandMore
           expand={expanded}
           onClick={handleExpandClick}
           aria-expanded={expanded}
           aria-label="show more"
         >
           <ExpandMoreIcon color="warning"  sx={{m: 3}}/>
         </ExpandMore>
     </CardActions>
     <Collapse in={expanded} timeout="auto" unmountOnExit sx={{bgcolor:'#483362'}}>
       <CardContent>
       <IconButton aria-label="Github.com" onClick={() => window.open('https://github.com/nietovaca/jargIN_Front')}>
          <GitHubIcon color='warning'fontSize='large' aria-label="GitHub"/>
        </IconButton>
        <IconButton aria-label="Reid's GitHub" onClick={() => window.open('https://github.com/billiam95')}>
          <Avatar sx={{ bgcolor: 'primary.main' }}aria-label="ReidShipley">
            RS
          </Avatar>
        </IconButton>
        <IconButton aria-label="Kevin's GitHub" onClick={() => window.open('https://github.com/kevinjcasey')}>
          <Avatar sx={{ bgcolor: 'error.main' }}aria-label="KevinCasey">
            KC
          </Avatar>
        </IconButton>
        <IconButton aria-label="email Vanessa" onClick={() => window.open('mailto:nietovaca@gmail.com')}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}aria-label="VanessaThrower">
          VT
        </Avatar>
        </IconButton>
       </CardContent>
     </Collapse>
    </Card>
    <Card sx={{padding: 3}}>
    <Typography variant="h4" sx={{color:"#FEFE00"}}>What is JargIN?</Typography>
    <Typography variant='body1'>JargIN is your "IN" to your next interview. Founded by a group of General Assembly Software Engineering students, Jargin is an application built for sharing resources, interview questions & answers all related to the web development field. Get ready to slay your next interview with Jargin.</Typography>
    </Card>
</>
  );
};

export default LandingPage;

// src="/static/images/avatar/1.jpg"
