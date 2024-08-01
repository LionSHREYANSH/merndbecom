// import React from 'react'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const Admineditform = () => {

    const [pname, setPName] = useState("")
    const [pdesc, setDesc] = useState("")
    const [pamount, setPAmount] = useState("")
    const [pqty, setPQty] = useState("")
    const [pstatus, setPStatus] = useState("")
    const [pimg, setPImg] = useState("")
     const [message, setMessage] = useState("")
     const [editImage , setEditImage] = useState(false);

    const {id }= useParams()

    const navigate = useNavigate()

  

  
     useEffect(()=>{
        fetch(`/api/singleproductupdate/${id}`) .then((res)=>{return res.json()}).then((data)=>{
          
            console.log(data)
            if(data.status==200){
                setPName(data.apiData.PName)
                setDesc(data.apiData.PDesc)
                setPAmount(data.apiData.PAmount)
                setPQty(data.apiData.PQty)
                setPImg(data.apiData.PImg )
                setPStatus(data.apiData.PStatus)
              
            }else{
                setMessage(data.message)
            }
            })
       },[])

///-------------------------------------------------------------------------------------







       function handleform(e){
        e.preventDefault()
       
        let Data1 = new FormData()
    
        
        if(editImage){
          Data1.append("pname", pname)
        Data1.append("pdesc", pdesc)
        Data1.append("pamount", pamount)
        Data1.append("pqty", pqty)
        Data1.append("pstatus", pstatus)
          Data1.append("pimg", pimg);
          fetch(`/api/adminupdateImage/${id}`,{
            method : "PUT",
            body : Data1
        })
        .then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
         if(data.status===200){
            setMessage(data.message)
             navigate("/admindashboard")
         }else{
            setMessage(data.message)
         }
        })
        }else{

         const data = {
                pname: pname,
                pdesc: pdesc,
                pamount: pamount,
                pqty: pqty,
                pstatus: pstatus
            }
            
            fetch(`/api/adminupdate/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
         if(data.status===200){
            setMessage(data.message)
             navigate("/admindashboard")
         }else{
            setMessage(data.message)
         }
        })
        }
        
            
        
       }



  return (
    <div>
          <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {/* <Link to="/addProductForm"><button className='btn btn-success mt-3'>AddProduct</button></Link> */}
        </div>
        <div className='col-md-9' id="Adminaddproductform">
          <form onSubmit={(e) => { handleform(e) }}>
            <label>Product Name</label>
            <input type="text" className='form-control' value={pname} onChange={(e) => { setPName(e.target.value) }} required />

            <label>Product Description</label>
            <input type="text" className='form-control' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} required  maxLength={25} />

            <label>Product Amount</label>
            <input type="text" className='form-control' value={pamount} onChange={(e) => { setPAmount(e.target.value) }} required />

            <label>Product Quantity</label>
            <input type="text" className='form-control' value={pqty} onChange={(e) => { setPQty(e.target.value) }} required />

            <label>Product Status</label>
          {/* <input type="text" className='form-control' value={pstatus} onChange={(e) => { setPStatus(e.target.value) }} />
 */}


          <select className='form-select' value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}}>
              <option value='OUT-STOCK'>OUTSTOCK</option>
              <option value= 'IN-STOCK'>INSTOCK</option>
            </select>

            <label>Product Image</label>
            {/* <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required /> */}
            {editImage ? <div>
              <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
            </div> : (
              <div>
                <img src={`http://localhost:5000/upload/${pimg}`} id="editImage" />
                <i class="bi bi-pencil-fill" onClick={()=>{setEditImage(true)}}></i>
              </div>
            )}
            
           

            <button type="submit" className='btn btn-primary mt-3 form-control'>Edit Product Here</button>
          </form>


        </div>
      </div>
    </div>
  
    </div>
  )
}

export default Admineditform