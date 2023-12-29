import React, { useEffect, useState } from 'react'
import './Signup.css'
import { IoEye,IoEyeOff  } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { apiurl } from '../../api';


const Signup = () => {
    const [viewPassword,setViewPassword]=useState(false)
    const [userdata,setUserdata]=useState({name:'',password:''})
    const [state,setState]=useState({
        open:false,
        message:'',
        vertical:'top',
        horizontal:'right',
    })
    const navigate=useNavigate()

    

    // console.log(userdata)
    const handlesignup=(e)=>{
        e.preventDefault()
        const {name,password}=userdata
        if(!name  || !password){
            console.log('fill all details')
            return;
        }
        axios({
            method:'POST',
            url:`${apiurl}/register`,
            data:{
                username:name,password
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.msg='User registered successfully'){
                navigate('/signin')
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


    const {name,password}=userdata
    const {message,open,vertical,horizontal}=state
  return (
    <div className='box'>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
            autoHideDuration={3000}
        />
        <div className='form'>
            <h2>Sign Up</h2>
            <form onSubmit={handlesignup}>
            <label>Username </label><br/>
            <input required={true} placeholder='Enter name here...' type='text' name='name' value={name} onChange={handleuserdata} /><br/>
            <div>
                <label>Password</label><br/>
                <input required={true} placeholder='Enter password here...' type={viewPassword?'text':'password'} name='password' value={password} onChange={handleuserdata} /><br/>
                <i onClick={()=>setViewPassword(!viewPassword)} >{viewPassword?<IoEye id='hide' />:<IoEyeOff id='show' />}</i>
            </div>
            <button type='submit' >Sign Up</button>
            </form>
            <p >Already have an account? <Link to='/signin'><span className='tosignin'>Sign in</span></Link></p>
        </div>
    </div>
  )
}

export default Signup