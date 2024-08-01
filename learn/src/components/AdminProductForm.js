import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AdminProductForm = () => {
  const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pamount, setPAmount] = useState("")
  const [pqty, setPQty] = useState("")
  const [pstatus, setPStatus] = useState("")
  const [pimg, setPImg] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  function handleform(e) {
    e.preventDefault()
    // console.log(pname , pdesc , pamount , pstatus  ,pqty)
    // console.log(pimg)




    let Data = new FormData()

    Data.append("pname", pname)
    Data.append("pdesc", pdesc)
    Data.append("pamount", pamount)
    Data.append("pqty", pqty)
    Data.append("pstatus", pstatus)
    Data.append("pimg", pimg)

    fetch("/api/adminproductinsertform", {
      method: "POST",
      body: Data
    }).then((res) => { return res.json() }).then((data) => {
      console.log(data)

      if (data.status === 201) {
        setMessage(data.message)
        navigate("/admindashboard")

      } else {
        setMessage(data.message)
      }




    })

  }

  return (
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
            <input type="text" className='form-control' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} required />

            <label>Product Amount</label>
            <input type="text" className='form-control' value={pamount} onChange={(e) => { setPAmount(e.target.value) }} required />

            <label>Product Quantity</label>
            <input type="text" className='form-control' value={pqty} onChange={(e) => { setPQty(e.target.value) }} required />

            <label>Product Status</label>
            {/* <input type="text" className='form-control' value={pstatus} onChange={(e) => { setPStatus(e.target.value) }} /> */}
            <select className='form-select' value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}}>
              <option value='OUT-STOCK'>OUTSTOCK</option>
              <option value= 'IN-STOCK'>INSTOCK</option>
            </select>

            <label>Product Image</label>
            <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
           

            <button type="submit" className='btn btn-primary mt-3 form-control'>Add Product Here</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default AdminProductForm