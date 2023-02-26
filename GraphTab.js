import {CheckBoxGroup,Tab, Box, Button, Menu } from 'grommet'
import Graph from "./components/Graph";
import {useState} from 'react'
// try check boxes to find key values
// use reducer for graph functions?  useeffect for api calls
// grommet wrapper for graph
            // props: {graph}


//  useReducer for key point checkbox?
const GraphTab = ({index}) => {
    const [checked, setChecked] = useState([])
    const checkOptions = ['IP-1', 'IP-2', 'FWHM', 'Tr']

  
    const onCheck = (e) => {
      setChecked( e.value)
    }
  return (
    <Tab title='Test #' >
                <Box background='white' 
                      flex='grow' 
                      direction='column' 
                      
                      margin={'none'}
                      responsive='true'
                      
                      >
                        {index}
                    <Graph />
                    {checked}
                   <CheckBoxGroup
                      direction='row'
                      options={checkOptions}
                      //onChange={ (value,options) => setChecked(value)}
                      onChange={onCheck}
                      value={checked}
                      alignSelf='center'
                   />

                  
                      
                </Box>
            </Tab>
  )
}

export default GraphTab
