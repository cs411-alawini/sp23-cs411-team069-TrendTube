import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './playlist.css'

function Playlist(props) {
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [newPlaylistName, setPlaylistName] = useState("");
  const [deletePlaylistName, setPlaylistNameDelete] = useState("");
  const [updatePlaylist, setUpdatePlaylist] = useState("");
  const [updatePlaylistName, setUpdatePlaylistName] = useState("");
  const [displayPlaylistName, setDisplayPlaylist] = useState([]);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/post/createPlaylist", JSON.stringify({ user: props.userData.data, playlistName: newPlaylistName }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        console.log(response);
    });
  }
  //"http://localhost:4000/api/delete/deletePlaylist"

  const handleSubmit2 = (e) => {
    e.preventDefault();
    Axios.delete(`http://localhost:4000/api/delete/deletePlaylist/${ deletePlaylistName }`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        console.log(response);
    })
  }

  const handleSubmit3 = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:4000/api/put/updatePlaylist", JSON.stringify({ playlistName: updatePlaylistName, playlistId: updatePlaylist }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        console.log(response);
    });
  }

  const handleSubmit4 = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get/getPlaylists")
    .then((response) => {
      setAllPlaylists(response.data.filter((x) =>  x.user_Id === props.userData.data[0].userId))
    });
    Axios.get("http://localhost:4000/api/get/getVideosFromPlaylist").then((req) => {
      var list = [];
      for (var i = 0; i < req.length; i++) {
        list.push(req.data[i]);
      }
      setDisplayPlaylist(list);
    })
  }, []) 

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


  return (
    <>
      <div className='Playlist-outer-container'>
        <div className='Playlist-container'>
          <div className='Create-playlist'>
            <form className='Create-Playlist-Container' onSubmit = { handleSubmit1 }>
              <input className='playlist-input' placeholder='Playlist Name' type='text' onChange={(e) => { setPlaylistName(e.target.value) }}/>
              <button className='playlist-submit-button'>Create Playlist</button>
            </form>
            <form className='selectPlaylist-delete' onSubmit={ handleSubmit2 }>
              <select onChange={(e) => { console.log(e.target.value); setPlaylistNameDelete(e.target.value);}}>
                <option disabled selected>Select Playlist</option>
                {
                  allPlaylists.map((playlist) => {
                    return (
                      <option value = {playlist.playlistId}>{playlist.playlistName}</option>
                    )
                  })
                }
              </select>
              <button className='deletePlaylistButton'>Delete Playlist</button>
            </form>
          </div>
          <div className='Create-playlist'>
            <form className='Create-Playlist-Container2' onSubmit = { handleSubmit3 }>
              <input className='playlist-input' placeholder='Playlist Name' type='text' onChange={(e) => { setUpdatePlaylistName(e.target.value) }}/>
              <select onChange={(e) => { console.log(e.target.value); setUpdatePlaylist(e.target.value);}}>
                <option disabled selected>Select Playlist</option>
                {
                  allPlaylists.map((playlist) => {
                    return (
                      <option value = {playlist.playlistId}>{playlist.playlistName}</option>
                    )
                  })
                }
              </select>
              <button className='playlist-submit-button'>Update Playlist</button>
            </form>
          </div>
          <div className='Create-playlist'>
            <form className='Create-Playlist-Container3' onSubmit = { handleSubmit4 }>
              <select onChange={(e) => { console.log(e.target.value); setDisplayPlaylist(e.target.value);}}>
                <option disabled selected>Select Playlist</option>
                {
                  allPlaylists.map((playlist) => {
                    return (
                      <option value = {playlist.playlistId}>{playlist.playlistName}</option>
                    )
                  })
                }
              </select>
              <button className='playlist-submit-button'>Display Playlist</button>
            </form>
          </div>
          <div className='Video-inner-container'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Playlist