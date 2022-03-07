import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect} from 'react';
import axios from 'axios';
// bringing data in for searchability?
import App from '../App.js';

const SearchBar = ({placeholder, data}) => {

  const [newBook, setNewBook] = useState({
    type: {'book':'video'},
    user: '',
    title: '',
    description: '',
    link: ''
  })

  const [resource, setResource] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setNewBook(res.data)
      setResource(res.data)
    })
  }, [])

// array map functions
const resourceArray = resource.map((resource, index) => {
  return (
      <div key={resource._id}>
        <p>{resource.user}</p>
        <p>{resource.title}</p>
        <p>{resource.type}</p>
        <p>{resource.description}</p>
        <a href={resource.link} target="_blank">{resource.link}</a>
      </div>
  )
})



  return(
      <div className="search">
          <div className="searchInputs">
              <input type="text" placeholder={placeholder} />
              <div className="searchIcon"><SearchIcon/></div>
          </div>
          <div className="dataResult">
            {resourceArray}
          </div>
      </div>


  )
}

export default SearchBar;
