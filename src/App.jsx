// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactMe from './components/ContactMe'
import Experience from './components/Experience'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Portofolio from './components/Portofolio'
import Tools from './components/Tools'

function App() {
  return (
    <div className='font-myfont'>
      <Navbar />
      <Home />
      <Portofolio />
      <Experience />
      <Tools />
      <ContactMe />
    </div>
  )
}

export default App
