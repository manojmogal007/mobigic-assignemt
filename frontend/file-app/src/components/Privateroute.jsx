import React from 'react'
import { Navigate } from 'react-router-dom'

const Privateroute = ({children}) => {
    const user=JSON.parse(localStorage.getItem('fileuser'))

    if(!user){
        return <Navigate to='/signin' />
    }
  return children
}

export default Privateroute