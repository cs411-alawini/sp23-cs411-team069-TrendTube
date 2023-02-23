import React from 'react'
import Axios from 'axios'
import VideoSection from './components/videoSection/VideoSection'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

import './index.css'

function App() {
  return (
    <>
      <div className='page'>
        <Sidebar/>
        <div className='right'>
          <Navbar/>
          <VideoSection/>
        </div>
      </div>
    </>
  )
}

export default App