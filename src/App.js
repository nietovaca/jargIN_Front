import {useState, useEffect} from 'react'
import axios from 'axios'
import FabNav from './components/FabNav'
import TopNav from './components/TopNav'
import ShowInterview from './components/ShowInterview'
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

  // const [name, setName] = useState('')
  // const [company, setCompany] = useState('')
  // const [jobTitle, setJobTitle] = useState('')
  // const [stage, setStage] = useState('')
  // const [salaray, setSalary] = useState('')
  // const [location, setLocation] = useState('')
  // const [timeLimit, setTimeLimit] = useState('')
  // const [date, setDate] = useState('')
  // const [description, setDescription] = useState('') // Question, specific code challenge, etc.
  // const [language, setLanguage] = useState('')
  // const [notes, setNotes] = useState('')
  // const [difficulty, setDifficulty] = useState('')
  // const [offer, setOffer] = useState('')
  // const [solution, setSolution] = useState('')

  const [interview, setInterview] = useState([])

  const [displayEditForms, setDisplayEditForms] = useState([false])

  // alternatively:
  // I am less familiar with this method but I believe we would need to use spreading (...) when calling within our functions and return. This just seems neater and could cut down on a massive state list, and having to change setState everytime.

  const [newJargin, setNewJargin] = useState({
    type: {'techincal':'behavioral'},
    user: '',
    date: '',
    company: '',
    jobTitle: '',
    stage: '',
    salary: '',
    location: '',
    timeLimit: '',
    question: '',
    devLanguage: '',
    userResponse: '',
    difficulty: '',
    offer: '',
    // comment: ''
  })

  // =========== useEffect =========== //

useEffect(() => {
  axios.get('http://localhost:3000/interviews').then((res) => {
    setNewJargin(res.data)
    setInterview(res.data)
  })
}, [])

  const newInterviewPost = (event) => {
    setNewJargin({...newJargin,[event.target.name]:event.target.value})
  }
  // Then need to display within the input field:
  //   name = (corresponding key from useState)
  //   value = interview.(corresponding key)


// =========== Post Function ============ //

const newFormSubmit = (event) => {
  console.log(newJargin.user);
  console.log(newJargin.type);
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
}
// =========== Delete Function ============ //

const handleDelete = (interviewData) => {
        // Will this work?? - May need to modify url depending on backend routes
  axios.delete(`http://localhost:3000/interviews/${interviewData._id}`).then((res) => {
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
}

// =========== Edit Function ============ //

const handleToggleEditFormSubmit = (interviewData) => {
  console.log('newJargin');
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
    axios.get('http://localhost:3000/quotes').then((res) => {
      setInterview(res.data)
    })
  })
}

// ========= Display Edit Forms Function ========= //

const handleToggleEditForms = () => {
  setDisplayEditForms(!displayEditForms);
}

// ============ Mapping Interviews ============== //

const interviewArray = interview.map((interview) => {
  return (
      <div key={interview._id}>
      <h3>{interview.user}</h3>
      {interview.type === 'technical'? <h6>Technical</h6> : <h6>Behavioral</h6>}
      <h3>{interview.type}</h3>

      <button className="edit" onClick={handleToggleEditForms}>Edit</button>
                  { displayEditForms ?
                  <form onSubmit={ (event) => {handleToggleEditFormSubmit(interview) } }>
                      <p> User: </p> <input type="text" name="user" onChange={newInterviewPost}/><br/>
                      <p> Type: </p> <input type="text" name="type" onChange={newInterviewPost}/><br/>
                      <br/>
                      <input type="submit" value="Change Interview Data"/>
                  </form> : null
                  }

      {interview.type === 'technical'? <h6>Technical</h6> : <h6>Behavioral</h6>}
      <h6>{interview.date}</h6>
      <h6>{interview.company}</h6>
      <IconButton aria-label="delete"
        onClick={(event) => {handleDelete(interview)}}
        color="error"><DeleteIcon />
      </IconButton>
      </div>
  )
})
//work on displaying this data in component

// =========== Browser =========== //

return (
  <>
    <header>
    </header>
    <section>
      <form onSubmit={newFormSubmit}>
          <label>Type of Interview</label>
            <select name='type' onChange={newInterviewPost}>
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
            <input name="JobTitle" type="text" value={interview.jobTitle} onChange={newInterviewPost}/>
          <label>Stage in Interview Process</label>
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
            <input name="response" type="text" value={interview.response} onChange={newInterviewPost}/>
          <label>Offered?</label>
            <input name="offer" type="radio" value={interview.offer} onChange={newInterviewPost}/>
          <Button color="secondary" variant="contained" value="Submit Post" type='submit'>Submit</Button>
      </form>
    </section>
    <section>
      {interviewArray}
    </section>

  </>
)
}


export default App;

/////LOGO \\\\\\\\
// <img src="jarginLogo.png" />
