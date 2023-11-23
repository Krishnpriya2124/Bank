import React,{useState}from "react";
import { useNavigate } from "react-router-dom";

import { customerService } from "../apiUrls";

import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../home/Homenavbar";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(){
	const [formValue, setFormValue]= useState({username:'', password:''});
  // const [message, setMessage]= useState();
  const navigate= useNavigate();
  const handleInput=(e)=>{
  const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }
    
    const handleSubmit =async (e) =>{
        e.preventDefault();
        const data={username:formValue.username,password:formValue.password}
       
        try{
            const response=await customerService.login(data)
           
            console.log(response.data)
            const tokens = {
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
                id: response.data.userid
              };
              
              const tokensJSON = JSON.stringify(tokens);
                    
              localStorage.setItem('tokens', tokensJSON);
              const decoded = jwtDecode(tokens.accessToken);
              const usertype=decoded.usertype
             
              toast.success("Loggedin Successfully")
              // if(usertype=='customer')
              // {
              //   navigate('/customerdash')
              // }
              // else if(usertype=='staff'){
              //   navigate('/staffdash')

              // }
              // else if(usertype=='manager'){
              //   navigate('/managerdash')

              // }
              const dashboardMapping={
                "customer":"/customerdash",
                "staff":"/staffdash",
                "manager":"/managerdash"
              }
              navigate(dashboardMapping[usertype]||"/login");
              
            
           
          }      
          catch (error){
            console.log(error.data)
            toast.warn("No active account with this username and password")
          }
        }
  const myFunction=(e)=> {
            var x = document.getElementById("password")
            console.log(x)
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
          }
        
	
return(
  <><NavBar/>    <div><ToastContainer
  position="top-center"
  autoClose={5000}
 
  />

    <form class="form_main" onSubmit={handleSubmit}>
    <p class="heading">Login</p>
    <div class="inputContainer">

    <input type="text" class="inputField" name="username" placeholder="Username" onChange={handleInput} required/>
    </div>
    
<div class="inputContainer">
 
    <input type="password" class="inputField" name="password" placeholder="Password" onChange={handleInput} required id="password"/>
</div>
<div class="inputContainer">
 
<input type="checkbox" onClick={()=>myFunction()}/>Show Password
</div>
              
           
<button id="button">Submit</button>
    <a class="forgotLink" href="#">Forgot your password?</a>
</form></div></>
);
}
export default Login