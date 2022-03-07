-GENERAL NOTES / TO-DOs / CODE DUMP

-Need to make Comments Array.map function?
  -How to link this to interview?
  -Might be possible if interview is globally scoped?

-Do I need a seperate SingleComment form component?
  -Seems unnecessary

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










    



