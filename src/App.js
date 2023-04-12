import React, { useState } from 'react';
import NavBar from './components/layout/NavBar';
import Graph from './components/Graph';
import SidePanel from './components/layout/SidePanel';
import './App.css';

function App() {
  const [fetchedData, setFetchedData] = useState(null);

  return (
    <div className="App">
      <NavBar title="Senior Project" />
      <div className="main-container">
        <div className="graph-container">
          <Graph onDataFetched={setFetchedData} />
        </div>
        <SidePanel data={fetchedData} />
      </div>
    </div>
  );
}

export default App;
