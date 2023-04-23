import React from 'react'
import './navbar.css'
import { MdOutlineDarkMode } from 'react-icons/md'
import { HiSearch } from 'react-icons/hi'
import { useState, useRef } from 'react'
import Axios from 'axios'

function Navbar(props) {
  const [lightOrDark, setLightOrDark] = useState(true); 
  const [lang, setLang] = useState("");
  let searchString = useRef('');
  
  function updateSearchString(val) {
    searchString.current = val.target.value;
  }

  return (
    <div className='navbar'>
      <button className='light' onClick={() => {
        setLightOrDark(!lightOrDark);
        props.changeMode(!lightOrDark);
      }}><MdOutlineDarkMode/></button>
      <div className='searchBar'>
        <input className='search' type='text' placeholder='Search' onChange= { updateSearchString }/>
        <button className='submitSearch' onClick={()=>{ 
          if (searchString.current.trim() === "") {
            props.setSearch(JSON.stringify([]));
          } else {
            Axios.post("http://localhost:4000/api/post/search", JSON.stringify({ val: searchString.current.trim() }), {
            headers: {
              'Content-Type': 'application/json'
            }
            }).then((response) => { 
              props.setSearch(response);
            });
          }
        }}><HiSearch/></button>
      </div>
      <select className='lang' onChange={() => {setLang(e.target.value)}}>
        <option value='eng'>eng</option>
        <option value='spa'>spa</option>
        <option value='ger'>ger</option>
        <option value='fra'>fra</option>
        <option value='chi'>chi</option>
      </select>
      <div className='welcome'>
        <h1>Welcome {props.userInfo.data[0].userName}</h1>
      </div>
    </div>
  )
}

export default Navbar