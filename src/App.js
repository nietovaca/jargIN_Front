import {useState, useEffect} from 'react'
import axios from 'axios'

import './index.css'

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
  CardContent,
  Collapse
 } from '@mui/material'

// ============== MUI Icons =================== //
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ============== MUI Styles/Themes =================== //
import {ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
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
// ========= Modal Style ========= //
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: "#FEFE00",
    width: 400,
    bgcolor: 'error.main',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

// ============ MAIN COMPONENT =================//
const App = () => {

// =========== States ================= //

//DB Interview
const [interview, setInterview] = useState([])
const [showNewInterviewForm, setShowNewInterviewForm] = useState(false)
const [showInterviewDetails, setShowInterviewDetails] = useState(false)
const [resource, setResource] = useState([])

//Modal Open/Close State
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


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

// =========== Post Functions ============ //

const newInterviewSubmit = (event) => {
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

// =========== Edit Functions ============ //

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

const handleEditClick = (index) => {
  setDisplayEditForms(!displayEditForms);
  setSelectIndex(index);
}

// ============ (Show Page) Mapping Interviews ============== //
const [expanded, setExpanded] = useState(false);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const handleExpandClick = (event, index) => {
  setExpanded(!expanded);
  setDisplayAnswer(index)
}
const [displayAnswer, setDisplayAnswer] = useState(0)

// const handleDisplayAnswer = (index) => {
//   setDisplayAnswer(index)
// }

const interviewArray = interview.map((interview, index) => {
  return (
      <ThemeProvider>
      <CssBaseline />
        <Box sx={{display: 'flex', alignItems: 'space evenly'}} key={interview._id}>
          <Grid container sx={{bgcolor: '#483362', padding: 1, margin: 1}}>
            <Card sx={{m: 2, p: 1, width: .4}}>

              <Typography  item gutterBottom>
                Type: {(interview.type === 'technical')?
                <Typography color="#FF2A00" variant="h6">Technical</Typography> : <Typography color="#0A29FD" variant="h6">Behavioral</Typography>
                }
              </Typography>

              <Typography  item >Date: {interview.date}</Typography>
              <Typography item>Uploaded by: {interview.user}</Typography>
              <Typography  item>Offered: {interview.offer}</Typography>
              <Typography item>Added: {interview.createdAt}</Typography>
            </Card>
            <Card sx={{m: 2, p: 1, width: .4}}>
              <Typography container gutterBottom>Company: {interview.company}</Typography>
              <Typography variant="li" item xs={3}>Position: {interview.jobTitle}</Typography><br/>
              <Typography variant="li" item xs={3}>Stage: {interview.stage}</Typography><br/>
              <Typography variant="li" item xs={3}>Salary: {interview.salary}</Typography><br/>
              <Typography variant="li" item>Location: {interview.location}</Typography><br/>
            </Card>
            <Card  sx={{m: 2, p: 1, width: .83}}>
              <Typography variant="li" item>Time Limit: {interview.timeLimit}</Typography><br/>
              <Typography variant="li" item>Language: {interview.devLanguage}</Typography><br/>
              <Typography variant="li" item>Difficulty: {interview.difficulty}</Typography><br/>
              <Card sx={{bgcolor: '#483362', padding: 1, margin: 1, whiteSpace: 'pre-line'}}>
                <Typography variant="li" color="#FE2BFE" item>Question:</Typography><Typography variant='body1'>{interview.question}</Typography><br/>
              </Card>
              
              <ExpandMore expand={expanded} onClick={ (event) => {handleExpandClick(index)}} aria-expanded={expanded} aria-label="show more">
                 <Button startIcon={<VisibilityOffIcon color="warning"/>} color="warning">Answer</Button>
              </ExpandMore>

             { selectIndex === index ? 
              <>
              <Collapse in={expanded} timeout="auto" unmountOnExit sx={{bgcolor:'#483362'}}>
                <CardActions sx={{bgcolor: '#483362', padding: 1, margin: 1, whiteSpace: 'pre-line'}}>
                  <Typography variant="li" item>{interview.userResponse}</Typography>
                </CardActions>
              </Collapse>
              </> : null
             }

              <IconButton gutterBottom className="edit" sx={{padding: 1, ml: 2}}
                onClick={(event) => {handleEditClick(index)}}><EditIcon color="primary"/></IconButton>
                
                      { displayEditForms && selectIndex === index ?
                      <form onSubmit={ (event) => {handleEditInterviewSubmit(interview) } }>
                           <Box color="primary" sx={{ m: 1, width: '80ch', pb: 2, pl: 2}} >
                          <Typography component='label' sx={{pl: 1, pr: .5, m:1}} >*Required</Typography>
                          <Typography component="select" name='type' onChange={newInterviewPost}>
                            <option  value="select type">Type of Interview:</option>
                            <option  name="type" value='technical'>Technical Interview</option>
                            <option name="type" value='behavioral'>Behavioral Interview</option>
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
                          defaultValue={interview.user}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="company"
                          name="company"
                          label="Company Name"
                          defaultValue={interview.company}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="jobTitle"
                          name="jobTitle"
                          label="Job Title"
                          defaultValue={interview.jobTitle}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="stage"
                          name="stage"
                          label="Stage in Interview Process"
                          defaultValue={interview.stage}
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
                          defaultValue={interview.salary}
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
                          defaultValue={interview.location}
                          onChange={newInterviewPost}
                        />
                        <TextField
                          color="secondary"
                          focused
                          multiline
                          id="timeLimit"
                          name="timeLimit"
                          label="Time Limit"
                          defaultValue={interview.timeLimit}
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
                          defaultValue={interview.devLanguage}
                          onChange={newInterviewPost}
                        />
                      </Box>
                      <Box sx={{pt:1, pb: 1, pl: 2}}>
                        <Typography >Date of Interview:</Typography>
                        <Typography component='input' name="date" type="date" value={Date().now} onChange={newInterviewPost}/>
                      </Box>
                      <Box sx={{width: .75, p: 2, mb: .5,}}>
                        <TextField
                          color="secondary"
                          multiline
                          variant="filled"
                          rows={10}
                          fullWidth
                          id="question"
                          name="question"
                          label="Question"
                          defaultValue={interview.question}
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
                          defaultValue={interview.userResponse}
                          onChange={newInterviewPost}
                          />
                      </Box>
                      <Button variant='contained' type="submit" value="Submit Changes" sx={{margin: 2, padding: 1}}>Submit Changes</Button>
                      </form> : null
                      }
              <IconButton aria-label="delete"
                onClick={(event) => {handleInterviewDelete(interview)}}
                color="error">
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
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
          <Typography variant="h6" gutterBottom>
            {resource.title}
          </Typography>
          <Typography  variant="body1" component="div">
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
                  <Box  sx={{'& .MuiTextField-root': { m: 1, width: '25ch'},}}>
                  <form onSubmit={ (event) => {handleEditResourceSubmit(resource) } }>
                    <Typography variant="h6" color="primary" sx={{p: 2, m:2}} >Edit Resource:</Typography>
                      <TextField
                        name="user"
                        label="your name"
                        color='primary'
                        defaultValue={resource.user}
                        onChange={newResourcePost}/>
                      <TextField
                        name="title"
                        label="resource title"
                        defaultValue={resource.title}
                        onChange={newResourcePost}/>
                      <TextField
                        name="type"
                        label="resource type"
                        defaultValue={resource.type}
                        onChange={newResourcePost} />
                      <TextField
                        name="description"
                        label="resource description"
                        defaultValue={resource.description}
                        onChange={newResourcePost} />
                      <TextField
                        name="link"
                        label="link to resource"
                        defaultValue={resource.link}
                        onChange={newResourcePost}/>
                    <Button variant='contained' type="submit" value="Submit Changes" sx={{margin: 2, padding: 1}}>Submit Changes</Button>
                  </form>
                </Box>
              : null
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
                <Box sx={{display: 'flex', flexDirection: 'column-reverse'}}>
                  {interviewArray}
                </Box>
                  <Box sx={{m:5}}>
                  <Link to ="/interviewform">
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      aria-label='add your interview'
                      variant="contained"
                      startIcon={<AddIcon />}
                      >
                      Add
                    </Button>
                  </Link>
                  </Box>
                </ThemeProvider>
              </Route>
              <Route exact path="/resources">
                <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <TopNav />
                <Box sx={{display: 'flex', flexDirection: 'column-reverse'}}>
                {resourceArray}
                </Box>
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
                    <Typography variant="h4" sx={{p: 2, m:2}} >Add Your Interview:</Typography>
                    <form onSubmit={newInterviewSubmit}>
                      <Box color="primary" sx={{ m: 1, width: '80ch', pb: 2, pl: 2}} >
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
                  <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch'},}}>
                    <Typography variant="h4" sx={{p: 2, m:2}} >Share a Resource:</Typography>
                    <form onSubmit={newResourceSubmit}>
                        <Typography component="label"  sx={{pl: 1, pr: .5, m:1}} >Your Name: </Typography>
                          <TextField
                            name="user"
                            color='primary'
                            value={resource.user}
                            onChange={newResourcePost}/>
                          <Typography component="label"  sx={{pl: 1, pr: .5, m:1}} >Title: </Typography>
                            <TextField
                              name="title"
                              value={resource.title}
                              onChange={newResourcePost}/>
                        <Typography component="label"  sx={{pl: 1, pr: .5, m:1}} >Type: </Typography>
                          <TextField
                            name="type"
                            value={resource.type}
                            onChange={newResourcePost} />
                            <br/>
                        <Typography component="label"  sx={{pl: 1, pr: .5, m:1}} >Description: </Typography>
                          <TextField
                            name="description"
                            type="text"
                            value={resource.description}
                            onChange={newResourcePost}/>
                        <Typography component="label"  sx={{pl: 1, pr: .5, m:1}} >Link: </Typography>
                          <TextField
                            name="link"
                            type="text"
                            value={resource.link}
                            onChange={newResourcePost}/>
                        <Box sx={{padding: 2}}>
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
                        </Box>
                    </form>
                </Box>
                </ThemeProvider>
              </Route>
          </Switch>
      </ThemeProvider>
      </>
  </Router>
)
};

export default App;
