import React, { useState } from 'react';
import NavBar from './components/layout/NavBar';
import Parse from './components/Parse';
import Graph from './components/Graph';
import SidePanel from './components/layout/SidePanel';
import Legend from './components/layout/Legend';
import './App.css';

function App() {
  const [waveformPoints, setWaveformPoints] = useState([]);

  const handlePointsParsed = (points) => {
    setWaveformPoints(points);
  };

  return (
    <div className="App">
      <NavBar title="Senior Project" />
      <div className="main-container">
        <SidePanel data={waveformPoints} />
        <div className="graph-container">
          <Graph points={waveformPoints} />
        </div>
        <div className='Legend'>
            <Legend />
        </div>
      
      </div>
      <Parse onPointsParsed={handlePointsParsed} />
    </div>
  );
}

export default App;
