// import './Transaction.css'
import React,{useState,useEffect}from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './list.css';
import { staffService } from "../apiUrls";
import StaffNavBar from "./Staffnavbar";
function Approval()
    { 
      
      const [data, setData] = useState([]);
      const navigate= useNavigate();
      const [refresh, setRefresh] = useState(false);
      
         useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await staffService.pendinglist();
              setData(response.data.customer)
             
            } catch (error) {
             
              // console.error(error.data);
            }
          };
          fetchData();
         
        }, [refresh]);


        const handleUpdate=async(id)=>{
      
        // console.log(value)
        // navigate('editview/',{state:value})
        try{
          const response=await staffService.approveAccount(id);
          alert("Account Approved")
          setRefresh(prevRefresh => !prevRefresh);
        
        
        }catch (error) {
             
          // console.error(error.data);
        }
      }


      
      
      
        return(
          <>
         <StaffNavBar/>
            <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                    <th scope="col">Account id</th>
                      <th scope="col">Account No</th>
                      <th scope="col">Account Status</th>
                      <th scope="col">user id</th>
                 
                      <th>Action</th>
                    
                    </tr>
                  </thead>
                  <tbody>{data.map((value,index)=>(

			

                    <tr key={index}>
                      {/* <th scope="row">1</th> */}
                      <td>{value.id}</td>
                      <td>{value.acc_no}</td>
                      <td>{value.acc_status}</td>
                      <td>{value.user}</td>
                   
                      <td>
                        <button type="button" class="btn btn-primary" onClick={()=>handleUpdate(value)}>Approve</button>
                      
                      
                      </td>
                    </tr>
                    ))}
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div></>);
}

        
export default Approval;