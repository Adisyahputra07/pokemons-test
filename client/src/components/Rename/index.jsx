// components
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import "./Rename.css";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";

export default function Rename(props) {
  const history = useHistory();
  const { name } = useParams();
  const { show, hide } = props;
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [rename, setRename] = useState({});

  const handleReleast = async () => {
    try {
      const res = await API.delete(`/pokemon/${name}`);
      console.log(`${res.data.message}`);
    } catch (error) {
      console.log(error);
    }

    history.push("/home");
  };

  const handleRename = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.patch(`/pokemon/${name}`, rename, config);
    } catch (error) {
      console.log(error);
    }

    history.push("/home");
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalRename"
      >
        <Modal.Body className="formContainer ">
          <div className="form-header">
            <h1>Rename</h1>
            <div className="form-body">
              {error && <Alert variant="danger">{message}</Alert>}
              <Form onSubmit={handleRename}>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={(e) => setRename({ name: e.target.value })}
                />
                <br />

                <div style={{ display: "flex" }}>
                  <Button onClick={handleReleast} className="btn-signIn mt-1 mb-4">
                    Realest
                  </Button>
                  <Button type="submit" className="mt-1 mb-4 primary">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
