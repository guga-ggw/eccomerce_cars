import React, { lazy, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card'
import { changeImgErrtofalse, finishedFormdisapere, removeCar, setCarInfo, setcurrentcar, setisediting, setverification, setvertype } from '../Store/Card/CarSlice'
import { useNavigate } from 'react-router'

function SeeMorePage() {
  const carData = useSelector((state) => state.carReducer.carList)
  const verification = useSelector(state => state.carReducer.verification)
  const vertype = useSelector((state) => state.carReducer.vertype)
  const currentitem = useSelector((state) => state.carReducer.currentcar[0])
  const password = useRef()
  const email = useRef()
  const checkbox = useRef()
  const [emailerr, setemailerr] = useState(false)
  const [passerr, setpasserr] = useState(false)
  const[brendfilter, setbrendfilter] = useState('')
  const [pricefilter, setpircefilter] = useState(0)
  const[transdilter, settranstype] = useState('')
  const [drivetype, setdrivetype] = useState('')
  const [fuelType, setfueltype] = useState('')
  const [enginetype, setenginetype] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeImgErrtofalse())
    dispatch(finishedFormdisapere())
    dispatch(setvertype(''))
    dispatch(setCarInfo(null))
  },[])

  const close = (param) => {
    dispatch(setverification())
    dispatch(setcurrentcar(null))
    setemailerr(false)
    setpasserr(false)
    email.current.value = ''
    password.current.value = ''
  }
  


  const submit = () => {

    if(email.current.value == 0 || password.current.value == 0){
        if(email.current.value == 0) setemailerr(true)
        else setemailerr(false)

        if(password.current.value == 0) setpasserr(true)
        else setpasserr(false)

        return window.alert('fill forms')
    }
    console.log(vertype)
    if(vertype == 'remove'){
    if(checkbox.current.checked !== true){
      return window.alert('you forgot to check')
    }
  }
    if(currentitem.userInformation.email !== email.current.value || currentitem.userInformation.password !== password.current.value){
      setemailerr(true)
      setpasserr(true)
      console.log(currentitem)
      return window.alert('email or password doesnot mach')
    }

    if(vertype == 'remove') dispatch(removeCar(currentitem.carInformation.carInfo.id))
    if(vertype == 'edit'){
      dispatch(setCarInfo(currentitem.carInformation.carInfo))
      navigate('/create')
      dispatch(setisediting())
    } 
    setemailerr(false)
    setpasserr(false)
    close('done')
  }
  return (
    <div className='store_cars'>

      {verification ? 
      <div className='overlay_verification'>
        <div className="verification_box">
          <i onClick={() => close()} className="fa-solid fa-xmark"></i>
          {vertype == 'edit' ? <h1>Do you want to Edit this Card?</h1> :<h1>Do you want to remove this Card?</h1>}
          <div className="verification_form" >
            <div>
              <label htmlFor="" id ={emailerr ? "erremailauthlabel" : ""}>Enter email</label>            
              <input 
              type="email"
              ref={email}
              id ={emailerr ? "erremailauth" : ""}
               />
            </div>
            <div>         
              <label htmlFor="" id ={passerr ? "erremailauthlabel" : ""}>Enter password</label>   
              <input 
              id ={passerr ? "errpasauth" : ""}
              type="password" 
              name="" 
              ref={password}
              />
            </div>

          </div>
            {vertype == 'remove' && 
            <>
            <label htmlFor="">do you want to delete</label>
            <input 
            type="checkbox" 
            name="" 
            id="checkbox_remove"
            ref={checkbox}

             />
            </> 
            }
            <br />
          <button onClick={() => submit()}>Submit</button>
        </div>
      </div> : 
      ""
      }
      <div className="filter_container">
          <div>
            <label htmlFor="">Choose Brend</label>
            <select className= "brend" onChange={(e) => setbrendfilter(e.target.value)}>
            <option value="" ></option>
              <option value="acura">Acura</option>
              <option value="alfa-romeo">Alfa Romeo</option>
              <option value="aston-martin">Aston Martin</option>
              <option value="audi">Audi</option>
              <option value="bentley">Bentley</option>
              <option value="bmw">BMW</option>
              <option value="buick">Buick</option>
              <option value="cadillac">Cadillac</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="chrysler">Chrysler</option>
              <option value="dodge">Dodge</option>
              <option value="ferrari">Ferrari</option>
              <option value="fiat">FIAT</option>
              <option value="ford">Ford</option>
              <option value="genesis">Genesis</option>
              <option value="gmc">GMC</option>
              <option value="honda">Honda</option>
              <option value="hyundai">Hyundai</option>
              <option value="infiniti">Infiniti</option>
              <option value="jaguar">Jaguar</option>
              <option value="jeep">Jeep</option>
              <option value="kia">Kia</option>
              <option value="lamborghini">Lamborghini</option>
              <option value="land-rover">Land Rover</option>
              <option value="lexus">Lexus</option>
              <option value="lincoln">Lincoln</option>
              <option value="lotus">Lotus</option>
              <option value="maserati">Maserati</option>
              <option value="mazda">Mazda</option>
              <option value="mclaren">McLaren</option>
              <option value="mercedes-benz">Mercedes-Benz</option>
              <option value="mini">MINI</option>
              <option value="mitsubishi">Mitsubishi</option>
              <option value="nissan">Nissan</option>
              <option value="porsche">Porsche</option>
              <option value="ram">RAM</option>
              <option value="rolls-royce">Rolls-Royce</option>
              <option value="subaru">Subaru</option>
              <option value="tesla">Tesla</option>
              <option value="toyota">Toyota</option>
              <option value="volkswagen">Volkswagen</option>
              <option value="volvo">Volvo</option>
          </select>
          </div>
          <div>
            <label htmlFor="price_input">maximum Price</label>
          <input id= "price_input" type="range" max="1000000" step="1000" onChange={(e) => setpircefilter(e.target.value)}/>
            <h2>{pricefilter}</h2>
          </div>
          <div id='more_filter_opt'>
          <div className="up_sel">
        <label htmlFor="transmissionType">Select Transmission Type:</label>
            <select id="transmissionType" name="transmissionType" onChange={(e) => settranstype(e.target.value)}> 
              <option value=""></option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semiautomatic">Semi-Automatic</option>
              <option value="cvt">CVT</option>
            </select>


            <label htmlFor="fuelType">Select Fuel Type:</label>
            <select id="fuelType" name="fuelType" onChange={(e) => setfueltype(e.target.value)}>
              <option value=""></option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
        </div>
        <div className="down_sel">
        <label htmlFor="driveType">Select Drive Type:</label>
            <select id="driveType" name="driveType" onChange={(e) => setdrivetype(e.target.value)}>
              <option value=""></option>
              <option value="front-wheel-drive">Front-Wheel Drive</option>
              <option value="rear-wheel-drive">Rear-Wheel Drive</option>
              <option value="all-wheel-drive">All-Wheel Drive</option>
            </select>

            <label htmlFor="engineSize">Select Engine Size:</label>
            <select id="engineSize" name="engineSize"onChange={(e) => setenginetype(e.target.value)} >
            <option value=""></option>
              <option value="2.0L">2.0L</option>
              <option value="2.5L">2.5L</option>
              <option value="3.0L">3.0L</option>
              <option value="3.0Lmore">3.0L and higher</option>
            </select>
        </div>
          </div>
      </div>
      <h1 id='list_header'>Recomended Cars</h1>
      <div className='items_car_container'>
            {carData?.filter((item) => {
              if (brendfilter === '') {
                return true
              } else {
                return item.carInformation.carInfo.brend === brendfilter
              }
            }).filter((item) => {
              if (pricefilter === 0) {
                return true
              } else {
                return item.carInformation.carInfo.price <= Number(pricefilter)
              }
            }).filter((item) => {
              if (transdilter === '') {
                return true
              } else {
                return item.carInformation.carInfo.transmisionType === transdilter
              }
            }).filter((item) => {
              if (drivetype === '') {
                return true
              } else {
                return item.carInformation.carInfo.driveType === drivetype
              }
            }).filter((item) => {
              if (fuelType === '') {
                return true
              } else {
                return item.carInformation.carInfo.FuelType === fuelType
              }
            }).filter((item) => {
              if (enginetype === '') {
                return true
              } else {
                return item.carInformation.carInfo.EngineSize === enginetype
              }
            }).map((item) => (
            <>
            <Card brend = {item.carInformation.carInfo.brend} id={item.carInformation.carInfo.id} model={item.carInformation.carInfo.model} 
              price = {item.carInformation.carInfo.price} type = {item.carInformation.carInfo.driveType} description = {item.carInformation.carInfo.desc} img = {item.carInformation.carInfo.img} permision={true}/>
            </>
          ))}
      </div>
    </div>
  )
}

export default SeeMorePage