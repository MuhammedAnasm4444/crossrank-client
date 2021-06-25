import React, { useEffect } from 'react'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentBox from "./CommentBox";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Collapsible from 'react-collapsible';
import './BlogPage.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://ycart.tk/socket";
// const ENDPOINT  = 'http://localhost:8001';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(1),
    },
  }));
  
function Comments({blog, user, userId}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState([])
    const comments = response.map((item) => 
    <div className="" key={item._id}>
     
                    <div ><strong>{item.user}</strong><time pubdate="" className="comment-time ml-2" dateTime="2016-03-22T08:00:53-05:00">
              {item.date}             </time></div>
                    <h6 className="ml-3"> {item.comment}</h6>
                    <hr></hr>
                  </div>
    )
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT,{path:'/socket', query:{blog:blog}});
        console.log('comment'+blog)
        const obj = {
             blog:blog
        }
        socket.emit("getComments",obj)
        socket.on("getComments", data => {
            console.log(data)
          setResponse(data);
        });
      

    },[])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    return (
       <div className="ml-2" style={{width:"90%"}}>
                {/* <ChatBubbleIcon onClick={handleClick}/> */}
                <Collapsible trigger={<ChatBubbleIcon  />}>
                <CommentBox  blog={blog} user={user} userId={userId}/>
                <div className="mt-3 comments-list">
                  {comments}
                </div>
              
    </Collapsible>
    
                {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.typography}>
            {comments.length===0?<p>No comments yet</p>:comments}
        </div>
      </Popover> */}
                </div>
       
    )
}

export default Comments
