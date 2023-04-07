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
const sideBar3 = {
  height : '100vh',
  width : '82.5vw',
  backgroundColor : '#e2e9f7',
  marginLeft: '17.5vw'
}
const sideBar4 = {
  height : '100vh',
  width : '92.25vw',
  backgroundColor : '#e2e9f7',
  marginLeft: '7.75vw'
}

const sideBar1Dark = {
  height : '100vh',
  width : '17.5vw',
  backgroundColor : '#222624'
}
const sideBar2Dark = {
  height : '100vh',
  width : '7.75vw',
  backgroundColor : '#222624'
}
const sideBar3Dark = {
  height : '100vh',
  width : '82.5vw',
  backgroundColor : '#161818',
  marginLeft: '17.5vw'
}
const sideBar4Dark = {
  height : '100vh',
  width : '92.25vw',
  backgroundColor : '#161818',
  marginLeft: '7.75vw'
}

function Sidebar(props) {
  let sideBarOpen = useRef(true);

  let arrow = useRef(<HiArrowSmLeft/>);
  let title = useRef('rendtube');
  let main = useRef('Main');
  let saved = useRef('Saved');
  let history = useRef('History');
  let playlist = useRef('Playlist');
  let signOut = useRef('Sign Out');
  let profile = useRef('Profile');
  let sidebarSetting = useRef(sideBar1);

  useEffect(() => {
    sidebarSetting.current = props.isLight ? (sideBarOpen.current ? sideBar1 : sideBar2) : (sideBarOpen.current ? sideBar1Dark : sideBar2Dark);
    if (sideBarOpen.current === true) {
      props.changeState(props.isLight ? sideBar3 : sideBar3Dark);
    } else {
      props.changeState(props.isLight ? sideBar4 : sideBar4Dark);
    }
  },[props.isLight]);

  const changeSideBar = () => {
    if (sideBarOpen.current === true) {
        sideBarOpen.current = false;
        arrow.current = <HiArrowSmRight/>;
        title.current = '';
        main.current = '';
        history.current = '';
        saved.current = '';
        playlist.current = '';
        signOut.current = '';
        profile.current = '';
        sidebarSetting.current = props.isLight ? (sideBarOpen.current ? sideBar1 : sideBar2) : (sideBarOpen.current ? sideBar1Dark : sideBar2Dark);
        props.changeState(props.isLight ? sideBar4 : sideBar4Dark);
    } else {
        sideBarOpen.current = true;
        arrow.current = <HiArrowSmLeft/>;
        title.current = 'rendtube';
        main.current = 'Main';
        history.current = 'History';
        saved.current = 'Saved';
        playlist.current = 'Playlist';
        signOut.current = 'Sign Out';
        profile.current = 'Profile';
        sidebarSetting.current = props.isLight ? (sideBarOpen.current ? sideBar1 : sideBar2) : (sideBarOpen.current ? sideBar1Dark : sideBar2Dark);
        props.changeState(props.isLight ? sideBar3 : sideBar3Dark);
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
            <button className='Main' onClick={()=>{ props.changeSidebar('Main'); props.setSearch("[]"); }}><BiHomeAlt className='icon'/>{ main.current }</button>
            <button className='Saved' onClick={()=>{ props.changeSidebar('Saved'); props.setSearch("[]"); }}><FiBookmark className='icon'/>{ saved.current }</button>
            <button className='History' onClick={()=>{ props.changeSidebar('History'); props.setSearch("[]");  }}><BiHistory className='icon'/>{ history.current }</button>
            <button className='Playlist' onClick={()=>{ props.changeSidebar('Playlist'); props.setSearch("[]");  }}><MdPlaylistAdd className='icon'/>{ playlist.current }</button>
            <button className='Profile' onClick={()=>{ props.changeSidebar('Profile'); props.setSearch("[]");  }}><CgProfile className='icon'/>{ profile.current }</button>
            <button className='SignOut' onClick={() => { props.logoutStatus(false) }}><FaSignOutAlt className='icon'/>{ signOut.current }</button>

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