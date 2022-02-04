const key = "pokemons";
const fetch = require("node-fetch");
const { pokemons } = require("../../models");
const redisClient = require("../modules/redis");
const { v4: uuidv4 } = require("uuid");

exports.getPokemons = async (req, res) => {
  try {
    const dataRedis = await redisClient.get(key);

    if (dataRedis !== null) {
      res.status(200).send({
        status: "success",
        masssage: "data redis",
        data: JSON.parse(dataRedis),
      });
    } else {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then(async (data) => {
          let pokemonData = data.results;
          pokemonData = await Promise.all(
            pokemonData.map(async (pokemon) => {
              const pokemonName = pokemon.name;
              let pokemonPhoto;

              try {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                pokemonPhoto = data.sprites.other["official-artwork"].front_default;
                console.log(pokemonPhoto);
              } catch (err) {
                console.log(err);
              }

              return Promise.resolve({ name: pokemonName, image: pokemonPhoto });
            })
          );

          await redisClient.set(key, JSON.stringify(pokemonData));

          res.status(200).send({
            status: "success",
            message: "successfully get all",
            data: pokemonData,
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getPokemon = async (req, res) => {
  const { name } = req.params;

  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json();

    res.status(200).send({
      status: "success",
      masssage: "data 1 pokemon",
      pokemon: {
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: data.height,
        abilities: data.abilities,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.catchPokemon = async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.idUser;
    const id = uuidv4();

    let checkPokemon = await pokemons.findOne({
      where: {
        ownerId: userId,
        name: name,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });

    if (checkPokemon) {
      return res.send({
        status: "has_taken",
        message: "pokemon exists",
      });
    }

    const probability = Math.floor(Math.random() * 2 + 1);
    let message;

    if (probability === 1) {
      try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let data = await response.json();

        const pokemon = await pokemons.create({
          pokemonId: id,
          ownerId: userId,
          name: name,
          image: data.sprites.other["official-artwork"].front_default,
        });

        res.status(200).send({
          status: "success_add_pokemon",
          masssage: "success add 1 data pokemon",
          pokemon,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server error",
        });
      }
    } else {
      message = "failed catch";
      res.send({
        status: false,
        message,
        probability,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getMyPokemons = async (req, res) => {
  const userId = req.idUser;

  try {
    let data = await pokemons.findAll({
      where: {
        ownerId: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });

    res.status(200).send({
      status: "success",
      message: "get all data myPokemon success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    send.serverError(res);
  }
};

exports.releasePokemon = async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.idUser;

    await pokemons.destroy({
      where: {
        ownerId: userId,
        name: name,
      },
    });

    res.send({
      status: "success",
      message: `successful release of pokemon ${name}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.renamePokemon = async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.idUser;

    const checkPokemon = await pokemons.findOne({
      where: {
        ownerId: userId,
        name: name,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });

    if (checkPokemon) {
      const renamePokemon = await pokemons.update(req.body, {
        where: {
          ownerId: userId,
          name: name,
        },
      });

      res.status(500).send({
        status: "success",
        masssage: `success rename pokemon ${name}`,
        data: renamePokemon,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
