import {useState, useEffect} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

// ============= Content Components ============ //

import FabNav from './components/FabNav'
import TopNav from './components/TopNav'
import ShowInterview from './components/ShowInterview'

// ============== MUI Components ============= //
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const App = () => {

// =========== States ================= //

//DB Interview
const [interview, setInterview] = useState([])
const [showNewInterviewForm, setShowNewInterviewForm] = useState(false)
const [showInterviewDetails, setShowInterviewDetails] = useState(false)

const [resource, setResource] = useState([])


// form displays on edit buttons
const [displayEditInterviewForms, setDisplayEditInterviewForms] = useState([false])

const [selectInterview, setSelectInterview] = useState(0)

// this will change our useEffect function based on which is true and which is false with different button clicks
const [displayResources, setDisplayResources] = useState([false])
const [displayInterviews, setDisplayInterviews] = useState([false])


  // Kevin C killed it here with the below states!!!
const [newJargin, setNewJargin] = useState({
    type: '',
    user: '',
    date: '',
    company: '',
    jobTitle: '',
    stage: '',
    salary: 1,
    location: '',
    timeLimit: '',
    question: '',
    devLanguage: '',
    userResponse: '',
    difficulty: 1,
    offer: '',
    // comment: ''
  })

  const [newBook, setNewBook] = useState({
    type: {'book':'video'},
    user: '',
    description: '',
    link: ''
  })

  // =========== useEffect =========== //

useEffect(() => {
    // if (displayInterviews === true){
        axios.get('http://localhost:3000/interviews').then((res) => {
          setNewJargin(res.data)
          setInterview(res.data)
          setDisplayEditInterviewForms(!res.data)
        }
      )
    // } else if (displayResources === true){
    //     axios.get('http://localhost:3000/resources').then((res) => {
    //       setNewBook(res.data)
    //       setResource(res.data)
    //     })
    // }
}, [])



// =========== These go in the forms for the interview buttons =========== //

  const newInterviewPost = (event) => {
      setNewJargin({...newJargin,[event.target.name]:event.target.value})
  }
// =========== These go in the forms for the interview buttons =========== //
  const newResourcePost = (event) => {
      setNewBook({...newBook,[event.target.name]:event.target.value})
  }

// =========== Post Function ============ //

const newInterviewSubmit = (event) => {
  console.log(newJargin.user);
  console.log(newJargin.type);
  console.log(newJargin.date);
  console.log(newJargin.company);
  console.log(newJargin.jobTitle);
  console.log(newJargin.stage);
  console.log(newJargin.salary);
  console.log(newJargin.location);
  console.log(newJargin.timeLimit);
  console.log(newJargin.devLanguage);
  console.log(newJargin.difficulty);
  console.log(newJargin.question);
  console.log(newJargin.userResponse);
  console.log(newJargin.offer);

  event.preventDefault()
  axios.post('http://localhost:3000/interviews', {
    type: newJargin.type,
    user: newJargin.user,
    date: newJargin.date,
    company: newJargin.company,
    jobTitle: newJargin.jobTitle,
    stage: newJargin.stage,
    salary: newJargin.salary,
    location: newJargin.location,
    timeLimit: newJargin.timeLimit,
    question: newJargin.question,
    devLanguage: newJargin.devLanguage,
    userResponse: newJargin.userResponse,
    difficulty: newJargin.difficulty,
    offer: newJargin.offer,
    // comment: []
  }).then(() => {
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
  
  // setShowNewInterviewForm(false)
}

const newResourceSubmit = (event) => {
  console.log(newJargin.user);
  console.log(newJargin.type);
  event.preventDefault()
  axios.post('http://localhost:3000/resources', {
    type: newBook.type,
    user: newBook.user,
    description: newBook.description,
    link: newBook.link
  }).then(() => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setResource(res.data)
    })
  })
}
// =========== Delete Functions ============ //

const handleInterviewDelete = (interviewData) => {
  axios.delete(`http://localhost:3000/interviews/${interviewData._id}`).then((res) => {
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
}

const handleResourceDelete = (resourceData) => {
  axios.delete(`http://localhost:3000/resources/${resourceData._id}`).then((res) => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setResource(res.data)
    })
  })
}

// =========== Edit Function ============ //


