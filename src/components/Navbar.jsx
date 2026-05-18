import React from 'react'
import {NavLink} from "react-router-dom"

function Navbar() {
  return (
    <nav>
        <NavLink to = "/">NewsApp</NavLink>
        <NavLink to = "/">Home</NavLink>
        <NavLink to = "/about">About</NavLink>
        <NavLink to = "/category/technology">Technology</NavLink>
        <NavLink to = "/category/sports">Sports</NavLink>
        <NavLink to = "/category/business">Business</NavLink>
    </nav>
  )
}

export default Navbar