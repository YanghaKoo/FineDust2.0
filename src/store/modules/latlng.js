import { createAction, handleActions } from "redux-actions";

const CHANGE = "latlng/CHANGE";
const SCALE = "latlng/SCALE";
const NOWGU = "latlng/NOWGU";

export const change = createAction(CHANGE);
export const scale = createAction(SCALE);
export const changeNowGu = createAction(NOWGU);

// { type : "latlng/CHANGE"}

// 제주도
const initialState = {
  lat : 0,
  lng : 0,
  nowGu : null
};

// 2개를 매개변수로 받으니까 action.payload에 객체로 (lat,lng 가진) 넘겨줘야 겠네
export default handleActions(
  {
    // change매소드는 객체 {lat : x, lng : y}를 인자로 받아야됨
    
    // change 필요없겠다 ... 8/19
    [change]: (state, action) => {
      console.log(action.payload.lat + "change");
      return { lat: action.payload.lat, lng: action.payload.lng };
    },
    // 이거 별 필요없는듯
    [scale]: (state, action) => {
      //console.log(action.payload + "scale");
      return { ...state, mapLevel: action.payload };
    },
    [changeNowGu] : (state, action) => {
      //console.log("리덕스부분", action.payload)
      return { ...state, nowGu : action.payload }

    }
  },
  initialState
);
