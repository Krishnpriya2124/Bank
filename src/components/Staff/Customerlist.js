
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { staffService } from "../apiUrls";
import StaffNavBar from "./Staffnavbar";

import { axiosPrivate } from "../Interceptor";
import { useNavigate } from "react-router-dom";

function Customerlist() {
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate= useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await staffService.customerlist();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = async (url) => {
    try {
      const response = await axiosPrivate(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (value) => {
    navigate("customerupdate/", { state: value });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResults = data.results.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <StaffNavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleInputChange}
              className="form-control"
            /><br/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">user id</th>
                  <th scope="col">Username</th>
                  <th scope="col">User Type</th>
                  <th scope="col">Email</th>
                  
                  <th colSpan={1}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((value, Index) => (
                  <tr key={Index}>
                    <td>{value.id}</td>
                    <td>{value.username}</td>
                   
                   
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
              onClick={() => handlePagination(data.previous_page)}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePagination(data.next_page)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customerlist;

        
