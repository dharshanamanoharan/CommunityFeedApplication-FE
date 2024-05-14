
import './App.css';
import React from 'react';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login';
import Feeds from './Components/Feeds';
import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { isAuthenticated } from './Components/AuthenticationFunctions';
function App() {
  //Protected Routes to Display pages based on Authentication
  function AuthenticatedRoute({children})
  {
    if(isAuthenticated() === true)
      {
        return children;
      } 
      else
      {
        return <Navigate to="/" />
      }
  }
  
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      {(isAuthenticated()=== true) ? <Route path="/" element={<Home/>}/>:<Route path="/" element={<Login />} />}
      {(isAuthenticated()=== true) ? <Route path="/" element={<Home/>}/>:<Route path="/" element={<Register />} />}
      <Route path="/feed" element={<AuthenticatedRoute><Feeds/></AuthenticatedRoute>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
