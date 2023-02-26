import {useState, useEffect, useReducer} from 'react'
import {Button, Box, FileInput, Tabs, Text} from 'grommet'
//import axios from 'axios'
import Graph from "./components/Graph";
import GraphTab from './GraphTab'
import Toolbar from './Toolbar'
import reducer  from './reducer.js'

// store loaded graphs in array.  
// select by array index for overlays
// maybe allow dnd array sorting/display
// add 

/*=======================================================
/
/   adding files and clicking convert cauess app to disappear
/       search 'usereducer file upload'
/
*/

const initialState = {
  // incoming raw test result files
  rawFiles: [], // empty this when graphData is received
  // extracted data to construct graph
  //graphData: [],
  //graphs = saved renders
  //graphs: [],
  // tab order maps to graph's index on selected array
  //selectedGraphs: [],
  submit: false, 
 // error: '',


}


const Workbench = () => {
    // holds index of active tab
    const [index, setIndex] = useState(0)
    const [state, dispatch] = useReducer(initialState, reducer)
    
    const onSubmitRaw = (e) => {
      // submit
      dispatch({type: 'submit-raw' })
    }

    const handleFiles = (e, {files}) => {
      dispatch({
        type: 'handle-files',
        payload: e.target.files
          })
    }
    const tool_functions = { onSubmitRaw, handleFiles}
    
    /*useEffect( () => {
    // axios goes here 
    // detect onclick of convert button which only useeffect, which triggers axios
      console.log(`${state.rawFiles} is submitted`)
      axios 
      .post(`/process`,state.rawFiles)
      .then( (res) => {
        console.log(res)
        console.log(res.data)
        dispatch({type: 'process-good', payload: res.data})
        })
      .catch( (error) => {
        console.log(error)
        dispatch({ type: 'submit-fail', error: error })
        })
    }, [])*/
   

    const onActive = (nextIndex) => setIndex(nextIndex);
  
    return (
    <Box
        background='white'
        responsive='true'
        >
          
          
          
        <Toolbar functions={tool_functions} />
    
        
        <Tabs
            justify='start'
            activeIndex={index}
            onActive={onActive}
            >
            
           <GraphTab index={index}/>
           
           <GraphTab index={index}/>
           <GraphTab index={index}/>
           <GraphTab index={index}/>

            

            
            
          </Tabs>
    </Box>
  )
}

export default Workbench

/*
  functions
  ---------
  
  select graph
  deselect graph
  overlay selected graph
  overlay all selected


  file upload (render graph)
  export as: image


  progress
  --------
  basic layout design
  files loaded by user are properly stored, ready for api call
*/