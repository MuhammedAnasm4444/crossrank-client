import  React, { useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Form} from 'react-bootstrap';
import {  useHistory, useParams } from "react-router-dom";
import axios from "axios";

import makeToast from "../../../User/User/Toaster";

// import { useFormik } from 'formik';
import AddTest from "./AddTest";

// const initialValues = {
//   name:'',
//   email:'',
//   password:'',

// }       
// const onSubmit = values => {
//   console.log('form data', values)
// }
// const validate = values => {
//   let errors = {}
//   if(!values.name) {
//     errors.name = 'Required'
//   }
//   if(!values.email) {
//     errors.email = 'Required'
//   }
//   else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
//     errors.email = 'Invalid email format'
//     }
//     if(!values.password) {
//       errors.password = 'Required'
//     }
//     return errors 
//   }


const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}));
export default function Basic() {
  const classes = useStyles();
  const history = useHistory();
  const { id }  = useParams()
  const [taskId, setTaskId] = useState('')
  const [hide, setHide] = useState(true)
  // const SubmitContext = createContext(false)
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //    validate
  // })
  const [task, setTask] = useState({
    challengeId:id
  });
  const [test, setTest] = useState({
    challengeId:id,
    taskId:''
  })
  const [added, setAdded] = useState([])
  function submit(e){
    e.preventDefault()
    axios.post('/admin/add-task' , task).then(response => {
      makeToast("success",response.data.message.challenge);
      console.log(response.data)
      setTest({
        ...test,
        taskId:response.data.task._id
      })
      setTaskId(response.data.task._id)
      setHide(false)
      // history.push("/admin/challenges")
    }).catch((err ) => {
      console.log(err.response)
      if(err.response.data.message) makeToast("error",err.response.data.message)
      if(err.response.data.message) makeToast("error",err.response.data.message)
    })
  }
  function testAdded (id) {
    console.log(id)
    console.log(added)
    setAdded([...added,id])
  }
function onChange(e) {
  console.log(taskId)
   setTask({
     ...task,
     [e.target.name]:e.target.value
   })
  
  }
  // function testOnChange(e) {
  //   console.log(test)
  //   setTest({
  //     ...test,
  //     [e.target.name]:e.target.value
  //   })
  //  }
  // function testSubmit (e) {
  //   e.preventDefault()
  //   axios.post('/admin/add-testCase',test).then((response) => {
  //     makeToast("success","test succesfully added")
  //     history.push('/admin/challenges')
  //   }).
  //   catch((err) => {
  //     console.log(err)
  //   })
  // }
function proceed() {
  makeToast("success", "Task Added Successfully")
  history.push('/admin/challenges')
}

  return (
    <main className={classes.content}>
     
      <div className="row mt-3">
      <h2>Add Task</h2>
      </div>
      <Form onSubmit={submit} >
  <Form.Group controlId="exampleForm.ControlInput1" >
    <div className="row">
    <Form.Label className="font-weight-bold">Title</Form.Label>
    </div>
    <Form.Control type="text" name="title" placeholder="Task Title" onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1" className="mt-4">
    <div className="row">
    <Form.Label className="font-weight-bold" >Task</Form.Label>
    </div>
    <Form.Control as="textarea" name="task" rows={2} placeholder="Describe your Task here..."  required onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1" className="mt-4">
    <div className="row">
    <Form.Label className="font-weight-bold" >Point</Form.Label>
    </div>
    <Form.Control as="input" min={5} max={15} type="number" name="point" rows={1} placeholder="Set up your point... Max 15 points"  required onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2" className="mt-5">
    <div className="row">
    <Form.Label className="font-weight-bold">Input Format</Form.Label>
    <small className="ml-auto">*Only if necessary</small>
    </div>
    <Form.Control as="textarea" rows={3} name="inputFormat"  placeholder="eg/-A single line containing a positive integer, ." onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <div className="row">
    <Form.Label className="font-weight-bold">Output Format</Form.Label>
    </div>
    <Form.Control as="textarea" rows={3} name="outputFormat" placeholder="eg/- Print Hello, World! to stdout."onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1" className="mt-5">
    <div className="row">
    <Form.Label className="font-weight-bold" >Sample Input </Form.Label>
    <small className="ml-auto">*Only if necessary</small>
    </div>
    <Form.Control as="textarea" rows={3} name="sampleInput" placeholder="no sample input" onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <div className="row">
    <Form.Label className="font-weight-bold">Sample Output</Form.Label>
    </div>
    <Form.Control as="textarea" rows={3} name="sampleOutput" placeholder="Hello World!" onChange={onChange} readOnly={!hide}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1" className="mt-5">
    {/* <div className="row">
    <Form.Label className="font-weight-bold">Output</Form.Label>
    </div> */}
    {/* <Form.Control as="textarea" rows={3} name="output" placeholder="Enter the preffered Output of the question" onChange={onChange} readOnly={!hide}/> */}
  </Form.Group>
{hide && <Button variant="contained" color="primary" type="submit" style={{width:"100%"}}>
    Submit
  </Button>}
</Form>
<div className="mt-3" id="test-case-div">
  <div className="row">
  <h2 className="test-case-font">Add Test Cases</h2>
  <small className="ml-auto mt-4 font-weight-bolder">*Add minimum Three test cases</small>
  </div>
  <hr/>

  <div className="row">

      <AddTest count={1} taskId={taskId} challengeId={id}  setAdd={testAdded}/>
      <AddTest count={2} taskId={taskId} challengeId={id}  setAdd={testAdded}/>
      <AddTest count={3} taskId={taskId} challengeId={id}  setAdd={testAdded}/>
    
        {/* {
      testList.map((item) => {
        return <AddTest count={item} taskId={taskId} challengeId={id} />
      })
    } */}
      {/* <div className="col-md-4">
        <p className="font-weight-bolder" style={{color:"darkslategrey"}}>Test Case 2</p>
      <Form.Label className="font-weight-bold">Input</Form.Label>
      <Form.Control as="textarea" rows={2} name="input" placeholder="Enter the Test Input" onChange={testOnChange}/>
      <Form.Label className="font-weight-bold">Output</Form.Label>
      <Form.Control as="textarea" rows={2} name="output" placeholder="Enter the Test Output" onChange={testOnChange}/>
      </div>
      <div className="col-md-4">
        <p className="font-weight-bolder" style={{color:"darkslategrey"}}>Test Case 3:</p>
      <Form.Label className="font-weight-bold">Input</Form.Label>
      <Form.Control as="textarea" rows={2} name="output" placeholder="Enter the Test Input" onChange={testOnChange}/>
      <Form.Label className="font-weight-bold">Output</Form.Label>
      <Form.Control as="textarea" rows={2} name="output" placeholder="Enter the Test Output" onChange={testOnChange}/>
      </div> */}
      
      {added.length===3 && <Button variant="contained" className="ml-auto" type="button"  style={{color:'white',background:'green'}} onClick={proceed}>
   Proceed
  </Button>}
  </div>
 
</div>
      <div className={classes.toolbar} />
    </main>
  );
}
