import {useState } from "react";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
function Student(){
    const[code,setcode]=useState();
    const[rollno,setroll]=useState('');
    const navigate = useNavigate();
   const handleclick=async()=>{
    try {
        const response = await axios.post('http://localhost:5000/auth', { code,rollno });
        if(response.status===200) navigate('/FacultTest', { state: {rollno,code,topic: response.data.topic, maxque: response.data.maxque} });
        else if(response.status===201) console.log("student exist");
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
    return(
          <>
        <label>Enter Code</label>
        <br></br>
        <br></br>
        <label>Enter Roll Number</label>
        <input type="text" onChange={(e)=>setroll(e.target.value)}/>
        <input type="text" onChange={(e)=>setcode(e.target.value)}/>
        <button onClick={handleclick}>Enter Test</button>
        </>
    )
}
export default Student;
