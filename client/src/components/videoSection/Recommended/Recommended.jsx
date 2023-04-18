import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './recommended.css'

function Videos({val, videoId, userID}) {
  const handleSubmit = () => {
    var list = []
    list.push(userID)
    list.push(videoId)
    Axios.delete(`http://localhost:4000/api/delete/save/${ list }`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        console.log(response);
    })
  }

  return (
    <div className='PlaylistVideos'>
      <iframe className="videoBox" height="180px" width="288px" src={val}></iframe>   
    </div>
  )
}

function Recommended(props) {

  const [allVideo, setAllVideo] = useState([]);

  const randomVideos = (response) => {
    console.log(response)
    var list = [];
    var list2 = [];
    for (var i = 0; i < 15; i++) {
      var val = Math.floor(Math.random() * (response.length - 1))
      list.push(response[val]);
      list2.push(val);
    }
    setAllVideo(list);
  }

  useEffect(() => {
    Axios.get('http://localhost:4000/api/get/getRecommended/' + props.userData.data[0].userId)
    .then((response) => { randomVideos(response.data); });
  },[]);



  return (
    <div className='Recommended' style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center'}}>
        { allVideo.map((val) => {
             var string = "https://www.youtube.com/embed/" + val.video_id;
             var video_id = "" + val.video_id;
             return <Videos val={string} videoId={val.video_id} userID={props.userData.data[0].userId}/>
          })}
    </div>
  )
}

export default Recommended