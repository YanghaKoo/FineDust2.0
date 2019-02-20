import { createAction, handleActions } from "redux-actions";
import {pender} from 'redux-pender'
import axios from 'axios'

function getParkAPI(){
  return axios.get('https://api.myjson.com/bins/l9qow')
}

function getUserInputParkAPI(){
 //return axios.get('https://api.myjson.com/bins/1epxx6')
 return axios.get('http://35.243.87.74/app01/start_app/data_user_park')
}


const GET_PARK = 'GET_PARK'
const GET_USERINPUT_PARK = 'GET_USERINPUT_PARK'

export const getPark = createAction(GET_PARK, getParkAPI)
export const getUserInputPark = createAction(GET_USERINPUT_PARK, getUserInputParkAPI)

const initialState ={
  parks : [],
  userInputParks : []
}

// 2개를 매개변수로 받으니까 action.payload에 객체로 (lat,lng 가진) 넘겨줘야 겠네
export default handleActions({
  ...pender({
    type : GET_PARK,
    onSuccess : (state,action) =>{
      return {
        ...state,
        parks : action.payload.data
      }
    }
  }),
  ...pender({
    type : GET_USERINPUT_PARK,
    onSuccess : (state, action) => {
      return {
        ...state,
        userInputParks : action.payload.data
      }
    }
  })
},initialState);
