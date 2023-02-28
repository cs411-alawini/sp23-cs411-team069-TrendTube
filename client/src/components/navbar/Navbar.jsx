import React from 'react'
import './navbar.css'
import { MdOutlineDarkMode } from 'react-icons/md'
import { HiSearch } from 'react-icons/hi'
import { useState, useRef } from 'react'
import Axios from 'axios'

function Navbar(props) {
  const [lightOrDark, setLightOrDark] = useState(true);
  let searchString = useRef('');
  
  Axios.post("http://localhost:4000/api/post/search", {
    val: searchString
  }).then((response) => {
    console.log(response);
  })

  return (
    <div className='navbar'>
      <button className='light' onClick={() => {
        setLightOrDark(!lightOrDark);
        props.changeMode(!lightOrDark);
      }}><MdOutlineDarkMode/></button>
      <div className='searchBar'>
        <input className='search' type='text' placeholder='Search'/>
        <button className='submitSearch' onClick={()=>{}}><HiSearch/></button>
      </div>
      <select className='lang'>
        <option value='eng'>eng</option>
        <option value='spa'>spa</option>
        <option value='ger'>ger</option>
        <option value='fra'>fra</option>
        <option value='chi'>chi</option>
      </select>
    </div>
  )
}

export default Navbar