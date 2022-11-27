'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('products');

    // code below left this way but useless as the real solution was to add timestamps:false in the config/database.js file!
    let tableName = 'products';
    let columnName1 = 'createdAt';
    let columnName2 = 'updatedAt';
    return Promise.all([
      queryInterface.describeTable(tableName)
        .then(tableDefinition => {
          if (tableDefinition.columnName1) {/*return Promise.resolve();}*/
          return queryInterface.removeColumn(tableName, columnName1)}
        }),
      queryInterface.describeTable(tableName)
        .then(tableDefinition => {
          if (tableDefinition.columnName2) {/*return Promise.resolve();}*/
            return queryInterface.removeColumn(tableName, columnName2)
          }
        }),
    ]);
  }
};