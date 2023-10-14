import React from 'react'
import Form, { ContactInfo, SuccesedForm } from '../Components/Form'
import { useSelector } from 'react-redux'

function CreatePage() {
  const toContact = useSelector((state) => state.carReducer.toContact)
  const toFinished = useSelector((state) => state.carReducer.toFinished)
  return (
    <div className='CreatePage'>
       {toFinished ? <SuccesedForm/> : toContact ? <ContactInfo/> : <Form/>}
    </div>
  )
}

export default CreatePage