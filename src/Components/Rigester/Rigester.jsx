import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { NavLink } from "react-router-dom";
import Joi from "joi";


export default function Rigester(props) {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [isloading, setIsLodaing] = useState(false);
  const [validteClinteError, setValidteClinteError] = useState([])
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function getuser(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setuser(myuser);
    
  }

  async function sendData(e) {
    e.preventDefault();
   
    setIsLodaing(true);
    let validateResponse = validationRegisterForm();
    if (validateResponse.error) {

      setValidteClinteError(validateResponse.error.details);
      setIsLodaing(false);
    }else{
      let { data } = await axios.post(
        `https://route-movies-api.vercel.app/signup`,
        user
      );
      setIsLodaing(false);
      if (data.message === "success") {
     
        navigate("/login");;
      } else {
       
     
        setError(data.message);
      }
    }

   
  }
  function validationRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(16).required(),
      last_name: Joi.string().alphanum().min(3).max(16).required(),
      email: Joi.string().required().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "eg"] },
      }),
      password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,16}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
   
    <div className="container minBgColor col-sm-6  my-5 py-3">
    <div className="row">
        <div className="col-md-10 m-auto ">
          <h2 className="text-light">Register Now</h2>
          <form onSubmit={sendData} className="text-light">
       
            <div class="mb-3">
              <label for="exampleInputFirst_name" class="form-label">
              Enter First Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputFirst_name"
                onChange={getuser}
                placeholder="Enter your f name"
                name="first_name"
              />
               {validteClinteError.map((error, index) =>
            error.path[0] === "first_name" ? (
              <div key={index} className="text-danger">
               {error.message}  
              </div>
            ) : (
              ""
            )
          )}
          
            </div>
            <div class="mb-3">
              <label for="exampleInputLast_name" class="form-label">
              Enter Last Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputLast_name"
                onChange={getuser}
                placeholder="Enter Last Name"
                name="last_name"
              />
               {validteClinteError.map((error, index) =>
            error.path[0] === "last_name" ? (
              <div key={index} className="text-danger">
               {error.message} 
              </div>
            ) : (
              ""
            )
          )}
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                onChange={getuser}
                placeholder="Enter email"
                name="email"
              />
                   {validteClinteError.map((error, index) =>
            error.path[0] === "email" ? (
              <div key={index} className="text-danger">
              {error.message} 
              </div>
            ) : (
              ""
            )
          )}
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                onChange={getuser}
                placeholder="Enter password"
                name="password"
              />
                   {validteClinteError.map((error, index) =>
            error.path[0] === "password" ? (
              <div key={index} className="text-danger">
               "password invalid"  
              </div>
            ) : (
              ""
            )
          )}
            </div>
           
            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn  btn-secondary m-2 ">
              {isloading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                " register"
              )}
            </button>
            <span>you have  account</span> <NavLink className="text-muted" to="/login">login</NavLink>

          </form>
        </div>
      </div>
    </div>
  
   
    </>
  );
}
