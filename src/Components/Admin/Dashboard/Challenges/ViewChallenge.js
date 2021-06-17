import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import "./Challenges.css"

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

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
function ViewChallenge() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    challenge: {},
    tasks: [],
  });
  const tasks = data.tasks.map((item) => (
    <Grid item xs={12} md={12} key={item._id} className="mt-2">
    <CardActionArea component="a" href="#">
      <Card className={`m-3 ${classes.card}`}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {/* {post.title} */}
              <Box fontWeight="fontWeightBold">{item.title}</Box>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {/* {post.date} */}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {/* {post.description} */}
              Candidates who successfully clear the test will be specially
              highlighted to companies when they apply to relevant roles.
            </Typography>
            <Link to={"/admin/task/"+item._id}>
            <Typography variant="subtitle1" color="primary">
              Go to Task Page
            </Typography>
            </Link>
          </CardContent>
        </div>
        
      </Card>
    </CardActionArea>
  </Grid>

  ))
  const url = "/admin/add-question/" + id;
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) history.push("/admin/login");
    else {
      axios
        .get("https://ycart.tk/admin/get-challenge/" + id)
        .then((response) => {
          console.log(response.data);
          var data = response.data;
          setData(data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);
  return (
    <main className={classes.content}>
      <div>
      <div>
        <div className="row mt-3">
          <h2 className="font-weight-bold">{data.challenge.title}</h2>
        </div>
        <div className="row ">
          <h4 className="mr-4">
            Language:
            <span className="text-success font-weight-bolder">
              {data.challenge.language}
            </span>
          </h4>

          <h5 className="ml-auto">
            <span className="text-muted">Total Tasks:</span>
            <span className="font-weight-bolder">{data.challenge.key}</span>
          </h5>
        </div>
        <div className="row">
          <h4>Description:</h4>
          <h5>{data.challenge.description}</h5>
          <Link to={url} className="ml-auto ">
            <Button variant="contained" color="primary" className="mb-2">
              Add Tasks
            </Button>
          </Link>
        </div>
      </div>
      </div>
      <div className="task-div p-3">
{tasks.length>0?tasks:<p>Not task Added</p>}
</div>
    </main>
  );
}

export default ViewChallenge;
