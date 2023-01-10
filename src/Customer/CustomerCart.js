import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buyProducts, decNumber, deleteFromCart, incNumber } from "../Redux/Actions/action";
import { BiRupee } from 'react-icons/bi'
import { secureGet } from "../HttpService/APIService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CustomerCart() {
  // const cartArr = useSelector((state) =>{ console.log(state);});
  const cartArr = useSelector((state) => state.dataAddedToCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var total_Amount = 0;

  const createPayload = (products = cartArr) => {
    let payload = {};
    let amount = 0;

    payload.items = products.map(item => {
      amount += item.totalPrice;

      return ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
        subTotal: item.totalPrice,
        images: item.images
      })
    })

    payload.deliveryFee = 0;
    payload.total = amount;

    dispatch(buyProducts(payload));
    navigate('/order');
  }

  const currentCartData =
    cartArr &&
    cartArr.map((element, index) => {

      { total_Amount += element.totalPrice }
      return (
        <div className="d-flex rounded-1  bg-light" key={index}  >

          <div className="d-flex justify-content-between w-100 p-2  rounded-3"
            style={{ boxShadow: '5px 5px 5px #929292' }}
          >
            {/* {console.log(element)} */}

            <div className="d-flex">

              {/* cart images  */}
              <div
                className=" d-flex justify-content-center"
                style={{ width: "250px", height: '250px' }}
              >
                <Carousel className=" h-100 w-100 d-flex justify-content-center align-items-center">
                  {element.images.map((items, i) => {
                    return (
                      <Carousel.Item key={i} >
                        <img className=" h-75 w-75 " src={items.url} alt="" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>

              {/* cart description */}
              <div className="p-2 d-flex flex-column justify-content-between">
                <h4><u>{element.name}</u></h4>
                <p><b>Description : </b>{element.description}</p>

                {/* add quantity butoons */}
                <div className="d-flex  align-items-center justify-content-start gap-1">

                  <Button onClick={() => { dispatch(decNumber(element._id)) }}>-</Button>
                  <p className="m-0">{element.quantity} </p>
                  <Button onClick={() => dispatch(incNumber(element))}> + </Button>
                </div>

                {/* delete from cartbutton */}
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(deleteFromCart(element._id))}
                  >delete from cart</Button>

                  <Button
                    variant="outline-success"
                    onClick={() => {

                      if (secureGet('/customers/address').then((response) => { })) {
                        createPayload([{
                          productId: element._id,
                          name: element.name,
                          price: element.price,
                          quantity: element.quantity,
                          totalPrice: element.totalPrice,
                          images: element.images
                        }])

                      } else {
                        toast.error('add address first ')
                        navigate('/update')
                      }


                    }}
                  >buy now</Button>
                </div>


              </div>

            </div>
            {/* cart product price */}
            <div className="p-2 d-flex flex-column justify-content-between">
              <p><b><u><BiRupee size={20} />{element.price}.00</u></b></p>
              <div>

                <p className="m-0">total price : </p>
                <p className="m-0"><b><BiRupee size={20} />{element.totalPrice}.00</b></p>
              </div>
            </div>
          </div>
        </div>
      );
    });


  return (
    <div >
      {/* customer cart */}
      <div>
        <div className="d-flex justify-content-between bg-secondary mt-3 px-3 align-items-center">

          <h1>Shopping Cart</h1>
          <h5 className="" style={{ cursor: 'pointer' }} onClick={() => { navigate('/orderHistory') }}><u>order history</u></h5>

        </div>

        <div className="d-flex ">
          {/* current card data  */}
          <div className="w-75 d-flex flex-column gap-3  px-5 pt-3 "
            style={{ overflow: 'scroll', height: '80vh', background: '#e0e0e0' }}

          >{currentCartData}
          </div>

          {/* price details */}
          <div className="w-25 h-25 border py-4 px-3 border border-dark mx-2"
            style={{ background: '#fff053' }}
          >
            <marquee><span><b className="text-primary"><u>* NEW YEAR OFFER *</u></b></span></marquee>
            <p><u>price details</u></p>
            <p><b>Total products : {cartArr.length}</b> </p>
            <p>Amount : <BiRupee size={20} />{total_Amount}.00</p>
            <p>Discount : <span className="text-success"><b><u><BiRupee size={20} />{total_Amount * 10 / 100}</u> </b></span></p>
            <p>shipping charges : <b>free</b></p>
            <p><b>Total amount :<BiRupee size={20} />{total_Amount - total_Amount * 10 / 100}</b> </p>

            <div className="d-flex gap-1 flex-column align-items-center justify-content-center">
              <div className="bg-dark">
                <span className="text-light border-2 px-2">get 10% discount on your order</span>
              </div>
              <Button variant="success"
                onClick={() => createPayload()}
              >Buy Now</Button>{' '}

            </div>



          </div>

        </div>
      </div>
    </div>
  );
}
