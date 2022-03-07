import {useState, useEffect} from 'react'
import axios from 'axios'

// ================= React Router Components ================= //
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

// ============= Content Components ============ //

import FabNav from './components/FabNav'
import TopNav from './components/TopNav'
import ShowInterview from './components/ShowInterview'
import LandingPage from './components/LandingPage'

// ============== MUI Components ============= //
import {
  FormControl,
  Typography,
  Input,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Modal,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent
 } from '@mui/material'

// ============== MUI Icons =================== //
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// ============== MUI Styles/Themes =================== //
import {ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

  // =========== Theme Build =============//
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FEFE00'
      },
      secondary: {
        main: "#9D3AE1"
      },
      warning: {
        main:  "#FE2BFE"
      },
      error: {
        main: '#FF2A00'
      },
      success: {
        main: '#0A29FD'
      },
    }
  });

// ============ MAIN COMPONENT =================//
const App = () => {

// =========== States ================= //

//DB Interview
const [interview, setInterview] = useState([])
const [showNewInterviewForm, setShowNewInterviewForm] = useState(false)
const [showInterviewDetails, setShowInterviewDetails] = useState(false)

const [resource, setResource] = useState([])


// form displays on edit buttons
const [displayEditForms, setDisplayEditForms] = useState([false])

const [selectIndex, setSelectIndex] = useState(0)

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
    difficulty: 0,
    offer: '',
    // comment: ''
  })

  const [newBook, setNewBook] = useState({
    type: {'book':'video'},
    user: '',
    title: '',
    description: '',
    link: ''
  })

  // =========== useEffect =========== //

useEffect(() => {
        axios.get('http://localhost:3000/interviews').then((res) => {
          setNewJargin(res.data)
          setInterview(res.data)
          setDisplayEditForms(!res.data)
        }
      )
}, [])

useEffect(() => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setNewBook(res.data)
      setResource(res.data)
      setDisplayEditForms(!res.data)
    })
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

const handleEditInterviewSubmit = (interviewData) => {
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
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
}

const handleEditResourceSubmit = (resourceData) => {
  axios.put(`http://localhost:3000/resources/${resourceData._id}`, {
    type: newBook.type,
    user: newBook.user,
    title: newBook.title,
    description: newBook.description,
    link: newBook.link
    // comment: []
  }).then(() => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setResource(res.data)
    })
  })
}
// ========= Display Edit Forms Function ========= //

// const handleToggleEditInterviewForms = () => {
//   setDisplayEditInterviewForms(!displayEditInterviewForms);
// }

// Minor bug of toggling off current edit and not directly into another --> Kevin can demo next time we are together.
const handleEditClick = (index) => {
  setDisplayEditForms(!displayEditForms);
  setSelectIndex(index);
}

// ============ (Show Page) Mapping Interviews ============== //
const interviewArray = interview.map((interview, index) => {
  return (
      <ThemeProvider>
      <CssBaseline />
        <Box sx={{flexGrow: 3}}key={interview._id}>
          <Grid container spacing={2} sx={{bgcolor: '#483362', opacity: .8, padding: 2, margin: 1}}>
            <Card sx={{m: 2, p: 1, width: .2}}>
              <Typography  item gutterBottom color="#FF2A00" variant="h6">Type: {interview.type? <>Technical</> : <>Behavioral</>}</Typography>
              <Typography  item color="#FEFE00">Date: {interview.date}</Typography>
              <Typography item>Uploaded by: {interview.user}</Typography>
              <Typography  item>Offered: {interview.offer}</Typography>
              <Typography item>Added: {interview.createdAt}</Typography>
            </Card>
            <Card sx={{m: 2, p: 1, width: .2}}>
              <Typography item gutterBottom variant="h6">Company: {interview.company}</Typography>
              <Grid item xs={2}><li>{interview.jobTitle}</li></Grid>
              <Grid item xs={2}><li>{interview.stage}</li></Grid>
              <Grid item xs={2}><li>{interview.salary}</li></Grid>
              <Grid item xs={2}><li>{interview.location}</li></Grid>
              <Grid item xs={2}><li>{interview.timeLimit}</li></Grid>
              <Grid item xs={2}><li>{interview.devLanguage}</li></Grid>
              <Grid item xs={2}><li>{interview.difficulty}</li></Grid>
            </Card>
            <Card  sx={{m: 2, p: 1, width: .7}}>
              <Grid item xs={2}><li>Question: {interview.question}</li></Grid>
              <Grid item xs={2}><li>{interview.userResponse}</li></Grid>
              </Card>
          </Grid>

        <IconButton className="edit" onClick={(event) => {handleEditClick(index)}}><EditIcon color="primary"/></IconButton>
                     {/* assign a number and assign the index */}
                { displayEditForms && selectIndex === index ?
                <form onSubmit={ (event) => {handleEditInterviewSubmit(interview) } }>
                    <p> User: </p> <input
                    type="text"
                    name="user"
                    // defaultChecked can also be used for checkbox
                    defaultValue={interview.user}
                    onChange={newInterviewPost}
                    /><br/>
                    <p> Type: </p> <input type="text" name="type" onChange={newInterviewPost}/><br/>
                    <br/>
                    <input type="submit" value="Change Interview Data"/>
                </form> : null
                }
        <IconButton aria-label="delete"
          onClick={(event) => {handleInterviewDelete(interview)}}
          color="error"><DeleteIcon />
        </IconButton>
      </Box>
    </ThemeProvider>
  )
})

