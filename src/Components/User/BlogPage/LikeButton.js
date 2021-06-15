import React, { useState, useEffect, useContext } from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import axios from 'axios';
import { AuthContext } from "../User/User";



export default function LikeButton({blog}) {
    const [color, setColor] = useState('black')
    const {state} = useContext(AuthContext)
   const like = () => {
    setColor('yellowgreen')
    const obj = {
      blog:blog,
      user:state.id
    }
    axios.post('/blog-like',obj).then((response) => {
      console.log(response)
    })
   }
   const dislike = () => {
     setColor('black')
    const obj = {
      blog:blog,
      user:state.id
    }
    axios.post('/blog-dislike',obj).then((response) => {
      console.log(response)
    })
   }
    const click = () => {
      color==='black'?like():dislike()
    }
    
    useEffect(() => {
      console.log("like"+blog)
      axios.post('/check-blog',{user:state.id,blog:blog}).then((response) => {
        if(response.data.liked) setColor('yellowgreen')
      })
    },[])
    
    return (
        <ThumbUpAltIcon className="mr-1" onClick={click} style={{color:color}}/>
    )
}
