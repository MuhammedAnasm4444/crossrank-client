import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import makeToast from "../User/Toaster";
import { AuthContext } from "../User/User";
import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#303f9f",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [login, setSignup] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  function submit(e) {
    e.preventDefault();
    console.log("logging 1");
    setLoading(true);
    axios
      .post("https://ycart.tk/login", login, {})
      .then((response) => {
        if (response.data.message === "userLoggedIn") {
          setLoading(false);
          makeToast("success", response.data.message);
          dispatch({
            type: "LOGIN",
            payload: response.data,
          });
          history.push("/");
        } else if (response.data.error) {
          setLoading(false);
          if (response.data.email) makeToast("error", response.data.email);
          if (response.data.emailNotFound)
            makeToast("error", response.data.emailNotFound);
          if (response.data.message) makeToast("error", response.data.message);
          if (response.data.passwordInCorrect)
            makeToast("error", response.data.passwordInCorrect);
        }
      })
      .catch((err) => {
        setLoading(false)
        makeToast("error", "please try again");
        console.log(err.message);
        console.log(err);
        // if(err.response.data.email) makeToast("error", err.response.data.email)
        // if(err.response.data.emailNotFound) makeToast("error",err.response.data.emailNotFound)
        // if(err.response.data.message) makeToast("error",err.response.data.message)
        // if(err.response.data.passwordInCorrect)makeToast("error",err.response.data.passwordInCorrect)
      });
  }
  function onChange(e) {
    setSignup({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      {loading === true ? (
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
      ) : (
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      )}
    </>
  );
}
