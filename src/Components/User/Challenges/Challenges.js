import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ChallengeDiv from "./Section/ChallengesDiv";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Dashboard() {
  const history = useHistory();
  var username;
  const [challenges, setChallenges] = useState([])
  const ChallengeList =  challenges.map((d) => <ChallengeDiv  key={d._id} title={d.title} language={d.language} description={d.description} id={d._id}/>);
  const token = localStorage.getItem("user_token");
  if (!token) console.log("user not found");
  else {
    const decoded = jwt_decode(token);
    console.log(decoded);
    username = decoded.name;
  }

  useEffect(() => {
    try {
      axios.get("/admin/challenges").then((res) => {

        setChallenges(res.data)
      })
    }
    catch (err) {
      alert(err)
    }
   
    // if (!token) {
    //   history.push("/login");
    // } else {
    //   console.log("time")
    //   history.push("/");
    // }
    // eslint-disable-next-line
  }, [0]);
  function stateCall () {
    console.log(challenges)
  }

  return (
    <div style={{background:"#F2F6F6"}}>
      <Navbar name={username} />
      {/* <div className='p-4 dashboard-header'>
        <div className="container">
          <div className='row'> */}
          {/* <h2 className="dashboard-header-title">Home</h2> */}
          {/* <h3 className="dashboard-header-title mx-auto"> This is the place to hone your Skills! </h3>
          </div>
          </div>

      </div> */}
      <div className="container">
        <div className="row mt-4  p-2">

       {ChallengeList }

        
      
        </div>
      </div>
    </div>
  );
}

export default Challenges;