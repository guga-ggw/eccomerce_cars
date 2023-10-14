import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Components/Card'

function MyCardPage() {

  const boughtItems = useSelector((state) => state.carReducer.boughtcars)
  return (
    <div className='Store_page'>
      <div className="categories">
          <h1>Categories</h1>
          <div className="categorie_list">
            <h2>Favorites</h2>
            <h2></h2>
          </div>
      </div>
      <div className="boughtList">
        <h1 id='inventory_txt'>Your inventory</h1>
        <div className="inventory_list">
          {boughtItems?.map((item) => (
            <Card full = {item} brend = {item.carInformation.carInfo.brend} id={item.carInformation.carInfo.id} model={item.carInformation.carInfo.model} 
            isFavorite = {item.carInformation?.isFavorite} price = {item.carInformation.carInfo.price} type = {item.carInformation.carInfo.driveType} description = {item.carInformation.carInfo.desc} img = {item.carInformation.carInfo.img} permisions = {false}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCardPage