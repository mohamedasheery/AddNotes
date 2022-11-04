import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { UserInfoContext } from "../../UserInfoContext";
import { NavLink, useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login(props) {
  let navigate = useNavigate();
  let { getUserInfo } = useContext(UserInfoContext);
  const [validteClinteError, setValidteClinteError] = useState([]);

  let [error, setError] = useState("");
  let [isloading, setIsLodaing] = useState(false);
  const [user, setuser] = useState({ email: "", password: "" });

  function getuser(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setuser(myuser);
  }

  async function SendData(e) {
    e.preventDefault();
    setIsLodaing(true);
    let validateResponse = validationLoginForm();
    if (validateResponse.error) {
      setValidteClinteError(validateResponse.error.details);
      setIsLodaing(false);
    }else{
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signin`,
        user
      );
      setIsLodaing(false);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        getUserInfo();
  
      
        navigate("/home");
      } else {
       
        setError(data.message);
      }
    }
  
  }

  function validationLoginForm() {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "eg"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,16}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="container minBgColor col-md-6 my-5  py-3  ">
        <div className="row">
        <div className="col-md-10 m-auto ">
          <h2 className='text-light'>Login now</h2>
        
          <form onSubmit={SendData} className="text-light">
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
                {" "}
                "password invalid" 
              </div>
            ) : (
              ""
            )
          )}
            </div>
            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" class="btn btn-secondary m-1">
            {isloading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  " singin"
                )}
            </button>
            <span >you have not any account</span> <NavLink className="form-text" to="/register">create one</NavLink>

          </form>
        </div>
        </div>
        
      </div>
    </>
  );
}
