import React from 'react'
import { Routes } from 'react-router-dom'
import NewsDetails from '../components/NewsDetails'
import About from '../pages/About'

function AppRouter() {
  return (
    <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/category/:category" element = {<Home/>}/>
        <Route path ="/news/:articleUrl" element = {<NewsDetails articles = {articles}/>}/>
        <Route path ="/about" element = {<About/>}/>
    </Routes>
  )
}

export default AppRouter