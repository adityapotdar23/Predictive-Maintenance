import React,{useEffect,useState} from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import axios from 'axios';
import correlation from '../images/correlation_heatmap.png'

const RULChart = () => {

  const [sensordata, setSensordata] = useState([0, 0.18373494, 0.406801831, 0.309756921, 0, 1, 0.726247987, 0.242424242,
    0.109755003, 0, 0.369047619, 0.63326226, 0.205882353, 0.199607803, 0.363986149,
    0, 0.333333333, 0, 0, 0.713178295, 0.724661696, 0.770833333])

    const [rul, setRul] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request
        const response = await axios.get('http://localhost:5000/predict');
        // Handle the response data
        const new_data=response.data.s_data;
        console.log("new data is: ",new_data)
        setSensordata(new_data);
        setRul(response.data.rul);
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.4,
      },
      
    ],
  };
  
  const options = {
    title: {
      display: true,
      text: 'Live updation of data',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col mt-4" >
        
        <div className="p-2 bg-white rounded shadow" style={{ height: '550px', width: '700px' }}>
          <Line data={data} options={options} />
        </div>
        <div className='text-3xl font-bold'>The RUL is: {rul}</div>
        {/* <div>The s_data is: {sensordata}</div> */}
      </div>
      
    </>
  );

}

export default RULChart;