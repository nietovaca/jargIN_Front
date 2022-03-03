import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

// =========== States ================= //

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [stage, setStage] = useState('')
  const [salaray, setSalary] = useState('')
  const [location, setLocation] = useState('')
  const [timeLimit, setTimeLimit] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('') // Question, specific code challenge, etc.
  const [language, setLanguage] = useState('')
  const [notes, setNotes] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [offer, setOffer] = useState('')
  const [solution, setSolution] = useState('')

  const [posts, setPosts] = useState([])

  // alternatively:
  // I am less familiar with this method but I believe we would need to use spreading (...) when calling within our functions and return. This just seems neater and could cut down on a massive state list, and having to change setState everytime.
  // const [post, setPost] = useState({
  //   name: '',
  //   company: '',
  //   jobTitle: '',
  //   stage: '',
  //   salary: '',
  //   location: '',
  //   timeLimit: '',
  //   date: '',
  //   description: '',
  //   language: '',
  //   notes: '',
  //   difficulty: '',
  //   offer: '',
  //   solution: ''
  // })

// =========== useEffect =========== //

useEffect(() => {
  axios.get('https://jargin.herokuapp.com/').then((res) => {
    setPosts(res.data)
  })
}, [])

// ========== Form Functions ============ //

  const handleNewName = (event) => {
    setName(event.target.value)
  }

  const handleNewCompany = (event) => {
    setCompany(event.target.value)
  }

  const handleNewJobTitle = (event) => {
    setJobTitle(event.target.value)
  }

  const handleNewStage = (event) => {
    setStage(event.target.value)
  }

  const handleNewSalary = (event) => {
    setSalary(event.target.value)
  }

  const handleNewLocation = (event) => {
    setLocation(event.target.value)
  }

  const handleNewTimeLimit = (event) => {
    setTimeLimit(event.target.value)
  }

  const handleNewDate = (event) => {
    setDate(event.target.value)
  }

  const handleNewDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleNewLanguage = (event) => {
    setLanguage(event.target.value)
  }

  const handleNewNotes = (event) => {
    setNotes(event.target.value)
  }

  const handleNewDifficulty = (event) => {
    setDifficulty(event.target.value)
  }

  const handleNewOffer = (event) => {
    setOffer(event.target.value)
  }

  const handleNewSolution = (event) => {
    setSolution(event.target.value)
  }

// =========== Post Function ============ //

const handleNewFormSubmit = (event) => {
  event.preventDefault()
  axios.post('https://jargin.herokuapp.com/', {

    // Schema from back-end

  }).then(() => {
    axios.get('https://jargin.herokuapp.com/').then((res) => {
      setPosts(res.data)
    })
  })
}

// =========== Delete Function ============ //

const handleDelete = (postsData) => {
        // Will this work?? - May need to modify url depending on backend routes
  axios.delete(`https://jargin.herokuapp.com/${postsData._id}`).then((res) => {
    axios.get('http://localhost:3000/posts').then((res) => {
      setPosts(res.data)
    })
  })
}



// =========== Browser =========== //

  return (
    <>
      <h1>JargIN</h1>
      <section>
        <form onSubmit={handleNewFormSubmit}>
                          {/* add placeholders? */}
          <p>Name: </p><input type="text" onChange={handleNewName}/><br/>
          <p>Company: </p><input type="text" onChange={handleNewCompany}/><br/>
          <p>Location: </p><input type="text" onChange={handleNewLocation}/><br/>
          <p>Job Title: </p><input type="text" onChange={handleNewJobTitle}/><br/>
          <p>Salary: </p><input type="text" onChange={handleNewSalary}/><br/>
          <p>Date: </p><input type="text" onChange={handleNewDate}/><br/>
          <p>Stage: </p><input type="text" onChange={handleNewStage}/><br/>
          <p>Time Limit: </p><input type="text" onChange={handleNewTimeLimit}/><br/>
          <p>Description: </p><textarea name="post-submit" onChange={handleNewDescription}></textarea><br/>
          <p>Languages used: </p><input type="text" onChange={handleNewLanguage}/><br/>
          <p>Notes: </p><textarea name="post-submit" onChange={handleNewNotes}></textarea><br/>
          <p>Difficulty(on a scale of 1 to 10): </p><input type="text" onChange={handleNewDifficulty}/><br/>
          <p>Offer: </p><input type="text" onChange={handleNewOffer}/><br/>
          <p>Solution: </p><textarea name="post-submit" onChange={handleNewSolution}></textarea><br/>
        </form>
      </section>
      <section>
        <h2>Posts:</h2>
          {
            setPosts.map((post) => {
              return (
                <div key={post._id}>
                  <h3>{post.name}</h3>
                  <h3>{post.company}</h3>
                  <h3>{post.location}</h3>
                  <h3>{post.jobTitle}</h3>
                  <h3>{post.salary}</h3>
                  <h3>{post.date}</h3>
                  <h3>{post.stage}</h3>
                  <h3>{post.timeLimit}</h3>
                  <h3>{post.description}</h3>
                  <h3>{post.languages}</h3>
                  <h3>{post.notes}</h3>
                  <h3>{post.difficulty}</h3>
                  <h3>{post.offer}</h3>
                  
                  <h3>{post.solution}</h3>{/* hidden */}
                  <button onClick={ (event) => { handleDelete(post) } }>Delete Post</button>
                </div>
              )
            })
          }
      </section>

    </>
  )
}

export default App;
