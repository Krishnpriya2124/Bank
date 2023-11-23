
import { Link } from 'react-router-dom'
import './Navbar.css'
const CustomerNavBar = () => {
    return (
    <nav>
          <ul>
             <li>
                <Link to="/">Home</Link>
             </li>
             <li>
                <Link to="/transactions">transaction History</Link>
             </li>
             <li>
                <Link to="/deposit">deposit</Link>
             </li>
             <li>
                <Link to="/withdraw">withdraw</Link>
             </li>
             <li>
                <Link to="/createaccount">Createaccount</Link>
             </li>
       
              <li>
                <Link to="/viewaccount">accountdetails</Link>
             </li> 
             <li>
                <Link to="/logout">Logout</Link>
             </li>

          </ul>
          
    </nav>
    );
   };
   
   export default CustomerNavBar;