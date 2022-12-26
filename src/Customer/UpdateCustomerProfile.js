import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { patch } from "../HttpService/APIService";

export default function UpdateCustomerProfile({
  setUpdateProfile,
  updateProfile,
}) {

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    patch("/customers/update-profile", data)
    .then((response) => {
      console.log(response);
      toast.success("profile uploaded succesfully");
      setUpdateProfile(false)
    });
  };

  return (
    // <div>UpdateCustomerProfile</div>

    <div>
      <Modal show={true} onHide={() => setUpdateProfile(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update profile info</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div>
              <input placeholder="enter name" {...register("name")} />
              <input placeholder="enter email" {...register("email")} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setUpdateProfile(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
