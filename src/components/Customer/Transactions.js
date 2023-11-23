import "./Transaction.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustNavBar from "./Custnavbar";
import { customerService, generalServices } from "../apiUrls";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await generalServices.transactionList();

        setData(response.data.transaction);
      } catch (error) {
        //  console.error(error.data);
      }
    };
    fetchData();
  }, []);
  const HandleDownload = async () => {
    try {
      const response = await customerService.downloadTransaction();

      if (response.status == 200) {
        const blob = new Blob([response.data], { type: "text/csv" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "transaction.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("downloaded successfully");
      }
    } catch (error) {

    }
  };

  return (
    <>
      {" "}
      <CustNavBar />
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Transaction Amount</th>
                  <th scope="col">Transaction type</th>
                  <th scope="col">Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => (
                  <tr key={index}>
                    <td>{value.amount}</td>
                    <td>{value.trans_type}</td>
                    <td>{value.trans_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => HandleDownload()}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;
