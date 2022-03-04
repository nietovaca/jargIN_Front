import React from 'react'

const NewInterviewPost = (props) => {
  return (
    <>
      <section>
        <form onSubmit={newFormSubmit}>
            <label>Type of Interview</label>
              <select name='type' onChange={newInterviewPost}>
                <option name="type" value="technical">Technical Interview</option>
                <option name="type" value="behavioral">Behavioral Interview</option>
              </select>
            <label>Name:</label>
              <input name="user" value={props.interview.user} onChange={newInterviewPost} />
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
    </>
  )}
