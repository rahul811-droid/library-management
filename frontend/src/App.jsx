import React from 'react'
import Header from './components/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import DashStudent from './components/DashStudent'
import DashLibrary from './components/DashLibrary'


const App = () => {


  return (
    <div className='bg-slate-300'>
     <BrowserRouter>
      <Header/>
      <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>


    <Route  element={<PrivateRoute/>}>

    <Route path='/profile' element={<Profile/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  

    </Route>

    



      </Routes>
      {/* <Footer/>
       */}
     </BrowserRouter>
    </div>
  )
}

export default App
