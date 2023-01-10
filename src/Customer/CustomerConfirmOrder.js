import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import creditCardImg from '../components/images/creditCard.jpg'
import getToken from '../HttpService/LocalStorageService';

export default function CustomerConfirmOrder() {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios.put('/shop/orders/confirm/:orderId', data, {
      headers: {
        'Authorization': `Bearer ${getToken('activeCustomerToken')}`
      }
    }).then((response)=>{console.log(response)})
    .catch((error)=>{console.log(error)})

  }

  return (
    <div className='d-flex justify-content-center w-100 '>
      {/* <h1>customer confirm order</h1> */}

      <div className='w-50 vh-100'
      // style={{backgroundImage:`url(${creditCardImg})`, WebkitFilter:'blur(1px)'}}
      >

        <div className='w-50 '
          // style={{filter:'blur(10px)', zIndex:'-1',  position:'absolute'}}
          style={{ zIndex: '-1', position: 'absolute', filter: 'blur(10px)', height: '50vh' }}
        >

          <img src={creditCardImg}
            className='w-100 h-100'
          // style={{objectFit:'cover'}}
          />
        </div>

        <div className='w-100 px-2 py-3'
          style={{ height: '50vh' }}>
          <form className=' d-flex flex-column px-5 py-3 align-items-center gap-3 w-100 h-100 justify-content-between'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input className='border-1 border-light w-100 bg-transparent text-light ' placeholder='name on card' type='text' {...register('nameOnCard')} />
            <input className='border-1 border-1 border-light rounded-1 w-100 bg-transparent text-light' placeholder='card number' type='text' {...register('cardNumber')} />
            <div className='d-flex gap-2  w-100  justify-content-between'>

              <input className='border-1 w-50 border-1 border-light rounded-1 bg-transparent text-light' placeholder='mm/yyyy' type='text' {...register('expiry')} />
              <input className='border-1 w-50 border-1 border-light rounded-1 bg-transparent text-light' placeholder='cvv' type='text' {...register('cvv')} />
            </div>
            <button className='border-1 rounded-1 px-4 py-1' type='submit'>Submit</button>
          </form>
        </div>

      </div>
    </div>
  )
}
