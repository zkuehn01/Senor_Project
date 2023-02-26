import React from 'react'
import {Box, FileInput, Tip,Text, DropButton, Menu, Button} from 'grommet'

// {file handle statefunction}
const Toolbar = ( {functions} ) => {

    const {handleFiles, onSubmitRaw} = functions
  return (
    <Box
        //margin='small'
        direction='row-responsive'
        alignContent='center'
        background='microMaroon'
        gap='small'
        
    >
    
    <DropButton 
        label='File'
        primary 
        margin='small'
        //color='black'
        dropContent={
            <Box  >
                <FileInput
                name='file' 
                onChange={(e, {files}) => handleFiles(e,{files})}
                multiple={{max: 20 }} />
                <Button secondary  
                    margin='xsmall' 
                    label='Convert' 
                    onClick={onSubmitRaw} 
                    />
            </Box>
            
        
        }
        />
     <Menu
        label='Graph'
        primary
        margin='small'
       // color='black'
        items={[
                { label: 'Select graph', onClick: () => {} },
                { label: 'Unselect graph', onClick: () => {} },
                { label: 'Download graph', onClick: () => {} },
                ]}
        />
    <Menu
        label='Overlay'
        primary
        margin='small'
       
        items={[
            { label: 'All', onClick: () => {} },
            { label: 'Test 1', onClick: () => {} },
            { label: 'Test 2', onClick: () => {} },
            { label: 'Test 3', onClick: () => {} },
            { label: 'Test 4', onClick: () => {} },
        ]}
        />
        
    <Menu
        label='Export as'
        primary
        margin='small'
       
        items={[
            { label: 'CSV', onClick: () => {} },
            { label: 'Image', onClick: () => {} },
            { label: 'Raw', onClick: () => {} },
        ]}
        />

    
    
   
        
    </Box>
  )
}

export default Toolbar
