import React from 'react'
import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './videoSection.css'
import Axios from 'axios'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import Slider from 'react-slick'
import Profile from './Profile/Profile';
import Playlist from './Playlist/Playlist'
import Saved from './Saved/Saved'
import History from './History/History'

function Videos({val, id, userData}) {

  const [allPlaylists, setAllPlaylists] = useState([])
  const [addPlaylist, setAddPlaylist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/getPlaylists")
    .then((response) => {
      setAllPlaylists(response.data.filter((x) =>  x.user_Id === userData.data[0].userId))
    });
  },[])

  const handleSubmit = (link) => {
    Axios.post(link, JSON.stringify({ ID: id }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {console.log(response)});
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();

  }

  return (
    <div className='Videos'>
      <iframe height="180px" width="288px" src={val}></iframe>
      <div className="bottomBar">
        <button className='like' onClick={() => { handleSubmit("http://localhost:4000/api/post/like") }}><AiOutlineLike className='iconVid'/></button>
        <button className='dislike' onClick={() => { handleSubmit("http://localhost:4000/api/post/dislike") }}><AiOutlineDislike className='iconVid'/></button>
        <button className='saved' onClick={() => { handleSubmit("http://localhost:4000/api/post/save") }}><FaRegHeart className='iconVid'/></button>
        <select className='fullScreen' onChange={(e) => { console.log(e.target.value); setAddPlaylist(e.target.value);}}>
          <option disabled selected>Select Playlist</option>
          {
            allPlaylists.map((playlist) => {
              return (
                <option value = {playlist.playlistId}>{playlist.playlistName}</option>
              )
            })
          }
        </select>
        <button className="addVideoToPlaylistButton" onClick={ handleSubmit2 }>Add Video to Playlist</button>
      </div>    
    </div>
  )
}

function VideoSection(props) {
  const [videos, setData] = useState([]);
  const [popular, setPopular] = useState([]);

  console.log(props.searchData);
  // GET request only works on refresh
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/initialValues").then((req) => { 
      setData(req.data);
    }).catch((err) => { console.log(err); });
    Axios.get("http://localhost:4000/api/get/popularValues").then((req) => { 
      //setPopular(req.data);
      var list = [];
      var list2 = [];
      console.log(req.data.length)
      while (list.length !== 20) {
        var val = Math.trunc(Math.random() * req.data.length);
        if (list.includes(val)) {
          continue;
        } else {
          list.push(val);
        }
      }
      console.log(list);
      
      for (var i = 0; i < list.length; i++) {
        list2.push(req.data[list[i]]);
      }
      setPopular(list2);      
    }).catch((err) => { console.log(err); });
  },[]);
  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  console.log(props.searchBool);

  if (props.searchBool) {
    return (
      <div className='videoSection2'>
          {props.searchData.data.map((val)=>{
            var string = "https://www.youtube.com/embed/" + val.video_id;
            var video_id = "" + val.video_id;
            return <Videos key={video_id} val={string} id={video_id}/>
          })}
      </div>
    )
  } else {
    if (props.pageState === "Main") {
      return (
        <div className='videoSection'>
          <Slider {...settings}>
            {popular.map((val)=>{
              var string = "https://www.youtube.com/embed/" + val;
              var video_id = "" + val;
              return <Videos key={video_id} val={string} id={video_id} userData={props.userInfo}/>
            })}
          </Slider>
          <br/><br/><br/>
          <Slider {...settings}>
            {videos.map((val)=>{
              var string = "https://www.youtube.com/embed/" + val.video_id;
              var video_id = "" + val.video_id;
              return <Videos key={video_id} val={string} id={video_id} userData={props.userInfo}/>
            })}
          </Slider>
        </div>
      )
    } else if (props.pageState === "Saved") {
      return (
        <>
          <Saved/>
        </>
      )
    } else if (props.pageState === "History") {
      return (
        <>
          <History/>
        </>
      )
    } else if (props.pageState === "Playlist") {
      return (
        <>
          <Playlist userData = { props.userInfo }/>
        </>
      )
    } else if (props.pageState === "Profile") {
      return (
        <>
          <Profile userDeleted={(val) => {props.logoutStatus(val)}} userData = { props.userInfo }/>
        </>
      )
    }
  }
}

export default VideoSection