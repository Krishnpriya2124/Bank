import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { customerService } from "../apiUrls";
import CustNavBar from "./Custnavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Deposit.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerNavBar from "./Custnavbar";

function Createaccount()
{const [formValue, setFormValue]= useState({acc_type:""});


const handleInput=(e)=>{
const {name, value}= e.target;
   setFormValue({...formValue, [name]:value});
  }
  
  const handleSubmit =async (e) =>{
      e.preventDefault();
      const data={acc_type:formValue.acc_type}
     
      try{
            const response = await customerService.createaccount(data);

           
            alert('account created successfully')
            window.location.reload(true)
            
            
          }
            
        catch (error){
        if(error.response.status==400){
          alert("You Already Have An Account")
         }
          
        }
      
 }
    return(
      <><CustNavBar/>
      <div class="login-box">
 
 <form onSubmit={handleSubmit}>
 <ToastContainer
  position="top-Right"
  autoClose={5000}
 
  />
  
   <div class="user-box">
     <input type="text" name="acc_type" placeholder="account type" required="" onChange={handleInput}/>
     <label>Account Type</label>
   </div><center>
   
   <button className="login__icon" id="button" >create</button></center>
 </form>
</div></>
     


    );
}
export default Createaccount;