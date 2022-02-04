import React, { useState, useEffect } from "react";
import CardPokemon from "../../components/Card";
import { API } from "../../config/api.js";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  try {
    const getPokemons = async () => {
      const response = await API.get("/pokemons");
      setPokemons(response.data.data);
    };

    useEffect(() => {
      getPokemons();
    }, []);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {pokemons.map((item, idx) => (
        <div key={idx}>
          <CardPokemon pokemons={item} />
        </div>
      ))}
    </>
  );
}
