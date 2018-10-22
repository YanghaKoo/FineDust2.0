// combinesReducer()를 할 곳
import { combineReducers } from 'redux'
import latlng from './latlng'
import input from './input'
import parks from './parks'
import dustInfo from './dustInfo'
import { penderReducer } from 'redux-pender'

export default combineReducers({
  latlng, 
  input, 
  parks,
  dustInfo,
  pender : penderReducer,
})