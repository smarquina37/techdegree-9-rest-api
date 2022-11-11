"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Sequelize.Model {
    static associate(models) {}
  }
  Course.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "author"',
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },

    {
      sequelize,
    }
  );

  // Add a one-to-one association between the Course and User models.
  Course.associate = (models) => {
    Course.belongsTo(models.Person, {
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return Course;
};
