import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { boughtitem, setverification } from '../Store/Card/CarSlice'

function CardInfoPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const currentItem = useSelector((state) => state.carReducer.currentcar[0])
    const dispath = useDispatch()
    const [bought, setbought] = useState(false)

    const buyitem = () => {
        setbought(true)
        dispath(boughtitem(currentItem))

    }

    const nav = () => {
        navigate('/my_card')
    }
    
  return (
    <div className="focused_card" style={{overflow : "hidden"}}>
        <div className="carInformation_container">
            <div className="Main_carInfo">
                <div className="year_model_txt">
                    <h1>{currentItem.carInformation.carInfo.brend} {currentItem.carInformation.carInfo.model}</h1>
                    <h4>{currentItem.carInformation.carInfo.manufactured}</h4>
                    <h2 id='carprice'>{currentItem.carInformation.carInfo.price}$</h2>
                </div>
                {currentItem.carInformation.carInfo?.img && (
                <img
                    src={currentItem.carInformation.carInfo?.img}
                    alt=""
                    onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                        'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
                    }}
                />
                )}
            </div>
            <div className="More_carInfo">
                <div className="description_formCard">
                    <h2>Description : </h2>
                    <p>{currentItem.carInformation.carInfo.desc}</p>
                </div>
                <div className="moreInfo_formCard">
                    <div className="moreInfo_labels">
                        <h4>mileage</h4>
                        <h4>Fuel type</h4>
                        <h4>Drive type</h4>
                        <h4>Engine size</h4>
                    </div>
                    <div className="moreInfo_information">
                        <h4>{currentItem.carInformation.carInfo.mileaege}</h4>
                        <h4>{currentItem.carInformation.carInfo.FuelType}</h4>
                        <h4>{currentItem.carInformation.carInfo.driveType}</h4>
                        <h4>{currentItem.carInformation.carInfo.EngineSize}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div className="userInformation_container">
            <div className="userInformation">
                <div className="userInfo">
                <img src="https://marathonpigeons.com/pigeon-fanciers/images/no-user-image.png" alt="" />
                    <div className='mailgen'>        
                    <h2>{currentItem.userInformation.email}</h2>
                    <h4>{currentItem.userInformation.gender}</h4>
                    </div>
                </div>

                <label htmlFor="">{`buy for ${currentItem.carInformation.carInfo.price}$`}</label>
                <button onClick={() => buyitem()}>Buy</button>

                
            </div>
        </div>
        {bought &&      
            <>
                <div className='overlay'></div>
                <div className="bought_frame">
                    <h1>bought {currentItem.carInformation.carInfo.brend} {currentItem.carInformation.carInfo.model}</h1>
                    <button onClick={() => nav()}>See bought Product</button>
                </div>
            </>       
                } 
    </div>
  )
}

export default CardInfoPage