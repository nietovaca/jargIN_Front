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
  Paper
 } from '@mui/material'

// ============== MUI Icons =================== //
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// ============== MUI Styles/Themes =================== //
import {ThemeProvider, createTheme } from '@mui/material/styles';


// ============ MAIN COMPONENT =================//
const App = () => {

// =========== States ================= //

//DB Interview
const [interview, setInterview] = useState([])
const [showNewInterviewForm, setShowNewInterviewForm] = useState(false)
const [showInterviewDetails, setShowInterviewDetails] = useState(false)

const [resource, setResource] = useState([])


// form displays on edit buttons
const [displayEditInterviewForms, setDisplayEditInterviewForms] = useState([false])

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
    salary: '',
    location: '',
    timeLimit: '',
    question: '',
    devLanguage: '',
    userResponse: '',
    difficulty: Number,
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


  // Then need to display within the input field:
  //   name = (corresponding key from useState)
  //   value = interview.(corresponding key)


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
        // Will this work?? - May need to modify url depending on backend routes
  axios.delete(`http://localhost:3000/interviews/${interviewData._id}`).then((res) => {
    axios.get('http://localhost:3000/interviews').then((res) => {
      setInterview(res.data)
    })
  })
}

const handleResourceDelete = (resourceData) => {
        // Will this work?? - May need to modify url depending on backend routes
  axios.delete(`http://localhost:3000/resources/${resourceData._id}`).then((res) => {
    axios.get('http://localhost:3000/resources').then((res) => {
      setResource(res.data)
    })
  })
}

// =========== Edit Function ============ //

const handleToggleEditInterviewSubmit = (interviewData) => {
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
// ========= Display Edit Forms Function ========= //

const handleToggleEditInterviewForms = () => {
  setDisplayEditInterviewForms(!displayEditInterviewForms);
}

// ============ Styling Show Page =============== //

const Item = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb74d',
      bgcolor: '#FFC570'
    },
    secondary: {
      main: '#c51162',
    },
  },
  typography: {
    fontFamily: 'Questrial',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: 'rgb(137, 11, 68)',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'primary',
    },
  },
});

// ============ (Show Page) Mapping Interviews ============== //
const interviewArray = interview.map((interview) => {
  return (
      <Box sx={{flexGrow: 1}}key={interview._id}>
        <Grid container spacing={3}>
          <Grid item xs={2}><li>{interview.user}</li></Grid>
          <Grid item xs={2}>{interview.type? <li>Technical</li> : <li>Behavioral</li>}</Grid>
          <Grid item xs={2}><li>{interview.date}</li></Grid>
          <Grid item xs={2}><li>{interview.company}</li></Grid>
          <Grid item xs={2}><li>{interview.jobTitle}</li></Grid>
          <Grid item xs={2}><li>{interview.stage}</li></Grid>
          <Grid item xs={2}><li>{interview.salary}</li></Grid>
          <Grid item xs={2}><li>{interview.location}</li></Grid>
          <Grid item xs={2}><li>{interview.timeLimit}</li></Grid>
          <Grid item xs={2}><li>{interview.devLanguage}</li></Grid>
          <Grid item xs={2}><li>{interview.difficulty}</li></Grid>
          <Grid item xs={2}><li>{interview.question}</li></Grid>
          <Grid item xs={2}><li>{interview.userResponse}</li></Grid>
          <Grid item xs={2}><li>{interview.offer}</li></Grid>
          <Grid item xs={2}><li>{interview.createdAt}</li></Grid>
        </Grid>

        <IconButton className="edit" onClick={handleToggleEditInterviewForms}><EditIcon color="info"/></IconButton>
                    { displayEditInterviewForms ?
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
      </Box>
  )
})

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

// =========== Theme Build =============//

const defaultTheme = createTheme({
  mode: 'dark',
  palette: {
    type: 'dark',
    primary: {
      main: '#ffb74d',
      bgcolor: '#FFC570'
    },
    secondary: {
      main: '#c51162',
    },
  },
  typography: {
    fontFamily: 'Questrial',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: 'rgb(137, 11, 68)',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'primary',
    },
  },
});

// =========== Browser =========== //
return (
  <Router>
      <div>
          <header>
          </header>
          <Switch>
              <Route exact path="/">
                  <section className = "homepage">
                    <LandingPage />
                  </section>
              </Route>
              <Route exact path="/interviews">
                <ThemeProvider theme={defaultTheme}>
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
              <Route exact path="/interviewform">
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
              </Route>
          </Switch>
      </div>
  </Router>
)
};

export default App;
