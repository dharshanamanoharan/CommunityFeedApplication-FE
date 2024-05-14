import { showPassword1,showPassword2 } from "./AuthenticationFunctions";
import { useState } from "react";
import axios from "axios";
const Register=()=>{

    //Register field Values
    const [email,setEmail]=useState("");
    const [userName,setUserName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    //Regex
    const nameRegEx=new RegExp(/^[A-Za-z0-9]*$/);
    const emailRegEx=new RegExp(/^[A-za-z0-9]+@[a-zA-z]+.[a-zA-Z]{2,}$/);
    const phoneRegEx=new RegExp(/^[0-9]*$/);
    const passwordRegEx1=new RegExp(/[0-9]/);
    const passwordRegEx2=new RegExp(/[a-z]/);
    const passwordRegEx3=new RegExp(/[A-Z]/);
    const passwordRegEx4=new RegExp(/[^\W]/);

    //To Display Error
    const [err1,setErr1]=useState("");
    const [err2,setErr2]=useState("");
    const [err3,setErr3]=useState("");
    const [err4,setErr4]=useState("");
    const [err5,setErr5]=useState("");
    const [regMsg,setRegMsg]=useState("");
    //To Clear
    const regClear=()=>{
        document.getElementById('floatingInput1').value="";
        document.getElementById('floatingInput2').value="";
        document.getElementById('floatingInput3').value="";
        document.getElementById('floatingPassword1').value="";
        document.getElementById('floatingInput4').value="";
        setEmail("");setUserName("");setPhoneNumber("");setPassword("");setRole("");
    }
    const handleRegister=async()=>{
        setErr1(""); setErr2("") ;setErr3("") ;setErr4("") ;setErr5("");setRegMsg("");
        var flag1,flag2,flag3,flag4,flag5;
        (userName.trim()==="" || userName.length<3 || !nameRegEx.test(userName))?setErr1("Name must be atleast 3 characters!"):flag1=true;
        (password.trim()==="" || password.length<8 || !passwordRegEx1.test(password) || !passwordRegEx2.test(password)|| !passwordRegEx3.test(password)|| !passwordRegEx4.test(password))?setErr2("Password must be atleast 8 characters with one upercase,one lowercase,one symbol and one numeral!"):flag2=true;
        (email.trim()==="" ||!emailRegEx.test(email))?setErr3("Enter a valid email address!"):flag3=true;
        (phoneNumber.trim()==="" || phoneNumber.length<10 || phoneNumber.length>10 || !phoneRegEx.test(phoneNumber))?setErr4("Enter a valid phone number!"):flag4=true;
        (role.trim()==="")?setErr5("Please select the role"):flag5=true
        if(flag1===true && flag2===true && flag3===true && flag4===true && flag5===true)
        {
            try{
                const res=await axios.post("http://localhost:8080/feed/register",{userName,email,phoneNumber,password,role})
                console.log("Registration success",res.data);
                setRegMsg("Updated Successfully");
                regClear();
            }
            catch(error)
            {
                console.log("Registration Failed",error);
                setRegMsg("Updated Failed!");
            }
        }
    }
    return(
        <section className="feed-registration py-5">
                <div className="form-floating ">
                    <input type="text" className="form-control" id="floatingInput1" placeholder="" onChange={(e)=>setUserName(e.target.value)}/>
                    <label for="floatingInput1">UserName</label>
                </div>
                <p className="regErr">{err1}</p>
                <div className="form-floating pwd-visibility">
                    <input type="password" className="form-control" id="floatingPassword1" placeholder="" onChange={(e)=>setPassword(e.target.value)}/>
                    <label for="floatingPassword1">Password</label>
                    <i className="fa-regular fa-eye-slash" id="icon1" onClick={showPassword1}></i>
                </div>
                <p className="regErr">{err2}</p>
                <div className="form-floating ">
                    <input type="email" className="form-control" id="floatingInput2" placeholder="" onChange={(e)=>setEmail(e.target.value)}/>
                    <label for="floatingInput2">Email</label>
                </div>
                <p className="regErr">{err3}</p>
                <div className="form-floating ">
                    <input type="text" className="form-control" id="floatingInput3" placeholder="" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    <label for="floatingInput3">Phone Number</label>
                </div>
                <p className="regErr">{err4}</p>
                <div className="form-floating ">
                    <label for="floatingInput4">Roles</label>
                    <select className="form-control" id="floatingInput4" placeholder="" onChange={(e)=>setRole(e.target.value)}>
                        <option value="">---</option>
                        <option value="user">User</option>
                        <option value="admin" disabled="true">Admin</option>
                   </select>
                </div>
              
                <p className="regErr">{err5}</p>
                <button className="m-3" onClick={handleRegister}>Register</button>
                <p className="regErr" style={{color:(regMsg.includes("Success"))?"green":"red"}}>{regMsg}</p>

        </section>
    );
}
export default Register;