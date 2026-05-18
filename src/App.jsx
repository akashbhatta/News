import Preloader from './components/Preloader'
import Navbar from "./components/Navbar"
import AppRouter from './Router/AppRouter'
import Footer from './pages/Footer'

function App() {
  return (
   <>
      <Preloader/>
        <Navbar />
        <AppRouter />
        <Footer />
      

   </>
  )
}

export default App
