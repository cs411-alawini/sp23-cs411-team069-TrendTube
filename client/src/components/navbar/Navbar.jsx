import React from 'react'
import './navbar.css'
import { MdOutlineDarkMode } from 'react-icons/md'
import { HiSearch } from 'react-icons/hi'
import { useState, useRef } from 'react'
import Axios from 'axios'

function Navbar(props) {
  const [lightOrDark, setLightOrDark] = useState(true); 
  let searchString = useRef('');
  
  function updateSearchString(val) {
    searchString.current = val.target.value;
    console.log(searchString.current);
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
          Axios.post("http://localhost:4000/api/post/search", JSON.stringify({ val: searchString.current }), {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {console.log(response)});
        }}><HiSearch/></button>
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