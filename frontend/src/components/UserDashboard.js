import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ForcastChart from './ForcastChart.js';

const UserDashboard = () => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true)
  const logout = () => {
    localStorage.removeItem("token");
localStorage.removeItem("type");
    navigate("/");
  };

  const type=localStorage.getItem("type")








  return (
    <>


      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Kavach</div>
          <ul className="flex space-x-4">

            
            <li><Link to="/dashboard" className="hover:text-gray-300 text-lg">Home</Link></li>
            {type=="Manager" && (<li><Link to="/calender" className='hover:text-gray-300 text-lg'>Calender</Link></li>)}
            
            <li><Link to="/reports" className='hover:text-gray-300 text-lg'>Reports</Link></li>
            <li><Link to="/profile" className="hover:text-gray-300 text-lg">Profile</Link></li>
            
            <li><button onClick={logout} className="hover:text-gray-300 text-lg">Logout</button></li>
          </ul>
        </div>
      </nav>



      {/* <div classname="flex justify-center items-center flex-row">
        <div>

          <div className="font-bold text-3xl text-center">Live sensor data</div>
          <ForcastChart />
        </div>  

        <div>

          <div className="font-bold text-3xl text-center">Live sensor data</div>
          <ForcastChart />
        </div>

      </div> */}

      <ForcastChart/>




    </>
  )
}


export default UserDashboard