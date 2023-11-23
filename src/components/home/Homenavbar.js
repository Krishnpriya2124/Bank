
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
    <nav>
          <ul>
             <li>
                <Link to="/login">Login</Link>
             </li>
             <li>
                <Link to="/signup">Registration</Link>
             </li>
             <li>
                <Link to="/about">About</Link>
             </li>
         
          </ul>
          
    </nav>
    );
   };
   
   export default NavBar;