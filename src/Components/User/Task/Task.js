import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Task/Task.css";

import LinearProgress from "@material-ui/core/LinearProgress";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Box from "@material-ui/core/Box";

import AceEditor from "react-ace";
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import makeToast from "../User/Toaster";
import Challenge from "../Dashboard/Section/Challenge";
import { Form } from 'react-bootstrap';
import { AuthContext } from "../User/User";
import Countdown from 'react-countdown';
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: 250,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function Task(props) {
  const [task, setTasks] = useState({});
  
  const [outputValue, setOutputValue] = useState();
  const search = useLocation().search;
  const taskId = new URLSearchParams(search).get("taskId");
  const challengeId = new URLSearchParams(search).get("challengeId");
  const {state} = useContext(AuthContext) 
  const [show, setShow] = useState(true)
  const [challenge, setChallenge] = useState({ language: "",taskId:""});
  const [attempts, setAttempts]  = useState(0)
  const [language, setLanguage] = useState('python')
  const [output, setOutput] = useState({taskId:taskId,language:"",script:""});
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    console.log("hai")
    console.log(state)
    axios
      .get("https://ycart.tk/admin/get-task/?taskId=" + taskId + "&challengeId=" + challengeId)
      .then((response) => {
        setTasks(response.data.task);
        setChallenge(response.data.challenge);
        setOutput({
          ...output,
          language: response.data.challenge.language==="Multiple languages"?language:response.data.challenge.language,
          point:response.data.task.point
         
        });
      });
    return (i) => {
      console.log(i);
    };
  }, [taskId, challengeId]);

  function onChange(newValue) {
    console.log(output)
    console.log(state)
    setOutput({
      ...output,
      script: newValue,
    });
  }
  function changeLanguage(e) {
    console.log(e.target.value)
    setLanguage(e.target.value)
    setOutput({
      ...output,
      language:e.target.value
    })
  }
  function setSubmission (status,point) {
    
    const submission = {
      taskId :taskId,
      task:task.title,
      challenge:challenge.title,
      challengeId:challengeId,
      userId:state.id,
      attempts:attempts,
      point:point,
      status:status
    }
    axios.post("https://ycart.tk/add-submission", submission)
    .then((response) => {
      console.log(response)
    
    }).catch((err) => {
      console.log(err)
    })
  }
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if(completed) {
      alert("time is up")
      return <span>{hours}:{minutes}:{seconds}</span>
    }
    else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
    
  } 
  function run(e) {
    console.log(output);
    setOpen(true)
    setAttempts(prev => prev + 1)
    if (output.script === "" || output.script === null) {
      setOpen(false)
      alert("you hadn't written any code");
    } else {
      axios
        .post("https://ycart.tk/admin/submit-code", output)
        .then((response) => {
          console.log(response);
          setOutputValue(response.data.test);
          if(response.data.correct){
            makeToast("success",response.data.message)
            setSubmission(true,output.point)
            setShow(false)
            setOpen(false)
          }
          else {
            makeToast('error', response.data.message)
            setSubmission(false)
            setOpen(false)
          }

          // makeToast("success",response.data.message);
          // localStorage.setItem("user_token", response.data.token)
          // history.push("/")
        })
        .catch((err) => {
          makeToast("error","internal error please try again")
          setOpen(false)
        });
    }
  }
  return (
    <div className="task-main-div">
      <div className="row task-title-div" style={{ marginRight: "0" }}>
        <div className="ml-5 ">
          <h1 className="m-4 task-title">{task.title}</h1>
        </div>
        <div className="ml-auto">
          <p className="m-4">{challenge.title}</p>

          {/* <BorderLinearProgress variant="determinate" value={50} style={{width:"100%"}}/> */}
        </div>
      </div>
      <div className="row ml-5 mt-5">
        <div className="col-10 col-md-8 task-div p-4 pt-5">
          <p className="font-weight-bolder">Task</p>
          <div>
            <p className="task-text">{task.task}</p>
          </div>

          <p className="font-weight-bolder">Input Format</p>
          <div>
            <p className="task-text">{task.inputFormat}</p>
          </div>

          <p className="font-weight-bolder">Output Format</p>
          <div>
            <p className="task-text">{task.outputFormat}</p>
          </div>

          <p className="font-weight-bolder">Sample Input</p>
          <div className="task-code-div p-3 ">
            <p className="task-code-text ml-3 my-auto">{task.sampleInput}</p>
          </div>

          <p className="font-weight-bolder mt-2">Sample Output</p>
          <div className="task-code-div p-3 ">
            <p className="task-code-text ml-3 my-auto">{task.sampleOutput}</p>
          </div>
        </div>
        <div className="p-4 col-10 col-md-4 " style={{overflowX:'hidden'}}>
          <div className="row time-bar">
          <p className="ml-2">Time Left</p>
          <p className="ml-auto mr-3" style={{color:"black"}}>  <Countdown date={Date.now() + 900000} renderer={renderer}/></p>
          </div>
          <hr className="mt-5"/>
          <div className="row">
          <p>Author</p>
          <p className="ml-auto mr-3" style={{ color: "blue"}}>Admin</p>
          </div>
          <div className="row">
          <p>Points</p>
          <p className="ml-auto mr-3" style={{ color: "blue"}}>{task.point}</p>
          </div>
          <div className="row">
          <p>Submitted by</p>
          <p className="ml-auto mr-3" style={{ color: "blue"}}>2</p>
          </div>
          <hr></hr>
         
        </div>
      </div>
      <div className="mt-5">
        <div className="ml-4 row col-10 col-md-8">
          <p className="font-weight-bold">Enter Your Code Here </p>
          <p className="ml-auto text-success font-weight-bolder">{challenge.language === 'Multiple languages'?(<Form.Control  as="select" name="language" onChange={changeLanguage}  >
      <option  value="python3">Python</option>
      <option value="nodejs">Javascript</option>
      <option  value="dart">dart</option>
      <option  value="java">Java</option>
    </Form.Control>):challenge.language}</p>
        </div>

        <div className="row ml-5 mr-3 ">
          <div className="col-md-8">
          <AceEditor
            mode={language}
            theme="solarized_dark"
            fontSize={20}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            // height="300px"
            // width="830px"
            className="editor-crossrank"
            maxLines={10}
            minLines={10}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableSnippets: true,
            }}
            style={{width:"100%",height:"300px"}}
          />
        </div>
        </div>
        <div className="ml-5 mt-4">
          <div className="row">
            {/* <Button className="ml-3" variant="outlined" color="primary" type="button" onClick={run}>
              Run
            </Button> */}
            <div className="col-md-8">
              <div className="row">
            {show && <ColorButton className="ml-3" type="button" onClick={run}>
              Submit
            </ColorButton>}
            {!show && <ColorButton className="ml-auto" type="button" >
               Go to next task
            </ColorButton>}
            </div>
            </div>

          </div>

          <div className="row mt-4">
            <div className="col-11 col-md-8">
              <div className="label-box border">
                <span className="mx-4 font-weight-light">Output</span>
              </div>
              <textarea
                className="form-control output"
                rows="6"
                value={outputValue}
                disabled={true}
                aria-label="output-textarea"
              ></textarea>
              <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
// a=int(input())
// b=int(input())
// a+=b
// print(a)

