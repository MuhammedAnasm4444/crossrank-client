import React, { useState, useEffect, useContext } from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './BlogPage.css'
import LikeButton from "./LikeButton";
import CommentBox from "./CommentBox";

import { AuthContext } from "../User/User";
import Comments from "./Comments";
const ENDPOINT = "https://ycart.tk";


function BlogPage() {
    const [response, setResponse] = useState([]);
    const [color, setColor] = useState('skyblue')
    const {state} = useContext(AuthContext)
    

    const blogDiv = response.map((item) => 
        <div className="blog-card" key={item._id}>
        <div className="meta">
          <div className="photo" style={{backgroundImage: "url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"}}></div>
          <ul className="details">
            <li className="author"><a href="#">{item.user}</a></li>
            <li className="date">Mar. 24, 2021</li>
            <li className="tags">
              <ul>
                <li><a href="#">Learn</a></li>
                <li><a href="#">Code</a></li>
                <li><a href="#">HTML</a></li>
                <li><a href="#">CSS</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="description">
          <h1>{item.title}</h1>
          <h2>{item.subheading}</h2>
          <p>{item.post}</p>
          <p className="read-more">
            <Link to={"/blog/"+item._id}>Read More</Link>
            {/* <a href="#">Read More</a> */}
          </p>
          <div className="row">
            {/* <div className="comment-box row ml-1">
              <textarea rows="1" className="comment-input-box" />
              
              <h6 className="post ml-auto mr-2" style={{color:color}}>Post</h6>
            </div> */}
            {/* <CommentBox  blog={item._id} user={state.user} userId={state.id}/>
             */}
            <div className="ml-auto mr-3 row">
              {/* <Comments  blog={item._id} user={state.user} userId={state.id} className="mr-2"/>
      
          <LikeButton blog={item._id} /> */}
          </div>
        </div>
        </div>
        
      </div>

    )

    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.emit("getBlogs",'hai')
      socket.on("getBlogs", data => {
          console.log(data)
        setResponse(data);
      });
    }, []);
    return (
        <div>
      {blogDiv}
      {/* <div className="blog-card alt">
        <div className="meta">
          <div className="photo" style={{backgroundImage: "url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"}}></div>
          <ul className="details">
            <li className="author"><a href="#">Jane Doe</a></li>
            <li className="date">July. 15, 2015</li>
            <li className="tags">
              <ul>
                <li><a href="#">Learn</a></li>
                <li><a href="#">Code</a></li>
                <li><a href="#">JavaScript</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="description">
          <h1>Mastering the Language</h1>
          <h2>Java is not the same as JavaScript</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
          <p className="read-more">
            <a href="#">Read More</a>
          </p>
        </div>
      </div> */}
      </div>
    )
}

export default BlogPage
