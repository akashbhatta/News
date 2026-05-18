import React from 'react'
import Loading from './components/Loading'
import Preloader from './components/Preloader'
import Navbar from "./components/Navbar"

function App() {
  return (
   <>
      <Preloader>
        <Navbar />
        <AppRouter articles={articles} />
        <Footer />
      </Preloader>

   </>
  )
}

export default App