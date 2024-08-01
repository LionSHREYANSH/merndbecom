
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Regform from "./components/Regform";
import Loginform from "./components/Loginform";
import { contextapi } from "./Contextapi";
import { useEffect, useState } from "react";
import AdminDash from "./components/AdminDash";
import Productpage from "./components/Productpage";
import AdminProductForm from "./components/AdminProductForm";
import Admineditform from "./components/Admineditform";



function App() {
  const [cart , setCart] = useState() 
  useEffect(()=>{localStorage.setItem("cart" ,JSON.stringify(cart))},[cart])
  useEffect(()=>{localStorage.setItem("cart",cart)},[cart])

  //---------------------------------------------------------------------------------------------

  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   return savedCart ? JSON.parse(savedCart) : { items: {}, totalitems: 0 };
  // });

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  //---------------------------------------------------------------------------------------

  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"))
  return (
    <div className="App">
      <Router>
        <contextapi.Provider value={{ loginname, setLoginName ,cart , setCart}}>
          <Navbar />
          <Routes>

            <Route path="/" element={<Loginform />} />
            <Route path="/Register" element={<Regform />} />

            <Route path="/admindashboard" element={<AdminDash />} />
            <Route path="/productpage" element={<Productpage />} />
            <Route path="/addProductForm" element={<AdminProductForm />} />
            <Route path="/adminproductupdate/:id" element={<Admineditform/>}/>
          </Routes>
        </contextapi.Provider>
      </Router>
    </div>
  );
}



export default App;