// ============ Mapping Resources ============== //
const resourceArray = resource.map((resource, index) => {
  return (
      <ThemeProvider theme={darkTheme}>
       <CssBaseline />
       <Card key={resource._id} sx={{maxWidth: 400, minWidth: 200}, {padding: 1, margin: 2}}>
        <CardContent sx={{bgcolor:'#483362'}}>
          <Typography sx={{ fontSize: 14}} gutterBottom>
            {resource.title}
          </Typography>
          <Typography  variant="h5" component="div">
            {resource.type}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {resource.user}
          </Typography>
          <Typography variant="body2">
            {resource.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => window.open(resource.link)}>Open Resource</Button>
          <IconButton className="edit" onClick={(event) => {handleEditClick(index)}}><EditIcon color="info"/></IconButton>
              { displayEditForms && selectIndex === index ?
              <form onSubmit={ (event) => {handleEditResourceSubmit(resource) } }>
                  <p> Username: </p> <input type="text" name="user" onChange={newResourcePost} defaultValue = {resource.user}/><br/>
                  <br/>
                  <p> Type: </p> <input type="text" name="type" onChange={newResourcePost} defaultValue = {resource.type}/><br/>
                  <p> Description: </p> <input type="text" name="description" onChange={newResourcePost} defaultValue = {resource.description}/><br/>
                  <p> link: </p> <input type="text" name="link" onChange={newResourcePost} defaultValue = {resource.link}/><br/>
                  <input type="submit" value="Change Interview Data"/>
              </form> : null
              }
          <IconButton aria-label="delete"
            onClick={(event) => {handleResourceDelete(resource)}}
            color="error"><DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
})

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

//Button toggle show the new form
const showNewForm = (event) => {
  setShowNewInterviewForm(true)
}

const displayInterviewDetails = (event) => {
  setShowInterviewDetails(true)
}

// ============= Modal Style & State ====================== //
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'warning.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

// =========== Browser =========== //
return (
  <Router>
      <>
      <ThemeProvider theme={darkTheme}>
       <CssBaseline enableColorScheme/>
          <header>
          </header>
          <Switch>
              <Route exact path="/">
                <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                  <section className = "homepage">
                    <TopNav />
                    <LandingPage />
                  </section>
                </ThemeProvider>
              </Route>
              <Route exact path="/interviews">
              <ThemeProvider theme={darkTheme}>
              <CssBaseline />
                <TopNav />
                  {interviewArray}
                  <Link to ="/interviewform">
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      aria-label='add your interview'
                      variant="contained"
                      startIcon={<AddIcon />}>
                      Add
                    </Button>
                  </Link>
                </ThemeProvider>
              </Route>
              <Route exact path="/resources">
                <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <TopNav />
                {resourceArray}
                <Link to ="/resourceform">
                  <Button
                    onClick={handleClose}
                    color="secondary"
                    aria-label='add your resource'
                    variant="contained"
                    startIcon={<AddIcon />}>
                    Add
                  </Button>
                </Link>
                </ThemeProvider>
              </Route>
              <Route exact path="/interviewform">
                <ThemeProvider>
                <CssBaseline />
                  <TopNav />
                  <section>
                    <Typography variant="h4" sx={{pl: 1, pr: .5, pb: 2}} >Add Your Interview:</Typography>
                    <form onSubmit={newInterviewSubmit}>
                      <Box color="secondary" sx={{ m: 1, width: '80ch', pb: 2, pl: 2}} >
                        <Typography component='label' sx={{pl: 1, pr: .5, m:1}} >*Required</Typography>
                        <Typography component="select" name='type' onChange={newInterviewPost}>
                          <option  value="select type">Type of Interview:</option>
                          <option  name="type" value="technical">Technical Interview</option>
                          <option name="type" value="behavioral">Behavioral Interview</option>
                        </Typography>
                      </Box>
                      <Box  sx={{'& .MuiTextField-root': { m: 1, width: '25ch'},}}>
                        <TextField
                          color="secondary"
                          required
                          focused
                          multiline
                          id="user"
                          name="user"
                          label="Name"
                          value={interview.user}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="company"
                          name="company"
                          label="Company Name"
                          value={interview.company}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="jobTitle"
                          name="jobTitle"
                          label="Job Title"
                          value={interview.jobTitle}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="stage"
                          name="stage"
                          label="Stage in Interview Process"
                          value={interview.stage}
                          onChange={newInterviewPost}
                          />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="salary"
                          name="salary"
                          label="Salary"
                          helperText = "Numbers Only"
                          value={interview.salary}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="location"
                          name="location"
                          label="Location"
                          helperText = "Online / In-person"
                          value={interview.location}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="timeLimit"
                          name="timeLimit"
                          label="Time Limit"
                          value={interview.timeLimit}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="devLanguage"
                          name="devLanguage"
                          label="Language/Framework"
                          helperText = "* Technical Interview"
                          value={interview.devLanguage}
                          onChange={newInterviewPost}
                        />
                    <Box sx={{pt:1, pb: 1, pl: 1}}>
                      <Typography component="label" sx={{pl: 1, pr: .5}} >Difficulty (0-10)</Typography>
                          <Typography component="input" name="difficulty" type="number" min="0" max="10" defaultValue='0' value={interview.difficulty}onChange={newInterviewPost}/>
                        <Typography component="label" sx={{pl: 1, pr: .5}}>Offered?</Typography>
                        <Typography component='select' name='offer' onChange={newInterviewPost}>
                          <option name="offer" value={interview.offer}>Undetermined</option>
                          <option name="offer" value={interview.offer}>Yes</option>
                          <option name="offer" value={interview.offer}>No</option>
                        </Typography>
                      </Box>
                      <Box sx={{pt:1, pb: 1, pl: 2}}>
                        <Typography >Date of Interview:</Typography>
                        <Typography component='input' name="date" type="date" value={Date().now} onChange={newInterviewPost}/>
                      </Box>
                    </Box>
                    <Box sx={{width: .75, p: 2, mb: .5}}>
                      <TextField
                        color="secondary"
                        multiline
                        variant="filled"
                        rows={10}
                        fullWidth
                        id="question"
                        name="question"
                        label="Question"
                        value={interview.question}
                        onChange={newInterviewPost}
                        />
                    </Box>
                    <Box sx={{width: .75, p: 2, mb: .5}}>
                      <TextField
                        color="secondary"
                        multiline
                        variant="filled"
                        rows={10}
                        fullWidth
                        id="userResponse"
                        name="userResponse"
                        label="Response"
                        value={interview.userResponse}
                        onChange={newInterviewPost}
                        />
                    </Box>
                    <div>
                      <Button sx={{mr: 1}}color="secondary" variant="contained" value="Submit" type='submit' onClick={handleOpen}>Submit</Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Thank you! Your interview has been added.
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <Link to="/interviews">Click here to see all interviews.</Link>
                            </Typography>
                          </Box>
                        </Modal>
                      <Link to="/interviews"><Button color="primary" variant="contained">Back to all Interviews</Button></Link>
                    </div>
                  </form>
                </section>
                </ThemeProvider>
              </Route>
              <Route exact path="/resourceform">
                <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                  <TopNav />
                  <section>
                    <form onSubmit={newResourceSubmit}>
                        <label>Name: </label>
                          <input name="user" type="text" value={resource.user} onChange={newResourcePost}/>
                          <label>Title: </label>
                            <input name="title" type="text" value={resource.title} onChange={newResourcePost}/>
                        <label>Type: </label>
                          <input name="type" value={resource.user} onChange={newResourcePost} />
                        <label>Description: </label>
                          <textarea name="description" type="text" value={resource.description} onChange={newResourcePost}/>
                        <label>Link: </label>
                          <input name="link" type="text" value={resource.link} onChange={newResourcePost}/>

                          <Button sx={{mr: 1}}color="secondary" variant="contained" value="Submit" type='submit' onClick={handleOpen}>Submit</Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  Thank you! Your resource has been added.
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                  <Link to="/resources">Click here to see all resources.</Link>
                                </Typography>
                              </Box>
                            </Modal>

                    </form>
                </section>
                </ThemeProvider>
              </Route>
          </Switch>
      </ThemeProvider>
      </>
  </Router>
)
};

export default App;
