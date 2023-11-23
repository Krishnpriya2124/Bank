import { Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './Homenavbar';

import Login from '../authentication/Login';
import Signup from '../authentication/SignUp';


const Home = () => {
    return (
        <>
        <NavBar/>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />


           </Routes>
           </>
     


);
}
export default Home;