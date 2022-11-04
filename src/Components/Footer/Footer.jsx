import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (<>
<div className=' container-fluid'>
<footer className="row p-3 bg-dark">
    <div className="col mb-3">
    <a href="https://www.linkedin.com/in/mohammedashery/"  className="d-flex align-items-center mb-3 text-muted text-decoration-none">Mohamed_profile.© 2022
      </a>
    
    </div>

    <div className="col mb-3">

    </div>

    <div className="col mb-3">
  
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Home</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Features</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Pricing</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">FAQs</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">About </NavLink></li>
      </ul>
    </div>

    <div className="col mb-3">
  
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Home</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Features</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Pricing</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">FAQs</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="3" className="nav-link p-0 text-muted">About </NavLink></li>
      </ul>
    </div>

    <div className="col mb-3">
     
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Home</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Features</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">Pricing</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="#" className="nav-link p-0 text-muted">FAQs</NavLink></li>
        <li className="nav-item mb-2"><NavLink to="3" className="nav-link p-0 text-muted">About </NavLink></li>
      </ul>
    </div>
  </footer>
</div>

      

 
 

    </>
  )
}
