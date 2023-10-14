import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../Store'
import { changeImgErrtotrue, editCar, setisediting, setvertype, toContactFunc } from '../Store/Card/CarSlice'
import { changeImgErrtofalse } from '../Store/Card/CarSlice'
import { createcarCard } from '../Store/Card/card.thunks'
import { toCarInfo } from '../Store/Card/CarSlice'
import * as ismail from "ismail"
import { setCarInfo } from '../Store/Card/CarSlice'
import { finishedForm } from '../Store/Card/CarSlice'
import { useNavigate } from 'react-router'
import { removecarInfo } from '../Store/Card/CarSlice'

function Form() {
    const price = useRef()
    const model = useRef()
    const mileaege = useRef()
    const description = useRef()
    const manufactured = useRef()
    const transmisionType = useRef()
    const driveType = useRef()
    const FuelType = useRef()
    const EngineSize = useRef()
    const brend = useRef()
    const imgRef = useRef('')
    const[rangeprice, setprice] = useState(0)
    const [err, seterr] = useState(false)
    const [isdone, setisdone] = useState(false)
    const [pirceerr, setpriceerr] = useState(false)
    const [modelerr, setmodelerr] = useState(false)
    const [mileaegeerr, setmileaegeerr] = useState(false)
    const [descerr, setdescerr] = useState(false)
    const [brenderr, setbrenderr] = useState(false)
    const [manufaqturederr, setmanufaqturederr] = useState(false)
    const [imgerr, setimgerr] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isediting = useSelector(state => state.carReducer.isEditing)
    const carRn = useSelector((state) => state.carReducer.carInfo?.id)


    const selector = useSelector((state) => state.carReducer.imgError)
    const modelRedux = useSelector((state) => state.carReducer?.carInfo?.model)
    const mileageRedux = useSelector((state) => state.carReducer?.carInfo?.mileaege)
    const manufacturedRedux = useSelector((state) => state.carReducer?.carInfo?.manufactured)
    const descRedux = useSelector((state) => state.carReducer?.carInfo?.desc)
    const priceRedux = useSelector((state) => state.carReducer?.carInfo?.price)
    const transTypeRedux = useSelector((state) => state.carReducer?.carInfo?.transmisionType)
    const DriveTypeRedux = useSelector((state) => state.carReducer?.carInfo?.driveType)
    const FuelTypeRedux = useSelector((state) => state.carReducer?.carInfo?.FuelType)
    const EngineSizeRedux = useSelector((state) => state.carReducer?.carInfo?.EngineSize)
    const imgRedux  = useSelector((state) => state.carReducer?.carInfo?.img)
    const brendRedux = useSelector((state) => state.carReducer?.carInfo?.brend)
    const vertype = useSelector((state) => state.carReducer.vertype)


    const rangechange = useCallback(() => {
      setprice(price.current.value)
    })

    const putimg = () => {
      setisdone(true)
    }

    const closeinput = () =>{
      dispatch(setisediting())
      navigate('/')
      dispatch(removecarInfo())
    }

    console.log(isediting)
    const submit = (e) => {
      e.preventDefault()
      if (rangeprice == 0 || model.current.value == '' || mileaege.current.value == '' || description.current.value == '' || isdone == false || manufactured.current.value == '' || brend.current.value == "") 
      {
        if(rangeprice == 0){
          setpriceerr(true)
        }
        else{
          setpriceerr(false)
        }

        if(model.current.value == ''){
          setmodelerr(true)
        }
        else{
          setmodelerr(false)
        }

        if(mileaege.current.value == ''){
          setmileaegeerr(true)
        }
        else{
          setmileaegeerr(false)
        }

        if(description.current.value == ''){
          setdescerr(true)
        }
        else{
          setdescerr(false)
        }
        
        if(manufactured.current.value == ''){
          setmanufaqturederr(true)
        }
        else{
          setmanufaqturederr(false)
        }


        if(brend.current.value == ''){
          setbrenderr(true)
        }else{
          setbrenderr(false)
        }

        
        if(isdone !== true) {
          setimgerr(true)
          return window.alert('fill img ulr')
        }else{
          setimgerr(false)
        }

          
         if(imgRef.current.value == "" ){
          dispatch(changeImgErrtotrue())
          return window.alert('enter img url')
         }else{
          dispatch(changeImgErrtofalse())
          setimgerr(false)
         }

        return window.alert('fill every input')
      }

      if(imgRef.current.value == "" ){
        dispatch(changeImgErrtotrue())
        return window.alert('enter img url')
       }else{
        dispatch(changeImgErrtofalse())
        setimgerr(false)
       }


      dispatch(changeImgErrtofalse())

      if(isNaN(Number(mileaege.current.value)) == true){
        return window.alert('mileage Should Be Number')
      }
      const CarInformation = {
        model : model.current.value,
        mileaege : mileaege.current.value,
        manufactured : manufactured.current.value,
        desc : description.current.value,
        price : price.current.value,
        transmisionType : transmisionType.current.value,
        driveType : driveType.current.value,
        FuelType : FuelType.current.value,
        EngineSize: EngineSize.current.value,
        img : imgRef.current.value,
        brend: brend.current.value,
        id : vertype == 'edit' ? carRn : Math.floor(Math.random() * 2000000000),
        favorite : false
      }

      if(vertype == 'edit'){
        dispatch(editCar(CarInformation))
        dispatch(setisediting())
        return navigate('/see_more')
      }

      dispatch(setvertype())
      dispatch(createcarCard(CarInformation))
      seterr(false)
      dispatch(toContactFunc())
      dispatch(setCarInfo(CarInformation))

    }

    const ClearInfo = () => {
      dispatch(setvertype(''))
      dispatch(removecarInfo())
      setisdone(false)
      price.current.value = 0
      setprice(0)
      model.current.value = ''
      mileaege.current.value = '' 
      description.current.value = '' 
      manufactured.current.value = undefined
      brend.current.value = ""
    }
    useEffect(() => {
      priceRedux ? setprice(priceRedux) : ""
      vertype == 'edit' ? setisdone(true) : ""

    },[])
  return (
    <div className='fill_form' id={err ? "errored_fill" : ""}>
      <div className='image_part'>
      <div className="image_fills" id={selector || imgerr ? "err_image_fill" : ""}>
        <div className="main_image_form" >
          {isdone ?  
          <input 
          type='text'
          ref={imgRef}
          id='imginput'
          placeholder='img url'
          defaultValue={imgRedux}
          /> 
          : 
          <h2 onClick={() => putimg()} id='img_drop_txt'>Enter image url <i className="fa-solid fa-hand-point-left"></i></h2>
          }
        </div>
      </div>
      <div className="side_image_form">
        <div className="up_sel">
        <label htmlFor="transmissionType">Select Transmission Type:</label>
            <select id="transmissionType" name="transmissionType" ref={transmisionType} defaultValue={transTypeRedux}> 
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semiautomatic">Semi-Automatic</option>
              <option value="cvt">CVT</option>
            </select>


            <label htmlFor="fuelType">Select Fuel Type:</label>
            <select id="fuelType" name="fuelType" ref={FuelType} defaultValue={FuelTypeRedux}>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
        </div>
        <div className="down_sel">
        <label htmlFor="driveType">Select Drive Type:</label>
            <select id="driveType" name="driveType" ref={driveType} defaultValue={DriveTypeRedux}>
              <option value="front-wheel-drive">Front-Wheel Drive</option>
              <option value="rear-wheel-drive">Rear-Wheel Drive</option>
              <option value="all-wheel-drive">All-Wheel Drive</option>
            </select>

            <label htmlFor="engineSize">Select Engine Size:</label>
            <select id="engineSize" name="engineSize" ref={EngineSize} defaultValue={EngineSizeRedux}>
              <option value="2.0L">2.0L</option>
              <option value="2.5L">2.5L</option>
              <option value="3.0L">3.0L</option>
              <option value="3.0Lmore">3.0L and higher</option>
            </select>
        </div>
     
        </div>
      </div>
      
      <div className="text_fill" onSubmit={(e) => submit(e)}>

          <div id='car_detail_form'>
          <label htmlFor="">Choose Brend</label>
      <select ref={brend} className={brenderr ? "errbrend" : "brend"} defaultValue={brendRedux}>
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
    <br />
            <label>Enter Model</label>
            <input 
            id={modelerr ? "errmodel" : "inftxt"}
            type="text" 
            ref={model}
            defaultValue={modelRedux}
            />
            <br />
            <label>Enter year manufactured</label>
            <input 
              id={manufaqturederr ? "errmanufactured" : "inftxt"}
              type="month" 
              ref={manufactured}
              defaultValue={manufacturedRedux}
            />
            <br />
            <label>Enter Mileaege</label>
            <input 
              id={mileaegeerr ? "errmileaege" : "inftxt"}
              type="text" 
              ref={mileaege} 
              defaultValue={mileageRedux}
              />
            <br />
            <br />
            <label>Description</label>
            <br />
            <textarea 
              id={descerr ? "errdesc" : "desc_input"}
              rows="4" 
              cols="50" 
              ref={description}
              defaultValue={descRedux}
            ></textarea>
            <br />
              <br />
            <label htmlFor="">Enter Price</label>
            <input id={pirceerr ? "errprice" : "price_input"}  type="range" max="1000000" step="1000" ref={price} defaultValue={priceRedux} onChange={() => rangechange()}/>
            <h1 style={{marginTop : '20px', color : "rgb(33, 33, 33)"}}>{priceRedux == rangeprice ? priceRedux : rangeprice}$</h1>
            <br />
            <div className="tbn_from_flex" style={{display : 'flex' , gap : '30px'}}>
              {isediting ? 
              <>
                <button onClick={(e) => submit(e)}>Edit</button>
                <button onClick={() => closeinput()}>Close</button>
              </> : 
              <>
                <button onClick={(e) => submit(e)}>Next</button>
                <button onClick={() => ClearInfo()}>Clear</button>
              </>
              }

            </div>
          </div>
      </div>
    </div>
  )
}

