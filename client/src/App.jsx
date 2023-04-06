import React, { useState, useEffect } from 'react'
import VideoSection from './components/videoSection/VideoSection'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'

const sideBar3 = {
  height : '100vh',
  width : '82.5vw',
  backgroundColor : '#e2e9f7',
  marginLeft: '17.5vw',
  overflow: 'hidden'
}


function App() {
  const [rightState, setRightState] = useState(sideBar3);
  const [lightOrDark, setLightOrDark] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [renderSearch, setSearchRender] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = lightOrDark ? '#e2e9f7' : '#161818';
  },[lightOrDark])

  /*
  useEffect(() => {
    console.log(searchData);
    console.log(renderSearch);
  },[searchData])
  */

  return (
    <>
      <div className='page'>
        <Sidebar isLight = { lightOrDark }
          changeState={(setState) => { 
          console.log(setState);
          setRightState(setState);
        }}/>
        <div className='right' style={ rightState }>
          <Navbar setSearch={(searchString) => { 
            setSearchData(searchString);
            if (searchString === "[]") {
              setSearchRender(false);
            } else {
              setSearchRender(true);
            }
          }} changeMode={(setMode) => { setLightOrDark(setMode) }}/>
          <VideoSection searchBool = { renderSearch } searchData = { searchData }/>
        </div>
      </div>
    </>
  )
}

export default App