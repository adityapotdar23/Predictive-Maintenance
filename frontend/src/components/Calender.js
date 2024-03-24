import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import ForcastChart from './ForcastChart.js';

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const month = 2; // April (months are 0-indexed)
const year = 2024;
const days = Array.from({ length: daysInMonth(year, month + 1) }, (_, i) => i + 1);




const Calendar = () => {
    const navigate = useNavigate();
    const updateUserReminders = async (email, updatedReminders) => {
        try {
          // Make a POST request to your API endpoint
          const response = await axios.post('http://localhost:8000/updateUserReminders', {
            email,
            reminders: reminders
          });
      
          // Check if the update was successful
          if (response.status === 200) {
            // Update the local storage item named 'rem' with the new reminders data
            localStorage.setItem('rem', JSON.stringify(reminders));
            console.log('Reminders updated successfully.');
          } else {
            console.error('Failed to update reminders.');
          }
        } catch (error) {
          console.error('Error updating reminders:', error);
        }
      };
      const type=localStorage.getItem("type")
    const [expanded, setExpanded] = useState(true)
    const logout = () => {

        localStorage.removeItem("token");
localStorage.removeItem("type");
        navigate("/");
    };
    const [reminders, setReminders] = useState(() => {
        // Load reminders from localStorage or initialize to an empty object
        const storedReminders = localStorage.getItem('reminders');
        return storedReminders ? JSON.parse(storedReminders) : {};
    });
    const handleDayClick = (day) => {
        const reminder = prompt(`Set reminder for March ${day}, 2024:`);
        if (reminder) {
            setReminders({ ...reminders, [day]: reminder });
        }
    };
    useEffect(() => {
        // Update localStorage whenever reminders change
        const email=localStorage.getItem('email');
        updateUserReminders(email, JSON.stringify(reminders));
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]);

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
            <div className="text-5xl">
                <b style={{ 'marginLeft': '150px' }}>March 2024</b>
            </div>

            <div className="grid grid-cols-7 gap-4 p-4" style={{ 'marginLeft': '150px', 'marginRight': '150px' }}>
                {days.map((day) => (
                    <div key={day} className="border-4 border-blue-500 p-4 flex flex-col" style={{ 'borderStyle': 'double' }}>
                        <button onClick={() => handleDayClick(day)} className="text-lg font-bold">
                            {day}
                        </button>
                        <div className="mt-2 text-sm">{reminders[day]}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Calendar;
