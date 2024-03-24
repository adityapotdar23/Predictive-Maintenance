import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import namaste from './images/namaste.png'
import { Link } from "react-router-dom";
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType]=useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleType=(e)=>{
      setType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the /register API endpoint
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    type:type
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Save the token (assuming the token is returned in the response)
                const token = data.token;

                // Save the token in local storage or state as needed
                localStorage.setItem('token', token);
                localStorage.setItem("email",email);
                localStorage.setItem("type",type);
                // Redirect to the Dashboard component
                navigate("/dashboard");
                console.log('Registration successful!');
                // You can handle success actions here, e.g., redirect the user to another page
            } else {
                console.error('Registration failed.');
                // Handle failure, show an error message, etc.
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={namaste}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-md font-bold  leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-bold leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="type" className="block text-md font-bold leading-6 text-gray-900">
                  Type
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="type"
                  name="Type"
                  type="text"
                  autoComplete="current-password"
                  required
                  value={type}
                  onChange={handleType}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>

            

            <div>
              <button
                
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <div className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            <Link to="/login">Log in</Link>
            </div>
          </p>
        </div>
      </div>
    );
}

export default Register