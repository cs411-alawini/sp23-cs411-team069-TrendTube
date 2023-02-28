import React, { useState, useEffect } from 'react'
import VideoSection from './components/videoSection/VideoSection'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import './index.css'

const sideBar3 = {
  height : '100vh',
  width : '82.5vw',
  backgroundColor : '#e2e9f7',
  marginLeft: '17.5vw'
}


function App() {
  const [rightState, setRightState] = useState(sideBar3);
  const [lightOrDark, setLightOrDark] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = lightOrDark ? '#e2e9f7' : '#161818';
  },[lightOrDark])

  console.log(lightOrDark);
  console.log(rightState);

  return (
    <>
      <div className='page'>
        <Sidebar isLight = { lightOrDark }
          changeState={(setState) => { 
          setRightState(setState);
        }}/>
        <div className='right' style={ rightState }>
          <Navbar changeMode={(setMode)=>{setLightOrDark(setMode)}}/>
          <VideoSection isLight = { lightOrDark }/>
        </div>
      </div>
    </>
  )
}

export default App