import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contextapi } from '../Contextapi'

const Navbar = () => {
  const { loginname, setLoginName , cart } = useContext(contextapi)

  const navigate = useNavigate()

  function handlelogout(e) {
    setLoginName(localStorage.removeItem("loginname"))
    navigate("/")
  }

  return (
    <div id="navbar">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#"><i class="bi bi-amazon"></i></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {loginname ?
                <>
                  {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Home</Link>
        </li> */}


                  <li className="nav-item">
                    {/* <Link className="nav-link" to="#">cart</Link> */}
                  <button className='btn btn-primary' style={{boxShadow  : "3px 4px 5px grey"}}><i class="bi bi-cart-dash-fill"></i> <sup id="cartcount">{cart?.totalitems ?? 0}</sup></button> 
                  </li>




                  <li className="nav-item">
                    <Link className="nav-link" to="/">{loginname}</Link>
                  </li>

                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      setting
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item" href="#" onClick={(e) => { handlelogout(e) }}>Logout</a></li>
                    </ul>
                  </li>
                </>
                :

                <></>
              }



            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar