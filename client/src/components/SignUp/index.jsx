import React, { useState } from "react";
import "./SignUp.css";
import { API } from "../../config/api";
// components
import { Modal, Form, Button, Alert } from "react-bootstrap";

export default function ModalSignUp(props) {
  const { show, hide } = props;
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // state value Input
  const [item, setitem] = useState({
    email: "",
    password: "",
    name: "",
  });

  //Handle Onchange
  const handleOnChanges = (e) => {
    setitem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ ...item });

      const res = await API.post("/register", body, config);

      if (res.status === 200) {
        setSuccess(true);
        setError(false);
        setMessage(res.data.message);
      }

      setTimeout(function () {
        hide();
        console.log("sukses");
      }, 1000);

      setitem({
        email: "",
        password: "",
        fullName: "",
      });
      // todo validasi notif icon success
    } catch (error) {
      if (error.response.status === 400) {
        setError(true);
        setSuccess(false);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalSignUp"
      >
        <Modal.Body className="formContainer ">
          <div className="form-header mb-4">
            <h1>Sign Up</h1>
          </div>
          <div className="form-body">
            {error && <Alert variant="danger">{message}</Alert>}
            {success && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Control
                name="email"
                size="lg"
                type="text"
                placeholder="Email"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Control
                name="password"
                size="lg"
                type="password"
                placeholder="Password"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Control
                name="name"
                size="lg"
                type="text"
                placeholder="Name"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Button type="submit" className="btn-signUp mt-1 mb-4">
                Sign Up
              </Button>
              <div className="text">
                <p>
                  Already have an account ? Klik <a href={""}>Here</a>
                </p>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
