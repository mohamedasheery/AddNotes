import { createContext, useEffect, useState } from "react";
import { useNavigate  } from "react-router";
import jwt_decode from "jwt-decode";

export let UserInfoContext = createContext(0);

export function UserInfoProvider(props) {
  let navigate = useNavigate();
// id = 621f0781fedda6001563a0cd;
  let [loginUser, setloginUser] = useState('');

  function logout() {
    localStorage.removeItem("token");
    setloginUser(null);
    navigate("/login");
  }

  function getUserInfo() {
    
    let endecodedToken = localStorage.getItem("token");
    let userData = jwt_decode(endecodedToken);
    setloginUser(userData);
  
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo();
      
    }
  }, []);
  
  return (
    <UserInfoContext.Provider value={{ loginUser, getUserInfo, logout }}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
