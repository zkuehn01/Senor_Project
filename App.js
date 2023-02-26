import Navbar from "./components/layout/NavBar"
import Graph from "./components/Graph";
import {Grommet,Box, Tabs,Tab ,ResponsiveContext} from 'grommet'
import Toolbar from './Toolbar'
import Workbench from './Workbench'
import theme from './theme'



/*
  App
    navbar: navigation for main content, tutorial, about us
    workbench- main content, main work area
      toolbar: top bar with global user operations
          -open file(s), export file(s), overlay selected files
      
       graphtab: holds individual test,
                
      
        

*/
function App() {
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        { size => (
          <div className="App">
          <Navbar title="Senior Project" subtitle="CDM Raw Data Conversion"/>
          
          <Workbench/>
          </div>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default App;

/*
design questions
---------------
-should overlay be a sub menu in the graph Menu?
-What can go into navbar, besides a brand/logo for our product?
    -link to a tutorial, link to about us?

issues
-------
-graph doesnt return to original size when main window is resized

          */