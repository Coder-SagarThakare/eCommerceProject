// import React from "react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { secureDelete, secureGet } from "../HttpService/APIService";
import { deleteToken } from "../HttpService/LocalStorageService";
import ChangeCustomerPassword from "./ChangeCustomerPassword";
// import getToken from "../HttpService/LocalStorageService";
// import UpdateCustomerInfo from "./UpdateCustomerInfo";
// import UpdateCustomerProfile from "./UpdateCustomerProfile";
// import UpdateCustomerProfilePhoto from "./UpdateCustomerProfilePhoto";

export default function OffCanvas({
  showCanvas,
  setShowCanvas,
  currentLoggedInUser,
  setCurrentLoggedInUser,
}) {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState();

  useEffect(() => {
    secureGet("shop/auth/self").then((response) => {
      console.log(response.data);
      setCurrentLoggedInUser(response.data);
      console.log("in useEffect");
    });
  }, []);
  // }, [updateProfile, updatePhoto]);

  function logOutCustomer(){
  deleteToken('activeCustomerToken')
  setShowCanvas(false);
  
  }

  return (
    <>
      <div>
        <Offcanvas
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
          }}
          placement="end"
          className="w-25"
          // backdrop="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>user profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-center align-items-center border border-primary">
              <div className="d-flex justify-content-center">
                <img src={currentLoggedInUser.picture} className="w-50"></img>
                <div></div>
              </div>
              <p>username : {currentLoggedInUser.name}</p>
              <p>mail-id : {currentLoggedInUser.email}</p>

              <div className="d-flex justify-content-evenly w-100">
                <Button
                  variant="light"
                  className="border border-secondary"
                  onClick={() => {
                    navigate("/update");
                  }}
                >
                  update
                </Button>
                <Button variant="danger">delete user</Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  setChangePassword(true);
                }}
              >
                Change password
              </Button>
              <button onClick={()=>logOutCustomer()}>log out</button>

              {/* <p>Address : {address.city}</p> */}
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {changePassword ? (
          <ChangeCustomerPassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
          />
        ) : (
          ""
        )}

      </div>
    </>
  );
}
