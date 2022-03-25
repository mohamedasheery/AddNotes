import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./Components/App/App";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  
    <BrowserRouter>

    <App />
    </BrowserRouter>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
