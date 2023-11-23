// import './Transaction.css'

import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './list.css';
import { managerService } from "../apiUrls";
import ManagerNavBar from "./Managernavbar";
import React,{useState,useEffect}from "react";

import { axiosPrivate } from "../Interceptor";


function Stafflist()
    { const [data, setData] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const navigate= useNavigate();
      
      useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await managerService.stafflist();
           setData(response.data.customer)
           console.log(response.data)
          
           // setData(response.data);
           console.log("yes");
            
           
         } catch (error) {
          
          //  console.error(error.data);
         }
       };
       fetchData();
      
     }, []);
     const handlePagination = async (url) => {
      try {
        const response = await axiosPrivate(url);
        setData(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

     const handleUpdate=async(value)=>{
      
    
      navigate('staffupdate/',{state:value})}
      const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const filteredResults = data.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
        
        return(
          <>
      <ManagerNavBar/>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleInputChange}
              className="form-control"
            />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">user id</th>
                  <th scope="col">Name</th>
                  <th scope="col">usertype</th>
                  <th scope="col">email</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((value, Index) => (
                  <tr key={Index}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.usertype}</td>
                    <td>{value.email}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleUpdate(value)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePagination(data.next_page)}
            >
              Next
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePagination(data.previous_page)}
            >
              Previous
            </button>
          </div>
        </div>
      </div>    </>
  );
         
       }
       export default Stafflist;

        