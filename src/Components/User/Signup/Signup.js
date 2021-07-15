import React , { useState }from 'react';
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
import ReactLoading from "react-loading";
import GoogleLogin  from 'react-google-login';


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

export default function SignIn(props) {
  const classes = useStyles();
  const [signup, setSignup] = useState({name:"", email:"",password:"",password2:""});
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const handleLogin = async googleData => {
  const res = await fetch("https://anasmhd.tk/signup/google", {
      method: "POST",
      body: JSON.stringify({
      token: googleData.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  console.log(data)
  // makeToast("success",response.data.message);
  localStorage.setItem("user_token", data.token)
  history.push("/")
  // store returned user somehow
}
  
  function submit (e){
    e.preventDefault()
    setLoading(true)
    axios.post("https://anasmhd.tk/signup",signup).then(response => {
      setLoading(false)
      if(response.data.error) {
      if(response.data.email) makeToast("error", response.data.email)
      if(response.data.password) makeToast("error",response.data.password)
      if(response.data.password2) makeToast("error",response.data.password2)
      if(response.data.message) makeToast("error",response.data.message)

      }
      else {
        makeToast("success", "Account Created");
        history.push('/login')

      }
     
    }).catch((err ) => {
      setLoading(false)
      console.log(err)
      makeToast("error", "internal server error")
      // if(err.response.data.email) makeToast("error", err.response.data.email)
      // if(err.response.data.password) makeToast("error",err.response.data.password)
      // if(err.response.data.password2) makeToast("error",err.response.data.password2)
      // if(err.response.data.message) makeToast("error",err.response.data.message)
    })
  }
function onChange(e) {
   setSignup({
     ...signup,
     [e.target.name]:e.target.value
   })
   
}
  return (
    <>{
      loading === true ? (
        <div className="container">
        <div className="row  ">
          <ReactLoading
            type={"spin"}
            color={"#03fc4e"}
            width={150}
            className="mx-auto loading-icon"
          />
        </div>
        </div>
      ) :
      (
  
 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up  
          {/* <GoogleLogin
    clientId='6775234701-r2b5d9c9vqdjmpar5nhg5nfon5rcepo1.apps.googleusercontent.com'
    
    onSuccess={handleLogin}
    // onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/> */}
        </Typography>
        <form className={classes.form} onSubmit={submit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            type="text"
            name="name"
            value={signup.name}
            autoComplete="name"
              onChange={onChange}

            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={signup.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={signup.password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={signup.password2}
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            autoComplete="current-password"
            onChange={onChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
     
      </Box>
    </Container>
      )
      }
    </>
  );
}