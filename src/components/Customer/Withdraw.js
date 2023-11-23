

import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { customerService } from "../apiUrls";
import CustNavBar from "./Custnavbar";
import './Deposit.css'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerNavBar from "./Custnavbar";

function Withdraw (){
  const [formValue, setFormValue]= useState({amount:""});
// const [message, setMessage]= useState();
const navigate= useNavigate();
const handleInput=(e)=>{
const {name, value}= e.target;
   setFormValue({...formValue, [name]:value});
  }
  
  const handleSubmit =async (e) =>{
      e.preventDefault();
      const data={amount:formValue.amount}
     
      try{
            const response = await customerService.withdraw(data);
            alert("debited...")
            window.location.reload(true)
          }
            
        catch (error){
          if(error.response.status===403){
            alert("Please create an account")
          }
          else if(error.response.status===400)
          {
          alert("Your account is inactive so plaease wait for Approval")
          }
          else if(error.response.status===404)
          {
          alert("Insufficient balance!!")
          }
        }
      }

return(
  <><CustNavBar/>
  <div class="login-box">
 
  <form onSubmit={handleSubmit}>
   
    <div class="user-box">
      <input type="text" name="amount" required="" id='amount' placeholder='amount'onChange={handleInput}/>
      <label for="amount">Amount:</label>
    </div><center>
    
    <button className="login__icon" id="button" >Withdraw</button></center>
  </form>
 </div></>
      
);
}
export default Withdraw;