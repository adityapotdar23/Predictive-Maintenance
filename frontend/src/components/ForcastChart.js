import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import 'chart.js/auto'
import axios from 'axios';








const ForcastChart = () => {

  const [sensordata, setSensordata] = useState([0, 0.18373494, 0.406801831, 0.309756921, 0, 1, 0.726247987, 0.242424242,
    0.109755003, 0, 0.369047619, 0.63326226, 0.205882353, 0.199607803, 0.363986149,
    0, 0.333333333, 0, 0, 0.713178295, 0.724661696, 0.770833333])

  const [rul, setRul] = useState(0);
  const [rlabels, setRlabels] = useState([0])
  const [counter, setCounter] = useState(0)
  const [xaxis, setXaxis] = useState([0])
  const [maxy, setmaxy] = useState(100)
  let maxY = 0;

  // Define the threshold
  const threshold = 40; // Adjust the threshold as needed

  // Determine the color based on the threshold and the maximum value
  const [alertText, setalertText] = useState('')
  const [linecolor, setlinecolor] = useState('green')
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // Make the GET request
        const response = await axios.get('http://localhost:5000/predict');
        // Handle the response data
        // const newx=response.data.time;
        // console.log("time is:",newx );
        // const prevaxis=xaxis;
        // prevaxis.append(newx);
        // setXaxis(prevaxis);
        setCounter(response.data.time);
      setXaxis(prevXaxis => [...prevXaxis, response.data.time + 1]);
      console.log(xaxis,"and cnt is: ",counter);
        const new_data = response.data.s_data;
        console.log("new data is: ", new_data)
        setSensordata(new_data);
        const rull = response.data.rul;
        if(rull<20){
          alert("Schedule maintenence 5")
        }
         
        setmaxy(Math.max(maxy,response.data.rul));
        // if(maxy<40){
        //   setlinecolor('red');
        // }
        // else{
        //   setlinecolor('green');
        // }
        const temp = rlabels;
        temp.push(rull)
        setRlabels(temp);
        
        setRul(rull);
        console.log(response.data);

      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData initially
    fetchData();
    
    // Set up the interval to call fetchData every 10 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);
  
  const data = {
    labels: ["sensor_1", "sensor_2", "sensor_3", "sensor_4", "sensor_5", "sensor_6", "sensor_7", "sensor_8", "sensor_9", "sensor_10", "sensor_11", "sensor_12", "sensor_13", "sensor_14", "sensor_15", "sensor_16", "sensor_17", "sensor_18", "sensor_19", "sensor_20", "sensor_21"],
    datasets: [
      {
        label: 'Sensor data',
        data: sensordata,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'blue',
        borderWidth: 4,
        lineTension: 0.4,
      },

    ],
  };

  const data1 = {
    labels: xaxis,
    datasets: [
      {
        label: 'RUL plot',
        data: rlabels,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: maxy<60? 'red':'green',
        borderWidth: 4,
        lineTension: 0.4, 
      },
      

    ],
  };
 

  const options = {
    annotations: {
      line1: {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 40, // Y-coordinate where the line will be drawn
        borderColor: 'red', // Color of the line
        borderWidth: 2 // Width of the line
      }
    },
    maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
     // Set the maximum width of the chart
    responsive: true ,// Allow the chart to be responsive
    title: {
      display: true,
      text: 'Live updation of data',
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true // Start the y-axis from zero
        },
        gridLines: {
          color: (context) => {
            // Change the grid line color for a specific value (e.g., 40)
            return context.tick.value === 40 ? 'red' : 'rgba(0, 0, 0, 0.1)'; // Red color for 40, default color for others
          }
        }
      }]
    }
  };
  const containerStyle = {
    minWidth: '700px' ,// Adjust the max width as needed
    minHeight: '560px' ,// Adjust the max height as needed
  };
  
  return (
    <>
      <div className="flex justify-center items-center">

        <div className="flex justify-between items-center flex-col mt-4 " >
          <div className="font-bold text-3xl text-center">Live sensor data</div>
          <div className="p-2 bg-white rounded shadow " style={containerStyle} >
            <Line data={data} options={options} />
          </div>
          {/* <div className='text-3xl font-bold'>The RUL is: {rul}</div> */}
          {/* <div>The s_data is: {sensordata}</div> */}
        </div>

        <div className="flex justify-center items-center flex-col mt-4" >
          <div className="font-bold text-3xl text-center">RUL</div>
          <div className="p-2 bg-white rounded shadow" style={containerStyle}>
            <Line data={data1} options={options} ticks={[0, 25, 50, 75, 100]}/>
            
          </div>
           <div className='text-3xl font-bold'>The RUL is: {rul} cycles</div>
          
          
        </div>
      </div>
    </>
  );

}

export default ForcastChart;