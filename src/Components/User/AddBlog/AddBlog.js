import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import makeToast from '../User/Toaster';
import { AuthContext } from '../User/User';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8000";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#303f9f',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  post: {
      
  }
}));

function AddBlog() {
    const classes = useStyles();
    
    const history = useHistory()
    const { state } = useContext(AuthContext);
    //test  user
    const [login, setSignup] = useState({user:'test',userId:'60aa51536528d3b71e06de32'});
    // const [login, setSignup] = useState({user:state.user.name,userId:state.user.id});
  function submit (e){
    e.preventDefault()
    const socket = socketIOClient(ENDPOINT);
    
    axios.post('/add-blog',login).then(response => {
      makeToast("success",response.data.message);
      console.log(response.data)
      socket.emit("getBlogs")
     
      history.push("/")
    }).catch((err ) => {
      if(err.response.data.email) makeToast("error", err.response.data.email)
      if(err.response.data.emailNotFound) makeToast("error",err.response.data.emailNotFound)
      if(err.response.data.message) makeToast("error",err.response.data.message)
      if(err.response.data.passwordInCorrect)makeToast("error",err.response.data.passwordInCorrect)
    })
  }
function onChange(e) {
    console.log(login)
   setSignup({
     ...login,
     [e.target.name]:e.target.value
   })
   
}
    return (
        <div>
             <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
   
        {/* <Avatar className={classes.avatar}>
        
       
        </Avatar> */}
        <Typography component="h1" variant="h5">
           Add your blog
        </Typography>
        <form className={classes.form} onSubmit={submit}>
            
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="subheading"
            label="subHeading"
            id="subHeading"
            onChange={onChange}
        
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            size='medium'
            multiline
            rows={7}
            classes={{
                root: classes.post, // class name, e.g. `classes-nesting-root-x`
                 
              }}
            name="post"
            label="post"
            id="post"
            onChange={onChange}
        
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post the blog
          </Button>
      
        </form>
      </div>
      <Box mt={8}>
     
      </Box>
    </Container>
        </div>
    )
}

export default AddBlog