const handleToggleEditInterviewSubmit = (interviewData) => {
  axios.put(`http://localhost:3000/interviews/${interviewData._id}`, {
    type: newJargin.type,
    user: newJargin.user,
    date: newJargin.date,
    company: newJargin.company,
    jobTitle: newJargin.jobTitle,
    stage: newJargin.stage,
    salary: newJargin.salary,
    location: newJargin.location,
    timeLimit: newJargin.timeLimit,
    question: newJargin.question,
    devLanguage: newJargin.devLanguage,
    userResponse: newJargin.userResponse,
    difficulty: newJargin.difficulty,
    offer: newJargin.offer,
    // comment: []
  }).then(() => {
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
}
// ========= Display Edit Forms Function ========= //


// const handleToggleEditInterviewForms = () => {
//   setDisplayEditInterviewForms(!displayEditInterviewForms);
// }

// Minor bug of toggling off current edit and not directly into another --> Kevin can demo next time we are together.
const handleEditClick = (index) => {
  setDisplayEditInterviewForms(!displayEditInterviewForms);
  setSelectInterview(index)
}

// ----- Matt Notes ----- //
// Create edit form component - all editing occurs within the edit component 

// const refereshIndex = () => {

// }

// <EditForm refereshPageFunction={refreshIndex}></EditForm>

// inside the edit component: 

// const EditForm = (props) => {
//   const onSubmit = () => {
//     props.refreshIndex()
//   }
//   return <form onSubmit = {}></form>
// }

// ----- ^Matt Notes^ ----- //

// ============ Mapping Interviews ============== //
const interviewArray = interview.map((interview, index) => {
  return (
    <div key={interview._id}>
      <ul>
      <li>{interview.user}</li>
      {interview.type === 'technical'? <li>Technical</li> : <li>Behavioral</li>}
      <li>{interview.date}</li>
      <li>{interview.company}</li>
      <li>{interview.jobTitle}</li>
      <li>{interview.stage}</li>
      <li>{interview.salary}</li>
      <li>{interview.location}</li>
      <li>{interview.timeLimit}</li>
      <li>{interview.devLanguage}</li>
      <li>{interview.difficulty}</li>
      <li>{interview.question}</li>
      <li>{interview.response}</li>
      <li>{interview.offer}</li>
      </ul>
    
    <button className="edit" onClick={ (event) => {handleEditClick(index)} }>Edit</button>
                {/* assign a number and assign the index */}
                { displayEditInterviewForms && selectInterview === index ? 
                <form onSubmit={ (event) => {handleToggleEditInterviewSubmit(interview) } }>
                    <p> User: </p> <input type="text" name="user" onChange={newInterviewPost}/><br/>
                    <p> Type: </p> <input type="text" name="type" onChange={newInterviewPost}/><br/>
                    <br/>
                    <input type="submit" value="Change Interview Data"/>
                </form> : null
                }
    <IconButton aria-label="delete"
      onClick={(event) => {handleInterviewDelete(interview)}}
      color="error"><DeleteIcon />
    </IconButton>
    </div>

  )
})

//Button toggle show the new form
const showNewForm = (event) => {
  setShowNewInterviewForm(true)
}

const displayInterviewDetails = (event) => {
  setShowInterviewDetails(true)
}


// =========== Browser =========== //
return (
  <Router>
      <div>
          <header>
          </header>
          <Switch>
              <Route exact path="/">
                  <section className = "homepage">
                        <h1>JargIN</h1>
                        <h3>Slay the interview</h3>
                        <Link to ="/interviews"><button>INTERVIEW LIBRARY</button></Link>
                        <Link to ="/resources"><button>RESOURCES LIBRARY</button></Link>
                  </section>
              </Route>
              <Route exact path="/interviews">
                {interviewArray}
                <Link to ="/interviewform"><button>Add Your Interview</button></Link>
              </Route>
              <Route exact path="/interviewform">
                  <section>
                    <form onSubmit={newInterviewSubmit}>
                        <label>Type of Interview</label>
                          <select name='type' onChange={newInterviewPost}>
                            <option value="select type">Select type:</option>
                            <option name="type" value="technical">Technical Interview</option>
                            <option name="type" value="behavioral">Behavioral Interview</option>
                          </select>
                        <label>Name:</label>
                          <input name="user" value={interview.user} onChange={newInterviewPost} />
                        <label>Date of Interview:</label>
                          <input name="date" type="date" value={Date().now} onChange={newInterviewPost}/>
                        <label>Company</label>
                          <input name="company" type="text" value={interview.company} onChange={newInterviewPost}/>
                        <label>Position/Job Title</label>
                          <input name="jobTitle" type="text" value={interview.jobTitle} onChange={newInterviewPost}/>
                        <label>Stage in Interview Process</label>
                          <input name="stage" type="text" value={interview.stage} onChange={newInterviewPost}/>
                        <label>Salary</label>
                          <input name="salary" type="number" value={interview.salary} onChange={newInterviewPost}/>
                        <label>Location</label>
                          <input name="location" type="location" value={interview.location} onChange={newInterviewPost}/>
                        <label>Question</label>
                        <label>Time Limit (in minutes)</label>
                          <input name="timeLimit" type="number" value={interview.timeLimit} onChange={newInterviewPost}/>
                        <label>Language/Framework</label>
                          <input name="devLanguage" type="text" value={interview.devLanguage} onChange={newInterviewPost}/>
                        <label>Difficulty</label>
                          <input name="difficulty" type="text" value={interview.difficulty} onChange={newInterviewPost}/>
                        <label>Question</label>
                          <input name="question" type="text" value={interview.question} onChange={newInterviewPost}/>
                        <label>Response</label>
                          <input name="userResponse" type="text" value={interview.userResponse} onChange={newInterviewPost}/>
                        <label>Offered?</label>
                          <select name='offer' onChange={newInterviewPost}>
                            <option name="offer" value={interview.offer}>Yes</option>
                            <option name="offer" value={interview.offer}>No</option>
                            <option name="offer" value={interview.offer}>Undetermined</option>
                          </select>
                        <Button color="secondary" variant="contained" value="Submit Post" type='submit'>Submit</Button>
                        <Link to="/interviews">Back to all Interviews</Link>
                    </form>
                </section>
              </Route>
          </Switch>
      </div>
  </Router>
)
};

export default App;

/////LOGO \\\\\\\\
// <img src="jarginLogo.png" />
