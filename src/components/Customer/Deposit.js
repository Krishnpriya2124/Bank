import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { customerService } from "../apiUrls";
import CustNavBar from "./Custnavbar";




import './Deposit.css'
import "bootstrap/dist/css/bootstrap.min.css";


function Deposit (){
  const [formValue, setFormValue]= useState({amount:0});
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
            const response = await customerService.deposit(data);

            console.log(data)
            console.log(response.data)
            alert("Amount credicted...")
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
          
        }
      }


return(

<><CustNavBar/>
<div class="login-box">
 
 <form onSubmit={handleSubmit}>
  
   <div class="user-box">
     <input type="number" name="amount" placeholder="Amount" id="amount" required onChange={handleInput} />
     {/* <label className="form-label" htmlFor="form3Example1c">Amount</label> */}
     <label for="amount">Amount:</label>


   </div><center>
   
   <button className="login__icon" id="button">Deposit</button></center>
 </form>
</div></>


);
}
export default Deposit;
   

                