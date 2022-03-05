import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const LandingPage = (props) => {
  return (
    <>
    <Typography component="h1" variant="h4">JargIN</Typography>
    <Link to="/interviews"><Button variant="contained" color="secondary" disableElevation>Slay the Interview</Button></Link>
    </>
  )}

export default LandingPage;
