import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Regform = () => {
  const [Username, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail]       = useState("")
  const [message , setMessage] = useState("")

  const navigate = useNavigate()

  function handleform(e){
    e.preventDefault()
    const formdata = {Username , Password , Email}

  
    fetch("/api/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata)
    }).then((res)=>{return res.json()}).then((data)=>{
      if(data.status === 201){
        setMessage(data.message)
       navigate("/")
      }else{
        setMessage(data.message)
      }
    })
  }


  return (

    <div className='container' id="Reg">
      <div className='row'>
        <div className='col-md-4'>
        
       
        </div>

      
        <div className='col-md-4'>
        <p id="regmessage"> {message}</p>
          <form onSubmit={(e)=>{handleform(e)}}>
            <label className='reglabel'> Username</label>
            <input type="text" className='form-control' value={Username} onChange={(e)=>{setUserName(e.target.value)}} required/>

            <label  className='reglabel'> password</label>
            <input type="password" className='form-control' value={Password} onChange={(e)=>{setPassword(e.target.value)}} required />

            <label  className='reglabel'> Email</label>
            <input type="email" className='form-control' value={Email} onChange={(e)=>{setEmail(e.target.value)}} required/>

            <button type="submit" className='form-control btn btn-dark mt-3'>Register</button>
          <Link to="/"><button type="submit" className='form-control btn btn-primary mt-3'>Login</button></Link>  
            
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  )
}

export default Regform