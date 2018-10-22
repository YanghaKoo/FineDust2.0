import { createAction, handleActions } from "redux-actions";
import { pender } from 'redux-pender'
import axios from 'axios'

function getDustApi(){
  return axios.get('https://api.myjson.com/bins/19pe4o')
}

const GET_DUST = 'GET_DUST'

export const getDust = createAction(GET_DUST, getDustApi)

const initialState ={
  infos : []
}

// 2개를 매개변수로 받으니까 action.payload에 객체로 (lat,lng 가진) 넘겨줘야 겠네
export default handleActions({
  ...pender({
    type : GET_DUST,
    onSuccess : (state,action) =>{
      return {
        infos : action.payload.data
      }
    }
  })
},initialState);