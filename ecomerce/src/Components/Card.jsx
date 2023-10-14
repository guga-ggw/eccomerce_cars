import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { removefrominventory, setFavorite, setcurrentcar, setverification, setvertype } from '../Store/Card/CarSlice'

function Card({full, id, model, price, type, description, img, brend, permision, isFavorite}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cardClick = () => {
        dispatch(setcurrentcar(id))
        navigate(`/item/${id}`)
    }

    const editCard = () => {
        dispatch(setcurrentcar(id))
        dispatch(setverification())
        dispatch(setvertype('edit'))
    }

    const removeCard = () => {
        dispatch(setcurrentcar(id))
        dispatch(setverification())
        dispatch(setvertype('remove'))
    }

    const backtopage = () => {
        dispatch(removefrominventory(full))
    }

    const favorite = () => {
        dispatch(setFavorite(id))
    }
    
    
  return (
    <div className='Card'>
        <div className="card_img_box">
            <h1 className='card_car_type'>{type}</h1>
            <h1 className="card_car_price">{price}$</h1>
            <img src={typeof(img) == 'string' && img.startsWith('h') ? img : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"}/>
        </div>
        <div className="car_info_box">
            <div className="Car_model">
                <h1>{brend} {model}</h1>
            </div>
            <div className="card_description">
                <p>{description}</p>
            </div>
            {permision ?    
            <>
            <button onClick={() => cardClick()}>More details</button>
            <i onClick={() => editCard()} id='edit_icon' className="fa-solid fa-pen-to-square"></i>
            <i onClick={() => removeCard()} id='remove_icon' className="fa-solid fa-trash"></i>
            </>
            : 
            (
                <>
                <button onClick={() => backtopage()}>Delete from inventory</button>
                <i onClick={() => favorite()} id={isFavorite ? "favorited" :'favorite'} className="fa-solid fa-star"></i>
                </>

            )
            }

        </div>
    </div>
  )
}

export default Card