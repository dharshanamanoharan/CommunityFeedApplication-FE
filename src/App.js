
import './App.css';
import React from 'react';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login';
import Feeds from './Components/Feeds';
import AdminPanel from './Components/AdminPanel';
import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { isAuthenticated , isAuthorized} from './Components/AuthenticationFunctions';
import MyActivity from './Components/MyActivity';
import PostList from './Components/PostList';
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
  //Protected Routes to Display pages based on Authorization
  function AuthorizedRoute({children})
  {
    if(isAuthenticated() === true && isAuthorized() === true)
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
      {(isAuthenticated()=== true) ? <Route path="/" element={<Feeds/>}/>:<Route path="/" element={<Login />} />}
      {(isAuthenticated()=== true) ? <Route path="/feed/register" element={<Feeds/>}/>:<Route path="/feed/register" element={<Register />} />}
      {(isAuthenticated()=== true) ? <Route path="/feed/myActivity" element={<MyActivity/>}/>:<Route path="/feed/myActivity" element={<Register />} />}
      {(isAuthenticated()=== true) ? <Route path="/feed/publicFeed" element={<PostList/>}/>:<Route path="/feed/publicFeed" element={<Register />} />}
      <Route path="/feed" element={<AuthenticatedRoute><Feeds/></AuthenticatedRoute>}/>
      <Route path="/adminPanel" element={<AuthorizedRoute><AdminPanel/></AuthorizedRoute>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
