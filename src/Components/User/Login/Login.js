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
}));

export default function SignIn() {
  const classes = useStyles();
  const [login, setSignup] = useState();
  const history = useHistory()
  const { dispatch } = useContext(AuthContext);
  function submit (e){
    e.preventDefault()
    console.log("logging")
    axios.post('https://ycart.tk/login',login).then(response => {
      makeToast("success",response.data.message);
      console.log(response.data)
      dispatch({
        type: "LOGIN",
        payload: response.data
    })
      history.push("/")
    }).catch((err ) => {
      if(err.response.data.email) makeToast("error", err.response.data.email)
      if(err.response.data.emailNotFound) makeToast("error",err.response.data.emailNotFound)
      if(err.response.data.message) makeToast("error",err.response.data.message)
      if(err.response.data.passwordInCorrect)makeToast("error",err.response.data.passwordInCorrect)
    })
  }
function onChange(e) {
   setSignup({
     ...login,
     [e.target.name]:e.target.value
   })
   
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
   
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
       
        </Avatar>
        <Typography component="h1" variant="h5">
           Login
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
     
      </Box>
    </Container>
  );
}