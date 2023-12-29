import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import Dashboard from './pages/Dashboard/Dashboard'
import Privateroute from './components/Privateroute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/' element={<Privateroute><Dashboard/></Privateroute>}></Route>
      </Routes>
    </div>
  )
}

export default App