import { createSlice } from "@reduxjs/toolkit";
import { getCarInfo } from "./card.thunks";
import { createcarCard } from "./card.thunks";

const initialState = {
    carList: [],
    loading: false,
    error: null, 
    imgError : false,
    toContact : false,
    toFinished : false,
    carInfo : null,
    mainPageanimation : true,
    currentcar: [],
    boughtcars : [],
    verification : false,
    vertype : '',
    isEditing : false
};

const carSlice = createSlice({
    name: "CarSlice",
    initialState,
    reducers: {
        changeMainPageanimation : (state) => {
            state.mainPageanimation = false
        },
        changeImgErrtotrue: (state) => {
            state.imgError = true
        },
        changeImgErrtofalse: (state) => {
            state.imgError = false
        },
        toContactFunc: (state) => {
            state.toContact = true
        },
        toCarInfo: (state) => {
            state.toContact = false
        },
        setCarInfo : (state, action) => {
            state.carInfo = action.payload
        },
        finishedForm : (state, action) => {
            state.toContact = false
            state.toFinished = true
            state.carInfo = null
            state.carList.push(action.payload)
        },
        finishedFormdisapere : (state) => {
            state.toFinished = false
        },
        removecarInfo : (state) => {
            state.carInfo = null
        },
        setcurrentcar: (state, action) => {
            const car = state.carList.find((item) => item.carInformation.carInfo.id === action.payload);
            if (car) {
                state.currentcar = [car];
            } else {
                state.currentcar = [];
            }
        },
        boughtitem: (state, action) => {
            console.log(action.payload)
            const { carInformation } = action.payload;
            state.boughtcars.push(action.payload);
            state.carList = state.carList.filter((item) => item.carInformation.carInfo.id !== carInformation.carInfo.id);
        },
        setverification : (state) => {
            state.verification = !state.verification
        },
        setvertype : (state, action) => {
            state.vertype = action.payload
        },
        removeCar : (state, action) => {
            state.carList = state.carList.filter((item) => item.carInformation.carInfo.id !== action.payload);
        },
        setisediting : (state) => {
            state.isEditing = !state.isEditing
        },
        editCar: (state, action) => {
            const editedCarInfo = action.payload; 
            const carIndex = state.carList.findIndex(
              (car) => car.carInformation.carInfo.id === editedCarInfo.id
            );
      
            if (carIndex !== -1) {
              state.carList[carIndex] = {
                ...state.carList[carIndex],
                carInformation: {
                  ...state.carList[carIndex].carInformation,
                  carInfo: editedCarInfo,
                },
              };
            }
          },
          removefrominventory: (state, action) => {
            const { carInformation } = action.payload;
      
            state.carList.push(action.payload);
      
            state.boughtcars = state.boughtcars.filter(
              (item) => item.carInformation.carInfo.id !== carInformation.carInfo.id
            );
          },
          setFavorite: (state, action) => {
            const carId = action.payload;
            const car = state.boughtcars.find((item) => item.carInformation.carInfo.id === carId);
      
            if (car) {
              car.carInformation.isFavorite = !car.carInformation.isFavorite;
            }
          },
    },
    extraReducers :{
        [getCarInfo.pending.type]:(state) =>{
            state.loading = true
        },
        [getCarInfo.fulfilled.type]:(state, action) =>{
            state.loading = false
            state.error = false
            console.log('helo')
            state.todoList = action.payload.items
        },
        [getCarInfo.rejected.type]:(state, action) =>{
            console.log(action.payload)
            state.loading = false
            state.error = true
        },
        [createcarCard.pending.type]:(state) =>{
            state.loading = true
        },
        [createcarCard.fulfilled.type]:(state, action) =>{
            state.loading = false
            state.error = false
            console.log('helo')
        },
        [createcarCard.rejected.type]:(state, action) =>{
            
            state.loading = false
            state.error = true
        },

    }
});

export const {addimage, changeImgErrtotrue, setvertype, changeImgErrtofalse, setFavorite, removefrominventory, toContactFunc, setisediting, editCar, toCarInfo, setverification, setCarInfo, boughtitem, removeImg, finishedForm, finishedFormdisapere, delInfo, removecarInfo, changeMainPageanimation, setcurrentcar, removeCar} = carSlice.actions
export default carSlice.reducer;