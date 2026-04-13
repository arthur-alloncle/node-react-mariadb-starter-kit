"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("decisions", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },

      title: Sequelize.STRING,

      outcome: Sequelize.INTEGER,

      confidence: Sequelize.FLOAT,

      importance: Sequelize.INTEGER,

      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      category_id: {
        type: Sequelize.UUID,
        references: {
          model: "categories",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
