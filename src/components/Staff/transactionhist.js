
import React,{useState,useEffect}from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {staffService } from '../apiUrls';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StaffNavBar from "./Staffnavbar";
import { axiosPrivate } from "../Interceptor";


function TransactionHistory() {
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await staffService.transactionHistory();
      setData(response.data);
      // console.log(response.data)
    } catch (error) {
      // console.error(error);
    }
  };

  const handlePagination = async (url) => {
    try {
      const response = await axiosPrivate(url);
      setData(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResults = data.results.filter((item) =>{
    const acc = item.acc.toString();
    return acc.includes(searchTerm);
  });

  return (
    <>
      <StaffNavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search by AccountId"
              value={searchTerm}
              onChange={handleInputChange}
              className="form-control"
              style={{ marginRight: "5px" }}
            /><br/>
          
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Transaction Amount</th>
                  <th scope="col">Transaction Date</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col">Account ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((value, index) => (
                  <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.amount}</td>
                    <td>{value.trans_date}</td>
                    <td>{value.trans_type}</td>
                    <td>{value.acc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
       
          
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePagination(data.previous)}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePagination(data.next)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;

        
