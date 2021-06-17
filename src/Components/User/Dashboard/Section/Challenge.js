import React, { useContext, useEffect, useState } from "react";
import "./ChallengeDiv.css";

import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../User/User";

function Challenge() {
  const [data, setData] = useState({ challenge: {}, tasks: [] });
  const { id } = useParams();
  const {state} = useContext(AuthContext)
  const taskDiv = data.tasks.map((task) => (
   
      <Link to={"https://ycart.tk/challenge/task/?taskId="+task._id+"&challengeId="+id} key={task._id}>
    <div className="card-div" >
      <div className=" task-div p-4  mb-5 row">
        <h2 className="font-weight-bolder">{task.title}</h2>
        <h6 className="ml-auto">
          Level:<span className="font-weight-bolder">1</span>
        </h6>
      </div>
    </div>
    </Link>
  ));
  useEffect(() => {
    // if (!token) {
    //   history.push("/login");
    // } else {
    //   console.log("time")
    //   history.push("/");
    // }
    
    axios.get("/admin/get-challenge/" + id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="task-main-div">
      <div className="row task-title-div" style={{ marginRight: "0" }}>
        <div className="ml-5 ">
          <h1 className="mt-4 ml-4 mb-1">{data.challenge.title}</h1>
          <h5 className="ml-4 text-success font-weight-bolder">
            {data.challenge.language}
          </h5>
        </div>
        <div className="ml-auto">
          <p className="m-4">No of Tasks</p>
          <p className="m-4">Difficulty level</p>

          {/* <BorderLinearProgress variant="determinate" value={50} style={{width:"100%"}}/> */}
        </div>
      </div>
      <div className="row ml-5 mt-5">
        <div className="col-md-8 ">
        {taskDiv}
        </div>
      </div>
    </div>
  );
}

export default Challenge;
