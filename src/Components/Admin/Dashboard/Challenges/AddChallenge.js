import React ,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";
import makeToast from '../../../User/User/Toaster';
import axios from 'axios';

import './Challenges.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
const initialValues = {
  title:'',
  description:'',
  language:''

}       

// const validate = values => {
//   let errors = {}
//   if(!values.title) {
//     errors.title = 'Required'
//   }
//   if(!values.description) {
//     errors.description = 'Required'
//   }
  
//     return errors 
//   }
  const validationSchema = Yup.object({
    title:Yup.string().required('This field is required'),
    description:Yup.string().min(30,'Enter minimum 30 words').required('This field is required')
  })
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

function AddChallenge() {
    const classes = useStyles();
    
    const [challenge, setChallenge] = useState({
      title:"",
      description:""
    });
    const onSubmit = challenge => {
     

      axios.post('/admin/add-challenge', challenge).then(response => {
        makeToast("success",response.data.message);
        history.push("/admin/challenges")
      }).catch((err ) => {
       
        console.log(err.response)
      
        if(err.response.data.message) makeToast("error",err.response.data.message)
        if(err.response.data.message) makeToast("error",err.response.data.message)
      })
    }
    const history = useHistory()
    const formik = useFormik({
      initialValues,
      onSubmit,
       validationSchema
    })
   
    useEffect(() => {
      const token = localStorage.getItem("admin_token");
    if (!token) history.push('/admin/login')
      // es  {errors.lastName && <p>Last name is required.</p>}lii
    },[history])
    
    // function submit (e){
    //   e.preventDefault()
    //   console.log(e)

    //   axios.post('/admin/add-challenge', challenge).then(response => {
    //     makeToast("success",response.data.message);
    //     history.push("/admin/challenges")
    //   }).catch((err ) => {
       
    //     console.log(err.response)
      
    //     if(err.response.data.message) makeToast("error",err.response.data.message)
    //     if(err.response.data.message) makeToast("error",err.response.data.message)
    //   })
    // }
    
  function onChange(e) {
     setChallenge({
       ...challenge,
       [e.target.name]:e.target.value
     })
    }
    console.log(formik.values)
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
<div className="container">
    <h2>Add Challenge</h2>
<Form  onSubmit={formik.handleSubmit}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label className="font-weight-bold">Title</Form.Label>
    <Form.Control type="text" placeholder="Title"  name="title" {...formik.getFieldProps('title')} />
    {formik.touched.title && formik.errors.title ? (<div className="error">{formik.errors.title}</div>) : null}
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label className="font-weight-bold"> Preffered Programming Language</Form.Label>
    <Form.Control  as="select" name="language" onChange={onChange}  {...formik.getFieldProps('language')}>
      <option> Select a Language</option>
      <option  value="Python">Python</option>
      <option value="Javascript">Javascript</option>
      <option  value="C++">C++</option>
      <option  value="Java">Java</option>
      <option value="Multiple languages">Multiple languages</option>
    </Form.Control>
 </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label className="font-weight-bold">Challenge Description</Form.Label>
    <Form.Control as="textarea" name="description" rows={3}  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    {formik.touched.description && formik.errors.description ? (<div className="error">{formik.errors.description}</div> ): null}
  </Form.Group> 
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
        </main>
    )
  }
export default AddChallenge

// const initialValues = {
//   title:'',
//   description:'',

// }       
// const onSubmit = values => {
//   console.log('form data', values)
// }
// const validate = values => {
//   let errors = {}
//   if(!values.title) {
//     errors.title = 'Required'
//   }
//   if(!values.description) {
//     errors.description = 'Required'
//   }
  
//     return errors 
//   }
//   const validationSchema = Yup.object({
//     title:Yup.string().required('This field is required'),
//     description:Yup.string().min(30,'Enter minimum 30 words').required('This field is required')
//   })