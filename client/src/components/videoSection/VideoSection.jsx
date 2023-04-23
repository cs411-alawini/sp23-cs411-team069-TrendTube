import React from 'react'
import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './videoSection.css'
import Axios from 'axios'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FiBookmark } from 'react-icons/fi'
import Slider from 'react-slick'
import Profile from './Profile/Profile';
import Playlist from './Playlist/Playlist'
import Saved from './Saved/Saved'
import Recommended from './Recommended/Recommended'

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
    Axios.post("http://localhost:4000/api/post/addVideosToPlaylist", JSON.stringify({ VideoID: id, PlaylistID: addPlaylist }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {console.log(response)});
  }

  const handleSubmit3 = (link) => {
    console.log("Got here")
    var date = new Date();
    console.log(date.toString());
    Axios.post(link, JSON.stringify({ VideoID: id, UserID: userData.data[0].userId, Date: date }), { 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {console.log(response)});
  }

  return (
    <div className='Videos'>
      <iframe height="180px" width="288px" src={val}></iframe>
      <div className="bottomBar">
        <button className='like' onClick={() => { handleSubmit3("http://localhost:4000/api/post/like") }}><AiOutlineLike className='iconVid'/></button>
        <button className='dislike' onClick={() => { handleSubmit("http://localhost:4000/api/post/dislike") }}><AiOutlineDislike className='iconVid'/></button>
        <button className='saved' onClick={() => { handleSubmit3("http://localhost:4000/api/post/save") }}><FiBookmark className='iconVid'/></button>
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
  const [recommended, setRecommended] = useState([]);
  const [videoCategory, setVideoCategory] = useState([]);

  console.log(props.searchData);
  // GET request only works on refresh
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/initialValues").then((req) => { 
      setData(req.data);
    }).catch((err) => { console.log(err); });
    Axios.get("http://localhost:4000/api/get/getRecommended").then((req) => {
      console.log(req);
      setRecommended(req.data)
    })
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
    Axios.get("http://localhost:4000/api/get/call/" + props.userInfo.data[0].userId).then((req) => {
      var list3 = req.data[0];
      console.log(list3);
      console.log(list3[0].video_id)
      
      var list = [];
      var list2 = [];
      console.log(req.data[0].length)
      while (list.length !== 15) {
        var val = Math.trunc(Math.random() * req.data[0].length);
        if (list.includes(val)) {
          continue;
        } else {
          list.push(val);
        }
      }
      console.log(list);
      
      for (var i = 0; i < list.length; i++) {
        list2.push(list3[list[i]].video_id);
      }
      console.log(list2);
      setVideoCategory(list2);
    }).catch((err) => {console.log(err)})
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
            return <Videos key={video_id} val={string} id={video_id} userData={props.userInfo}/>
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
          <br/><br/><br/>
          <Slider {...settings}>
            {videoCategory.map((val)=>{
              var string = "https://www.youtube.com/embed/" + val.toString();
              var video_id = "" + val.toString();
              return <Videos key={video_id} val={string} id={video_id} userData={props.userInfo}/>
            })}
          </Slider>
          <br/><br/><br/>
        </div>
      )
    } else if (props.pageState === "Saved") {
      return (
        <>
          <Saved userData = { props.userInfo }/>
        </>
      )
    } else if (props.pageState === "Recommended") {
      return (
        <>
          <Recommended userData = { props.userInfo }/>
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