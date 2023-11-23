// import './Transaction.css'
import React,{useState,useEffect}from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import './list.css';
import { managerService, staffService } from "../apiUrls";
import StaffNavBar from "./Staffnavbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function EditCustomer()
    { 
        const location=useLocation();
        const dataToEdit=location.state;
        console.log(dataToEdit)
        const [formValue, setFormValue]= useState({id:dataToEdit.id,username:dataToEdit.username,email:dataToEdit.email,usertype:dataToEdit.usertype});
        console.log(dataToEdit.id)
        const navigate= useNavigate();
        
        const handleInput=(e)=>{
            const {name, value}= e.target;
            setFormValue({...formValue, [name]:value});
           } 
           const handleSubmit =async (e) =>{
               e.preventDefault();
            
console.log(dataToEdit.id)
          
                 try{
                  const response=await staffService.updateCustomer(formValue);
                  console.log(response.data)
                  alert('Updated Successfully....')
                  window.location.reload(true)
                  
               
                }
                catch(error){
                  alert('invalid status')
                }


           
           }
        
    return(
      <>
      <StaffNavBar />
      
      <div class="login-box">
 
 <form onSubmit={handleSubmit}>
 
 <div class="user-box">
 <label htmlFor="usertype">Id:</label><br></br>
     <input type="text" name="id"  value={formValue.id} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
   <label for="username">Username</label><br></br>
   <input type="text" name="username" placeholder="username" value={formValue.username} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
   <label htmlFor="email">Email:</label><br></br>
     <input type="text" name="email" placeholder="email" value={formValue.email} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
   <label htmlFor="usertype">User Type:</label><br></br>
     <input type="text" name="usertype" placeholder="usertype" value={formValue.usertype} onChange={handleInput}/>
    
   </div>
   <center>
   
   <button className="login__icon" id="button">Update</button></center>
 </form>
</div></>
    );
} 
export default EditCustomer;