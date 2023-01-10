import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { secureGet } from '../HttpService/APIService'

export default function CustomerOrderHistory() {

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        secureGet('/shop/orders')
            .then((response) => { console.log(response); setOrderList(response.data.results) })
    }, [])

    // console.log(orderList);


    return (
        <div>

            <div className='border d-flex flex-column gap-3
            '>

                {orderList.map((element, index) => {
                    return <div key={index}>
                        {/* {element} */}
                        <div className='border '>
                            <div>
                                {/* {element.items.map} */}
                            </div>
                            <h6>delivery fee : {element.deliveryFee}</h6>
                            <h6>total amount : {element.total}</h6>
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}
