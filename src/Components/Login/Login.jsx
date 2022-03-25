import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { UserInfoContext } from '../../UserInfoContext';
import { useNavigate } from 'react-router-dom';



export default function Login(props) {

  let navigate = useNavigate();
  let { getUserInfo } = useContext(UserInfoContext);
 
  
    let [error, setError] = useState("");
    let [isloading, setisloading] = useState(false);
    const [user, setuser] = useState({ email: "", password: ""});
  
    function getuser(e) {
      let myuser = { ...user };
      myuser[e.target.name] = e.target.value;
      setuser(myuser);
      
  }
 
  
  async function SendData(e) {
      
      e.preventDefault();
      setisloading(true);
  
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signin`,
        user
      );
     
      if (data.message === "success") {
        
        localStorage.setItem('token', data.token);
        getUserInfo();
       
        setisloading(false);
        navigate("/home");
      } else {
      
        setisloading(false);
        setError(data.message);
      }
    }
   
    return (
      <>
        <div className="container my-5 py-5">
          <div className="col-md-5 m-auto text-center">
            <form onSubmit={SendData}>
            
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
                  " singin"
                )}
              </button>
             
              
            </form>
          </div>
        </div>
      </>
    );
}
