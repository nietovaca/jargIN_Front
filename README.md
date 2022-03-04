-GENERAL NOTES/ TO-DOs

Question for Ashley:
-Post route in frontend not posting data to the server - but is working through Postman



-Set up full CRUD with interview posts
-Merge backend/frontend
    -Test through Heroku

    name: '',
    company: '',
    jobTitle: '',
    stage: '',
    salary: '',
    location: '',
    timeLimit: '',
    date: '',
    description: '',
    language: '',
    notes: '',
    difficulty: '',
    offer: '',
    solution: ''

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


const interviewArray = interview.map((interview) => {
  return (
      <>
      <h3>{interview.user}</h3>
      {interview.type === 'technical'? <h6>Technical</h6> : <h6>Behavioral</h6>}
      <h6>{interview.date}</h6>
      <h6>{interview.company}</h6>
      <IconButton aria-label="delete"
        onClick={(event) => {handleDelete(interview)}}
        color="error"><DeleteIcon />
      </IconButton>
      </>
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











    



