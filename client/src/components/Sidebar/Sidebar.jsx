import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { BiHomeAlt, BiHistory } from 'react-icons/bi';
import { HiArrowSmRight, HiArrowSmLeft } from 'react-icons/hi'
import { FiBookmark } from 'react-icons/fi'
import { MdPlaylistAdd } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import './sidebar.css'

const sideBar1 = {
  height : '100vh',
  width : '17.5vw',
  backgroundColor : 'white'
}
const sideBar2 = {
  height : '100vh',
  width : '7.75vw',
  backgroundColor : 'white'
}


function Sidebar() {
  const [Page, setPage] = useState('Main');
  const [sideBar, openSideBar] = useState(true);

  let arrow = useRef(<HiArrowSmLeft/>);
  let title = useRef('rendtube');
  let main = useRef('Main');
  let saved = useRef('Saved');
  let history = useRef('History');
  let playlist = useRef('Playlist');
  let signOut = useRef('Sign Out');
  let profile = useRef('Profile');
  let sidebarSetting = useRef(sideBar1);


  function changePage(param) { setPage(param); }

  useEffect(()=>{ 
    console.log(Page) 
  },[Page]);

  useEffect(()=>{ 
    console.log(sideBar);
  },[sideBar]);

  const changeSideBar = () => {
    if (sideBar === true) {
        openSideBar(false);
        arrow.current = <HiArrowSmRight/>;
        title.current = '';
        main.current = '';
        history.current = '';
        saved.current = '';
        playlist.current = '';
        signOut.current = '';
        profile.current = '';
        sidebarSetting.current = sideBar2;
    } else {
        openSideBar(true);
        arrow.current = <HiArrowSmLeft/>;
        title.current = 'rendtube';
        main.current = 'Main';
        history.current = 'History';
        saved.current = 'Saved';
        playlist.current = 'Playlist';
        signOut.current = 'Sign Out';
        profile.current = 'Profile';
        sidebarSetting.current = sideBar1;
    }
  }
  

  return (
    <div className='Sidebar' style={ sidebarSetting.current }>
        <div className='logo'>
            <h2>T</h2>
            <h1>{ title.current }</h1>
        </div>
        <div className='space'>

        </div>
        <div className='options'>
            <button className='Main' onClick={()=>{ changePage('Main'); }}><BiHomeAlt className='icon'/>{ main.current }</button>
            <button className='Saved' onClick={()=>{ changePage('Saved') }}><FiBookmark className='icon'/>{ saved.current }</button>
            <button className='History' onClick={()=>{ changePage('History') }}><BiHistory className='icon'/>{ history.current }</button>
            <button className='Playlist' onClick={()=>{ changePage('Playlist') }}><MdPlaylistAdd className='icon'/>{ playlist.current }</button>
            <button className='Profile' onClick={()=>{ changePage('Profile') }}><CgProfile className='icon'/>{ profile.current }</button>
            <button className='SignOut' onClick={() => {}}><FaSignOutAlt className='icon'/>{ signOut.current }</button>

        </div>
        <div className='button'>
            <button className='SidebarShifter' onClick={ changeSideBar }>{ arrow.current }</button>
        </div>
    </div>
  )
}

export default Sidebar

/*
Notes: 
https://www.youtube.com/watch?v= + 'video id' gets the youtube video,
we can try linking it
*/