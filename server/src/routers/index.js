const { Router } = require("express");
const router = Router();

const {
  getPokemons,
  getPokemon,
  catchPokemon,
  getMyPokemons,
  releasePokemon,
  renamePokemon,
} = require("../controllers/getPokemons");

const { auth } = require("../middlewares/auth");

const { login, register } = require("../controllers/user");

router.post("/login", login);
router.post("/register", register);

router.get("/pokemons", getPokemons);
router.get("/pokemon/:name", getPokemon);
router.get("/my-pokemons", auth, getMyPokemons);
router.get("/catch-pokemon/:name", auth, catchPokemon);
router.delete("/pokemon/:name", auth, releasePokemon);
router.patch("/pokemon/:name", auth, renamePokemon);

// add pokemon

module.exports = router;
