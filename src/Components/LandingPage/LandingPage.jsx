import React from "react";
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
  let navigate= useNavigate()
  return (
    <>
    <div className=" container vh-100">
    <div className=" row ">
        <div className="  col-md-8 ">
        <img src="https://searchengineland.com/wp-content/seloads/2014/08/writing-content-notes-ss-1920-1536x864.jpg" className="  img-fluid w-100" alt="img"/>
          
        </div>
        <div className="col-md-4  my-3">
          <h2 className="text-center">Add Your Notes And Comments</h2>
          <button onClick={()=>navigate('/login')} className="btn btn-outline-dark w-100 my-3"> Start Now</button>
        </div>
      </div>

    </div>

    
    </>
  );
}
