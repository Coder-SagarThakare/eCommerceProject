import React from "react";
import { Button, ButtonGroup, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { incNumber } from "../Redux/Actions/action";

export default function CustomerCart() {
  const cartArr = useSelector((state) => state.dataAddedToCart);

  const dispatch = useDispatch();


  const currentCartData =
    cartArr &&
    cartArr.map((element, index) => {
      return (
        <div key={index} className="d-flex justify-content-between w-100">
          {console.log(element)}

          <div className="d-flex">
            <div
              className="border border-primary h-100"
              style={{ width: "300px" }}
            >
              <Carousel>
                {element.images.map((items, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img className="d-block w-100" src={items.url} alt="" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>

            <div>
              <p>{element.name}</p>
              <p>{element.description}</p>
              <div className="d-flex border align-items-center">

                  <Button>-</Button>
                  <p>{element.quantity} </p>
                  <Button onClick={dispatch(incNumber(element.quantity))}>+</Button>
              </div>
            </div>
          </div>
          <div>
            <p>{element.price}</p>
          </div>

          {/* element.? */}
        </div>
      );
    });

  return (
    <div>
      customer cart
      <div></div>
      <div>
        <span>
          <h1>Shopping Cart</h1>
        </span>

        <div>{currentCartData}</div>
      </div>
    </div>
  );
}
