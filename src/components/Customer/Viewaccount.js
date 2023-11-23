import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { customerService } from "../apiUrls";
import CustomerNavBar from "./Custnavbar";
import { axiosPrivate } from "../Interceptor";

function ViewAccount() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.accountDetails();
        setData(response.data.customer);
        console.log(response.data);

        // setData(response.data);
        console.log("yes");
      } catch (error) {
        console.error(error.data);
      }
    };
    fetchData();
  }, []);

  const handleclose = async () => {
    try {
      const response = await customerService.closeAccount();
      if (response.data === "please withdraw the money") {
        alert("withdraw the money then close account");
        navigate("/withdraw");
      } else {
        alert("Account Close successfully");
      }
    } catch (error) {
      if (error.response.status == 400) {
        console.log(error.response);
        alert("Your Account Already Closed");
      }
      if (error.response.status === 404) {
        alert("You didnt have an account");
      }
    }
  };

  return (
    <>
      <CustomerNavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Account Id</th>
                  <th scope="col">Account Type</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Balance</th>
                  <th scope="col">User Id</th>

                  <th colSpan={2}>Action</th>
                </tr>
              </thead>

              <tbody>
                {[data].map((value, index) => (
                  <tr key={index}>
                    {/* <th scope="row">1</th> */}
                    <td>{value.id}</td>
                    <td>{value.acc_type}</td>
                    <td>{value.acc_no}</td>
                    <td>{value.acc_status}</td>
                    <td>{value.acc_balance}</td>
                    <td>{value.user}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleclose()}
                      >
                        Close
                      </button>
                      {/* <button type="button" className="btn btn-success">Transaction History</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAccount;
