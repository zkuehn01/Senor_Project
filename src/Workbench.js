import {useState, useEffect, useReducer} from 'react'
import {Box, Tabs} from 'grommet'
//import axios from 'axios'
import GraphTab from './GraphTab'
import Toolbar from './Toolbar'
import reducer  from './reducer.js'



/*=======================================================
   
Workbench is the component that provides the user interface for this application.

Children:  
  Toolbar: mass file upload, graph selection/deselection, overlays, exports
  Tabs:  collection of rendered graphs represented by the GraphTab.  
    GraphTab:  individual, rendered graph from distinct test result file.
      -user can click check buttons to highlight key data points (IPs, FWHM,etc)
===================================================================*/

/*
Issues:
-------
-Need to ensure user supplied files are properly stored in state
-make sure axios properly transmits loaded files

*/

// initial state for reducer
const initialState = {
  // array to hold user-loaded files from file input
  rawFiles: [], // empty this when graphData is received
  // array for extracted from each distinct graph
  //graphData: [],
  //array to hold static graph renders
  //graphs: [],
  // array of 'selected' graphs. ordered/identified by tab index
  //selectedGraphs: [],
  // flag that signals useEffect axios post request to send raw data
  submit: false, 
 // error: '',


}

const Workbench = () => {
    // holds index of active tab
    const [index, setIndex] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState)
    
    // submit rawFiles
    const onSubmitRaw = (e) => {
      
      e.preventDefault()
      dispatch({type: 'submit-raw' })
    }

    // raw file handling
    const handleFiles = (e, {files}) => {
      dispatch({
        type: 'handle-files',
        payload: e.dataTramsfer.files
          })
    }
    const tool_functions = { dispatch, onSubmitRaw, handleFiles}
    
    // post request to backend
    useEffect( () => {
    // axios goes here 
    // detect onclick of convert button which only useeffect, which triggers axios
      console.log( `${state.rawFiles} is submitted`)
      /*axios 
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
        */
        dispatch({type: 'reset-submit'})
    }, [state.submit])
   
    // index tracker
    const onActive = (nextIndex) => setIndex(nextIndex);
  
    return (
    <Box
        background='white'
        responsive='true'
        >
        <Toolbar state={state} functions={tool_functions} />
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