// import './Transaction.css'
import React,{useState,useEffect}from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import './list.css';
import { managerService } from "../apiUrls";
// import StaffNavBar from "./Staffnavbar";
import { useLocation } from "react-router-dom";


function Editstaff()
    { 
        const location=useLocation();
        const dataToEdit=location.state;
        console.log(dataToEdit)
        const [formValue, setFormValue]= useState({id:dataToEdit.id,username:dataToEdit.username,email:dataToEdit.email,usertype:dataToEdit.usertype});
        console.log(dataToEdit.id)
        const handleInput=(e)=>{
            const {name, value}= e.target;
            setFormValue({...formValue, [name]:value});
           } 
           const handleSubmit =async (e) =>{
               e.preventDefault();
            // const data={
            //     'acc_status':formValue.acc_status,
            // 'id':dataToEdit.id
        // }
        // const data={'id':dataToEdit.id,'username':formValue.username,'email':formValue.email,'usertype':formValue.usertype}
console.log(dataToEdit.id)
          
                 try{
                  const response=await managerService.updateStaff(formValue);
                  console.log(response.data)
                  alert('Updated successfully')
               
                }
                catch(error){
                  alert('invalid status')
                }


           
           }
        //    handleApprove();
    return(
      
      <div class="login-box">
 
 <form onSubmit={handleSubmit}>
 
 <div class="user-box">
     <input type="text" name="id"value={formValue.id} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
     <input type="text" name="username"value={formValue.username} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
     <input type="text" name="email"value={formValue.email} onChange={handleInput}/>
    
   </div>
   <div class="user-box">
     <input type="text" name="usertype"value={formValue.usertype} onChange={handleInput}/>
    
   </div>
   <center>
   
   <button className="login__icon" id="button">Update</button></center>
 </form>
</div>
    );
} 
export default Editstaff;