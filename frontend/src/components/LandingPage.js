import React from 'react';
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="bg-gray-100 font-sans">

      {/* Navigation */}
      <nav className="bg-blue-500 p-4 text-white w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">AI Kavach</div>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>            
            <li><Link to="/login" className="hover:text-gray-300">Sign In </Link></li>
            <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
          </ul>
        </div>
      </nav>

     
      <div className="bg-blue-500 text-white text-center p-6 ">
  <h1 className="text-4xl font-bold mb-4">Predictive Machine Maintenance for Jet Engine</h1>
  <p className="text-xl mb-8">Utilize AI to prevent downtime and optimize maintenance schedules.</p>
  <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded"><Link to="/register" className="hover:text-gray-300">Get Started</Link></button>
</div>
<div className="py-12">
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Feature 1 */}
    <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Real-Time Monitoring</h2>
      <p>Monitor Jet engine systems in real-time to detect issues before they escalate.</p>
    </div>
    {/* Feature 2 */}
    <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Predictive Analysis</h2>
      <p>Our AI algorithms predict failures and suggest the optimal maintenance schedule.</p>
    </div>
    {/* Feature 3 */}
    <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Cost Reduction</h2>
      <p>Reduce maintenance costs by preventing unnecessary repairs and downtime.</p>
    </div>
  </div>
</div>
<div className="py-6 bg-gray-100">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-center font-bold text-2xl mb-4">The Power of AI in Maintenance</h2>
    <p>
      By harnessing the power of AI and predictive modeling, our app analyzes data from your jet engine systems to forecast potential issues, ensuring that maintenance can be conducted just in time to prevent failures. This proactive approach guarantees the longevity of your equipment and minimizes downtime.
    </p>
  </div>
</div>


     
      

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-2 fixed bottom-0 left-0 w-full">
        <p>&copy; 2024 AI Kavach . All rights reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
