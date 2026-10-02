// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactMe from './components/ContactMe'
import Divider from './components/Divider'
import Experience from './components/Experience'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Portofolio from './components/Portofolio'
import Tools from './components/Tools'

function App() {
  return (
    <div className='site-shell'>
      <NavBar />
      <main>
        <Home />
        <Divider />
        <Portofolio />
        <Divider />
        <Experience />
        <Divider />
        <Tools />
        <Divider />
        <ContactMe />
      </main>
    </div>
  )
}

export default App
