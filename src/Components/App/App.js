import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Rigester from "../Rigester/Rigester";
       
import Search from "../Search/Search";

import {element, Route, Routes} from "react-router";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute";
import { UserInfoProvider } from "../../UserInfoContext";
import Notfound from "./../Notfound/Notfound";


function App() {
  return (
    <div className="App pt-5">
      <UserInfoProvider>
        <Navbar />
     
  
      <Routes>
        <Route path="/home"  element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
        <Route path="/search"  element={<ProtectedRoute> <Search /></ProtectedRoute>} />
        <Route path="/rigester"  element={ <Rigester />} />

        <Route path="/Search" element={<Search />}  />

        <Route path="/" element={<Home/>} />
          <Route path="*" element={<Notfound />} />
          
        </Routes>
        </UserInfoProvider>
    </div>
  );
}

export default App;
