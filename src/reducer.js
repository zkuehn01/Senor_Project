import axios from 'axios'


 const reducer = (state, action) => {
  switch(action.type) {
      case 'handle-files':
            return{ ...state, rawFiles: [...state, action.payload.files]}
      case 'submit-raw':
          return {...state, submit: true}
      //process-good :  dispatched wn post request succeeds, return { graphData: [...state, action.payload]}
      //select-graph:
      //deselect-graph:
  }
    }
    
// functions passed to toolbar


  // replace with dispatch({type: 'submit-raw})
  /*e.preventDefault()
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
        */
export default reducer



