import { createAction, handleActions } from "redux-actions";
import { pender } from 'redux-pender'
import axios from 'axios'

function getDustApi(){
  return axios.get('https://api.myjson.com/bins/uzlba')
}

function getDaysBeforeDustApi(){
  return axios.get("https://api.myjson.com/bins/e4ako")
}

const GET_DUST = 'GET_DUST'
const GET_BEFORE_DUST = 'GET_BEFORE_DUST'

export const getDust = createAction(GET_DUST, getDustApi)
export const getBeforeDust = createAction(GET_BEFORE_DUST, getDaysBeforeDustApi)

const initialState ={
  infos : [],
  beforeInfos : []
}

// 2개를 매개변수로 받으니까 action.payload에 객체로 (lat,lng 가진) 넘겨줘야 겠네
export default handleActions({
  ...pender({
    type : GET_DUST,
    onSuccess : (state,action) =>{
      return {
        ...state,
        infos : action.payload.data
      }
    }
  }),
  ...pender({
    type : GET_BEFORE_DUST,
    onSuccess : (state, action) => {
      return {
        ...state,
        beforeInfos : action.payload.data
      }
    }
  })
},initialState);