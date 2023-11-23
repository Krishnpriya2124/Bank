
import { Link } from 'react-router-dom'
import Customerlist from "./Customerlist";
const StaffNavBar = () => {
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
                <Link to="/approvallist">Approval list</Link>
             </li>
             <li>
                <Link to="/transactionhistory">transactions</Link>
             </li>
             <li>
                <Link to="/logout">Logout</Link>
             </li>
          </ul>
          
    </nav>
    );
   };
   
   export default StaffNavBar;