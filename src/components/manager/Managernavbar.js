
import { Link } from 'react-router-dom'
import React from 'react';

const ManagerNavBar = () => {
    return (
    <nav>
          <ul>
             <li>
                <Link to="/">Home</Link>
             </li>
             <li>
                <Link to="/customerlist">customerlist</Link>
             </li>
             <li>
                <Link to="/stafflist">staff list</Link>
             </li>
             <li>
                <Link to="/logout">Logout</Link>
             </li>
             
          </ul>
          
    </nav>
    );
   };
   
   export default ManagerNavBar;