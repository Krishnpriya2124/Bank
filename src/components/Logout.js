import React from "react";



import "bootstrap/dist/css/bootstrap.min.css";



function Logout()

{  localStorage.clear();
    window.location.href = '/';

    


}
export default Logout;