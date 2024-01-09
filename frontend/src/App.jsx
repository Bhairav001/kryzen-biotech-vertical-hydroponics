
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import HomePage from './components/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Form from './pages/Form'
import FormPreview from './pages/FormPreview'

function App() {

  return (
     <>
       <Navbar/>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/form' element={<Form/>}/>
         <Route path='/formPreview' element={<FormPreview/>}/>
       </Routes>
     </>
  )
}

export default App
