import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contextapi } from '../Contextapi'


const AdminDash = () => {

  const [product, setProduct] = useState([])
  const [message, setMessage] = useState("")

 const {loginname} = useContext(contextapi)
 const navigate  = useNavigate()

  useEffect(()=>{
    fetch("/api/adminshowdetails").then((res) => { return res.json() }).then((data) => {
      console.log(data)
      if (data.status === 200) {
        setProduct(data.apiData)
        if(loginname !== "admin1"){
          navigate("/")
        }
    
      } else {
        setMessage(data.message)
      }
    })
  },[])

  function handleremove(e , id){
    fetch(`/api/admindeleteproduct/${id}`,{
      method : "DELETE"
    }).then((res)=>{return res.json()}).then((data)=>{
      if(data.status === 200){
        setMessage(data.message)
        navigate('/admindashboard')
      }else{
        setMessage(data.message)
      }
    })
  }

  return (
    <div className='container'>

      <div className=''>
          <Link to="/addProductForm"><button className='btn btn-primary mt-3'>AddProduct</button></Link>
        </div>
      <div className='row'>
        
        <div className='col-md-12'>
        <table className="table table-dark mt-3" id="table">
  <thead>
    <tr>
        <th scope="col">Product Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Description</th>
      <th scope="col">Product Amount</th>
      <th scope="col">Product Quantity</th>
      <th scope="col">Product Status </th>
      <th scope='col'>Remove data</th>
      <th scope='col'>Edit data</th>
     
    
    </tr>
  </thead>
  
    <tbody>
     {product.map((item)=>(
          <tr>
        
          <td><img src={`upload/${item.PImg  }`} alt='img' id="myimg" /></td>
          <td>{item.  PName}</td>
          <td>{item.  PDesc}</td>
          <td>{item. PAmount}</td>
          <td>{item.PQty}</td>
          <td>{item.PStatus}</td>
          <td><Link to={`/adminproductremove/${item._id}`}><button className='btn btn-danger' onClick={(e)=>{handleremove(e,item._id)}}><i class="bi bi-trash3-fill"></i></button></Link></td>
          <td><Link to={ `/adminproductupdate/${item._id}`}><button  className='btn btn-primary' ><i class="bi bi-pencil-fill"></i></button></Link></td>
    
        </tr>
     ))}
           

   
  
  
  </tbody>

  
</table>
    
      </div>
      </div>
    </div>
  )
}

export default AdminDash