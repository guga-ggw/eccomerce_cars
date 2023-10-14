import React, { useEffect } from 'react'
import { createcarCard, getCarInfo,  } from '../Store/Card/card.thunks'
import {useDispatch, useSelector} from 'react-redux'
import { changeImgErrtofalse, changeMainPageanimation, delInfo, finishedFormdisapere, toCarInfo } from '../Store/Card/CarSlice'
import Card from '../Components/Card'
import { useNavigate } from 'react-router'




function MainPgae() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const animation = useSelector((state) => state.carReducer.mainPageanimation)
  const isediting = useSelector(state => state.carReducer.isEditing)
  
  useEffect(() => {
    dispatch(getCarInfo())
    dispatch(changeImgErrtofalse())
    isediting !==true ?     dispatch(finishedFormdisapere()) : ""
    setTimeout(() => {
      dispatch(changeMainPageanimation())
    }, 4000)

  },[])
  
  
  console.log(animation)
  return (
    <div className='Main_Container' id={animation ? 'animated_MainPage' : ""}>
      <div className="right_part">
        <img src="https://assets.fastly.carvana.io/home-assets/nba/mustang.png" alt="" />
      </div>
      <h1 onClick={() => navigate('/create')} id='create_product_txt'>Create Your Product <i className="fa-solid fa-caret-right"></i></h1>
      <h1 onClick={() => navigate('/see_more')} id='look_product_txt'>Look other Product <i className="fa-solid fa-caret-right"></i></h1>
    </div>
  )
}

export default MainPgae