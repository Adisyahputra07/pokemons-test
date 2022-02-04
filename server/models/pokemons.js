"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pokemons extends Model {
    static associate(models) {
      // define association here

      pokemons.belongsTo(models.users, {
        as: "idOwner",
        foreignKey: {
          name: "ownerId",
        },
      });
    }
  }

  pokemons.init(
    {
      pokemonId: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pokemons",
    }
  );
  return pokemons;
};
