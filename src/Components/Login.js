
import { showPassword1} from "./AuthenticationFunctions";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const Login=()=>{
    const navigator=useNavigate();
    const [userData,setUserData]=useState();
    //Login field Values
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    //To Display Error
    const [err1,setErr1]=useState("");
    const [err2,setErr2]=useState("");
    const [loginMsg,setLoginMsg]=useState("");

    
    //To Clear
    const regClear=()=>{
        document.getElementById('floatingInput1').value="";
        document.getElementById('floatingPassword1').value="";
        setUserName("");setPassword("");
    }
    const handleLogin=async()=>{
        setErr1(""); setErr2("") ;setLoginMsg("");
        var flag1,flag2;
     
        (userName.trim()==="")?setErr1("Enter valid user name!"):flag1=true;
        (password.trim()==="")?setErr2("Enter the password!"):flag2=true; 
       
        if(flag1===true && flag2===true)
        {
            try{
               const res1=await axios.post("http://localhost:8080/feed/login",{userName,password});
               const res2=await axios.get("http://localhost:8080/feed/user/"+userName);
               setUserData(res2.data);
               localStorage.setItem("userId",res2.data.id);
               localStorage.setItem("userRole",res2.data.role);
               localStorage.setItem("authenticatedUser",userName);
              (res2.data.role === "admin")? navigator("/adminPanel"): navigator("/feed");
               setLoginMsg("");
            }
            catch(error)
            {
                setLoginMsg("Login Failed!");
                console.log("Login Failed",error);
            }
        }
    }
    return(
       <section className="container-fluid feed-login py-5">
            <div className="form-floating ">
                <input type="text" className="form-control" id="floatingInput1" placeholder="" onChange={(e)=>setUserName(e.target.value)}/>
                <label for="floatingInput1">UserName</label>
            </div>
            <p className="regErr">{err1}</p>
            <div className="form-floating  pwd-visibility">
                <input type="password" className="form-control" id="floatingPassword1" placeholder="" onChange={(e)=>setPassword(e.target.value)}/>
                <label for="floatingPassword1">Password</label>
                <i className="fa-regular fa-eye-slash" id="icon1" onClick={showPassword1}></i>
            </div>
            <p className="regErr">{err2}</p>
                <button className="m-3" onClick={handleLogin}>Login</button>
            <p className="regErr" style={{color:(loginMsg.includes("Success"))?"green":"red"}}>{loginMsg}</p>
            <p className="reg-now">Don't have an account?<Link to="/feed/register" >Register now</Link></p>
       </section>
    );
}
export default Login;
