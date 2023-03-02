import React from 'react'
import {Box, FileInput, DropButton, Menu, Button} from 'grommet'



const Toolbar = ( {state,functions} ) => {
    // deconstructing passed function from parent 
    const {dispatch, handleFiles, onSubmitRaw} = functions
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
        dropContent={
            <Box  >
               <FileInput
                    name='file' 
                    onChange={({target: {files}}) => handleFiles({target: {files}})}
                    multiple={{max: 20 }} />
                <Button secondary  
                    margin='xsmall' 
                    label='Convert' 
                    onClick={(e) => onSubmitRaw(e)} 
                    />
            </Box>
            
        
        }
        />
     <Menu
        label='Graph'
        primary
        margin='small'
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


/*
<FileInput
                    name='file' 
                    onChange={({target: {files}}) => handleFiles(files)}
                    multiple={{max: 20 }} />
*/