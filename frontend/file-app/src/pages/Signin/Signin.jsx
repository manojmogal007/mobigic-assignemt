import React, { useEffect, useState } from 'react'
import '../Signup/Signup.css'
import { IoEye,IoEyeOff  } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { apiurl } from '../../api';


const Signin = () => {
    const [viewPassword,setViewPassword]=useState(false)
    const [userdata,setUserdata]=useState({username:'',password:''})
    const [state,setState]=useState({
        open:false,
        message:'',
        vertical:'top',
        horizontal:'right',
    })
    const navigate=useNavigate()
    // console.log(userdata)

    const handlesignin=(e)=>{
        e.preventDefault()
        const {username,password}=userdata
        if(!username || !password){
            return;
        }
        axios({
            method:'POST',
            url:`${apiurl}/login`,
            data:userdata
        })
        .then((res)=>{
            console.log(res)
            if(res.data.msg='Login successful'){
                localStorage.setItem('fileuser',JSON.stringify(res.data.user))
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err)
            
        })
    }

    const handleuserdata=(e)=>{
        const {name,value}=e.target
        setUserdata({...userdata,[name]:value})
    }

    const handleClose=()=>{
        setState({...state,open:false})
    }

    

    const {username,password}=userdata
    const {message,open,vertical,horizontal}=state
  return (
    <div className='box'>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
            autoHideDuration={2000}
        />
        <div className='form'>
            {/* <h2>Welcome</h2> */}
            <h2>Sign In</h2>
            <form onSubmit={handlesignin}>
            <label>Username</label><br/>
            <input required={true} placeholder='Enter username here...' type='text' name='username' value={username} onChange={handleuserdata} /><br/>
            <div>
                <label>Password</label><br/>
                <input required={true} placeholder='Enter password here...' type={viewPassword?'text':'password'} name='password' value={password} onChange={handleuserdata} /><br/>
                <i onClick={()=>setViewPassword(!viewPassword)} >{viewPassword?<IoEye id='hide'/>:<IoEyeOff id='show' />}</i>
            </div>
            <button type='submit' >Sign In</button>
            </form>
            <p >Didn't have an account? <Link to='/signup'><span className='tosignin'>Sign Up</span></Link></p>
        </div>
    </div>
  )
}

export default Signin