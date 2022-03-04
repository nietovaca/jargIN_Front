import {useState, useEffect} from 'react'
import axios from 'axios'
import FabNav from './components/FabNav'
import TopNav from './components/TopNav'
import ShowInterview from './components/ShowInterview'
import Input from '@mui/material/Input';



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

  // alternatively:
  // I am less familiar with this method but I believe we would need to use spreading (...) when calling within our functions and return. This just seems neater and could cut down on a massive state list, and having to change setState everytime.

  const [newJargin, setNewJargin] = useState({
    type: '',
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

const interviewArray = interview.map((interview) => {
  return (
      <>
      <h3>{interview.user}</h3>
      <h3>{interview.type}</h3>
      <button onClick={ (event) => { handleDelete(interview) } }>Delete Post</button>
      </>
  )
})

// =========== Browser =========== //

  return (
    <>
      <header>
      </header>
      <h1>JargIN</h1>
      <header>
      </header>
      <section>
        <form onSubmit={newFormSubmit}>
          <p>User: </p><input type="text" name="user" value={interview.user} onChange={newInterviewPost}/><br/>
          <p>Type: </p><input type="text" name="type" value={interview.type} onChange={newInterviewPost}/><br/>
          <input type="submit" value="Submit Post"/>
        </form>
      </section>
      <section>
        {interviewArray}
      </section>

    </>
  )
}

export default App;
