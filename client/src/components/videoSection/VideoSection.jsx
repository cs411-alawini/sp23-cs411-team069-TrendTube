import React from 'react'
import { useState, useEffect } from 'react'
import './videoSection.css'
import Axios from 'axios'

function VideoSection(props) {
  const [lightOrDark, setLightOrDark] = useState(true);
  const [videos, setData] = useState([]);

  // GET request only works on refresh
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/initialValues").then((req) => { 
      console.log(req.data);
      setData(req.data);
      console.log(videos)
    }).catch((err) => { console.log(err); })
  },[]);
  


  return (
    <div className='videoSection'>
      {videos.map((val)=>{
        var string = "https://www.youtube.com/embed/" + val.video_id;
        return <embed height="180px" width="288px" src={string}></embed>
      })}
    </div>
  )
}

export default VideoSection