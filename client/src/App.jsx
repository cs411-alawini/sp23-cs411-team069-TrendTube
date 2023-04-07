import React, { useState, useEffect } from 'react'
import VideoSection from './components/videoSection/VideoSection'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Axios from 'axios'
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
  const [userData, setUserData] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [sidebarState, setSidebarState] = useState("Main");


  useEffect(() => {
    document.body.style.backgroundColor = lightOrDark ? '#e2e9f7' : '#161818';
  },[lightOrDark])

  const loggedOut = (val) => {
    if (val === false) {
      setUserData(null);
      setSidebarState("Main");
    }
  }

  const searchDatabase = (searchString) => { 
    setSearchData(searchString);
    if (searchString === "[]") {
      setSearchRender(false);
    } else {
      setSearchRender(true);
    }
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/post/checkUser", JSON.stringify({ username: currentUsername, password: currentPassword }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      setUserData(response);
    });
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/post/createUser", JSON.stringify({ username: registerUsername, password: registerPassword, email: registerEmail }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    });
  }

  if (userData === null) {
    return (
      <>
        <div className='LoginRegisterContainer'>
          <div className='LoginRegisterSubContainer'>
            <form className='Login' onSubmit={ handleSubmit1 }>
              <h1>Login</h1>
              <input placeholder="Username" className="initialInput" type="text" onChange={(e) => { setCurrentUsername(e.target.value) }}/>
              <input placeholder="Password" className="initialInput" type="password" onChange={(e) => { setCurrentPassword(e.target.value) }}/>
              <button className="Submit">Login</button>
            </form>
            <form className='Register' onSubmit={ handleSubmit2 }>
              <h1>Register</h1>
              <input placeholder="Username" className="initialInput" type="text" onChange={(e) => { setRegisterUsername(e.target.value) }}/>
              <input placeholder="Password" className="initialInput" type="password" onChange={(e) => { setRegisterPassword(e.target.value) }}/>
              <input placeholder="Email" className="initialInput" type="email" onChange={(e) => { setRegisterEmail(e.target.value) }}/>              
              <button className="Submit">Register User</button>
            </form>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='page'>
          <Sidebar logoutStatus = { loggedOut } isLight = { lightOrDark }
            changeState={(setState) => { 
              console.log(setState);
              setRightState(setState);
            }}
            changeSidebar={(val) => {
              setSidebarState(val);
            }}  
            setSearch = { searchDatabase }
          />
          <div className='right' style={ rightState }>
            <Navbar setSearch={ searchDatabase } changeMode={(setMode) => { setLightOrDark(setMode) }} userInfo = { userData } />
            <VideoSection searchBool = { renderSearch } searchData = { searchData } pageState = { sidebarState }/>
          </div>
        </div>
      </>
    )
  }
}

export default App