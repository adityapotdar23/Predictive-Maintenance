import React, { useState } from 'react';

const Feedback = () => {
    // State to store the user feedback message
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make an API call to save the feedback message
        try {
            const response = await fetch('http://localhost:8000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: feedbackMessage })
            });

            if (response.ok) {
                // Feedback saved successfully
                console.log('Feedback saved successfully');
            } else {
                // Error saving feedback
                console.error('Error saving feedback:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving feedback:', error.message);
        }
    };

    // Function to handle input change
    const handleChange = (event) => {
        setFeedbackMessage(event.target.value);
    };

    return (
        <div className="flex justify-center items-center ">
            
            <form onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center ">Feedback</h1>
                <div class="mb-6 mt-12 flex justify-center items-center">

                    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={feedbackMessage} onChange={handleChange} />
                </div>

                <br />
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center" onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    );
};

export default Feedback;
