import Preloader from './components/Preloader'
import Navbar from "./components/Navbar"
import AppRouter from './Router/AppRouter'
import Footer from './pages/Footer'

function App() {
  return (
   <div className="min-h-screen text-slate-950">
      <Preloader/>
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
   </div>
  )
}

export default App
