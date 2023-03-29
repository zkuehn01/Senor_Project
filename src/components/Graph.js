import React, { useEffect, useRef, useState } from "react";
import {Chart} from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { positiveData } from "./PositiveData";
import { negativeData } from "./NegativeData";

Chart.register(zoomPlugin);

/*
This function parseWaveform, is taking a string rawWaveForm as input. The function will use a regualar expression .match() 
which extracts the data points in the rawWaveForm. It is taking this string and extracting the _x and _y time and voltage values 
of each data point. 
The values are then pushed into two seperate arrays (timeStamp & voltages).
The function then returns an object that contains both arrays as properties. 
*/
const parseWaveform = (rawWaveForm) => {
  let timeStamps = [];
  let voltages = [];
  rawWaveForm.match(/dp x="(.*?)" y="(.*?)"/g).forEach((dp) => {
    let timeStamp = parseFloat(dp.match(/dp x="(.*?)"/)[1]);
    let voltage = parseFloat(dp.match(/y="(.*?)"/)[1]);
    timeStamps.push(timeStamp);
    voltages.push(voltage);
  });
  return { timeStamps, voltages };
};

/*
Down below the first constant invokes the parseWaveform function with positive data and breaks down the objects into two variables.
The second constant is doing the same thing but with negativeData
This below extracts the time and voltage data from two seperate wabeform data sources
*/
const { timeStamps: positiveTimeStamps, voltages: positiveVoltages } = parseWaveform(positiveData);
const { timeStamps: negativeTimeStamps, voltages: negativeVoltages } = parseWaveform(negativeData);

/*
Here we are constructing our graph that defines the data positiveVoltages & negativeVoltages.
using chart.js libraries and documentation we can see how the layout of the graph is designed.
*/

//Milestones (**Desired SW Tool Features**)
/*
Waveform Plot both positive and negative pulse**
Zoom in and out**
Overlay 1 or more waveforms**
  Single or Batch processing
  Export function (Image, Raw data in excel, CSV, summary of IP1 or IP2 or all Data Points, etc. )
Customizable background color waveform plot color.**
Cursor hover over waveform points with data pop up.**
GUI Interface**
  Intuitive Function
  Y axis should auto scale from 500mA to 40 Amps?
  X axis should auto scale from 10nS to 50nS?
Waveform Plot both positive and negative pulse**
Zoom in and out**
Overlay 1 or more waveforms**

*/
const chartConfig = {
  type: "line",
  data: {
    labels: positiveTimeStamps.concat(negativeTimeStamps),
    datasets: [
      {
        label: "Positive Voltage",
        data: positiveVoltages,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1
      },
      {
        label: "Negative Voltage",
        data: negativeVoltages,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1
      }
    ]
  },
  options: {

    title: {
      display: true,
      text: "World Wine Production 2018"
     },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time (nS)"
          },
          ticks: {
            min: 10,
            max: 50,
            stepSize: 10
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Current (Amps)"
          },
          ticks: {
            min: 0.5,
            max: 40,
            stepSize: 5
          }
        }
      ]
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          mode: "x",
          speed: 100
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.5
        }
      }
    }
  }
};


//Create a function component Chartt that makes use of the react hooks useRef and useEffect
//useRef creates a reference to the html element which is our chartContainer variable
//useState sets up the variable chartInstance & setChartInstance function to update the values. we will set this to null
const Chartt = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

//useEffect is used to run an effect after the component is rendered for the first time
//we will leave the destroy empty like this [], so we dont destroy the instance when starting the application
//chartContainer.current will create the new instance when starting the application
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
      
    }
    return () => {
      chartInstance?.destroy();
    };
  }, []);

  return (
    <div style={{margin: "50px 0"}}>
      <canvas ref={chartContainer} />
     
    </div>
  );
  
};

export default Chartt;