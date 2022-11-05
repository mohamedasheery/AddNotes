import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Rigester from "../Rigester/Rigester";
       
import Search from "../Search/Search";

import { Route, Routes} from "react-router";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute";
import { UserInfoProvider } from "../../UserInfoContext";
import Notfound from "./../Notfound/Notfound";
import Login from "../Login/Login";
import LandingPage from "../LandingPage/LandingPage";
import Footer from "../Footer/Footer";


function App() {
  return (
    <div className="App ">
      <UserInfoProvider>
        <Navbar />
     
  
      <Routes>
        <Route path="/home"  element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
        <Route path="/search"  element={<ProtectedRoute> <Search /></ProtectedRoute>} />
        <Route path="/register"  element={ <Rigester />} />
        <Route path="/login"  element={ <Login />} />

        <Route path="/Search" element={<Search />}  />

        <Route path="/" element={<LandingPage/>} />
        <Route path="/AddNotes//"element={<LandingPage/>} />
          <Route path="*" element={<Notfound />} />
          
        </Routes>
        </UserInfoProvider>
        <Footer/>
    </div>
  );
}

export default App;
