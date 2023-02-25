import React, { useRef, useState } from 'react'
import Axios from 'axios'
import VideoSection from './components/videoSection/VideoSection'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import './index.css'

const sideBar3 = {
  height : '100vh',
  width : '82.5vw',
  backgroundColor : '#e2e9f7'
}

function App() {
  const [rightState, setRightState] = useState(sideBar3);

  return (
    <>
      <div className='page'>
        <Sidebar changeState={(setState) => { setRightState(setState) }}/>
        <div className='right' style={ rightState }>
          <Navbar/>
          <VideoSection/>
        </div>
      </div>
    </>
  )
}

export default App