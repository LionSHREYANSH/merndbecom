// // import React from 'react'

// // import React from 'react'

// import React, { useContext, useEffect, useState } from 'react'

// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn
// } from 'mdb-react-ui-kit';
// import { contextapi } from '../Contextapi';




// const Productpage = () => {

//      const [message , setMessage] =  useState("") 
//      const [product , setProduct] = useState([])

//      useEffect(() => {
//       fetch("/api/usershowlist").then((res) => { return res.json() }).then((data) => {
//         console.log(data)
//         if (data.status === 200) {
//           setProduct(data.apiData)
//         } else {
//           setMessage(data.message)
//         }
      
//       })
  
//     }, [])


//    const {cart  ,setCart} =  useContext(contextapi)


//     function handlecart(e , productid){
//        console.log(productid)
          
// let _cart = {...cart}

// if(!_cart.item){
// _cart.item={}
// }

// if(!_cart.item[productid]){
// _cart.item[productid] = 1
// }

// else{
// _cart.item[productid] +=1
// }

// if(!_cart.totalitems){
// _cart.totalitems = 1
// }

// else{
// _cart.totalitems +=1

// }

// setCart(_cart)
// console.log(cart)
// }
     
    

//   return (
 
     
//     <div className='container' >
//       <div className=' row' >
//         {product.map((product , key) => (
//           <div className='col-md-4 mt-3' >
//             <MDBCard>
//               <MDBCardImage src={`upload/${product.PImg}`} position='top' alt='...' style={{height : "20rem"}} />
//               <MDBCardBody>
//                 <MDBCardTitle>{product.PName}</MDBCardTitle>
//                 <MDBCardText>
//                  <p>{product.PDesc}</p>
//                 </MDBCardText>
//                 <MDBCardText>
//                 Price : $  <p>{product.PAmount}</p>
//                 </MDBCardText>
//                 <MDBBtn onClick={(e)=>{handlecart(e , product._id)}}>Add To Cart</MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </div>
//         ))

//         }

//       </div>
//     </div>



//   )
// }

// export default Productpage


// import React from 'react'

//---------------------------------------------------------------------------------------------

import React, { useContext, useEffect,useState } from 'react' ; 


import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { contextapi } from '../Contextapi';

const Productpage = () => {
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("/api/usershowlist")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setProduct(data.apiData);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setMessage("Error fetching product data");
      });
  }, []);

  const { cart, setCart } = useContext(contextapi);

  function handlecart(e, productid) {
    console.log(productid);

    let _cart = { ...cart };

    if (!_cart.items) {
      _cart.items = {};
    }

    if (!_cart.items[productid]) {
      _cart.items[productid] = 1;
    } else {
      _cart.items[productid] += 1;
    }

    if (!_cart.totalitems) {
      _cart.totalitems = 1;
    } else {
      _cart.totalitems += 1;
    }

    setCart(_cart);
    console.log(_cart);
  }

  return (
    <div className='container'>
      <div className='row'>
        {product.map((product, key) => (
          <div className='col-md-4 mt-3' key={product._id}>
            <MDBCard>
              <MDBCardImage src={`upload/${product.PImg}`} position='top' alt='...' style={{ height: "20rem" }} />
              <MDBCardBody>
                <MDBCardTitle>{product.PName}</MDBCardTitle>
                <MDBCardText>
                  <p>{product.PDesc}</p>
                </MDBCardText>
                <MDBCardText>
                  Price: $<p>{product.PAmount}</p>
                </MDBCardText>
                <MDBBtn onClick={(e) => { handlecart(e, product._id) }}>Add To Cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productpage;
