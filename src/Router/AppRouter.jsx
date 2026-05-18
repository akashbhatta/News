import { Routes,Route } from 'react-router-dom'
import NewsDetails from '../components/NewsDetails'
import About from '../pages/About'
import HomePage from '../pages/HomePage'

function AppRouter() {
  return (
    <Routes>
        <Route path ="/" element = {<HomePage/>}/>
        <Route path ="/category/:category" element = {<HomePage/>}/>
        <Route path ="/news/:articleUrl" element = {<NewsDetails/>}/>
        <Route path ="/about" element = {<About/>}/>
    </Routes>
  )
}

export default AppRouter
