import Navbar from "./components/layout/NavBar"
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
    <Navbar title="Senior Project" subtitle="CDM Raw Data Conversion"/>
    <main id="content" className="container">
      <Graph/>
    </main>
</div>
  );
}

export default App;
