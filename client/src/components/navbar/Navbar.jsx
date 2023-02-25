import React from 'react'
import './navbar.css'
import { MdOutlineDarkMode } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'

function Navbar(props) {
  const [lightOrDark, setLightOrDark] = useState(true);
  return (
    <div className='navbar'>
      <button className='light' onClick={() => {
        setLightOrDark(!lightOrDark);
        console.log(!lightOrDark);
      }}><MdOutlineDarkMode/></button>
      <div className='searchBar'>
        <input className='search' type='text' placeholder='Search'/>
        <button className='submitSearch' onClick={()=>{}}><BiSearch/></button>
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