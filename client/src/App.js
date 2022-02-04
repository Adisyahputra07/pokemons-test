import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { DetailPokemon, Home, LandingPage } from "./Pages";
import { setAuthToken } from "./config/api";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }

      setAuthToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:name" component={DetailPokemon} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
