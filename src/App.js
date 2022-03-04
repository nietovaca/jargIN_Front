import {useState, useEffect} from 'react'
import axios from 'axios'
import FabNav from './components/FabNav'


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

  const [interviews, setInterviews] = useState([])

  // alternatively:
  // I am less familiar with this method but I believe we would need to use spreading (...) when calling within our functions and return. This just seems neater and could cut down on a massive state list, and having to change setState everytime.

  const [interview, setInterview] = useState({
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
    setInterview(res.data)
  })
}, [])

  const newInterviewPost = (event) => {
    setInterview({...interview,[event.target.name]:event.target.value})
  }
  // Then need to display within the input field:
    // name = (corresponding key from useState)
    // value = interview.(corresponding key)


// =========== Post Function ============ //

const newFormSubmit = (event) => {
  console.log(interview.user);
  console.log(interview.type);
  event.preventDefault()
  axios.post('http://localhost:3000/interviews', {
    type: interview.type,
    user: interview.user,
    date: interview.date,
    company: interview.company,
    jobTitle: interview.jobTitle,
    stage: interview.stage,
    salary: interview.salary,
    location: interview.location,
    timeLimit: interview.timeLimit,
    question: interview.question,
    devLanguage: interview.devLanguage,
    userResponse: interview.userResponse,
    difficulty: interview.difficulty,
    offer: interview.offer,
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
  axios.delete(`http://localhost:3000/interview/${interviewData._id}`).then((res) => {
    axios.get('http://localhost:3000/interview').then((res) => {
      setInterview(res.data)
    })
  })
}



// =========== Browser =========== //

  return (
    <>
      <header>

      </header>
      <h1>JargIN</h1>
      <section>
        <form onSubmit={newFormSubmit}>
          <p>User: </p><input type="text" name="user" value={interview.user} onChange={newInterviewPost}/><br/>
          <p>Type: </p><input type="text" name="type" value={interview.type} onChange={newInterviewPost}/><br/>
          <input type="submit" value="Submit Post"/>
          {
            interview.map((interview) => {
              return (
                <>
                  <button onClick={ (event) => { handleDelete(interview) } }>Delete Post</button>
                  
                </>
              )
            })
          }
        </form>
      </section>
       
    </>
  )
}

export default App;
