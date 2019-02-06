// combinesReducer()를 할 곳
// import { combineReducers } from 'redux'
// import latlng from './latlng'
// import input from './input'
// import parks from './parks'
// import dustInfo from './dustInfo'
// import { penderReducer } from 'redux-pender'

// export default combineReducers({
//   latlng, 
//   input, 
//   parks,
//   dustInfo,
//   pender : penderReducer,
// })



export {default as dustInfo} from './dustInfo'
export {default as input} from './input'
export {default as latlng} from './latlng'
export {default as parks} from './parks'

export {penderReducer as pender} from 'redux-pender'