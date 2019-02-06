// make store
// import {createStore, applyMiddleware} from 'redux'
// import modules from "./modules"
// import penderMiddleware from 'redux-pender'

// // 미들웨어를 여기다가 처리
// const configure = () =>{
//   const store = createStore(modules, applyMiddleware(penderMiddleware()) )
  
//   return store
// }


// export default configure



import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import penderMiddleware from 'redux-pender'
import * as modules from './modules'

const reducers = combineReducers(modules)
const middleWares = [penderMiddleware()]

const isDev = process.env.NODE_ENV === 'development'
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer = devtools || compose

const configure = () => createStore(reducers, composeEnhancer(applyMiddleware(...middleWares)))
export default configure