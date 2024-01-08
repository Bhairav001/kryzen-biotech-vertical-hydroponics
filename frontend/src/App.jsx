
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import HomePage from './components/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
     <>
       <Navbar/>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
       </Routes>
     </>
  )
}

export default App
