import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { apiurl } from '../../api'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [code, setCode] = useState('');
    const [files, setFiles] = useState([]);
    const [filename,setFileName]=useState(null)
    const [checkCode,setCheckCode]=useState('')
    const [visible,setVisible]=useState(false)
    const [values,setValues]=useState({})
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('fileuser')))

    const navigate=useNavigate()
  

    const handleFileUpload =  () => {
    
        const user=JSON.parse(localStorage.getItem('fileuser'))

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId',user._id ); 
        console.log(formData)
        axios.post(`${apiurl}/upload`, formData)
        .then((res)=>{
          console.log(res)
          if(res.data.message="File uploaded successfully"){
            setCode(res.data.code);
            setFile(null)
            handleGetFiles()
          }
          
         })
         .catch((err)=>{
          console.log(err)
         })
     
    };
  
    const handleGetFiles =  () => {
      const user=JSON.parse(localStorage.getItem('fileuser'))
        axios.get(`${apiurl}/files/${user._id}`) 
        .then((res)=>{
          console.log(res)
          setFiles(res.data);
        })
        .catch((err)=>{
          console.log(err)
        })
        
      
    };
  
    const handleDeleteFile =  (fileId) => {
      axios.delete(`${apiurl}/files/${fileId}`)
      .then((res)=>{
        console.log(res)
        handleGetFiles()
      })
      .catch((err)=>{
        console.log(err)
      })
    };

    const checkcode=(code,name)=>{
        setVisible(true)
        setValues({code,name})
    }

    
  
    const handledownload=()=>{
        const {code,name}=values
        if(code !== checkCode){
            alert('Wrong code')
            return;
        }
      setVisible(false)
      setFileName(name)
      axios.get(`${apiurl}/download/${code}`,{
        responseType: 'blob',
      })
      .then((res)=>{
        console.log(res)
        const blob = new Blob([res.data]);
  
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
  
        document.body.appendChild(link);
        link.click();
  
        document.body.removeChild(link);
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const handlelogout=()=>{
        localStorage.removeItem('fileuser')
        navigate('/signin')
    }

    useEffect(()=>{
        setVisible(false)
        handleGetFiles()
    },[])

  return (
    <div className='dashboard'>
        <div className='user'>
            <h4>Hii {user?.username}</h4>
            <button onClick={handlelogout} className='logout'>Logout</button>
        </div>
      <div className='uploadcontainer'>
        <h2>Upload File</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload}>Upload File</button>
        {code && <p>Generated Code: {code}</p>}
      </div>

      <div className='listcontainer'>
        <h2>All Files</h2>
        {/* <button onClick={handleGetFiles}>Get Files</button> */}
        {visible && <div className='verification'>
            <input placeholder='Enter code here...' value={checkCode} onChange={(e)=>setCheckCode(e.target.value)}/>
            <button onClick={handledownload}>Download file</button>
        </div>}
        <div className='files'>
          {files?.map((file) => (
            <div key={file._id} className='card'>
              <p>{file.filename}</p>
              <div><button className='delete' onClick={() => handleDeleteFile(file._id)}>Delete</button> <button className='download' onClick={()=>checkcode(file.code,file.filename)}>Download</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard