import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router';


export default function Rigester(props) {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [isloading, setisloading] = useState(false);
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
    console.log(myuser);
  }

  async function sendData(e) {
    e.preventDefault();
    setisloading(true);

    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );
   
    if (data.message === "success") {
      setisloading(false);
      navigate("/login");;
    } else {
     
      setisloading(false);
      setError(data.message);
    }
  }

  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={sendData}>
            <div className="form-group">
              <input
                onChange={getuser}
                placeholder="Enter your f name"
                name="first_name"
                type="text"
                className=" form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getuser}
                placeholder="Enter yourl name"
                name="last_name"
                type="text"
                className=" form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getuser}
                placeholder="Enter email"
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getuser}
                placeholder="Enter you password"
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-info mt-2">
              {isloading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                " register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
