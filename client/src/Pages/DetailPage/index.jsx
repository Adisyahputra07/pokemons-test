import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import DetailCss from "./Detail.module.css";
import { Alert, Button } from "react-bootstrap";
import { Rename as ModalRename } from "../../components";

export default function DetailPokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleGatcha = async () => {
    setError(false);
    try {
      const res = await API.get(`/catch-pokemon/${name}`);

      console.log(res.data.status);

      if (res.data.status === "has_taken") {
        setError(true);
        setMessage(res.data.message);
      } else if (res.data.status === "success_add_pokemon") {
        setMessage(res.data.message);
        setModalShow(true);
      } else if (res.data.status === false) {
        setError(true);
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemon = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/pokemon/${name}`);
      if (response.data.pokemon) {
        setPokemon(response.data.pokemon);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("get error", error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (isLoading)
    return (
      <div
        className={DetailCss.detailContainer}
        style={{
          marginLeft: "3em",
          marginRight: "3em",
          marginTop: "3em",
        }}
      >
        loading
      </div>
    );

  return (
    <div
      className={DetailCss.sideDetailPokemon}
      style={{ marginLeft: "36px", marginRight: "36px", display: "flex", marginBottom: "50px" }}
    >
      <div
        className={DetailCss.detailContainer}
        style={{
          marginLeft: "3em",
          marginRight: "3em",
          marginTop: "3em",
        }}
      >
        {error && <Alert variant="danger">{message}</Alert>}

        <div className={DetailCss.descPokemon}>
          <div className={DetailCss.imgPokemon}>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          <div className={DetailCss.listDescPokemon}>
            <div className={DetailCss.listDesc}>
              <p>Name</p>
              <h1 className={DetailCss.title}>{pokemon.name}</h1>
            </div>
            <div className={DetailCss.listDesc}>
              <p>Height</p>
              <span>{pokemon.height}</span>
            </div>
            <div className={DetailCss.listDesc}>
              <p>Ability</p>
              <span>{pokemon.abilities[0].ability.name}</span>
            </div>
          </div>
        </div>
        <Button onClick={handleGatcha}>Dapatkan</Button>
      </div>

      <ModalRename show={modalShow} hide={() => setModalShow(false)} />
    </div>
  );
}
