import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <div className="text-center ">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-6xl font-semibold text-gray-600 mb-4">Page Not Found</p>
        <p className="text-4xl text-gray-500 mt-2 mb-4">The page you are looking for does not exist.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
