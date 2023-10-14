import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import carReducer from './Card/CarSlice'

const rootreducer = combineReducers({
    carReducer : carReducer
})

export const store = configureStore({
    reducer : rootreducer
})