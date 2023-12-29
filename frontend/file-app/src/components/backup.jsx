import React, { useState } from 'react';
import axios from 'axios';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [files, setFiles] = useState([]);
  const [filename,setFileName]=useState(null)

  const handleRegister =  () => {
    console.log(username,password)
    axios.post('http://localhost:3000/register', { username, password })
   .then((res)=>{
    console.log(res)
   })
   .catch((err)=>{
    console.log(err)
   })
     
  };

  const handleLogin =  () => {
      axios.post('http://localhost:3000/login', { username, password })
     .then((res)=>{
      console.log(res)
      localStorage.setItem('fileuser',JSON.stringify(res.data.user))
     })
     .catch((err)=>{
      console.log(err)
     })
  };

  const handleFileUpload =  () => {
    
      const user=JSON.parse(localStorage.getItem('fileuser'))
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId',user._id ); // Replace with the actual user ID
      console.log(formData)
      // Make a POST request to the server for file upload
      axios.post('http://localhost:3000/upload', formData)
      .then((res)=>{
        console.log(res)
        setCode(res.data.code);
        handleGetFiles()
       })
       .catch((err)=>{
        console.log(err)
       })
   
  };

  const handleGetFiles =  () => {
    const user=JSON.parse(localStorage.getItem('fileuser'))
      axios.get(`http://localhost:3000/files/${user._id}`) // Replace with the actual user ID
      .then((res)=>{
        console.log(res)
        setFiles(res.data);
      })
      .catch((err)=>{
        console.log(err)
      })
      
    
  };

  const handleDeleteFile =  (fileId) => {
    axios.delete(`http://localhost:3000/files/${fileId}`)
    .then((res)=>{
      console.log(res)
      handleGetFiles()
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  const handledownload=(code,name)=>{
    setFileName(name)
    axios.get(`http://localhost:3000/download/${code}`,{
      responseType: 'blob',
    })
    .then((res)=>{
      console.log(res)
      const blob = new Blob([res.data]);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name; // Set the desired file name

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <h1>File Upload App</h1>
      <div>
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h2>Upload File</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload}>Upload File</button>
        {code && <p>Generated Code: {code}</p>}
      </div>

      <div>
        <h2>View Files</h2>
        <button onClick={handleGetFiles}>Get Files</button>
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              {file.filename} - <button onClick={() => handleDeleteFile(file._id)}>Delete</button> <button onClick={()=>handledownload(file.code,file.filename)}>Download</button>
            </li>
          ))}
        </ul>
      </div>
      {/* <Signup/> */}
      <Signin/>
    </div>
  );
};

export default App;
