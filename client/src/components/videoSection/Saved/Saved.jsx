import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './saved.css'

function Videos({val, videoId, userID}) {
  console.log(videoId);

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
      <div className="playlistBar">
        <button className="removeVideoFromPlaylist" onClick={ handleSubmit }>Remove Video from Saved</button>
      </div>    
    </div>
  )
}

function Saved(props) {
  const [videoData, setVideoData] = useState([])

  console.log(props.userData.data[0].userId);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/getSave/" + props.userData.data[0].userId).then((response) => { console.log(response); setVideoData(response.data); })
  },[])

  return (
    <div className='Saved' style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center'}}>
          { videoData.map((val) => {
             var string = "https://www.youtube.com/embed/" + val.video_id;
             var video_id = "" + val.video_id;
             return <Videos key={video_id} val={string} videoId={val.video_id} userID={props.userData.data[0].userId}/>
          })}
    </div>
  )
}

export default Saved