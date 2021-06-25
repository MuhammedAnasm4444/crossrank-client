import React, { useEffect, useState } from 'react';
import './BlogPage.css';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://ycart.tk";
// const ENDPOINT  = 'http://localhost:8001';
function CommentBox({blog, user, userId}) {
    const [color, setColor] = useState('skyblue')
    const [comment, setComment] = useState({comment:''})

   function onChange(e) {
       
       console.log(comment)
       console.log(blog)
        setComment({
          ...comment,
          [e.target.name]:e.target.value
        })
        comment.comment===""?setColor('skyblue'):setColor('dodgerblue')
        
     }
     function post () {
        const socket = socketIOClient(ENDPOINT, {path:'/socket',query:{blog:blog}});
        var currentdate = new Date();
var datetime = "-" + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
         if(comment.comment==="") {
             alert("no words")
         }
         else {
             const obj = {
                 blog:blog,
                 comment:comment.comment,
                 user:user,
                 userId:userId,
                 date:datetime
                
             }
             axios.post("https://ycart.tk/post-comment",obj).then((response) => {
                 console.log(response.data)
                 
                 setComment({
                     ...comment,
                     comment:''
                 })
                 socket.emit("getComments",obj)
                 socket.on("getComments", data => {
                    console.log(data)
                 console.log("got sepij i")
                });
              
             })

         }
     } 
     
    //  useEffect(() => {
    //      console.log(comment)
    //     comment.comment===""?setColor('skyblue'):setColor('dodgerblue')
    //    console.log(color)
    //  }, [color])
    return (
      
      <div className="comment-box row ml-1 mt-2">
              <textarea rows="1" className="comment-input-box" value={comment.comment} name="comment" placeholder="Add a comment..." onChange={onChange} />
              
              <h6 className="post ml-auto mr-2 mt-1" style={{color:color}}onClick={post}>Post</h6>
            </div> 
    //   {/* <ChatBubbleIcon /> */}
  
    )
}

export default CommentBox
