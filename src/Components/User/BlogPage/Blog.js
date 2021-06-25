import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import LikeButton from "./LikeButton";
import CommentBox from "./CommentBox";
import { AuthContext } from "../User/User";
import Comments from "./Comments";

import './BlogPage.css'
// const URL =  'http://localhost:8000';
const URL = 'https://ycart.tk';
function Blog() {
  const { id }  = useParams()
  const [blog, setBlog] = useState({})
  const {state} = useContext(AuthContext)

  useEffect(() => {
    axios.get(URL+'/get-blog/'+id).then((response) => {
      console.log(URL+'/get-blog/'+id)
      setBlog(response.data)
      
    })
  },[])
    return (
<div className="mt-3" style={{background: "whitesmoke"}}>
<div className="mt-2 mb-5" style={{width: "710px", margin: "0 auto"}}>
  <div className="bacon-blog-post bacon-shadow" style={{background:"#ddebf1"}}>
    <img src="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg" width={100} height={100} className="wp-post-image"/>
    <div className="bacon-blog-post-inner">
      <h2><a href="http://garybacon.com/post/finding-what-challenges-you/" rel="bookmark" title="Permanent link to Finding What Challenges You" className="title-row">{blog.title}</a></h2>
      <p>{blog.post}</p>
      <div className="row">
        <p className="ml-auto">-{blog.user}</p>
      </div>
       </div>
      
            {/* <div className="comment-box row ml-1">
              <textarea rows="1" className="comment-input-box" />
              
              <h6 className="post ml-auto mr-2" style={{color:color}}>Post</h6>
            </div> */}
            {/* <CommentBox  blog={blog._id} user={state.user} userId={state.id}/> */}
            
            <div className="ml-3 row">
            <LikeButton blog={id} />
            <Comments  blog={id} user={state.user} userId={state.id}  />
      
          
          
          </div>
         
        
  </div>
</div>
</div>
    
    )
}

export default Blog
