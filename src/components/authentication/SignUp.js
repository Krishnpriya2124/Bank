import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { customerService } from "../apiUrls";

import './Login.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../home/Homenavbar";
// import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup()
{
    const [formValue, setFormValue]= useState({username:'',password :'',email:'', first_name:'',last_name:'',usertype:''});
    // const [message, setMessage]= useState();
    const navigate= useNavigate();
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    } 
    const handleSubmit =async (e) =>{
        e.preventDefault();
        const data={username:formValue.username,password:formValue.password,email:formValue.email,first_name:formValue.first_name,last_name:formValue.last_name,usertype:formValue.usertype} 
        
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formValue.password)
        if(isValidPassword ===false){
            toast.warn('password should contain atleast 1 uppercase, 1 lowercase,1digit, 1 special characters and length should be atleast 8')
            return false}
    
        try{
           
            const response=await customerService.register(data)
            alert("Registration successfull")
     
            
            navigate('/login')
          }      
          catch (error){
           
            // alert(error.response.data.status)
            alert("Username already Exist")
            
          }
        
          
          

       
    } 

     return(
       <> <NavBar/>
     
       
     <form  className="form_main" onSubmit={handleSubmit}>
        <>
       

        <p class="heading">Register</p>
        <div className="inputContainer">
           
        <input type="text" className="inputField" name="username" value={formValue.username} placeholder="Username"onChange={ handleInput} required/>
        </div>
        
    <div class="inputContainer">
     
        <input type="password" className="inputField" name="password"value={formValue.password}  placeholder="Password" onChange={ handleInput} required/>
    </div>
    <div class="inputContainer">
     
     <input type="email" className="inputField"  placeholder="email" name='email'value={formValue.email}  onChange={ handleInput} required/>
 </div>
 <div class="inputContainer">
     
     <input type="text" class="inputField" name="first_name" placeholder="first_name" value={formValue.first_name} onChange={ handleInput}/>
 </div>
 <div class="inputContainer">
     
     <input type="text" class="inputField" name="last_name" placeholder="last_name" value={formValue.last_name} onChange={ handleInput}/>
 </div>
 <div class="inputContainer">
     
     {/* <input type="text" class="inputField" name="usertype" placeholder="usertype" onChange={ handleInput}/> */}
    
     {/* <select name="usertype" required>
        <option value="" disabled selected>Select the usertype</option>
        <option value="Salary">customer</option>
        <option value="Savings">staff</option>
        <option value="Current">manager</option> 
 
 </select>  */} <div class="inputContainer">
     
     <input type="text" class="inputField" name="usertype" placeholder="user Type" value={formValue.usertype} onChange={ handleInput} required/>
 </div>

 </div>
                  
               
    <button id="button">Submit</button>
    </>
   
    </form></>
  


    );
}
export default Signup;