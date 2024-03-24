import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profile from '../images/profile.png'
import LeaderBoard from './LeaderBoard';
import Feedback from './Feedback';

const ProfilePage = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem("email")
    const type=localStorage.getItem("type")
    console.log(email," type is: ",type)
    const logout = () => {
        localStorage.removeItem("token");
localStorage.removeItem("type");
        navigate("/");
    };

    const getUserData = async () => {
        try {

            const response = await fetch(`http://localhost:8000/${email}/getUserData`);

            if (response.ok) {
                const result = await response.json();
                

            }


        }
        catch (err) {
            console.log("error in get,", err);
        }
    }


    


    useEffect(() => {
        getUserData();
        

    }, [])
    // console.log("selected users", languageUsers)

    
  




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
                        {}
                        <li><button onClick={logout} className="hover:text-gray-300 text-lg">Logout</button></li>
                    </ul>
                </div>
            </nav>
            <h1 className="text-center font-bold text-5xl mt-10 mb-10">Welcome to profile page</h1>

            <div className="flex justify-center">
                <div className="border-solid border-2 border-black p-3 rounded-lg m-10">
                    <img src={profile} alt="profile img" width="200" height="200" style={{
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }} />
                </div>

                <div className="border-solid border-2 border-black p-4 m-10 flex flex-col gap-10">
                    <h1 className="text-3xl font-bold">Email:{email}</h1>
                    <h1 className="text-3xl font-bold">Type:{type}</h1>
                    
                </div>
            </div>
            <Feedback/>


            

        </>
    )
}

export default ProfilePage