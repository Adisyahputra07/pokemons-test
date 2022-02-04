import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function CardPokemon(props) {
  const { pokemons } = props;
  const history = useHistory();

  const handleToDetail = (name) => {
    history.push(`/detail/${name}`);
  };

  return (
    <>
      <div onClick={() => handleToDetail(pokemons.name)}>
        <Card style={{ width: "13em", borderRadius: "12px" }}>
          <Card.Img
            variant="top"
            src={pokemons.image}
            alt={pokemons.name}
            style={{ width: "100%" }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "20px" }}>{pokemons?.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
