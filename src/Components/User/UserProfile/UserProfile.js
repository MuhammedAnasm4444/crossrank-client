import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import EditIcon from "@material-ui/icons/Edit";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Button} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { AuthContext } from "../User/User";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
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
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 8,
  },
});

function UserProfile() {
  const classes = useStyles();
  const { state } = useContext(AuthContext)
  const [user, setUser] = useState({name:'',email:''})
  const [submission, setSubmission] = useState([])
  const [contest, setContest] = useState([])
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);
   axios.post("https://anasmhd.tk/upload-user-profile", formData)
   .then((response) => {

   })
   .catch((err) => {
     
   })
    // await fetch("YOUR_URL", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: formData
    // });
  };
  const submissionDiv  = submission.map((item) => 
    <div key={item._id}>
      <Link >
      <Button className="text-info">
      {item.task}
      </Button>
      </Link>
    </div>
  )
  const contestDiv = submission.map((item) => 
    <Card style={{ width: '18rem' }} key={item._id}>
  <Card.Body>
    <Card.Title className="font-weight-bold">{item.challenge}</Card.Title>
    <div className="row pl-3">
    <Card.Subtitle className="mb-2 text-muted">Total tasks:<span className="font-weight-bolder">10</span></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted ml-auto mr-3">Completed:<span className="font-weight-bolder">2</span></Card.Subtitle>
    </div>
    <Card.Text>
    Increase your Problem solving skills by practising this challenge
    </Card.Text>
    <Card.Link href="#">Leaderboard</Card.Link>
    <Card.Link href="#">Go to challenges</Card.Link>
  </Card.Body>
</Card>
  )
  
 

  useEffect(() =>{
    axios.get('https://anasmhd.tk/user-profile/'+state.id).
    then((response) =>{
     console.log(response.data.submissions)
     console.log(response.data.user)
      setUser(response.data.user)
      setSubmission(response.data.submissions)
      
    })
  },[])


  return (
    <div className="my-container">
      <div className="main-div">
        <div className="row mt-4">
          <div className="about-div mt-2 pl-5 col-md-3">
            <img src="/profile.png" width={50} height={50} />
            <h3 className="name-font mt-4">{user.name}</h3>
            <p className="subtext-about">{user.email}</p>
            <Link>
              <div className="row">
                <p className="ml-3">Edit Profile</p>{" "}
                <EditIcon fontSize="small" />
              </div>
            </Link>
            <hr></hr>
            <h2 className="about-heading">About</h2>
            <p>Current</p>
            <p>Education</p>
            <p>More about Me</p>
            <hr/>
            <h2 className="about-heading mt-5">Wanna write a blog..</h2>
           <div className="row">
           <p className="ml-3">Add your blog now</p><Link to="/add-blog"><AddToPhotosIcon /></Link>  </div>
          </div>
          <div className="stats-div  col-md-9 mt-4">
            <div className="card-div">
              <div className=" task-div pt-4 pl-4 pr-2 pb-4 mb-5 row">
                <div>
                <h4 className="font-weight-bolder"> Skills</h4>
                {false &&<div className="row">
                <p className="ml-2">python</p> <p className="ml-2">Javascript</p>
                </div>?<p>hello</p>:<p>You have not earned verified skills yet</p>}
                </div>
                <h6 className="ml-auto">
                  {/* Level:<span className="font-weight-bolder">1</span> */}
                </h6>
                
              </div>
             
            </div>
            <div className="card-div">
              <h3>Current Level</h3>
              <div className=" task-div p-4  mb-5 row">
                <h4 className="font-weight-bolder">Bronze</h4>
                <div className={classes.root}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </div>
              </div>
            </div>
            <div className="card-div">
              <div className=" task-div p-4  mb-5 row">
                <div className="">
                <h4 className="font-weight-bolder"> Submissions</h4>
                {submissionDiv}
                </div>

              </div>
            </div>
            <div className="card-div">
              <div className=" task-div p-4  mb-5 row">
                <div>
                <h4 className="font-weight-bolder">Contest History</h4>
                {contestDiv}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;