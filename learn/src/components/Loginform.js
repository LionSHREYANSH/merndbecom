
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { contextapi } from '../Contextapi'


const Loginform = () => {

  const navigate  = useNavigate()

  const {setLoginName} = useContext(contextapi)

  const [Username, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail]       = useState("")
  const [message, setMessage]   = useState("")

  function handleform(e){
    e.preventDefault()
    const data = {Username , Password , Email}


   

    fetch("/api/Login",{
      method : "POST",
      headers : {"Content-Type" : 'application/json'} , 
      body : JSON.stringify(data)
    }).then((res)=>{return res.json()}).then((data)=>{
        console.log(data)

        if(data.status === 200){
          localStorage.setItem("loginname" ,data.apiData )
          setLoginName(localStorage.getItem("loginname"))
          if(data.apiData === "admin1"){
              navigate("/admindashboard")
          }else{
            navigate("/productpage")
          }
        }else{
          setMessage(data.message)
        }
    })
  }

  return (
    <div className='container' id="Login">
    <div className='row'>
      <div className='col-md-4'></div>
      <div className='col-md-4'>
      <p id="loginmessage"> {message}</p>
        <form onSubmit={(e)=>{handleform(e)}}>
          <label className='reglabel'> Username</label>
          <input type="text" className='form-control' value={Username} onChange={(e)=>{setUserName(e.target.value)}} required/>

          <label  className='reglabel'> password</label>
          <input type="password" className='form-control' value={Password} onChange={(e)=>{setPassword(e.target.value)}} required />

          <label  className='reglabel'> Email</label>
          <input type="email" className='form-control' value={Email} onChange={(e)=>{setEmail(e.target.value)}} required/>

          <button type="submit" className='form-control btn btn-dark mt-3'>Login</button>
        <Link to="/Register"><button type="submit" className='form-control btn btn-primary mt-3'>Registration</button></Link>  
          
        </form>
      </div>
      <div className='col-md-4'></div>
    </div>
  </div>
  )
}

export default Loginform