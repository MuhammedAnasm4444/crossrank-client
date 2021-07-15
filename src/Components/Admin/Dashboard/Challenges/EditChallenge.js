import React ,{ useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import makeToast from '../../../User/User/Toaster';
import axios from 'axios';
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

function EditChallenge() {
    const classes = useStyles();
    const [challenge, setChallenge] = useState({
        title:"",
        language:"",
        description:"",
      
    });
    const history = useHistory()
    const { id }  = useParams()
    useEffect(() => {
      const token = localStorage.getItem("admin_token");
      if (!token) history.push('/admin/login')
      else {
          axios.get('https://anasmhd.tk/admin/get-challenge/'+id).then(response =>{
              console.log(response.data)
              var data = response.data.challenge
              setChallenge({
                  ...challenge,
                   ...data
              })
          })
          .catch((err) => {
              console.log(err.response);
          })
      }
      
    },[])
    function submit (e){
      e.preventDefault()
      axios.post('https://anasmhd.tk/admin/edit-challenge', challenge).then(response => {
        makeToast("success",response.data.message);
        history.push("/admin/challenges")
      }).catch((err ) => {
       
        console.log(err.response)
      
        if(err.response.data.message) makeToast("error",err.response.data.message)
        if(err.response.data.message) makeToast("error",err.response.data.message)
      })
    }
  function onChange(e) {
     setChallenge({
       ...challenge,
       [e.target.name]:e.target.value
     })
    }
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
<div className="container">
    <h2>Edit Challenge</h2>
<Form onSubmit={submit}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label className="font-weight-bold">Title</Form.Label>
    <Form.Control type="text" placeholder="Title" name="title" value={challenge.title}  onChange={onChange}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label className="font-weight-bold"> Preffered Programming Language</Form.Label>
    <Form.Control  as="select" name="language" onChange={onChange} value={challenge.language}>
      <option> Select a Language</option>
      <option  value="Python">Python</option>
      <option value="Javascript">Javascript</option>
      <option  value="C++">C++</option>
      <option  value="Java">Java</option>
    </Form.Control>
 </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label className="font-weight-bold">Challenge Description</Form.Label>
    <Form.Control as="textarea" name="description" rows={3}  onChange={onChange} value={challenge.description}/>
  </Form.Group> 
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
        </main>
    )
  }
export default EditChallenge