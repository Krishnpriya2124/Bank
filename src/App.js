import logo from './logo.svg';
import './App.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/SignUp';


import {Routes, Route} from 'react-router-dom'

import Home from './components/home/Home';
import Customerdash from './components/Customer/CustomerDash';
import Deposit from './components/Customer/Deposit';
import Withdraw from './components/Customer/Withdraw';
import Transactions from './components/Customer/Transactions';
import Createaccount from './components/Customer/Createaccount';
import CustomerNavBar from './components/Customer/Custnavbar';
import Customerlist from './components/Staff/Customerlist';
import Approval from './components/Staff/Approval';
import Staffdash from './components/Staff/StaffDash';
import MangerDash from './components/manager/ManagerDash';

import Stafflist from './components/manager/Stafflist';

import Editstaff from './components/manager/Editstaff';
import EditCustomer from './components/Staff/Edistcustomer';
import Logout from './components/Logout';
import TransactionHistory from './components/Staff/transactionhist';

import ViewAccount from './components/Customer/Viewaccount';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/CustomerDash" element={<Customerdash />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/createaccount" element={<Createaccount />} />

        <Route path="/approvallist" element={<Approval />} />
        <Route path="/staffDash" element={<Staffdash />} />
        <Route path="/managerdash" element={<MangerDash />} />
        <Route path="/stafflist" element={<Stafflist />} />
     
        <Route path="stafflist/staffupdate" element={<Editstaff />} />
        <Route path="transactions/" element={<Transactions />} />
        <Route path="/customerlist" element={<Customerlist />} />
        <Route path="customerlist/customerupdate" element={<EditCustomer />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/transactionhistory" element={<TransactionHistory />} />
     
        <Route path="/viewaccount" element={<ViewAccount />} />
      

     
      </Routes>
      
     
    </>
  );
}

export default App;

