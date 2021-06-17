import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

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
import makeToast from '../../User/User/Toaster';
import axios from 'axios';


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
  const [login, setLogin] = useState();
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
  if (token) history.push('/admin')
    // eslii
  })
  function submit (e){
    e.preventDefault()
    axios.post('https://ycart.tk/admin/login',login).then(response => {
      makeToast("success",response.data.message);
      localStorage.setItem("admin_token", response.data.token)
      history.push("/admin")
    }).catch((err ) => {
     
      console.log(err.response)
    
      if(err.response.data.message) makeToast("error",err.response.data.message)
      if(err.response.data.message) makeToast("error",err.response.data.message)
    })
  }
function onChange(e) {
   setLogin({
     ...login,
     [e.target.name]:e.target.value
   })
   
}

  return (
      
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
   
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
       
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login 
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
            autoComplete="current-password"
            onChange={onChange}
          />
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
             
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                
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
