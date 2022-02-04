// components
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import "./SignIn.css";
import { API, setAuthToken } from "../../config/api";

export default function ModalSignIn(props) {
  const { show, hide } = props;
  const history = useHistory();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [item, setItems] = useState({
    email: "",
    password: "",
  });

  const handleOnChanges = (e) => {
    e.preventDefault();
    setItems({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  // Handle On Sign in
  const handleOnSignIn = async (e) => {
    e.preventDefault();

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await API.post("/login", item, config);
      const test = setAuthToken(res.data.items.token);
      localStorage.setItem("token", res.data.items.token);

      history.push("/home");
    } catch (error) {
      if (error.response.status === 400) {
        setError(true);
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
        dialogClassName="modalSignIn"
      >
        <Modal.Body className="formContainer ">
          <div className="form-header">
            <h1>Sign In</h1>
            <div className="form-body">
              {error && <Alert variant="danger">{message}</Alert>}
              <Form onSubmit={handleOnSignIn}>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleOnChanges}
                />
                <br />
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleOnChanges}
                />
                <br />
                <Button type="submit" className="btn-signIn mt-1 mb-4">
                  Sign In
                </Button>
                <div className="text">
                  <p>
                    {/* create */}
                    Don't have an account ? Klik <b>Here</b>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
