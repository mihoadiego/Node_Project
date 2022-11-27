'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
