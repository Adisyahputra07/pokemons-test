import React, { useState } from "react";
import ModalSignUp from "../../components/SignUp";
import ModalSignIn from "../../components/SignIn";
import { Button } from "react-bootstrap";

export default function LandingPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modaSignInlShow, setModaSignInlShow] = useState(false);

  return (
    <div>
      <h1>Login & Register</h1>
      <div style={{ display: "flex", marginTop: "200" }}>
        <Button onClick={() => setModalShow(true)}>Sign Up</Button>
        <Button onClick={() => setModaSignInlShow(true)}>Sign in</Button>
      </div>
      <ModalSignUp show={modalShow} hide={() => setModalShow(false)} />
      <ModalSignIn show={modaSignInlShow} hide={() => setModaSignInlShow(false)} />
    </div>
  );
}
