/*

solutions:

    1. export these functions to respective 
    export these functions, which are used to attatch event listeners
    and set up the referenced inputs inside of useEffect().

*/

const submitRawFiles = (e) => {
    e.preventDefault()
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
}