import React from 'react'
import { useState, useEffect } from 'react'
import './videoSection.css'
import Axios from 'axios'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'

function Videos(val, id, title) {
  console.log(title);
  return (
    <div className='Videos'>
      <embed height="180px" width="288px" src={val.val}></embed>
      <div className='title'>
      </div>
      <div className="bottomBar">
        <button className='saved' onClick={
          Axios.post("http://localhost:4000/api/post/save", {
            ID: id.val
          }).then((response)=>{})
        }><AiOutlineLike/></button>
        <button className='like' onClick={
          Axios.post("http://localhost:4000/api/post/like", {
            ID: id.val
          }).then((response)=>{})
        }><AiOutlineDislike/></button>
        <button className='dislike' onClick={
          Axios.post("http://localhost:4000/api/post/dislike", {
            ID: id.val
          }).then((response)=>{})
        }><FaRegHeart/></button>
      </div>
    </div>
  )
}

function VideoSection(props) {
  const [lightOrDark, setLightOrDark] = useState(true);
  const [videos, setData] = useState([]);

  // GET request only works on refresh
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/initialValues").then((req) => { 
      console.log(req.data);
      setData(req.data);
      console.log(videos);
    }).catch((err) => { console.log(err); })
  },[]);
  


  return (
    <div className='videoSection'>
      {videos.map((val)=>{
        var string = "https://www.youtube.com/embed/" + val.video_id;
        return <Videos val={string} id={val.video_id} title={val.title}/>
      })}
    </div>
  )
}

export default VideoSection