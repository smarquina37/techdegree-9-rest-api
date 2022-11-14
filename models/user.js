"use strict";
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {
    static associate(models) {}
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required",
          },
          notEmpty: {
            msg: "Please provide a first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required",
          },
          notEmpty: {
            msg: "Please provide a last name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists",
        },
        validate: {
          notNull: {
            msg: "An email is required",
          },
          isEmail: {
            msg: "Please provide a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          if (val !== "") {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          }
        },
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
      },
    },
    {
      sequelize,
    }
  );

  // Add a one-to-many association between the User and Course models
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "user",
      foreignKey: {
        fieldName: "userId", //change to 'id'?
        allowNull: false,
      },
    });
  };
  return User;
};