export default Form

export const ContactInfo = () => {
  const dispatch = useDispatch()
  const username = useRef()
  const mail = useRef()
  const pas1 = useRef()
  const pas2 = useRef()
  const BirthDay = useRef()
  const male = useRef()
  const female = useRef()

  const carInfo = useSelector((state) => state.carReducer.carInfo)

  const [usererr, setusererr] = useState(false)
  const [mailerr, setmailerr] = useState(false)
  const [pas1err, setpas1err] = useState(false)
  const [pas2err, setpas2err] = useState(false)
  const [birtherr, setbirtherr] = useState(false)
  const[gender, setgen] = useState('gen')

  const submit = () => {

    if(username.current.value == '' || mail.current.value == '' || pas1.current.value == '' || pas2.current.value == '' || BirthDay.current.value == '' ) {
      if(username.current.value == '') {
        setusererr(true)
      }else{
         setusererr(false)
      }
  
      if(mail.current.value == '') {
         setmailerr(true)
      }
      else{
        setmailerr(false)
      }
  
      if(pas1.current.value == '') {
        setpas1err(true)
      }
      else{
        setpas1err(false)
      }
  
      if(pas2.current.value == '') {
        setpas2err(true)
      }
      else{
         setpas2err(false)
      }
  
      if(BirthDay.current.value == '') {
        setbirtherr(true)
      }
      else{
         setbirtherr(false)
      }
      
      if(female.current.checked) {
        setgen('female')
      }else if(male.current.checked){
        setgen('male')
    } else{
      setgen('errgender')
      return window.alert('enter Gender')
    }
      return window.alert('fill every Input')
    }

    if(female.current.checked) {
      setgen('female')
    }else if(male.current.checked){
      setgen('male')
  } else{
    setgen('errgender')
    return window.alert('enter Gender')
  }

      if(username.current.value !== '' ){
        setusererr(false)
      }
      if(mail.current.value !== '' ){
        setmailerr(false)
      }
      if(BirthDay.current.value !== '' ){
        setbirtherr(false)
      }
        if(pas1.current.value !== pas2.current.value) {
          setpas1err(true)
          setpas2err(true)
          return window.alert('password doesnot mach eachother')
        }
        else{
          setpas1err(false)
          setpas2err(false)
        }
      if(ismail(mail.current.value).valid == false){
        setmailerr(true)
        return window.alert('Enter Valid email')
      }
    const userInfo = {
      carInformation : {
        carInfo
      },
      userInformation : {
        username : username.current.value,
        email : mail.current.value,
        password : pas2.current.value,
        birtDate : BirthDay.current.value,
        gender : female.current.checked ? 'female' : 'male'
      }
    }

    dispatch(finishedForm(userInfo))
  }

  const EditInfo = () => {
    dispatch(toCarInfo())
  }

  return (
    <div className='contact_fill'>
      <div className="contact_header">
        <h2><i className="fa-solid fa-arrow-left" onClick={() => EditInfo()}></i> Create Contact Information For This Product</h2>
      </div>
      <div className="contact_form_inputes">
        <label id={usererr ? "err_uss_label" : ""} htmlFor="">Enter your Username</label>
        <input id={usererr ? "err_uss_input" : ""} type="text" ref={username}/>
        <br />
        <label id={mailerr ? "err_uss_label" : ""} htmlFor="">Enter your email</label>
        <input id={mailerr ? "err_uss_input" : ""} type="email" ref={mail} />
        <br />
        <label id={pas1err ? "err_uss_label" : ""} htmlFor="">Enter your Password</label>
        <input id={pas1err ? "err_uss_input" : ""} type="password" ref={pas1}/>
        <br />
        <label id={pas2err ? "err_uss_label" : ""} htmlFor="">Repeat your Password</label>
        <input id={pas2err ? "err_uss_input" : ""} type="password" ref={pas2}/>
        <br />
        <label  id={birtherr ? "err_uss_label" : ""}htmlFor="">Enter your BirthDay</label>
        <input  id={birtherr? "err_uss_input" : ""}type="date" ref={BirthDay}/>
        <br />
        <div className="gender_inpt">
          <label  id={gender == 'errgender' ? "err_uss_label" : ""} htmlFor="male">Male</label>
          <input type="radio" name="gender" value="male" ref={male}/>

          <label  id={gender == 'errgender' ? "err_uss_label" : ""} htmlFor="female">Female</label>
          <input type="radio" name="gender" value="female" ref={female}></input>
        </div>
        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  )
}

export const SuccesedForm = () => {
  const navigate = useNavigate()
  const nav = () => {
    navigate('/')
  }
  return (
    <div className='Finished_form'>
      <h1>You Created Your Product <i className="fa-solid fa-circle-check"></i></h1>
      <button onClick={() => nav()} id='MainButton_Link'>Main Page</button>
    </div>
  )
}